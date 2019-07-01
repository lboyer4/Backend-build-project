# Backend-build-project

## Description

This is a Turing Mod 4 front-end development project. It uses Node/Express, Knex, SQL, and Postgres to build out a backend. 

## Installation

clone down this repository

`https://github.com/lboyer4/Backend-build-project.git`

next, install dependencies

`npm install`

start server with

`nodemon server.js`

## Endpoints

-Method: Get
-Endpoint: '/api/v1/senators'
-Returns: An array of all senators

-Method: Get
-Endpoint: '/api/v1/states'
-Returns: An array of all states

-Method: Get
-Endpoint: '/api/v1/senator/:id'
-Returns: A senator object with specified ID

-Method: Get
-Endpoint: '/api/v1/state/:id'
-Returns: A state object with specified ID

-Method: Post
-Endpoint: '/api/v1/senators'
-Returns: A new senator object

-Method: Post
-Endpoint: '/api/v1/states'
-Returns: A new state object

-Method: Delete
-Endpoint: '/api/v1/senators/:id'
-Returns: {success: true}

## Focus

The focus of this project was to compile, migrate, and seed data and build out the endpoints for said data using Node.js/Express, Knex, SQL, and Postgres.
