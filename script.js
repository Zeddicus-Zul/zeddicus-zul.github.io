// Function to submit a comment
function submitComment() {
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;

    if (name && commentText) {
        // Submit comment to GitHub Issues
        submitGitHubIssue(name, commentText);

        // Clear the form
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';

        // Display comments
        displayGitHubIssues();
    } else {
        alert('Name and comment cannot be empty');
    }
}

// Function to display comments
function displayGitHubIssues() {
    const commentsDiv = document.getElementById('comments');

    // Fetch comments from GitHub Issues
    fetch('https://api.github.com/repos/Zeddicus-Zul/zeddicus-zul.github.io/issues')
        .then(response => response.json())
        .then(issues => {
            // Display each issue as a comment
            commentsDiv.innerHTML = '';
            issues.forEach(issue => {
                const commentElement = document.createElement('div');
                commentElement.innerHTML = `<strong>${issue.user.login}:</strong> ${issue.body}`;
                commentsDiv.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));
}

// Function to submit a comment to GitHub Issues
function submitGitHubIssue(name, commentText) {
    const accessToken = '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'; // Replace with your GitHub access token

    fetch('https://api.github.com/repos/Zeddicus-Zul/zeddicus-zul.github.io/issues', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            title: `${name}'s Comment`,
            body: commentText
        })
    });

}

// Display comments when the page loads
window.onload = function () {
    displayGitHubIssues();
};
