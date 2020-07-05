'use strict'
const FetchProfileFeature = use('App/Controllers/Features/FetchProfileFeature')
const EditProfileFeature = use('App/Controllers/Features/EditProfileFeature')
class ProfileController {
    async fetchProfile ({
        request,
        response,
        auth,
    }) {
        return new FetchProfileFeature(request,response, auth).fetchProfile()
    }

    async editProfile ({
        request,
        response,
        auth,
    }) {
        return new EditProfileFeature(request,response, auth).editProfile()
    }
}

module.exports = ProfileController
