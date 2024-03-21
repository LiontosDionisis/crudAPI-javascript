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
            },
            "post": {
                "tags": ["Users"],
                "description": "Create a new user",
                "requestBody": {
                    "description": "User schema to insert",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "String"},
                                    "password": {"type": "String"},
                                    "name": {"type": "String"},
                                    "surname": {"type": "String"},
                                    "email": {"type": "String"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "String"},
                                            "road": {"type": "String"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "String"},
                                                "number": {"type": "String"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user inserted"
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
            },
            "patch": {
                "tags": ["Users"],
                "description": "Updates a user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's username to update",
                        "type": "String"
                    }
                ],
                "requestBody": {
                    "description": "User that we update",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "String"},
                                    "name": {"type": "String"},
                                    "surname": {"type": "String"},
                                    "email": {"type": "String"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "String"},
                                            "road": {"type": "String"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items" : {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "String"},
                                                "number": {"type": "String"}
                                            }
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User update",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": ["Users"],
                "description": "Delete a user :(",
                "parameters": [
                    {
                        "name":"username",
                        "in": "path",
                        "description": "User to delete",
                        "type": {"type": "String"}
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a user..."
                    }
                }
            }
        }
    }
}