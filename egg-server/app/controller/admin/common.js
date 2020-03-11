'use strict';

const fs = require('fs');
const pump = require('mz-modules/pump');
const Controller = require('egg').Controller;

class CommonController extends Controller {
  // 获取面板数量
  async getNum() {
    const { ctx } = this;
    const result = await ctx.service.common.getNum();
    ctx.body = result;
  }

  // 上传文件
  async upload() {
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
    const result = {
      code: 200,
      msg: '查询数据成功',
      data: files,
    };
    ctx.body = result;
  }
}

module.exports = CommonController;
