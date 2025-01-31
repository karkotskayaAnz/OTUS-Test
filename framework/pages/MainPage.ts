import type { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export function MainPage({ page }: { page: Page }) {
 
    const openList = async (username: string) => {
      await page.getByRole('button', { name: username }).click();
    }

    const addIssue = async (taskName: string) => {
        const textarea = page.getByPlaceholder('Add a task…')
        await textarea.click();
        await textarea.fill(taskName);
        await page.getByLabel('Add', { exact: true }).click();
    }

    return {
      openList,
      addIssue
    }
  }