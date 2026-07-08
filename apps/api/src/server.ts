import { createApp } from "./app";
import { env } from "./shared/config/env";
import { closeDatabaseConnection, connectToDatabase } from "./shared/database/mongodb";

async function bootstrap() {
  await connectToDatabase();

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`EndoCare API listening on http://localhost:${env.PORT}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

bootstrap().catch((error) => {
  console.error("Failed to start EndoCare API");
  console.error(error);
  process.exit(1);
});
