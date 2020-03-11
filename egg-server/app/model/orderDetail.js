'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const OrderDetail = app.model.define(
    'order_detail',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: INTEGER,
      },
      product_id: {
        type: INTEGER,
      },
      product_num: {
        type: INTEGER,
      },
      product_color: {
        type: STRING,
      },
      product_size: {
        type: STRING,
      },
      product_name: {
        type: STRING,
      },
      img: {
        type: STRING,
      },
      price: {
        type: FLOAT,
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
  OrderDetail.associate = function() {
    app.model.OrderDetail.belongsTo(app.model.OrderHeader, { foreignKey: 'order_id', targetKey: 'order_id' });
  };
  return OrderDetail;
};
