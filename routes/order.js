const GROUP_NAME = 'orders';
const models = require("../models");
const Joi = require('joi');

module.exports = [
  // 参数校验
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      await models.sequelize.transaction((t) => {
        const result = models.orders.create(
          // { user_id: request.auth.credentials.userId },
          { user_id: 1 },
          { transaction: t }
        ).then((order) => {
          const goodsList = [];
          JSON.parse(request.payload.goodsList).forEach((item) => {
            goodsList.push(models.order_goods.create({
              order_id: order.dataValues.id,
              goods_id: item.goods_id,
              // 此处单价的数值应该从商品表中反查出写入，出于教程的精简性而省略该步骤
              single_price: 4.9,
              count: item.count,
            }));
          });
          return Promise.all(goodsList);
        });
        return result;
      }).then(() => {
        // 事务已被提交
        reply('success');
      }).catch(() => {
        // 事务已被回滚
        reply('error');
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单',
      auth: false
      // validate: {
      //   payload: {
      //     goodsList: Joi.array().items(
      //       Joi.object().keys({
      //         goods_id: Joi.number().integer(),
      //         count: Joi.number().integer(),
      //       }),
      //     ),
      //   },
      // },
    },
  },
];
