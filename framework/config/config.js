require('dotenv').config();

export default Object.freeze({
  baseURL: process.env.TEST_BOOKSTORE_API_URL ?? `https://bookstore.demoqa.com`,
  wrongUserId: process.env.TEST_BOOKSTORE_WRONG_USER_ID,
  username: process.env.TEST_BOOKSTORE_USERNAME,
  password: process.env.TEST_BOOKSTORE_PASSWORD,
  wrongpassword: process.env.TEST_BOOKSTORE_WRONG_PASSWORD,
  isbn: process.env.TEST_BOOKSTORE_ISBN,
  wrongisbn: process.env.TEST_BOOKSTORE_WRONG_ISBN,
  newisbn: process.env.TEST_BOOKSTORE_NEW_ISBN
})