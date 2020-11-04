const redis = require("redis");
const client = redis.createClient();

client.on('connect', function () {
  console.log('redis connected');
});

client.on("error", function (error) {
  console.error(error);
});

async function set() {
  try {
    return client.set("key", "value");
  } catch (err) {
    throw Error(err);
  }
}
async function get() {
  try {
    return client.get("key");
  } catch (err) {
    throw Error(err);
  }
}

module.exports = {
    set,
    get,
}
