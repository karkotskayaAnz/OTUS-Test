import { Page } from '@playwright/test';
import { configrwa }  from '../config/configrwa';
import { LoginPage } from '../pages';

export function login(page: Page) {
  const loginPage = new LoginPage(page);
  return ({ email, password }: { email: string; password: string }) => {
    return loginPage.login(email, password);
  };
}

export function loginUser(page: Page) {
  return login(page)({ email: configrwa.email, password: configrwa.password });
}