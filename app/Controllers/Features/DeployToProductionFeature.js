'use strict'
const { deploy } = use('App/HelperFunctions/Deploy')


class DeployToProductionFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }  

    async deploy () {
        try {
            const { sender, ref } = this.request.all()
            if(ref.indexOf('stagging') > -1 ){
                deploy(this.response);
            }
        } catch (deployError) {
            return this.response.status(500).send({
                message: "Interna Server Error"
            })
        }
       
    }
}
module.exports = DeployToProductionFeature
