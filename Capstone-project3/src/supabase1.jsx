import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oyvlusrfgriwbzjbjbgj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95dmx1c3JmZ3Jpd2J6amJqYmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMDk2ODMsImV4cCI6MjAwNTc4NTY4M30.fPaJNBoB_KNRUW9mZSkFmPljSuV49jBz8zZ36Bdfun4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
