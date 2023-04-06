// local settings
const debugconst = true;

function debug(message) {
  if (debugconst) console.log(message);
}

module.exports = { debug };