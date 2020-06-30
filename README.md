# Apollo Server

Provides access to a Mongo Database through GraphQL

## Steps to Start server

- clone repo or download source
- `npm install` on project root directory
- modify `config.js` file in `/src` directory
  with your own credentials for DB and choose a SECRET_KEY to manage authorization tokens
  ```
  module.exports = {
    MONGODB:
      'mongodb+srv://rootMDB:<password>@<cluster-url/<dbname>?retryWrites=true&w=majority',
    SECRET_KEY:
      '&lt;a secret key that you want&gt;',
  };`
  ```
- `npm start`
