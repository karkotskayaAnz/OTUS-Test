import supertest from 'supertest'
import config from '../config/config'

const newISBN = config.newisbn
const isbn = config.isbn

const createBooks = async ({userId, token, books}) => {
  const body = JSON.stringify({userId, books})
  const response = await supertest(config.baseURL)
  .post('/BookStore/v1/Books')
  .set({'Content-Type':'application/json'})
  .set({'Authorization':`${token}`})
  .send(body)
  return {
    data: response.data,
    status: response.status
  }
}

const updateBook = async ({userId, token}) => {
  const body = JSON.stringify({userId, newISBN})
  const response = await supertest(config.baseURL)
  .put(`/BookStore/v1/Books/${isbn}`)
  .set({'Content-Type':'application/json'})
  .set({'Authorization':`${token}`})
  .send(body)
  return {
    status: response.status
  }
}

const getBook = async (ISBN) => {
  const response = await supertest(config.baseURL)
  .get(`/BookStore/v1/Book?ISBN=${ISBN}`)
  .set({'accept':'application/json'})
  return {
    status: response.status
  }
}

const deleteBook = async ({userId}) => {
  const body = JSON.stringify({userId,isbn})
  const response = await supertest(config.baseURL)
  .delete(`/BookStore/v1/Book`)
  .set({'Content-Type':'application/json'})
  .send(body)
  return {
    status: response.status
  }
}

export default {
  createBooks,
  updateBook,
  getBook,
  deleteBook
}