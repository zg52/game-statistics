import request from '@/utils/request'

// 获取List
export function getGmChannel(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmChannel?current=${data.current}&size=${data.size}`,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}

// 编辑渠道名称
export function editGmChannelName(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmChannel/${data.id}/audit?id=${data.id}&name=${data.name}`,
		method: 'post',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}