import { statisticsHourRecord, statisticsGenderRatio, statisticalSegmentAge, salesMonth, consumerMonth } from '@/api/dashboard'

const state = {
  statisticsHourRecord: [], // 广告驻留人数
  statisticsGenderRatio: [], // 男女比例
  statisticalSegmentAge: [], // 不同年龄段的数值
  salesMonth: [], // 月份统计每天的销售额
  consumerMonth: [] // 月度消费额统计
}

const mutations = {
  // 获取广告浏览次数的list
  SET_Statistics_Hour_Record: (state, record) => {
		// record => [{key: 1, value: 1}, {key: 7, value: 3}] key为小时，value为次数
		// 将record的key对应的value提取出来，对应到数组里
		let newRecord = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		if ( record.length !== 0 ) {
			record.forEach(item => {
        let key = item.key.toString().slice(-2)
        if ( key < 10 ) {
          key = key.slice(1)
        }
        key = parseInt(key)
        newRecord[key] = item.value
			})
    } 
    console.log(newRecord, '~~~')
    state.statisticsHourRecord = newRecord
  },
  // 获取男女比例
  SET_Statistics_Gender_Ratio: (state, record) => {
    let newRecord = []
    if ( record.length == 0 ) {
      newRecord= [
        {
          value: 0,
          name: '女'
        },
        {
          value: 0,
          name: '男'
        }
      ]
    } else {
      record.forEach(item => {
				if ( item.key == 0 ) {
          newRecord.push({
            value: item.value,
            name: '女'
          })
        } else {
          newRecord.push({
            value: item.value,
            name: '男'
          })
        }
			})
    }
    state.statisticsGenderRatio = newRecord
  },
  // 获取指定天当天的不同年龄段的数值
  SET_Statistical_SegmentAge: (state, record) => {
    let newRecord = []
    if ( Object.keys(record).length == 0 ) {
      newRecord = [{
        name: '小于30岁',
        value: 0
      }, {
        name: '30岁到50岁',
        value: 0
      }, {
        name: '大于50岁',
        value: 0
      }]
    } else {
      for(let k in record) {
        if ( k == 'lessThan30' ) {
          newRecord.push({
            name: '小于30岁',
            value: record[k]
          })
        } else if ( k == 'greater30' ) {
          newRecord.push({
            name: '30岁到50岁',
            value: record[k]
          })
        } else if ( k == 'greater50' ) {
          newRecord.push({
            name: '大于50岁',
            value: record[k]
          })
        }
      }
    }   
    state.statisticalSegmentAge = newRecord
  },
  // 按月份统计每天的销售额
  SET_Sales_Month: (state, record) => {
    let newRecord = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    if ( record.length != 0 ) {
      record.forEach(item => {
        let key = item.key.slice(-2) - 1
				newRecord[key] = item.value
			})
    }
    state.salesMonth = newRecord
  },
  // 月度消费额统计
  SET_Consumer_Month: (state, record) => {
    console.log(record)
    let newRecord = []
    if ( Object.keys(record).length == 0 ) {
      newRecord = [{
        name: '小于1000',
        value: 0
      }, {
        name: '1000到2000',
        value: 0
      }, {
        name: '大于2000',
        value: 0
      }]
    } else {
      for(let k in record) {
        if ( k == 'lessThan1000' ) {
          newRecord.push({
            name: '小于1000',
            value: record[k]
          })
        } else if ( k == 'between' ) {
          newRecord.push({
            name: '1000到2000',
            value: record[k]
          })
        } else if ( k == 'moreThan2000' ) {
          newRecord.push({
            name: '大于2000',
            value: record[k]
          })
        }
      }
    }   
    console.log(newRecord)
    state.consumerMonth = newRecord
  }
}

const actions = {
  // 获取广告浏览次数的list
  getStatisticsHourRecord({ commit }, parameter) {
    const { dateTime, driveType } = parameter
    return new Promise((resolve, reject) => {
			statisticsHourRecord({ dateTime, driveType }).then(response => {
        console.log(response)
				const { data } = response
        commit('SET_Statistics_Hour_Record', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取男女比例
  getStatisticsGenderRatio({ commit }, parameter) {
    const { dateTime } = parameter
    return new Promise((resolve, reject) => {
			statisticsGenderRatio({ dateTime }).then(response => {
				const { data } = response
        commit('SET_Statistics_Gender_Ratio', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取指定天当天的不同年龄段的数值
  getStatisticalSegmentAge({ commit }, parameter) {
    const { dateTime } = parameter
    return new Promise((resolve, reject) => {
			statisticalSegmentAge({ dateTime }).then(response => {
				const { data } = response
        commit('SET_Statistical_SegmentAge', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 按月份统计每天的销售额
  getMonth({ commit }, parameter) {
    const { date } = parameter
    return new Promise((resolve, reject) => {
			salesMonth({ date }).then(response => {
				const { data } = response
        commit('SET_Sales_Month', data.list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 月度消费额统计(消费能力分析)
  getConsumerMonth({ commit }, parameter) {
    const { date } = parameter
    return new Promise((resolve, reject) => {
			consumerMonth({ date }).then(response => {
				const { data } = response
        commit('SET_Consumer_Month', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

