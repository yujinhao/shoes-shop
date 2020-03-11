'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const BdProductStock = app.model.define(
    'bd_product_stock',
    {
      stock_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: INTEGER,
      },
      color: {
        type: STRING,
      },
      size: {
        type: STRING,
      },
      num: {
        type: INTEGER,
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
  return BdProductStock;
};
