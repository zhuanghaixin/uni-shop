import request from '../utils/http.js'

function goodsSearch(params){
	return request({
		url:'/goods/search',
		data:{
			query:params.query,
			pagenum:params.pagenum,
			pagesize:params.pagesize
		}
	})
}

function goodsDetail(id){
	return request({
		url:`goods/detail?goods_id=${id}`
	})
}
function goodsList(id){
	return request({
		url:`goods/goodslist?goods_ids=${id}`
	})
	
}
export{
	goodsSearch,
	goodsDetail,
	goodsList
}