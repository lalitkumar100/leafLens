import { 
  Leaf, Heart, Bug, AlertTriangle, Pill, 
  Droplets, Sun, Shield, FileText, Download, 
  Upload, Share2, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportSection from './ReportSection';

const PlantReport = ({ reportData, image, onNewScan }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return 'risk-medium';
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download would be implemented with a backend service');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header with image and summary */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
            <img 
              src={image} 
              alt="Scanned plant" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Summary */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{reportData.plantName}</h2>
                <p className="text-muted-foreground italic">{reportData.scientificName}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(reportData.riskLevel)}`}>
                {reportData.riskLevel.charAt(0).toUpperCase() + reportData.riskLevel.slice(1)} Risk
              </span>
            </div>
            
            {/* Health Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Health Score</span>
                <span className="text-sm font-semibold text-primary">{reportData.healthScore}%</span>
              </div>
              <div className="health-bar">
                <div 
                  className="health-bar-fill" 
                  style={{ width: `${reportData.healthScore}%` }} 
                />
              </div>
            </div>

            {/* Confidence */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" />
              <span>{reportData.confidence}% identification confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <div className="space-y-3">
        {/* Plant Identity */}
        <ReportSection title="Plant Identity" icon={Leaf} defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Common Name</p>
              <p className="font-medium text-foreground">{reportData.plantName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scientific Name</p>
              <p className="font-medium text-foreground">{reportData.scientificName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Family</p>
              <p className="font-medium text-foreground">{reportData.family}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confidence</p>
              <p className="font-medium text-foreground">{reportData.confidence}%</p>
            </div>
          </div>
        </ReportSection>

        {/* Health Status */}
        <ReportSection title="Health Status" icon={Heart} defaultOpen>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(reportData.riskLevel)}`}>
                {reportData.riskLevel.toUpperCase()} RISK
              </span>
              <span className="text-foreground font-medium">{reportData.healthScore}% Health Score</span>
            </div>
            <div className="health-bar h-4">
              <div 
                className="health-bar-fill" 
                style={{ width: `${reportData.healthScore}%` }} 
              />
            </div>
          </div>
        </ReportSection>

        {/* Disease Details */}
        <ReportSection title="Disease Details" icon={Bug}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Disease</p>
                <p className="font-medium text-foreground">{reportData.disease}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Severity</p>
                <p className="font-medium text-foreground">{reportData.severity}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Affected Parts</p>
              <div className="flex flex-wrap gap-2">
                {reportData.affectedParts.map((part, i) => (
                  <span key={i} className="px-2 py-1 bg-secondary rounded-md text-sm text-foreground">
                    {part}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Duration</p>
              <p className="font-medium text-foreground">{reportData.diseaseDuration}</p>
            </div>
          </div>
        </ReportSection>

        {/* Symptoms */}
        <ReportSection title="Symptoms Detected" icon={AlertTriangle}>
          <ul className="space-y-2">
            {reportData.symptoms.map((symptom, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* Treatment Plan */}
        <ReportSection title="Treatment Plan" icon={Pill}>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Immediate Actions</h4>
              <ul className="space-y-2">
                {reportData.treatment.immediate.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Recommended Remedies</h4>
              <ul className="space-y-2">
                {reportData.treatment.remedies.map((remedy, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-muted-foreground">Treatment Duration</p>
                <p className="font-medium text-foreground">{reportData.treatment.duration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="font-medium text-primary">{reportData.treatment.successRate}%</p>
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Care Guide */}
        <ReportSection title="Care Guide" icon={Droplets}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Watering</span>
              </div>
              <p className="text-foreground text-sm">{reportData.careGuide.watering}</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Sunlight</span>
              </div>
              <p className="text-foreground text-sm">{reportData.careGuide.sunlight}</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Soil</span>
              </div>
              <p className="text-foreground text-sm">{reportData.careGuide.soil}</p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Pill className="w-4 h-4 text-pink-500" />
                <span className="text-sm text-muted-foreground">Fertilizer</span>
              </div>
              <p className="text-foreground text-sm">{reportData.careGuide.fertilizer}</p>
            </div>
          </div>
        </ReportSection>

        {/* Prevention Tips */}
        <ReportSection title="Prevention Tips" icon={Shield}>
          <ul className="space-y-2">
            {reportData.preventionTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </ReportSection>

        {/* Additional Notes */}
        <ReportSection title="Additional Notes" icon={FileText}>
          <p className="text-muted-foreground">{reportData.notes}</p>
        </ReportSection>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={handleDownload} variant="outline" className="flex-1 btn-outline">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={onNewScan} className="flex-1 btn-primary">
          <Upload className="w-4 h-4 mr-2" />
          Upload New Image
        </Button>
        <Button onClick={handleShare} variant="outline" className="btn-outline">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default PlantReport;
