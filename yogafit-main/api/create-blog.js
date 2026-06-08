import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    // Validate API key
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const { title, slug, content, meta_description, image, affiliate_link } = req.body

    // Validate required fields
    if (!title || !slug || !content) {
      return res.status(400).json({ success: false, error: 'Missing required fields: title, slug, content' })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title,
          slug,
          content,
          meta_description: meta_description || null,
          image: image || null,
          affiliate_link: affiliate_link || null,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    return res.status(200).json({
      success: true,
      url: `/blog/${data.slug}`,
      data,
    })
  } catch (err) {
    console.error('Error creating blog:', err)
    return res.status(500).json({ success: false, error: err.message || 'Internal server error' })
  }
}
