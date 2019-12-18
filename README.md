> 用WebStorm自带的静态服务测试跨域携带cookie和跨域设置cookie

# 问题
* 问题：A网站打B网站的接口，默认不会携带B网站的cookie。
* 原因：浏览器为了安全着想，跨域访问资源时，在请求头里不会携带被访问资源站点上的cookie。
* 我们的目的是：A网站打B网站的接口时，把B网站的cookie携带上。

# 其他
* 客户端跨主域设置cookie：使用iframe的postMessage实现。
* 客户端跨子域设置cookie：设置cookie时domain前加`.`即可。

# 测试流程
1、启服务：命令行路径切换到项目根目录并输入`nodemon`
2、在浏览器中输入：http://127.0.0.1:3000
3、手动设置点cookie
4、用WebStorm点开index.html
5、查看请求头里是否携带上了cookie
