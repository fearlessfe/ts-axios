import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@: $'
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    bar: null
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    bar: undefined
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get#hehe',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get#hehe?foo=bar',
  params: {
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    bar: 'baz',
    b: 2
  }
})

const array = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: array
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => console.log(res))
