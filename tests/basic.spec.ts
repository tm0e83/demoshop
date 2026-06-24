import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring
  await expect(page).toHaveTitle(/DemoShop/);
});

test('login', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Firebase Auth iframe not working correctly in WebKit – therefore skip test');

  await page.goto('/');

  // Click the get started link
  await page.getByTitle('Login').click();

  // Expects the URL to contain login
  await expect(page).toHaveURL('/login');

  // Fill in the login form
  await page.getByLabel('Email').fill('test@demoshop.com');
  await page.getByLabel('Password').fill('demo2026');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Expects page to have a heading with the name of Profile Overview
  await expect(page.getByRole('heading', { name: /profile overview/i })).toBeVisible();
});
