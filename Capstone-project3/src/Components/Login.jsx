import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabaseURL, supabaseAnonKey } from '../clients/supabase'; // Import the environment variables

const supabase = createClient(supabaseURL, supabaseAnonKey);

const Login = () => (
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
  />
);

export default Login;


















