import { createElement, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

const profileKey = 'peggo-profile'
const emptyProfile = { name: '', birthDate: '', email: '', phone: '', avatar: '' }

export function UserProfile() {
  const [profile, setProfile] = useState<typeof emptyProfile>(() => {
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
type SettingsProps<T extends string> = {
  theme: T
  themes: readonly { id: T; label: string }[]
  mode: 'light' | 'dark'
  onThemeChange: (theme: T) => void
  onModeChange: (mode: 'light' | 'dark') => void
}

export function Settings<T extends string>({
  theme, themes, mode, onThemeChange, onModeChange,
}: SettingsProps<T>) {
  return (
    <section className="account-page">
      <h1>Settings</h1>

      <h2>General</h2>
      <label>
        Display mode
        <select value={mode} onChange={(event) =>
          onModeChange(event.currentTarget.value === 'dark' ? 'dark' : 'light')
        }>
          <option value="light">Light mode</option>
          <option value="dark">Dark mode</option>
        </select>
      </label>

      <h2>Theme</h2>
      <label>
        Colour theme
        <select value={theme} onChange={(event) => {
          const selected = themes.find((option) => option.id === event.currentTarget.value)
          if (selected) onThemeChange(selected.id)
        }}>
          {themes.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
        </select>
      </label>

            <h2>Account</h2>
      <Link to="/bus-routes/user-profile">Edit profile and contact details</Link>
    </section>
  )
}

export function HelpFeedback() {
  return createElement(
    'section',
    { className: 'account-page' },
    createElement('h1', null, 'Help & Feedback'),
    createElement('h2', null, 'Demo customer care'),
    createElement('p', null, '204-555-0147 (example number)'),
    createElement('h2', null, 'Winnipeg Transit'),
    createElement(
      'a',
      { href: 'https://www.winnipeg.ca/services-programs/transportation-roads-parking/transit/contact-winnipeg-transit' },
      'Contact Winnipeg Transit or send feedback',
    ),
  )
}