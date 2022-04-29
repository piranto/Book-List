// Get the UI element
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');


// Book class
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn =isbn;
    }
}

// UI class
class UI{
    
    static addToBoklist(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector("#titel").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

    static showAlert(message,className){
        let div =document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container =document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleteFromBook(target) {
        if(target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            UI.showAlert('Book Removed!', 'success');
        }
    }
}

// Local Storage Clase

class Store{
    static getBooks(){
        let books ;
        if(localStorage.getItem('books') ===  null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = Store.getBooks();

        books.forEach(book=>{
            UI.addToBoklist(book);
        });
    }

      

}

// Add Event Listener

form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());



// Define Function

function newBook(e) {
    let title = document.querySelector("#titel").value,
    author = document.querySelector("#author").value,
    isbn = document.querySelector("#isbn").value;
    

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill all the fields!","error");

    }else{
        let book = new Book(title, author,isbn);

        UI.addToBoklist(book);

        UI.clearFields();

        UI.showAlert("Book Added!","success");

        Store.addBook(book);

        

    }

   


    e.preventDefault();
}

function removeBook(e) {

    
    UI.deleteFromBook(e.target);
    



    e.preventDefault();

}