# Playwright + Cucumber + API Testing Framework

A comprehensive automation testing framework combining **E2E UI Testing** (Playwright + Cucumber BDD) and **API Testing** (Playwright Test) for SauceDemo and Fake Store API.

## 📚 Quick Links

- **UI Tests**: SauceDemo E2E with Cucumber BDD (6 scenarios, 37 steps) ✅
- **API Tests**: Fake Store API CRUD Testing (58+ tests) ✅
- **Status**: All tests passing - Ready for production

## 🎯 Project Overview

This repository contains two main testing suites:

- Playwright
- TypeScript
- Cucumber BDD
- Page Object Model (POM)
- GitHub Actions CI/CD

The framework automates end-to-end scenarios for the SauceDemo e-commerce application.

---

# Why Playwright with TypeScript?

## Playwright

Playwright was chosen because it provides:

- Fast and reliable browser automation
- Cross-browser support (Chromium, Firefox, WebKit)
- Auto-wait mechanisms reducing flaky tests
- Powerful locators and assertions
- Parallel execution support
- Built-in tracing, screenshots, and debugging
- Modern automation capabilities compared to traditional Selenium frameworks

Playwright also supports real-time web application testing with stable execution across browsers.

---

## TypeScript

TypeScript was used because it provides:

- Strong typing support
- Better code maintainability
- Improved IntelliSense and auto-completion
- Compile-time error detection
- Scalable framework architecture
- Easier debugging for large automation projects

Using TypeScript improves framework stability and reduces runtime issues.

---

## Why Cucumber BDD?

Cucumber BDD was used to achieve:

- Readable business-oriented test scenarios
- Better collaboration between QA, Developers, and Business teams
- Reusable step definitions
- Data-driven testing using Scenario Outline and Examples
- Improved traceability using tags like:
  - @Smoke
  - @Regression
  - @TCID_Test01

BDD also makes the framework more scalable and maintainable.

---

# Framework Design Pattern

The framework follows:

## Page Object Model (POM)

Benefits:
- Reusable page methods
- Better maintainability
- Separation of test logic and UI locators
- Reduced code duplication

---

## Glue Layer

A dedicated Glue layer is used between:
- Step Definitions
- Page Objects

Benefits:
- Cleaner architecture
- Better abstraction
- Improved scalability
- Easier business-flow handling

---

# Framework Features

- Feature-file based execution
- Scenario Outline with Examples
- Reusable Step Definitions
- Tag-based execution
- Modular Page Objects
- Glue Layer abstraction
- Cross-browser ready framework
- GitHub Actions CI/CD integration
- Data-driven testing support

---

# Project Structure

```bash
playwright-cucumber-framework/
│
├── features/
├── step-definitions/
├── glue/
├── pages/
├── hooks/
├── utils/
├── .github/workflows/
├── playwright.config.ts
├── cucumber.js
├── package.json
└── README.md
```

---

# Test Scenarios Covered

## Login Module
- Valid Login
- Invalid Login
- Inventory Validation

## Cart Module
- Add to Cart
- Remove from Cart

## Checkout Module
- Complete Checkout Flow
- Order Confirmation Validation

---

# Run Commands

## Install Dependencies

```bash
npm install
```

---

## Install Playwright Browsers

```bash
npx playwright install
```

---

## Run All Tests

```bash
npm test
```

---

## Run Smoke Tests

```bash
npx cucumber-js --tags "@Smoke"
```

---

## Run Regression Tests

```bash
npx cucumber-js --tags "@Regression"
```

---

## Run Specific Test Case

```bash
npx cucumber-js --tags "@TCID_Test01"
```

---

# CI/CD Integration

GitHub Actions workflow is configured to:

- Trigger execution on push
- Install dependencies
- Execute automation suite
- Support future reporting integrations

---

# Extension Plan

The framework can be extended further with:

## Parallel Execution
- Playwright parallel workers
- Faster suite execution
- Multi-browser execution

## Reporting
- HTML Reports
- Allure Reports
- Extent Reports
- Cucumber JSON Reports

## Advanced Features
- API Testing Integration
- Database Validation
- Retry Mechanism
- Environment Configuration
- Docker Integration
- Jenkins Pipeline Integration
- Cloud Execution (BrowserStack/SauceLabs)

---

# Future Improvements

- Data-driven framework using external files
- Environment-specific configuration
- Screenshot capture on failure
- Video recording
- Trace viewer integration
- Centralized test data management

---

# Author

Automation Framework created using Playwright + TypeScript + Cucumber BDD.