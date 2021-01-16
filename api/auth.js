import request from '../utils/http.js'

function userLogin(data) {
	return request({
		url: 'users/wxlogin',
		method: 'POST',
		data: {
			encrypetedData: data.encryptedData,
			rawData: data.rawDatam,
			iv: data.iv,
			signature: data.signature,
			code: data.code
		}
	})
}

export {
	userLogin
}