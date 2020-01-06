'use strict'
const { deploy } = use('App/HelperFunctions/Deploy')


class DeployToProductionFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }  

    async deploy() {
        try {
          
            const {  ref } = this.request.all()
            if(ref.indexOf('stagging') > -1 ){
             await deploy(this.response);

             return this.response.status(200).send({
                 message: "Successfully Deployed"
             })
  
            }
        } catch (deployError) {
            console.log('deploy error', deployError)
            return this.response.status(500).send({
                message: "Internal Server Error"
            })
        }
       
    }
}
module.exports = DeployToProductionFeature
