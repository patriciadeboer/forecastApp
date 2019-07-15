const { db, Cities, Attractions } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    const chicago = await Cities.create({
      city: 'Chicago',
      country: 'US',
    });

    const amsterdam = await Cities.create({
      city: 'Amsterdam',
      country: 'NL',
    });

    const orlando = await Cities.create({
      city: 'Orlando',
    });

    const athens = await Cities.create({
      city: 'Athens',
      country: 'GR'
    });

    const giza = await Cities.create({
      city: 'Giza',
      country: 'EG',
    });

    const istanbul = await Cities.create({
      city: 'Istanbul',
      country: 'TR',
    });

    const newOrleans = await Cities.create({
      city: 'New Orleans',
      country: 'US',
    });

    const universal = await Attractions.create({
      name: 'Universal Studios',
    });

    const pyramids = await Attractions.create({
      name: 'Pyramids of Giza',
    });

    await universal.setLocation(orlando)
    await pyramids.setLocation(giza)

    //console.log('hi Object>', Object.keys(universal.__proto__));

  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding Success');
      db.close();
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
