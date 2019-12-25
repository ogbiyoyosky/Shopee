'use strict'
const FetchMetaDatumFeature = use('App/Controllers/Features/FetchMetaDatumFeature')
const FetchStateByCountryIdFeature = use('App/Controllers/Features/FetchStateByCountryIdFeature')
const FetchProvinceByStateIdFeature = use('App/Controllers/Features/FetchProvinceByStateIdFeature')
const CountryCode = use('App/Models/CountryCode')

class MetadatumController {
    async showMetadata({
        request,
        response
    }) {
        try {
            const country_code = await CountryCode.query()
            .select('id','dial_code', 'name', 'code')
            .fetch()
            const serialized_country = country_code.toJSON()
    
            const meta = {
              countries: serialized_country
            }
    
            return response.status(200).send({
              message: "Successfully fetch all Metadata",
              status_code: 200,
              status: "Success",
              result: meta
            })
    
          } catch (FetchMetaDatumFeatureError) {
                  console.log("FetchMetaDatumFeatureError", FetchMetaDatumFeatureError)
                  return response.status(500).send({
                      status: "Fail",
                      message: "Internal Server Error",
                      status_code: 500
                  })
          } 
    }
    async fetchState({
        request,
        response,
        params:{
            country_id
        }
    }) {
        return new FetchStateByCountryIdFeature(request,response).fetchState(country_id)
    }
    async fetchProvince({
        request,
        response,
        params: {
            state_id
        }
    }) {
        return new FetchProvinceByStateIdFeature(request,response).fetchProvince(state_id)
    }
}

module.exports = MetadatumController
