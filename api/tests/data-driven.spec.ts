import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';
import testData from '../test-data/cartTestData.json';

test.describe('Fake Store API - Data-Driven Tests', () => {
  let cartHelper: CartApiHelper;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  /**
   * Data-driven test: Add cart with multiple products (one test per product)
   */
  testData.dataDriverProducts.forEach((productId) => {
    test(`POST - Create cart and add product ID ${productId}`, async () => {
      const newCart = {
        userId: 99,
        date: new Date().toISOString().split('T')[0],
        products: [
          {
            productId,
            quantity: Math.floor(Math.random() * 10) + 1,
          },
        ],
      };

      const response = await cartHelper.addCart(newCart);
      expect(response.status()).toBe(200);

      const data = await response.json();
      expect(data.userId).toBe(newCart.userId);
      expect(data.products[0].productId).toBe(productId);
    });
  });

  /**
   * Data-driven test: Get carts for multiple users
   */
  testData.userIds.forEach((userId) => {
    test(`GET - Retrieve all carts for user ID ${userId}`, async () => {
      const response = await cartHelper.getCartsByUserId(userId);
      expect(response.status()).toBe(200);

      const carts = await response.json();
      expect(Array.isArray(carts)).toBeTruthy();

      // If user has carts, verify they all belong to this user
      if (carts.length > 0) {
        carts.forEach((cart: any) => {
          expect(cart.userId).toBe(userId);
        });
      }
    });
  });

  /**
   * Data-driven test: Get product details for multiple products
   */
  testData.dataDriverProducts.forEach((productId) => {
    test(`GET - Retrieve product details for product ID ${productId}`, async () => {
      const response = await cartHelper.getProductById(productId);
      expect(response.status()).toBe(200);

      const product = await response.json();
      expect(product.id).toBe(productId);
      expect(product.title).toBeDefined();
      expect(product.price).toBeGreaterThan(0);
      expect(product.category).toBeDefined();
    });
  });

  /**
   * Data-driven test: Create cart with combinations of products
   */
  test('POST - Create cart with multiple products (data-driven)', async () => {
    const products = testData.dataDriverProducts.slice(0, 3).map((productId) => ({
      productId,
      quantity: Math.floor(Math.random() * 5) + 1,
    }));

    const newCart = {
      userId: 88,
      date: new Date().toISOString().split('T')[0],
      products,
    };

    const response = await cartHelper.addCart(newCart);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.products.length).toBe(products.length);
    expect(data.userId).toBe(newCart.userId);
  });

  /**
   * Data-driven test: Verify product price consistency
   */
  test('GET - Verify product prices across multiple products', async () => {
    const productPrices: Record<number, number> = {};

    for (const productId of testData.dataDriverProducts) {
      const response = await cartHelper.getProductById(productId);
      const product = await response.json();
      productPrices[productId] = product.price;

      // Verify price is reasonable (positive number)
      expect(product.price).toBeGreaterThan(0);
      expect(product.price).toBeLessThan(1000);
    }

    // All prices should be populated
    expect(Object.keys(productPrices).length).toBe(testData.dataDriverProducts.length);
  });

  /**
   * Data-driven test: Update carts with different product combinations
   */
  test('PUT - Update cart with data-driven product combinations', async () => {
    for (let i = 0; i < 3; i++) {
      const products = [testData.dataDriverProducts[i]].map((productId) => ({
        productId,
        quantity: i + 1,
      }));

      const updateData = {
        userId: 77,
        date: new Date().toISOString().split('T')[0],
        products,
      };

      const response = await cartHelper.updateCart(i + 1, updateData);
      expect(response.status()).toBe(200);

      const cart = await response.json();
      expect(cart.userId).toBe(updateData.userId);
    }
  });

  /**
   * Data-driven test: Create and delete carts for multiple users
   */
  test('CRUD - Create and delete carts for multiple users (data-driven)', async () => {
    for (const userId of testData.userIds.slice(0, 3)) {
      // Create
      const newCart = {
        userId,
        date: new Date().toISOString().split('T')[0],
        products: [
          {
            productId: testData.dataDriverProducts[0],
            quantity: 1,
          },
        ],
      };

      const createResponse = await cartHelper.addCart(newCart);
      expect(createResponse.status()).toBe(200);
      const createdCart = await createResponse.json();

      // Get
      const getResponse = await cartHelper.getCartById(createdCart.id);
      expect(getResponse.status()).toBe(200);

      // Delete
      const deleteResponse = await cartHelper.deleteCart(createdCart.id);
      expect(deleteResponse.status()).toBe(200);
    }
  });

  /**
   * Data-driven test: Verify cart structure for multiple cart IDs
   */
  test('GET - Verify cart structure for multiple cart IDs', async () => {
    const cartIds = [1, 2, 3, 4, 5];

    for (const cartId of cartIds) {
      const response = await cartHelper.getCartById(cartId);
      expect(response.status()).toBe(200);

      const cart = await response.json();

      // Validate required properties
      if (Object.keys(cart).length > 0) {
        expect(cart).toHaveProperty('id');
        expect(cart).toHaveProperty('userId');
        expect(cart).toHaveProperty('date');
        expect(cart).toHaveProperty('products');
      }
    }
  });

  /**
   * Data-driven test: Performance test - add carts with all products
   */
  test('Performance - Create carts with all products (data-driven)', async () => {
    const startTime = Date.now();

    for (const productId of testData.dataDriverProducts) {
      const newCart = {
        userId: 66,
        date: new Date().toISOString().split('T')[0],
        products: [
          {
            productId,
            quantity: 1,
          },
        ],
      };

      const response = await cartHelper.addCart(newCart);
      expect(response.status()).toBe(200);
    }

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    // Total time should be reasonable (< 10 seconds for 5 requests)
    expect(totalTime).toBeLessThan(10000);
    console.log(`Created ${testData.dataDriverProducts.length} carts in ${totalTime}ms`);
  });
});
