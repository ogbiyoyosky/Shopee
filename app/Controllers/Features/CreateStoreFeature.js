'use strict'
const Store = use('App/Models/Store')

class CreateStoreFeature {
    constructor (  request, response, auth ) {
        this.request = request
        this.response = response
        this.auth = auth
    }

    async createStore() {
        try {
          const {
            store_name,
            country_id,
            state_id,
            province_id,
            sell_outside_state,
            sell_outside_province
          } = this.request.all()
          const user_id =this.auth.current.user.id

          const store = new Store()
          store.store_name = store_name
          store.user_id = user_id
          store.country_id = country_id
          store.state_id = state_id
          store.province_id = province_id
          store.sell_outside_province = sell_outside_province
          store.sell_outside_state = sell_outside_state
          await store.save()

          return this.response.status(200).send({
            message: "New store successfully created.",
            status_code: 200,
            status: 'Success',
          })
    
		} catch (createStoreError) {
            console.log("createStoreError", createStoreError)
            return this.response.status(500).send({
                status: "Fail",
                message: "Internal Server Error",
                status_code: 500
            })
		} 
    }

}
module.exports = CreateStoreFeature