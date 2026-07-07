import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '1.5rem 2rem',
      marginTop: '4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      fontSize: '0.875rem',
      color: 'var(--text-muted)',
    }}>
      <span>© {new Date().getFullYear()} RentWise</span>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/moderation">Moderation</Link>
      </div>
    </footer>
  )
}
