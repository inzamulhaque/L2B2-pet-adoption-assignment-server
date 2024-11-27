import { Server } from "http";
import app from "./app";
import config from "./config";
import seedSuperAdmin from "./db/seed";

const port = config.port;

async function main() {
  const server: Server = app.listen(port, () => {
    seedSuperAdmin();
    console.log(`http://localhost:${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
    process.exit(1);
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
