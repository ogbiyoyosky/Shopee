'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
    static boot() {
        super.boot()

        this.addHook('beforeSave', async (StoreInstance) => {

			if (StoreInstance.store_name) {
				// Capitalize first letter of each word
				StoreInstance.store_name = StoreInstance.store_name
					.toLowerCase()
					.split(' ')
					.map(word => word.charAt(0).toLowerCase() + word.slice(1))
					.join(' ');

				// Replace spaces with hypen
				StoreInstance.store_name = StoreInstance.store_name.replace(/\s+/g, '-')
			}
		})
    }
}

module.exports = Store
