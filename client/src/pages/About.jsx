export default function About() {
  return (
    <div className="page">
      <div className="auth-container" style={{ maxWidth: '720px' }}>
        <h1>About RentWise</h1>
        <p className="text-muted">Honest apartment reviews, built by renters for renters.</p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Who We Are</h2>
        <p>
          RentWise is a tenant-first apartment review platform developed out of Boston by a team of
          five students from the University of Massachusetts Boston. We are all from different parts
          of Greater Boston, and we came together with one shared frustration: finding honest,
          reliable information about apartments before signing a lease.
        </p>

        <p style={{ marginTop: '1rem' }}>
          We built RentWise because housing questions are not just inconvenient, they are
          life-changing. Every renter has a story: the bad surprise after moving in, the apartment
          that looked great online but felt like "nope" the moment you walked through the door.
          We decided to team up and create the most honest review experience possible, one where
          important questions get real answers, not polished marketing copy.
        </p>

        <p style={{ marginTop: '1rem' }}>
          RentWise is currently live and open to the public. We are a capstone project team, but
          the platform is built for real renters navigating a real housing market.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--border)' }} />

        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>Our Mission</h2>
        <p>
          To give every renter in Greater Boston access to honest, community-driven apartment
          reviews, before they sign anything.
        </p>
      </div>
    </div>
  )
}
