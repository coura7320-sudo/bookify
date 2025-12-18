import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://flmchlsezakjozkvtjzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbWNobHNlemFram96a3Z0anp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDMyMDgsImV4cCI6MjA4MTYxOTIwOH0.wJSKHZlYq5x6_yNjlDsV50CZtMbaE9pCJx_nOQgU2aI'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        window.location.href = 'login.html'
    }
}

checkAuth()