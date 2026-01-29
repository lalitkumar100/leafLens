import { useNavigate } from 'react-router-dom';
import { Shield, Heart, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Shield,
      title: 'Trusted Technology',
      description: 'Built on state-of-the-art machine learning models trained on millions of plant images.'
    },
    {
      icon: Heart,
      title: 'Plant Lovers',
      description: 'Created by passionate gardeners and botanists who understand plant care deeply.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Helping reduce plant mortality and promoting sustainable gardening practices.'
    }
  ];

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Our Mission: <span className="gradient-text">Healthier Plants</span> for Everyone
            </h2>
            <p className="text-muted-foreground mb-6">
              LeafLens was born from a simple idea: everyone deserves access to expert plant 
              care advice. Whether you're a first-time plant parent or a seasoned gardener, 
              our AI technology helps you keep your plants thriving.
            </p>
            <p className="text-muted-foreground mb-8">
              We combine cutting-edge artificial intelligence with decades of botanical 
              knowledge to provide accurate diagnoses and actionable treatment plans – 
              all from a simple photo.
            </p>
            <Button 
              onClick={() => navigate('/scan')}
              className="btn-primary group"
            >
              Try It Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right - Values */}
          <div className="space-y-4">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="feature-card flex items-start gap-4"
              >
                <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
