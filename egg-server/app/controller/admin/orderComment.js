'use strict';
const Controller = require('egg').Controller;

class BdOrderHeaderController extends Controller {
  // 管理员回复
  async create() {
    const { ctx } = this;
    const newOrder = await ctx.request.body;
    const result = await ctx.service.orderComment.create(newOrder);
    ctx.body = result;
  }

  // 获取评论
  async getComment() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderComment.getComment(JSON.parse(query.data));
    ctx.body = result;
  }
}

module.exports = BdOrderHeaderController;
