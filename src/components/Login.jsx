import { useState } from 'react'

// Demo-only verification value. It is intentionally never shown in the UI.
const DEMO_OTP = '123456'

export default function Login({ onLogin }) {
  const [step, setStep] = useState('profile')
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    role: 'Farmer',
    farmName: '',
  })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  function update(name, value) {
    setProfile((current) => ({ ...current, [name]: value }))
    setError('')
  }

  function sendOtp(event) {
    event.preventDefault()
    const age = Number(profile.age)
    const phone = profile.phone.replace(/\D/g, '')
    if (!profile.name.trim()) return setError('Please enter your full name.')
    if (!Number.isInteger(age) || age < 18) return setError('Please enter a valid age (18+).')
    if (!profile.address.trim()) return setError('Please enter your address or village.')
    if (phone.length !== 10) return setError('Please enter a valid 10-digit phone number.')
    if (!profile.email.trim()) return setError('Please enter your email address.')
    setStep('otp')
    setOtp('')
    setError('')
  }

  function verifyOtp(event) {
    event.preventDefault()
    if (otp.length !== 6 || otp !== DEMO_OTP) {
      return setError('Invalid OTP. Please enter the OTP sent to your number.')
    }
    const saved = {
      ...profile,
      phone: profile.phone.replace(/\D/g, ''),
      initials: profile.name.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      loggedIn: true,
    }
    localStorage.setItem('freshGuardProfile', JSON.stringify(saved))
    onLogin(saved)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">FG</div>
          <div><h1>Fresh Guard</h1><p>Farm-to-Fork Traceability</p></div>
        </div>
        <div className="login-heading">
          <h2>{step === 'profile' ? 'Welcome back' : 'Enter OTP'}</h2>
          <p>{step === 'profile' ? 'Enter your operator details to continue.' : `OTP sent to +91 ${profile.phone}`}</p>
        </div>

        {step === 'profile' ? (
          <form className="login-form" onSubmit={sendOtp}>
            <label>Full Name<input name="name" value={profile.name} onChange={(e) => update('name', e.target.value)} placeholder="Enter your full name" autoComplete="name" /></label>
            <div className="form-row">
              <label>Age<input type="number" min="18" max="100" name="age" value={profile.age} onChange={(e) => update('age', e.target.value)} placeholder="Age" /></label>
              <label>Role<select name="role" value={profile.role} onChange={(e) => update('role', e.target.value)}><option>Farmer</option><option>Collection Center</option><option>Transporter</option><option>Retailer</option></select></label>
            </div>
            <label>Address / Village<input name="address" value={profile.address} onChange={(e) => update('address', e.target.value)} placeholder="Village / district" /></label>
            <label>Phone Number<input type="tel" name="phone" inputMode="numeric" value={profile.phone} onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" maxLength="10" autoComplete="tel" /></label>
            <label>Email Address<input type="email" name="email" value={profile.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" autoComplete="email" /></label>
            <label>Farm / Organization<input name="farmName" value={profile.farmName} onChange={(e) => update('farmName', e.target.value)} placeholder="Optional" /></label>
            {error && <div className="login-error">{error}</div>}
            <button className="login-button" type="submit">Continue with OTP</button>
            <p className="login-note">Enter the OTP received on your registered mobile number.</p>
          </form>
        ) : (
          <form className="login-form otp-form" onSubmit={verifyOtp}>
            <label>One-Time Password<input autoFocus inputMode="numeric" value={otp} onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }} placeholder="Enter OTP" maxLength="6" autoComplete="one-time-code" /></label>
            {error && <div className="login-error">{error}</div>}
            <button className="login-button" type="submit">Verify OTP & Login</button>
            <button className="login-back-button" type="button" onClick={() => { setStep('profile'); setOtp(''); setError('') }}>← Enter a new number</button>
          </form>
        )}
        <div className="login-footer"><span>🔒 Secure access</span><span>•</span><span>Fresh Guard IoT Platform</span></div>
      </div>
    </div>
  )
}
