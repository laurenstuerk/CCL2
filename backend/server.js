// backend/server.js

require("dotenv").config(); // Load env variables
const app = require("./app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
