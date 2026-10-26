
const cardSection = document.querySelector(".cards-section");
const addBookBtn = document.querySelector(".add-book-btn");

const addCloseBtn = document.getElementById('close-add-modal');
const editCloseBtn = document.getElementById('close-edit-modal');

const modal = document.getElementById("dialog-modal1");
const modal2 = document.getElementById("dialog-modal2");
const dialogWrapper = document.getElementById("dialog-wrapper1");
const dialogWrapper2 = document.getElementById("dialog-wrapper2");

const modalToggle = document.getElementById("modal-toggle1");
const modalReadTxt = document.getElementById("modal-toggle-text1");

const modalToggle2 = document.getElementById("modal-toggle2");
const modalReadTxt2 = document.getElementById("modal-toggle-text2");

const addForm = document.getElementById("add-form");
const editForm = document.getElementById("edit-form");

const editFormAuthor = document.getElementById("edit-form-author");
const editFormTitle = document.getElementById("edit-form-title");
const editFormPages = document.getElementById("edit-form-pages");

const tally = document.querySelector(".tally-txt")

const myLibrary = [];

let currentEditId = "";

// console.log(myLibrary);

// method to create individual book with random id
function Book(author, title, pages, read, bgColor, id) {
    if (!new.target) {
            throw Error("You must use the 'new' operator");
        };
    
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.bgColor = bgColor;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
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

myLibrary.push(
    new Book("Suzanne Collins", "The Hunger Games", 374, true, randomBgClr(), "43345kd44534"),
    new Book("Gillian Flynn", "Gone Girl", 464, false, randomBgClr(), "4343433434234"),
    new Book("George Orwell", "1984", 328, true, randomBgClr(), "434343343544234")
);

// function to add books to the library array
function addBookToLibrary(data){

    const userTitle = data.get("title");
    const userAuthor = data.get("author");
    const userPages = Number(data.get("pages"));
    const userRead = data.has("read");
    const bgColor = randomBgClr();
    const id = crypto.randomUUID();

    myLibrary.push(new Book(userAuthor, userTitle, userPages, userRead, bgColor, id));  
}

function createCard(book){
    let readText = "";
    
    if(book.read){
        readText = "read";
    } else {
        readText = "Not read";
    }

    const container = document.createElement("div");
    container.classList.add("card-container");
    container.setAttribute("id", book.id);
    container.style.backgroundColor = book.bgColor;
    cardSection.appendChild(container);

    const crdTop = document.createElement("div");
    crdTop.classList.add("card-top-flex");
    container.appendChild(crdTop);

    const pages = document.createElement("p");
    pages.classList.add("bk-pages")
    pages.textContent = `${book.pages} pages`;
    crdTop.appendChild(pages);

    const iconGrp = document.createElement("div");
    iconGrp.classList.add("icon-grp");
    crdTop.appendChild(iconGrp);

    const pencilDiv = document.createElement("div");
    pencilDiv.dataset.editId = book.id;
    pencilDiv.classList.add("edit-icon");    
    
    const trashDiv = document.createElement("div");
    trashDiv.dataset.trashId = book.id;
    trashDiv.classList.add("trash-icon");
    
    iconGrp.appendChild(pencilDiv);
    iconGrp.appendChild(trashDiv);
    
    const trashSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>`;
    const pencilSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil-outline</title><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`;

    pencilDiv.insertAdjacentHTML("beforeend", pencilSvgCode);       
    trashDiv.insertAdjacentHTML("beforeend", trashSvgCode);
    
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

    const readStatus = document.createElement("div");
    readStatus.classList.add("read-status");
    crdBottom.appendChild(readStatus);

    const toggleInput = document.createElement("input");
    toggleInput.type = "checkbox";
    toggleInput.classList.add("read-toggle");
    toggleInput.checked = book.read;
    toggleInput.dataset.toggleId = book.id;
    readStatus.appendChild(toggleInput);

    const readState = document.createElement("p");
    readState.textContent = readText;
    readStatus.appendChild(readState);
}

function updateBooks(){
    cardSection.replaceChildren();

    myLibrary.forEach((book, index) => {
        createCard(book);
    });
}

function deleteBooks(idMatch){    
    const i = myLibrary.findIndex(item => item.id === idMatch);

    if(i !== -1){
       myLibrary.splice(i, 1);
       updateBooks();
       bookTally();
    }
}

function updateRead(idMatch){
    const i = myLibrary.findIndex(item => item.id === idMatch);

    myLibrary[i].toggleRead();
    updateBooks();
    bookTally();
}

function editCard(idMatch){
    
    const i = myLibrary.findIndex(item => item.id === idMatch);

      let readText = "";
    
    if(myLibrary[i].read){
        readText = "read";
    } else {
        readText = "Not read";
    }

    editFormAuthor.value = myLibrary[i].author;
    editFormTitle.value = myLibrary[i].title;
    editFormPages.value = myLibrary[i].pages;
    modalToggle2.checked = myLibrary[i].read;
    modalReadTxt2.textContent = readText;
    currentEditId = myLibrary[i].id;
}

function editLibrary(data){

    const i = myLibrary.findIndex(item => item.id === currentEditId);


    myLibrary[i].author = data.get("author");
    myLibrary[i].title = data.get("title");
    myLibrary[i].pages = Number(data.get("pages"));
    myLibrary[i].read = data.has("read");

    currentEditId = "";
}


function bookTally(){
    const total = myLibrary.length;
    const read = myLibrary.filter(item => item.read).length;
    const remaining = Number(total) - Number(read);

   if(myLibrary.length === 0){
        tally.textContent = "0 books"
   } else if (read === total) {
        tally.textContent = `Nice! You've read all ${total} books in your library!`
   } else {
    tally.textContent = `${total} books · ${read} read · ${remaining} to go`;
   }
}

bookTally()

// Event Listeners //


// Delete Books
cardSection.addEventListener('click', (e) => {
    const trash = e.target.closest('.trash-icon');
    const read = e.target.closest('.read-toggle');
    const edit = e.target.closest('.edit-icon');

   if (trash){
     deleteBooks(trash.dataset.trashId);
   }else if (read){
     updateRead(read.dataset.toggleId);
   } else if (edit){
        modal2.showModal();
        editCard(edit.dataset.editId);
   }

})


// Add Books Button
addBookBtn.addEventListener('click', () => {
    modal.showModal();
})

// Close Modal
addCloseBtn.addEventListener('click', () => {
    modal.close();
    addForm.reset();
    modalReadTxt.textContent = "not read";
})

editCloseBtn.addEventListener('click', () => {
    modal2.close();
    editForm.reset();
})

modal.addEventListener('click', (e) => {
    if(!dialogWrapper.contains(e.target)){
        modal.close();
    }
})

modal2.addEventListener('click', (e) => {
    if(!dialogWrapper2.contains(e.target)){
        modal2.close();
    }
})

// Toggle modal read state
modalToggle.addEventListener('change', (e) => {

    if(modalToggle.checked){
        modalReadTxt.textContent = "read";
    } else {
        modalReadTxt.textContent = "not read";
    }
})

modalToggle2.addEventListener('change', (e) => {

    if(modalToggle2.checked){
        modalReadTxt2.textContent = "read";
    } else {
        modalReadTxt2.textContent = "not read";
    }
})

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fd = new FormData(addForm);
    addBookToLibrary(fd);
   
    modal.close();
    modalReadTxt.textContent = "not read";
    addForm.reset();
    updateBooks();
    bookTally()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fd = new FormData(editForm);
    editLibrary(fd);
   
    modal2.close();
    editForm.reset();
    updateBooks();
    bookTally()
})

updateBooks();