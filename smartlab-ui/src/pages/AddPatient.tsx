import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { UserPlus, X, Globe, Save, UploadCloud, Users, Stethoscope, FileText, Activity } from 'lucide-react';

export default function AddPatientScreen() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const navigate = useNavigate();
  

  const t = {
    en: {
      title: "Add New Patient",
      subtitle: "Enter patient details to register them in the SmartLab system.",
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      dob: "Date of Birth",
      gender: "Gender",
      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      contactInfo: "Contact Information",
      email: "Email Address",
      phone: "Phone Number",
      address: "Residential Address",
      medicalHistory: "Medical History",
      bloodGroup: "Blood Group",
      selectBg: "Select Blood Group",
      allergies: "Known Allergies",
      cancel: "Cancel",
      save: "Save Patient Record"
    },
    ar: {
      title: "إضافة مريض جديد",
      subtitle: "أدخل تفاصيل المريض لتسجيله في نظام المختبر الذكي.",
      personalInfo: "المعلومات الشخصية",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      dob: "تاريخ الميلاد",
      gender: "الجنس",
      selectGender: "اختر الجنس",
      male: "ذكر",
      female: "أنثى",
      contactInfo: "معلومات الاتصال",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      address: "عنوان السكن",
      medicalHistory: "التاريخ الطبي",
      bloodGroup: "فصيلة الدم",
      selectBg: "اختر فصيلة الدم",
      allergies: "الحساسية المعروفة",
      cancel: "إلغاء",
      save: "حفظ سجل المريض"
    }
  };

  const isRtl = lang === 'ar';
  const currT = t[lang];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-background flex relative">
      
      {/* Background Dashboard (Blurred out) */}
      <div className="flex-1 flex flex-col min-w-0 opacity-30 filter blur-sm pointer-events-none absolute inset-0 z-0">
        <header className="bg-surface border-b border-gray-200 h-16 flex items-center justify-between px-8">
           <h1 className="text-xl font-bold text-navy">Patients Directory</h1>
        </header>
        <div className="p-8">
          <div className="bg-surface h-96 rounded-lg border border-gray-200"></div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/40 backdrop-blur-sm overflow-y-auto">
        
        <div className="bg-surface w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-full my-8 relative">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-surface rounded-t-xl z-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy">{currT.title}</h2>
                <p className="text-sm text-gray-500">{currT.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <button onClick={() => navigate("/patients")} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <form className="space-y-8">
              
              {/* Section 1 */}
              <div>
                <h3 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-gray-100">{currT.personalInfo}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.firstName}</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Ahmad" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.lastName}</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Khan" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.dob}</label>
                    <input type="date" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.gender}</label>
                    <select className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-600 bg-white">
                      <option value="">{currT.selectGender}</option>
                      <option value="male">{currT.male}</option>
                      <option value="female">{currT.female}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-gray-100">{currT.contactInfo}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.email}</label>
                    <input type="email" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="patient@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.phone}</label>
                    <input type="tel" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="+971 50 123 4567" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.address}</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Street, City, Country" />
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-base font-semibold text-navy mb-4 pb-2 border-b border-gray-100">{currT.medicalHistory}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.bloodGroup}</label>
                    <select className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-gray-600 bg-white">
                      <option value="">{currT.selectBg}</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{currT.allergies}</label>
                    <input type="text" className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. Penicillin, Peanuts" />
                  </div>
                </div>
              </div>
              
              {/* Document Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-gray-50/50">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-navy">
                  {lang === 'en' ? 'Upload ID or Documents' : 'تحميل الهوية أو المستندات'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en' ? 'PNG, JPG or PDF (max. 10MB)' : 'PNG, JPG أو PDF (الحد الأقصى 10MB)'}
                </p>
                <button type="button" className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                  {lang === 'en' ? 'Browse Files' : 'تصفح الملفات'}
                </button>
              </div>

            </form>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex items-center justify-end gap-3 sticky bottom-0">
            <button type="button" onClick={() => navigate("/patients")} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 bg-white transition-colors">
              {currT.cancel}
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Save className="w-4 h-4" />
              {currT.save}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}