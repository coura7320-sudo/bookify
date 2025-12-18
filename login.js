
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCvlG6SxsN4Uelcb78-jHXwH9sdX7n4BFM",
    authDomain: "test-7dde7.firebaseapp.com",
    projectId: "test-7dde7",
    storageBucket: "test-7dde7.appspot.com",
    messagingSenderId: "3127597036",
    appId: "1:3127597036:web:474a750bef382e4f2092c9",
    measurementId: "G-JE9EMKWM1K"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: name });
            alert("Account created successfully!");
            window.location.href = "index.html";
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
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            window.location.href = "index.html";
        } catch (error) {
            alert(error.message);
        }
    });
}
