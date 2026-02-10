import { 
Leaf, Heart, Bug, AlertTriangle, Pill, 
  Droplets, Sun, Shield, FileText, Download, 
  Upload, Check, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"; // 🔹 Shadcn Toast Import
import html2canvas from 'html2canvas'; // 🔹 Import html2canvas
import jsPDF from 'jspdf'; // 🔹 Import jsPDF
import ReportSection from './ReportSection';
import { useRef,useState  } from 'react';
import PrintableReport from './PrintableReport'; // 🔹 Import the new component
// 🔹 Translations for Report Labels
const REPORT_TRANSLATIONS = {
  en: {
    risk: "Risk",
    healthScore: "Health Score",
    confidence: "identification confidence",
    // Sections
    plantIdentity: "Plant Identity",
    healthStatus: "Health Status",
    diseaseDetails: "Disease Details",
    symptoms: "Symptoms Detected",
    treatmentPlan: "Treatment Plan",
    careGuide: "Care Guide",
    prevention: "Prevention Tips",
    notes: "Additional Notes",
    // Fields
    commonName: "Common Name",
    scientificName: "Scientific Name",
    family: "Family",
    confLabel: "Confidence",
    disease: "Disease",
    severity: "Severity",
    affectedParts: "Affected Parts",
    duration: "Estimated Duration",
    immediate: "Immediate Actions",
    remedies: "Recommended Remedies",
    treatmentDuration: "Treatment Duration",
    successRate: "Success Rate",
    // Care
    watering: "Watering",
    sunlight: "Sunlight",
    soil: "Soil",
    fertilizer: "Fertilizer",
    // Buttons
    download: "Download PDF",
    uploadNew: "Upload New Image",
  },
  hi: {
    risk: "जोखिम",
    healthScore: "स्वास्थ्य स्कोर",
    confidence: "पहचान का भरोसा",
    plantIdentity: "पौधे की पहचान",
    healthStatus: "स्वास्थ्य स्थिति",
    diseaseDetails: "रोग का विवरण",
    symptoms: "पाए गए लक्षण",
    treatmentPlan: "उपचार योजना",
    careGuide: "देखभाल गाइड",
    prevention: "रोकथाम के सुझाव",
    notes: "अतिरिक्त जानकारी",
    commonName: "सामान्य नाम",
    scientificName: "वैज्ञानिक नाम",
    family: "परिवार",
    confLabel: "भरोसा",
    disease: "रोग",
    severity: "गंभीरता",
    affectedParts: "प्रभावित भाग",
    duration: "अनुमानित अवधि",
    immediate: "तत्काल उपाय",
    remedies: "सुझाए गए उपचार",
    treatmentDuration: "उपचार की अवधि",
    successRate: "सफलता दर",
    watering: "पानी देना",
    sunlight: "धूप",
    soil: "मिट्टी",
    fertilizer: "खाद",
    download: "PDF डाउनलोड करें",
    uploadNew: "नई फोटो अपलोड करें",
  },
  bn: {
    risk: "ঝুঁকি",
    healthScore: "স্বাস্থ্য স্কোর",
    confidence: "শনাক্তকরণ আস্থা",
    plantIdentity: "উদ্ভিদ পরিচয়",
    healthStatus: "স্বাস্থ্যের অবস্থা",
    diseaseDetails: "রোগের বিবরণ",
    symptoms: "লক্ষণ শনাক্ত",
    treatmentPlan: "চিকিৎসা পরিকল্পনা",
    careGuide: "যত্ন গাইড",
    prevention: "প্রতিরোধ টিপস",
    notes: "অতিরিক্ত নোট",
    commonName: "সাধারণ নাম",
    scientificName: "বৈজ্ঞানিক নাম",
    family: "পরিবার",
    confLabel: "আস্থা",
    disease: "রোগ",
    severity: "তীব্রতা",
    affectedParts: "আক্রান্ত অংশ",
    duration: "আনুমানিক সময়কাল",
    immediate: "তাৎক্ষণিক পদক্ষেপ",
    remedies: "প্রস্তাবিত প্রতিকার",
    treatmentDuration: "চিকিৎসার সময়কাল",
    successRate: "সাফল্যের হার",
    watering: "জল দেওয়া",
    sunlight: "সূর্যালোক",
    soil: "মাটি",
    fertilizer: "সার",
    download: "PDF ডাউনলোড করুন",
    uploadNew: "নতুন ছবি আপলোড করুন",
  },
  te: {
    risk: "ప్రమాదం",
    healthScore: "ఆరోగ్య స్కోర్",
    confidence: "గుర్తింపు నమ్మకం",
    plantIdentity: "మొక్క గుర్తింపు",
    healthStatus: "ఆరోగ్య స్థితి",
    diseaseDetails: "వ్యాధి వివరాలు",
    symptoms: "కనుగొనబడిన లక్షణాలు",
    treatmentPlan: "చికిత్స ప్రణాళిక",
    careGuide: "సంరక్షణ గైడ్",
    prevention: "నివారణ చిట్కాలు",
    notes: "అదనపు గమనికలు",
    commonName: "సాధారణ పేరు",
    scientificName: "శాస్త్రీయ నామం",
    family: "కుటుంబం",
    confLabel: "నమ్మకం",
    disease: "వ్యాధి",
    severity: "తీవ్రత",
    affectedParts: "ప్రభావిత భాగాలు",
    duration: "అంచనా సమయం",
    immediate: "తక్షణ చర్యలు",
    remedies: "సిఫార్సు చేసిన నివారణలు",
    treatmentDuration: "చికిత్స సమయం",
    successRate: "విజయ శాతం",
    watering: "నీరు పోయడం",
    sunlight: "సూర్యకాంతి",
    soil: "మట్టి",
    fertilizer: "ఎరువులు",
    download: "PDF డౌన్‌లోడ్",
    uploadNew: "కొత్త చిత్రాన్ని అప్‌లోడ్ చేయండి",
  },
  ta: {
    risk: "ஆபத்து",
    healthScore: "சுகாதார மதிப்பெண்",
    confidence: "அடையாள நம்பிக்கை",
    plantIdentity: "தாவர அடையாளம்",
    healthStatus: "சுகாதார நிலை",
    diseaseDetails: "நோய் விவரங்கள்",
    symptoms: "கண்டறியப்பட்ட அறிகுறிகள்",
    treatmentPlan: "சிகிச்சை திட்டம்",
    careGuide: "பராமரிப்பு வழிகாட்டி",
    prevention: "தடுப்பு குறிப்புகள்",
    notes: "கூடுதல் குறிப்புகள்",
    commonName: "பொதுவான பெயர்",
    scientificName: "அறிவியல் பெயர்",
    family: "குடும்பம்",
    confLabel: "நம்பிக்கை",
    disease: "நோய்",
    severity: "தீவிரம்",
    affectedParts: "பாதிக்கப்பட்ட பகுதிகள்",
    duration: "மதிப்பிடப்பட்ட காலம்",
    immediate: "உடனடி நடவடிக்கைகள்",
    remedies: "பரிந்துரைக்கப்பட்ட தீர்வுகள்",
    treatmentDuration: "சிகிச்சை காலம்",
    successRate: "வெற்றி விகிதம்",
    watering: "நீர்ப்பாசனம்",
    sunlight: "சூரிய ஒளி",
    soil: "மண்",
    fertilizer: "உரம்",
    download: "PDF பதிவிறக்கம்",
    uploadNew: "புதிய படத்தை பதிவேற்றவும்",
  },
  // ... (Other languages follow the same pattern, logic handles fallbacks)
};

const PlantReport = ({ reportData, image, onNewScan, language = "en" }) => {
  
  // Helper to get text based on language
  const t = (key) => REPORT_TRANSLATIONS[language]?.[key] || REPORT_TRANSLATIONS["en"][key];
  const { toast } = useToast();
  const printableRef = useRef(null); // 🔹 Ref for the hidden printable component
  const [isDownloading, setIsDownloading] = useState(false);

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'risk-low';
      case 'medium': return 'risk-medium';
      case 'high': return 'risk-high';
      default: return 'risk-medium';
    }
  };

