'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const OrderComment = app.model.define(
    'order_comment',
    {
      comment_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: INTEGER,
      },
      descr: {
        type: STRING,
      },
      product_id: {
        type: INTEGER,
      },
      type: {
        type: INTEGER,
      },
      star: {
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
  OrderComment.associate = function() {
    app.model.OrderComment.belongsTo(app.model.SysUser, { foreignKey: 'create_by' });
    app.model.OrderComment.belongsTo(app.model.OrderHeader, { foreignKey: 'order_id' });
  };
  return OrderComment;
};
