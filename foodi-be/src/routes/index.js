const express = require('express');
const menuController = require('@/controller/menu');
const restaurantController = require('@/controller/restaurant');

const router = express.Router();

// ** FOOD ROUTES **
// Route for adding a new menu item
router.post('/menu/add', menuController.addMenuItem);
// Route for getting menu items by search
router.get('/menu/search', menuController.searchMenuItem);
// Route for getting all menu items by search using Prisma
router.get('/menu/search-by-prisma', menuController.searchMenuByPrisma);
// Route for deleting a menu item
router.delete('/menu/delete', menuController.deleteMenuItem);
// Route for bulk inserting menu items
router.get('/menu/bulk-insert', menuController.bulkInsert);

// ** RESTAURANT ROUTES **
// Route for adding a new restaurant
router.post('/restaurant/add', restaurantController.addRestaurant);
// Route for getting all restaurants
router.get('/restaurant/all', restaurantController.getAllRestaurants);

module.exports = router;
