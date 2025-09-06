Bug Report #1: API search endpoint returns 200 for invalid payload

Title: [API] /searchProduct endpoint returns 200 OK with invalid request payload

Steps to Reproduce:

1. Open Postman
2. Create a POST request to https://automationexercise.com/api/searchProduct
3. Leave the body empty or omit the required search_product parameter
4. Send the request

Expected Result:
Server should return 400 Bad Request with a clear error message explaining the missing required parameter.

Actual Result:
Server returns 200 OK, but with the following JSON:
{
  "responseCode": 400,
  "message": "Bad request, search_product parameter is missing in POST request."
}

Severity: Medium
Priority: High

Notes:

Misleading status code may break automated monitoring or consumers of the API expecting proper HTTP status semantics.

Bug Report #2: Contact Us form allows submission without email field

Title: [UI] "Contact Us" form can be submitted without an email address

Steps to Reproduce:

1. Go to https://automationexercise.com/contact_us.

2. Fill in all fields except the email field.

3. Click the Submit button.

Expected Result:
Form submission should be blocked; an inline browser validation message should appear or a visible warning should be shown on the page.

Actual Result:
No visual warning appears.
The page appears to reload but silently fails.
The request is not sent to the server (confirmed via intercept).

Severity: Low
Priority: Medium

Notes:

This may confuse users and is not accessibility-friendly.

Suggest adding visible form-level validation or error messaging.
