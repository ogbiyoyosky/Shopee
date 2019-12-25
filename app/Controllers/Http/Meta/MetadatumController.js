'use strict'
const FetchMetaDatumFeature = use('App/Controllers/Features/FetchMetaDatumFeature')
const FetchStateByCountryIdFeature = use('App/Controllers/Features/FetchStateByCountryIdFeature')
const FetchProvinceByStateIdFeature = use('App/Controllers/Features/FetchProvinceByStateIdFeature')

class MetadatumController {
    async showMetadata({
        request,
        response
    }) {
        console.log('here')
       const MetaDataFeature = new FetchMetaDatumFeature(request,response).fetchMetaDatum()
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
