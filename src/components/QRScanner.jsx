export default function QRScanner({ onDemo }) {
  return (
    <div className="scanner">
      <div className="scanner-frame" />
      <div className="scanner-line" />
      <button
        className="primary-button"
        onClick={onDemo}
        style={{ position: 'absolute', bottom: 18 }}
      >
        Use Demo QR
      </button>
    </div>
  )
}
