import axios from '../../src/index'
// import qs from 'qs'
axios.defaults.headers.common['test2'] = 123
console.log(axios.defaults)
const instance = axios.create(
  {
    headers: {
      testHehe: '321',
      'Content-Type': 'application/json'
    }
  }
)
console.log(instance.defaults)

axios({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '321',
    'Content-Type': 'application/json'
  }
}).then(res => {
  console.log(res.data)
})


instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 2
  },
}).then(res => {
  console.log(res.data)
})
