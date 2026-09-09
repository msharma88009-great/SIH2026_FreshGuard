import { useMemo, useState } from 'react'
import './App.css'

import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import Shipments from './components/Shipments'
import LiveMonitoring from './components/LiveMonitoring'
import MapTracking from './components/MapTracking'
import AlertsPage from './components/AlertsPage'
import History from './components/History'
import Traceability from './components/Traceability'
import QRVerification from './components/QRVerification'
import HashVerification from './components/HashVerification'
import Settings from './components/Settings'

const pages = {
  Dashboard,
  Shipments,
  'Live Monitoring': LiveMonitoring,
  'Map Tracking': MapTracking,
  Alerts: AlertsPage,
  History,
  Traceability,
  'QR Verification': QRVerification,
  'Hash Verification': HashVerification,
  Settings,
}

export default function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const ActivePage = useMemo(() => pages[activePage] || Dashboard, [activePage])

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="app-main">
        <Topbar onNavigate={setActivePage} />
        <main className="page-content">
          <ActivePage onNavigate={setActivePage} />
        </main>
      </div>
    </div>
  )
}
