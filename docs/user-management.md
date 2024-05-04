# User management

The role of the user management functionality is to make it possible for users to register and login. The administration interface should be able to:
* register a new user
* login with the registered user
* define user roles
* as an admin change roles of the other users
* as an admin be able to remove users
* as an admin send out invitations for users that have not registered yet

The foundation of user management functionality is provided by the Clerk authentication service.

## User roles

The application currently supports two roles
* Consumer
* Administrator 

## Challenges 

How to authenticate the user based on the Clerk session token in the backend API?

When the user is modified on the Clerk API how will that be visible in the database of the application?