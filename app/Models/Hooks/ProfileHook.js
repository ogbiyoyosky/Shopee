'use strict'

const ProfileHook = exports = module.exports = {}

ProfileHook.capitalizeFirstName = async (profile) => {
    function transformFirstName(firstname) {
        firstname = firstname.toLowerCase().split()
        for (var letter = 0; letter < firstname.length; letter++) {
          firstname[letter] = firstname[letter].charAt(0).toUpperCase() + firstname[letter].slice(1)
        }
        return firstname.join()
    }
    profile.first_name = transformFirstName(profile.first_name)
}

ProfileHook.capitalizeLastName = async (profile) => {
    function transformLastName(lastname) {
        lastname = lastname.toLowerCase().split('-')
        for (var letter = 0; letter < lastname.length; letter++) {
          lastname[letter] = lastname[letter].charAt(0).toUpperCase() + lastname[letter].slice(1)
        }
        return lastname.join('-')
    }
    profile.last_name = transformLastName(profile.last_name)
}



