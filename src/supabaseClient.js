import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://skpigwkofmqibuniityb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrcGlnd2tvZm1xaWJ1bmlpdHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjU3MjAsImV4cCI6MjA2ODI0MTcyMH0.x7JvQD_0zigRv-qF1333IY3UdkNHtmshn6gRsumtUGY';
export const supabase = createClient(supabaseUrl, supabaseKey);
