//import { createClient } from '@supabase/supabase-js'
//import { Auth } from '@supabase/auth-ui-react'


import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.REACT_APP_VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseAnonKey);


