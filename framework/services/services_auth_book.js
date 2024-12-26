import supertest from 'supertest'
import config from '../config/config'
import TelegramService from './TelegramService'

const createUser = async ({ userName, password }) => {
  const body = JSON.stringify({ userName, password })
  const response = await supertest(config.baseURL)
    .post('/Account/v1/User')
    .set({ 'Content-Type': 'application/json' })
    .send(body)

  // await TelegramService.sendMessage(
  //   `Создан новый пользователь: \r\n` + `username: ${userName} \r\n` + `password: ${password} \r\n` //+
  //   //`userId: ${response.data.userID}`
  // )

  return {
    data: response.body,
    status: response.status
  }
}

const generateToken = async ({ userName, password }) => {
  const body = JSON.stringify({ userName, password })
  const response = await supertest(config.baseURL)
    .post('/Account/v1/GenerateToken')
    .set({ 'Content-Type': 'application/json' })
    .send(body)
  return {
    data: response.body,
    status: response.status
  }
}

const authorized = async ({ userName, password }) => {
  const body = JSON.stringify({ userName, password })
  const response = await supertest(config.baseURL)
    .post('/Account/v1/Authorized')
    .set({ 'Content-Type': 'application/json' })
    .send(body)
  return {
    data: response.body,
    status: response.status
  }
}

const getUser = async ({ userId, token }) => {
  const response = await supertest(config.baseURL)
    .get(`/Account/v1/User/${userId}`)
    .set({ accept: 'application/json' })
    .set({ Authorization: `${token}` })
  return {
    data: response.body,
    status: response.status
  }
}

const deleteUser = async ({ userId, token }) => {
  const response = await supertest(config.baseURL)
    .delete(`/Account/v1/User/${userId}`)
    .set({ 'Content-Type': 'application/json' })
    .set({ Authorization: `${token}` })
  return {
    data: response.body,
    status: response.status
  }
}

export default {
  createUser,
  generateToken,
  authorized,
  getUser,
  deleteUser
}
