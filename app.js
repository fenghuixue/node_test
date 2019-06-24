// app.js
const Hapi = require('hapi');
const env2 = require('env2');
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const pluginHapiSwagger = require('./plugins/hapi-swagger');

if (process.env.NODE_ENV === 'production') {
  env2('./.env.prod');
} else {
  env2('./.env');
}
const { env } = process;

const server = new Hapi.Server();
// 配置服务器启动 host 与端口
server.connection({
  port: env.PORT,
  host: env.HOST
});

const init = async () => {
  server.route([
    // 创建一个简单的hello hapi接口
    ...routesHelloHapi,
    ...routesShops,
    // ...routesOrders,
  ]);
  const pluginHapiPagination = require('./plugins/hapi-pagination');
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
  ])
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};



init();
