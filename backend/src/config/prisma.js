// We don't use 'pg' or 'adapter-pg' for prisma+postgres:// URLs
const fs = require("fs");
const path = require("path");
const { PrismaClient, Prisma } = require("../generated/prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

require("dotenv").config();

const caCert = fs.readFileSync(path.join(process.cwd(), "certs", "ca.pem"));

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
  allowPublicKeyRetrieval: true,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true,
  },
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
