// router/shops.js

const models = require("../models");
module.exports = [
  // ...省略上下文
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
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
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
    },
  }
  // ...省略上下文
]