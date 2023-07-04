const config = require("config");
const express = require("express");
const mainRouter = require("./routes/index.routes");

const PORT = config.get("port") || 3030;
// const PORT = 3030

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
