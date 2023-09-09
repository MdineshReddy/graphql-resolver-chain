const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = `#graphql
    type Publisher {
        id: ID!
        name: String!
    }

    type Author {
        id: ID!
        name: String!
        books: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        genre: Genre!
        publisher: Publisher!
    }

    type Genre {
        id: ID!
        name: String!
    }

    type Query {
        authors: [Author!]!
        books: [Book!]!
        genres: [Genre!]!
        publishers: [Publisher!]!
    }
`;

// Sample data for testing
const authors = [
  { id: "1", name: "Author 1" },
  { id: "2", name: "Author 2" },
];

const genres = [
  { id: "1", name: "Genre 1" },
  { id: "2", name: "Genre 2" },
];

const publishers = [
  { id: "1", name: "Publisher 1" },
  { id: "2", name: "Publisher 2" },
];

const books = [
  {
    id: "1",
    title: "Book 1",
    authorId: "1",
    genreId: "1",
    publisherId: "1",
    sellerId: 223,
  },
  {
    id: "2",
    title: "Book 2",
    authorId: "2",
    genreId: "2",
    publisherId: "2",
    sellerId: 223,
  },
  {
    id: "3",
    title: "Book 3",
    authorId: "1",
    genreId: "2",
    publisherId: "2",
    sellerId: 223,
  },
];

// Define your resolvers
const resolvers = {
  Query: {
    authors: () => {
      console.log("*******************");
      console.log("Inside the main authors query resolver");
      console.log("Return Value", authors);
      console.log("*******************");
      return authors;
    },
    books: () => {
      console.log("*******************");
      console.log("Inside the main books query resolver");
      console.log("Return Value", books);
      console.log("*******************");
      return books;
    },
    genres: () => {
      console.log("*******************");
      console.log("Inside the main genres query resolver");
      console.log("Return Value", genres);
      console.log("*******************");
      return genres;
    },
    publishers: () => {
      console.log("*******************");
      console.log("Inside the main publishers query resolver");
      console.log("Return Value", publishers);
      console.log("*******************");
      return publishers;
    },
  },
  Author: {
    books: (parent) => {
      // Filter books by authorId to get books by this author
      console.log("*******************");
      console.log("Inside the field resolver for books");
      console.log("Parent: ", parent);
      let r = books.filter((book) => book.authorId === parent.id);
      console.log("Return Value: ", r);
      console.log("*******************");
      return r;
    },
  },
  Book: {
    author: (parent) => {
      // Find the author of this book based on authorId
      console.log("*******************");
      console.log("Inside the field resolver for author");
      console.log("Parent: ", parent);
      let r = authors.find((author) => author.id === parent.authorId);
      console.log("Return Value: ", r);
      console.log("*******************");
      return r;
    },
    genre: (parent) => {
      // Find the genre of this book based on genreId
      console.log("*******************");
      console.log("Inside the field resolver for genre");
      console.log("Parent: ", parent);
      let r = genres.find((genre) => genre.id === parent.genreId);
      console.log("Return Value: ", r);
      console.log("*******************");
      return r;
    },
    publisher: (parent) => {
      // Find the publisher of this book based on publisherId
      // Find the genre of this book based on genreId
      console.log("*******************");
      console.log("Inside the field resolver for publisher");
      console.log("Parent: ", parent);
      let r = publishers.find(
        (publisher) => publisher.id === parent.publisherId
      );
      console.log("Return Value: ", r);
      console.log("*******************");
      return r;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: (req, res) => {
      //   console.log(req);
    },
  });
  console.log(`🚀 Server ready at ${url}`);
}

startServer();
