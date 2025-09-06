
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultHeaderData } from '@/data/defaults';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [headerData] = useLocalStorage('headerData', defaultHeaderData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut, userRole } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 lg:mb-0 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold text-blue-800">{headerData.logoText}</h1>
            <p className="text-xs text-gray-600">{headerData.logoSubtext}</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {(headerData.navigationItems || []).map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.url} className="flex items-center text-gray-700 hover:text-blue-800 font-medium transition-colors">
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {(item.dropdown || []).map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.url}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA / Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user && (
              <Link
                to={headerData.ctaButtonLink || "/contact"}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {headerData.ctaButtonText}
              </Link>
            )}
            {user ? (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" className="font-medium text-gray-700 hover:text-blue-800">
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {(headerData.navigationItems || []).map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.url || '#'}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              
              {!user && (
                <Link
                  to={headerData.ctaButtonLink || "/contact"}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  {headerData.ctaButtonText}
                </Link>
              )}
              
               {user ? (
                <>
                  {userRole === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-800 font-medium">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left mt-2 px-3 py-2 text-gray-700 hover:text-blue-800 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block mt-4 bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors font-medium text-center"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
