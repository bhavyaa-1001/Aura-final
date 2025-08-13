import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DocumentUpload = lazy(() => import('./pages/DocumentUpload'))
const TestUpload = lazy(() => import('./pages/TestUpload'))

// Department Pages
const DPCCCTEPage = lazy(() => import('./pages/department/DPCCCTEPage'))
const CTEChatbotPage = lazy(() => import('./pages/department/dpcc-cte/CTEChatbotPage'))
const SLinePage = lazy(() => import('./pages/department/dpcc-cte/SLinePage'))
const DPCCUploadPage = lazy(() => import('./pages/department/dpcc-cte/UploadPage'))
const MCDPage = lazy(() => import('./pages/department/MCDPage'))
const MCDUploadPage = lazy(() => import('./pages/department/mcd/UploadPage'))
const DFSPage = lazy(() => import('./pages/department/DFSPage'))
const DFSUploadPage = lazy(() => import('./pages/department/dfs/UploadPage'))

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import GeminiChatbot from './components/GeminiChatbot'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<DocumentUpload />} />
              <Route path="/test-upload" element={<TestUpload />} />
              
              {/* Department Routes */}
              {/* DPCC (CTE) Routes */}
              <Route path="/department/dpcc-cte" element={<DPCCCTEPage />} />
              <Route path="/department/dpcc-cte/chatbot" element={<CTEChatbotPage />} />
              <Route path="/department/dpcc-cte/s-line" element={<SLinePage />} />
              <Route path="/department/dpcc-cte/upload" element={<DPCCUploadPage />} />
              
              {/* MCD Routes */}
              <Route path="/department/mcd" element={<MCDPage />} />
              <Route path="/department/mcd/upload" element={<MCDUploadPage />} />
              
              {/* DFS Routes */}
              <Route path="/department/dfs" element={<DFSPage />} />
              <Route path="/department/dfs/upload" element={<DFSUploadPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <GeminiChatbot />
      </div>
    </Router>
  )
}

export default App
