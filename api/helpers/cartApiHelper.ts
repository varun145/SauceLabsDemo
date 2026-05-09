import { APIRequestContext } from '@playwright/test';

export class CartApiHelper {
  private baseURL = 'https://fakestoreapi.com';
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Get all carts
   */
  async getAllCarts() {
    return await this.request.get(`${this.baseURL}/carts`);
  }

  /**
   * Get a specific cart by ID
   */
  async getCartById(cartId: number) {
    return await this.request.get(`${this.baseURL}/carts/${cartId}`);
  }

  /**
   * Get carts for a specific user
   */
  async getCartsByUserId(userId: number) {
    return await this.request.get(`${this.baseURL}/carts/user/${userId}`);
  }

  /**
   * Add a new cart (POST)
   */
  async addCart(cartData: object) {
    return await this.request.post(`${this.baseURL}/carts`, {
      data: cartData,
    });
  }

  /**
   * Update a cart (PUT)
   */
  async updateCart(cartId: number, cartData: object) {
    return await this.request.put(`${this.baseURL}/carts/${cartId}`, {
      data: cartData,
    });
  }

  /**
   * Partially update a cart (PATCH)
   */
  async patchCart(cartId: number, cartData: object) {
    return await this.request.patch(`${this.baseURL}/carts/${cartId}`, {
      data: cartData,
    });
  }

  /**
   * Delete a cart
   */
  async deleteCart(cartId: number) {
    return await this.request.delete(`${this.baseURL}/carts/${cartId}`);
  }

  /**
   * Get products API for reference
   */
  async getProductById(productId: number) {
    return await this.request.get(`${this.baseURL}/products/${productId}`);
  }

  /**
   * Get all products
   */
  async getAllProducts() {
    return await this.request.get(`${this.baseURL}/products`);
  }
}
