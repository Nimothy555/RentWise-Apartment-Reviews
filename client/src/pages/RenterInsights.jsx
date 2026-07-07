import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

function StatCard({ label, value, sub }) {
  return (
    <div className="card" style={{ padding: '1.5rem', textAlign: 'center', flex: '1 1 180px' }}>
      <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--sage)', margin: 0 }}>{value ?? '—'}</p>
      <p style={{ fontWeight: 600, margin: '0.25rem 0 0', fontSize: '0.9rem' }}>{label}</p>
      {sub && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>{sub}</p>}
    </div>
  )
}

function RatingBar({ value, max = 5 }) {
  if (value == null) return <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>—</span>
  const pct = (value / max) * 100
  const color = value >= 4 ? 'var(--sage)' : value >= 3 ? 'var(--gold)' : 'var(--red)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ flex: 1, background: 'var(--border)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '4px' }} />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '2.2rem', color }}>{value.toFixed(1)}</span>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '2rem 0 1rem', borderBottom: '2px solid var(--sage-light)', paddingBottom: '0.5rem' }}>
      {children}
    </h2>
  )
}

export default function RenterInsights() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getInsights()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-container"><p>Loading insights…</p></div>
  if (error) return <div className="page-container"><p className="error-msg">{error}</p></div>

  const { overview, byZip, landlords, monthlyTrend, topRated, mostReviewed, anonVsNamed } = data

  const named = anonVsNamed.find(r => r.review_type === 'named')
  const anon = anonVsNamed.find(r => r.review_type === 'anonymous')

  const maxMonthCount = Math.max(...monthlyTrend.map(m => m.review_count), 1)

  return (
    <div className="page-container">
      <h1 className="page-title" style={{ marginBottom: '0.25rem' }}>Renter Insights</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Aggregated trends from verified tenant reviews across the RentWise community.
      </p>

      {/* ── Overview stats ── */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <StatCard label="Total Reviews" value={overview.total_reviews?.toLocaleString()} />
        <StatCard label="Platform Average" value={overview.avg_rating ? `${overview.avg_rating} / 5` : null} sub="overall rating" />
        <StatCard label="Apartments Listed" value={overview.total_apartments?.toLocaleString()} />
        <StatCard label="Verified Reviewers" value={overview.total_reviewers?.toLocaleString()} />
      </div>

      {/* ── Monthly trend ── */}
      {monthlyTrend.length > 0 && (
        <>
          <SectionTitle>Review Activity — Last 12 Months</SectionTitle>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {monthlyTrend.map(m => (
                <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '5.5rem', fontVariantNumeric: 'tabular-nums' }}>{m.month}</span>
                  <div style={{ flex: 1, background: 'var(--border)', borderRadius: '4px', height: '14px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${(m.review_count / maxMonthCount) * 100}%`,
                        height: '100%',
                        background: 'var(--sage)',
                        borderRadius: '4px',
                        minWidth: '4px',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '1.5rem', textAlign: 'right' }}>{m.review_count}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '4rem' }}>avg {m.avg_rating?.toFixed(1) ?? '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Ratings by ZIP ── */}
      {byZip.length > 0 && (
        <>
          <SectionTitle>Ratings by ZIP Code</SectionTitle>
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['ZIP', 'City', 'Reviews', 'Overall', 'Safety', 'Mgmt', 'Noise', 'Value', 'Responsiveness'].map(h => (
                    <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {byZip.map(z => (
                  <tr key={z.zip_code} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>{z.zip_code}</td>
                    <td style={{ padding: '0.6rem 0.75rem', color: 'var(--text-muted)' }}>{z.city}</td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>{z.review_count}</td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_overall} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_safety} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_management} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_noise} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_value} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={z.avg_responsiveness} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Top Rated & Most Reviewed ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {topRated.length > 0 && (
          <div>
            <SectionTitle>Top Rated Apartments</SectionTitle>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.75rem', marginBottom: '0.75rem' }}>Min. 3 reviews</p>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {topRated.map((a, i) => (
                <div
                  key={a.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: i < topRated.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', minWidth: '1.5rem', fontSize: '0.85rem' }}>#{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/apartments/${a.id}`} style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.name}
                    </Link>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.city}, {a.state} · {a.review_count} reviews</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--sage)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{a.avg_overall?.toFixed(1)} ★</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mostReviewed.length > 0 && (
          <div>
            <SectionTitle>Most Reviewed Apartments</SectionTitle>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.75rem', marginBottom: '0.75rem' }}>By total review count</p>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {mostReviewed.map((a, i) => (
                <div
                  key={a.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: i < mostReviewed.length - 1 ? '1px solid var(--border)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', minWidth: '1.5rem', fontSize: '0.85rem' }}>#{i + 1}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link to={`/apartments/${a.id}`} style={{ fontWeight: 600, fontSize: '0.875rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.name}
                    </Link>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.city}, {a.state} · avg {a.avg_overall?.toFixed(1) ?? '—'} ★</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{a.review_count} reviews</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Landlord Rankings ── */}
      {landlords.length > 0 && (
        <>
          <SectionTitle>Landlord Performance Rankings</SectionTitle>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-0.75rem', marginBottom: '0.75rem' }}>Claimed properties only · min. 2 reviews</p>
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['#', 'Landlord', 'Properties', 'Reviews', 'Overall', 'Management', 'Responsiveness'].map(h => (
                    <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {landlords.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.6rem 0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>#{i + 1}</td>
                    <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600 }}>{l.landlord_name}</td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>{l.property_count}</td>
                    <td style={{ padding: '0.6rem 0.75rem' }}>{l.review_count}</td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={l.avg_overall} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={l.avg_management} /></td>
                    <td style={{ padding: '0.6rem 0.75rem', minWidth: '100px' }}><RatingBar value={l.avg_responsiveness} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ── Anonymous vs Named ── */}
      {anonVsNamed.length > 0 && (
        <>
          <SectionTitle>Anonymous vs. Named Reviews</SectionTitle>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[named, anon].filter(Boolean).map(g => (
              <div key={g.review_type} className="card" style={{ flex: '1 1 280px', padding: '1.25rem' }}>
                <p style={{ fontWeight: 700, marginBottom: '0.75rem', textTransform: 'capitalize' }}>
                  {g.review_type === 'named' ? 'Named Reviews' : 'Anonymous Reviews'}
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>({g.count})</span>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { label: 'Overall', val: g.avg_overall },
                    { label: 'Safety', val: g.avg_safety },
                    { label: 'Management', val: g.avg_management },
                    { label: 'Value', val: g.avg_value },
                    { label: 'Noise', val: g.avg_noise },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '6rem' }}>{label}</span>
                      <div style={{ flex: 1 }}><RatingBar value={val} /></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <p style={{ marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
        All data is derived from verified tenant reviews only.
      </p>
    </div>
  )
}
