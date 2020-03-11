'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class BdProductStockService extends Service {
  async getProductStock(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdProductStock.findAll({
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
  async getProductStockColor(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdProductStock.findAll({
        where: {
          deleted: 0,
          product_id: query.product_id,
        },
        group: 'color',
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
  async getProductStockSize(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdProductStock.findAll({
        where: {
          deleted: 0,
          product_id: query.product_id,
        },
        group: 'size',

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
  async getProductStockColorOrSize(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { deleted: 0, product_id: query.product_id, num: { [Op.gte]: 1 } };
      if (query.color && query.color !== '') {
        whereClause = Object.assign(whereClause, { color: query.color });
      }
      if (query.size && query.size !== '') {
        whereClause = Object.assign(whereClause, { size: query.size });
      }
      const result = await ctx.model.BdProductStock.findAll({
        where: whereClause,
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
  async create(newProductStock) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      await ctx.model.BdProductStock.create(newProductStock);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async update(newProductStock) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const bdProductStock = await ctx.model.BdProductStock.findAll({
        where: {
          stock_id: newProductStock.stock_id,
          deleted: 0,
        },
      });
      if (!bdProductStock || bdProductStock.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProductStock[0].update(newProductStock);
      return {
        code: 200,
        msg: '修改成功',
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
      const bdProductStock = await ctx.model.BdProductStock.findAll({
        where: {
          stock_id: id,
          deleted: 0,
        },
      });
      if (!bdProductStock || bdProductStock.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProductStock[0].update({ deleted: 1 });
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

module.exports = BdProductStockService;
