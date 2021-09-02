import request from '@/utils/request'

// 新增用户数趋势图
export function selectNewUserCountByDate(data) {
	let url = '';
	let baseUrl = `${process.env.VUE_APP_BASE_API}/gmDevice/selectNewUserCountByDate?startDate=${data.startDate}&endDate=${data.endDate}`;
	url = baseUrl + (data.channel ? ('&channel=' + data.channel) : ('')) + (data.version ? ('&version=' + data.version) : (''))
	return request({
		url,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}