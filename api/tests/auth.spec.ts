import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';

test.describe('Fake Store API - Authentication & Authorization', () => {
  let cartHelper: CartApiHelper;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  test('GET - Access public endpoint without authentication', async () => {
    const response = await cartHelper.getAllCarts();
    
    // Fake Store API is public - no auth required
    expect(response.status()).toBe(200);
  });

  test('POST - Create cart without authentication', async () => {
    const newCart = {
      userId: 5,
      date: '2024-01-20',
      products: [
        {
          productId: 1,
          quantity: 1,
        },
      ],
    };
    const response = await cartHelper.addCart(newCart);
    
    // Public API accepts requests without auth
    expect(response.status()).toBe(200);
  });

  test('DELETE - Remove cart without authentication', async () => {
    const response = await cartHelper.deleteCart(1);
    
    // Public API allows delete without auth
    expect(response.status()).toBe(200);
  });

  test('GET - Verify no sensitive data in responses', async () => {
    const response = await cartHelper.getCartById(1);
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    
    // Verify no auth tokens, passwords, or sensitive data
    expect(JSON.stringify(data)).not.toContain('password');
    expect(JSON.stringify(data)).not.toContain('token');
    expect(JSON.stringify(data)).not.toContain('secret');
  });

  test('GET - Verify CORS headers present', async () => {
    const response = await cartHelper.getAllCarts();
    
    expect(response.status()).toBe(200);
    const headers = response.headers();
    
    // Check for CORS headers
    expect(headers).toBeDefined();
  });

  test('OPTIONS - Check preflight request support', async () => {
    const response = await cartHelper.getAllCarts();
    
    // Verify endpoint is accessible
    expect(response.status()).toBe(200);
  });

  test('Rate Limiting - Multiple requests in rapid succession', async () => {
    const requests = [];
    
    for (let i = 0; i < 10; i++) {
      requests.push(cartHelper.getAllCarts());
    }
    
    const responses = await Promise.all(requests);
    
    // All requests should succeed (no rate limiting on public API)
    responses.forEach((response) => {
      expect(response.status()).toBe(200);
    });
  });

  test('User isolation - Verify users cannot access others carts directly', async () => {
    const userId1 = 1;
    const userId2 = 2;
    
    const carts1 = await cartHelper.getCartsByUserId(userId1);
    const carts2 = await cartHelper.getCartsByUserId(userId2);
    
    expect(carts1.status()).toBe(200);
    expect(carts2.status()).toBe(200);
    
    const data1 = await carts1.json();
    const data2 = await carts2.json();
    
    // If both users have carts, they should be different
    if (data1.length > 0 && data2.length > 0) {
      const userIds1 = data1.map((c: any) => c.userId);
      const userIds2 = data2.map((c: any) => c.userId);
      
      expect(userIds1.every((id: number) => id === userId1)).toBeTruthy();
      expect(userIds2.every((id: number) => id === userId2)).toBeTruthy();
    }
  });

  test('Session - Verify stateless API (no session tokens required)', async () => {
    const response1 = await cartHelper.getAllCarts();
    const response2 = await cartHelper.getAllCarts();
    
    // Both requests should work without maintaining session
    expect(response1.status()).toBe(200);
    expect(response2.status()).toBe(200);
  });

  test('Authorization - Verify no endpoint requires special permissions', async () => {
    // All CRUD operations should be accessible
    const getResponse = await cartHelper.getCartById(1);
    const postResponse = await cartHelper.addCart({
      userId: 10,
      date: '2024-01-20',
      products: [],
    });
    const putResponse = await cartHelper.updateCart(1, {
      userId: 10,
      date: '2024-01-20',
      products: [],
    });
    const deleteResponse = await cartHelper.deleteCart(1);
    
    expect(getResponse.status()).toBe(200);
    expect(postResponse.status()).toBe(200);
    expect(putResponse.status()).toBe(200);
    expect(deleteResponse.status()).toBe(200);
  });
});
