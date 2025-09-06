Section 3: Additional Test Case Design

This file contains 5 additional test scenarios, covering edge cases and complex flows not listed on the Automationexercise site.

Test Case #1: User cannot register without accepting terms (Negative case)

- Feature/ Flow: User registration
- Pre-condition: User is on the Sign Up page
- Test steps:
  1. Go to "https://automationexercise.com/login"
  2. Enter valid name and email
  3. Click "Signup"
  4. Fill in all required fields
  5. Leave the checkboxes for newsletter and special offers unchecked
  6. Submit the form
- Expected outcome:
    Account should still be created
    This verifies that accepting offers is optional, not required
- Cleanup:
  Log in and delete the test user

Test Case #2: Contact form — field length limit (Edge case)

- Feature / Flow: Contact Us form submission
- Pre-condition: User is on /contact_us
- Test Steps:
  1. Navigate to Contact Us page
  2. Enter name and email
  3. Enter valid subject
  4. Enter a message with exactly 2000 characters
  5. Click Submit
- Expected outcome:
  Message is submitted successfully (2000 chars is accepted)
  Page shows success banner:
"Success! Your details have been submitted successfully."
- Cleanup: None required

Test Case #3: Login after account deletion (Negative case)

- Feature / Flow: Account login
- Pre-condition: User account must be created and deleted
- Test Steps:
  1. Create a user account (via UI or API)
  2. Log out
  3. Delete the account (UI or API call)
  4. Go to login page
  5. Enter previously deleted credentials and attempt login
- Expected Outcome:
  Login should fail.
  Page should show: "Your email or password is incorrect!"
  User should not be logged in.
- Cleanup: None (account is deleted)

Test Case #4: Add product to cart from search page

- Feature / Flow: Product Search and Cart
- Pre-condition: User is on Home page
- Test Steps:
  1. Click "Products"
  2. Enter "Top" in the search bar
  3. Click Search
  4. From search results, click "Add to Cart" on first product
  5. Click "View Cart"
- Expected Outcome:
  Selected product appears in cart
  Price, quantity and description are correct
- Cleanup:
  Empty cart

Test Case #5: Checkout with empty cart (Negative)

- Feature / Flow: Cart & Checkout
- Pre-condition: No items in cart
- Test Steps:
  1. Go to Cart
  2. Click "Proceed to Checkout"
- Expected Outcome:
  Checkout is blocked, or user is redirected with error or     warning -> e.g., message: "Your cart is empty" or redirect to   Home
- Cleanup: None required


