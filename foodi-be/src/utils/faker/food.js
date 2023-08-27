// food.js
const { faker } = require('@faker-js/faker');

const generateMockFoodData = ({ max }) => {
    max = max || 100;

    const foodData = [];

    for (let i = 0; i < max; i++) {
        const foodItem = {
            id: faker.datatype.uuid(),
            restaurantId: 1,
            name: faker.lorem.words(),
            description: faker.lorem.sentence(),
            price: parseFloat(faker.commerce.price()),
            image: [
                faker.image.urlPicsumPhotos(),
                faker.image.urlPicsumPhotos(),
            ],
        };

        foodData.push(foodItem);
    }

    return foodData;
};

// Export the function as an object property
module.exports = {
    generateMockFoodData,
};
