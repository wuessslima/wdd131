// Interaction with the page elements

const input = document.querySelector('#favchap'); // Where the user types the chapter
const button = document.querySelector('button'); // Select the button that adds the chapter
const list = document.querySelector('#list'); // Select the list that the chapter is storage

// Array to storage the chapters
let chaptersArray = getChapterList() || []; // If localStorage has data, so initiate with the JSON, if not, create a empty array

// localStorage to array
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// array to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Create a list, a item for every chapter added
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    
    li.textContent = item; // Item text
    deleteButton.textContent = '❌'; // Delete button
    deleteButton.classList.add('delete'); // Create a class to the button
    li.appendChild(deleteButton); // Add the button
    list.appendChild(li); // Add item in the list

    // Click to remove
    deleteButton.addEventListener('click', () => {
        list.removeChild(li); // Remove li
        deleteChapter(item); // Remove item from the array and refresh the localStorage
        input.focus();
    });
}

// Function to remove from the array
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

// Load localStorage
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener('click', () => {
    if (input.value.trim() !== '') {
        const chapter = input.value.trim();

        displayList(chapter);
        chaptersArray.push(chapter);
        setChapterList();
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
});