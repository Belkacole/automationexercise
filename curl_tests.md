CURL API Test Examples

1. Get All Products List

curl -X GET "https://automationexercise.com/api/productsList"

Expected: 200 OK
Response body should contain a products array.

2. Search for a product (valid)

curl -X POST "https://automationexercise.com/api/searchProduct" 
   \  -d "search_product=Dress"

Expected: 200 OK
Should return a list of products matching "Dress".

3. Invalid Search Request (missing parameter)

curl -X POST "https://automationexercise.com/api/searchProduct"

Expected: 400 Bad Request
Message: search_product parameter is missing