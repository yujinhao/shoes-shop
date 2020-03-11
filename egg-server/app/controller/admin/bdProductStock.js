'use strict';

const Controller = require('egg').Controller;

class BdProductStockController extends Controller {
  // 获取库存
  async getProductStock() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProductStock.getProductStock(query);
    ctx.body = result;
  }
  // 创建库存
  async create() {
    const { ctx } = this;
    const newProductStock = await ctx.request.body;
    const result = await ctx.service.bdProductStock.create(newProductStock);
    ctx.body = result;
  }
  // 修改库存
  async update() {
    const { ctx } = this;
    const newProductStock = await ctx.request.body;
    const result = await ctx.service.bdProductStock.update(newProductStock);
    ctx.body = result;
  }
  // 删除库存
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.bdProductStock.destroy(id);
    ctx.body = result;
  }
}

module.exports = BdProductStockController;
