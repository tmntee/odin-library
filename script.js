let morningColor = "#9bbed1";
let afternoonColor = "#639bc9";
let eveningColor = "#b55c04"; 
let nightColor = "#141c2e";

let time = new Date();
let currentHour = time.getHours();
if (currentHour >= 5 && currentHour < 12)
{
    document.getElementById("header-sky").style.backgroundColor = morningColor;
    document.getElementById("user-greeting").textContent += " morning";
} 
else if (currentHour >= 12 && currentHour < 17)
{
    document.getElementById("header-sky").style.backgroundColor = afternoonColor;
    document.getElementById("user-greeting").textContent += " afternoon";
} 
else if (currentHour >= 17 && currentHour < 21)
{
    document.getElementById("header-sky").style.backgroundColor = eveningColor;
    document.getElementById("user-greeting").textContent += " evening";
}
else if (currentHour >= 21 || currentHour <= 4)
{
    document.getElementById("header-sky").style.backgroundColor = nightColor;
    document.getElementById("user-greeting").textContent += "night";
}
    
let month = time.toLocaleDateString('default', { month: 'long'});
let day = time.getUTCDate();
time.toLocaleDateString
let year = time.getUTCFullYear();
document.getElementById("date").textContent = `${month} ${day}, ${year}`;

let myLibrary = [];

function Book(title, author, amntOfPages, pagesRead, haveRead, favorite, coverSrcLink) {
    this.title = title;
    this.author = author;
    this.pages = amntOfPages;
    this.pagesRead = pagesRead;
    this.haveRead = haveRead;
    this.favorited = favorite;

    if (coverSrcLink === "" || coverSrcLink === undefined) {
        this.coverLink = "images/book_icon.svg";
    } else {
        this.coverLink = coverSrcLink;
    }

}

Book.prototype.createHTMLBookCard = function() {
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    let bookCover = document.createElement("img");
    bookCover.setAttribute("class", "book-cover");
    bookCover.setAttribute("src", this.coverLink);

    bookCard.appendChild(bookCover);

    let bookInfo = document.createElement("div");
    bookInfo.setAttribute("class","book-info");

    let bookTitle = document.createElement("h1");
    bookTitle.setAttribute("class", "title");
    bookTitle.textContent = this.title;
    bookInfo.appendChild(bookTitle);

    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "author");
    bookAuthor.textContent = this.author;
    bookInfo.appendChild(bookAuthor);

    bookCard.appendChild(bookInfo);

    let pagesSection = document.createElement("div");
    pagesSection.setAttribute("class", "pages-section");

    let pagesDisplay1 = document.createElement("div");
    pagesDisplay1.setAttribute("class", 'pages-display');

    let bookPagesRead = document.createElement("p");
    bookPagesRead.setAttribute("class", "pages-read");
    bookPagesRead.textContent = this.pagesRead;
    pagesDisplay1.appendChild(bookPagesRead);

    let division = document.createElement("p");
    division.textContent = " / ";
    pagesDisplay1.appendChild(division);

    let bookPages = document.createElement("p");
    bookPages.setAttribute("class", "pages");
    bookPages.textContent = this.pages;
    pagesDisplay1.appendChild(bookPages);

    pagesSection.appendChild(pagesDisplay1);

    let pagesDisplay2 = document.createElement("div");
    pagesDisplay2.setAttribute("class", 'pages-display');

    let subPageButton = document.createElement("button");
    subPageButton.setAttribute("class", "page-button subtract");
    let subIcon = document.createElement("img");
    subIcon.setAttribute("src", "images/remove-icon.svg");
    subPageButton.appendChild(subIcon);

    subPageButton.addEventListener('click', () => {
        if (this.pagesRead != 0)
        {
            this.pagesRead--;
            bookPagesRead.textContent = this.pagesRead;
        }
    })

    let addPageButton = document.createElement("button");
    addPageButton.setAttribute("class", "page-button add");
    let addIcon = document.createElement("img");
    addIcon.setAttribute("src", "images/add-icon.svg");
    addPageButton.appendChild(addIcon);

    addPageButton.addEventListener('click', () => {
        if (this.pagesRead != this.pages)
            {
                this.pagesRead++;
                bookPagesRead.textContent = this.pagesRead;
            }
    })

    pagesDisplay2.appendChild(subPageButton);
    pagesDisplay2.appendChild(addPageButton);

    pagesSection.appendChild(pagesDisplay2);

    bookCard.appendChild(pagesSection);

    // delete button functionality
    let bookNav = document.createElement("div");
    bookNav.setAttribute("class", "book-nav");

    let deleteButton = document.createElement("button");
    deleteButton.addEventListener('click', () => {
        console.log(myLibrary.indexOf(this));
        myLibrary.splice(myLibrary.indexOf(this), 1);
        console.log(myLibrary);
        displayLibraryToBookGallery();
    })
    let deleteButtonIcon = document.createElement("img");
    deleteButtonIcon.setAttribute("src", "images/delete-nofill.svg");

    deleteButton.appendChild(deleteButtonIcon);

    deleteButton.addEventListener('mousedown', () => {
        deleteButtonIcon.setAttribute("src", "images/delete-fill.svg");
    })

    deleteButton.addEventListener('mouseup', () => {
        deleteButtonIcon.setAttribute("src", "images/delete-nofill.svg");
    })

    bookNav.appendChild(deleteButton);

    // favorite button functionality
    let favButton = document.createElement("button");
    let favButtonIcon = document.createElement("img");

    let defaultBttnClr = favButton.style.backgroundColor;
    let favoritedBgClr = "#f5d469";

    if (this.favorited == true) {
        favButtonIcon.setAttribute("src", "images/star-fill.svg"); 
        favButton.style.backgroundColor = favoritedBgClr; 
    } 
    else {
        favButtonIcon.setAttribute("src", "images/star-nofill.svg");
    }
    
    favButton.appendChild(favButtonIcon);

    favButton.addEventListener('click', () => {
        if (this.favorited === true){
            this.favorited = false;
            favButtonIcon.setAttribute("src", "images/star-nofill.svg");
            favButton.style.backgroundColor = defaultBttnClr;
        }
        else{
            this.favorited = true;
            favButtonIcon.setAttribute("src", "images/star-fill.svg");
            favButton.style.backgroundColor = favoritedBgClr;
        }
    })

    bookNav.appendChild(favButton);
    
    // read button functionality
    let readButton = document.createElement("button");
    let readButtonIcon = document.createElement("img");
    let haveReadBgClr = "#79f569";

    if (this.haveRead == true) {
        readButtonIcon.setAttribute("src", "images/book-fill.svg"); 
        readButton.style.backgroundColor = haveReadBgClr; 
        this.pagesRead = this.pages;
        bookPagesRead.textContent = this.pagesRead;
    } 
    else {
        readButtonIcon.setAttribute("src", "images/book-nofill.svg");
    }
    
    readButton.appendChild(readButtonIcon);

    readButton.addEventListener('click', () => {
        if (this.haveRead === true) {
            this.haveRead = false;
            readButtonIcon.setAttribute("src", "images/book-nofill.svg");
            readButton.style.backgroundColor = defaultBttnClr;
        }
        else {
            this.haveRead = true;
            readButtonIcon.setAttribute("src", "images/book-fill.svg");
            readButton.style.backgroundColor = haveReadBgClr;
            this.pagesRead = this.pages;
            bookPagesRead.textContent = this.pagesRead;
        }
    })

    bookNav.appendChild(readButton);
    bookCard.appendChild(bookNav);
    return bookCard;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const bookGallery = document.querySelector(".book-gallery");

