import config from '../framework/config/config'
import services_auth_book from '../framework/services/services_auth_book'
import services_books from '../framework/services/services_books'
import books from '../framework/fixtures/books.json'

let userId
let token
const userName = config.username
const password = config.password

describe('Create books', () => {
  it('Success create books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    const response = await services_books.createBooks({ userId, token, books })
    expect(response.status).toEqual(201)
    await deleteUser({ userId, token })
  })
  it('Wrong create books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    const response = await services_books.createBooks({ userId: config.wrongUserId, token, books })
    expect(response.status).toEqual(401)
    await deleteUser({ userId, token })
  })
})

describe('Update books', () => {
  it('Success create books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    await addBooks({ userId, token })
    const response = await services_books.updateBook({ userId, token })
    expect(response.status).toEqual(200)
    await deleteUser({ userId, token })
  })
  it('Wrong create books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    await addBooks({ userId, token })
    const response = await services_books.updateBook({ userId: config.wrongUserId, token })
    expect(response.status).toEqual(401)
    await deleteUser({ userId, token })
  })
})

describe('Get books', () => {
  it('Success get books', async () => {
    const response = await services_books.getBook(config.isbn)
    expect(response.status).toEqual(200)
  })
  it('Wrong get books', async () => {
    const response = await services_books.getBook(config.wrongisbn)
    expect(response.status).toEqual(400)
  })
})

describe('Delete books', () => {
  it('Success delete books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    await addBooks({ userId, token })
    const response = await services_books.deleteBook({ userId })
    expect(response.status).toEqual(204)
    await deleteUser({ userId, token })
  })
  it('Wrong delete books', async () => {
    const responseCreate = await createUser()
    userId = responseCreate.userID
    token = responseCreate.token
    await addBooks({ userId, token })
    const response = await services_books.createBooks({ userId: config.wrongUserId })
    expect(response.status).toEqual(401)
    await deleteUser({ userId, token })
  })
})

async function createUser() {
  const response = await services_auth_book.createUser({ userName, password })
  const responseToken = await services_auth_book.generateToken({ userName, password })
  await services_auth_book.authorized({ userName, password })
  return (userId = response.data.userID), (token = responseToken.data.token)
}

async function deleteUser({ userId, token }) {
  await services_auth_book.deleteUser({ userId, token })
}

async function addBooks({ userId, token }) {
  await services_books.createBooks({ userId, token, books })
}
