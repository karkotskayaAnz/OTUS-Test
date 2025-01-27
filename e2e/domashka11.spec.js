import { test, expect } from '@playwright/test';

const selectors = {
  login: 'input[name=username]',
  password: 'input[name=password]',
  loginBtn: 'button[type=submit]',
  //checkbox
  loginSuccess: '.container h1'
};

const credentials = {
  login: 'demo',
  password: 'demo'
};

test.describe('login page', () => {
  test.beforeEach(async ({ page }) => {
     await page.goto('https://try.vikunja.io/login');
  });

  test('page should exist', async ({ page }) => {
     const title = await page.title();
     expect(title).toBe('Login | Vikunja');
  });

  test('Without login and password', async ({ page }) => {
     const usernameMessageP =  page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a username." по локатору
     const passwordMessageP =  page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a password." по локатору
     await expect(usernameMessageP).toBeHidden(); //проверка, что сообщение отсутствует
     await expect(passwordMessageP).toBeEmpty(); //проверка, что сообщение отсутствует
     await page.getByRole('button', { name: 'Login' }).click(); //нажатие кнопки 'Login'
     const usernameMessage = page.getByText('Please provide a username.'); //поиск сообщения "Please provide a username." по тексту на странице
     const passwordMessage = page.getByText('Please provide a password.'); //поиск сообщения "Please provide a password." по тексту на странице
     await expect(usernameMessage).toBeVisible(); //проверка, что данный текст есть на странице и он виден
     await expect(passwordMessage).toBeVisible(); //проверка, что данный текст есть на странице и он виден
     await expect(usernameMessageP).toHaveText('Please provide a username.'); //проверка, что и в поиске по локатору появился текст 
     await expect(passwordMessageP).toHaveText('Please provide a password.'); //проверка, что и в поиске по локатору появился текст
  });
  test('With login and without password', async ({ page }) => {
     const usernameMessageP =  page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a username." по локатору
     const passwordMessageP =  page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a password." по локатору
     await page.locator('#username.input').fill(credentials.login);
     await page.getByRole('button', { name: 'Login' }).click(); //нажатие кнопки 'Login'
     await expect(usernameMessageP).toBeHidden(); //проверка, что сообщение отсутствует
     await expect(passwordMessageP).toHaveText('Please provide a password.'); //проверка, что и в поиске по локатору появился текст
  });

  test('With password and without login', async ({ page }) => {
    const usernameMessageP =  page.locator('#username.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a username." по локатору
    const passwordMessageP =  page.locator('#password.input').locator('..').locator('..').locator('.help.is-danger'); //поиск сообщения "Please provide a password." по локатору
    await page.locator('#password.input').fill(credentials.password);
    await page.getByRole('button', { name: 'Login' }).click(); //нажатие кнопки 'Login'
    await expect(passwordMessageP).toBeEmpty(); //проверка, что сообщение отсутствует
    await expect(usernameMessageP).toHaveText('Please provide a username.'); //проверка, что и в поиске по локатору появился текст
 });
 test('page create account', async ({ page }) => {
   await page.getByRole('link', { name: 'Create account' }).click();
   await page.waitForLoadState('networkidle');
   const titleCreate = await page.locator('.title').textContent();
   expect(titleCreate).toBe('Create account');
});

test('page change password', async ({ page }) => {
   await page.getByRole('link', { name: 'Forgot your password?' }).click();
   await page.waitForLoadState('networkidle');
   const titleChange = await page.locator('.title').textContent();
   expect(titleChange).toBe('Reset your password');
});

  test('success login', async ({ page }) => {
    await page.locator('#username.input').fill(credentials.login);
    await page.locator('#password.input').fill(credentials.password);
    await page.getByRole('button', { name: 'Login' }).click(); 
    await page.waitForLoadState('networkidle');
    const titlelogin = await page.title(); 
    expect(titlelogin).toBe('Current Tasks | Vikunja');
  });
});