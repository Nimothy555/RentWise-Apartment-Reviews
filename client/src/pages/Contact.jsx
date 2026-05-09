import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `mailto:teamrentwise@outlook.com?subject=Message from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name} (${form.email})`
    setSubmitted(true)
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
            Thanks for reaching out! Your email client should have opened. We'll get back to you soon.
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
            <button type="submit" className="btn btn-full">Send Message</button>
          </form>
        )}
      </div>
    </div>
  )
}
