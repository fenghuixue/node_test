// routes/shops.js
const GROUP_NAME = 'shops';
const models = require("../models");
const { paginationDefine } = require('../utils/router-helper');

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
        offset: request.query.offset || 0
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      reply({ 
        data: results, 
        total: totalCount,
        limit: request.query.limit || 15,
        offset: request.query.offset || 0,
      });
    }
  }
];
