import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import MainLayout from './components/layout/MainLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading Auth...</div>;
  }

  // Uncomment in production or when auth server is available
  // if (!auth.isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
