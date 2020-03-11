'use strict';
const fs = require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class BdCategoryController extends Controller {
  // 获取分类
  async getCategory() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdCategory.getCategoryPage(query);
    ctx.body = result;
  }
  // 创建分类
  async create() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await ctx.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);
      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    const newCategory = Object.assign(files, JSON.parse(parts.field.data));
    const result = await ctx.service.bdCategory.create(newCategory);
    ctx.body = result;
  }
  // 修改分类
  async update() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await ctx.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);
      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }
    const newCategory = Object.assign(files, JSON.parse(parts.field.data));
    const result = await ctx.service.bdCategory.update(newCategory);
    ctx.body = result;
  }
  // 删除分类
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.bdCategory.destroy(id);
    ctx.body = result;
  }
  // 上架/下架
  async upOrDown() {
    const { ctx } = this;
    const query = ctx.request.query;
    const id = ctx.helper.parseInt(query.category_id);
    const result = await ctx.service.bdCategory.upOrDown(id);
    ctx.body = result;
  }
}

module.exports = BdCategoryController;
