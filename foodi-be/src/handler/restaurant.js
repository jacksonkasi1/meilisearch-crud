const { prisma } = require('@/prisma');
const debug = require('@/debug');

module.exports = {
    addRestaurant: async (req) => {
        /**
         * Add a new restaurant.
         * @param {object} req - Express request object.
         * @returns {object} Response object.
         */

        debug.info(req.body);

        try {
            const response = await prisma.restaurant.create({
                data: {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                },
            });

            return {
                success: true,
                message: 'Restaurant added successfully',
                data: {
                    restaurant: response,
                },
            };
        } catch (error) {
            console.error('Error adding restaurant:', error);
            return {
                success: false,
                message: 'An error occurred while adding restaurant',
            };
        }
    },
    getAllRestaurants: async () => {
        /**
         * Get a list of all restaurants.
         * @returns {object} Response object.
         */
        try {
            const restaurants = await prisma.restaurant.findMany();

            debug.info('Retrieved all restaurants');

            return {
                success: true,
                message: 'Retrieved all restaurants',
                data: {
                    restaurants,
                },
            };
        } catch (error) {
            console.error('Error retrieving restaurants:', error);
            return {
                success: false,
                message: 'An error occurred while retrieving restaurants',
            };
        }
    },
};
