'use strict';

const Controller = require('egg').Controller;

class BdProductStockController extends Controller {
  // 获取库存
  async getProductStockColor() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProductStock.getProductStockColor(query);
    ctx.body = result;
  }
  // 获取库存
  async getProductStockSize() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProductStock.getProductStockSize(query);
    ctx.body = result;
  }
  // 获取库存
  async getProductStockColorOrSize() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProductStock.getProductStockColorOrSize(query);
    ctx.body = result;
  }
}

module.exports = BdProductStockController;
