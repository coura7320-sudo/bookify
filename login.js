
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://flmchlsezakjozkvtjzu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbWNobHNlemFram96a3Z0anp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNDMyMDgsImV4cCI6MjA4MTYxOTIwOH0.wJSKHZlYq5x6_yNjlDsV50CZtMbaE9pCJx_nOQgU2aI'
const supabase = createClient(supabaseUrl, supabaseKey)

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        display_name: name,
                    },
                },
            })

            if (error) {
                throw error
            }

            if (data.session) {
                alert("Account created and logged in!");
                window.location.href = "index.html";
            } else if (data.user && !data.session) {
                alert("Account created successfully! Please check your email to confirm your account.");
            }
        } catch (error) {
            alert(error.message);
        }
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                throw error
            }

            if (data) {
                alert("Login successful!");
                window.location.href = "index.html";
            }
        } catch (error) {
            alert(error.message);
        }
    });
}
