import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Pill, 
  MessageCircle, 
  Calendar, 
  Activity, 
  User,
  Settings,
  Bell,
  Phone,
  Plus,
  Check,
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  FileText,
  Clock,
  Home,
  Users,
  Shield,
  X,
  Send,
  Save,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Download,
  Eye
} from 'lucide-react';

// User Personas Data
const userPersonas = [
  {
    name: "Margaret Chen",
    age: 67,
    conditions: ["Diabetes Type 2", "Hypertension"],
    techLevel: "Beginner",
    primaryNeeds: ["Simple medication reminders", "Easy communication with doctor", "Large text support"],
    challenges: ["Small text difficult to read", "Complex navigation", "Remembers medications inconsistently"]
  },
  {
    name: "James Rodriguez", 
    age: 34,
    conditions: ["Asthma", "Anxiety"],
    techLevel: "Advanced",
    primaryNeeds: ["Detailed health tracking", "Quick access to emergency info", "Integration with fitness apps"],
    challenges: ["Busy work schedule", "Needs quick medication access", "Wants comprehensive health data"]
  },
  {
    name: "Sarah Williams",
    age: 45, 
    conditions: ["Chronic Pain", "Migraines"],
    techLevel: "Intermediate",
    primaryNeeds: ["Pain level tracking", "Medication effectiveness monitoring", "Accessible during flare-ups"],
    challenges: ["Pain affects device usage", "Needs voice options", "Medication schedule changes frequently"]
  }
];

const medications = [
  { name: "Metformin", dosage: "500mg", frequency: "2x daily", nextDose: "2:00 PM", taken: true },
  { name: "Lisinopril", dosage: "10mg", frequency: "1x daily", nextDose: "8:00 AM", taken: false },
  { name: "Albuterol", dosage: "2 puffs", frequency: "As needed", nextDose: "PRN", taken: false }
];

