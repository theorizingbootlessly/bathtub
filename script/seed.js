'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'red duck',
      description: 'red duck',
      color: 'red',
      price: 10,
      imgURL:
        'https://images.blogthings.com/whatcolorrubberduckieareyouquiz/red.jpg',
      quantity: 5
    }),
    Product.create({
      name: 'yellow duck',
      description:
        'Once, there was a yellow duck. He was smart. But, he died. The end',
      color: 'yellow',
      price: 200,
      imgURL:
        'data:image/webp;base64,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',
      quantity: 20
    }),
    Product.create({
      name: 'green ninja duck',
      description: 'In Japan, Ninja fought Samurais and yakuza!',
      color: 'green',
      price: 500,
      imgURL:
        'https://images-na.ssl-images-amazon.com/images/I/514yK7yFnoL._SL1001_.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'pink duck',
      description: 'once there was a pink duck. The end',
      color: 'yellow',
      price: 200,
      imgURL:
        'https://images-na.ssl-images-amazon.com/images/I/510tuyL1dAL._SL1000_.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'real duck',
      description: '1',
      color: 'real',
      price: 1,
      imgURL:
        'https://cdn.shopify.com/s/files/1/1365/2497/products/12547-DuckMask-Ducks_1600x.jpg?v=1520535208',
      quantity: 20
    }),
    Product.create({
      name: 'white duck',
      description: '1',
      color: 'white',
      price: 9,
      imgURL: 'https://www.purelypoultry.com/images/pekin-ducklings_01.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'black duck',
      description: '1',
      color: 'black',
      price: 15,
      imgURL:
        'https://www.cacklehatchery.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/2/0/20171202_002257.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'batman duck',
      description: '1',
      color: 'batman',
      price: 10,
      imgURL:
        'https://3b3832722e63ef13df5f-655e11a96f14b2c941c4bc34ef58f583.ssl.cf2.rackcdn.com/product_images_new/TS_DC_Comics_Batman_Bath_Duck_4_99_Lifestyle-617-662.jpg',
      quantity: 20
    }),

    Product.create({
      name: 'blue duck',
      description: 'blue duck',
      color: 'blue',
      price: 10,
      imgURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK_BfHJ0MB8bvQDJcWXcwe5ExyZrCnxbQIbI_4dcTBBk_EXLBE',
      quantity: 5
    }),
    Product.create({
      name: 'rosie duck',
      description:
        'Once, there was a yellow duck. He was smart. But, he died. The end',
      color: 'temptation',
      price: 5000,
      imgURL:
        'https://www.amsterdamduckstore.com/wp-content/uploads/2017/03/Rosie-the-Riveter-Rubber-Duck-Amsterdam-Duck-Store.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'computer geek duck',
      description: 'In Japan, Ninja fought Samurais and yakuza!',
      color: 'green',
      price: 500,
      imgURL:
        'https://cdn7.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/246/3856/geek__37110.1516998201.png?c=2&imbypass=on',
      quantity: 20
    }),
    Product.create({
      name: 'donald trump duck',
      description: 'once there was a pink duck. The end',
      color: 'yellow',
      price: 200,
      imgURL:
        'https://www.amsterdamduckstore.com/wp-content/uploads/2017/07/Trump-rubber-duck-Amsterdam-Duck-Store.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'donald duck',
      description: '1',
      color: 'real',
      price: 55,
      imgURL: 'https://lumiere-a.akamaihd.net/v1/images/image_d1ddaa67.jpeg',
      quantity: 20
    }),
    Product.create({
      name: 'buff duck',
      description: '1',
      color: 'buff',
      price: 0.01,
      imgURL:
        'https://cdn7.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/307/4245/muscle__52045.1520090269.png?c=2&imbypass=on',
      quantity: 20
    }),
    Product.create({
      name: 'superman duck',
      description: '1',
      color: 'black',
      price: 0.01,
      imgURL:
        'https://www.virginmegastore.ae/medias/sys_master/root/hdb/h41/9103072886814/338703-main.jpg',
      quantity: 20
    }),
    Product.create({
      name: 'terminator duck',
      description: '1',
      color: 'elvis',
      price: 0.01,
      imgURL:
        'http://static1.squarespace.com/static/59698a7d29687fd47a2a7c52/5a4a93c2c83025f844a75e02/59951989501a10c1ef0d7b0e/1514841970529/?format=1000w',
      quantity: 20
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
