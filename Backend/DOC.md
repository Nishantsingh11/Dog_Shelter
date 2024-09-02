Project Name : Dog Adoption Site Backend
Description: A platform to adopt new dog or list your dog dor adoption 
Technologies Used: Node.js, Express.js, MongoDB


### Installation
**Clone the Repository**:
```base
git clone ....
cd .///
```

**Install Dependencies**:
```base
npm install
```
Environment Variables:
```base
REFRESH_TOKEN=""
MONGO_URI=''
ACCESS_TOKEN=''
REFRESH_TOKEN_EXPIRY=
ACCESS_TOKEN_EXPIRY=
COOKIE_EXPIRY
PORT=
```
**Start the server**
```base
    npm start
```

### 3. **Project Structure**

```markdown
### Project Structure
dog-adoption-backend/
│
├── controllers/        # Business logic for handling requests
│   ├── dogController.js
│   ├── userController.js
│   └── adoptionController.js
│
├── models/             # Database models
│   ├── Dog.js
│   ├── User.js
│   └── Adoption.js
│
├── routes/             # API routes
│   ├── dogRoutes.js
│   ├── userRoutes.js
│   └── adoptionRoutes.js
│
├── middlewares/        # Custom middleware functions
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── utils/              # Utility functions
│   └── validation.js
│
├── config/             # Configuration files
│   └── db.js
│
├── .env.example        # Example environment variables
├── package.json
└── README.md           # Project documentation

```
### 4. **API Documentation**
Document each API endpoint, including its method, path, parameters, and a brief description of what it does. Use a consistent format for clarity.


### API Endpoints 

#### User Authentication

### Register User

This endpoint allows the user to register by providing their name, email, password, username, and confirmation password.

#### Request Body

- `name` (string, required): The name of the user.
    
- `email` (string, required): The email address of the user.
    
- `password` (string, required): The password for the user account.
    
- `username` (string, required): The username chosen by the user.
    
- `confirm_password` (string, required): The confirmation of the password provided by the user.
    

#### Response

The response will be in JSON format and will include the following schema:

``` json
{

    "data": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "_id": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        },
        "__v": {
          "type": "number"
        }
      }
    },
 
}

 ```

### User Login

This endpoint allows users to log in to the dog adoption system.

#### Request Body

- `email` (string, required): The email address of the user.
    
- `password` (string, required): The password of the user.
    

#### Response

- `statusCode` (integer): The status code of the response.
    
- `data` (object): The user data if the login is successful.
    
- `message` (string): A message related to the login status.
    
- `success` (boolean): Indicates whether the login was successful.
    

Example Response:

``` json
{
    "statusCode": 0,
    "data": {},
    "message": "",
    "success": true
}

 ```

### POST /user/logout

This endpoint is used to log out the user.

#### Request Body

- No request body is required for this endpoint.
    

#### Response

The response for this request is a JSON object with the following schema:

``` json
{
    "type": "object",
    "properties": {
        "statusCode": {
            "type": "number"
        },
        "data": {
            "type": "object"
        },
        "message": {
            "type": "string"
        },
        "success": {
            "type": "boolean"
        }
    }
}

 ```

The response object contains the following properties:

- `statusCode` (number): The status code of the response.
    
- `data` (object): An empty object.
    
- `message` (string): A message related to the response.
    
- `success` (boolean): Indicates the success status of the request.
  

 **Get New Access Token**
  - **URL**: `/api/user/login`
  - **Method**: `GET`
  - **Body Parameters**: None (usually handled via cookies or authorization headers)
  - **Description**: To genrate the new access token using the refresh token 

### Change User Password

This endpoint allows the user to change their password.

#### Request Body

- `current_password` (string, required): The user's current password.
    
- `new_password` (string, required): The new password to be set.
    
- `confirm_password` (string, required): Confirmation of the new password.
    

#### Response

The response is in JSON format and follows the schema below:

``` json
{
    "type": "object",
    "properties": {
        "statusCode": {
            "type": "integer"
        },
        "data": {
            "type": "object"
        },
        "message": {
            "type": "string"
        },
        "success": {
            "type": "boolean"
        }
    }
}

 ```

### Retrieve Current User Information

This endpoint is used to retrieve the information of the current user.

#### Request

- Method: GET
    
- URL: `{{dogAdooption}}/user/me`
    

#### Response

The response will be in JSON format and will have the following schema:

``` json
{
  "type": "object",
  "properties": {
    "statusCode": {
      "type": "number"
    },
    "data": {
      "type": "object",
      "properties": {
        "_id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        },
        "__v": {
          "type": "number"
        }
      }
    },
    "message": {
      "type": "string"
    },
    "success": {
      "type": "boolean"
    }
  }
}

 ```


