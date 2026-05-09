import Ajv, { JSONSchemaType } from 'ajv';

export class SchemaValidator {
  private ajv = new Ajv();

  /**
   * Cart object schema
   */
  private cartSchema: JSONSchemaType<any> = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      userId: { type: 'number' },
      date: { type: 'string' },
      products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'number' },
            quantity: { type: 'number' },
          },
          required: ['productId', 'quantity'],
        },
      },
      __v: { type: 'number', nullable: true },
    },
    required: ['id', 'userId', 'date', 'products'],
  };

  /**
   * Product object schema
   */
  private productSchema: JSONSchemaType<any> = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      price: { type: 'number' },
      description: { type: 'string' },
      category: { type: 'string' },
      image: { type: 'string' },
      rating: {
        type: 'object',
        properties: {
          rate: { type: 'number' },
          count: { type: 'number' },
        },
        required: ['rate', 'count'],
      },
    },
    required: ['id', 'title', 'price', 'description', 'category', 'image', 'rating'],
  };

  /**
   * Carts array schema
   */
  private cartsArraySchema: JSONSchemaType<any> = {
    type: 'array',
    items: this.cartSchema,
  };

  /**
   * Validate cart response
   */
  validateCart(data: any): { valid: boolean; errors?: any[] } {
    const validate = this.ajv.compile(this.cartSchema);
    const valid = validate(data);
    return {
      valid,
      errors: validate.errors,
    };
  }

  /**
   * Validate carts array response
   */
  validateCartsArray(data: any): { valid: boolean; errors?: any[] } {
    const validate = this.ajv.compile(this.cartsArraySchema);
    const valid = validate(data);
    return {
      valid,
      errors: validate.errors,
    };
  }

  /**
   * Validate product response
   */
  validateProduct(data: any): { valid: boolean; errors?: any[] } {
    const validate = this.ajv.compile(this.productSchema);
    const valid = validate(data);
    return {
      valid,
      errors: validate.errors,
    };
  }

  /**
   * Validate response status code
   */
  validateStatusCode(statusCode: number, expectedCode: number): boolean {
    return statusCode === expectedCode;
  }

  /**
   * Validate response has required fields
   */
  validateRequiredFields(data: any, requiredFields: string[]): { valid: boolean; missingFields: string[] } {
    const missingFields = requiredFields.filter((field) => !(field in data));
    return {
      valid: missingFields.length === 0,
      missingFields,
    };
  }
}
