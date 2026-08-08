import { useEffect } from 'react'

export default function SignupModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signupTitle"
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="signupTitle">Create your account</h2>
        <p>Open a live Explore Markets Limited trading account in minutes.</p>
        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          <label>
            Full name
            <input type="text" required placeholder="Alex Morgan" />
          </label>
          <label>
            Email
            <input type="email" required placeholder="you@email.com" />
          </label>
          <label>
            Password
            <input type="password" required placeholder="••••••••" minLength={8} />
          </label>
          <button type="submit" className="btn btn-gold btn-block">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}
