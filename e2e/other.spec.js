import { test, expect } from '@playwright/test'
import { LoginPage, MainPage } from '../framework'
import configV from '../framework/config/configV'

const username = configV.username
const password = configV.password
const nameTask = 'first task'

test.describe('Главная страница', () => {
    test('Открытие выпадающего списка. Настройки', async ({ page }) => {
       const loginPage = LoginPage({ page });
       const mainPage = MainPage({ page });
       await loginPage.login({username,password});
       await mainPage.openList(username);
       await page.getByRole('link', { name: 'Settings' }).click();
       await page.waitForLoadState('networkidle');
       await expect(page).toHaveURL('user/settings/general');
    });
    test('Открытие выпадающего списка. Выход', async ({ page }) => {
        const loginPage = LoginPage({ page });
        const mainPage = MainPage({ page });
        await loginPage.login({username,password});
        await mainPage.openList(username);
        await page.getByRole('button', { name: 'Logout' }).click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL('/login');
     });
     test('Кнопка уведомлений', async ({ page }) => {
        const loginPage = LoginPage({ page });
        await loginPage.login({username,password});
        await page.getByRole('button', { name: `Notifications` }).click();
        await page.waitForLoadState('networkidle');
        const notificationList = page.locator('.notifications-list');
        await expect(notificationList).toContainText(`You don't have any notifications. Have a nice day!`);
     });
     test('Добавление задачи', async ({ page }) => {
        const loginPage = LoginPage({ page });
        const mainPage = MainPage({ page });
        await loginPage.login({username,password});
        await mainPage.addIssue(nameTask);
        const checkboxTask = page.locator('div.p-2');
        await expect(checkboxTask).toContainText(nameTask);
     });

     test('Удаление задачи', async ({ page }) => {
        const loginPage = LoginPage({ page });
        await loginPage.login({username,password});
        const checkboxTask = page.locator('div.p-2');
        await expect(checkboxTask).toContainText(nameTask);

        await page.getByRole('img', { name: 'Checkbox' }).first().click();
        await page.waitForTimeout(6000);
        await page.goto('https://try.vikunja.io');
        await page.waitForLoadState('networkidle');
        await expect(checkboxTask).not.toContainText(nameTask);
     });
});
