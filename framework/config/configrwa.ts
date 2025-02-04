require('dotenv').config()

export const configrwa = Object.freeze({
    baseURL: process.env.TEST_RWA_BASE_URL ?? 'https://rwa-194.87.102.103.sslip.io',
    username: process.env.TEST_RWA_USERNAME,
    email: process.env.TEST_RWA_EMAIL ?? 'testuser@mail.ru',
    password: process.env.TEST_RWA_PASSWORD ?? '@User_user-9'
  });