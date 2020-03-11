'use strict';

/**
 * api路由
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // user
  // 登录
  router.post('/api/login', controller.sysUser.login);
  router.post('/api/register', controller.sysUser.register);
  // 分类
  router.get('/api/getCategory', controller.bdCategory.getCategory);
  router.get('/api/getCategoryAndProduct', controller.bdCategory.getCategoryAndProduct);
  // 商品
  router.get('/api/getProduct', controller.bdProduct.getProduct);
  router.get('/api/getProductById', controller.bdProduct.getProductById);
  // 商品库存
  router.get('/api/getProductStockColor', controller.bdProductStock.getProductStockColor);
  router.get('/api/getProductStockSize', controller.bdProductStock.getProductStockSize);
  router.get('/api/getProductStockColorOrSize', controller.bdProductStock.getProductStockColorOrSize);
  // 订单
  router.post('/api/order', controller.orderHeader.create);
  router.get('/api/getOrder', controller.orderHeader.getOrder);
  router.put('/api/pay', controller.orderHeader.pay);
  router.put('/api/cancel', controller.orderHeader.cancel);
  router.put('/api/confirm', controller.orderHeader.confirm);
  router.put('/api/setComment', controller.orderHeader.setComment);
  // 评论
  router.post('/api/comment', controller.orderComment.create);
  router.get('/api/getComment', controller.orderComment.getComment);
  router.get('/api/getCommentNum', controller.orderComment.getCommentNum);
  // 地址
  router.get('/api/getAddress', controller.sysUserAddress.getAddress);
  router.get('/api/getAddressById', controller.sysUserAddress.getAddressById);
  router.post('/api/address', controller.sysUserAddress.create);
  router.put('/api/address', controller.sysUserAddress.update);
  router.delete('/api/address/:id', controller.sysUserAddress.destroy);
  router.get('/api/setAddress', controller.sysUserAddress.setAddress);
  // admin
  // 登录
  router.post('/api/admin/login', controller.admin.sysUser.login);
  // 用户管理
  router.get('/api/admin/userList', controller.admin.sysUser.findAll);
  router.delete('/api/admin/user/:id', controller.admin.sysUser.destroy);
  // 分类管理
  router.get('/api/admin/getCategory', controller.admin.bdCategory.getCategory);
  router.post('/api/admin/category', controller.admin.bdCategory.create);
  router.put('/api/admin/category', controller.admin.bdCategory.update);
  router.delete('/api/admin/category/:id', controller.admin.bdCategory.destroy);
  router.get('/api/admin/category/upOrDown', controller.admin.bdCategory.upOrDown);
  // 商品管理
  router.get('/api/admin/getProduct', controller.admin.bdProduct.getProduct);
  router.post('/api/admin/product', controller.admin.bdProduct.create);
  router.put('/api/admin/product', controller.admin.bdProduct.update);
  router.delete('/api/admin/product/:id', controller.admin.bdProduct.destroy);
  router.get('/api/admin/product/upOrDown', controller.admin.bdProduct.upOrDown);
  // 商品库存管理
  router.get('/api/admin/getProductStock', controller.admin.bdProductStock.getProductStock);
  router.post('/api/admin/productStock', controller.admin.bdProductStock.create);
  router.put('/api/admin/productStock', controller.admin.bdProductStock.update);
  router.delete('/api/admin/productStock/:id', controller.admin.bdProductStock.destroy);
  // 商品File管理
  router.get('/api/admin/getProductFile', controller.admin.bdProductFile.getProductFile);
  router.post('/api/admin/productFile', controller.admin.bdProductFile.create);
  router.delete('/api/admin/productFile/:id', controller.admin.bdProductFile.destroy);
  // 订单管理
  router.get('/api/admin/getOrder', controller.admin.orderHeader.getOrder);
  router.put('/api/admin/deliver', controller.admin.orderHeader.deliver);
  router.get('/api/admin/getOrderNum', controller.admin.orderHeader.getOrderNum);
  router.get('/api/admin/getOrderById', controller.admin.orderHeader.getOrderById);
  // 评论管理
  router.post('/api/admin/comment', controller.admin.orderComment.create);
  router.get('/api/admin/getComment', controller.admin.orderComment.getComment);
  // common
  router.get('/api/admin/getNum', controller.admin.common.getNum);
  router.post('/api/admin/upload', controller.admin.common.upload);
};
