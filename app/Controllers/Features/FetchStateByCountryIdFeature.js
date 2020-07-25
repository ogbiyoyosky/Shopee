'use strict'
const State = use('App/Models/State')


class FetchStateByCountryIdFeature {
    constructor (  request, response  ) {
        this.request = request
        this.response = response
      }

    async fetchState(country_id) {
      try {
        const states = await State.query()
        .select('id','state_label')
        .where('country_id', country_id)
        .fetch()

        return this.response.status(200).send({
          message: "Successfully fetch all States",
          status_code: 200,
          status: "Success",
          result: states
        })

      } catch (FetchStateByCountryIdFeatureError) {
              console.log("FetchStateByCountryIdFeatureError", FetchStateByCountryIdFeatureError)
              return this.response.status(500).send({
                  status: "Fail",
                  message: "Internal Server Error",
                  status_code: 500
              })
      } 
    }

}
module.exports = FetchStateByCountryIdFeature