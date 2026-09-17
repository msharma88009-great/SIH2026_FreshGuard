export default function Profile({ profile, onClose }) {
  const fields = [
    ['Full Name', profile?.name || '—'],
    ['Role', profile?.role || '—'],
    ['Age', profile?.age || '—'],
    ['Address / Village', profile?.address || '—'],
    ['Phone Number', profile?.phone ? `+91 ${profile.phone}` : '—'],
    ['Email Address', profile?.email || '—'],
    ['Farm / Organization', profile?.farmName || '—'],
  ]
  return (
    <div className="profile-page">
      <div className="page-title-row">
        <div><h2>My Profile</h2><p>Your Fresh Guard operator profile.</p></div>
        <button className="secondary-button" onClick={onClose}>← Dashboard</button>
      </div>
      <section className="profile-card">
        <div className="profile-hero"><div className="profile-avatar">{profile?.initials || 'FG'}</div><div><h3>{profile?.name || 'Operator'}</h3><p>{profile?.role || 'Fresh Guard Operator'}</p></div></div>
        <div className="profile-grid">{fields.map(([label, value]) => <div className="profile-field" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      </section>
    </div>
  )
}
