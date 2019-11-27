import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
// import { transformRequest } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res);
  })
}

function processConfig(config: AxiosRequestConfig) : void {
  config.url = transformURL(config)   // 处理params
  // config.headers = transformHeaders(config)
  // config.data = transformRequestData(config)   // 处理data
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)

}

function transformURL(config: AxiosRequestConfig) : string {
  return buildURL(config.url!, config.params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders (config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data);
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
