'use strict';
const Controller = require('egg').Controller;

class BdOrderHeaderController extends Controller {
  // 创建订单
  async create() {
    const { ctx } = this;
    const body = await ctx.request.body;
    const result = await ctx.service.orderHeader.create(JSON.parse(body.data));
    ctx.body = result;
  }

  // 获取订单
  async getOrder() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderHeader.getOrder(query);
    ctx.body = result;
  }

  // 取消
  async cancel() {
    const { ctx } = this;
    const newOrder = ctx.request.body;
    const result = await ctx.service.orderHeader.cancel(newOrder);
    ctx.body = result;
  }

  // 付款
  async pay() {
    const { ctx } = this;
    const body = ctx.request.body;
    const result = await ctx.service.orderHeader.pay(JSON.parse(body.data));
    ctx.body = result;
  }

  // 确认收货
  async confirm() {
    const { ctx } = this;
    const newOrder = ctx.request.body;
    const result = await ctx.service.orderHeader.confirm(newOrder);
    ctx.body = result;
  }

  // 评论
  async setComment() {
    const { ctx } = this;
    const newOrder = ctx.request.body;
    const result = await ctx.service.orderHeader.setComment(newOrder);
    ctx.body = result;
  }


}

module.exports = BdOrderHeaderController;
