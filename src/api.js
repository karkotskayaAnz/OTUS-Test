const baseUrl = 'https://reqres.in/api'

async function fetchUsers(queryParams = {}) {
  const response = await fetch(`${baseUrl}/users?${new URLSearchParams(queryParams)}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function fetchUser(id) {
  const response = await fetch(`${baseUrl}/users/${id}`)
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function updateUser(id, data) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function putUser(id, data) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

// eslint-disable-next-line no-unused-vars
async function deleteUser(id) {
  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'DELETE'
  })
  return {
    status: response.status,
    headers: response.headers
  }
}

// eslint-disable-next-line no-unused-vars
async function createUser(data) {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return {
    status: response.status,
    headers: response.headers,
    data: await response.json()
  }
}

;(async () => {
  try {
    const response = await fetchUsers({
      page: 100,
      per_page: 1
    })
    console.log('status', response.status)
    console.log('data', response.data)
  } catch (error) {
    console.error('Не получилось выполнить запрос', error)
  }
})()
