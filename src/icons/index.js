import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// 全局注册SvgIcon组件?

// register globally
Vue.component('svg-icon', SvgIcon)

// req: 是一个函数,根据路径把对应的模块导入进来
// req.keys() : keys属性这个方法返回一个数组
// require.context 方法 可以实现批量导入文件,接收3个参数
//  - 3个参数: 要查找的文件路径, 是否查找子目录, 要匹配文件的正则
const req = require.context('./svg', false, /\.svg$/)

// console.log(req) // 打印一个函数
// console.log(req.keys()) // 打印所有svg图片的路径
// console.log(req('./dashboard.svg')) // 打印这个图片的模块module,有id

const requireAll = (requireContext) => { return requireContext.keys().map(requireContext) }
requireAll(req) // req作为参数, req.keys()返回图片路径, req.keys.map()返回图片的模块

// map方法: 映射,返回一个新数组,长度不变
// console.log(requireAll(req)) // 打印所有图片的模块module,有id
