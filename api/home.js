import request from '../utils/http.js'

function homeSwiper(){
	return request({
		url:'/home/swiperdata',
	})
}
function homeCatItems(){
	return request({
		url:'/home/catitems'
	})	
}
function homeFloorData(){
	return request({
		url:'/home/floordata'
	})
}
export {
	homeSwiper,
	homeCatItems,
	homeFloorData
}