'use strict';

const Controller = require('egg').Controller;

class SysUserAddressController extends Controller {
  // 根据user_id获取用户地址列表
  async getAddress() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysUserAddress.getAddress(query);
    ctx.body = result;
  }
  // 根据id获取地址
  async getAddressById() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysUserAddress.getAddressById(query);
    ctx.body = result;
  }
  // 创建地址
  async create() {
    const { ctx } = this;
    const newAddress = await ctx.request.body;
    const result = await ctx.service.sysUserAddress.create(newAddress);
    ctx.body = result;
  }
  // 修改地址
  async update() {
    const { ctx } = this;
    const newAddress = await ctx.request.body;
    const result = await ctx.service.sysUserAddress.update(newAddress);
    ctx.body = result;
  }
  // 删除地址
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const result = await ctx.service.sysUserAddress.destroy(id);
    ctx.body = result;
  }
  // 设置默认地址
  async setAddress() {
    const { ctx } = this;
    const query = ctx.request.query;
    const result = await ctx.service.sysUserAddress.setAddress(query);
    ctx.body = result;
  }
}

module.exports = SysUserAddressController;