const healthMetrics = [
  { label: "Blood Pressure", value: "128/82", unit: "mmHg", status: "normal", trend: "stable" },
  { label: "Blood Sugar", value: "145", unit: "mg/dL", status: "elevated", trend: "improving" },
  { label: "Weight", value: "168", unit: "lbs", status: "normal", trend: "stable" },
  { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", trend: "stable" }
];

const messages = [
  { from: "Dr. Anderson", subject: "Lab Results Available", time: "2 hours ago", unread: true },
  { from: "Nurse Sarah", subject: "Appointment Reminder", time: "1 day ago", unread: false },
  { from: "Dr. Anderson", subject: "Medication Adjustment", time: "3 days ago", unread: false }
];

const overallHealthData = {
  healthScore: 78,
  riskFactors: ["High Blood Sugar", "Irregular Sleep"],
  improvements: ["Blood Pressure Stable", "Weight Maintained"],
  monthlyTrends: {
    bloodPressure: "improving",
    bloodSugar: "stable", 
    weight: "stable",
    activity: "increasing"
  },
  lastUpdated: "2 hours ago"
};

function App() {
  const [designTheme, setDesignTheme] = useState<'modern' | 'clinical'>('modern');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPersonas, setShowPersonas] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [symptomData, setSymptomData] = useState({ type: '', severity: 5, notes: '' });
  const [appointmentData, setAppointmentData] = useState({ type: '', date: '', time: '', notes: '' });
  
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const themeClasses = {
    modern: {
      container: "min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-100",
      card: "bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20",
      header: "bg-white/90 backdrop-blur-md border-b border-emerald-200/50",
      primary: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105",
      secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 shadow-md hover:shadow-lg",
      accent: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105"
    },
    clinical: {
      container: "min-h-screen bg-slate-100",
      card: "bg-white rounded-md shadow-sm border-l-4 border-blue-800",
      header: "bg-blue-900 text-white border-b-4 border-blue-700",
      primary: "bg-blue-800 hover:bg-blue-900 border border-blue-700",
      secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-400",
      accent: "bg-teal-700 hover:bg-teal-800 border border-teal-600"
    }
  };

  const theme = themeClasses[designTheme];

  const EmergencyModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${theme.card} p-8 max-w-md w-full mx-4`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-red-600 flex items-center">
            <AlertTriangle className="mr-2" size={24} />
            Emergency Assistance
          </h2>
          <button
            onClick={() => setShowEmergencyModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium mb-2">If this is a life-threatening emergency:</p>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg transition-colors">
              CALL 911 NOW
            </button>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">For non-emergency medical assistance:</p>
            {['Chest Pain/Heart Issues', 'Breathing Problems', 'Severe Pain', 'Medication Reaction', 'Other Medical Issue'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setEmergencyType(type);
                  // Simulate emergency contact
                  alert(`Emergency contact initiated for: ${type}\nConnecting you with on-call medical staff...`);
                  setShowEmergencyModal(false);
                }}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <Phone className="inline mr-1" size={16} />
              24/7 Nurse Hotline: (555) 123-CARE
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const SymptomModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${theme.card} p-8 max-w-md w-full mx-4`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Activity className="mr-2" size={24} />
            Log Symptom
          </h2>
          <button
            onClick={() => setShowSymptomModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symptom Type</label>
            <select
              value={symptomData.type}
              onChange={(e) => setSymptomData({...symptomData, type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select symptom type</option>
              <option value="pain">Pain</option>
              <option value="nausea">Nausea</option>
              <option value="fatigue">Fatigue</option>
              <option value="headache">Headache</option>
              <option value="dizziness">Dizziness</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity Level: {symptomData.severity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={symptomData.severity}
              onChange={(e) => setSymptomData({...symptomData, severity: parseInt(e.target.value)})}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={symptomData.notes}
              onChange={(e) => setSymptomData({...symptomData, notes: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe your symptom in detail..."
            />
          </div>
          
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert(`Symptom logged successfully!\nType: ${symptomData.type}\nSeverity: ${symptomData.severity}/10\nYour healthcare provider will be notified.`);
              setShowSymptomModal(false);
              setSymptomData({ type: '', severity: 5, notes: '' });
            }}
            className={`w-full ${theme.primary} text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center`}
          >
            <Save className="mr-2" size={16} />
            Log Symptom
          </button>
        </form>
      </div>
    </div>
  );

  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${theme.card} p-8 max-w-md w-full mx-4`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Calendar className="mr-2" size={24} />
            Schedule Appointment
          </h2>
          <button
            onClick={() => setShowScheduleModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
            <select
              value={appointmentData.type}
              onChange={(e) => setAppointmentData({...appointmentData, type: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select appointment type</option>
              <option value="routine">Routine Check-up</option>
              <option value="followup">Follow-up Visit</option>
              <option value="urgent">Urgent Care</option>
              <option value="specialist">Specialist Consultation</option>
              <option value="telehealth">Telehealth Visit</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
            <input
              type="date"
              value={appointmentData.date}
              onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
            <select
              value={appointmentData.time}
              onChange={(e) => setAppointmentData({...appointmentData, time: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select time</option>
              <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
              <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
              <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
            <textarea
              value={appointmentData.notes}
              onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Briefly describe the reason for your appointment..."
            />
          </div>
          
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              alert(`Appointment request submitted!\nType: ${appointmentData.type}\nDate: ${appointmentData.date}\nTime: ${appointmentData.time}\n\nYou will receive a confirmation within 24 hours.`);
              setShowScheduleModal(false);
              setAppointmentData({ type: '', date: '', time: '', notes: '' });
            }}
            className={`w-full ${theme.primary} text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center`}
          >
            <Send className="mr-2" size={16} />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );

  const ReportsModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`${theme.card} p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FileText className="mr-2" size={24} />
            Health Reports & Analytics
          </h2>
          <button
            onClick={() => setShowReportsModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <BarChart3 className="mr-2" size={16} />
                Monthly Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Medications Taken:</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Appointments Attended:</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Symptoms Logged:</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center">
                <TrendingUp className="mr-2" size={16} />
                Health Trends
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Blood Pressure:</span>
                  <span className="flex items-center text-green-600">
                    <TrendingDown className="mr-1" size={12} />
                    Improving
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Blood Sugar:</span>
                  <span className="flex items-center text-blue-600">
                    <Minus className="mr-1" size={12} />
                    Stable
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weight:</span>
                  <span className="flex items-center text-blue-600">
                    <Minus className="mr-1" size={12} />
                    Stable
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Available Reports</h3>
            <div className="space-y-2">
              {[
                { name: "Lab Results - Blood Panel", date: "Dec 15, 2024", type: "PDF" },
                { name: "Medication Adherence Report", date: "Dec 10, 2024", type: "PDF" },
                { name: "Symptom Tracking Summary", date: "Dec 8, 2024", type: "PDF" },
                { name: "Vital Signs History", date: "Dec 5, 2024", type: "CSV" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.date} • {report.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button className={`${theme.secondary} px-4 py-2 rounded-lg transition-all`}>
              Generate Custom Report
            </button>
            <button className={`${theme.primary} text-white px-4 py-2 rounded-lg transition-all`}>
              Email All Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const UserMenu = () => (
    <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-40">
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-gray-600">john.doe@email.com</p>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold mb-3 flex items-center">
          <Activity className="mr-2" size={16} />
          Overall Health Data
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div>
              <p className="font-medium">Health Score</p>
              <p className="text-sm text-gray-600">Based on recent data</p>
            </div>
            <div className="text-2xl font-bold text-green-600">{overallHealthData.healthScore}/100</div>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="font-medium text-red-800 mb-1">Risk Factors</p>
            <div className="space-y-1">
              {overallHealthData.riskFactors.map((risk, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full mr-1">
                  {risk}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800 mb-1">Recent Improvements</p>
            <div className="space-y-1">
              {overallHealthData.improvements.map((improvement, index) => (
                <span key={index} className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mr-1">
                  {improvement}
                </span>
              ))}
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800 mb-2">Monthly Trends</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(overallHealthData.monthlyTrends).map(([key, trend]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className={`flex items-center ${
                    trend === 'improving' ? 'text-green-600' : 
                    trend === 'stable' ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
                    {trend === 'improving' && <TrendingUp size={12} className="mr-1" />}
                    {trend === 'stable' && <Minus size={12} className="mr-1" />}
                    {trend === 'increasing' && <TrendingUp size={12} className="mr-1" />}
                    {trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            Last updated: {overallHealthData.lastUpdated}
          </div>
        </div>
      </div>
      
      <hr className="my-2" />
      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
        <User className="mr-3" size={16} />
        Profile Settings
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
        <Settings className="mr-3" size={16} />
        Account Settings
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center">
        <Shield className="mr-3" size={16} />
        Privacy & Security
      </button>
    </div>
  );

  const PersonaPanel = () => (
    <div className={`${theme.card} p-6 mb-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="mr-2" size={20} />
          User Personas Research
        </h3>
        <button
          onClick={() => setShowPersonas(!showPersonas)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${theme.secondary} transition-all`}
        >
          {showPersonas ? 'Hide' : 'Show'} Research
        </button>
      </div>
      {showPersonas && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {userPersonas.map((persona, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold">{persona.name}</h4>
                  <p className="text-sm text-gray-600">Age {persona.age} • {persona.techLevel}</p>
                </div>
              </div>
              <div className="mb-3">
                <h5 className="font-medium text-sm mb-1">Conditions:</h5>
                <div className="flex flex-wrap gap-1">
                  {persona.conditions.map((condition, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-3">
                <h5 className="font-medium text-sm mb-1">Primary Needs:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {persona.primaryNeeds.map((need, i) => (
                    <li key={i}>• {need}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">Challenges:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {persona.challenges.map((challenge, i) => (
                    <li key={i}>• {challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className={`${theme.card} p-6`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Home className="mr-2" size={20} />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowEmergencyModal(true)}
            className={`${theme.primary} text-white p-4 rounded-lg flex flex-col items-center transition-all`}
          >
            <Phone className="mb-2" size={24} />
            <span className="text-sm font-medium">Emergency</span>
          </button>
          <button 
            onClick={() => setShowSymptomModal(true)}
            className={`${theme.accent} text-white p-4 rounded-lg flex flex-col items-center transition-all`}
          >
            <Plus className="mb-2" size={24} />
            <span className="text-sm font-medium">Log Symptom</span>
          </button>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className={`${theme.secondary} p-4 rounded-lg flex flex-col items-center transition-all`}
          >
            <Calendar className="mb-2" size={24} />
            <span className="text-sm font-medium">Schedule</span>
          </button>
          <button 
            onClick={() => setShowReportsModal(true)}
            className={`${theme.secondary} p-4 rounded-lg flex flex-col items-center transition-all`}
          >
            <FileText className="mb-2" size={24} />
            <span className="text-sm font-medium">Reports</span>
          </button>
        </div>
      </div>

      {/* Health Metrics */}
      <div className={`${theme.card} p-6`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Activity className="mr-2" size={20} />
          Today's Health Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                <span className={`w-2 h-2 rounded-full ${
                  metric.status === 'normal' ? 'bg-green-500' : 
                  metric.status === 'elevated' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 capitalize">{metric.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Medications */}
      <div className={`${theme.card} p-6`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="mr-2" size={20} />
          Upcoming Medications
        </h3>
        <div className="space-y-3">
          {medications.filter(med => !med.taken).map((medication, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center">
                <Pill className="mr-3 text-blue-600" size={20} />
                <div>
                  <h4 className="font-medium">{medication.name}</h4>
                  <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-4">{medication.nextDose}</span>
                <button className={`${theme.primary} text-white px-4 py-2 rounded-lg text-sm transition-all`}>
                  Mark Taken
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MedicationsView = () => (
    <div className="space-y-6">
      <div className={`${theme.card} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <Pill className="mr-2" size={20} />
            Medication Management
          </h3>
          <button className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center transition-all`}>
            <Plus className="mr-2" size={16} />
            Add Medication
          </button>
        </div>
        
        <div className="space-y-4">
          {medications.map((medication, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                    medication.taken ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {medication.taken && <Check className="text-white" size={12} />}
                  </div>
                  <div>
                    <h4 className="font-semibold">{medication.name}</h4>
                    <p className="text-sm text-gray-600">{medication.dosage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{medication.nextDose}</div>
                  <div className="text-xs text-gray-500">{medication.frequency}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className={`px-3 py-1 rounded text-xs ${theme.secondary} transition-all`}>
                    Edit
                  </button>
                  <button className="px-3 py-1 rounded text-xs bg-red-100 hover:bg-red-200 text-red-700 transition-colors">
                    Remove
                  </button>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    medication.taken 
                      ? 'bg-green-100 text-green-700' 
                      : `${theme.primary} text-white`
                  }`}
                  disabled={medication.taken}
                >
                  {medication.taken ? 'Taken' : 'Mark Taken'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medication History */}
      <div className={`${theme.card} p-6`}>
        <h3 className="text-lg font-semibold mb-4">Medication History</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50 rounded">
            <div>
              <span className="font-medium">Metformin 500mg</span>
              <span className="text-sm text-gray-600 ml-2">Taken at 8:00 AM</span>
            </div>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <div className="flex items-center justify-between p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
            <div>
              <span className="font-medium">Lisinopril 10mg</span>
              <span className="text-sm text-gray-600 ml-2">Missed dose</span>
            </div>
            <span className="text-xs text-gray-500">Yesterday</span>
          </div>
        </div>
      </div>
    </div>
  );

  const MessagesView = () => (
    <div className="space-y-6">
      <div className={`${theme.card} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageCircle className="mr-2" size={20} />
            Healthcare Provider Messages
          </h3>
          <button className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center transition-all`}>
            <Plus className="mr-2" size={16} />
            New Message
          </button>
        </div>
        
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Stethoscope className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{message.from}</h4>
                    <p className="text-sm text-gray-600">{message.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{message.time}</div>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  message.unread ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {message.unread ? 'Unread' : 'Read'}
                </span>
                <ChevronRight className="text-gray-400" size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Contact */}
      <div className={`${theme.card} p-6`}>
        <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="mr-3 text-red-600" size={20} />
            <div className="text-left">
              <div className="font-medium">Emergency Services</div>
              <div className="text-sm text-gray-600">911</div>
            </div>
          </button>
          <button className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="mr-3 text-blue-600" size={20} />
            <div className="text-left">
              <div className="font-medium">Dr. Anderson</div>
              <div className="text-sm text-gray-600">(555) 123-4567</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'appointments', label: 'Appointments', icon: Calendar }
  ];

  return (
    <div className={theme.container}>
      {/* Header */}
      <header className={`${theme.header} shadow-sm sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className={`${designTheme === 'clinical' ? 'text-white' : 'text-emerald-600'} mr-2`} size={28} />
              <h1 className={`text-xl font-bold ${designTheme === 'clinical' ? 'text-white' : 'text-gray-900'}`}>
                HealthCare Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${designTheme === 'clinical' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Theme:
                </span>
                <button
                  onClick={() => setDesignTheme(designTheme === 'modern' ? 'clinical' : 'modern')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    designTheme === 'modern' 
                      ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                      : 'bg-white text-blue-900 hover:bg-gray-100'
                  }`}
                >
                  {designTheme === 'modern' ? 'Modern' : 'Clinical'}
                </button>
              </div>
              
              <button className={`p-2 rounded-lg transition-colors ${
                designTheme === 'clinical' 
                  ? 'hover:bg-blue-800 text-white' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}>
                <Bell size={20} />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`p-2 rounded-lg transition-colors ${
                    designTheme === 'clinical' 
                      ? 'hover:bg-blue-800 text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <User size={20} />
                </button>
                {showUserMenu && <UserMenu />}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className={`${theme.card} p-8 mb-6 text-center`}>
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-red-500 mr-3" size={32} />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Health, Simplified & Secure
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            AI-powered healthcare management that adapts to your needs. Track medications, connect with providers, and take control of your wellness journey.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="mr-1" size={16} />
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <Clock className="mr-1" size={16} />
              Current time: {currentTime.toLocaleTimeString()}
            </div>
            <div className="flex items-center">
              <Activity className="mr-1" size={16} />
              24/7 Monitoring
            </div>
          </div>
        </div>

        {/* User Personas Panel */}
        <PersonaPanel />

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? `${theme.primary} text-white`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="mr-2" size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'medications' && <MedicationsView />}
        {activeTab === 'messages' && <MessagesView />}
        {activeTab === 'appointments' && (
          <div className={`${theme.card} p-6`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="mr-2" size={20} />
              Upcoming Appointments
            </h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Dr. Anderson - Follow-up</h4>
                    <p className="text-sm text-gray-600">Cardiology Department</p>
                    <p className="text-sm text-gray-500">Tomorrow, 2:30 PM</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className={`${theme.primary} text-white px-4 py-2 rounded-lg text-sm transition-all`}>
                      Join Video Call
                    </button>
                    <button className={`${theme.secondary} px-4 py-2 rounded-lg text-sm transition-all`}>
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>HealthCare Pro • Designed with accessibility and usability in mind</p>
          <p className="mt-1">HIPAA Compliant • End-to-End Encrypted • 24/7 Emergency Support</p>
        </footer>
      </div>

      {/* Modals */}
      {showEmergencyModal && <EmergencyModal />}
      {showSymptomModal && <SymptomModal />}
      {showScheduleModal && <ScheduleModal />}
      {showReportsModal && <ReportsModal />}
    </div>
  );
}

export default App;