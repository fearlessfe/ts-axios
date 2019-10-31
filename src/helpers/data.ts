import { isPlainObject } from './util'

// 将data转换为string
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 尝试解析结果
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // todo
    }
  }
  return data
}
