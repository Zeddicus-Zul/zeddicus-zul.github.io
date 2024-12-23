// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfKWTQQTChVooan2CePhz3GEEYYjYi5GU",
    authDomain: "movie-night-1b2eb.firebaseapp.com",
    projectId: "movie-night-1b2eb",
    storageBucket: "movie-night-1b2eb.appspot.com",
    messagingSenderId: "1041676507691",
    appId: "1:1041676507691:web:89e34403a1a9ee5e22286e",
    measurementId: "G-E7TZH7S2RE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Example: Function to add a comment
function submitComment() {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (name && comment) {
        db.collection('comments').add({
            name: name,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('Comment submitted!');
            loadComments();
        }).catch((error) => {
            console.error('Error submitting comment:', error);
        });
    }
}

// Example: Function to load comments
function loadComments() {
    db.collection('comments')
        .orderBy('timestamp', 'desc')
        .get()
        .then((snapshot) => {
            const commentsDiv = document.getElementById('comments');
            commentsDiv.innerHTML = ''; // Clear old comments
            snapshot.forEach(doc => {
                const comment = doc.data();
                commentsDiv.innerHTML += `<p><strong>${comment.name}</strong>: ${comment.comment}</p>`;
            });
        });
}

// Load comments on page load
document.addEventListener('DOMContentLoaded', loadComments);
