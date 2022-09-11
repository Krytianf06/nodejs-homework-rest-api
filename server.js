const app = require('./app')
const mongoose = require('mongoose')
const path = require('path');
require("dotenv").config();

const avatarDir = path.join(__dirname, "./", "tmp");
const avatarStore = path.join(__dirname, "./public/", "avatars");

const {createFolderIfItDoesntExist} = require('./service/avatarConfig');

const PORT = process.env.PORT || 3001;
const uriDb = process.env.DB_SRV;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, async () => {
      await createFolderIfItDoesntExist(avatarDir);
      await createFolderIfItDoesntExist(avatarStore);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Server not running", err.toString());
    process.exit(1);
  });