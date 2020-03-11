/*
Navicat MySQL Data Transfer

Source Server         : 47.107.177.181
Source Server Version : 50726
Source Host           : 47.107.177.181:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-02-27 15:20:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bd_category
-- ----------------------------
DROP TABLE IF EXISTS `bd_category`;
CREATE TABLE `bd_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品分类id',
  `category_name` varchar(50) DEFAULT NULL COMMENT '商品分类名',
  `descr` varchar(200) DEFAULT NULL COMMENT '分类描述',
  `enabled` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否上架 0:下架 1:上架',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除 0:否 1:是',
  `seq` int(11) DEFAULT NULL COMMENT '排序',
  `logo_url` varchar(200) DEFAULT NULL COMMENT 'logo url',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='商品分类';

-- ----------------------------
-- Table structure for bd_product
-- ----------------------------
DROP TABLE IF EXISTS `bd_product`;
CREATE TABLE `bd_product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `product_name` varchar(50) DEFAULT NULL COMMENT '商品名称',
  `category_id` int(11) DEFAULT NULL COMMENT '商品分类id',
  `seq` int(11) DEFAULT NULL COMMENT '排序',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `unit` varchar(10) DEFAULT NULL COMMENT '单位',
  `descr` varchar(2000) DEFAULT NULL COMMENT '描述',
  `enabled` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0:下架 1:上架',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0:未删除 1:已删除',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='商品信息';

-- ----------------------------
-- Table structure for bd_product_file
-- ----------------------------
DROP TABLE IF EXISTS `bd_product_file`;
CREATE TABLE `bd_product_file` (
  `file_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `url` varchar(100) DEFAULT NULL COMMENT 'url',
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除 0:否 1:是',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商品banner图';

-- ----------------------------
-- Table structure for bd_product_stock
-- ----------------------------
DROP TABLE IF EXISTS `bd_product_stock`;
CREATE TABLE `bd_product_stock` (
  `stock_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '库存id',
  `color` varchar(100) DEFAULT NULL COMMENT '颜色',
  `size` varchar(100) DEFAULT NULL COMMENT '鞋码',
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `num` int(11) NOT NULL COMMENT '数量',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否删除 0:否 1:是',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='商品库存';

-- ----------------------------
-- Table structure for order_comment
-- ----------------------------
DROP TABLE IF EXISTS `order_comment`;
CREATE TABLE `order_comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `descr` varchar(200) DEFAULT NULL COMMENT '内容',
  `product_id` int(11) DEFAULT NULL COMMENT '商品id',
  `type` tinyint(4) DEFAULT NULL COMMENT '1客户评论 2管理员回复 3追加评论',
  `star` int(11) DEFAULT NULL COMMENT '打分 1-5',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='评论表';

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `product_num` int(11) DEFAULT NULL COMMENT '商品数量',
  `product_color` varchar(100) DEFAULT NULL COMMENT '颜色',
  `product_size` varchar(100) DEFAULT NULL COMMENT '鞋码',
  `product_name` varchar(100) DEFAULT NULL COMMENT '商品名称',
  `img` varchar(200) DEFAULT '/public/admin/no_data.png' COMMENT '封面图',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `create_by` int(11) DEFAULT NULL COMMENT '创建id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人id',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='订单详情';

-- ----------------------------
-- Table structure for order_header
-- ----------------------------
DROP TABLE IF EXISTS `order_header`;
CREATE TABLE `order_header` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `order_no` varchar(25) DEFAULT NULL COMMENT '订单id',
  `user_mobile` varchar(20) DEFAULT NULL COMMENT '收件电话',
  `recipient` varchar(50) DEFAULT NULL COMMENT '收件人',
  `address` varchar(100) DEFAULT NULL COMMENT '收货地址',
  `descr` varchar(200) DEFAULT NULL COMMENT '备注',
  `total_price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `status` tinyint(4) DEFAULT NULL COMMENT '0:已取消 1:待支付 2:待发货 3:待收货 4:待评价 5:已完成',
  `express_no` varchar(50) DEFAULT NULL COMMENT '快递单号',
  `append` tinyint(1) DEFAULT '0' COMMENT '是否追评 0没 1有',
  `reply` tinyint(1) DEFAULT '0' COMMENT '是否回复 0没1有',
  `create_by` int(11) DEFAULT NULL COMMENT '创建id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人id',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COMMENT='订单头';

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(30) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '账号',
  `password` varchar(200) DEFAULT NULL COMMENT '密码',
  `user_name` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '用户名',
  `role_id` int(11) DEFAULT NULL COMMENT '用户角色 1管理员 2普通用户',
  `telephone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `sex` tinyint(1) DEFAULT '1' COMMENT '性别 0:女 1:男',
  `head_img` varchar(300) DEFAULT '/public/admin/face.jpg' COMMENT '头像',
  `deleted` tinyint(1) DEFAULT NULL COMMENT '是否删除 0:否 1:是',
  `create_by` int(11) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='系统用户';

-- ----------------------------
-- Table structure for sys_user_address
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_address`;
CREATE TABLE `sys_user_address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `name` varchar(20) DEFAULT NULL COMMENT '收件人名称',
  `telephone` varchar(20) DEFAULT NULL COMMENT '收件人电话',
  `address` varchar(200) DEFAULT NULL COMMENT '收件人地址',
  `seq` int(11) DEFAULT NULL COMMENT '默认排序',
  `create_by` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` int(11) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
