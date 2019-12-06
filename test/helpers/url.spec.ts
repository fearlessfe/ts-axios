import { buildURL, isURLSameOrigin, combineURL, isAbsoluteURL } from '../../src/helpers/url'

describe('helpers: url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(buildURL('/foo', {
        foo: 'bar'
      })).toBe('/foo?foo=bar')
    })

    test('should ignore if some params value is null', () => {
      expect(buildURL('/foo', {
        foo: 'bar',
        baz: null
      })).toBe('/foo?foo=bar')
    })
  })

  describe('combineURL', () => {})

  describe('isAbsoluteURL', () => {})

  describe('isURLSameOrigin', () => {})
})
