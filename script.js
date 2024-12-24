// Import Firebase functions
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
  storageBucket: "movie-night-1b2eb.appspot.com", // Note: Corrected typo in storageBucket
  messagingSenderId: "1041676507691",
  appId: "1:1041676507691:web:89e34403a1a9ee5e22286e",
  measurementId: "G-E7TZH7S2RE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit a comment to Firestore
export async function submitComment() {
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;  // New title field
    const comment = document.getElementById("comment").value;
  
    if (name && title && comment) {
      try {
        await addDoc(collection(db, "Submission"), {
          name: name,
          title: title,  // Add title to the document
          comment: comment,  // Assuming the comment is being sent as a new field
          timestamp: new Date(), // Using JavaScript Date object
        });
        alert("Comment submitted!");
        loadComments();  // Reload comments after submission
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  }
  

// Load comments from Firestore
export async function loadComments() {
    const commentsDiv = document.getElementById("comments");
    commentsDiv.innerHTML = ""; // Clear old comments
  
    try {
      const q = query(collection(db, "Submission"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        const comment = doc.data();
        
        // Extract name, title, and timestamp
        const name = comment.name;
        const title = comment.title;
        const timestamp = comment.timestamp ? comment.timestamp.toDate() : new Date();
  
        // Format the timestamp
        const formattedDate = timestamp.toLocaleString();
  
        commentsDiv.innerHTML += `
          <p><strong>${name}</strong> commented on <em>${title}</em>:</p>
          <p>${comment.comment}</p>
          <p><small>Posted on: ${formattedDate}</small></p>
        `;
      });
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  }
  
  

// Load comments on page load
document.addEventListener("DOMContentLoaded", loadComments);
