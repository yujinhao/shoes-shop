'use strict';

const Controller = require('egg').Controller;

class SysUserController extends Controller {
  // 登录
  async login() {
    const { ctx } = this;
    const body = await ctx.request.body;
    const result = await ctx.service.sysUser.loginAdmin(body);
    ctx.body = result;
  }

  // 查找所有用户
  async findAll() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysUser.findAll(query);
    ctx.body = result;
  }

  // 删除用户
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.sysUser.destroy(id);
    ctx.body = result;
  }
}

module.exports = SysUserController;
