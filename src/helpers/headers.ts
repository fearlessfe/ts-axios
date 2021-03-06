import { isObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaderName (headers: any, normalizeName: string) : void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if(name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) : any {
  if(isObject(data)) {
    normalizeHeaderName(headers, 'Content-Type');
    if(headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers;
}

export function parseHeaders (headers: string) : any {
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }

  headers.split('\r\n').forEach((line) => {
    let [key, ...vals] = line.split(':');
    key = key.trim().toLowerCase();
    if(!key) {
      return
    }
    let val = vals.join(':').trim()
    if(val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if(!headers) {
    return headers
  }
  let flattenHeaders = deepMerge(headers, headers.common, headers[method]);

  const methodsDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'common', 'patch']

  methodsDelete.forEach(method => {
    delete flattenHeaders[method]
  })
  return flattenHeaders;
}
