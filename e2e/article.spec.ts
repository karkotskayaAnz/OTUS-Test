import { expect, Page, test } from '@playwright/test';
import { configrwa }  from '../framework/config/configrwa';
import { loginUser } from '../framework/actions';
import { RWAEditor} from '../framework/pages';

let page: Page;
const titleArticle = 'anz-article-title';

test.describe('Создание, редактирование и удаление страницы', () => {
    test.use({ baseURL: configrwa.baseURL })
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await loginUser(page)
      })
    // test.afterEach(async () => {
    //     await page.close();
    // });  

test('Создание страницы', async () => {
    const editorPage = new RWAEditor(page);

    const title = titleArticle;
    const about = 'about article';
    const content = 'article content';
    const tags = ['e2e'];

    await editorPage.create({ title, about, content, tags });

    await expect(page.getByRole('heading')).toContainText(title);
    await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible();
});

test('Обновление страницы', async () => {
    const editorPage = new RWAEditor(page);

    const content = 'content edit';
    const newContent = 'content updated';

    await editorPage.edit(titleArticle, content);
    await expect(page.getByText(content)).toBeVisible();

    await editorPage.edit(titleArticle, newContent);
    await page.waitForURL(`/article/${titleArticle}`);
    await page.reload();
    await expect(page.getByText(newContent)).toBeVisible();
});

test('Удаление страницы', async () => {
    await page.goto(`/article/${titleArticle}`);
    await page.waitForLoadState('networkidle');

    const responsePromise = page.waitForResponse(request => {
        return request.url().includes('/api/articles') && request.request().method() === 'DELETE'
    })

    page.once('dialog', dialog => dialog.accept());
    await Promise.all([
      responsePromise,
      await page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
      page.waitForURL('/?feed=feed')
    ]);
});
});
