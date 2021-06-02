/**
 * 请求封装国德独有方式
 * 我是你爸爸
 */
import {
	BASE_URL
} from "@/api/api";
import { Common } from '@/utils/common'
// 加载信息，带遮罩
let needLoadingRequestCount = 0;
let loadingTimer;
function showLoading(title = '', mask = true) {
	if (needLoadingRequestCount === 0) {
		uni.showLoading({
			title,
			mask
		});
 
		// 最长10s自动关闭
		loadingTimer = setTimeout(() => {
			if (needLoadingRequestCount > 0) {
				uni.hideLoading();
			}
		}, 10000);
	}
 
	needLoadingRequestCount++;
}
function hideLoading() {
	if (needLoadingRequestCount <= 0) return;
 
	needLoadingRequestCount--;
 
	if (needLoadingRequestCount === 0) {
        loadingTimer && clearTimeout(loadingTimer);
		uni.hideLoading();
	}
}
export default params => {
	// // 加载中
	// uni.showLoading({
	// 	title: "加载中",
  // })
  showLoading('加载中')
	let paramMeter = {}
	return new Promise((resolve, reject) => {
    paramMeter = {
      url: `${BASE_URL}${params.url}`,
      data: params.data,
      method: params.method,
      header:{
        'Content-Type':'application/json; charset=utf-8; application/x-tenantid-header',
        'Authorization': `Bearer ${Common.getToken()}`,
        'x-tenantid-header':uni.getStorageSync('tenantId'),
        'x-tenant-schema':uni.getStorageSync('tenant'),
        'X-Requested-With':'XMLHttpRequest',
        'x-ltdno-header':uni.getStorageSync('ltdno'),
        'x-username-header':uni.getStorageSync('username'),
        'x-userid-header':uni.getStorageSync('userId'),
      }
      
    }

		uni.request({
			...paramMeter,
			success(response) {
        let res = response.data
        if(res.errorCode === '400') {
          reject(res);
          let message = (res.details && res.details.length > 0) ? String(res.details) : (res.message || res.errorMessage);
          uni.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          });
          return
        }
				resolve(res);
			},
			fail(err) {
        let message = (err.details && err.details.length > 0) ? String(err.details) : (err.message || err.errorMessage);
          uni.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          });
				reject(err);
			},
			complete() {
				hideLoading();
			}
		})
	})
}
