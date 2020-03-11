'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const SysUserAddress = app.model.define(
    'sys_user_address',
    {
      address_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER,
      },
      name: {
        type: STRING,
      },
      telephone: {
        type: STRING,
      },
      address: {
        type: STRING,
      },
      seq: {
        type: INTEGER,
      },
      create_by: {
        type: INTEGER,
      },
      create_time: {
        type: DATE,
        get() {
          return moment(this.getDataValue('create_time')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
      update_by: {
        type: INTEGER,
      },
      update_time: {
        type: DATE,
        get() {
          return this.getDataValue('update_time') == null ? null : moment(this.getDataValue('update_time')).format(
            'YYYY-MM-DD HH:mm:ss'
          );
        },
      },
    },
    {
      freezeTableName: true, // 使用数据库里的真实表名
      // underscored: false, // 不使用下划线
      timestamps: false,
    }
  );
  return SysUserAddress;
};
