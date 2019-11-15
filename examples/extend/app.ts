import axios, { AxiosError } from '../../src/index'

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'default'
  }
})

axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'request'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.post('/extend/post', {msg: 'post'})

axios.put('/extend/put', {msg: 'put'})

axios.patch('/extend/patch', {msg: 'patch'})
