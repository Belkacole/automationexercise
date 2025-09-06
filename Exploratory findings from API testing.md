Exploratory findings from API testing

1. Inconsistent Content-Type header
Despite returning valid JSON data, most endpoints respond with Content-Type: text/html instead of the expected application/json. This may lead to confusion or require custom handling on the client side.

2. Missing JSON Schema Validation
The API responses lack strict structure validation. For example, the searchProduct and productsList endpoints return loosely formatted JSON, and some fields are not always present.

3. No Error Message on Empty Search
Submitting an empty or invalid search_product value in the searchProduct POST request returns a generic 400 error:

{
  "responseCode": 400,
  "message": "Bad request, search_product parameter is missing in POST request."
}

4. Error Handling Is Inconsistent

Some endpoints return proper JSON with responseCode and message fields.

Others return HTML with no clear indication of the error unless the body is parsed manually.

