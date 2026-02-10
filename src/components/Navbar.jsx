import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', hash: '#home' },
    { name: 'About', path: '/', hash: '#about' },
    { name: 'How It Works', path: '/', hash: '#how-it-works' },
  ];

  // 🔹 Custom Handler for Navigation
  const handleNavClick = (e, link) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsMenuOpen(false);

    // 1. If we are already on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(link.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without reloading
        window.history.pushState(null, '', link.hash);
      } else {
          // If element doesn't exist (e.g. top of page), scroll top
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } 
    // 2. If we are on another page (e.g., /scan), navigate to home with hash
    else {
      navigate(`${link.path}${link.hash}`);
    }
  };

  const isActive = (hash) => {
    return location.hash === hash || (location.pathname === '/' && hash === '#home' && !location.hash);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">LeafLens</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`${link.path}${link.hash}`} // Fallback for SEO/Hover
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                  isActive(link.hash) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => navigate('/scan')}
              className="btn-primary"
            >
              Start Scanning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`${link.path}${link.hash}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.hash) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <Button 
                onClick={() => {
                  navigate('/scan');
                  setIsMenuOpen(false);
                }}
                className="btn-primary w-full mt-2"
              >
                Start Scanning
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;