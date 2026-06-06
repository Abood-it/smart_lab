import os
import glob
import re

pages_dir = 'smartlab-ui/src/pages'
files = glob.glob(os.path.join(pages_dir, '*.tsx'))

def patch_login(content):
    if 'import axios' not in content:
        content = content.replace('import { useState }', "import { useState } from 'react';\nimport axios")
    
    # Replace states
    content = re.sub(r'const \[lang, setLang\] = useState.*?;', r"const [lang, setLang] = useState<'en' | 'ar'>('en');\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [error, setError] = useState('');\n", content)
    
    # Handle submit
    submit_logic = """
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
    """
    content = re.sub(r'const t = {', submit_logic + '\n  const t = {', content)
    
    # Update form JSX
    content = content.replace('onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }}', 'onSubmit={handleLogin}')
    
    # Bind inputs
    content = content.replace('type="email"', 'type="email" value={email} onChange={e => setEmail(e.target.value)}')
    content = content.replace('type="password"', 'type="password" value={password} onChange={e => setPassword(e.target.value)}')
    
    # Show error
    content = content.replace('<form className="space-y-6"', '{error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}\n          <form className="space-y-6"')
    
    return content

def patch_dashboard(content):
    if 'import axios' not in content:
        content = content.replace('import { useState }', "import { useState, useEffect } from 'react';\nimport axios")
    
    state_injection = """
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/');
        }
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (!dashboardData) return <div>Loading...</div>;
    """
    
    content = re.sub(r'const \[sidebarOpen.*?;', r"const [sidebarOpen, setSidebarOpen] = useState(false);\n" + state_injection, content)
    
    # Update JSX mapping
    content = content.replace('>$124,500<', '>{dashboardData.kpi.revenue}<')
    content = content.replace('>8,420<', '>{dashboardData.kpi.tests}<')
    content = content.replace('>1,240<', '>{dashboardData.kpi.active_patients}<')
    
    content = content.replace('data={revenueData}', 'data={dashboardData.revenueData}')
    content = content.replace('data={trafficData}', 'data={dashboardData.trafficData}')
    content = content.replace('transactions.map', 'dashboardData.transactions.map')
    
    return content

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(file)

    if filename == 'Login.tsx':
        content = patch_login(content)
    elif filename == 'Dashboard.tsx':
        content = patch_dashboard(content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Frontend React components patched to use Axios and live API.")