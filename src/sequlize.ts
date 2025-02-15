import sequelize from "../src/config/db";
import dotenv from "dotenv";
import app from "./index";

dotenv.config();

async function start () {  
  sequelize.authenticate().then(() => {
 console.log(
      "Connection to the database has been established successfully."
    );
  })  
.catch((error) =>  {
    console.error("Unable to connect to the database:", error);
  })
}

const PORT = process.env.PORT || "5000";

const appServer = app?.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

start ();

export default sequelize;
