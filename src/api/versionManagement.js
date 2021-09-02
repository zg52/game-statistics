import request from '@/utils/request'

// 获取List
export function getGmVersionCollection(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmVersionCollection?current=${data.current}&size=${data.size}`,
		method: 'get',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}

// 是否采集
export function handleGmVersionCollectionCc(data) {
	return request({
		url: `${process.env.VUE_APP_BASE_API}/gmVersionCollection/${data.id}/cc?id=${data.id}&collectionFlag=${data.collectionFlag}`,
		method: 'post',
		headers: {
			'Content-Type': 'x-www-form-urlencoded'
		}
	})
}