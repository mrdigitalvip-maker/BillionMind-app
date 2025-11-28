import { createClient } from 'https://esm.sh/@supabase/supabase-js';

export const supabase = createClient(
  'SUA_SUPABASE_URL',
  'SUA_SUPABASE_ANON_KEY'
);
