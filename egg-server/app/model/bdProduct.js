'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT } = app.Sequelize;
  const BdProduct = app.model.define(
    'bd_product',
    {
      product_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: STRING,
      },
      category_id: {
        type: INTEGER,
      },
      seq: {
        type: INTEGER,
      },
      price: {
        type: FLOAT(11, 2) ,
      },
      unit: {
        type: STRING,
      },
      descr: {
        type: STRING,
      },
      enabled: {
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
      // underscored: true, // 不使用下划线
      timestamps: false,
    }
  );
  BdProduct.associate = function() {
    app.model.BdProduct.belongsTo(app.model.BdCategory, { foreignKey: 'category_id', targetKey: 'category_id' });
    app.model.BdProduct.belongsTo(app.model.BdCategoryTwo, { foreignKey: 'category_id', targetKey: 'category_id' });
    app.model.BdProduct.hasMany(app.model.BdProductFile, { foreignKey: 'product_id' });
  };
  return BdProduct;
};
