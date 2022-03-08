# Product List  
To Create User, send POST request to http://localhost:5000/user/signup , with email and password. Email should be email, password should have atleast 4 characters.  
To Login, send POST request to http://localhost:5000/user/login/ , with your email and password.  
To change password, send PUT request to http://localhost:5000/user/change-password with JWT in header (route is protected, user id is extracted out of JWT), with new password. 

To create list send POST request to http://localhost:5000/list/ (again, route is protected, send JWT in headers). Title is required, products should be empty array, or array of objects with name and sum.  
To edit list send POST request to http://localhost:5000/list/ (again, route is protected, send JWT in headers). Title is required, products should be empty array, or array of objects with name and sum.  
To get list of products for specific dates, send GET request to http://localhost:5000/list/startDate/endDate. Dates should be in yyyy-mm-dd format.
To delete the list, send DELETE request to http://localhost:5000/list/:id (id of list).  
  
## Application's main features: 
- Easy to use

## Technologies
Built with:
- Node
- Express
- MongoDB

## Libraries
- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose
- passport
- passport-jwt
- validator

## How to clone, install and start
To get a local copy up and running follow these simple example steps:
1. Clone the repo
- git clone https://github.com/flamboyant11/wc-task
2. Start the project
- open terminal
- npm install
- create .env file and add environment variables PORT=5000 JWT_SECRET="your secret key" and MONGO_URI with your MongoDB uri. 
- npm start
To start in a Docker container:
1. After cloning and setting up .env, run "docker build . -t 'name'" in your terminal
2. docker run -p 5000:5000 -d "name"