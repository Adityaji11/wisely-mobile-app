const Redis = require('redis');

// Create a Redis client
const redisClient = Redis.createClient();

redisClient.on("error", (error) => console.error(`Redis Error: ${error}`));
redisClient.connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

module.exports = redisClient;