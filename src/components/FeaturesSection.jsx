import { Brain, Zap, BookOpen, Languages, Bot } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze your plant photos to identify diseases, pests, and nutritional deficiencies with high accuracy.'
    },
    {
      icon: Zap,
      title: 'Instant Diagnosis',
      description: 'Get comprehensive health reports in seconds. No waiting, no appointments – just upload and receive immediate results.'
    },
    {
      icon: Languages,
      title: '10+ Indian Languages',
      description: 'Accessible to everyone. Get reports in Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Malayalam, Gujarati, Punjabi, & Odia.'
    },
    {
      icon: BookOpen,
      title: 'Complete Care Guide',
      description: 'Receive detailed treatment plans, prevention tips, and personalized care schedules tailored to your specific plant species.'
    },
     {
      icon: Bot,
      title: 'AI-Powered Care Assistant',
      description: 'Get personalized care recommendations powered by AI, tailored to your specific plant species and growing conditions.'
    }
  ];

  return (
    <section className="py-20 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="gradient-text">LeafLens</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of plant care with our cutting-edge AI technology
          </p>
        </div>

        {/* 🔹 Updated Grid: cols-1 (mobile), cols-2 (tablet), cols-4 (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 stagger-children">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;