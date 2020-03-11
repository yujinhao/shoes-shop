'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class BdCategoryService extends Service {
  async getCategoryPage(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { deleted: 0 };
      if (query.category_name && query.category_name !== '') {
        whereClause = Object.assign(whereClause, { category_name: { [Op.like]: '%' + query.category_name + '%' } });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.BdCategory.findAndCountAll({
        offset,
        limit,
        where: whereClause,
        // order: [
        //   [ 'seq', 'ASC' ],
        // ],
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
  async getCategory() {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdCategory.findAll({
        where: {
          deleted: 0,
          enabled: 1,
        },
        // order: [
        //   [ 'seq', 'ASC' ],
        // ],
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
  async getCategoryAndProduct() {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.BdCategory.findAll({
        where: { deleted: 0 },
        include: [
          {
            model: ctx.model.BdProduct,
            where: { deleted: 0, enabled: 1 },
            required: false,
            include: [
              {
                model: ctx.model.BdProductFile,
                where: { deleted: 0 },
                required: false,
              },
            ],
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
  async create(newCategory) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      newCategory.seq = 0;
      newCategory.enabled = 0;
      await ctx.model.BdCategory.create(newCategory);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async update(newCategory) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const bdCategory = await ctx.model.BdCategory.findAll({
        where: {
          category_id: newCategory.category_id,
          deleted: 0,
        },
      });
      if (!bdCategory || bdCategory.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdCategory[0].update(newCategory);
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
      const bdCategory = await ctx.model.BdCategory.findAll({
        where: {
          category_id: id,
          deleted: 0,
        },
      });
      if (!bdCategory || bdCategory.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdCategory[0].update({ deleted: 1 });
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
      const bdCategory = await ctx.model.BdCategory.findAll({
        where: {
          category_id: id,
          deleted: 0,
        },
      });
      if (!bdCategory || bdCategory.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await bdCategory[0].update({ enabled: bdCategory[0].enabled === 1 ? 0 : 1 });
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

module.exports = BdCategoryService;