function displayLibraryToBookGallery() {
    while(bookGallery.firstChild) {
        bookGallery.removeChild(bookGallery.firstChild);
    }

    myLibrary.forEach((book) => {
        bookGallery.appendChild(book.createHTMLBookCard());
    })
}

let scottPilgrim = new Book("Scott Pilgrim's Precious Little Life, Vol. 1", "Bryan Lee O'Malley", 168, 0, true, true, "https://m.media-amazon.com/images/I/71iPLgUFlmL._SY342_.jpg");
addBookToLibrary(scottPilgrim);
let scottPilgrim2 = new Book("Scott Pilgrim vs. the World, Vol. 2", "Bryan Lee O'Malley", 200, 0, false, false, "https://m.media-amazon.com/images/I/81kv99NSTgL._SY466_.jpg");
addBookToLibrary(scottPilgrim2);
let scottPilgrim3 = new Book("Scott Pilgrim and the Infinite Sadness, Vol. 3", "Bryan Lee O'Malley", 192, 0, true, true, "https://m.media-amazon.com/images/I/71gQgfM5viL._SY466_.jpg");
addBookToLibrary(scottPilgrim3);
let scottPilgrim4 = new Book("Scott Pilgrim Gets It Together, Vol. 4", "Bryan Lee O'Malley", 216, 0, true, false, "https://m.media-amazon.com/images/I/516WYhxXHFL._SY445_SX342_.jpg");
addBookToLibrary(scottPilgrim4);
let scottPilgrim5 = new Book("Scott Pilgrim vs. The Universe, Vol. 5", "Bryan Lee O'Malley", 184, 0, false, true, "https://m.media-amazon.com/images/I/71QKmyN2YFL._SY466_.jpg");
addBookToLibrary(scottPilgrim5);
let scottPilgrim6 = new Book("Scott Pilgrim's Finest Hour, Vol. 6", "Bryan Lee O'Malley", 248, 0, false, false, "https://m.media-amazon.com/images/I/71dt1Uw4gaL._SY466_.jpg");
addBookToLibrary(scottPilgrim6);

displayLibraryToBookGallery();

let addBookFormDialog = document.querySelector("#add-book-dialog");
let addBookButton = document.querySelector("#add-book-button");
addBookButton.addEventListener('click', () => {
    addBookFormDialog.showModal();
})

let closeBookDialog = document.querySelector("#close-button");
closeBookDialog.addEventListener('click', (e) => {
    e.preventDefault();
    addBookFormDialog.close();
})

let bookForm = document.querySelector("dialog#add-book-dialog form");

function resetForm() {
    bookForm.reset();
}

let coverUrl = document.querySelector("input[name=cover-url]");
let bookTitle = document.querySelector("input[name=book-title]");
let bookAuthor = document.querySelector("input[name=book-author]");
let bookPages = document.querySelector("input[name=book-pages]");
let bookPagesRead = document.querySelector("input[name=book-pages-read]");
let haveReadToggle = document.querySelector("input[name=have-read]");
let favoriteToggle = document.querySelector("input[name=favorite]");
let submitBookButton = document.querySelector("#submit-book-button");
submitBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (bookForm.checkValidity())
    {   
        if( bookPagesRead.value === "")
        {
            bookPagesRead.value = 0;
        }
        let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookPagesRead.value, haveReadToggle.checked, favoriteToggle.checked, coverUrl.value);
        addBookToLibrary(book);
        displayLibraryToBookGallery();
        addBookFormDialog.close();
        resetForm();
    }
    else{
        bookForm.reportValidity();
    }
})

