'use strict';

const fs = require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class BdProductFileController extends Controller {
  // 获取文件
  async getProductFile() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.bdProductFile.getProductFile(query);
    ctx.body = result;
  }
  // 创建文件
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
    const newProductFile = Object.assign(files, JSON.parse(parts.field.data));
    const result = await ctx.service.bdProductFile.create(newProductFile);
    ctx.body = result;
  }
  // 删除文件
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.bdProductFile.destroy(id);
    ctx.body = result;
  }
}

module.exports = BdProductFileController;
