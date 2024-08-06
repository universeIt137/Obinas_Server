const app = require("./app");
const connectDb = require("./db");

require("dotenv").config();

const dbPort = process.env.PORT || 3000;

app.listen(dbPort, async ()=>{
    console.log(`Server run successfully at http://localhost:${dbPort}`);
     await connectDb();
});