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

const myLibrary = [];

function Book(title, author, amntOfPages, pagesRead, haveRead, favorite, coverSrcLink) {
    this.title = title;
    this.author = author;
    this.pages = amntOfPages;
    this.pagesRead = pagesRead;
    this.haveRead = haveRead;
    this.favorited = favorite;
    this.coverLink = coverSrcLink;
}

Book.prototype.createHTMLBookCard = function() {
    let bookCard = document.createElement("div");
    bookCard.setAttribute("class", "book-card");

    let bookCover = document.createElement("img");
    bookCover.setAttribute("class", "book-cover");
    if (this.coverLink != null) {
        bookCover.setAttribute("src", this.coverLink);
    }
    else {
        bookCover.setAttribute("src", "images/book_icon.svg");
    }

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

    let pagesSection = document.createElement("div");
    pagesSection.setAttribute("class", "pages-section");

    let pagesDisplay = document.createElement("div");
    pagesDisplay.setAttribute("class", 'pages-display');

    let bookPagesRead = document.createElement("p");
    bookPagesRead.setAttribute("class", "pages-read");
    bookPagesRead.textContent = this.pagesRead;
    pagesDisplay.appendChild(bookPagesRead);

    let division = document.createElement("p");
    division.textContent = " / ";
    pagesDisplay.appendChild(division);

    let bookPages = document.createElement("p");
    bookPages.setAttribute("class", "pages");
    bookPages.textContent = this.pages;
    pagesDisplay.appendChild(bookPages);

    pagesSection.appendChild(pagesDisplay);

    let subPageButton = document.createElement("button");
    subPageButton.setAttribute("class", "page-button subtract");
    subPageButton.textContent = "-";

    subPageButton.addEventListener('click', () => {
        if (this.pagesRead != 0)
        {
            this.pagesRead--;
            bookPagesRead.textContent = this.pagesRead;
        }
    })

    let addPageButton = document.createElement("button");
    addPageButton.setAttribute("class", "page-button add");
    addPageButton.textContent = "+";

    addPageButton.addEventListener('click', () => {
        if (this.pagesRead != this.pages)
            {
                this.pagesRead++;
                bookPagesRead.textContent = this.pagesRead;
            }
    })

    pagesSection.appendChild(subPageButton);
    pagesSection.appendChild(addPageButton);

    bookInfo.append(pagesSection);
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

let catInTheHat = new Book("Cat in the Hat", "Dr. Seuss", 61, 0, false, false, null);
let scottPilgrim = new Book("Scott Pilgrim's Precious Little Life", "Bryan Lee O'Malley", 168, 0, false, true, "https://m.media-amazon.com/images/I/71iPLgUFlmL._SY342_.jpg");
addBookToLibrary(catInTheHat);
addBookToLibrary(scottPilgrim);
displayLibraryToBookGallery();