import { test, expect } from '@playwright/test';

test('API health check', async ({ request }) => {
  const response = await request.get('https://api.ninox.com/health');
  expect(response.status()).toBe(200);
});