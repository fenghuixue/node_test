// router/shops.js
const GROUP_NAME = 'goods';
const models = require("../models");
const { paginationDefine } = require('../utils/router-helper');

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}`,
    handler: async (request, reply) => {
      // 增加带有 where 的条件查询
      const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
        // 基于 shop_id 的条件查询
        where: {
          shop_id: request.params.shopId,
        },
        attributes: [
          'id',
          'name',
          'shop_id'
        ],
        limit: request.query.limit,
        page: request.query.page || 1
      });
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
      description: '获取单个店铺的商品列表',
      validate: {
        query: {
          ...paginationDefine
        }
      }
    }
  }
]