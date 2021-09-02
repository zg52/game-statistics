import request from '@/utils/request'

// 新增用户数趋势图
export function getGmEventData(data) {
	let url = '';
	let baseUrl = `${process.env.VUE_APP_BASE_API}/gmEventData/?current=${data.current}&size=${data.size}&startTime=${data.startDate}&endTime=${data.endDate}`;
	url = baseUrl + (data.channel ? ('&version=' + data.version) : ('')) + (data.event ? ('&event=' + data.event) : (''))
	return request({
    url,
    method: 'get',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  })
}