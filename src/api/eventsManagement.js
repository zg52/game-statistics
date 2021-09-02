import request from '@/utils/request'

// 获取List
export function getGmEvent(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmEvent?current=${data.current}&size=${data.size}`,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}

// 添加事件
export function addGmEvent(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmEvent?eventId=${data.eventId}&eventType=${data.eventType}&name=${data.name}`,
		method: 'post',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}

// 编辑事件
export function editGmEvent(data) {
  return request({
    url: `${process.env.VUE_APP_BASE_API}/gmEvent/${data.id}/audit?id=${data.id}&name=${data.name}`,
    method: 'post',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    }
  })
}