import { parseHeaders, processHeaders, flattenHeaders } from '../../src/helpers/headers'

describe('helpers:header', () => {
  describe('parseHeaders', () => {
    test('should parse headers', () => {
      const parsed = parseHeaders('Content-Type: application/json\r\n' + 'Connection: keep-alive\r\n' + ':aa\r\n' + 'key:')
      expect(parsed['content-type']).toBe('application/json')
      expect(parsed['connection']).toBe('keep-alive')
      expect(parsed['key']).toBe('')
    })

    test('should return empty object if headers is empty', () => {
      expect(parseHeaders('')).toEqual({})
    })
  })

  describe('processHeaders', () => {
    test('should normalize Content_Type header name', () => {
      const header: any = {
        'content-Type': 'foo/bar',
        'Content-length': 1024
      }
      processHeaders(header, {})
      expect(header['Content-Type']).toBe('foo/bar')
      expect(header['content-Type']).toBeUndefined()
      expect(header['Content-length']).toBe(1024)
    })

    test('should set Content-Type if not set and data is PlainObject', () => {
      const header: any = {}
      processHeaders(header, {a: 1})
      expect(header['Content-Type']).toBe('application/json;charset=utf-8')
    })

    test('should not set Content-Type if not set and data is not PlainObject', () => {
      const header: any = {}
      processHeaders(header, new URLSearchParams('a=b'))
      expect(header['Content-Type']).toBeUndefined()
    })

    test('should do nothing if not headers is undefined or null', () => {
      expect(processHeaders(undefined, {})).toBeUndefined()
      expect(processHeaders(null, {})).toBeNull()
    })
  })

  describe('flattenHeaders', () => {
    test('should flatten the headers and include common headers', () => {
      const headers = {
        Accept: 'application/json',
        common: {
          'X-COMMON-HEADER': 'commonHeaderValue'
        },
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        },
        post: {
          'X-POST-HEADER': 'postHeaderValue'
        }
      }
      expect(flattenHeaders(headers, 'get')).toEqual({
        // 'X-COMMON-HEADER': 'commonHeaderValue',
        // 'X-GET-HEADER': 'getHeaderValue',
        Accept: 'application/json',
        "X-COMMON-HEADER": "commonHeaderValue",
        "X-GET-HEADER": "getHeaderValue",
      })
      expect(flattenHeaders(headers, 'post')).toEqual({
        Accept: 'application/json',
        'X-COMMON-HEADER': 'commonHeaderValue',
        'X-POST-HEADER': 'postHeaderValue',
      })
    })

    test('should flatten the headers without common headers', () => {
      const headers = {
        Accept: 'application/json',
        get: {
          'X-GET-HEADER': 'getHeaderValue'
        }
      }
      expect(flattenHeaders(headers, 'patch')).toEqual({
        Accept: 'application/json'
      })
    })

    test('should do nothing if headers is undefined or null', () => {
      expect(flattenHeaders(undefined, 'patch')).toBeUndefined()
      expect(flattenHeaders(null, 'patch')).toBeNull()
    })
  })
})
