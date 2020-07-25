'use strict'

const axios = require('axios')

function customGetRequest(apiEndpoint, paramOptions) {
	// console.log('headers -> ', paramOptions);
	
	return axios.get(apiEndpoint, paramOptions)
	.then(response => { 
		// console.log(response.data)
		return response.data
	})
	.catch(error => {
		console.log('Get Request Error ', error.response)
		return error.response
	});

}

function customPostRequest(apiEndpoint, postData, paramOptions) {
	//console.log('headers ', paramOptions);
   // console.log('data ', postData);
	
	return axios.post(apiEndpoint, postData, paramOptions)
	.then(response => { 
		//console.log('Good response', response)
		return response.data
	})
	.catch(error => {
		//console.log('Post Request Error ', error)
		console.log('Post Request Error Response ', error)
		throw new Error()
	});

}

module.exports = { customGetRequest, customPostRequest }