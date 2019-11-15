import { isObject } from './util'

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
    if(headers && headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers;
}
