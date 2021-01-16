import request from '../utils/http.js'

function categories() {
	return	request({
			url:'/categories'
		})
}

export {
	categories
}
