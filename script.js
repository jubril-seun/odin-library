
const cardSection = document.querySelector(".cards-section");

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

// console.log(myLibrary);

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

const Clrs = [];

function randomBgClr(){
    const yellow = "#FFE45E";
    const purple = "#B9A4FF";
    const blue = "#8fd3ff";
    const green = "#7fe5b8";
    const pink = "#FF5CA8";
    const orange = "#FFB347";

    let color = "";
    
    const value = Math.floor(Math.random() * 6);
    
    if(value === 0) color = yellow;
    if(value === 1) color = purple;
    if(value === 2) color = blue;
    if(value === 3) color = green;
    if(value === 4) color = pink;
    if(value === 5) color = orange;
    
    if(color === Clrs[Clrs.length - 1]){
        return randomBgClr();
    } else {
        Clrs.push(color);
        return color;
    }

}

// console.log(Clrs);

function updateBooks(){
    myLibrary.forEach((book, index) => {
        const container = document.createElement("div");
        container.classList.add("card-container");
        container.setAttribute("id", book.id);
        container.style.backgroundColor = randomBgClr();
        cardSection.appendChild(container);

        const crdTop = document.createElement("div");
        crdTop.classList.add("card-top-flex");
        container.appendChild(crdTop);

        const pages = document.createElement("p");
        pages.classList.add("bk-pages")
        pages.textContent = `${book.pages} pages`;
        crdTop.appendChild(pages);

        const trashDiv = document.createElement("div");
        trashDiv.dataset.trashId = book.id;
        crdTop.appendChild(trashDiv);
        const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
    
        trashDiv.insertAdjacentHTML("beforeend", svgCode);
        

        const crdBottom = document.createElement("div");
        crdBottom.classList.add("card-bottom-flex");
        container.appendChild(crdBottom);

        const title = document.createElement("p");
        title.classList.add("bk-title")
        title.textContent = book.title;
        crdBottom.appendChild(title);

        const author = document.createElement("p");
        author.classList.add("bk-author")
        author.textContent = book.author;
        crdBottom.appendChild(author);

        const button = document.createElement("button");
        button.dataset.bookId = book.id;
        button.classList.add("bk-status-btn");
        button.classList.add(book.read);
        button.textContent = book.read;
        crdBottom.appendChild(button);
    });
}

updateBooks();

// Event Listeners
// addBtn.addEventListener("click", () => {
//     addBookToLibrary();
//     console.log(myLibrary);
// });