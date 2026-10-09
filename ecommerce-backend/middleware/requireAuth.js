import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

export async function requireAuth(req, res, next) {
  if (!supabase) {
    return res.status(503).json({ error: 'Authentication is not configured on the server.' });
  }

  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Sign in to continue.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ error: 'Unable to verify your session. Please sign in again.' });
  }
}