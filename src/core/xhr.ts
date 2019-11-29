import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url';
import { isFormData } from '../helpers/util';
import cookie from '../helpers/cookies'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {

  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xrsfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config;

    const request  = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    // 识别FormData

    function handleResponse(response: AxiosResponse): void {
      if(response.status>=200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }

    function configureRequest():void {
      if(responseType) {
        request.responseType = responseType
      }
      // 超时
      if(timeout) {
        request.timeout = timeout
      }

      if(withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents():void {
      request.onreadystatechange = function handleLoad () {
        if(request.readyState !== 4) {
          return
        }

        if(request.status === 0) {
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        // 根据responseType来获取返回的数据
        const responseData = responseType !== 'text' ? request.response : request.responseText

        const response: AxiosResponse = {
          // data: transformResponse(responseData),
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        // resolve(response)
        handleResponse(response)
      }
      // 监听网络错误
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }
      // 处理超时错误
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      if(onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if(onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders():void {
      if(isFormData(data)) {
        delete headers['Content-Type']
      }

      if( (withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if(xsrfValue && xrsfHeaderName) {
          headers[xrsfHeaderName] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if(data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if(cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

  })

}
