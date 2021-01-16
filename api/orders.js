import request from '../utils/http.js'

function orderPay(number) {
	return request({
		url: '/my/orders/req_unifiedorder',
		method: 'POST',
		headers: {
			Authorization: ''
		},
		data: {
			order_number: number
		}
	})
}

function ordersCreate(data) {
	return request({
		url: '/my/orders/create',
		method: 'POST',
		headers: {
			Authorization: ''
		},
		data: {
			order_price: data.order_price,
			consignee_addr: data.consignee_addr,
			goods: data.goods
		}
	})
}

function ordersChkOrder(number) {
	return request({
		url: '/my/orders/chkOrder',
		method: 'POST',
		headers: {
			Authorization: ''
		},
		data: {
			order_number: number
		}
	})
}

function ordersAll(type) {
	return request({
		url: '/my/orders/all',
		headers: {
			Authorization: ''
		},
		data: {
			type: type
		}
	})
}

export {
	orderPay,
	ordersCreate,
	ordersChkOrder,
	ordersAll
}
