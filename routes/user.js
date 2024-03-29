// routes/users.js

const JWT = require('jsonwebtoken');

const GROUP_NAME = 'users';
// const usrInfo = '../mock/usrInfo';

module.exports = [{
  method: 'POST',
  path: `/${GROUP_NAME}/createJWT`,
  handler: async (request, reply) => {
    const generateJWT = (jwtInfo) => {
        const payload = {
          userId: jwtInfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
        };
      return JWT.sign(payload, '123456');
    };
    reply(generateJWT({
      userId: 1,
    }));
  },
  config: {
    tags: ['api', GROUP_NAME],
    description: '用于测试的用户 JWT 签发',
    auth: false, // 约定此接口不参与 JWT 的用户验证，会结合下面的 hapi-auth-jwt 来使用
  },
}];
