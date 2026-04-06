import axios from 'react'; // Just for TS checking if we want, but usually standard axios
import baseAxios from 'axios';

// Create base instance
export const api = baseAxios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to magically append token
api.interceptors.request.use(
  (config) => {
    const oidcStorage = sessionStorage.getItem(`oidc.user:${'https://idbi-auth-stage.isupay.in/application/o/merchant-application/'}:${'f8VJ2UAbdFFEKRW1pkO1rFiA'}`);
    if (oidcStorage) {
      try {
        const user = JSON.parse(oidcStorage);
        if (user.access_token) {
          config.headers.Authorization = `Bearer ${user.access_token}`;
        }
      } catch (err) {
        console.error('Failed to parse OIDC token', err);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const reportApi = {
  submitReport: async (payload: { startDate: string, endDate: string, vpa_id: string, mode: string }) => {
    return api.post('https://api-dev-stage.iserveu.online/idbi/sb/reports/querysubmit_user', payload);
  },
  checkReportStatus: async (queryId: string) => {
    return api.get(`https://api-dev-stage.iserveu.online/idbi/sb/reports/get_report_status/${queryId}`);
  }
};
