const { prisma, prismaX } = require('@/prisma');
const debug = require('@/utils/debug');
const meiliSearchClient = require('@/meilisearch');
const { generateMockFoodData } = require('@/utils/faker/food');

module.exports = {
    addMenuItem: async (req) => {
        const { name, description, price, imageUrls, restaurantId = 1 } = req.body;

        debug.info(req.body);

        try {
            const createdMenu = await prisma.menuItem.create({
                data: {
                    name,
                    description,
                    price,
                    image: imageUrls,
                    restaurantId,
                },
            });

            // After successfully adding the menu item to the database,
            // also index it in MeiliSearch
            try {
                const index = meiliSearchClient.index('menuitems');
                await index.addDocuments([createdMenu], { primaryKey: 'id' }); // Specify the primary key as 'id'
            } catch (indexingError) {
                console.error('Error indexing menu:', indexingError);
                // You might want to handle this error based on your use case
            }

            return {
                success: true,
                message: 'Menu item added successfully',
                data: {
                    menu: createdMenu,
                },
            };
        } catch (error) {
            console.error('Error adding menu:', error);
            return {
                success: false,
                message: 'An error occurred while adding menu',
            };
        }
    },
    searchMenuItem: async (req) => {
        try {
            const { search } = req.query;
            const index = meiliSearchClient.index('menuitems');
            const searchResults = await index.search(search);

            // You can map searchResults.hits to match your application's data structure
            const mappedResults = searchResults.hits.map((hit) => ({
                id: hit.id,
                name: hit.name,
                description: hit.description,
            }));

            return {
                success: true,
                message: 'Search results retrieved successfully',
                data: {
                    menus: mappedResults,
                },
            };
        } catch (error) {
            console.error('Error searching for menu:', error);
            return {
                success: false,
                message: 'An error occurred while searching for menu',
            };
        }
    },
    searchMenuByPrisma: async (req) => {
        try {
            const { search } = req.query;
            const response = await prismaX.menuItem.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: search,
                            },
                        },
                        {
                            description: {
                                contains: search,
                            },
                        },
                    ],
                },
            });
            return {
                success: true,
                message: 'Search results retrieved successfully',
                data: {
                    menus: response,
                },
            };
        } catch (error) {
            console.error('Error searching for menu:', error);
            return {
                success: false,
                message: 'An error occurred while searching for menu',
            };
        }
    },
    deleteMenuItem: async (req) => {
        try {
            const { id } = req.params;

            // Retrieve the menu item before deleting it
            const deletedMenu = await prisma.menuItem.delete({
                where: {
                    id,
                },
            });

            // Delete the menu item from the MeiliSearch index
            try {
                const index = meiliSearchClient.index('menuitems');
                await index.deleteDocument(id);
            } catch (deletionError) {
                console.error('Error deleting menu from MeiliSearch:', deletionError);
                // You might want to handle this error based on your use case
            }

            return {
                success: true,
                message: 'Menu deleted successfully',
                data: {
                    menu: deletedMenu,
                },
            };
        } catch (error) {
            console.error('Error deleting menu:', error);
            return {
                success: false,
                message: 'An error occurred while deleting menu',
            };
        }
    },

    bulkInsert: async () => {
        try {
            const data = await generateMockFoodData({ max: 100 });

            // Create a deep copy of the data and remove the 'id' field
            const insertData = data.map((item) => {
                const newItem = { ...item }; // Create a copy of the object
                delete newItem.id; // Delete the 'id' field from the copied object
                return newItem;
            });

            const response = await prisma.menuItem.createMany({ data: insertData });
            await meiliSearchClient.index('menuitems').addDocuments(data, { primaryKey: 'id' });
            return {
                success: true,
                message: 'Bulk insert successful',
                data: {
                    response,
                    data,
                },
            };
        } catch (error) {
            console.error('Error bulk inserting menu:', error);
            return {
                success: false,
                message: 'An error occurred while bulk inserting menu',
            };
        }
    },
};
