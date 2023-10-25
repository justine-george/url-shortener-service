require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
