// const bcrypt = require('bcryptjs')

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

// const Restaurant = require("../restaurant");

// const User = require('../users')

// const db = require("../../config/mongoose");

// const restaurantList = require("./restaurant.json");

// const SEED_USER1 = {
//   name: 'Jay',
//   email: 'user1@example.com',
//   password: '12345678'
// }

// const SEED_USER2 = {
//   name: 'Mike',
//   email: 'user2@example.com',
//   password: '12345678'
// }

// db.once("open", () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER1.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER1.name,
//       email: SEED_USER1.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
//       return Promise.all(Array.from(
//         { length: 3 },
//         (_, i) => Restaurant.create({
//         name: `${restaurantList.results[i].name}`,
//         name_en: `${restaurantList.results[i].name_en}`,
//         category: `${restaurantList.results[i].category}`,
//         image: `${restaurantList.results[i].image}`,
//         location: `${restaurantList.results[i].location}`,
//         phone: `${restaurantList.results[i].phone}`,
//         google_map: `${restaurantList.results[i].google_map}`,
//         rating: `${restaurantList.results[i].rating}`,
//         description: `${restaurantList.results[i].description}`,
//         });
//       ))
//     })
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER1.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER2.name,
//       email: SEED_USER2.email,
//       password: hash
//     }))
//     .then(user => {
//       const userId = user._id
//       return Promise.all(Array.from(
//         { length: 3 },
//         (_, i) => Restaurant.create({
//         name: `${restaurantList.results[i].name}`,
//         name_en: `${restaurantList.results[i].name_en}`,
//         category: `${restaurantList.results[i].category}`,
//         image: `${restaurantList.results[i].image}`,
//         location: `${restaurantList.results[i].location}`,
//         phone: `${restaurantList.results[i].phone}`,
//         google_map: `${restaurantList.results[i].google_map}`,
//         rating: `${restaurantList.results[i].rating}`,
//         description: `${restaurantList.results[i].description}`,
//         });
//       ))
//     })
//     .then(() => {
//       console.log("done");  
//       process.exit()
//     })
// });




//---------------------------------
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Include package and model
const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require("./restaurant.json");
const db = require('../../config/mongoose')
const SEED_USERS = [
  {
    name: 'Jay',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'Mike',
    email: 'user2@example.com',
    password: '12345678'
  }
]

// Generate seeds
db.once('open', () => {
  const restaurants = restaurantList.results
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USERS[0].password, salt))
    .then(hash => {
      SEED_USERS.forEach(SEED_USER => SEED_USER.password = hash)
      return User.insertMany(SEED_USERS)
    })
    .then(users => {
      return Promise.all(restaurants.map((restaurant, index) => {
        if (index < 3) {
          restaurant.userId = users[0]._id
          return Restaurant.create(Object.assign({}, restaurant))
        }
        if (index < 6) {
          restaurant.userId = users[1]._id
          return Restaurant.create(Object.assign({}, restaurant))
        }
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})