/* eslint-disable no-undef */
const { PrismaClient } = require('@prisma/client');
const { withAccelerate } = require('@prisma/extension-accelerate');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    log: ['warn', 'error'],
});

const prismaX = new PrismaClient().$extends(withAccelerate());

module.exports = { prisma, prismaX };
