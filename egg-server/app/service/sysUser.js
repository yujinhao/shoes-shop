'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SysUserService extends Service {
  async login(body) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const sysUser = await ctx.model.SysUser.findAll({
        where: {
          account: body.account,
          deleted: 0,
        },
      });
      if (!sysUser || sysUser.length === 0) {
        return {
          code: 500,
          msg: '用户名不存在',
        };
      }
      if (body.password === sysUser[0].password) {
        await sysUser[0].update({ update_time: new Date() });
        return {
          code: 200,
          msg: '账号密码正确',
          data: sysUser[0],
        };
      }
      return {
        code: 500,
        msg: '账号密码错误',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async loginAdmin(body) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      const sysUser = await ctx.model.SysUser.findAll({
        where: {
          account: body.account,
          deleted: 0,
          role_id: 1,
        },
      });
      if (!sysUser || sysUser.length === 0) {
        return {
          code: 500,
          msg: '用户名不存在',
        };
      }
      if (body.password === sysUser[0].password) {
        return {
          code: 200,
          msg: '账号密码正确',
          data: sysUser[0],
        };
      }
      return {
        code: 500,
        msg: '账号密码错误',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async register(newUser) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      newUser.role_id = 2;
      newUser.deleted = 0;
      const sysUser = await ctx.model.SysUser.findAll({
        where: {
          account: newUser.account,
          deleted: 0,
        },
      });
      if (sysUser.length > 0) {
        return {
          code: 500,
          msg: '用户名已存在',
        };
      }
      await ctx.model.SysUser.create(newUser);
      return {
        code: 200,
        msg: '创建成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
  async findAll(query) {
    const { ctx } = this;
    ctx.status = 200;
    try {
      let whereClause = { deleted: 0 };
      if (query.user_name && query.user_name !== '') {
        whereClause = Object.assign(whereClause, { user_name: { [Op.like]: '%' + query.user_name + '%' } });
      }
      // page第几页
      // limit 第页多少条
      // offset 跳过多少页面
      const limit = ctx.helper.parseInt(query.limit) || 2;
      const offset = ctx.helper.parseInt(query.page - 1) * limit;
      const result = await ctx.model.SysUser.findAndCountAll({
        offset,
        limit,
        where: whereClause,
      });
      return {
        code: 200,
        msg: '查询用户数据成功',
        data: result,
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
      const sysUser = await ctx.model.SysUser.findAll({
        where: {
          user_id: id,
          deleted: 0,
        },
      });
      if (!sysUser || sysUser.length === 0) {
        return {
          code: 500,
          msg: '根据id，没有查询到这个角色',
        };
      }
      await sysUser[0].update({ deleted: 1 });
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (err) {
      ctx.status = 500;
      throw err;
    }
  }
}

module.exports = SysUserService;
