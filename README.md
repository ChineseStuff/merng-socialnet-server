# Apollo Server

Provides access to a Mongo Database through GraphQL

## Steps to Start server

- clone repo or download source
- `npm install` on project root directory
- create a file to store DB credentials called `config.js` into `/src` directory.
  In the following way, with your own credentials for DB and choose a SECRET_KEY to manage authorization tokens
  ```
  module.exports = {
    MONGODB:
      'mongodb+srv://rootMDB:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority',
    SECRET_KEY:
      '<a-secret-key-that-you-want>;',
  };`
  ```
- `npm start`
