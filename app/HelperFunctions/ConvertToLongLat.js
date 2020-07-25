const Env = use('Env')
const axios = require('axios');
const apiKey = Env.get('GEOCODING_API_KEY')

async function convertToLongLat(address) {
  const queryFormattedAddress = address.replace(/\s/g, '+');
  const req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryFormattedAddress}&key=${apiKey}`)
  return req.data.results[0].geometry.location
}

module.exports = convertToLongLat