'use strict';

const Service = require('egg').Service;

class SysUserAddressService extends Service {
  async getAddress(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.SysUserAddress.findAll({
        where: {
          user_id: query.user_id,
        },
        order: [
          [ 'seq', 'DESC' ],
        ],
      });
      return {
        code: 200,
        msg: '查询数据成功',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async getAddressById(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const result = await ctx.model.SysUserAddress.findOne({
        where: {
          address_id: query.address_id,
        },
      });
      return {
        code: 200,
        msg: '查询数据成功',
        data: result,
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async create(newAddress) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      if (newAddress.seq) {
        await ctx.model.SysUserAddress.update({ seq: 0 }, { where: { user_id: newAddress.user_id } });
      }
      await ctx.model.SysUserAddress.create(newAddress);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async update(newAddress) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      if (newAddress.seq) {
        await ctx.model.SysUserAddress.update({ seq: 0 }, { where: { user_id: newAddress.user_id } });
      }
      const sysUserAddress = await ctx.model.SysUserAddress.findAll({
        where: {
          address_id: newAddress.address_id,
        },
      });
      if (!sysUserAddress || sysUserAddress.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await sysUserAddress[0].update(newAddress);
      return {
        code: 200,
        msg: '修改成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async destroy(id) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const sysUserAddress = await ctx.model.SysUserAddress.findAll({
        where: {
          address_id: id,
        },
      });
      if (!sysUserAddress || sysUserAddress.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个数据',
        };
      }
      await sysUserAddress[0].destroy();
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async setAddress(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      await ctx.model.SysUserAddress.update(
        {
          seq: 0,
        }, { where: { user_id: query.user_id } });
      await ctx.model.SysUserAddress.update(
        {
          seq: 1,
        }, { where: { address_id: query.address_id } });
      return {
        code: 200,
        msg: '设置成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = SysUserAddressService;
