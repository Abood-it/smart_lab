import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { Activity, Menu, Globe, ClipboardList, CheckCircle2, AlertCircle, Save, Info, Users, Stethoscope, FileText } from 'lucide-react';

const testParameters = [
  { id: '1', name: 'Hemoglobin (Hb)', unit: 'g/dL', refRange: '13.0 - 17.0', value: '14.5', status: 'Normal' },
  { id: '2', name: 'White Blood Cells (WBC)', unit: 'x10^3/µL', refRange: '4.0 - 11.0', value: '12.2', status: 'High' },
  { id: '3', name: 'Platelets (PLT)', unit: 'x10^3/µL', refRange: '150 - 450', value: '250', status: 'Normal' },
  { id: '4', name: 'Fasting Blood Sugar (FBS)', unit: 'mg/dL', refRange: '70 - 100', value: '105', status: 'High' },
  { id: '5', name: 'Cholesterol (Total)', unit: 'mg/dL', refRange: '< 200', value: '180', status: 'Normal' },
];

export default function TestResultsEntryScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = {
    en: {
      title: "Test Results Entry",
      subtitle: "Log and verify medical test values against standard benchmarks.",
      patientInfo: "Patient Information",
      patientName: "Patient Name",
      testId: "Test ID",
      date: "Collection Date",
      testParams: "Test Parameters & Results",
      param: "Parameter",
      result: "Result",
      unit: "Unit",
      refRange: "Reference Range",
      status: "Status",
      notes: "Clinical Notes & Interpretation",
      notesPlaceholder: "Add any observations or clinical notes here...",
      verify: "Verify Results",
      save: "Save Draft",
      submit: "Submit Final Report"
    },
    ar: {
      title: "إدخال نتائج الاختبار",
      subtitle: "سجل وتحقق من قيم الاختبارات الطبية مقابل المعايير القياسية.",
      patientInfo: "معلومات المريض",
      patientName: "اسم المريض",
      testId: "رقم الاختبار",
      date: "تاريخ الجمع",
      testParams: "معلمات ونتائج الاختبار",
      param: "المعلمة",
      result: "النتيجة",
      unit: "الوحدة",
      refRange: "المدى المرجعي",
      status: "الحالة",
      notes: "الملاحظات السريرية والتفسير",
      notesPlaceholder: "أضف أي ملاحظات أو تفسيرات سريرية هنا...",
      verify: "التحقق من النتائج",
      save: "حفظ كمسودة",
      submit: "تقديم التقرير النهائي"
    }
  };

  const isRtl = lang === 'ar';
  const currT = t[lang];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop & Mobile overlay */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-64 bg-surface border-${isRtl ? 'l' : 'r'} border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} md:relative`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Activity className="w-6 h-6" />
            <span>SmartLab</span>
          </div>
          <button className="md:hidden p-1 text-gray-500" onClick={() => setSidebarOpen(false)}>
            &times;
          </button>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${window.location.pathname === '/dashboard' ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Activity className="w-5 h-5" />
            {lang === 'en' ? 'Dashboard' : 'لوحة القيادة'}
          </Link>
          <Link to="/patients" className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${window.location.pathname.startsWith('/patients') ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Users className="w-5 h-5" />
            {lang === 'en' ? 'Patients' : 'المرضى'}
          </Link>
          <Link to="/tests" className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${window.location.pathname.startsWith('/tests') ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Stethoscope className="w-5 h-5" />
            {lang === 'en' ? 'Medical Tests' : 'الاختبارات الطبية'}
          </Link>
          <Link to="/reports" className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors ${window.location.pathname === '/reports' ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50'}`}>
            <FileText className="w-5 h-5" />
            {lang === 'en' ? 'Reports' : 'التقارير'}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-surface border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-500 -ml-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-navy hidden sm:block">{currT.title}</h1>
          </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header info */}
            <div>
              <h2 className="text-2xl font-bold text-navy">{currT.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{currT.subtitle}</p>
            </div>

            {/* Patient Context Card */}
            <div className="bg-surface border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  AK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Ahmad Khan</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                    <span>{currT.testId}: <strong className="text-navy">TST-8829</strong></span>
                    <span>•</span>
                    <span>{currT.date}: <strong>Oct 24, 2025</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-semibold">
                  {lang === 'en' ? 'Pending Verification' : 'في انتظار التحقق'}
                </span>
              </div>
            </div>

            {/* Test Results Table Form */}
            <div className="bg-surface border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-base font-bold text-navy flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  Complete Blood Count (CBC) & Lipids
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 font-semibold w-1/3">{currT.param}</th>
                      <th className="px-6 py-3 font-semibold w-32">{currT.result}</th>
                      <th className="px-6 py-3 font-semibold">{currT.unit}</th>
                      <th className="px-6 py-3 font-semibold">{currT.refRange}</th>
                      <th className="px-6 py-3 font-semibold text-center">{currT.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {testParameters.map((param) => (
                      <tr key={param.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-navy">{param.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <input 
                            type="text" 
                            defaultValue={param.value}
                            className={`w-full max-w-[100px] rounded-md border ${param.status === 'High' ? 'border-error text-error focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} py-1.5 px-3 text-sm outline-none font-semibold`}
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-500">{param.unit}</td>
                        <td className="px-6 py-4 text-gray-500 font-mono text-xs">{param.refRange}</td>
                        <td className="px-6 py-4 text-center">
                          {param.status === 'Normal' ? (
                            <div className="inline-flex items-center gap-1.5 text-success">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-xs font-semibold">{lang === 'en' ? 'Normal' : 'طبيعي'}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 text-error">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-semibold">{lang === 'en' ? param.status : 'مرتفع'}</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Notes Section */}
              <div className="p-6 border-t border-gray-200 bg-gray-50/30">
                <label className="flex items-center gap-2 text-sm font-semibold text-navy mb-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  {currT.notes}
                </label>
                <textarea 
                  rows={3}
                  className="w-full rounded-md border border-gray-300 py-3 px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none bg-white"
                  placeholder={currT.notesPlaceholder}
                ></textarea>
              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="text-sm font-medium text-navy">{currT.verify}</span>
                </label>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 bg-white transition-colors">
                    {currT.save}
                  </button>
                  <button className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
                    <Save className="w-4 h-4" />
                    {currT.submit}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}