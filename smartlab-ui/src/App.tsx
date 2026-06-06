import { Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/Login';
import DashboardScreen from './pages/Dashboard';
import PatientsManagementScreen from './pages/PatientsManagement';
import AddPatientScreen from './pages/AddPatient';
import TestResultsEntryScreen from './pages/TestResults';
import ReportsScreen from './pages/Reports';
import MedicalTestsScreen from './pages/MedicalTests';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/patients" element={<PatientsManagementScreen />} />
      <Route path="/patients/add" element={<AddPatientScreen />} />
      <Route path="/tests" element={<MedicalTestsScreen />} />
      <Route path="/tests/results" element={<TestResultsEntryScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
    </Routes>
  );
}

export default App;
