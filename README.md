# Ekart - Ecommerce Application

Ekart is a full-fledged ecommerce application that allows users to browse products, manage wishlists, add items to the cart, post reviews, place orders, download order receipts, and cancel orders. The application is built with ReactJS for the front end and Node.js for the backend. The project is hosted on Netlify for the frontend and Render for the backend and uses a NoSQL MongdoDB to store all the required information for the application that needs to be persisted.

## Features

- View a wide range of products from the default list fetched from [Dummy JSON API](https://dummyjson.com).
- Wishlist products and add them to the shopping cart.
- Post reviews on products to share your opinions.
- Place orders and download order receipts for your records.
- Cancel orders if you change your mind.

## User Roles

1. **Anonymous:**
   - View all products.
   - View product reviews.

2. **Buyer:**
   - Wishlist products.
   - Add products to the shopping cart.
   - Post reviews on products.
   - Place orders.

3. **Seller:**
   - Create new products for sale.

4. **Admin:**
   - Create and delete user roles.

## Project Structure

- Frontend: [Ekart Web](https://main--ekart-web.netlify.app/)
- Backend Routes and Controllers: [/backend](https://ekart-server-app.onrender.com/api/products)
- Note: The backend server might take about 3 minutes to spin up again after 15 minutes of inactivity.

## Technologies Used

- Frontend: ReactJS, Redux for state management.
- Backend: Node.js.
- Hosting: Netlify (Frontend), Render (Backend).
- Database: Mongo Atlas

## Getting Started

- Running the application live:
1. Spin up the backend of the application from this [link](https://ekart-server-app.onrender.com/api/products)
2. Visit the frontend of the application [here](https://main--ekart-web.netlify.app/)
3. Click on 'Sign In', if you have not already created an account click on 'Register Now' and enter your information.
4. After signing in, you should be able to view all the products, add them to cart, wishlist items, place orders or add reviews.
5. Sign is not required to view products and reviews. 

- Running application in local:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Navigate to the `backend` directory and set up the backend.
4. Run the backend from the `backend` directory using `node app.js`.
5. Run the frontend from the root directory using `npm run start`.
6. Follow steps 3-5 from "Running the application in live" section above.

## Collaborators

- [Anant Moudgalya](https://github.com/anantmoudgalya) 
- [Gibran Myageri](https://github.com/gibran96) 
- [Vinu Baburaj](https://github.com/vinubaburaj)

## Contributing

We welcome contributions from the community. Please reach out to either of the collaborators for more information on contributing to this project.

## License

This project is made entirely for educational purposes and is not meant to be used as a proprietary application. 

## Acknowledgments

We would like to express our gratitude to the developers of [Dummy JSON API](https://dummyjson.com) for providing the default product list.

Feel free to explore the application and provide feedback. Happy shopping! 🛒🎉