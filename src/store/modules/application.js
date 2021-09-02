import { getApplicationId, setApplicationId, getApplicationInfo, setApplicationInfo } from '@/utils/application'

const state = {
	applicationId: getApplicationId() || '',
	applicationInfo: getApplicationInfo() || {}
}

const mutations = {
	// 设置当前applicationId
	SET_APPLICATIONID: (state, record) => {
		state.applicationId = record;
		setApplicationId(record);
	},
	// 设置当前applicationInfo
	SET_APPLICATIONINFO: (state, record) => {
		state.applicationInfo = record;
		setApplicationInfo(record);
	},
}

const actions = {
	setApplicationId({ commit }, id) {
		commit('SET_APPLICATIONID', id)
	},
	setApplicationInfo({ commit }, info) {
		commit('SET_APPLICATIONINFO', info)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}