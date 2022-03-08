import axios from 'axios'

//封装了axios，自带了链接的前缀
export default axios.create({
    baseURL: 'http://localhost:3000'
})