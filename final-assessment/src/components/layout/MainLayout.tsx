import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { LayoutDashboard, FileText, Settings, LogOut, Loader2, Menu } from 'lucide-react';

export default function MainLayout() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-idbi-green" />
      </div>
    );
  }

  // Assuming mock login for dev if not fully authenticated and configured
  if (!auth.isAuthenticated) {
    // In production, uncomment the line below:
    // return <Navigate to="/" replace />;
  }

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Reports', icon: FileText, href: '/reports' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Sidebar */}
      <aside className="w-64 glass border-r hidden md:flex flex-col relative z-20 shadow-xl">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-idbi-green rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-idbi-green/40">
            IDBI
          </div>
          <span className="font-bold text-xl tracking-tight">Merchant</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                window.location.pathname.startsWith(item.href)
                  ? 'bg-idbi-green text-white shadow-md shadow-idbi-green/20'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6 p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            <div className="w-10 h-10 rounded-full bg-idbi-orange text-white flex items-center justify-center shrink-0">
              {auth.user?.profile?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{auth.user?.profile?.name || 'Authorized User'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{auth.user?.profile?.email || 'admin@isupay.in'}</p>
            </div>
          </div>
          <button
            onClick={() => auth.signoutRedirect()}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden z-10 w-full">
        <header className="h-20 glass border-b flex items-center px-6 justify-between w-full shadow-sm relative z-30">
          <button className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-semibold text-lg ml-4 md:ml-0 hidden sm:block">
            {auth.user?.profile?.bankCode || 'IDBI Bank'} Overview
          </div>
          <div className="flex items-center space-x-4">
             {/* Add top header actions here if needed */}
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8 w-full z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
