const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectToDB = require("./config/db");

const port = process.env.PORT || 3001;
console.log(port);

connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
