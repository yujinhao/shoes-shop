'use strict';

const Controller = require('egg').Controller;

class BdProductController extends Controller {
  // 获取商品
  async getProduct() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProduct.getProduct(query);
    ctx.body = result;
  }
  // 创建商品
  async create() {
    const { ctx } = this;
    const newProduct = await ctx.request.body;
    const result = await ctx.service.bdProduct.create(newProduct);
    ctx.body = result;
  }
  // 修改商品
  async update() {
    const { ctx } = this;
    const newProduct = await ctx.request.body;
    const result = await ctx.service.bdProduct.update(newProduct);
    ctx.body = result;
  }
  // 删除商品
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.bdProduct.destroy(id);
    ctx.body = result;
  }
  // 上架/下架
  async upOrDown() {
    const { ctx } = this;
    const query = ctx.request.query;
    const id = ctx.helper.parseInt(query.product_id);
    const result = await ctx.service.bdProduct.upOrDown(id);
    ctx.body = result;
  }
}

module.exports = BdProductController;
