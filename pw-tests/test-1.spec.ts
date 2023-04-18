import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tctest-lobby.palainteractive.com/');
  expect(page).toHaveTitle('CanPlay Online Casino | Online Casino Games in Ontario')

  await page.getByRole('img', { name: 'home icon' }).click();
  await page.locator('.gallery-block').first().hover();

  expect(page.locator('.gallery-block').first()).toHaveText('Play');

  await page.getByRole('img', { name: 'featured' }).first().click();
  await page.getByRole('img', { name: 'slots' }).click();
  await page.getByRole('img', { name: 'jackpot' }).click();
  await page.getByRole('img', { name: 'blackjack2' }).click();
  await page.getByRole('img', { name: 'tablegames' }).click();
  await page.getByRole('img', { name: 'videopoker' }).click();
  await page.getByRole('img', { name: 'dragonlounge' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('img', { name: 'promos' }).click();
  const page1 = await page1Promise;
  await page.getByRole('img', { name: 'featured' }).nth(1).click();
  await page.getByRole('button', { name: 'search' }).click();
  await page.getByRole('searchbox', { name: 'Search Casino Games' }).fill('slots');
  await page.getByRole('link', { name: '12 Nights of Xmas' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('');
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('zhihong.han@palainteractive.com');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('Qa!123456');
  await page.locator('form').getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('div').filter({ hasText: 'JOIN - STEP 2 of 2' }).nth(2).click();
  await page.getByText('JOIN - STEP 2 of 2').click();
  await page.getByRole('button', { name: 'close' }).click();
  await page.getByText('Session Logout').click();
});