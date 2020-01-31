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
  user: 'oryjswyghzzfpx',
  host: 'ec2-52-71-122-102.compute-1.amazonaws.com',
  database: 'd2pubsbipujm0j',
  password: 'a5069d6230e2464b656f49cfaffc3ab2b5596869dc2e15fd2f386b99e41d4ecb',
  port: 5432,
}

module.exports = {
  db: process.env.NODE_ENV ? production_db : development_db,
  jwt: {
    appSecret: "solidAppSecret"
  },
  saltRounds: 10,
  port: process.env.NODE_ENV ? process.env.PORT : null,
  environment: process.env.ENVIRONMENT || 'development'
}
