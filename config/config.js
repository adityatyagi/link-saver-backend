const dotnev = require('dotenv');
dotnev.config();

const development_db = {
  user: 'aditya',
  host: 'localhost',
  database: 'linksaver',
  password: 'toor',
  port: 5432,
}

const production_db = {
  user: 'djnkjbkgfjzuwj',
  host: 'ec2-3-214-53-225.compute-1.amazonaws.com',
  database: 'd5e8nh0g2jj8h8',
  password: '5a08b21f39998d9c35cb9dfeb19dfa6c481db4ee8a0892552ae3dcef61c8a271',
  port: 5432,
}

module.exports = {
  db: process.env.NODE_ENV ? production_db : development_db,
  jwt: {
    appSecret: "solidAppSecret"
  },
  saltRounds: 10,
  port: process.env.NODE_ENV ? process.env.PORT : null
}
