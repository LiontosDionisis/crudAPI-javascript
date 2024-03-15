const m2s = require("mongoose-to-swagger");
const User = require("./models/user.model");
const Product = require("./models/product.model");

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "openapi":"3.1.0",
    "info":{
        "version":"1.0.0",
        "title":"Products crudAPI",
        "description":"Products project aplication",
        "contact":{
            "name":"Dionisis",
            "url":"https://www.example.com",
            "email":"example@example.com"
        }
    },
    "servers":[
        {
            url:"https://localhost:3000",
            description:"Local server"
        },
        {
            url:"https://www.example.com",
            description:"Testing server"
        }
    ],
    "tags":[
        {
            "name":"Users",
            "description":"API endpoints for Users"
        },
        {
            "name":"Products",
            "description":"API endpoints for Products"
        },
        {
            "name":"Users and Products",
            "description":"API endpoints for Users and their Products"
        }
    ],
    "paths":{
        "/api/users":{
            "get":{
                "tags":["Users"],
                "description":"Returns all users",
                "responses":{
                    "200":{
                        "description":"A list of users",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"array",
                                    "items":{
                                        "$ref":"#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{username}":{
            "get":{
                "tags":["Users"],
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required":true,
                        "description":"Username of user to return",
                        "type":"String"
                    }
                ],
                "description":"Returns a user by his username",
                "responses":{
                    "200":{
                        "description":"User to find",
                        "schema":{
                            "$ref":"#/components/schemas/User"
                        }
                    }
                }
            }
        }
    }
}