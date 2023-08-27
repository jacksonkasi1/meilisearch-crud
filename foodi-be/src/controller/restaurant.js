const HttpStatus = require('http-status-codes');
const catchAsyncError = require('@/middleware/catchAsyncError');
const restaurant = require('@/handler/restaurant');

module.exports = {
    addRestaurant: catchAsyncError(async (req, res, next) => {
        const response = await restaurant.addRestaurant(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.CREATED).json(response);
    }),
    getAllRestaurants: catchAsyncError(async (req, res, next) => {
        const response = await restaurant.getAllRestaurants(req, res, next);
        if (!response) {
            return;
        }
        res.status(HttpStatus.StatusCodes.OK).json(response);
    })
};
