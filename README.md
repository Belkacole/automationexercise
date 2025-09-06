Section 1: Cypress UI Tests

This project contains automated end-to-end tests for the demo website [automationexercise.com](http://automationexercise.com), implemented with [Cypress](https://www.cypress.io/).

 Test Scenarios

The following test cases are covered:

1. Register User 
Positive flow: register a new user and then delete the account. Negative and edge cases: 
- Registration with an existing email. 
- Required fields validation (password). 
- Client-side email validation (invalid formats). 
- Maximum length of name field. 
- Unicode and special characters in the name.

2. Contact Us Form 
Positive flow: submit the contact form with valid data and a file upload.
Edge cases: 
- Very long message.
- Unicode and emoji in the message. 
Negative case: 
- Email field left empty → form is not submitted.
3. Search Product 
Positive flow: search for an existing product (e.g. *Dress*), verify results. 
Negative case: search for a non-existing product (e.g. *Rubber Dinosaur*), no results are displayed.

Approach

- Tests are written in JavaScript using Cypress `e2e` structure. 
- Each major feature (Registration, Contact Us, Search) is grouped into its own `describe` block. 
- For negative cases, validation is checked either by UI messages or by ensuring no request was sent (`cy.intercept`). - - Test data such as user information is generated dynamically (e.g. unique email with timestamp). 
- File upload is handled using `cy.selectFile` with a sample file located in `cypress/fixtures/`.

Section 2: API Testing

Located in:

- `postman-tests-automationexercise.json` — Postman test collection
- `curl_tests.md` — Equivalent curl-based API tests
- `Exploratory findings from API testing.md` — Notes and issues discovered during API testing

Covered API's:

- `GET /productsList` — Validate product listing
- `POST /searchProduct` — Search valid/invalid products
- `POST /createAccount` — Register user via API
- `DELETE /deleteAccount` — Delete user via API

Assertions include:

- Status code
- Headers (`Content-Type`)
- Response body structure
- Error handling (400, 404, etc.)

Section 3: Custom Test Case Design

This file contains 5 additional test scenarios, covering edge cases and complex flows not listed on the Automationexercise site.

TС #1: User cannot register without accepting terms (Negative case) 
Feature: User registration  
Steps: Attempt signup without checking newsletter/offer boxes  
Expected: Account should still be created (those fields are optional)  
Cleanup: Delete account

TС #2: Contact form — field length limit (Edge case) 
Feature: Contact form  
Steps: Submit message with exactly 2000 characters  
Expected: Message is submitted successfully  
Cleanup: None

TС #3: Login after account deletion (Negative case) 
Feature: Account login  
Steps: Try logging in with deleted credentials  
Expected: Login should fail with appropriate error  
Cleanup: None

TС #4: Add product to cart from search page
Feature: Product search and cart  
Steps: Search for "Top" and add item to cart  
Expected: Cart shows correct product, price, and quantity  
Cleanup: Empty cart

TС #5: Checkout with empty cart (Negative case) 
Feature: Cart & Checkout  
Steps: Proceed to checkout with empty cart  
Expected: Error message shown or user is blocked  
Cleanup: None

See file: `test-cases-section-3.md`

Section 4: Bug Reports

Located in `bug-reports.md` — includes:

- Clear reproduction steps
- Actual vs expected behavior
- Severity & priority

Notes:

- All tests are built to be readable, maintainable, and follow Cypress testing best practices.
- Edge cases and negative scenarios were tested thoroughly via both UI and API.
- This repository demonstrates functional coverage, exploratory testing, and bug reporting workflows.

