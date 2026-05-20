import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL     = 'https://ubbtouwgccbqowddlgft.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYnRvdXdnY2NicW93ZGRsZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTE2MTUsImV4cCI6MjA5NDE4NzYxNX0.AsA9r_7Lg9UaO48Ln9SlmGkvAQYY5tOi7lATFfcEUpg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
