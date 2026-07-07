import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send message')
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="auth-container" style={{ maxWidth: '600px' }}>
        <h1>Contact Us</h1>
        <p className="text-muted">
          Have a question, concern, or feedback? We'd love to hear from you.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <p><strong>Email:</strong>{' '}
          <a href="mailto:teamrentwise@outlook.com">teamrentwise@outlook.com</a>
        </p>
        <p style={{ marginTop: '0.5rem' }}><strong>Based in:</strong> Boston, Massachusetts</p>
        <p style={{ marginTop: '0.5rem' }} className="text-muted">
          We aim to respond within 2 to 3 business days.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        {submitted ? (
          <div style={{ padding: '1rem', background: 'var(--sage-light)', borderRadius: '8px' }}>
            Thanks for reaching out! We'll get back to you within 2 to 3 business days.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="input" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange}
                className="input" placeholder="you@example.com" required />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange}
                className="input" placeholder="What's on your mind?" rows={5} required
                style={{ resize: 'vertical' }} />
            </label>
            {error && <p style={{ color: 'var(--error, #c0392b)', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className="btn btn-full" disabled={loading}>
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
