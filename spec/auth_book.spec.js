import config from '../framework/config/config'
import services from '../framework/services/services_auth_book'

let userId
let token
const userName = config.username
const password = config.password

describe('Create user', () => {
  it('Success user create', async () => {
    const response = await services.createUser({ userName, password })
    expect(response.status).toEqual(201)
    expect(response.data.username).toEqual(userName)
    userId = response.data.userID
    await auth()
    await deleteUser(userId)
  })

  it('Failed user create. User name is in use', async () => {
    userId = await getUserId()
    const response = await services.createUser({ userName, password })
    expect(response.status).toEqual(406)
    expect(response.data.message).toBe('User exists!')
    await auth()
    await deleteUser(userId)
  })

  it('Failed user create. Invalid password', async () => {
    const response = await services.createUser({
      userName: config.username,
      password: config.wrongpassword
    })
    expect(response.status).toEqual(400)
    expect(response.data.message).toBeDefined()
  })
})

describe('Get auth token', () => {
  it('Success token generate', async () => {
    userId = await getUserId()
    const response = await services.generateToken({ userName, password })
    expect(response.status).toEqual(200)
    expect(response.data.token).toBeDefined()
    await auth()
    await deleteUser(userId)
  })

  it('Wrong token', async () => {
    const response = await services.generateToken({
      userName: config.username,
      password: config.wrongpassword
    })
    expect(response.status).toEqual(400)
    expect(response.data.result).toBe('User authorization failed.')
  })
})

describe('Auth', () => {
  it('Success auth', async () => {
    userId = await getUserId()
    await getToken()
    const response = await services.authorization({ userName, password })
    await deleteUser(userId)
  })

  it('Wrong auth', async () => {
    const response = await services.authorization({
      userName: config.username,
      password: config.wrongpassword
    })
    expect(response.status).toEqual(404)
  })
})

describe('Get', () => {
  it('Success Get', async () => {
    userId = await getUserId()
    token = await getToken()
    await auth()
    const response = await services.getUser({ userId, token })
    expect(response.status).toEqual(200)
    await deleteUser(userId)
  })

  it('Wrong Get', async () => {
    userId = await getUserId()
    token = await getToken()
    await auth()
    const response = await services.getUser({ userId: config.wrongUserId, token })
    expect(response.status).toEqual(401)
    await deleteUser(userId)
  })
})

describe('Delete', () => {
  it('Success Delete', async () => {
    userId = await getUserId()
    token = await getToken()
    await auth()
    const responseD = await services.deleteUser({ userId, token })
    expect(responseD.status).toEqual(204)
    await deleteUser(userId)
  })

  it('Wrong Delete', async () => {
    userId = await getUserId()
    token = await getToken()
    await auth()
    const response = await services.deleteUser({ userId: config.wrongUserId, token })
    expect(response.status).toEqual(401)
    await deleteUser(userId)
  })
})

async function getUserId() {
  const response = await services.createUser({ userName, password })
  return response.data.userID
}

async function getToken() {
  const response = await services.generateToken({ userName, password })

  return await response.data.token
}

async function auth() {
  token = await getToken()

  await services.authorized({ userName, password })
}

// async function getUser(userId) {
//   const token = await getToken()

//   return await services.getUser({userId, token})
// }

async function deleteUser(userId) {
  token = await getToken()

  await services.deleteUser({ userId, token })
}
