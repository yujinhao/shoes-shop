'use strict';
const Controller = require('egg').Controller;

class BdOrderHeaderController extends Controller {
  // 追加评论
  async create() {
    const { ctx } = this;
    const newOrder = await ctx.request.body;
    const result = await ctx.service.orderComment.createAdd(newOrder);
    ctx.body = result;
  }

  // 获取评论
  async getComment() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderComment.getCommentUser(query);
    ctx.body = result;
  }

  // 获取评论
  async getCommentNum() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.orderComment.getCommentNum(query);
    ctx.body = result;
  }
}

module.exports = BdOrderHeaderController;
