'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const SysUser = app.model.define(
    'sys_user',
    {
      user_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      account: {
        type: STRING,
      },
      password: {
        type: STRING,
      },
      user_name: {
        type: STRING,
      },
      role_id: {
        type: INTEGER,
      },
      telephone: {
        type: STRING,
      },
      sex: {
        type: INTEGER,
      },
      head_img: {
        type: STRING,
      },
      deleted: {
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
  SysUser.associate = function() {
    app.model.SysUser.belongsTo(app.model.OrderComment, { foreignKey: 'user_id', targetKey: 'create_by' });
  };
  return SysUser;
};
