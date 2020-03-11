'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const OrderHeader = app.model.define(
    'order_header',
    {
      order_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_no: {
        type: STRING,
      },
      user_mobile: {
        type: STRING,
      },
      recipient: {
        type: STRING,
      },
      address: {
        type: STRING,
      },
      descr: {
        type: STRING,
      },
      total_price: {
        type: FLOAT,
      },
      status: {
        type: INTEGER,
      },
      express_no: {
        type: STRING,
      },
      append: {
        type: INTEGER,
      },
      reply: {
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
  OrderHeader.associate = function() {
    app.model.OrderHeader.hasMany(app.model.OrderDetail, { foreignKey: 'order_id' });
    app.model.OrderHeader.belongsTo(app.model.OrderComment, { foreignKey: 'order_id', targetKey: 'order_id' });
  };
  return OrderHeader;
};
