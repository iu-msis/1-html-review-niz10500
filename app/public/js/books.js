
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
      }
  },
   
  created() {
    return this.fetchBookData();
 }
}

Vue.createApp(Books).mount('#bookApp');