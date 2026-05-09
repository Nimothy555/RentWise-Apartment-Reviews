const Divider = () => (
  <div style={{ textAlign: 'center', margin: '1.75rem 0', color: 'var(--text-muted)', letterSpacing: '0.4em', fontSize: '0.75rem' }}>
    ···
  </div>
)

export default function ContentModeration() {
  return (
    <div className="page">
      <div className="auth-container" style={{ maxWidth: '720px' }}>
        <h1>Content Moderation Policy</h1>
        <p className="text-muted">Effective Date: May 2026</p>

        <p style={{ marginTop: '1rem' }}>
          RentWise is committed to maintaining a trustworthy, respectful, and informative
          review platform. This policy explains how we review submitted content and the
          standards all submissions must meet.
        </p>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>1. What We Moderate</h2>
        <p>
          All reviews submitted to RentWise are subject to moderation before or after
          publication. Our team reviews flagged content and may proactively review new
          submissions to ensure compliance with our standards.
        </p>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>2. Grounds for Denial</h2>
        <p>A review may be denied or removed for any of the following reasons:</p>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: '2.2' }}>
          <li><strong>Not a genuine experience</strong> — review appears fabricated, paid for, or submitted by someone who did not live at the property</li>
          <li><strong>Hate speech or discrimination</strong> — content targeting individuals or groups based on race, gender, religion, nationality, disability, or other protected characteristics</li>
          <li><strong>Harassment or threats</strong> — personal attacks directed at landlords, property managers, or other tenants</li>
          <li><strong>Private information</strong> — includes names, phone numbers, addresses, or other personally identifying details of individuals</li>
          <li><strong>Spam or off-topic content</strong> — content unrelated to the rental experience, or submitted multiple times</li>
          <li><strong>Illegal content</strong> — anything that violates applicable law</li>
        </ul>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>3. The Denial Process</h2>
        <p>
          When a review is denied, the submitting user is notified by email. That email
          includes the specific reason the review did not meet our standards. Users whose
          content is denied are encouraged to revise and resubmit a review that complies
          with this policy.
        </p>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>4. Appeals</h2>
        <p>
          If you believe your review was incorrectly denied, you may appeal by contacting
          us at{' '}
          <a href="mailto:teamrentwise@outlook.com">teamrentwise@outlook.com</a>{' '}
          with the subject line <em>"Review Appeal"</em>. Please include the property
          address and a brief explanation. We aim to respond within 3 to 5 business days.
        </p>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>5. Repeat Violations</h2>
        <p>
          Users who repeatedly submit content that violates this policy may have their
          account suspended or permanently removed from the platform.
        </p>

        <Divider />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>6. Changes to This Policy</h2>
        <p>
          We may update this Content Moderation Policy as the platform evolves. Continued
          use of RentWise after updates are posted constitutes acceptance of the revised policy.
        </p>

        <Divider />

        <p>
          Questions? Reach us at{' '}
          <a href="mailto:teamrentwise@outlook.com">teamrentwise@outlook.com</a>.
        </p>
      </div>
    </div>
  )
}
