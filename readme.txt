step 1

-- download the application and configure the enviormental variable in nodemon.json file
-- make sure that application is connected with mongodb atlas ( connect you own connection )
-- api  are made up with node.js, express, mongodb
-- postman tool is require to test the application

step 2 

-- to fetch users from http://jsonplaceholder.typicode.com/users and save to user db with role and password
http://localhost:3000/auth/user ( port may be vary as per the configuratino)
( by default all user are admin )
-- script to update the password to encrypt
http://localhost:3000/auth/updatepw/:id ( we have to do it one by one by changing ':id' value to 1 to 10 )

step 3

-- script to fetch posts from http://jsonplaceholder.typicode.com/posts and save to db
http://localhost:3000/feed/savepost
-- script to update the comments in post table
http://localhost:3000/feed/updatepost
-- script to update posts in respective user collections
http://localhost:3000/feed/updatePostInUser

step 4 

--- rest api implimentation
-- login ( user postman tool for testing the api )
http://localhost:3000/auth/login  ( enter the username and password in body section, select the method as post) 
copy the token from the response ( eg. username = Bret, password =Bret1 )

--fecth user details
http://localhost:3000/auth/user/1
select the authorization tab and select the type as 'Bearer Token' and paste the token which we have copied while doing login.

--fetch user posts
http://localhost:3000/auth/userpost/1
select the authorization tab and select the type as 'Bearer Token' and paste the token which we have copied while doing login.

-- fetch the all users (only by admin)
http://localhost:3000/auth/users
select the authorization tab and select the type as 'Bearer Token' and paste the token which we have copied while doing login.
in the router middleware its checking the role of the user, if user is admin then it will return all users

-- fetch all posts (only by admin)
http://localhost:3000/feed/posts
select the authorization tab and select the type as 'Bearer Token' and paste the token which we have copied while doing login.
only user with admin role can have the access to this api

-- upload user image
http://localhost:3000/auth/uploadimage
select the authorization tab and select the type as 'Bearer Token' and paste the token which we have copied while doing login.
using postman application, in the body tab, check the formdata make key filed as image and upload the image









