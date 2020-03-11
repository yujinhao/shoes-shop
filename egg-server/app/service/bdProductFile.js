'use strict';

const Service = require('egg').Service;

class BdProductFileService extends Service {
  async getProductFile(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdProductFile.findAll({
        where: {
          deleted: 0,
          product_id: query.product_id,
        },
      });
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
  async create(newProductFile) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      newProductFile.deleted = 0;
      await ctx.model.BdProductFile.create(newProductFile);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async destroy(id) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const bdProductFile = await ctx.model.BdProductFile.findAll({
        where: {
          file_id: id,
          deleted: 0,
        },
      });
      if (!bdProductFile || bdProductFile.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProductFile[0].update({ deleted: 1 });
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = BdProductFileService;
