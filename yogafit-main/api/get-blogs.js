import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      throw error
    }

    return res.status(200).json(data || [])
  } catch (err) {
    console.error('Error fetching blogs:', err)
    return res.status(500).json({ success: false, error: err.message || 'Internal server error' })
  }
}
