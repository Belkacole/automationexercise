\# AutomationExercise Cypress Tests

This project contains automated end-to-end tests for the demo website
\[automationexercise.com\](http://automationexercise.com), implemented
with \[Cypress\](https://www.cypress.io/).

\## Test Scenarios

The following test cases are covered:

1\. \*\*Register User\*\*  - Positive flow: register a new user and then
delete the account.  - Negative and edge cases:  - Registration with an
existing email.  - Required fields validation (password).  - Client-side
email validation (invalid formats).  - Maximum length of name field.  -
Unicode and special characters in the name.

2\. \*\*Contact Us Form\*\*  - Positive flow: submit the contact form
with valid data and a file upload.  - Edge cases:  - Very long message.
 - Unicode and emoji in the message.  - Negative case:  - Email field
left empty → form is not submitted.

3\. \*\*Search Product\*\*  - Positive flow: search for an existing
product (e.g. \*Dress\*), verify results.  - Negative case: search for a
non-existing product (e.g. \*Rubber Dinosaur\*), no results are
displayed.

\## Approach

\- Tests are written in JavaScript using Cypress \`e2e\` structure. -
Each major feature (Registration, Contact Us, Search) is grouped into
its own \`describe\` block. - For negative cases, validation is checked
either by UI messages or by ensuring no request was sent
(\`cy.intercept\`). - Test data such as user information is generated
dynamically (e.g. unique email with timestamp). - File upload is handled
using \`cy.selectFile\` with a sample file located in
\`cypress/fixtures/\`.
