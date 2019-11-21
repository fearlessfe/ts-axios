import axios from '../../src/index'
// import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

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
