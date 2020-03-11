'use strict';

const Service = require('egg').Service;


class CommonService extends Service {
  async getNum() {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const userNum = await ctx.model.SysUser.count({
        where: {
          role_id: 2,
          deleted: 0,
        },
      });
      const adminNum = await ctx.model.SysUser.count({
        where: {
          role_id: 1,
          deleted: 0,
        },
      });
      const orderNum = await ctx.model.OrderHeader.count({});
      const peOrderNum = await ctx.model.OrderHeader.count({
        where: {
          status: 3,
        },
      });
      const productNum = await ctx.model.BdProduct.count({
        where: {
          deleted: 0,
        },
      });
      const categoryNum = await ctx.model.BdCategory.count({
        where: {
          deleted: 0,
        },
      });
      const result = {
        userNum,
        adminNum,
        orderNum,
        peOrderNum,
        productNum,
        categoryNum,
      }
      return {
        code: 200,
        msg: '查询数据成功',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = CommonService;
