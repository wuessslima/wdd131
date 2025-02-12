// Data saved in localStorage
let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// DOM Elements
const stars = document.querySelectorAll('#stars span');
const averageRating = document.getElementById('averageRating');
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

// Update average rating
function updateAverageRating() {
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = (total / ratings.length).toFixed(1);
    averageRating.textContent = isNaN(average) ? '0' : average;
}

// Add a rating
stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        ratings.push(value);
        localStorage.setItem('ratings', JSON.stringify(ratings));
        updateAverageRating();
        star.classList.add('active');
    });
});

// Add a comment
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;

    const comment = {
        userName,
        commentText,
        likes: 0
    };

    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));

    displayComments();
    commentForm.reset();
});

// Display comments
function displayComments() {
    commentList.innerHTML = '<h3>Comments</h3>';
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p><strong>${comment.userName}</strong></p>
            <p>${comment.commentText}</p>
            <button class="likeButton" data-index="${index}">
                👍 ${comment.likes} | Was this helpful?
            </button>
        `;
        commentList.appendChild(commentDiv);
    });

    // Add like event to buttons
    document.querySelectorAll('.likeButton').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            comments[index].likes++;
            localStorage.setItem('comments', JSON.stringify(comments));
            displayComments();
        });
    });
}

// Load data on page load
updateAverageRating();
displayComments();