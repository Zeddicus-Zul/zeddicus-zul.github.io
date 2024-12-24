import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfKWTQQTChVooan2CePhz3GEEYYjYi5GU",
  authDomain: "movie-night-1b2eb.firebaseapp.com",
  projectId: "movie-night-1b2eb",
  storageBucket: "movie-night-1b2eb.appspot.com", 
  messagingSenderId: "1041676507691",
  appId: "1:1041676507691:web:89e34403a1a9ee5e22286e",
  measurementId: "G-E7TZH7S2RE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit a movie title to Firestore
export async function submitMovie() {
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;

  if (name && title) {
    try {
      // Add movie submission to Firestore
      await addDoc(collection(db, "Submission"), {
        name: name,
        title: title,
        timestamp: new Date(), // Save the current date and time
      });
      console.log("Movie title submitted successfully!");
      alert("Movie title submitted!");
      loadMovies(); // Reload the list of movies
    } catch (error) {
      console.error("Error submitting movie title:", error);
    }
  }
}


// Load movie titles from Firestore
export async function loadMovies() {
  const moviesDiv = document.getElementById("movies");
  moviesDiv.innerHTML = ""; // Clear old movie titles

  try {
    const q = query(collection(db, "Submission"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      const movie = doc.data();
      moviesDiv.innerHTML += `<p><strong>${movie.name}</strong>: ${movie.title}</p>`;
    });
  } catch (error) {
    console.error("Error loading movie titles:", error);
  }
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", loadMovies);
