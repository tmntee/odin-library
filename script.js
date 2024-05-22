const myLibrary = [];

function Book(title, author, amntOfPages, pagesRead, haveRead, favorite) {
    this.title = title;
    this.author = author;
    this.pages = amntOfPages;
    this.pagesRead = pagesRead;
    this.haveRead = haveRead;
    this.favorited = favorite;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const bookGallery = document.querySelector(".book-gallery");

function displayLibraryToBookGallery() {
    for (let i = 0; i < myLibrary.length; i++)
    {   
        let bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");

        let bookCover = document.createElement("img");
        bookCover.setAttribute("class", "book-cover");
        bookCover.setAttribute("src", "images/book_icon.svg");
        bookCard.appendChild(bookCover);

        let bookInfo = document.createElement("div");
        bookInfo.setAttribute("class","book-info");

        let bookTitle = document.createElement("p");
        bookTitle.setAttribute("class", "title");
        bookTitle.textContent = myLibrary.at(i)["title"];
        bookInfo.appendChild(bookTitle);

        let bookAuthor = document.createElement("p");
        bookAuthor.setAttribute("class", "author");
        bookAuthor.textContent = myLibrary.at(i)["author"];
        bookInfo.appendChild(bookAuthor);

        let bookPages = document.createElement("p");
        bookPages.setAttribute("class", "pages");
        bookPages.textContent = myLibrary.at(i)["pages"];
        bookInfo.appendChild(bookPages);

        bookCard.appendChild(bookInfo);

        bookGallery.appendChild(bookCard);
    }
}

let catInTheHat = new Book("Cat in the Hat", "Dr. Seuss", 61, 0, false, false);
addBookToLibrary(catInTheHat);
displayLibraryToBookGallery();