const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const cors = require('@koa/cors')


const app = new Koa()

app.use(cors())
app.use(koaBody())

router.get('/', async (ctx, next) => {
  ctx.response.body = ctx.request
})

router.get('/cookie', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Credentials', true) // 不加这行，浏览器会拦截掉请求并抛错，导致跨主域携带cookie的请求无效化。
  // 服务端设置cookie(此处不涉及到跨域) ------ 开始
  const myDate = new Date()
  const myTime = myDate.getTime()
  const expires = 1
  myDate.setTime(myTime + expires * 24 * 60 * 60 * 1000) // 单位是天 1天 1/24天(1小时)
  myDate.setDate(myDate.getDate() + 1)
  ctx.cookies.set('key', 'value', {
      path: '/',
      expires: myDate,
      httpOnly: false
    }
  )
  // 跨主域设置cookie(此处不涉及到跨域) ------ 结束
  ctx.response.body = ctx.request
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
