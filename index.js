const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const cors = require('@koa/cors')


const app = new Koa()

app.use(cors())
app.use(koaBody())

router.get('/', async (ctx, next) => {
  // 服务端设置cookie(此处不涉及到跨域) ------ 开始
  const myDate = new Date()
  const myTime = myDate.getTime()
  const expires = 1
  myDate.setTime(myTime + expires * 24 * 60 * 60 * 1000) // 单位是天 1天 1/24天(1小时)
  myDate.setDate(myDate.getDate() + 1)
  ctx.cookies.set('key', 'value', {
    // secure: true, // 需要为https，否则sameSite的设置无效。
    // sameSite: 'none', // 不设置这个跨域请求携带cookie会报警告。
    path: '/',
    expires: myDate,
    httpOnly: false
  })
  // 服务端设置cookie(此处不涉及到跨域) ------ 结束
  console.log(`请求首页`, `ctx.cookies.get('key')`, ctx.cookies.get('key')) // 获取请求头里带过来的cookie。
  ctx.response.body = ctx.request
})

router.get('/cookie', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true) // 不加这行，浏览器会拦截掉请求并抛错，导致跨主域携带cookie的请求无效化。
  console.log(`请求cookie页`, `ctx.cookies.get('key')`, ctx.cookies.get('key')) // 获取请求头里带过来的cookie。
  ctx.response.body = ctx.request
})

app.use(router.routes()).use(router.allowedMethods())

console.log('http://127.0.0.1:3000')
app.listen(3000)
