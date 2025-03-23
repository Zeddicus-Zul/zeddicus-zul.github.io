import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
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
      //Clears the input fields after submission 
      document.getElementById("name").value = "";
      document.getElementById("title").value = "";

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
      const movieId = doc.id; // Get the document ID for deletion

      // Add the movie and delete button to the DOM
      const movieItem = document.createElement("p");
      movieItem.innerHTML = `<strong>${movie.name}</strong>: ${movie.title} <span class="delete-btn" data-id="${movieId}">Delete</span>`;
      moviesDiv.appendChild(movieItem);

      // Add event listener to the delete button
      const deleteBtn = movieItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        deleteMovie(movieId, movieItem);
      });
    });
  } catch (error) {
    console.error("Error loading movie titles:", error);
  }
}

// Delete movie from Firestore and DOM
async function deleteMovie(movieId, movieItem) {
  try {
    // Delete movie from Firestore
    await deleteDoc(doc(db, "Submission", movieId));
    console.log("Movie deleted successfully!");

    // Remove movie from DOM
    movieItem.remove();
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", loadMovies);

// Add event listener for submit button
document.getElementById("submitBtn").addEventListener("click", submitMovie);

document.getElementById('generateImageBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('/generate-image'); // Ensure this URL matches your server's endpoint
    const result = await response.json();
    if(result.imageUrl){
      document.getElementById('imageContainer').innerHTML = `<img src="${result.imageUrl}" alt="AI Generated Movie Poster" style="max-width:100%;">`;
    } else {
      console.error('No image URL returned', result);
    }
  } catch (error) {
    console.error('Error fetching generated image:', error);
  }
});

