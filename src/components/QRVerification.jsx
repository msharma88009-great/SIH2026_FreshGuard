import { useState } from 'react'
import { verifyQR } from '../services/api'
import QRScanner from './QRScanner'

export default function QRVerification() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleDemoQR() {
    setCode('FG-DEMO-001')
    setResult(null)
  }

  async function handleVerify(event) {
    event.preventDefault()

    if (!code.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await verifyQR(code.trim())
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>QR Verification</h2>
          <p>Verify a product's farm-to-fork digital record.</p>
        </div>
      </div>

      <div className="detail-layout">
        <section className="detail-card">
          <div className="section-heading">
            <h3>Scan & Trust</h3>
            <span>QR verification</span>
          </div>

          <QRScanner onDemo={handleDemoQR} />

          <form onSubmit={handleVerify} style={{ marginTop: '20px' }}>
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Enter QR payload"
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
              }}
            />

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify QR'}
            </button>
          </form>
        </section>

        <section className="detail-card">
          <div className="section-heading">
            <h3>Verification Result</h3>
          </div>

          {!result ? (
            <p>Enter a QR payload to verify the record.</p>
          ) : result.success ? (
            <div>
              <strong>✓ Verified</strong>
              <p>{result.message || 'QR record verified successfully.'}</p>

              {result.data && (
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ) : (
            <div>
              <strong>✕ Verification Failed</strong>
              <p>{result.error || 'QR verification failed.'}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}