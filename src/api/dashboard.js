import request from '@/utils/request'

// 广告统计
export async function statisticsHourRecord(data) {
	return request({
		url: '/snap/statisticsHourRecord',
		method: 'post',
		data
	})
}

// 获取广告浏览记录
export function searchIdentificationRecord(data) {
  return request({
    url: '/snap/searchIdentificationRecord',
    method: 'post',
    data
  })
}

// 获取指定天当天的男女比例数
export function statisticsGenderRatio(data) {
  return request({
    url: '/snap/statisticsGenderRatio',
    method: 'post',
    data
  })
}

// 获取指定天当天的不同年龄段的数值
export function statisticalSegmentAge(data) {
  return request({
    url: '/snap/statisticalSegmentAge',
    method: 'post',
    data
  })
}

// 按月份统计每天的销售额
export function salesMonth(data) {
  return request({
    url: '/order/sales/month',
    method: 'post',
    data
  })
}

// 月度消费额统计
export function consumerMonth(data) {
  return request({
    url: '/order/consumer/month',
    method: 'post',
    data
  })
}