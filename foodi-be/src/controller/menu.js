const HttpStatus = require('http-status-codes');
const catchAsyncError = require('@/middleware/catchAsyncError');
const menu = require('@/handler/menu');

module.exports = {
    addMenuItem: catchAsyncError(async (req, res, next) => {
        const response = await menu.addMenuItem(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.CREATED).json(response);
    }),
    searchMenuItem: catchAsyncError(async (req, res, next) => {
        const response = await menu.searchMenuItem(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.OK).json(response);
    }),
    searchMenuByPrisma: catchAsyncError(async (req, res, next) => {
        const response = await menu.searchMenuByPrisma(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.OK).json(response);
    }),
    deleteMenuItem: catchAsyncError(async (req, res, next) => {
        const response = await menu.deleteMenuItem(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.OK).json(response);
    }),
    bulkInsert: catchAsyncError(async (req, res, next) => {
        const response = await menu.bulkInsert(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.OK).json(response);
    })

};
