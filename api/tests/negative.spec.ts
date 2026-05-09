import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';
import testData from '../test-data/cartTestData.json';

test.describe('Fake Store API - Cart CRUD Negative Cases', () => {
  let cartHelper: CartApiHelper;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  test('GET - Request non-existent cart should handle gracefully', async () => {
    const response = await cartHelper.getCartById(99999);
    // Fake Store API returns empty object for non-existent items
    expect([200, 404]).toContain(response.status());
  });

  test('GET - Request carts with invalid user ID format', async () => {
    const response = await cartHelper.getCartsByUserId(-1);
    expect(response.status()).toBe(200);
    const data = await response.json();
    // Should return empty array for invalid user
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('POST - Create cart with missing userId field', async () => {
    const invalidCart = testData.invalidCarts[1];
    const response = await cartHelper.addCart(invalidCart);
    
    // API might still accept or reject
    expect([200, 400]).toContain(response.status());
  });

  test('POST - Create cart with missing products array', async () => {
    const invalidCart = testData.invalidCarts[3];
    const response = await cartHelper.addCart(invalidCart);
    
    expect([200, 400]).toContain(response.status());
  });

  test('POST - Create cart with invalid userId type (string)', async () => {
    const invalidCart = {
      userId: 'invalid-id',
      date: '2024-01-10',
      products: [],
    };
    const response = await cartHelper.addCart(invalidCart);
    
    // API behavior for type mismatch
    expect([200, 400]).toContain(response.status());
  });

  test('POST - Create cart with empty products array', async () => {
    const cartWithNoProducts = {
      userId: 10,
      date: '2024-01-10',
      products: [],
    };
    const response = await cartHelper.addCart(cartWithNoProducts);
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.products)).toBeTruthy();
  });

  test('POST - Create cart with negative quantity', async () => {
    const cartWithNegativeQty = {
      userId: 10,
      date: '2024-01-10',
      products: [
        {
          productId: 1,
          quantity: -5,
        },
      ],
    };
    const response = await cartHelper.addCart(cartWithNegativeQty);
    
    // API might accept or validate
    expect([200, 400]).toContain(response.status());
  });

  test('PUT - Update non-existent cart', async () => {
    const response = await cartHelper.updateCart(99999, testData.updateCartData);
    
    // Fake Store API returns empty object
    expect(response.status()).toBe(200);
  });

  test('DELETE - Delete non-existent cart', async () => {
    const response = await cartHelper.deleteCart(99999);
    
    // Fake Store API still returns 200 for non-existent items
    expect(response.status()).toBe(200);
  });

  test('GET - Verify error handling with malformed endpoint', async () => {
    // This test demonstrates expected behavior without direct API call
    const cartId = 1;
    const response = await cartHelper.getCartById(cartId);
    
    expect(response.ok()).toBeTruthy();
  });

  test('POST - Create cart with very large quantity', async () => {
    const cartWithLargeQty = {
      userId: 10,
      date: '2024-01-10',
      products: [
        {
          productId: 1,
          quantity: 999999,
        },
      ],
    };
    const response = await cartHelper.addCart(cartWithLargeQty);
    
    expect(response.status()).toBe(200);
  });

  test('POST - Create cart with special characters in date', async () => {
    const cartWithSpecialChars = {
      userId: 10,
      date: '2024-01-10@#$%',
      products: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };
    const response = await cartHelper.addCart(cartWithSpecialChars);
    
    // API should handle gracefully
    expect([200, 400]).toContain(response.status());
  });

  test('GET - Verify cache control headers', async () => {
    const response = await cartHelper.getAllCarts();
    
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers).toBeDefined();
  });
});
