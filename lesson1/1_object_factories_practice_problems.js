/**
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description

 */

/* 1. 
Create three objects that represent the three books shown above. 
The method for the "Get Description" behavior should return a string 
like the following: "Me Talk Pretty One Day was written by David Sedaris."
*/

function createBook(title, author, read = false) {
  return {
    title : title,
    author : author,
    read : read,

    readBook() {
      this.read = true;
    },

    getDescription() {
      let haveOrHaveNot = this.read ? 'have' : `haven't`;
      return `${this.title} was written by ${this.author}. I ${haveOrHaveNot} read it.`;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

let books = [book1, book2, book3];

books.forEach(book => console.log(book.getDescription()));
