# Fake Store API Test Suite

A comprehensive API testing framework for [Fake Store API](https://fakestoreapi.com/) using Playwright Test and TypeScript, covering Cart CRUD operations with positive, negative, and authentication scenarios.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [API Documentation](#api-documentation)

## 📁 Project Structure

```
api/
├── tests/
│   ├── positive.spec.ts          # Positive test cases (happy path)
│   ├── negative.spec.ts          # Negative test cases (edge cases)
│   ├── auth.spec.ts              # Authentication & authorization tests
│   ├── schema-validation.spec.ts # Response schema validation
│   ├── data-driven.spec.ts       # Data-driven tests (multiple product IDs)
│   └── crud.spec.ts              # Comprehensive CRUD operations
├── helpers/
│   ├── cartApiHelper.ts          # Cart API wrapper/helper class
│   └── schemaValidator.ts        # JSON schema validation utility
├── test-data/
│   └── cartTestData.json         # Test data for scenarios
├── playwright.config.ts          # Playwright configuration
└── README.md                     # This file
```

## ✨ Features

### Test Coverage

1. **Positive Cases** (`positive.spec.ts`)
   - ✅ GET all carts
   - ✅ GET specific cart by ID
   - ✅ GET carts by user ID
   - ✅ POST create new cart
   - ✅ PUT update cart completely
   - ✅ PATCH partially update cart
   - ✅ DELETE cart
   - ✅ GET product details
   - ✅ Response headers validation
   - ✅ Response time validation

2. **Negative Cases** (`negative.spec.ts`)
   - ✅ Non-existent cart handling
   - ✅ Invalid user ID format
   - ✅ Missing required fields
   - ✅ Invalid data types
   - ✅ Empty arrays
   - ✅ Negative quantities
   - ✅ Special characters in data
   - ✅ Large quantity values

3. **Authentication** (`auth.spec.ts`)
   - ✅ Public endpoint access without auth
   - ✅ CRUD operations without authentication
   - ✅ Sensitive data validation
   - ✅ CORS headers verification
   - ✅ Rate limiting checks
   - ✅ User isolation/data privacy
   - ✅ Stateless API verification

4. **Response Schema Validation** (`schema-validation.spec.ts`)
   - ✅ Cart structure validation
   - ✅ Product structure validation
   - ✅ Required field validation
   - ✅ Data type validation
   - ✅ Array/object structure validation
   - ✅ HTTP header validation
   - ✅ JSON validity checks
   - ✅ Null value handling
   - ✅ Numeric range validation

5. **Data-Driven Tests** (`data-driven.spec.ts`)
   - ✅ Multiple product IDs (1-5) in single test
   - ✅ Multiple user IDs
   - ✅ Product price verification across items
   - ✅ Batch cart creation
   - ✅ Concurrent operations
   - ✅ Performance testing

6. **CRUD Operations** (`crud.spec.ts`)
   - ✅ Complete workflow (CREATE → READ → UPDATE → DELETE)
   - ✅ Batch operations
   - ✅ Error handling and recovery
   - ✅ Concurrent operations
   - ✅ Transaction-like behavior

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Navigate to the api folder:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Verify installation:
```bash
npm test -- --version
```

## 🧪 Running Tests

### Run all API tests
```bash
npm test
```

### Run specific test suite
```bash
# Positive cases only
npm run test:positive

# Negative cases only
npm run test:negative

# Authentication tests only
npm run test:auth

# Schema validation tests only
npm run test:schema

# Data-driven tests only
npm run test:data-driven

# CRUD tests only
npm run test:crud
```

### Run with different options
```bash
# Debug mode (opens inspector)
npm run test:debug

# UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test tests/positive.spec.ts

# Run tests with tag filter
npx playwright test --grep @smoke

# Verbose output
npx playwright test --reporter=list
```

## 📊 Test Coverage

| Category | Test Count | Coverage |
|----------|-----------|----------|
| Positive Cases | 10 | All CRUD operations, response validation |
| Negative Cases | 12 | Edge cases, invalid inputs, error handling |
| Authentication | 10 | Auth scenarios, public API, user isolation |
| Schema Validation | 12 | Response structure, field types, ranges |
| Data-Driven | 9 | Multiple products (IDs 1-5), multiple users |
| CRUD Operations | 5 | Complete workflows, batch, concurrent |
| **Total** | **58** | **Comprehensive coverage** |

## 🔗 API Documentation

### Base URL
```
https://fakestoreapi.com
```

### Cart Endpoints

#### GET /carts
Get all carts
```bash
curl https://fakestoreapi.com/carts
```

#### GET /carts/{id}
Get specific cart
```bash
curl https://fakestoreapi.com/carts/1
```

#### GET /carts/user/{userId}
Get carts for a user
```bash
curl https://fakestoreapi.com/carts/user/1
```

#### POST /carts
Create new cart
```bash
curl -X POST https://fakestoreapi.com/carts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "date": "2024-01-10",
    "products": [{"productId": 5, "quantity": 1}]
  }'
```

#### PUT /carts/{id}
Update entire cart
```bash
curl -X PUT https://fakestoreapi.com/carts/7 \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 3,
    "date": "2024-02-10",
    "products": [{"productId": 1, "quantity": 5}]
  }'
```

#### PATCH /carts/{id}
Partially update cart
```bash
curl -X PATCH https://fakestoreapi.com/carts/7 \
  -H "Content-Type: application/json" \
  -d '{"products": [{"productId": 1, "quantity": 1}]}'
```

#### DELETE /carts/{id}
Delete cart
```bash
curl -X DELETE https://fakestoreapi.com/carts/1
```

### Response Example

**Cart Object:**
```json
{
  "id": 1,
  "userId": 1,
  "date": "2024-01-10T00:00:00.000Z",
  "products": [
    {
      "productId": 5,
      "quantity": 1
    }
  ],
  "__v": 0
}
```

**Product Object:**
```json
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "description": "Your perfect pack...",
  "category": "electronics",
  "image": "https://...",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

## 📈 Test Results

After running tests, results are generated in:
- HTML Report: `api/test-results/html/index.html`
- JSON Report: `api/test-results/results.json`
- JUnit Report: `api/test-results/results.xml`

View HTML report:
```bash
npx playwright show-report api/test-results/html
```

## 🔧 Configuration

Edit `api/playwright.config.ts` to customize:
- Base URL
- Timeout values
- Retry settings
- Reporter formats
- Browser configuration

## 📝 Test Data

Test data is managed in `api/test-data/cartTestData.json`:
- Valid cart examples
- Invalid cart examples (for negative testing)
- Product IDs for data-driven tests
- User IDs for data-driven tests

## 🐛 Troubleshooting

### Tests timeout
- Increase timeout in `playwright.config.ts`
- Check network connectivity to https://fakestoreapi.com

### Module not found errors
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (should be v16+)

### API returns unexpected responses
- Verify Fake Store API is accessible
- Check test data format matches API requirements

## 🤝 Contributing

To add new tests:
1. Create a new test file in `api/tests/`
2. Use the `CartApiHelper` for API calls
3. Follow existing naming conventions
4. Add tests to appropriate category

## 📄 License

MIT

## 🔗 Useful Links

- [Fake Store API](https://fakestoreapi.com/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)

---

**Last Updated:** May 2024  
**Framework Version:** 1.0.0  
**Test Suite Status:** ✅ Active & Maintained
