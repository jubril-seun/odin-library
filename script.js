
const addBtn = document.getElementById("add-btn");


const myLibrary = [
    {
     id: 4334534,
     author: "Sam Waters",
     title: "The Lost boys",
     pages: 650,
     read: "read",
    },

    {
     id: 4343433434234,
     author: "Micahel Eggs",
     title: "The Found Boys",
     pages: 750,
     read: "not-read",
    }
];

console.log(myLibrary);

// method to create individual book with random id
function Book(author, title, pages, read) {
    if (!new.target) {
            throw Error("You must use the 'new' operator");
        };
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

// function to add books to the library array
function addBookToLibrary(){
    const userAuthor = prompt("Please enter book author: ");
    const userTitle = prompt("Please enter book title: ");
    const userPages = prompt("Please enter pages: ");
    const userRead = prompt("Please enter if read or not: ");
    
    myLibrary.push(new Book(userAuthor, userTitle, userPages, userRead));  
}



// Event Listeners
addBtn.addEventListener("click", () => {
    addBookToLibrary();
    console.log(myLibrary);
});