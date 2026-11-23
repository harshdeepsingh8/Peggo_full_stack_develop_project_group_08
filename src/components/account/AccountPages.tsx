import { useState, type ChangeEvent, type FormEvent } from 'react'

const profileKey = 'peggo-profile'
const emptyProfile = { name: '', birthDate: '', email: '', phone: '', avatar: '' }

export function UserProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      return { ...emptyProfile, ...JSON.parse(localStorage.getItem(profileKey) ?? '{}') }
    } catch {
      return emptyProfile
    }
  })
  const [message, setMessage] = useState('')
  const [readingPhoto, setReadingPhoto] = useState(false)

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type) || file.size > 1024 * 1024) {
      setMessage('Choose a JPG, PNG, or WebP photo up to 1 MB.')
      return
    }

    setReadingPhoto(true)
    setMessage('')
    const reader = new FileReader()

    reader.onload = () => {
      const avatar = String(reader.result)
      setProfile((current) => ({ ...current, avatar }))
      setReadingPhoto(false)
    }

    reader.onerror = () => {
      setMessage('Could not open the photo. Try another image.')
      setReadingPhoto(false)
    }

    reader.readAsDataURL(file)
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      localStorage.setItem(profileKey, JSON.stringify(profile))
      setMessage('Profile saved.')
    } catch {
      setMessage('Could not save the profile. Check your browser storage.')
    }
  }

  function removePhoto() {
    setProfile((current) => ({ ...current, avatar: '' }))
    setMessage('')
  }

  const fields = [
    { key: 'name', label: 'Full name', type: 'text' },
    { key: 'birthDate', label: 'Date of birth', type: 'date' },
    { key: 'email', label: 'Email address', type: 'email' },
    { key: 'phone', label: 'Phone number', type: 'tel' },
  ] as const

  return (
    <section className="account-page">
      <h1>User Profile</h1>
      <p>Your profile is saved in this browser.</p>

      <form onSubmit={saveProfile}>
        {profile.avatar ? (
          <div>
            <img className="profile-avatar" src={profile.avatar} alt="Profile avatar" />
            <button type="button" disabled={readingPhoto} onClick={removePhoto}>
              Remove photo
            </button>
          </div>
        ) : null}

        <label>
          Profile photo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={readingPhoto}
            onChange={choosePhoto}
          />
        </label>

        {fields.map(({ key, label, type }) => (
          <label key={key}>
            {label}
            <input
              type={type}
              value={profile[key]}
              onChange={(event) => {
                const value = event.currentTarget.value
                setProfile((current) => ({ ...current, [key]: value }))
                setMessage('')
              }}
            />
          </label>
        ))}

        <button type="submit" disabled={readingPhoto}>Save profile</button>
        <p role="status">{message}</p>
      </form>
    </section>
  )
}
export function Settings() {
  return <section className="account-page"><h1>Settings</h1></section>
}

export function HelpFeedback() {
  return <section className="account-page"><h1>Help &amp; Feedback</h1></section>
}