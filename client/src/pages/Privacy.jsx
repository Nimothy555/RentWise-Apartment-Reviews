export default function Privacy() {
  return (
    <div className="page">
      <div className="auth-container" style={{ maxWidth: '720px' }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted">Effective Date: May 2026</p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>What We Collect</h2>
        <p>When you use RentWise, we may collect the following information:</p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Account information (name, email address, password)</li>
          <li>Reviews and content you submit</li>
          <li>Usage data (pages visited, interactions with the platform)</li>
        </ul>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: '2' }}>
          <li>Create and manage your account</li>
          <li>Display your reviews on the platform</li>
          <li>Improve the RentWise experience</li>
          <li>Communicate with you about your account or submissions</li>
        </ul>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Data Storage</h2>
        <p>
          All user data is stored securely on rent-wise.live. We do not sell or share your
          personal information with third parties.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Your Rights</h2>
        <p>
          You may request to view, update, or delete your account and data at any time by
          contacting us at{' '}
          <a href="mailto:teamrentwise@outlook.com">teamrentwise@outlook.com</a>.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy as the platform evolves. Continued use of RentWise
          after changes are posted constitutes acceptance of the updated policy.
        </p>
      </div>
    </div>
  )
}
