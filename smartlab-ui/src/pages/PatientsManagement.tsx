import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Globe, User, Activity, Menu, MapPin, Phone, Users, Stethoscope, FileText } from 'lucide-react';

const patients = [
  { id: 'PT-2025-001', name: 'Ahmad Khan', age: 45, gender: 'Male', phone: '+971 50 123 4567', location: 'Dubai, UAE', status: 'Active', lastVisit: '2025-10-24' },
  { id: 'PT-2025-002', name: 'Sarah Jenkins', age: 32, gender: 'Female', phone: '+971 55 987 6543', location: 'Abu Dhabi, UAE', status: 'Pending Results', lastVisit: '2025-10-22' },
  { id: 'PT-2025-003', name: 'Omar Al-Fayed', age: 58, gender: 'Male', phone: '+971 52 456 7890', location: 'Sharjah, UAE', status: 'Critical', lastVisit: '2025-10-23' },
  { id: 'PT-2025-004', name: 'Fatima Al-Zahra', age: 29, gender: 'Female', phone: '+971 56 321 0987', location: 'Dubai, UAE', status: 'Active', lastVisit: '2025-10-20' },
  { id: 'PT-2025-005', name: 'Michael Chen', age: 41, gender: 'Male', phone: '+971 54 765 4321', location: 'Dubai, UAE', status: 'Discharged', lastVisit: '2025-10-15' },
];

export default function PatientsManagementScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const t = {
    en: {
      title: "Patients Directory",
      subtitle: "Manage and view all registered patients across the SmartLab network.",
      searchPlaceholder: "Search patients by ID, Name, or Phone...",
      addBtn: "Add New Patient",
      filterBtn: "Filters",
      colId: "Patient ID",
      colName: "Patient Details",
      colContact: "Contact & Location",
      colStatus: "Current Status",
      colLastVisit: "Last Visit",
      colActions: "Actions",
      statusActive: "Active",
      statusPending: "Pending Results",
      statusCritical: "Critical",
      statusDischarged: "Discharged"
    },
    ar: {
      title: "دليل المرضى",
      subtitle: "إدارة وعرض جميع المرضى المسجلين عبر شبكة المختبر الذكي.",
      searchPlaceholder: "البحث عن المرضى بالمعرف، الاسم، أو الهاتف...",
      addBtn: "إضافة مريض جديد",
      filterBtn: "تصفية",
      colId: "رقم المريض",
      colName: "تفاصيل المريض",
      colContact: "الاتصال والموقع",
      colStatus: "الحالة الحالية",
      colLastVisit: "الزيارة الأخيرة",
      colActions: "إجراءات",
      statusActive: "نشط",
      statusPending: "في انتظار النتائج",
      statusCritical: "حرج",
      statusDischarged: "تم الخروج"
    }
  };

  const isRtl = lang === 'ar';
  const currT = t[lang];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Active':
      case 'نشط':
        return 'bg-success/10 text-success border border-success/20';
      case 'Pending Results':
      case 'في انتظار النتائج':
        return 'bg-warning/10 text-warning border border-warning/20';
      case 'Critical':
      case 'حرج':
        return 'bg-error/10 text-error border border-error/20';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const getLocalizedStatus = (status: string) => {
    if (lang === 'en') return status;
    switch(status) {
      case 'Active': return 'نشط';
      case 'Pending Results': return 'في انتظار النتائج';
      case 'Critical': return 'حرج';
      case 'Discharged': return 'تم الخروج';
      default: return status;
    }
  };

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
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8">
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
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-1">{currT.title}</h2>
              <p className="text-gray-500 text-sm">{currT.subtitle}</p>
            </div>
            <button onClick={() => navigate("/patients/add")} className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              {currT.addBtn}
            </button>
          </div>

          {/* Filters & Search */}
          <div className="bg-surface p-4 rounded-t-lg border border-gray-200 border-b-0 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                className={`block w-full rounded-md border border-gray-300 py-2.5 ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-sm focus:border-primary focus:ring-primary bg-white`} 
                placeholder={currT.searchPlaceholder}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white transition-colors">
              <Filter className="w-4 h-4" />
              {currT.filterBtn}
            </button>
          </div>

          {/* Data Table */}
          <div className="bg-surface border border-gray-200 rounded-b-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">{currT.colId}</th>
                    <th scope="col" className="px-6 py-4 font-semibold">{currT.colName}</th>
                    <th scope="col" className="px-6 py-4 font-semibold">{currT.colContact}</th>
                    <th scope="col" className="px-6 py-4 font-semibold">{currT.colStatus}</th>
                    <th scope="col" className="px-6 py-4 font-semibold">{currT.colLastVisit}</th>
                    <th scope="col" className="px-6 py-4 text-center font-semibold">{currT.colActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patients.map((pt) => (
                    <tr key={pt.id} className="bg-white hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-primary">{pt.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {pt.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-navy text-base">{pt.name}</div>
                            <div className="text-xs text-gray-500">{lang === 'en' ? `${pt.age} yrs • ${pt.gender}` : `${pt.age} سنة • ${pt.gender === 'Male' ? 'ذكر' : 'أنثى'}`}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {pt.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            {pt.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(pt.status)}`}>
                          {getLocalizedStatus(pt.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pt.lastVisit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-primary/10">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Placeholder */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    {lang === 'en' ? 'Showing ' : 'عرض '}
                    <span className="font-medium">1</span>
                    {lang === 'en' ? ' to ' : ' إلى '}
                    <span className="font-medium">5</span>
                    {lang === 'en' ? ' of ' : ' من '}
                    <span className="font-medium">97</span>
                    {lang === 'en' ? ' results' : ' نتائج'}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary/10 text-primary text-sm font-medium">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}