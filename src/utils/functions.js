// 将时间戳转换为时间
export function timestampToTime(timestamp) {
	let newTimestamp = parseInt(timestamp);
	let date = new Date(newTimestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + "-";
	let M =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1) + "-"
			: date.getMonth() + 1 + "-";
	let D =
		date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
	let h =
		date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
	let m =
		date.getMinutes() < 10
			? "0" + date.getMinutes() + ":"
			: date.getMinutes() + ":";
	let s =
		date.getSeconds() < 10
			? "0" + date.getSeconds() + ""
			: date.getSeconds() + "";
	return Y + M + D + h + m + s;
}

// 获取每月1号
export function getYearMonthDayFromOne() {
	let date = new Date();
	let resDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-") + '01';
	return resDate;
}

// 获取当天
export function getYearMonthDay() {
	let date = new Date();
	let resDate = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-") + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
	return resDate;
}
