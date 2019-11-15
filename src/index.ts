import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios (config: AxiosRequestConfig) {
  // todo
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) : void {
  config.url = transformURL(config)   // 处理params
  config.data = transformRequestData(config)   // 处理data
}

function transformURL(config: AxiosRequestConfig) : string {
  return buildURL(config.url, config.params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

export default axios;
