import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';
import testData from '../test-data/cartTestData.json';

test.describe('Fake Store API - Cart CRUD Positive Cases', () => {
  let cartHelper: CartApiHelper;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  test('GET - Retrieve all carts successfully', async () => {
    const response = await cartHelper.getAllCarts();

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET - Retrieve a specific cart by ID', async () => {
    const cartId = 1;
    const response = await cartHelper.getCartById(cartId);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(cartId);
    expect(data.userId).toBeDefined();
    expect(data.date).toBeDefined();
    expect(Array.isArray(data.products)).toBeTruthy();
  });

  test('GET - Retrieve carts for a specific user', async () => {
    const userId = 1;
    const response = await cartHelper.getCartsByUserId(userId);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    if (data.length > 0) {
      expect(data[0].userId).toBe(userId);
    }
  });

  test('POST - Create a new cart successfully', async () => {
    const newCart = testData.validCarts[0];
    const response = await cartHelper.addCart(newCart);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBeDefined();
    expect(data.userId).toBe(newCart.userId);
    expect(data.products).toEqual(newCart.products);
  });

  test('POST - Create multiple carts with different products', async () => {
    for (const cart of testData.validCarts) {
      const response = await cartHelper.addCart(cart);
      expect(response.status()).toBe(200);
      const data = await response.json();
      expect(data.userId).toBe(cart.userId);
      expect(data.products.length).toBeGreaterThan(0);
    }
  });

  test('PUT - Update an existing cart completely', async () => {
    const cartId = 1;
    const updateData = testData.updateCartData;
    const response = await cartHelper.updateCart(cartId, updateData);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(cartId);
    expect(data.userId).toBe(updateData.userId);
  });

  test('PATCH - Partially update a cart', async () => {
    const cartId = 1;
    const patchData = testData.patchCartData;
    const response = await cartHelper.patchCart(cartId, patchData);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(cartId);
  });

  test('DELETE - Remove a cart successfully', async () => {
    // First create a cart to delete
    const newCart = testData.validCarts[0];
    const createResponse = await cartHelper.addCart(newCart);
    const createdCart = await createResponse.json();

    // Then delete it
    const deleteResponse = await cartHelper.deleteCart(createdCart.id);
    expect(deleteResponse.status()).toBe(200);
  });

  test('GET - Verify product details for items in cart', async () => {
    const productId = 1;
    const response = await cartHelper.getProductById(productId);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.id).toBe(productId);
    expect(data.title).toBeDefined();
    expect(data.price).toBeDefined();
    expect(data.description).toBeDefined();
    expect(data.category).toBeDefined();
  });

  test('Response headers validation', async () => {
    const response = await cartHelper.getAllCarts();

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('Response time is acceptable (< 2 seconds)', async () => {
    const startTime = Date.now();
    await cartHelper.getAllCarts();
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(responseTime).toBeLessThan(2000);
  });
});
