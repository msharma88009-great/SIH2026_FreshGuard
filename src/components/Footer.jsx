export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-brand">
        <strong>FreshGuard</strong>
        <span>Smart IoT-Based Farm-to-Fork Traceability</span>
      </div>

      <div className="footer-links">
        <div>
          <strong>Quick Links</strong>
          <span>Dashboard • Shipments • Live Monitoring • Map Tracking</span>
        </div>
        <div>
          <strong>System</strong>
          <span>Device Status • Data Integrity • QR • Hash Verification</span>
        </div>
      </div>

      <div className="footer-project">
        <strong>Technology</strong>
        <span>ESP32 • IoT Sensors • MQTT • MongoDB</span>
        <span>Blockchain / Hash Verification</span>
      </div>

      <div className="footer-bottom">
        © 2026 FreshGuard. All rights reserved.
      </div>
    </footer>
  )
}
