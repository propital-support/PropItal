
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configurazione Firebase aggiornata
const firebaseConfig = {
  apiKey: "AIzaSyD5cuUQcouJoxu44VQUMgVocQooSpOQgEY",
  authDomain: "propital-1df56.firebaseapp.com",
  projectId: "propital-1df56",
  storageBucket: "propital-1df56.firebasestorage.app",
  messagingSenderId: "708988158572",
  appId: "1:708988158572:web:b05bfc7ade689908704e49"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRAZIONE
window.registerUser = function () {
  const nome = document.getElementById("nome").value;
  const cognome = document.getElementById("cognome").value;
  const cap = document.getElementById("cap").value;
  const citta = document.getElementById("citta").value;
  const stato = document.getElementById("stato").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Salviamo i dati utente nel localStorage
      const userData = { nome, cognome, cap, citta, stato, email };
      localStorage.setItem("utente", JSON.stringify(userData));
      alert("Registrazione avvenuta con successo!");
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("Errore: " + error.message));
}

// LOGIN
window.loginUser = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("Errore: " + error.message));
}

// LOGOUT
window.logoutUser = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

// PROTEGGI PAGINE PRIVATE
window.protectPage = function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "auth.html";
    }
  });
}
