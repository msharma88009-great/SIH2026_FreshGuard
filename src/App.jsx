import { useMemo, useState } from 'react'
import './App.css'

import Login from './components/Login'
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

function getSavedProfile() {
  try {
    const saved = localStorage.getItem('freshGuardProfile')

    if (!saved) {
      return null
    }

    const profile = JSON.parse(saved)

    return profile?.loggedIn ? profile : null
  } catch {
    return null
  }
}

function getSavedDarkMode() {
  try {
    const saved = localStorage.getItem('freshGuardSettings')

    if (!saved) {
      return false
    }

    return Boolean(JSON.parse(saved)?.darkMode)
  } catch {
    return false
  }
}

export default function App() {
  const [profile, setProfile] = useState(getSavedProfile)
  const [activePage, setActivePage] = useState('Dashboard')
  const [darkMode, setDarkMode] = useState(getSavedDarkMode)

  const ActivePage = useMemo(
    () => pages[activePage] || Dashboard,
    [activePage]
  )

  function handleLogin(savedProfile) {
    setProfile(savedProfile)
    setActivePage('Dashboard')
  }

  function handleLogout() {
    localStorage.removeItem('freshGuardProfile')
    setProfile(null)
    setActivePage('Dashboard')
  }

  function handleDarkModeChange(enabled) {
    setDarkMode(enabled)

    try {
      const saved = localStorage.getItem('freshGuardSettings')
      const settings = saved ? JSON.parse(saved) : {}

      localStorage.setItem(
        'freshGuardSettings',
        JSON.stringify({
          ...settings,
          darkMode: enabled,
        })
      )
    } catch {
      localStorage.setItem(
        'freshGuardSettings',
        JSON.stringify({
          darkMode: enabled,
        })
      )
    }
  }

  if (!profile) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="app-main">
        <Topbar
          onNavigate={setActivePage}
          profile={profile}
          onLogout={handleLogout}
        />

        <main className="page-content">
          <ActivePage
            onNavigate={setActivePage}
            profile={profile}
            darkMode={darkMode}
            onDarkModeChange={handleDarkModeChange}
          />
        </main>
      </div>
    </div>
  )
}