 describe('Auth', () => {
   it('Success login', async () => {
     const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         userName: 'user5',
         password: '@User_user-9'
       })
     })
     const data = await response.json()
     expect(response.status).toEqual(201)
     expect(data.username).toBe('user5')
   })
 })

describe('Auth', () => {
    it('Failed login. login in use' , async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User' , {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({
    userName: 'user5',
    password: '@User_user-9',
    expiresInMins: 30,
    }),
    })
    const data = await response.json()
    expect(response.status).toEqual(406)
    expect(data.message).toBe('User exists!')
    })
   })

describe('Auth', () => {
     it('Failed login. Wrong password' , async () => {
     const response = await fetch('https://bookstore.demoqa.com/Account/v1/User' , {
     method: 'POST',
     headers: { 'Content-Type' : 'application/json' },
     body: JSON.stringify({
     userName: 'user1',
     password: 'useruser',
     expiresInMins: 30,
     }),
     })
     const data = await response.json()
     expect(response.status).toEqual(400)
     expect(data.message).toBeDefined()
     })
    })

describe('Auth', () => {
  it('Success token', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'user',
        password: '@User_user-9'
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.token).toBeDefined()
  })
})

describe('Auth', () => {
     it('Wrong token', async () => {
       const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           userName: 'user',
           password: 'User'
         })
       })
       const data = await response.json()
       expect(response.status).toEqual(200)
       expect(data.result).toBe("User authorization failed.")
     })
   })
