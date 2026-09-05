import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import CoachSearchPage from './pages/student/CoachSearchPage'
import CoreCoursesPage from './pages/student/CoreCoursesPage'
import EligibilityPage from './pages/student/EligibilityPage'
import RecruitingCalendarPage from './pages/student/RecruitingCalendarPage'
import RecruitingPage from './pages/student/RecruitingPage'
import StudentDashboard from './pages/student/StudentDashboard'
import TestScoresPage from './pages/student/TestScoresPage'
import TrainingLibraryPage from './pages/student/TrainingLibraryPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/courses" element={<CoreCoursesPage />} />
            <Route path="/test-scores" element={<TestScoresPage />} />
            <Route path="/recruiting" element={<RecruitingPage />} />
            <Route path="/recruiting/calendar" element={<RecruitingCalendarPage />} />
            <Route path="/recruiting/:section" element={<RecruitingPage />} />
            <Route path="/profile" element={<Navigate to="/recruiting/profile" replace />} />
            <Route path="/positions" element={<Navigate to="/recruiting/positions" replace />} />
            <Route path="/targets" element={<Navigate to="/recruiting/targets" replace />} />
            <Route path="/training" element={<TrainingLibraryPage />} />
            <Route path="/calendar" element={<Navigate to="/recruiting/calendar" replace />} />
            <Route path="/coaches" element={<CoachSearchPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
