const StepCard = ({ number, title, description, icon: Icon }) => {
  return (
    <div className="feature-card text-center relative">
      {/* Step number */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      
      <div className="pt-4">
        <div className="inline-flex p-4 bg-accent/10 rounded-xl mb-4">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
