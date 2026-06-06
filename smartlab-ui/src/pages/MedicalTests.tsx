import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { Activity, Menu, Globe, Search, Filter, Plus, Stethoscope, Clock, FileText, ChevronRight, Users } from 'lucide-react';

const testsData = [
  { id: 'TEST-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', duration: '24 Hours', price: '$45.00', status: 'Available' },
  { id: 'TEST-002', name: 'Lipid Panel', category: 'Biochemistry', duration: '48 Hours', price: '$85.00', status: 'Available' },
  { id: 'TEST-003', name: 'Thyroid Stimulating Hormone (TSH)', category: 'Endocrinology', duration: '24 Hours', price: '$65.00', status: 'Available' },
  { id: 'TEST-004', name: 'Urine Culture', category: 'Microbiology', duration: '72 Hours', price: '$55.00', status: 'Delayed' },
  { id: 'TEST-005', name: 'HbA1c', category: 'Biochemistry', duration: '24 Hours', price: '$40.00', status: 'Available' },
  { id: 'TEST-006', name: 'Vitamin D (25-OH)', category: 'Biochemistry', duration: '48 Hours', price: '$120.00', status: 'Out of Stock' },
];

export default function MedicalTestsScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const t = {
    en: {
      title: "Medical Tests Catalog",
      subtitle: "Browse and manage the complete directory of available laboratory tests.",
      searchPlaceholder: "Search tests by name or ID...",
      filterBtn: "Filters",
      addBtn: "Add New Test",
      categories: "Categories",
      all: "All Tests",
      hematology: "Hematology",
      biochem: "Biochemistry",
      micro: "Microbiology",
      endo: "Endocrinology",
      testId: "Test ID",
      testName: "Test Name & Category",
      turnaround: "Turnaround Time",
      price: "Base Price",
      status: "Status",
      action: "Details",
      statusAvailable: "Available",
      statusDelayed: "Delayed",
      statusOOS: "Out of Stock"
    },
    ar: {
      title: "كتالوج الاختبارات الطبية",
      subtitle: "تصفح وإدارة الدليل الكامل للاختبارات المخبرية المتاحة.",
      searchPlaceholder: "البحث عن الاختبارات بالاسم أو المعرف...",
      filterBtn: "تصفية",
      addBtn: "إضافة اختبار جديد",
      categories: "الفئات",
      all: "جميع الاختبارات",
      hematology: "أمراض الدم",
      biochem: "الكيمياء الحيوية",
      micro: "علم الأحياء الدقيقة",
      endo: "علم الغدد الصماء",
      testId: "رقم الاختبار",
      testName: "اسم الاختبار والفئة",
      turnaround: "وقت التسليم",
      price: "السعر الأساسي",
      status: "الحالة",
      action: "التفاصيل",
      statusAvailable: "متاح",
      statusDelayed: "متأخر",
      statusOOS: "غير متوفر"
    }
  };

  const isRtl = lang === 'ar';
  const currT = t[lang];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Available':
        return 'bg-success/10 text-success border border-success/20';
      case 'Delayed':
        return 'bg-warning/10 text-warning border border-warning/20';
      case 'Out of Stock':
        return 'bg-error/10 text-error border border-error/20';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };
  
  const getLocalizedStatus = (status: string) => {
    if (lang === 'en') return status;
    switch(status) {
      case 'Available': return 'متاح';
      case 'Delayed': return 'متأخر';
      case 'Out of Stock': return 'غير متوفر';
      default: return status;
    }
  };

  const categories = [
    { name: 'All', label: currT.all },
    { name: 'Hematology', label: currT.hematology },
    { name: 'Biochemistry', label: currT.biochem },
    { name: 'Microbiology', label: currT.micro },
    { name: 'Endocrinology', label: currT.endo }
  ];

  const filteredTests = activeCategory === 'All' 
    ? testsData 
    : testsData.filter(test => test.category === activeCategory);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop & Mobile overlay */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-0' : 'left-0'} z-50 w-64 bg-surface border-${isRtl ? 'l' : 'r'} border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} md:relative flex flex-col`}>
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
          
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-navy mb-1">{currT.title}</h2>
                <p className="text-gray-500 text-sm">{currT.subtitle}</p>
              </div>
              <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap shadow-sm">
                <Plus className="w-4 h-4" />
                {currT.addBtn}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Filters/Categories */}
              <div className="w-full lg:w-64 shrink-0 space-y-6">
                <div className="relative">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    className={`block w-full rounded-md border border-gray-300 py-2.5 ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white`} 
                    placeholder={currT.searchPlaceholder}
                  />
                </div>
                
                <div className="bg-surface border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-3">{currT.categories}</h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button 
                        key={cat.name}
                        onClick={() => setActiveCategory(cat.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                          activeCategory === cat.name 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {cat.label}
                        {activeCategory === cat.name && <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Data Table */}
              <div className="flex-1 min-w-0">
                <div className="bg-surface border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                  
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-semibold text-navy">
                      {categories.find(c => c.name === activeCategory)?.label}
                      <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">{filteredTests.length}</span>
                    </h3>
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                      <Filter className="w-4 h-4" />
                      {currT.filterBtn}
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 font-semibold">{currT.testId}</th>
                          <th className="px-6 py-3 font-semibold">{currT.testName}</th>
                          <th className="px-6 py-3 font-semibold">{currT.turnaround}</th>
                          <th className="px-6 py-3 font-semibold">{currT.price}</th>
                          <th className="px-6 py-3 font-semibold">{currT.status}</th>
                          <th className="px-6 py-3 font-semibold text-center">{currT.action}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredTests.map((test) => (
                          <tr key={test.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-primary">{test.id}</td>
                            <td className="px-6 py-4">
                              <div className="font-semibold text-navy">{test.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{lang === 'en' ? test.category : categories.find(c => c.name === test.category)?.label}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {lang === 'en' ? test.duration : test.duration.replace('Hours', 'ساعة')}
                              </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-navy">{test.price}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(test.status)}`}>
                                {getLocalizedStatus(test.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button onClick={() => navigate("/tests/results")} className="text-gray-400 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-primary/10 inline-flex">
                                <FileText className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredTests.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                              {lang === 'en' ? 'No tests found in this category.' : 'لم يتم العثور على اختبارات في هذه الفئة.'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}