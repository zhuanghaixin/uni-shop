// 定义基地址
const BASEURL = 'https://www.uinav.com/api/public/v1'
// 发送网络请求
function request({
	url,
	method = 'GET',
	data = {},
	header = {}
}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中'
		})
		uni.showNavigationBarLoading()

		//发送网络请求
		uni.request({
			url: BASEURL + url,
			method: method,
			data: data,
			header: header,
			success: res => {
				let code=res.data.meta.status.toString()
				if(code.startsWith('2')){
					resolve(res.data.message)
				}else{
          resolve(res.data.meta)
        }
			},
			fail: err => {
				console.log(err)
				reject(err)
			},
			complete: () => {
				// 不管成功还是失败都会执行
				// 关闭 loading
				uni.hideLoading()
				uni.hideNavigationBarLoading()
			}
		})
	})
}
export default request
