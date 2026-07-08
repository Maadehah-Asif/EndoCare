import "dotenv/config";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  MONGODB_URI:
    process.env.MONGODB_URI ??
    "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority&appName=EndoCareCluster",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME ?? "endocare"
};
