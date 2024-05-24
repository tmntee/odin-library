const myLibrary = [];

function Book(title, author, amntOfPages, pagesRead, haveRead, favorite) {
    this.title = title;
    this.author = author;
    this.pages = amntOfPages;
    this.pagesRead = pagesRead;
    this.haveRead = haveRead;
    this.favorited = favorite;
}

Book.prototype.createHTMLBookCard = function() {
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
    bookTitle.textContent = this.title;
    bookInfo.appendChild(bookTitle);

    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", "author");
    bookAuthor.textContent = this.author;
    bookInfo.appendChild(bookAuthor);

    let bookPages = document.createElement("p");
    bookPages.setAttribute("class", "pages");
    bookPages.textContent = this.pages;
    bookInfo.appendChild(bookPages);

    bookCard.appendChild(bookInfo);

    let bookNav = document.createElement("div");
    bookNav.setAttribute("class", "book-nav");
    
    let buttonTexts = ["Remove", "Favorite", "Read"];
    buttonTexts.forEach(function(text) {   
        let button = document.createElement("button");
        button.textContent = text;
        bookNav.appendChild(button);
    })
    bookCard.appendChild(bookNav);

    return bookCard;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const bookGallery = document.querySelector(".book-gallery");

function displayLibraryToBookGallery() {
    for (let i = 0; i < myLibrary.length; i++)
    {   
        let bookCard = myLibrary.at(i).createHTMLBookCard();

        bookGallery.appendChild(bookCard);
    }
}

let catInTheHat = new Book("Cat in the Hat", "Dr. Seuss", 61, 0, false, false);
addBookToLibrary(catInTheHat);
displayLibraryToBookGallery();