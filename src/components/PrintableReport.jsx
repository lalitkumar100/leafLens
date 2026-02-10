import React, { forwardRef } from 'react';
import { Leaf, AlertTriangle, Check, Droplets, Sun, Activity } from 'lucide-react';

const PrintableReport = forwardRef(({ reportData, image, language, translations }, ref) => {
  if (!reportData) return null;

  // Helper for translations
  const t = (key) => translations[language]?.[key] || translations["en"][key] || key;
  const today = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    // 🔹 Fixed A4 Width Container (Hidden from view, used for PDF generation)
    <div ref={ref} className="bg-white text-black p-12 w-[794px] min-h-[1123px] absolute left-[-9999px] top-0 shadow-none print-container">
      
      {/* 🔹 Header: Logo & Branding */}
      <div className="flex justify-between items-center border-b-2 border-green-600 pb-6 mb-8">
        <div className="flex items-center gap-3">
            {/* SVG Logo from public folder */}
            <img src="/favicon1.svg" alt="LeafLens Logo" className="w-12 h-12" />
            <div>
                <h1 className="text-3xl font-bold text-green-700">LeafLens</h1>
                <p className="text-sm text-gray-500">AI Plant Diagnostics Report</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-gray-500 text-sm">Generated on</p>
            <p className="font-semibold text-gray-800">{today}</p>
        </div>
      </div>

      {/* 🔹 Plant Profile Section */}
      <div className="flex gap-8 mb-8">
        <div className="w-40 h-40 rounded-lg overflow-hidden border border-gray-200 shrink-0">
            <img 
                src={image} 
                alt="Plant" 
                className="w-full h-full object-cover" 
                crossOrigin="anonymous" 
            />
        </div>
        <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{reportData.plantName}</h2>
            <p className="text-lg text-gray-600 italic mb-4">{reportData.scientificName}</p>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">{t('confidence')}</span>
                    <span className="text-lg font-semibold text-green-700 flex items-center gap-2">
                        <Check className="w-4 h-4" /> {reportData.confidence}%
                    </span>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-wide block mb-1">{t('healthScore')}</span>
                    <span className="text-lg font-semibold text-green-700 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> {reportData.healthScore}%
                    </span>
                </div>
            </div>
        </div>
      </div>

      {/* 🔹 Diagnosis Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-4 uppercase">
            {t('diseaseDetails')}
        </h3>
        <div className="bg-red-50 p-6 rounded-lg border border-red-100">
            <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                    <h4 className="text-lg font-bold text-red-700">{reportData.disease}</h4>
                    <p className="text-gray-700 mt-1">{reportData.severity} Severity • {reportData.diseaseDuration}</p>
                </div>
            </div>
            <div>
                <strong className="text-gray-800 block mb-2">{t('symptoms')}:</strong>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {reportData.symptoms.map((sym, i) => <li key={i}>{sym}</li>)}
                </ul>
            </div>
        </div>
      </div>

      {/* 🔹 Treatment Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-4 uppercase">
            {t('treatmentPlan')}
        </h3>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Immediate Action</h4>
                <ul className="space-y-2">
                    {reportData.treatment.immediate.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                            <span className="text-blue-600 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">Preventative Care</h4>
                <ul className="space-y-2">
                    {reportData.preventionTips.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                             <span className="text-green-600 font-bold">•</span> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>

       {/* 🔹 Care Guide Grid */}
       <div className="mb-12">
        <h3 className="text-xl font-bold text-gray-900 border-l-4 border-yellow-500 pl-3 mb-4 uppercase">
            {t('careGuide')}
        </h3>
        <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded border border-gray-100 text-center">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{reportData.careGuide.watering}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-100 text-center">
                <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{reportData.careGuide.sunlight}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-100 text-center">
                <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{reportData.careGuide.soil}</p>
            </div>
        </div>
      </div>

      {/* 🔹 Footer */}
      <div className="border-t border-gray-200 pt-6 mt-auto text-center">
        <p className="text-sm text-gray-500">
            This report was generated by AI. For critical agricultural issues, please consult a professional botanist.
        </p>
        <p className="text-green-700 font-semibold mt-2">www.leaflens.com</p>
      </div>

    </div>
  );
});

export default PrintableReport;