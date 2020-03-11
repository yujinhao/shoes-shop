'use strict';
const Controller = require('egg').Controller;

class BdProductController extends Controller {
  // 获取商品
  async getProduct() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProduct.getProductUser(query);
    ctx.body = result;
  }

  // 获取商品详情
  async getProductById() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProduct.getProductById(query);
    ctx.body = result;
  }
}

module.exports = BdProductController;
