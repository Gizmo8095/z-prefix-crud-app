# z-prefix-crud-app
This is my submission for the Z Prefix CRUD App. It uses knex to create and seed the database, and an express server to communicate with it.

Without signing in, you can view all items within the items database, and click on any of the rows to pull up the individual item without the truncated description. The home button will take you back to the landing page.

The ability to create a user is within the Login button, and under Create User. From within that modal, you can input a username, password, first name, and last name. The id is automatically generated. If you input a username that already exists, it will tell you that the username already exists and won't allow you to create the user.

When you log into a user, it puts you on the /myaccount page, which displays the items that are associated with the account that is currently signed in. Each account is only capable of editing the items that are associated with their account.
  You can also delete the signed in user from the myaccount page.

A message is displayed saying that you have no items when there are no items associated with the current account.

When you create an item, the id is automatically generated and cannot be edited. The user id is tied to the currently signed in account and cannot be edited. The other 3 fields are a text input. The item gets posted to the database once you create the item, and you are brought back to the /myaccount page.

When you want to edit an item, you can click the edit button within that row and it will bring you to a page where the pertinent information is editable as a text input. The information gets put into the database when you click Update Item, or you can delete the item from the database by clicking Delete Item. Doing either will bring up a popup to tell you that it is done successfully.


Once you have cloned the information, you need to have the postgres' password be 'PostGreSQL' and run **npm start** in both the frontend and backend directories.


The current existing users are as follows:
johndoe | password1
janesmith | password2
