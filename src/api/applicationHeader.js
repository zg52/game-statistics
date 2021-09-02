import request from '@/utils/request'

// 获取渠道下拉列表
export function getChannelSelectList() {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmDevice/getChannelSelectList`,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}