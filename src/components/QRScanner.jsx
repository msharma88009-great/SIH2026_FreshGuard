import { useState } from "react";

function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const startScan = () => {
    setScanning(true);
    setResult(null);

    setTimeout(() => {
      setScanning(false);
      setResult({
        batchId: "BATCH-2026-001",
        product: "Fresh Tomatoes",
        status: "Verified",
        freshness: 92,
      });
    }, 1500);
  };

  return (
    <div className="qr-scanner-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            QR TECHNOLOGY
          </span>

          <h1>QR Scanner</h1>

          <p>
            Scan a product QR code to retrieve its
            traceability record.
          </p>
        </div>

        <div className="verified-header">
          <span>🔐</span>
          Secure Scanner
        </div>
      </div>

      <div className="scanner-layout">

        <div className="scanner-card">
          <div className="scanner-header">
            <div>
              <span className="section-label">
                CAMERA
              </span>

              <h2>Scan QR Code</h2>
            </div>

            <span className="scanner-status">
              ● Ready
            </span>
          </div>

          <div className="scanner-area">

            <div className="scanner-corners">
              <span className="corner top-left"></span>
              <span className="corner top-right"></span>
              <span className="corner bottom-left"></span>
              <span className="corner bottom-right"></span>
            </div>

            {scanning && (
              <div className="scanner-line"></div>
            )}

            <div className="scanner-qr">
              <div className="fake-qr">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <p>
              {scanning
                ? "Scanning QR code..."
                : "Place the QR code inside the frame"}
            </p>
          </div>

          <button
            className="primary-button scan-button"
            onClick={startScan}
            disabled={scanning}
          >
            {scanning
              ? "Scanning..."
              : "📷 Start Scanner"}
          </button>
        </div>

        <div className="scanner-result">

          <span className="section-label">
            VERIFICATION RESULT
          </span>

          <h2>Scan Result</h2>

          {!result && (
            <div className="no-result">
              <div>▣</div>

              <strong>
                No QR code scanned
              </strong>

              <p>
                Start the scanner to verify a product.
              </p>
            </div>
          )}

          {result && (
            <div className="scan-success">

              <div className="scan-success-icon">
                ✓
              </div>

              <h3>Product Verified</h3>

              <p>
                The QR record was successfully verified.
              </p>

              <div className="result-details">

                <div>
                  <span>Batch ID</span>
                  <strong>{result.batchId}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>{result.product}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="verified-text">
                    ✓ {result.status}
                  </strong>
                </div>

                <div>
                  <span>Freshness</span>
                  <strong>{result.freshness}%</strong>
                </div>

              </div>

              <button className="secondary-button">
                View Full Traceability →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QRScanner;