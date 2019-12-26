'use strict'
const CountryCode = use('App/Models/CountryCode')


class FetchMetaDatumFeature {
    constructor (  request, response  ) {
        this.request = request
        this.response = response
      }

    async fetchMetaDatum() {
      try {
        const country_code = await CountryCode.query()
        .select('id','dial_code', 'name', 'code')
        .fetch()
        const serialized_country = country_code.toJSON()

        const meta = {
          countries: serialized_country
        }
        console.log('here2')
        return this.response.status(200).send({
          message: "Successfully fetch all Metadata",
          status_code: 200,
          status: "Success",
          result: meta
        })

      } catch (FetchMetaDatumFeatureError) {
              console.log("FetchMetaDatumFeatureError", FetchMetaDatumFeatureError)
              return this.response.status(500).send({
                  status: "Fail",
                  message: "Internal Server Error",
                  status_code: 500
              })
      } 
    }

}
module.exports = FetchMetaDatumFeature