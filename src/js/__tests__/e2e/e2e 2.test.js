import puppetteer from 'puppeteer';

jest.setTimeout(90000); // default puppeteer timeout

describe('validator form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'https://xenianick.github.io/ahj-homework_5.2/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test('should add new good into page, then change name and price', async () => {
    await page.goto(baseUrl);
    const btn = await page.waitForSelector('.add-good-btn');
    btn.click();
    const inputName = await page.waitForSelector('.good-name-field');
    await inputName.type('iPhone XR');
    const inputPrice = await page.waitForSelector('.good-price-field');
    await inputPrice.type('50000');
    const submit = await page.waitForSelector('.good-save-btn');
    submit.click();
    await page.waitForSelector('.good-card');
    const edit = await page.waitForSelector('.good-edit-btn');
    edit.click();
    const inputEditName = await page.waitForSelector('.good-name-field');
    const inputEditPrice = await page.waitForSelector('.good-price-field');
    await inputEditName.type(' 128 Gb');
    await inputEditPrice.type('0');
    const save = await page.waitForSelector('.good-save-btn');
    save.click();
  });
});
