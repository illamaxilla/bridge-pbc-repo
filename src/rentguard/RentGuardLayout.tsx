import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, CreditCard, Users, Home, FileText, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', path: '/rentguard', icon: LayoutDashboard },
  { label: 'Verify Card', path: '/rentguard/verify', icon: CreditCard },
  { label: 'Landlord Portal', path: '/rentguard/landlord', icon: Home },
  { label: 'Tenant Portal', path: '/rentguard/tenant', icon: Users },
];

export default function RentGuardLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Full-screen pages (no nav chrome)
  const isVerifyPage = location.pathname.startsWith('/rentguard/verify/');

  if (isVerifyPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="bg-green-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/rentguard" className="flex items-center gap-2.5">
              <Shield className="w-7 h-7 text-yellow-400" />
              <div>
                <span className="font-bold text-lg leading-none">RentGuard</span>
                <span className="text-green-300 text-xs block leading-none mt-0.5">Ghana Rent Control</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.path === '/rentguard'
                    ? location.pathname === '/rentguard'
                    : location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-green-700 text-white'
                        : 'text-green-200 hover:bg-green-700/50 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-green-200 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-green-700 px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.path === '/rentguard'
                  ? location.pathname === '/rentguard'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-700 text-white'
                      : 'text-green-200 hover:bg-green-700/50 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-700" />
              <span>RentGuard Ghana · Ministry of Works and Housing</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Act 220, 1963 · PNDCL 138, 1986</span>
              <span>Hotline: 0302-xxx-xxx</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
