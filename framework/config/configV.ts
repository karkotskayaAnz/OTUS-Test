import 'dotenv/config'

export default Object.freeze({
  baseURL: process.env.TEST_V_BASE_URL ?? 'https://try.vikunja.io',
  username: process.env.TEST_V_USERNAME ?? 'demo',
  password: process.env.TEST_V_PASSWORD ?? 'demo'
})