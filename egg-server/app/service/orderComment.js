'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrderCommentService extends Service {
  async getComment(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { type: 1 };
      if (query.product_id && query.product_id !== '') {
        whereClause = Object.assign(whereClause, { product_id: query.product_id });
      }
      if (query.star && query.star !== '') {
        whereClause = Object.assign(whereClause, { star: { [Op.in]: query.star } });
      }
      let whereClause1 = {};
      if (query.reply !== null && query.reply !== '') {
        whereClause1 = Object.assign(whereClause1, { reply: query.reply });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.OrderComment.findAndCountAll({
        offset,
        limit,
        where: whereClause,
        order: [
          [ 'create_time', 'DESC' ],
        ],
        distinct: true,
        include: [
          {
            model: ctx.model.OrderHeader,
            // required: false,
            where: whereClause1,
            include: [
              {
                model: ctx.model.OrderDetail,
              },
            ],
          },
        ],
      });
      const result1 = await ctx.model.OrderComment.findAll({
        where: { type: 2 },
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.SysUser,
            where: { deleted: 0 },
          },
        ],
      });
      const result2 = await ctx.model.OrderComment.findAll({
        where: { type: 3 },
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.SysUser,
            where: { deleted: 0 },
          },
        ],
      });
      for (let i = 0; i < result1.length; i++) {
        for (let j = 0; j < result.rows.length; j++) {
          if (result1[i].order_id === result.rows[j].order_id) {
            const tmp = {
              comment_id: result.rows[j].comment_id,
              order_id: result.rows[j].order_id,
              descr: result.rows[j].descr,
              product_id: result.rows[j].product_id,
              type: result.rows[j].type,
              star: result.rows[j].star,
              create_by: result.rows[j].create_by,
              update_by: result.rows[j].update_by,
              create_time: result.rows[j].create_time,
              update_time: result.rows[j].update_time,
              order_header: result.rows[j].order_header,
              reply: result1[i],
            };
            result.rows[j] = tmp;
          }
        }
      }
      for (let i = 0; i < result2.length; i++) {
        for (let j = 0; j < result.rows.length; j++) {
          if (result2[i].order_id === result.rows[j].order_id) {
            if (result.rows[j].reply) {
              const tmp = {
                comment_id: result.rows[j].comment_id,
                order_id: result.rows[j].order_id,
                descr: result.rows[j].descr,
                product_id: result.rows[j].product_id,
                type: result.rows[j].type,
                star: result.rows[j].star,
                create_by: result.rows[j].create_by,
                update_by: result.rows[j].update_by,
                create_time: result.rows[j].create_time,
                update_time: result.rows[j].update_time,
                order_header: result.rows[j].order_header,
                reply: result.rows[j].reply,
                append: result2[i],
              };
              result.rows[j] = tmp;
            } else {
              const tmp = {
                comment_id: result.rows[j].create_time,
                order_id: result.rows[j].create_time,
                descr: result.rows[j].descr,
                product_id: result.rows[j].product_id,
                type: result.rows[j].type,
                star: result.rows[j].star,
                create_by: result.rows[j].create_by,
                update_by: result.rows[j].update_by,
                create_time: result.rows[j].create_time,
                update_time: result.rows[j].update_time,
                order_header: result.rows[j].order_header,
                append: result2[i],
              };
              result.rows[j] = tmp;
            }
          }
        }
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

  async getCommentNum(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const all = await ctx.model.OrderComment.count({
        where: { product_id: query.product_id, type: 1 },
      });
      const good = await ctx.model.OrderComment.count({
        where: { product_id: query.product_id, type: 1, star: { [Op.in]: [ 4, 5 ] } },
      });
      const mid = await ctx.model.OrderComment.count({
        where: { product_id: query.product_id, type: 1, star: { [Op.in]: [ 2, 3 ] } },
      });
      const bad = await ctx.model.OrderComment.count({
        where: { product_id: query.product_id, type: 1, star: { [Op.in]: [ 0, 1 ] } },
      });
      return {
        code: 200,
        msg: '查询数据成功',
        data: {
          all,
          good,
          mid,
          bad,
        },
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async getCommentUser(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { product_id: query.product_id, type: 1 };
      if (query.star && query.star !== '' && query.star !== '0') {
        let tmp = [ 4, 5 ];
        if (query.star === '2') {
          tmp = [ 2, 3 ];
        }
        if (query.star === '3') {
          tmp = [ 0, 1 ];
        }
        whereClause = Object.assign(whereClause, { star: { [Op.in]: tmp } });
      }
      const result = await ctx.model.OrderComment.findAll({
        where: whereClause,
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.SysUser,
            where: { deleted: 0 },
          },
        ],
      });
      const result1 = await ctx.model.OrderComment.findAll({
        where: { product_id: query.product_id, type: 2 },
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.SysUser,
            where: { deleted: 0 },
          },
        ],
      });
      const result2 = await ctx.model.OrderComment.findAll({
        where: { product_id: query.product_id, type: 3 },
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.SysUser,
            where: { deleted: 0 },
          },
        ],
      });
      for (let i = 0; i < result1.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (result1[i].order_id === result[j].order_id) {
            const tmp = {
              comment_id: result[j].comment_id,
              order_id: result[j].order_id,
              descr: result[j].descr,
              product_id: result[j].product_id,
              type: result[j].type,
              star: result[j].star,
              create_by: result[j].create_by,
              update_by: result[j].update_by,
              create_time: result[j].create_time,
              update_time: result[j].update_time,
              sys_user: result[j].sys_user,
              reply: result1[i],
            };
            result[j] = tmp;
          }
        }
      }
      for (let i = 0; i < result2.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (result2[i].order_id === result[j].order_id) {
            if (result[j].reply) {
              const tmp = {
                comment_id: result[j].comment_id,
                order_id: result[j].order_id,
                descr: result[j].descr,
                product_id: result[j].product_id,
                type: result[j].type,
                star: result[j].star,
                create_by: result[j].create_by,
                update_by: result[j].update_by,
                create_time: result[j].create_time,
                update_time: result[j].update_time,
                sys_user: result[j].sys_user,
                reply: result[j].reply,
                append: result2[i],
              };
              result[j] = tmp;
            } else {
              const tmp = {
                comment_id: result[j].create_time,
                order_id: result[j].create_time,
                descr: result[j].descr,
                product_id: result[j].product_id,
                type: result[j].type,
                star: result[j].star,
                create_by: result[j].create_by,
                update_by: result[j].update_by,
                create_time: result[j].create_time,
                update_time: result[j].update_time,
                sys_user: result[j].sys_user,
                append: result2[i],
              };
              result[j] = tmp;
            }
          }
        }
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
  async create(newComment) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      newComment.type = 2;
      const productList = await ctx.model.OrderDetail.findAll({
        where: {
          order_id: newComment.order_id,
        },
      });
      newComment.product_id = productList[0].product_id;
      await ctx.model.OrderComment.create(newComment);
      await ctx.model.OrderHeader.update({ reply: 1 }, { where: { order_id: newComment.order_id } });
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async createAdd(newComment) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      newComment.type = 3;
      const productList = await ctx.model.OrderDetail.findAll({
        where: {
          order_id: newComment.order_id,
        },
      });
      newComment.product_id = productList[0].product_id;
      await ctx.model.OrderComment.create(newComment);
      await ctx.model.OrderHeader.update({ append: 1 }, { where: { order_id: newComment.order_id } });
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = OrderCommentService;
