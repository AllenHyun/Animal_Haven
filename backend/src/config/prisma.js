// We don't use 'pg' or 'adapter-pg' for prisma+postgres:// URLs
const { PrismaClient } = require('../generated/client');
require('dotenv').config();

const prisma = new PrismaClient();

module.exports = prisma;