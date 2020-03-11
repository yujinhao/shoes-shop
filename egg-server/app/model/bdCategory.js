'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const BdCategory = app.model.define(
    'bd_category',
    {
      category_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
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
      seq: {
        type: INTEGER,
      },
      logo_url: {
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
  BdCategory.associate = function() {
    app.model.BdCategory.hasMany(app.model.BdProduct, { foreignKey: 'category_id' });
  };
  return BdCategory;
};
