'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class OrderHeaderService extends Service {
  async create(newOrderList) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let result = [];
      for (let i = 0; i < newOrderList.length; i++) {
        const newOrder = newOrderList[i];
        let price = parseFloat(0);
        for (let i = 0; i < newOrder.productList.length; i++) {
          price = price + parseFloat(newOrder.productList[i].price * newOrder.productList[i].product_num);
        }
        newOrder.total_price = price;
        const d = await ctx.service.tools.dateFormat('YYYYmmddHHMMSS', new Date());
        newOrder.order_no = 'OR' + d;
        newOrder.status = 1;
        const k = await ctx.model.OrderHeader.create(newOrder);
        result.push(k);
        for (let i = 0; i < newOrder.productList.length; i++) {
          newOrder.productList[i].order_id = k.order_id;
          if (!newOrder.productList[i].img || newOrder.productList[i].img === '') {
            newOrder.productList[i].img = '/public/admin/no_data.png';
          }
          await ctx.model.OrderDetail.create(newOrder.productList[i]);
          const bdProductStock = await ctx.model.BdProductStock.findOne({
            where: {
              color: newOrder.productList[i].product_color,
              size: newOrder.productList[i].product_size,
              product_id: newOrder.productList[i].product_id,
            },
          });
          await bdProductStock.update({ num: bdProductStock.num - newOrder.productList[i].product_num });
        }
      }
      return {
        code: 200,
        msg: '创建成功',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async getOrderById(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.OrderHeader.findOne({
        where: { order_id: query.order_id },
        include: [
          {
            model: ctx.model.OrderDetail,
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
  async getOrder(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { create_by: query.user_id };
      if (query.status && query.status !== '') {
        whereClause = Object.assign(whereClause, { status: query.status });
      }
      const result = await ctx.model.OrderHeader.findAll({
        where: whereClause,
        order: [
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.OrderDetail,
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
  async getOrderAdmin(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { };
      if (query.status && query.status !== '') {
        whereClause = Object.assign(whereClause, { status: { [Op.in]: query.status } });
      }
      if (query.order_no && query.order_no !== '') {
        whereClause = Object.assign(whereClause, { order_no: query.order_no });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.OrderHeader.findAndCountAll({
        offset,
        limit,
        distinct: true,
        where: whereClause,
        order: [
          [ 'status', 'ASC' ],
          [ 'create_time', 'DESC' ],
        ],
        include: [
          {
            model: ctx.model.OrderDetail,
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
  async getOrderNum(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const orderNum = await ctx.model.OrderHeader.count({
        where: {
          status: query.status,
        },
      });
      const result = {
        orderNum,
      };
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
  async pay(newOrderList) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      for (let i = 0; i < newOrderList.length; i++) {
        const newOrder = newOrderList[i];
        const order = await ctx.model.OrderHeader.findAll({
          where: {
            order_id: newOrder.order_id,
            status: 1,
          },
        });
        if (!order || order.length === 0) {
          return {
            code: 500,
            msg: '根据id，没有查询到这个数据',
          };
        }
        await order[0].update({ status: 2 });
      }
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async deliver(newOrder) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const order = await ctx.model.OrderHeader.findAll({
        where: {
          order_id: newOrder.order_id,
          status: 2,
        },
      });
      if (!order || order.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await order[0].update({ express_no: newOrder.express_no, status: 3 });
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async cancel(newOrder) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const order = await ctx.model.OrderHeader.findAll({
        where: {
          order_id: newOrder.order_id,
        },
      });
      if (!order || order.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await order[0].update({ status: 0 });
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async confirm(newOrder) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const order = await ctx.model.OrderHeader.findAll({
        where: {
          order_id: newOrder.order_id,
          status: 3,
        },
      });
      if (!order || order.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await order[0].update({ status: 4 });
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async setComment(newOrder) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const order = await ctx.model.OrderHeader.findAll({
        where: {
          order_id: newOrder.order_id,
          status: 4,
        },
      });
      if (!order || order.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await order[0].update({ status: 5 });

      const productList = await ctx.model.OrderDetail.findAll({
        where: {
          order_id: newOrder.order_id,
        },
      });
      const newComment = {
        descr: newOrder.descr,
        order_id: newOrder.order_id,
        product_id: productList[0].product_id,
        star: newOrder.star,
        type: 1,
        create_by: newOrder.create_by,
      };
      await ctx.model.OrderComment.create(newComment);
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

module.exports = OrderHeaderService;
