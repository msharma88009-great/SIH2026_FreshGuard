import { useEffect, useRef, useState } from 'react'

export default function QRScanner({ onDemo, onDetected }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [scanning, setScanning] = useState(false)
  const [message, setMessage] = useState('Camera scanning is optional; you can also enter a QR payload below.')

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
  }, [])

  async function startCamera() {
    setMessage('')
    if (!('BarcodeDetector' in window)) {
      setMessage('Camera QR scanning is not supported by this browser. Use the QR payload field below.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      await videoRef.current.play()
      setScanning(true)
      const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
      const scan = async () => {
        if (!streamRef.current) return
        try {
          const codes = await detector.detect(videoRef.current)
          if (codes[0]?.rawValue) {
            onDetected?.(codes[0].rawValue)
            setMessage('QR detected. Verify the payload to continue.')
            stopCamera()
            return
          }
        } catch { /* keep scanning */ }
        requestAnimationFrame(scan)
      }
      scan()
    } catch (error) {
      setMessage(error.name === 'NotAllowedError' ? 'Camera permission was denied. Enter the QR payload manually.' : 'Camera could not be started. Enter the QR payload manually.')
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setScanning(false)
  }

  return (
    <div className="scanner scanner-real">
      <video ref={videoRef} className={`scanner-video ${scanning ? 'visible' : ''}`} muted playsInline />
      {!scanning && <div className="scanner-frame" />}
      {scanning && <div className="scanner-line" />}
      <div className="scanner-actions">
        {!scanning ? <button type="button" className="primary-button" onClick={startCamera}>Scan with Camera</button> : <button type="button" className="secondary-button" onClick={stopCamera}>Stop Camera</button>}
        <button type="button" className="secondary-button" onClick={onDemo}>Use Demo QR</button>
      </div>
      {message && <p className="scanner-message">{message}</p>}
    </div>
  )
}