// 🔹 PDF Generation Logic
const handleDownload = async () => {
    const element = printableRef.current;
    if (!element) return;

    setIsDownloading(true);
    toast({
      title: "Preparing Report...",
      description: "Generating a high-quality PDF document.",
    });

    try {
      // 1. Capture the HIDDEN clean report component
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // 2. Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 3. Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // 4. Save
      const fileName = `LeafLens_Report_${reportData.plantName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Report Downloaded",
        description: "Your official plant health report is ready.",
        variant: "default",
      });

    } catch (error) {
      console.error("PDF Error:", error);
      toast({
        title: "Download Failed",
        description: "Could not generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };
return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <PrintableReport 
        ref={printableRef}
        reportData={reportData}
        image={image}
        language={language}
        translations={REPORT_TRANSLATIONS}
      />


        
        {/* Header with image and summary */}
        <div className="glass-card p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shrink-0">
              {/* Use crossOrigin="anonymous" to help html2canvas capture the image */}
              <img 
                src={image} 
                alt="Scanned plant" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous" 
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
                  {reportData.riskLevel.charAt(0).toUpperCase() + reportData.riskLevel.slice(1)} {t('risk')}
                </span>
              </div>
              
              {/* Health Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('healthScore')}</span>
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
                <span>{reportData.confidence}% {t('confidence')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="space-y-3">
          {/* Plant Identity */}
          <ReportSection title={t('plantIdentity')} icon={Leaf} defaultOpen>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('commonName')}</p>
                <p className="font-medium text-foreground">{reportData.plantName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('scientificName')}</p>
                <p className="font-medium text-foreground">{reportData.scientificName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('family')}</p>
                <p className="font-medium text-foreground">{reportData.family}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('confLabel')}</p>
                <p className="font-medium text-foreground">{reportData.confidence}%</p>
              </div>
            </div>
          </ReportSection>

          {/* Health Status */}
          <ReportSection title={t('healthStatus')} icon={Heart} defaultOpen>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(reportData.riskLevel)}`}>
                  {reportData.riskLevel.toUpperCase()} {t('risk').toUpperCase()}
                </span>
                <span className="text-foreground font-medium">{reportData.healthScore}% {t('healthScore')}</span>
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
          <ReportSection title={t('diseaseDetails')} icon={Bug}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('disease')}</p>
                  <p className="font-medium text-foreground">{reportData.disease}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('severity')}</p>
                  <p className="font-medium text-foreground">{reportData.severity}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t('affectedParts')}</p>
                <div className="flex flex-wrap gap-2">
                  {reportData.affectedParts.map((part, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary rounded-md text-sm text-foreground">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('duration')}</p>
                <p className="font-medium text-foreground">{reportData.diseaseDuration}</p>
              </div>
            </div>
          </ReportSection>

          {/* Symptoms */}
          <ReportSection title={t('symptoms')} icon={AlertTriangle}>
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
          <ReportSection title={t('treatmentPlan')} icon={Pill}>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">{t('immediate')}</h4>
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
                <h4 className="font-medium text-foreground mb-2">{t('remedies')}</h4>
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
                  <p className="text-sm text-muted-foreground">{t('treatmentDuration')}</p>
                  <p className="font-medium text-foreground">{reportData.treatment.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('successRate')}</p>
                  <p className="font-medium text-primary">{reportData.treatment.successRate}%</p>
                </div>
              </div>
            </div>
          </ReportSection>

          {/* Care Guide */}
          <ReportSection title={t('careGuide')} icon={Droplets}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">{t('watering')}</span>
                </div>
                <p className="text-foreground text-sm">{reportData.careGuide.watering}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">{t('sunlight')}</span>
                </div>
                <p className="text-foreground text-sm">{reportData.careGuide.sunlight}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('soil')}</span>
                </div>
                <p className="text-foreground text-sm">{reportData.careGuide.soil}</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Pill className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-muted-foreground">{t('fertilizer')}</span>
                </div>
                <p className="text-foreground text-sm">{reportData.careGuide.fertilizer}</p>
              </div>
            </div>
          </ReportSection>

          {/* Prevention Tips */}
          <ReportSection title={t('prevention')} icon={Shield}>
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
          <ReportSection title={t('notes')} icon={FileText}>
            <p className="text-muted-foreground">{reportData.notes}</p>
          </ReportSection>
        </div>
    

      {/* Action Buttons (Outside the printable div) */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button onClick={handleDownload} variant="outline" className="flex-1 btn-outline">
          <Download className="w-4 h-4 mr-2" />
          {t('download')}
        </Button>
        <Button onClick={onNewScan} className="flex-1 btn-primary">
          <Upload className="w-4 h-4 mr-2" />
          {t('uploadNew')}
        </Button>
      </div>
    </div>
  );
};

export default PlantReport;

