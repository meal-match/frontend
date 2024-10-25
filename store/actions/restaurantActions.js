import {
    MEAL_ERROR,
    SET_MEAL_DATA,
    SET_RESTAURANT_DATA,
    MEAL_LOADING
} from '@constants'

export const getMeal = async (getState) => {
    const { restaurant } = getState()
    if (restaurant.loading || Object.keys(restaurant.mealData).length !== 0) {
        return
    }
}

export const getMealOptions = async (dispatch, getState) => {
    const { restaurant } = getState()
    if (restaurant.loading || Object.keys(restaurant.mealData).length !== 0) {
        return
    }

    try {
        dispatch({
            type: MEAL_LOADING
        })
        // This will be used when the API is ready
        const request = await fetch(
            process.env.EXPO_PUBLIC_API_URL + '/restaurants',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (request.status === 200) {
            dispatch({
                type: SET_MEAL_DATA,
                payload: response
            })
        } else {
            dispatch({
                type: MEAL_ERROR,
                payload: response.message
            })
        }

        // This is a temporary solution until the API is ready
        // dispatch({
        //     type: SET_MEAL_DATA,
        //     payload: [
        //         {
        //             _id: { $oid: '66eed9f6d316197760f295ef' },
        //             restaurant: 'Chick-Fil-A',
        //             meals: [
        //                 {
        //                     entree: 'Chicken Sandwich',
        //                     entreeCustomizations: ['No Pickle', 'Extra Pickle'],
        //                     maxEntreeCustomizations: 1
        //                 },
        //                 {
        //                     entree: 'Grilled Chicken Sandwich',
        //                     entreeCustomizations: [
        //                         'Add Pickle',
        //                         'No Honey Roasted BBQ Sauce',
        //                         'No Lettuce',
        //                         'No Tomato'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Spicy Chicken Sandwich',
        //                     entreeCustomizations: ['No Pickle', 'Extra Pickle'],
        //                     maxEntreeCustomizations: 1
        //                 },
        //                 {
        //                     entree: '8 Count Nugget',
        //                     entreeCustomizations: [],
        //                     maxEntreeCustomizations: 0
        //                 },
        //                 {
        //                     entree: '8 Count Grilled Nuggets',
        //                     entreeCustomizations: [],
        //                     maxEntreeCustomizations: 0
        //                 }
        //             ],
        //             defaultDrinks: [
        //                 { drink: 'Cherry Coke' },
        //                 { drink: 'Coke' },
        //                 { drink: 'Coke Zero' },
        //                 { drink: 'Diet Coke' },
        //                 { drink: 'Dr Pepper' },
        //                 { drink: 'Strawberry Fanta' },
        //                 { drink: 'Powerade Blue' },
        //                 { drink: 'Sprite' },
        //                 { drink: 'Sweet Tea' },
        //                 { drink: 'Unsweet Tea' },
        //                 { drink: 'Half & Half Tea' },
        //                 { drink: 'Water Cup' }
        //             ],
        //             defaultSauces: [
        //                 'BBQ Sauce',
        //                 'Buffalo Sauce',
        //                 'CFA Sauce',
        //                 'Honey Mustard Sauce',
        //                 'Honey Roasted BBQ Sauce',
        //                 'Polynesian Sauce',
        //                 'Ranch',
        //                 'Siracha Sauce'
        //             ],
        //             defaultSides: [
        //                 { side: 'Fries', sideCustomizations: [] },
        //                 {
        //                     side: 'Side Salad',
        //                     sideCustomizations: [
        //                         'Avocado Lime Ranch',
        //                         'Berry Balsamic Vinagerette',
        //                         'Honey Mustard',
        //                         'Lite Italian',
        //                         'Ranch',
        //                         'Zesty Apple Cider Vinegar'
        //                     ],
        //                     maxSideCustomizations: 2
        //                 }
        //             ],
        //             defaultMaxSauces: 2,
        //             defaultMaxDrinkCustomizations: 0,
        //             defaultMaxEntreeCustomizations: 25,
        //             defaultMaxSideCustomizations: 0
        //         },
        //         {
        //             _id: { $oid: '66eedf6ad316197760f295f0' },
        //             restaurant: 'Panda Express',
        //             defaultDrinks: [],
        //             defaultSauces: [
        //                 'Chili Sauce',
        //                 'Hot Mustard',
        //                 'Soy Sauce',
        //                 'Sweet & Sour',
        //                 'Teriyaki',
        //                 'No Sauce'
        //             ],
        //             defaultSides: [
        //                 { side: 'White Rice', sideCustomizations: [] },
        //                 { side: 'Super Greens', sideCustomizations: [] },
        //                 { side: 'Fried Rice', sideCustomizations: [] },
        //                 { side: 'Chow Mein', sideCustomizations: [] },
        //                 {
        //                     side: 'Half White Rice & Half Super Greens',
        //                     sideCustomizations: []
        //                 },
        //                 {
        //                     side: 'Half White Rice & Half Fried Rice',
        //                     sideCustomizations: []
        //                 },
        //                 {
        //                     side: 'Half White Rice & Half Chow Mein',
        //                     sideCustomizations: []
        //                 },
        //                 {
        //                     side: 'Half Fried Rice & Half Super Greens',
        //                     sideCustomizations: []
        //                 },
        //                 {
        //                     side: 'Half Chow Mein & Half Super Greens',
        //                     sideCustomizations: []
        //                 },
        //                 {
        //                     side: 'Half Fried Rice & Half Chow Mein',
        //                     sideCustomizations: []
        //                 }
        //             ],
        //             meals: [
        //                 { entree: 'Orange Chicken', entreeCustomizations: [] },
        //                 { entree: 'Broccoli Beef', entreeCustomizations: [] },
        //                 { entree: 'Beijing Beef', entreeCustomizations: [] },
        //                 {
        //                     entree: 'Honey Sesame Chicken',
        //                     entreeCustomizations: []
        //                 }
        //             ],
        //             defaultMaxSauces: { $numberInt: '6' }
        //         },
        //         {
        //             _id: { $oid: '66eef695d316197760f295f2' },
        //             restaurant: "Julia's Market",
        //             meals: [
        //                 {
        //                     entree: 'Grilled Cheese',
        //                     entreeCustomizations: [
        //                         'No American Cheese',
        //                         'No Swiss Cheese',
        //                         'No Cheddar Cheese'
        //                     ],
        //                     maxEntreeCustomizations: { $numberInt: '25' }
        //                 },
        //                 {
        //                     entree: 'Grilled Cheese on Gluten Free Bread',
        //                     entreeCustomizations: [
        //                         'No American Cheese',
        //                         'No Swiss Cheese',
        //                         'No Cheddar Cheese'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Chicken Pesto',
        //                     entreeCustomizations: [
        //                         'No Provolone',
        //                         'No Tomato',
        //                         'No Pesto'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Chicken Pesto on Gluten Free Bread',
        //                     entreeCustomizations: [
        //                         'No Provolone',
        //                         'No Tomato',
        //                         'No Pesto'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Turkey Club',
        //                     entreeCustomizations: [
        //                         'No Bacon',
        //                         'No Swiss',
        //                         'No Lettuce',
        //                         'No Tomato',
        //                         'No Avocado',
        //                         'No Honey Mustard'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Turkey Club on Gluten Free Bread',
        //                     entreeCustomizations: [
        //                         'No Bacon',
        //                         'No Swiss',
        //                         'No Lettuce',
        //                         'No Tomato',
        //                         'No Avocado',
        //                         'No Honey Mustard'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Italian',
        //                     entreeCustomizations: [
        //                         'No Ham',
        //                         'No Salami',
        //                         'No Pepperoni',
        //                         'No Provolone',
        //                         'No Lettuce',
        //                         'No Tomato',
        //                         'No Mayo',
        //                         'No Deli Dressing'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Philly Cheese Steak',
        //                     entreeCustomizations: [
        //                         'No Roast Beef',
        //                         'No American Cheese',
        //                         'No Onion/Pepper Mix'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Chicken Caesar Salad',
        //                     entreeCustomizations: [
        //                         'No Chicken',
        //                         'No Parmesan Cheese',
        //                         'No Dressing'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Blazing Buffalo Chicken Salad',
        //                     entreeCustomizations: [
        //                         'No Buffalo Chicken',
        //                         'No Tomato',
        //                         'No Shredded Colby Jack'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Pepperoni Flatbread',
        //                     entreeCustomizations: []
        //                 },
        //                 {
        //                     entree: 'Chicken Bacon Ranch Flatbread',
        //                     entreeCustomizations: [
        //                         'No Ranch',
        //                         'No Chicken',
        //                         'No Bacon',
        //                         'No Colby Jack',
        //                         'No Tomatoes'
        //                     ]
        //                 },
        //                 {
        //                     entree: 'Southwest Chicken Flatbread',
        //                     entreeCustomizations: [
        //                         'No Ranch',
        //                         'No Colby Jack',
        //                         'No Chipotle Chicken',
        //                         'No Jalapenos',
        //                         'No Tomato, Corn, and Black Bean Mix',
        //                         'No Chgipotle Mayo'
        //                     ]
        //                 }
        //             ],
        //             defaultDrinks: ['Bottled Water', 'No Drink'],
        //             defaultSauces: [],
        //             defaultSides: [
        //                 { side: 'Chips', sideCustomizations: [] },
        //                 { side: 'Fruit', sideCustomizations: [] },
        //                 { side: 'Side Salad', sideCustomizations: [] },
        //                 { side: 'No Side', sideCustomizations: [] }
        //             ],
        //             defaultMaxSauces: { $numberInt: '0' }
        //         },
        //         {
        //             _id: { $oid: '6713427763a21002551ebd68' },
        //             restaurant: "Dunkin' Donuts",
        //             meals: [
        //                 {
        //                     entree: 'Sausage, Egg, and Cheese',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Bacon, Egg, and Cheese',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Turkey Sausage, Egg, and Cheese',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Ham, Egg, and Cheese',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Veggie Egg White',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Egg and Cheese Wake-up Wrap',
        //                     entreeCustomizations: ['Croissant', 'Sourdough']
        //                 },
        //                 {
        //                     entree: 'Chicken Biscuit',
        //                     entreeCustomizations: ['Sourdough', 'Croissant']
        //                 },
        //                 {
        //                     entree: 'Sausage Biscuit',
        //                     entreeCustomizations: ['Sourdough', 'Croissant']
        //                 },
        //                 {
        //                     entree: 'Bagel',
        //                     entreeCustomizations: [
        //                         'Cream Cheese',
        //                         'No Cream Cheese'
        //                     ]
        //                 }
        //             ],
        //             defaultDrinks: [
        //                 'Iced Coffee',
        //                 'Hot Coffee',
        //                 'Bottled Water'
        //             ],
        //             defaultMaxSauces: { $numberInt: '0' },
        //             defaultSauces: [],
        //             defaultSides: [
        //                 { side: 'Hashbrowns', sideCustomizations: [] },
        //                 { side: 'No Hashbrowns', sideCustomizations: [] }
        //             ]
        //         },
        //         {
        //             _id: { $oid: '67134e6963a21002551ebd69' },
        //             restaurant: 'Presidential Village',
        //             meals: [
        //                 {
        //                     entree: 'Chicken Bacon Ranch Panini',
        //                     entreeCustomizations: []
        //                 },
        //                 {
        //                     entree: 'Ham and Swiss Panini',
        //                     entreeCustomizations: []
        //                 },
        //                 { entree: 'Grilled Cheese', entreeCustomizations: [] },
        //                 { entree: 'Turkey Club', entreeCustomizations: [] },
        //                 { entree: 'Caesar Salad', entreeCustomizations: [] },
        //                 { entree: 'BLT Salad', entreeCustomizations: [] },
        //                 { entree: 'Pepperoni Pizza', entreeCustomizations: [] },
        //                 {
        //                     entree: 'Mac and Cheese',
        //                     entreeCustomizations: [
        //                         'Bacon',
        //                         'Chicken',
        //                         'No Protein'
        //                     ]
        //                 }
        //             ],
        //             defaultMaxSauces: { $numberInt: '0' },
        //             defaultDrinks: [
        //                 'Bottled Water',
        //                 'Fountain Drink',
        //                 'No Drink'
        //             ],
        //             defaultSauces: [],
        //             defaultSides: [
        //                 { side: 'Chips', sideCustomizations: [] },
        //                 { side: 'No Side', sideCustomizations: [] }
        //             ]
        //         }
        //     ]
        // })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setRestaurantData =
    (restaurantData) => async (dispatch, getState) => {
        const { restaurant } = getState()
        if (restaurant.loading) {
            return
        }
        try {
            dispatch({
                type: SET_RESTAURANT_DATA,
                payload: restaurantData
            })
        } catch (error) {
            dispatch({
                type: MEAL_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }
