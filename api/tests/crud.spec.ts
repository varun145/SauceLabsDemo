import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';

test.describe('Fake Store API - Comprehensive CRUD Test Suite', () => {
  let cartHelper: CartApiHelper;
  let createdCartId: number;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  test('CRUD - Complete Create Read Update Delete workflow', async () => {
    // CREATE: Add a new cart
    const newCart = {
      userId: 123,
      date: '2024-02-28',
      products: [
        {
          productId: 7,
          quantity: 2,
        },
        {
          productId: 8,
          quantity: 1,
        },
      ],
    };

    const createResponse = await cartHelper.addCart(newCart);
    expect(createResponse.status()).toBe(200);
    const createdCart = await createResponse.json();
    createdCartId = createdCart.id;

    expect(createdCart.userId).toBe(newCart.userId);
    expect(createdCart.products).toEqual(newCart.products);
    console.log(`Created cart with ID: ${createdCartId}`);

    // READ: Get the created cart
    const readResponse = await cartHelper.getCartById(createdCartId);
    expect(readResponse.status()).toBe(200);
    const readCart = await readResponse.json();

    expect(readCart.id).toBe(createdCartId);
    expect(readCart.userId).toBe(newCart.userId);
    console.log(`Retrieved cart: ${JSON.stringify(readCart)}`);

    // UPDATE: Modify the cart
    const updateData = {
      userId: 124,
      date: '2024-03-01',
      products: [
        {
          productId: 9,
          quantity: 5,
        },
      ],
    };

    const updateResponse = await cartHelper.updateCart(createdCartId, updateData);
    expect(updateResponse.status()).toBe(200);
    const updatedCart = await updateResponse.json();

    expect(updatedCart.id).toBe(createdCartId);
    expect(updatedCart.userId).toBe(updateData.userId);
    console.log(`Updated cart: ${JSON.stringify(updatedCart)}`);

    // READ: Verify update was applied
    const verifyResponse = await cartHelper.getCartById(createdCartId);
    expect(verifyResponse.status()).toBe(200);
    const verifiedCart = await verifyResponse.json();

    expect(verifiedCart.userId).toBe(updateData.userId);
    console.log(`Verified updated cart: ${JSON.stringify(verifiedCart)}`);

    // PATCH: Partially update the cart
    const patchData = {
      date: '2024-03-05',
    };

    const patchResponse = await cartHelper.patchCart(createdCartId, patchData);
    expect(patchResponse.status()).toBe(200);
    console.log(`Patched cart successfully`);

    // DELETE: Remove the cart
    const deleteResponse = await cartHelper.deleteCart(createdCartId);
    expect(deleteResponse.status()).toBe(200);
    console.log(`Deleted cart with ID: ${createdCartId}`);
  });

  test('CRUD - Batch operations', async () => {
    const cartIds: number[] = [];

    // CREATE: Batch create 5 carts
    for (let i = 1; i <= 5; i++) {
      const cart = {
        userId: 200 + i,
        date: `2024-03-${String(i).padStart(2, '0')}`,
        products: [
          {
            productId: i,
            quantity: i,
          },
        ],
      };

      const response = await cartHelper.addCart(cart);
      expect(response.status()).toBe(200);
      const created = await response.json();
      cartIds.push(created.id);
    }

    console.log(`Created ${cartIds.length} carts`);

    // READ: Get all created carts
    for (const cartId of cartIds) {
      const response = await cartHelper.getCartById(cartId);
      expect(response.status()).toBe(200);
      const cart = await response.json();
      expect(cart.id).toBe(cartId);
    }

    // UPDATE: Update all carts
    for (const cartId of cartIds) {
      const updateData = {
        userId: 300,
        date: '2024-03-15',
        products: [
          {
            productId: 10,
            quantity: 10,
          },
        ],
      };

      const response = await cartHelper.updateCart(cartId, updateData);
      expect(response.status()).toBe(200);
    }

    console.log(`Updated ${cartIds.length} carts`);

    // DELETE: Remove all carts
    for (const cartId of cartIds) {
      const response = await cartHelper.deleteCart(cartId);
      expect(response.status()).toBe(200);
    }

    console.log(`Deleted ${cartIds.length} carts`);
  });

  test('CRUD - Error handling and recovery', async () => {
    // Try to get non-existent cart
    const getResponse = await cartHelper.getCartById(99999);
    expect([200, 404]).toContain(getResponse.status());

    // Try to delete non-existent cart
    const deleteResponse = await cartHelper.deleteCart(99999);
    expect([200, 404]).toContain(deleteResponse.status());

    // Create a valid cart and verify operations
    const newCart = {
      userId: 400,
      date: '2024-03-20',
      products: [
        {
          productId: 5,
          quantity: 3,
        },
      ],
    };

    const createResponse = await cartHelper.addCart(newCart);
    expect(createResponse.status()).toBe(200);
    const createdCart = await createResponse.json();

    // Verify it exists
    const verifyResponse = await cartHelper.getCartById(createdCart.id);
    expect(verifyResponse.status()).toBe(200);

    // Clean up
    await cartHelper.deleteCart(createdCart.id);
  });

  test('CRUD - Concurrent operations', async () => {
    const cartOperations = [];

    // Create 5 carts concurrently
    for (let i = 1; i <= 5; i++) {
      const cart = {
        userId: 500 + i,
        date: `2024-03-${String(i).padStart(2, '0')}`,
        products: [
          {
            productId: i,
            quantity: 1,
          },
        ],
      };

      cartOperations.push(cartHelper.addCart(cart));
    }

    const createResponses = await Promise.all(cartOperations);
    const createdCarts = [];

    for (const response of createResponses) {
      expect(response.status()).toBe(200);
      const cart = await response.json();
      createdCarts.push(cart);
    }

    expect(createdCarts.length).toBe(5);
    console.log(`Concurrently created ${createdCarts.length} carts`);

    // Read all created carts concurrently
    const readOperations = createdCarts.map((cart) => cartHelper.getCartById(cart.id));
    const readResponses = await Promise.all(readOperations);

    for (const response of readResponses) {
      expect(response.status()).toBe(200);
    }

    console.log(`Concurrently read ${createdCarts.length} carts`);

    // Clean up: Delete all concurrently
    const deleteOperations = createdCarts.map((cart) => cartHelper.deleteCart(cart.id));
    const deleteResponses = await Promise.all(deleteOperations);

    for (const response of deleteResponses) {
      expect(response.status()).toBe(200);
    }

    console.log(`Concurrently deleted ${createdCarts.length} carts`);
  });

  test('CRUD - Transaction-like behavior', async () => {
    // Create a cart
    const cart1 = {
      userId: 600,
      date: '2024-04-01',
      products: [{ productId: 1, quantity: 1 }],
    };

    const createRes1 = await cartHelper.addCart(cart1);
    const created1 = await createRes1.json();

    // Create second cart
    const cart2 = {
      userId: 601,
      date: '2024-04-02',
      products: [{ productId: 2, quantity: 2 }],
    };

    const createRes2 = await cartHelper.addCart(cart2);
    const created2 = await createRes2.json();

    // Update first cart
    const updateRes1 = await cartHelper.updateCart(created1.id, {
      userId: 600,
      date: '2024-04-05',
      products: [{ productId: 3, quantity: 3 }],
    });

    expect(updateRes1.status()).toBe(200);

    // Update second cart
    const updateRes2 = await cartHelper.updateCart(created2.id, {
      userId: 601,
      date: '2024-04-05',
      products: [{ productId: 4, quantity: 4 }],
    });

    expect(updateRes2.status()).toBe(200);

    // Delete first cart
    await cartHelper.deleteCart(created1.id);

    // Verify second cart still exists
    const verifyRes = await cartHelper.getCartById(created2.id);
    expect(verifyRes.status()).toBe(200);

    // Clean up
    await cartHelper.deleteCart(created2.id);
  });
});
