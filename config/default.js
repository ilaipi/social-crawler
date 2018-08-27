module.exports = {
  app: {
    name: 'ent'
  },
  cache: {
    redis: {
      db: 0,
      ttl: 1800
    },
    memory: {
      max: 100,
      ttl: 600
    }
  }
};
