
const Books = {
    data() {
      return {
          books: [],
          bookForm: {},
          selectedBook: null,
    
        }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectBook(s) {
            if (s == this.selectedBook) {
                return;
            }
            this.selectedBook = s;
            this.books = [];
            this.fetchBookData(this.selectedBook);
        },
        fetchBookData() {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postBook(evt){
            if (this.selectedBook){
                this.PostEditBook(evt);
            } else{
                this.postNewBook(evt);
            }
        },

        PostEditBook(evt){
            this.bookForm.id = this.selectedBook.id;        
          console.log("Editing:", this.bookForm);
          alert("Editing!");
  
          fetch('api/book/update.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form  （clean the form)
              this.handleResetEdit;
            });
        },
        postDeleteBook(o) {
            if (!confirm("Are you sure you want to delete the offer from "+o.Title+"?")) {
                return;
            }
            
            fetch('api/book/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form  （clean the form)
                this.bookForm = {};
              });
          
          },
    postNewBook(evt) {     
        console.log("Posting:", this.bookForm);
        alert("Posting!");

        fetch('api/book/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form  （clean the form)
            this.bookForm = {};
          });
      },

      handleEditBook(book){
        this.selectedBook = book;
        this.bookForm = Object.assign({}, this.selectedBook);
      },
      handleResetEdit(){
        this.selectedBook = null;
        this.bookForm = {};
      }

  },


   
  created() {
    return this.fetchBookData();
 }
}

Vue.createApp(Books).mount('#bookApp');