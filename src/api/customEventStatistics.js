import request from '@/utils/request'

// 新增用户数趋势图
export function channelSelectListVO(data) {
	let url = '';
	let baseUrl = `${process.env.VUE_APP_BASE_API}/gmEventData/selectNewUserCountByDate?startDate=${data.startDate}&endDate=${data.endDate}`;
	url = baseUrl + (data.channel ? ('&channel=' + data.channel) : ('')) + (data.event ? ('&event=' + data.event) : (''))
	return request({
		url,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}
