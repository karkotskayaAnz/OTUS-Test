import type { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export function LoginPage({ page }: { page: Page }) {
 
  const pageExist = async () => {
      await expect(page.title()).toBe('Login | Vikunja');
  }   

  const visit = async () => {
    await page.goto('/login')
  }

  const fillUsername = async (username: string) => {
    await page.locator('#username.input').fill(username)
  }

  const fillPassword = async (password: string) => {
    await page.locator('#password.input').fill(password)
  }

  const submit = async () => {
    await page.getByRole('button', { name: 'Login' }).click()
  }

  const login = async ({ username, password }: { username: string; password: string }) => {
    await visit()
    await fillUsername(username)
    await fillPassword(password)
    await submit()
    await page.waitForLoadState('networkidle')
    const titlelogin = await page.title()
    expect(titlelogin).toBe('Current Tasks | Vikunja')
  }

  return {
    pageExist,
    visit,
    fillUsername,
    fillPassword,
    submit,
    login
  }
}