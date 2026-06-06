import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Menu, Activity, Users, FileText, ArrowUpRight, ArrowDownRight, Globe, Stethoscope } from 'lucide-react';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 6890 },
  { name: 'Jun', value: 8390 },
];

const defaultTrafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
];
const COLORS = ['#0052CC', '#00A3BF', '#0F9D58'];

const defaultTransactions = [
  { id: 'TRX-101', patient: 'Ahmad Khan', date: '2025-10-24', amount: '$120.00', status: 'Completed' },
  { id: 'TRX-102', patient: 'Sarah Jenkins', date: '2025-10-23', amount: '$340.50', status: 'Pending' },
  { id: 'TRX-103', patient: 'Omar Al-Fayed', date: '2025-10-23', amount: '$85.00', status: 'Completed' },
];

type DashboardKpi = {
  revenue: string | number;
  tests: string | number;
  active_patients: string | number;
};

type DashboardTransaction = {
  id: string;
  patient: string;
  date: string;
  amount: string;
  status: string;
};

type DashboardData = {
  kpi: DashboardKpi;
  revenueData: Array<{ name: string; value: number }>;
  trafficData: Array<{ name: string; value: number }>;
  transactions: DashboardTransaction[];
};

const translations = {
  en: {
    dash: "Dashboard",
    patients: "Patients",
    reports: "Reports",
    settings: "Settings",
    revenue: "Total Revenue",
    tests: "Tests Conducted",
    active: "Active Patients",
    revTrend: "Revenue Trend",
    traffic: "Traffic Sources",
    recent: "Recent Transactions",
    trxId: "Transaction ID",
    patient: "Patient",
    date: "Date",
    amount: "Amount",
    status: "Status"
  },
  ar: {
    dash: "لوحة القيادة",
    patients: "المرضى",
    reports: "التقارير",
    settings: "الإعدادات",
    revenue: "إجمالي الإيرادات",
    tests: "الاختبارات المجراة",
    active: "المرضى النشطين",
    revTrend: "اتجاه الإيرادات",
    traffic: "مصادر الزيارات",
    recent: "أحدث المعاملات",
    trxId: "رقم المعاملة",
    patient: "المريض",
    date: "التاريخ",
    amount: "المبلغ",
    status: "الحالة"
  }
};

export default function DashboardScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get<DashboardData>('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(res.data);
      } catch (err: unknown) {
        const error = err as { response?: { status?: number } };
        if (error.response?.status === 401) {
          navigate('/');
        }
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (!dashboardData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currT = translations[lang];
  const isRtl = lang === 'ar';
  const chartRevenueData = dashboardData.revenueData?.length ? dashboardData.revenueData : revenueData;
  const chartTrafficData = dashboardData.trafficData?.length ? dashboardData.trafficData : defaultTrafficData;
  const tableTransactions = dashboardData.transactions?.length ? dashboardData.transactions : defaultTransactions;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-50 w-64 bg-surface border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')} md:relative`}>
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

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8">
          <button className="md:hidden p-2 text-gray-500" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-bold text-navy mb-6">{currT.dash}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm font-semibold text-gray-500 mb-1">{currT.revenue}</div>
              <div className="text-3xl font-bold text-navy mb-2">{dashboardData.kpi.revenue}</div>
              <div className="flex items-center text-success text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm font-semibold text-gray-500 mb-1">{currT.tests}</div>
              <div className="text-3xl font-bold text-navy mb-2">{dashboardData.kpi.tests}</div>
              <div className="flex items-center text-success text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+5.2%</span>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm font-semibold text-gray-500 mb-1">{currT.active}</div>
              <div className="text-3xl font-bold text-navy mb-2">{dashboardData.kpi.active_patients}</div>
              <div className="flex items-center text-error text-sm font-medium">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>-2.1%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-lg font-semibold text-navy mb-4">{currT.revTrend}</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0052CC" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke="#0052CC" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-navy mb-4">{currT.traffic}</h2>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartTrafficData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartTrafficData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy">{currT.recent}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">{currT.trxId}</th>
                    <th scope="col" className="px-6 py-3">{currT.patient}</th>
                    <th scope="col" className="px-6 py-3">{currT.date}</th>
                    <th scope="col" className="px-6 py-3">{currT.amount}</th>
                    <th scope="col" className="px-6 py-3">{currT.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableTransactions.map((trx, idx) => (
                    <tr key={idx} className="bg-white border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-navy">{trx.id}</td>
                      <td className="px-6 py-4">{trx.patient}</td>
                      <td className="px-6 py-4">{trx.date}</td>
                      <td className="px-6 py-4 font-semibold">{trx.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          trx.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
