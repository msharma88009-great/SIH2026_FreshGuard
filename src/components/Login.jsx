import { useState } from 'react'

const DEFAULT_OTP = '123456'

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
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setError('')
  }

  function handleSendOTP(event) {
    event.preventDefault()
    setError('')

    if (!profile.name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!profile.age || Number(profile.age) < 18) {
      setError('Please enter a valid age (18+).')
      return
    }

    if (!profile.address.trim()) {
      setError('Please enter your address or village.')
      return
    }

    const cleanPhone = profile.phone.replace(/\D/g, '')

    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    if (!profile.email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setOtp('')
    }, 600)
  }

  function handleVerifyOTP(event) {
    event.preventDefault()
    setError('')

    if (otp !== DEFAULT_OTP) {
      setError('Invalid OTP. Please enter correct OTP.')
      return
    }

    const savedProfile = {
      ...profile,
      phone: profile.phone.replace(/\D/g, ''),
      initials: getInitials(profile.name),
      loggedIn: true,
    }

    localStorage.setItem(
      'freshGuardProfile',
      JSON.stringify(savedProfile)
    )

    onLogin(savedProfile)
  }

  function getInitials(name) {
    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    }

    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
  }

  function handleBack() {
    setStep('profile')
    setOtp('')
    setError('')
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-brand">
          <div className="login-logo">FG</div>

          <div>
            <h1>Fresh Guard</h1>
            <p>Farm-to-Fork Traceability</p>
          </div>
        </div>

        {step === 'profile' ? (
          <>
            <div className="login-heading">
              <h2>Welcome to Fresh Guard</h2>
              <p>Enter your details to continue</p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSendOTP}
            >
              <div className="form-row">

                <label>
                  Full Name

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="e.g. Manish Sharma"
                  />
                </label>

                <label>
                  Age

                  <input
                    type="number"
                    name="age"
                    min="18"
                    max="100"
                    value={profile.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                </label>

              </div>

              <label>
                Address / Village

                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="e.g. Nashik, Maharashtra"
                />
              </label>

              <label>
                Phone Number

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
              </label>

              <label>
                Email Address

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>

              <div className="form-row">

                <label>
                  Role

                  <select
                    name="role"
                    value={profile.role}
                    onChange={handleChange}
                  >
                    <option value="Farmer">
                      Farmer
                    </option>

                    <option value="Collection Center">
                      Collection Center
                    </option>

                    <option value="Transporter">
                      Transporter
                    </option>

                    <option value="Retailer">
                      Retailer
                    </option>
                  </select>
                </label>

                <label>
                  Farm / Organization

                  <input
                    type="text"
                    name="farmName"
                    value={profile.farmName}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </label>

              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? 'Sending OTP...'
                  : 'Continue with OTP'}
              </button>

              <p className="login-note">
                Your phone number will be verified using OTP.
              </p>

            </form>
          </>
        ) : (
          <>
            <div className="login-heading">
              <h2>Enter OTP</h2>

              <p>
                OTP sent to{' '}
                <strong>
                  +91 {profile.phone}
                </strong>
              </p>
            </div>

            <form
              className="login-form otp-form"
              onSubmit={handleVerifyOTP}
            >

              <label>
                One-Time Password

                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => {
                    setOtp(
                      event.target.value
                        .replace(/\D/g, '')
                        .slice(0, 6)
                    )

                    setError('')
                  }}
                  placeholder="Enter OTP"
                  maxLength="6"
                  autoFocus
                />
              </label>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
              >
                Verify OTP & Login
              </button>

              <button
                type="button"
                className="login-back-button"
                onClick={handleBack}
              >
                ← Change phone number
              </button>

            </form>
          </>
        )}

        <div className="login-footer">
          <span>🔒 Secure access</span>
          <span>•</span>
          <span>Fresh Guard IoT Platform</span>
        </div>

      </div>
    </div>
  )
}