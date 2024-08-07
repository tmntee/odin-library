class HeaderChanger {
    currentDate;
    currentHour;
    currentMonth;
    currentDay;
    currentYear;

    morningColor = "#9bbed1";
    afternoonColor = "#639bc9";
    eveningColor = "#b55c04"; 
    nightColor = "#141c2e";

    constructor(date) {
        this.currentDate = date;
        this.currentHour = this.currentDate.getHours();

        if (this.currentHour >= 5 && this.currentHour < 12) {
            this.changeColorAndText(this.morningColor, " morning");
        } else if (this.currentHour >= 12 && this.currentHour < 17) {
            this.changeColorAndText(this.afternoonColor, " afternoon");
        } else if (this.currentHour >= 17 && this.currentHour < 21) {
            this.changeColorAndText(this.eveningColor, " evening");
        } else if (this.currentHour >= 21 || this.currentHour <= 4) {
            this.changeColorAndText(this.nightColor, "night");
        }

        this.currentMonth = this.currentDate.toLocaleDateString('default', { month: 'long'});
        this.currentDay = this.currentDate.getUTCDate();
        this.currentYear = this.currentDate.getUTCFullYear();

        document.getElementById("date").textContent = `${this.currentMonth} ${this.currentDay}, ${this.currentYear}`;
    }

    changeColorAndText = function(color, text) {
        document.getElementById("header-sky").style.backgroundColor = color;
        document.getElementById("user-greeting").textContent += text;
    }
}

let dynamicHeader = new HeaderChanger(new Date);

class Library {
    #myLibrary = [];
    libraryDisplay = document.querySelector(".book-gallery");

    clearDisplay() {
        while(this.libraryDisplay.firstChild) {
            this.libraryDisplay.removeChild(this.libraryDisplay.firstChild);
        }
    }

