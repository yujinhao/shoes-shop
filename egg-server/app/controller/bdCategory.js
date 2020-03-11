'use strict';

const Controller = require('egg').Controller;

class BdCategoryController extends Controller {
  // 获取分类
  async getCategory() {
    const { ctx } = this;//每次都会实例化一个ctx,存放用户请求的信息
    const result = await ctx.service.bdCategory.getCategory();
    ctx.body = result;
  }

  // 获取分类
  async getCategoryAndProduct() {
    const { ctx } = this;
    const result = await ctx.service.bdCategory.getCategoryAndProduct();
    ctx.body = result;
  }
}

module.exports = BdCategoryController;
