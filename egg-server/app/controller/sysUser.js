'use strict';

const Controller = require('egg').Controller;

class SysUserController extends Controller {
  async login() {
    const { ctx } = this;
    const body = await ctx.request.body;
    const result = await ctx.service.sysUser.login(body);
    ctx.body = result;
  }
  async register() {
    const { ctx } = this;
    const body = await ctx.request.body;
    const result = await ctx.service.sysUser.register(body);
    ctx.body = result;
  }
}

module.exports = SysUserController;
