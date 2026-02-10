import { useEffect } from 'react'; // Import useEffect
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Home = () => {
  const location = useLocation();

  // 🔹 Handle scroll on initial load (if coming from another page with a hash)
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        // Small timeout ensures DOM is fully loaded before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 🔹 ID="home" for the top */}
        <div id="home">
          <HeroSection />
        </div>
        
        <FeaturesSection />
        
        {/* 🔹 Add IDs to these sections so the Navbar links work */}
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;