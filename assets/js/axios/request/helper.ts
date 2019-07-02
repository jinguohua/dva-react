import { AxiosResponse } from 'axios';
class HttpHelpers {
  /**
   * 请求超时设置
   * 
   * @param {number} requestTimeout 请求超时时间
   * @returns {Promise<any>} Promise
   */
  static timeout(requestTimeout: number): Promise<any> {
    requestTimeout = requestTimeout;
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('网络请求超时')), requestTimeout);
    });
  }

  // TODO:
  static checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
      let data = response.data;
      if (data.code === 200) {
        return data.data;
      } else {
      }
    } else {
      return null;
    }
    return null;
  }

  /**
   * 处理响应数据
   * 
   * @param {AxiosResponse<any>} response 请求响应
   * @returns {Promise<any>} Promise
   */
  static parseResponse(response: AxiosResponse<any>): Promise<any> {

    return new Promise((resolve: any, reject: any): void => {
      resolve(response);
    });
  }
}

export default HttpHelpers;