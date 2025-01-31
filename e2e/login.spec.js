import { test, expect } from '@playwright/test'
import { LoginPage } from '../framework'
import configV from '../framework/config/configV'

test.describe('Авторизация', () => {
  test('Неуспешная авторизация. Без логина и пароля', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    const usernameMessageP = page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger')
    const passwordMessageP = page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger')
    await loginPage.submit()
    await expect(usernameMessageP).toHaveText('Please provide a username.')
    await expect(passwordMessageP).toHaveText('Please provide a password.')
  })
  test('Неуспешная авторизация. Без пароля', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    const usernameMessageP = page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger')
    const passwordMessageP = page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger')
    await loginPage.fillUsername(configV.username)
    await loginPage.submit()
    await expect(usernameMessageP).toBeHidden()
    await expect(passwordMessageP).toHaveText('Please provide a password.')
  })

  test('Неуспешная авторизация. Без логина', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    const usernameMessageP = page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger')
    const passwordMessageP = page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger')
    await loginPage.fillPassword(configV.password)
    await loginPage.submit()
    await expect(passwordMessageP).toBeEmpty()
    await expect(usernameMessageP).toHaveText('Please provide a username.')
  })
  test('Успешная авторизация', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    await loginPage.fillUsername(configV.username)
    await loginPage.fillPassword(configV.password)
    await loginPage.submit()
    await page.waitForLoadState('networkidle')
    const titlelogin = await page.title()
    expect(titlelogin).toBe('Current Tasks | Vikunja')
  })
  test('Неуспешная авторизация', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    await loginPage.fillUsername('user')
    await loginPage.fillPassword('user')
    await loginPage.submit()
    await page.waitForLoadState('networkidle')
    const errorMessage = await page.getByText('Wrong username or password.')
    expect(errorMessage).toBeVisible
  })
})

test.describe('Проверка ссылок', () => {
  test('Страница создать аккаунт', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    await page.getByRole('link', { name: 'Create account' }).click()
    await page.waitForLoadState('networkidle')
    const titleCreate = await page.locator('.title').textContent()
    expect(titleCreate).toBe('Create account')
  })

  test('Страница изменить пароль', async ({ page }) => {
    const loginPage = LoginPage({ page })
    await loginPage.visit()
    await page.getByRole('link', { name: 'Forgot your password?' }).click()
    await page.waitForLoadState('networkidle')
    const titleChange = await page.locator('.title').textContent()
    expect(titleChange).toBe('Reset your password')
  })
})
