import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios (config: AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig) : void {
  config.url = transformURL(config)   // 处理params
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)   // 处理data
}

function transformURL(config: AxiosRequestConfig) : string {
  return buildURL(config.url, config.params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data);
}

export default axios;
