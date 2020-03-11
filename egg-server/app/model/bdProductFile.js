'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const BdProductFile = app.model.define(
    'bd_product_file',
    {
      file_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: STRING,
      },
      product_id: {
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
  BdProductFile.associate = function() {
    app.model.BdProductFile.belongsTo(app.model.BdProduct, { foreignKey: 'product_id', targetKey: 'product_id' });
  };
  return BdProductFile;
};
