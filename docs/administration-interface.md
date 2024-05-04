# Admin interface

The role of the admin interface is to provide the possibility for admin users to create, delete, and update the displayed content of the application.The administration panel can only be accessed by users with an admin role.

***

For both the frontend and the backend application authorization should happen when a page under the `/administration` path is reached, or in the backend a resource used by the administration panel is requested.

## Provided functionalities

The administration interface offers the possibility to: 

* add new users
* remove users
* change user roles
* create user groups
* add courses (and chapters)
* publish courses
* remove courses
* limit the access of certain courses for a given user group
* create events
* publish events
* remove events