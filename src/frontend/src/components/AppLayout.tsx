import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Menu, X, LogIn, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';

type Page = 'home' | 'catalog' | 'hygiene' | 'sweet-detail' | 'owner';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sand-50 via-background to-terracotta-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-terracotta-200/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/sweet-shop-logo.dim_512x512.png"
              alt="Marward Sweets Pilani Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-display text-xl font-bold text-terracotta-800">
              Marward Sweets Pilani
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-colors hover:text-terracotta-700 ${
                currentPage === 'home' ? 'text-terracotta-700' : 'text-foreground/80'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              className={`text-sm font-medium transition-colors hover:text-terracotta-700 ${
                currentPage === 'catalog' ? 'text-terracotta-700' : 'text-foreground/80'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => handleNavClick('hygiene')}
              className={`text-sm font-medium transition-colors hover:text-terracotta-700 ${
                currentPage === 'hygiene' ? 'text-terracotta-700' : 'text-foreground/80'
              }`}
            >
              Hygiene Ratings
            </button>
            <button
              onClick={() => handleNavClick('owner')}
              className={`text-sm font-medium transition-colors hover:text-terracotta-700 ${
                currentPage === 'owner' ? 'text-terracotta-700' : 'text-foreground/80'
              }`}
            >
              Owner
            </button>
          </nav>

          {/* Auth Button & Mobile Menu */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button
                onClick={clear}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2 border-terracotta-300 hover:bg-terracotta-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={login}
                disabled={isLoggingIn}
                size="sm"
                className="hidden md:flex items-center gap-2 bg-terracotta-600 hover:bg-terracotta-700"
              >
                <LogIn className="h-4 w-4" />
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-terracotta-200/50 bg-background/95 backdrop-blur">
            <nav className="container py-4 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'home'
                    ? 'bg-terracotta-100 text-terracotta-700'
                    : 'hover:bg-terracotta-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('catalog')}
                className={`text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'catalog'
                    ? 'bg-terracotta-100 text-terracotta-700'
                    : 'hover:bg-terracotta-50'
                }`}
              >
                Catalog
              </button>
              <button
                onClick={() => handleNavClick('hygiene')}
                className={`text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'hygiene'
                    ? 'bg-terracotta-100 text-terracotta-700'
                    : 'hover:bg-terracotta-50'
                }`}
              >
                Hygiene Ratings
              </button>
              <button
                onClick={() => handleNavClick('owner')}
                className={`text-left px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'owner'
                    ? 'bg-terracotta-100 text-terracotta-700'
                    : 'hover:bg-terracotta-50'
                }`}
              >
                Owner
              </button>
              <div className="border-t border-terracotta-200/50 pt-3 mt-2">
                {isAuthenticated ? (
                  <Button
                    onClick={clear}
                    variant="outline"
                    size="sm"
                    className="w-full border-terracotta-300 hover:bg-terracotta-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    onClick={login}
                    disabled={isLoggingIn}
                    size="sm"
                    className="w-full bg-terracotta-600 hover:bg-terracotta-700"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    {isLoggingIn ? 'Signing In...' : 'Sign In'}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-terracotta-200/50 bg-terracotta-50/30 mt-12">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/assets/generated/sweet-shop-logo.dim_512x512.png"
                  alt="Marward Sweets Pilani Logo"
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-display text-lg font-bold text-terracotta-800">
                  Marward Sweets Pilani
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Authentic sweets celebrating rich culture and traditions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-terracotta-800">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('catalog')}
                  className="text-sm text-muted-foreground hover:text-terracotta-700 text-left transition-colors"
                >
                  Browse Catalog
                </button>
                <button
                  onClick={() => handleNavClick('hygiene')}
                  className="text-sm text-muted-foreground hover:text-terracotta-700 text-left transition-colors"
                >
                  Hygiene Ratings
                </button>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-sm mb-3 text-terracotta-800">Connect With Us</h3>
              <div className="flex gap-3 mb-3">
                <a
                  href="#"
                  className="p-2 rounded-full bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-200 transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-200 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <SiX className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/marward_sweets_pilani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-200 transition-colors"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-4 w-4" />
                </a>
              </div>
              <a
                href="https://instagram.com/marward_sweets_pilani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-terracotta-700 transition-colors"
              >
                @marward_sweets_pilani
              </a>
            </div>
          </div>

          <div className="border-t border-terracotta-200/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Marward Sweets Pilani. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'marward-sweets-pilani'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta-700 hover:text-terracotta-800 font-medium transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
