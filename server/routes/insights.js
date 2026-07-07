const express = require('express')
const router = express.Router()
const db = require('../db')

// GET /api/insights — all analytics data in one request
router.get('/', async (req, res) => {
  try {
    const [overview, byZip, landlords, monthlyTrend, topRated, mostReviewed, anonVsNamed] = await Promise.all([
      db.getAsync(`
        SELECT
          COUNT(*) as total_reviews,
          ROUND(AVG(rating_overall), 2) as avg_rating,
          (SELECT COUNT(*) FROM apartments) as total_apartments,
          (SELECT COUNT(DISTINCT v.user_id) FROM verifications v JOIN reviews r ON r.verification_id = v.id) as total_reviewers
        FROM reviews
      `),

      db.allAsync(`
        SELECT
          a.zip_code,
          a.city,
          a.state,
          COUNT(r.id) as review_count,
          ROUND(AVG(r.rating_overall), 2) as avg_overall,
          ROUND(AVG(r.rating_safety), 2) as avg_safety,
          ROUND(AVG(r.rating_management), 2) as avg_management,
          ROUND(AVG(r.rating_noise), 2) as avg_noise,
          ROUND(AVG(r.rating_value), 2) as avg_value,
          ROUND(AVG(r.rating_responsiveness), 2) as avg_responsiveness
        FROM reviews r
        JOIN verifications v ON v.id = r.verification_id
        JOIN apartments a ON a.id = v.apartment_id
        GROUP BY a.zip_code
        HAVING review_count >= 2
        ORDER BY review_count DESC
        LIMIT 15
      `),

      db.allAsync(`
        SELECT
          u.id,
          u.first_name || ' ' || u.last_name as landlord_name,
          COUNT(r.id) as review_count,
          ROUND(AVG(r.rating_overall), 2) as avg_overall,
          ROUND(AVG(r.rating_management), 2) as avg_management,
          ROUND(AVG(r.rating_responsiveness), 2) as avg_responsiveness,
          COUNT(DISTINCT v.apartment_id) as property_count
        FROM reviews r
        JOIN verifications v ON v.id = r.verification_id
        JOIN apartments a ON a.id = v.apartment_id
        JOIN users u ON u.id = a.owner_id
        WHERE u.role = 'landlord'
        GROUP BY u.id
        HAVING review_count >= 2
        ORDER BY avg_overall DESC
        LIMIT 10
      `),

      db.allAsync(`
        SELECT
          strftime('%Y-%m', r.created_at) as month,
          COUNT(*) as review_count,
          ROUND(AVG(r.rating_overall), 2) as avg_rating
        FROM reviews r
        WHERE r.created_at >= datetime('now', '-12 months')
        GROUP BY month
        ORDER BY month ASC
      `),

      db.allAsync(`
        SELECT
          a.id,
          a.name,
          a.city,
          a.state,
          COUNT(r.id) as review_count,
          ROUND(AVG(r.rating_overall), 2) as avg_overall
        FROM reviews r
        JOIN verifications v ON v.id = r.verification_id
        JOIN apartments a ON a.id = v.apartment_id
        GROUP BY a.id
        HAVING review_count >= 3
        ORDER BY avg_overall DESC
        LIMIT 10
      `),

      db.allAsync(`
        SELECT
          a.id,
          a.name,
          a.city,
          a.state,
          COUNT(r.id) as review_count,
          ROUND(AVG(r.rating_overall), 2) as avg_overall
        FROM reviews r
        JOIN verifications v ON v.id = r.verification_id
        JOIN apartments a ON a.id = v.apartment_id
        GROUP BY a.id
        ORDER BY review_count DESC
        LIMIT 10
      `),

      db.allAsync(`
        SELECT
          CASE WHEN r.display_name IS NULL THEN 'named' ELSE 'anonymous' END as review_type,
          COUNT(*) as count,
          ROUND(AVG(r.rating_overall), 2) as avg_overall,
          ROUND(AVG(r.rating_safety), 2) as avg_safety,
          ROUND(AVG(r.rating_management), 2) as avg_management,
          ROUND(AVG(r.rating_value), 2) as avg_value,
          ROUND(AVG(r.rating_noise), 2) as avg_noise
        FROM reviews r
        GROUP BY review_type
      `),
    ])

    res.json({ overview, byZip, landlords, monthlyTrend, topRated, mostReviewed, anonVsNamed })
  } catch (err) {
    console.error('GET /api/insights error:', err)
    res.status(500).json({ error: 'Failed to load insights' })
  }
})

module.exports = router
