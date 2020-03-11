'use strict';
const Controller = require('egg').Controller;

class BdOrderHeaderController extends Controller {

  // 获取订单
  async getOrder() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderHeader.getOrderAdmin(JSON.parse(query.data));
    ctx.body = result;
  }

  // 获取订单
  async getOrderById() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderHeader.getOrderById(query);
    ctx.body = result;
  }

  // 发货
  async deliver() {
    const { ctx } = this;
    const newOrder = await ctx.request.body;
    const result = await ctx.service.orderHeader.deliver(newOrder);
    ctx.body = result;
  }

  // 获取订单数量
  async getOrderNum() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderHeader.getOrderNum(query);
    ctx.body = result;
  }

}

module.exports = BdOrderHeaderController;
