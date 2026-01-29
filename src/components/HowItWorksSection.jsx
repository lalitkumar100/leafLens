import { Upload, Scan, FileText } from 'lucide-react';
import StepCard from './StepCard';

const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload Image',
      description: 'Take a clear photo of your plant or drag and drop an existing image into our scanner.'
    },
    {
      number: 2,
      icon: Scan,
      title: 'AI Analysis',
      description: 'Our advanced AI examines your plant, identifying species, health issues, and diseases.'
    },
    {
      number: 3,
      icon: FileText,
      title: 'Get Report',
      description: 'Receive a comprehensive diagnosis with treatment plans and personalized care tips.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-card/30">
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple <span className="gradient-text">3-Step</span> Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your plant diagnosed in under a minute with our streamlined workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 stagger-children">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
