'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class BdProductService extends Service {
  async getProduct(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { deleted: 0 };
      if (query.product_name && query.product_name !== '') {
        whereClause = Object.assign(whereClause, { product_name: { [Op.like]: '%' + query.product_name + '%' } });
      }
      if (query.category_id && query.category_id !== '') {
        whereClause = Object.assign(whereClause, { category_id: query.category_id });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.BdProduct.findAndCountAll({
        offset,
        limit,
        where: whereClause,
        // order: [
        //   [ 'seq', 'ASC' ],
        // ],
        include: [
          {
            model: ctx.model.BdCategory,
          },
        ],
        distinct: true,
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
  async getProductUser(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { deleted: 0, enabled: 1 };
      if (query.product_name && query.product_name !== '') {
        whereClause = Object.assign(whereClause, { product_name: { [Op.like]: '%' + query.product_name + '%' } });
      }
      if (query.category_id && query.category_id !== '') {
        whereClause = Object.assign(whereClause, { category_id: query.category_id });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.BdProduct.findAndCountAll({
        offset,
        limit,
        where: whereClause,
        // order: [
        //   [ 'seq', 'ASC' ],
        // ],
        include: [
          {
            model: ctx.model.BdProductFile,
            where: { deleted: 0 },
            required: false,
          },
        ],
        distinct: true,
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
  async getProductById(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdProduct.findOne({
        where: { product_id: query.product_id },
        include: [
          {
            model: ctx.model.BdProductFile,
            where: { deleted: 0 },
            required: false,
          },
        ],
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
  async create(newProduct) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      await ctx.model.BdProduct.create(newProduct);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async update(newProduct) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const bdProduct = await ctx.model.BdProduct.findAll({
        where: {
          product_id: newProduct.product_id,
          deleted: 0,
        },
      });
      if (!bdProduct || bdProduct.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProduct[0].update(newProduct);
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
      const bdProduct = await ctx.model.BdProduct.findAll({
        where: {
          product_id: id,
          deleted: 0,
        },
      });
      if (!bdProduct || bdProduct.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProduct[0].update({ deleted: 1 });
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async upOrDown(id) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const bdProduct = await ctx.model.BdProduct.findAll({
        where: {
          product_id: id,
          deleted: 0,
        },
      });
      if (!bdProduct || bdProduct.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdProduct[0].update({ enabled: bdProduct[0].enabled === 1 ? 0 : 1 });
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = BdProductService;
