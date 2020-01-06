'use strict'
const { deploy } = use('App/HelperFunctions/Deploy')


class DeployToProductionFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }  

    async deploy () {
       const { sender, ref } = this.request.all()
        if(ref.indexOf('stagging') > -1 ){
            deploy(this.response);
        }
    }
}
module.exports = DeployToProductionFeature
