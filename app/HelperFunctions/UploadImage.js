const Env = use('Env')
const cloudinary = require('cloudinary');
const ImageUploadException = use('App/Exceptions/ImageUploadException')

cloudinary.config({
    cloud_name: Env.get('CLOUD_NAME'),
    api_key:  Env.get('CLOUDINARY_API_KEY'),
    api_secret: Env.get('CLOUDINARY_SECRET'),
    });

/**
 * 
 * @param {file} file  - file to be uploaded
 * 
 * @return {String} the url of the file uploaded
 */

async function uploadImage (file) {
    return new Promise(async (resolve, reject) => {

        try{

            let response = await cloudinary.uploader.upload(file.tmpPath, { folder: 'test'})

            resolve({status: true, url: response.secure_url })

        }catch(error){

            reject({status: false, url: error.message })
        }
    })
}

module.exports = { uploadImage }