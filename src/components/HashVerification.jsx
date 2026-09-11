import { useState } from 'react'
import { verifyHash } from '../services/api'

export default function HashVerification() {
  const [record, setRecord] = useState('')
  const [hash, setHash] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleVerify(event) {
    event.preventDefault()

    if (!record.trim() || !hash.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await verifyHash({
        record: record.trim(),
        expected_hash: hash.trim(),
      })

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
          <h2>Hash Verification</h2>
          <p>Verify the integrity of a Fresh Guard record.</p>
        </div>
      </div>

      <section className="panel">
        <div className="section-heading">
          <h3>Integrity Check</h3>
          <span>SHA-256 verification</span>
        </div>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={record}
            onChange={(event) => setRecord(event.target.value)}
            placeholder="Enter record data"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '12px',
            }}
          />

          <input
            type="text"
            value={hash}
            onChange={(event) => setHash(event.target.value)}
            placeholder="Enter expected hash"
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
            {loading ? 'Verifying...' : 'Verify Hash'}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '20px' }}>
            <strong>
              {result.success
                ? '✓ Hash Verified'
                : '✕ Verification Failed'}
            </strong>

            <p>
              {result.message ||
                result.error ||
                'Hash verification completed.'}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}