import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./components/Dashboard";
import Shipments from "./components/Shipments";
import LiveMonitoring from "./components/LiveMonitoring";
import MapTracking from "./components/MapTracking";
import AlertsPage from "./components/AlertsPage";
import History from "./components/History";
import Traceability from "./components/Traceability";
import QRVerification from "./components/QRVerification";
import HashVerification from "./components/HashVerification";
import Settings from "./components/Settings";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;

      case "Shipments":
        return <Shipments />;

      case "Live Monitoring":
        return <LiveMonitoring />;

      case "Map Tracking":
        return <MapTracking />;

      case "Alerts":
        return <AlertsPage />;

      case "History":
        return <History />;

      case "Traceability":
        return <Traceability />;

      case "QR Verification":
        return <QRVerification />;

      case "Hash Verification":
        return <HashVerification />;

      case "Settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <main className="main">
        <Topbar />

        <section className="dashboard">
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

export default App;