#### Dog Management


### Add New Dog

This endpoint allows you to add a new dog for adoption.

#### Request Body

- `name` (string, required): The name of the dog.
    
- `breed` (string, required): The breed of the dog.
    
- `age` (number, required): The age of the dog.
    
- `description` (string, required): Description of the dog.
    

#### Response

- Status: 201 Created
    
- Content-Type: application/json
    

Example Response Body:

``` json
{
    "statusCode": 0,
    "data": {
        "name": "",
        "breed": "",
        "age": 0,
        "owner": "",
        "description": "",
        "adopted": true,
        "_id": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
    },
    "message": "",
    "success": true
}

 ```

> The `GET` request to `/dog/get-dogs` endpoint retrieves a list of dogs available for adoption. The response is a JSON object with the following schema: 
  x

``` json
{
    "type": "object",
    "properties": {
        "statusCode": {
            "type": "number"
        },
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "_id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "breed": {
                        "type": "string"
                    },
                    "age": {
                        "type": "number"
                    },
                    "owner": {
                        "type": "object",
                        "properties": {
                            "_id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            }
                        }
                    },
                    "description": {
                        "type": "string"
                    }
                }
            }
        },
        "message": {
            "type": "string"
        },
        "success": {
            "type": "boolean"
        }
    }
}

 ```

### GET /dog/getdog/{dogId}

This endpoint retrieves information about a specific dog based on the provided dog ID.

#### Request

No request body is required for this endpoint. The `dogId` parameter should be included in the request URL.

- `dogId` (path parameter) - The unique identifier of the dog.
    

#### Response

The response will be in JSON format and follows the schema below:

``` json
{
  "type": "object",
  "properties": {
    "statusCode": {
      "type": "number"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "breed": {
            "type": "string"
          },
          "age": {
            "type": "number"
          },
          "owner": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                }
              }
            }
          },
          "description": {
            "type": "string"
          }
        }
      }
    },
    "message": {
      "type": "string"
    },
    "success": {
      "type": "boolean"
    }
  }
}

 ```


This HTTP PATCH request is used to update the details of a specific dog for adoption. The request should be sent to {{dogAdooption}}/dog/update-dog/66d44a5c3cb69314896f6026.

### Request Body

The request body should be in raw format and include the following parameters:

- `name`: (string) The name of the dog.
    
- `breed`: (string) The breed of the dog.
    
- `age`: (number) The age of the dog.
    
- `description`: (string) A description of the dog.
    

### Response

Upon a successful execution, the response will have a status code of 200 and a content type of application/json. The response body will contain the following parameters:

- `statusCode`: (number) A status code indicating the result of the operation.
    
- `data`: (object) An object containing the updated details of the dog, including its ID, name, breed, age, owner, description, adoption status, creation and update timestamps, and version.
    
- `message`: (string) A message related to the operation.
    
- `success`: (boolean) Indicates whether the operation was successful.




### Update Dog Adopted Status

This endpoint allows you to update the adopted status of a dog.

#### Request

- Method: PATCH
    
- URL: `{{dogAdooption}}/dog/update-adopted-status/66d44a5c3cb69314896f6026`
    
- Body:
    
    - `adoptedBy` (text, required): The ID of the user who adopted the dog.
        

#### Response

The response is a JSON object with the following schema:

``` json
{
  "type": "object",
  "properties": {
    "statusCode": { "type": "number" },
    "data": {
      "type": "object",
      "properties": {
        "_id": { "type": "string" },
        "name": { "type": "string" },
        "breed": { "type": "string" },
        "age": { "type": "number" },
        "owner": { "type": "string" },
        "description": { "type": "string" },
        "adopted": { "type": "boolean" },
        "createdAt": { "type": "string" },
        "updatedAt": { "type": "string" },
        "__v": { "type": "number" },
        "adoptedBy": { "type": "string" }
      }
    },
    "message": { "type": "string" },
    "success": { "type": "boolean" }
  }
}

 ```



### Delete Dog by ID

This endpoint is used to delete a specific dog by its ID.

#### Request Body

This request does not require a request body.

#### Response

The response will be in JSON format with the following schema:

- statusCode (number): The status code of the response.
    
- data (null): The data returned by the request, which is null in this case.
    
- message (string): A message related to the response.
    
- success (boolean): Indicates whether the request was successful.
    

``` json
{
    "statusCode": 0,
    "data": null,
    "message": "",
    "success": true
}

 ```