    createBookDisplayCard(book) {
        let bookCard = document.createElement("div");
        bookCard.setAttribute("class", "book-card");

        let bookCover = document.createElement("img");
        bookCover.setAttribute("class", "book-cover");
        bookCover.setAttribute("src", book.coverSrcLink);

        bookCard.appendChild(bookCover);

        let bookInfo = document.createElement("div");
        bookInfo.setAttribute("class","book-info");

        let bookTitle = document.createElement("h1");
        bookTitle.setAttribute("class", "title");
        bookTitle.textContent = book.title;
        bookInfo.appendChild(bookTitle);

        let bookAuthor = document.createElement("p");
        bookAuthor.setAttribute("class", "author");
        bookAuthor.textContent = book.author;
        bookInfo.appendChild(bookAuthor);

        bookCard.appendChild(bookInfo);

        let pagesSection = document.createElement("div");
        pagesSection.setAttribute("class", "pages-section");

        let pagesDisplay1 = document.createElement("div");
        pagesDisplay1.setAttribute("class", 'pages-display');

        let bookPagesRead = document.createElement("p");
        bookPagesRead.setAttribute("class", "pages-read");
        bookPagesRead.textContent = book.pagesRead;
        pagesDisplay1.appendChild(bookPagesRead);

        let division = document.createElement("p");
        division.textContent = " / ";
        pagesDisplay1.appendChild(division);

        let bookPages = document.createElement("p");
        bookPages.setAttribute("class", "pages");
        bookPages.textContent = `${book.pages} pages`;
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
            if (book.pagesRead != 0)
            {
                book.pagesRead--;
                bookPagesRead.textContent = book.pagesRead;
            }
        })

        let addPageButton = document.createElement("button");
        addPageButton.setAttribute("class", "page-button add");
        let addIcon = document.createElement("img");
        addIcon.setAttribute("src", "images/add-icon.svg");
        addPageButton.appendChild(addIcon);

        addPageButton.addEventListener('click', () => {
            if (book.pagesRead != book.pages)
            {
                book.pagesRead++;
                bookPagesRead.textContent = book.pagesRead;
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
            let bookIndex = this.#myLibrary.indexOf(book);
            this.#myLibrary.splice(bookIndex, 1);
            this.displayLibrary();
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

        if (book.favorited == true) {
            favButtonIcon.setAttribute("src", "images/star-fill.svg"); 
            favButton.style.backgroundColor = favoritedBgClr; 
        } 
        else {
            favButtonIcon.setAttribute("src", "images/star-nofill.svg");
        }
    
        favButton.appendChild(favButtonIcon);

        favButton.addEventListener('click', () => {
            if (book.favorited === true){
                book.favorited = false;
                favButtonIcon.setAttribute("src", "images/star-nofill.svg");
                favButton.style.backgroundColor = defaultBttnClr;
            }
            else{
                book.favorited = true;
                favButtonIcon.setAttribute("src", "images/star-fill.svg");
                favButton.style.backgroundColor = favoritedBgClr;
            }
        })

        bookNav.appendChild(favButton);
    
        // read button functionality
        let readButton = document.createElement("button");
        let readButtonIcon = document.createElement("img");
        let haveReadBgClr = "#79f569";

        if (book.haveRead == true) {
            readButtonIcon.setAttribute("src", "images/book-fill.svg"); 
            readButton.style.backgroundColor = haveReadBgClr; 
            book.pagesRead = book.pages;
            bookPagesRead.textContent = book.pagesRead;
        } 
        else {
            readButtonIcon.setAttribute("src", "images/book-nofill.svg");
        }
    
        readButton.appendChild(readButtonIcon);

        readButton.addEventListener('click', () => {
            if (book.haveRead === true) {
                book.haveRead = false;
                readButtonIcon.setAttribute("src", "images/book-nofill.svg");
                readButton.style.backgroundColor = defaultBttnClr;
            }
            else {
                book.haveRead = true;
                readButtonIcon.setAttribute("src", "images/book-fill.svg");
                readButton.style.backgroundColor = haveReadBgClr;
                book.pagesRead = book.pages;
                bookPagesRead.textContent = book.pagesRead;
            }
        })

        bookNav.appendChild(readButton);
        bookCard.appendChild(bookNav);
        return bookCard;
    }

    displayLibrary() {
        this.clearDisplay();

        this.#myLibrary.forEach((book) => {
            this.libraryDisplay.appendChild(this.createBookDisplayCard(book));
        })
    }

    addBookToLibrary(book) {
        this.#myLibrary.push(book);
    }

    removeBookFromLibrary(book) {
        console.log(this.#myLibrary.indexOf(book));
        this.#myLibrary.splice(this.#myLibrary.indexOf(book), 1);
        console.log(this.#myLibrary);
        this.displayLibrary();
    }

}

class Book {
    title;
    author;
    pages;
    pagesRead;
    haveRead;
    favorite;
    coverSrcLink;

    constructor(title, author, amntOfPages, pagesRead, haveRead, favorite, coverSrcLink) {
        this.title = title;
        this.author = author;
        this.pages = amntOfPages;
        this.pagesRead = (pagesRead === undefined) ? 0 : pagesRead;
        this.haveRead = (haveRead === undefined) ? false : haveRead;
        this.favorite = (favorite === undefined) ? false : favorite;
        this.coverSrcLink = (coverSrcLink === undefined) ? "images/book_icon.svg" : coverSrcLink;
    }
}

let lib = new Library();

lib.addBookToLibrary(new Book("Scott Pilgrim's Precious Little Life, Vol. 1", "Bryan Lee O'Malley", 168, 0, true, true, "https://m.media-amazon.com/images/I/71iPLgUFlmL._SY342_.jpg"));
lib.addBookToLibrary(new Book("Scott Pilgrim vs. the World, Vol. 2", "Bryan Lee O'Malley", 200, 0, false, false, "https://m.media-amazon.com/images/I/81kv99NSTgL._SY466_.jpg"));
lib.addBookToLibrary(new Book("Scott Pilgrim and the Infinite Sadness, Vol. 3", "Bryan Lee O'Malley", 192, 0, true, true, "https://m.media-amazon.com/images/I/71gQgfM5viL._SY466_.jpg"));
lib.addBookToLibrary(new Book("Scott Pilgrim Gets It Together, Vol. 4", "Bryan Lee O'Malley", 216, 0, true, false, "https://m.media-amazon.com/images/I/516WYhxXHFL._SY445_SX342_.jpg"));
lib.addBookToLibrary(new Book("Scott Pilgrim vs. The Universe, Vol. 5", "Bryan Lee O'Malley", 184, 0, false, true, "https://m.media-amazon.com/images/I/71QKmyN2YFL._SY466_.jpg"));
lib.addBookToLibrary(new Book("Scott Pilgrim's Finest Hour, Vol. 6", "Bryan Lee O'Malley", 248, 0, false, false, "https://m.media-amazon.com/images/I/71dt1Uw4gaL._SY466_.jpg"));

lib.displayLibrary();


class AddBookForm {
    formDialog = document.querySelector("#add-book-dialog");
    addBookButton = document.querySelector("#add-book-button");
    closeBookDialog = document.querySelector("#close-button");
    bookForm = document.querySelector("dialog#add-book-dialog form");

    coverUrl = document.querySelector("input[name=cover-url]");
    bookTitle = document.querySelector("input[name=book-title]");
    bookAuthor = document.querySelector("input[name=book-author]");
    bookPages = document.querySelector("input[name=book-pages]");
    bookPagesRead = document.querySelector("input[name=book-pages-read]");
    haveReadToggle = document.querySelector("input[name=have-read]");
    favoriteToggle = document.querySelector("input[name=favorite]");
    submitBookButton = document.querySelector("#submit-book-button");
    
    resetForm() {
        bookForm.reset();
    }

    formSetup(library) {
        this.addBookButton.addEventListener('click', () => {
            this.formDialog.showModal();
        })

        this.closeBookDialog.addEventListener('click', (e) => {
            e.preventDefault();
            this.formDialog.close();
        })

        this.coverUrl.addEventListener('change', () => {
            let coverDisplay = document.querySelector("img.new-book-cover");
            coverDisplay.setAttribute("src", this.coverUrl.value);
        })

        this.submitBookButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.bookForm.checkValidity())
            {   
                if( this.bookPagesRead.value === "")
                {
                    this.bookPagesRead.value = 0;
                }
                let book = new Book(this.bookTitle.value, this.bookAuthor.value, this.bookPages.value, this.bookPagesRead.value, this.haveReadToggle.checked, this.favoriteToggle.checked, this.coverUrl.value);
                library.addBookToLibrary(book);
                library.displayLibrary();
                this.formDialog.close();
                this.resetForm();
            }
            else{
                this.bookForm.reportValidity();
            }
        })
    }

    constructor(library) {
        this.formSetup(library);
    }
    
}

new AddBookForm(lib);







