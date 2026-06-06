import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { Globe, Activity, Lock, Mail, ArrowRight, Users, Stethoscope, FileText } from 'lucide-react';

export default function LoginScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const res = await axios.post('/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(lang === 'en' ? 'Invalid credentials' : 'بيانات الدخول غير صحيحة');
    }
  };
    
  const t = {
    en: {
      welcome: "Welcome to SmartLab",
      subtitle: "Medical Management System",
      email: "Email Address",
      password: "Password",
      forgot: "Forgot Password?",
      loginBtn: "Sign In",
      help: "Need help? Contact IT Support",
      rights: "© 2025 SmartLab Healthcare. All rights reserved."
    },
    ar: {
      welcome: "مرحباً بكم في المختبر الذكي",
      subtitle: "نظام الإدارة الطبية",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgot: "هل نسيت كلمة المرور؟",
      loginBtn: "تسجيل الدخول",
      help: "تحتاج مساعدة؟ اتصل بدعم تكنولوجيا المعلومات",
      rights: "© 2025 الرعاية الصحية في المختبر الذكي. كل الحقوق محفوظة."
    }
  };

  const isRtl = lang === 'ar';
  const currT = t[lang];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-soft-gray flex flex-col md:flex-row">
      {/* Left side (Branding) - hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-primary p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-white p-2 rounded-lg">
              <Activity className="text-primary w-8 h-8" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SmartLab</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Advanced<br/>Healthcare<br/>Analytics
          </h1>
          <p className="text-primary-100 text-lg opacity-80 max-w-md">
            Streamlining diagnostic workflows and patient data management with uncompromising precision.
          </p>
        </div>
        
        <div className="text-sm opacity-60">
          {currT.rights}
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 justify-center bg-surface relative">
        
        {/* Language Switcher */}
        <div className={`absolute top-8 ${isRtl ? 'left-8' : 'right-8'}`}>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium hover:bg-soft-gray transition-colors"
          >
            <Globe className="w-4 h-4 text-gray-500" />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-3 mb-12">
          <div className="bg-primary p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-navy">SmartLab</span>
        </div>

        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-2">{currT.welcome}</h2>
          <p className="text-gray-500 mb-8">{currT.subtitle}</p>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                {currT.email}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" value={email} onChange={e => setEmail(e.target.value)} 
                  className={`block w-full rounded-md border border-gray-300 py-3 ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-gray-900 focus:border-primary focus:ring-primary focus:outline-none sm:text-sm bg-white`} 
                  placeholder="name@hospital.com" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-navy">
                  {currT.password}
                </label>
                <Link to="#" className="text-sm font-medium text-primary hover:text-primary-hover">
                  {currT.forgot}
                </Link>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" value={password} onChange={e => setPassword(e.target.value)} 
                  className={`block w-full rounded-md border border-gray-300 py-3 ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-gray-900 focus:border-primary focus:ring-primary focus:outline-none sm:text-sm bg-white`} 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {currT.loginBtn}
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {currT.help}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
