'use strict';
const sd = require('silly-datetime');//时间格式化插件
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const Service = require('egg').Service;

class ToolsService extends Service {
  async getUploadFile(filename) {
    // 1、获取当前日期     20180920
    const day = sd.format(new Date(), 'YYYYMMDD');
    // 2、创建图片保存的路径
    const dir = path.join(this.config.uploadDir, day);
    await mkdirp(dir);
    let d = new Date();
    d = d.getTime(); /* 毫秒数*/
    // 返回图片保存的路径
    const uploadDir = path.join(dir, d + path.extname(filename));
    // app\public\admin\upload\20180914\1536895331444.png
    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/'),
    };
  }

  async dateFormat(fmt, date) {
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(),
      'm+': (date.getMonth() + 1).toString(),
      'd+': date.getDate().toString(),
      'H+': date.getHours().toString(),
      'M+': date.getMinutes().toString(),
      'S+': date.getSeconds().toString(),
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
      }
    }
    return fmt;
  }
}

module.exports = ToolsService;
