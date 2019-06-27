// routes/shops.js
const GROUP_NAME = 'shops';
const models = require("../models");
const { paginationDefine, jwtHeaderDefine } = require('../utils/router-helper');

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: [
          'id',
          'name',
          'thumb_url'
        ],
        limit: request.query.limit || 15,
        page: request.query.page || 1
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      reply({ 
        data: results, 
        total: totalCount,
        limit: request.query.limit || 15,
        page: request.query.page || 1,
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      auth: false,
      description: '获取店铺列表',
      validate: {
        query: {
          ...paginationDefine,
        },
        // ...jwtHeaderDefine
      }
    }
  }
];
