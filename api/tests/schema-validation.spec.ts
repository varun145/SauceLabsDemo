import { test, expect } from '@playwright/test';
import { CartApiHelper } from '../helpers/cartApiHelper';

test.describe('Fake Store API - Response Schema Validation', () => {
  let cartHelper: CartApiHelper;

  test.beforeEach(async ({ request }) => {
    cartHelper = new CartApiHelper(request);
  });

  test('GET /carts - Validate response structure', async () => {
    const response = await cartHelper.getAllCarts();
    const data = await response.json();

    expect(Array.isArray(data)).toBeTruthy();
    
    if (data.length > 0) {
      const cart = data[0];
      
      // Validate required fields
      expect(cart).toHaveProperty('id');
      expect(cart).toHaveProperty('userId');
      expect(cart).toHaveProperty('date');
      expect(cart).toHaveProperty('products');
      
      // Validate field types
      expect(typeof cart.id).toBe('number');
      expect(typeof cart.userId).toBe('number');
      expect(typeof cart.date).toBe('string');
      expect(Array.isArray(cart.products)).toBeTruthy();
    }
  });

  test('GET /carts/:id - Validate single cart schema', async () => {
    const response = await cartHelper.getCartById(1);
    const cart = await response.json();

    // Validate required fields
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('userId');
    expect(cart).toHaveProperty('date');
    expect(cart).toHaveProperty('products');
    
    // Validate types
    expect(typeof cart.id).toBe('number');
    expect(typeof cart.userId).toBe('number');
    expect(typeof cart.date).toBe('string');
    expect(Array.isArray(cart.products)).toBeTruthy();

    // Validate products structure
    if (cart.products.length > 0) {
      const product = cart.products[0];
      expect(product).toHaveProperty('productId');
      expect(product).toHaveProperty('quantity');
      expect(typeof product.productId).toBe('number');
      expect(typeof product.quantity).toBe('number');
    }
  });

  test('GET /carts/user/:userId - Validate user carts array schema', async () => {
    const response = await cartHelper.getCartsByUserId(1);
    const carts = await response.json();

    expect(Array.isArray(carts)).toBeTruthy();
    
    carts.forEach((cart: any) => {
      expect(cart).toHaveProperty('id');
      expect(cart).toHaveProperty('userId');
      expect(cart).toHaveProperty('date');
      expect(cart).toHaveProperty('products');
      expect(typeof cart.id).toBe('number');
      expect(typeof cart.userId).toBe('number');
      expect(cart.userId).toBe(1);
    });
  });

  test('POST /carts - Validate created cart response', async () => {
    const newCart = {
      userId: 100,
      date: '2024-02-20',
      products: [
        {
          productId: 5,
          quantity: 2,
        },
      ],
    };

    const response = await cartHelper.addCart(newCart);
    const data = await response.json();

    // Validate response structure
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('userId');
    expect(data.userId).toBe(newCart.userId);
    expect(data).toHaveProperty('date');
    expect(data).toHaveProperty('products');
    expect(data.products).toEqual(newCart.products);
  });

  test('PUT /carts/:id - Validate updated cart response', async () => {
    const updateData = {
      userId: 50,
      date: '2024-02-25',
      products: [
        {
          productId: 10,
          quantity: 3,
        },
      ],
    };

    const response = await cartHelper.updateCart(1, updateData);
    const data = await response.json();

    expect(data).toHaveProperty('id');
    expect(data.id).toBe(1);
    expect(data.userId).toBe(updateData.userId);
    expect(data.date).toBe(updateData.date);
  });

  test('PATCH /carts/:id - Validate partially updated cart', async () => {
    const patchData = {
      products: [
        {
          productId: 8,
          quantity: 5,
        },
      ],
    };

    const response = await cartHelper.patchCart(1, patchData);
    const data = await response.json();

    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('userId');
  });

  test('GET /products/:id - Validate product schema', async () => {
    const response = await cartHelper.getProductById(1);
    const product = await response.json();

    // Validate required fields
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('image');
    expect(product).toHaveProperty('rating');

    // Validate types
    expect(typeof product.id).toBe('number');
    expect(typeof product.title).toBe('string');
    expect(typeof product.price).toBe('number');
    expect(typeof product.description).toBe('string');
    expect(typeof product.category).toBe('string');
    expect(typeof product.image).toBe('string');

    // Validate rating structure
    expect(product.rating).toHaveProperty('rate');
    expect(product.rating).toHaveProperty('count');
    expect(typeof product.rating.rate).toBe('number');
    expect(typeof product.rating.count).toBe('number');
  });

  test('Validate no extra/unknown fields in response', async () => {
    const response = await cartHelper.getCartById(1);
    const cart = await response.json();

    const allowedFields = ['id', 'userId', 'date', 'products', '__v'];
    const cartKeys = Object.keys(cart);
    
    cartKeys.forEach((key) => {
      expect(allowedFields).toContain(key);
    });
  });

  test('Validate response HTTP headers', async () => {
    const response = await cartHelper.getAllCarts();
    const headers = response.headers();

    expect(headers['content-type']).toContain('application/json');
  });

  test('Validate response body is valid JSON', async () => {
    const response = await cartHelper.getAllCarts();
    
    expect(() => {
      response.json();
    }).not.toThrow();
  });

  test('Validate null values are handled correctly', async () => {
    const response = await cartHelper.getAllCarts();
    const data = await response.json();

    if (data.length > 0) {
      const cart = data[0];
      
      // Fields should not be null (except optional __v)
      expect(cart.id).not.toBeNull();
      expect(cart.userId).not.toBeNull();
      expect(cart.date).not.toBeNull();
      expect(cart.products).not.toBeNull();
    }
  });

  test('Validate numeric value ranges', async () => {
    const response = await cartHelper.getCartById(1);
    const cart = await response.json();

    if (cart.products && cart.products.length > 0) {
      cart.products.forEach((product: any) => {
        expect(product.productId).toBeGreaterThan(0);
        expect(product.quantity).toBeGreaterThan(0);
      });
    }
  });
});
