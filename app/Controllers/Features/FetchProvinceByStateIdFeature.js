'use strict'
const Province = use('App/Models/Province')


class FetchProvinceByStateIdFeature {
    constructor (  request, response  ) {
        this.request = request
        this.response = response
    }

    async fetchProvince(state_id) {
      try {
        const provinces = await Province.query()
        .select('id','province_label')
        .where('state_id', state_id)
        .fetch()

        return this.response.status(200).send({
          message: "Successfully fetch all province",
          status_code: 200,
          status: "Success",
          result: provinces
        })

      } catch (FetchProvinceByStateIdFeatureError) {
              console.log("FetchProvinceByStateIdFeatureError", FetchProvinceByStateIdFeatureError)
              return this.response.status(500).send({
                  status: "Fail",
                  message: "Internal Server Error",
                  status_code: 500
              })
      } 
    }

}
module.exports = FetchProvinceByStateIdFeature