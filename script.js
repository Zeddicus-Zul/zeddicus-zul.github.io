// script.js

function submitComment() {
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;

    if (name && comment) {
        var commentsDiv = document.getElementById('comments');
        var newComment = document.createElement('div');
        newComment.innerHTML = '<strong>' + name + ':</strong> ' + comment + '<br>';

        commentsDiv.appendChild(newComment);

        // Clear the form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    } else {
        alert('Please enter both name and comment before submitting.');
    }
}
