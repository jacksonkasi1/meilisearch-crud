/**
 * Import required libraries and modules
 */
const { PrismaClient } = require('@prisma/client');

/**
 * Initialize Prisma client
 */
const prisma = new PrismaClient();

/**
 * Connect to the database using Prisma
 * @returns {Promise<void>} A Promise that resolves after the connection attempt
 */
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('🌐 Database connected successfully');
    } catch (error) {
        console.log('❌ Something went wrong. Database did not connect successfully');
    }
};

/**
 * Export the connectDB function for external use
 */
module.exports = connectDB;
