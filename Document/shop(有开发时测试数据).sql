/*
Navicat MySQL Data Transfer

Source Server         : 47.107.177.181
Source Server Version : 50726
Source Host           : 47.107.177.181:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-02-28 22:32:09
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
-- Records of bd_category
-- ----------------------------
INSERT INTO `bd_category` VALUES ('1', 'nike', '耐克', '1', '0', '1', '/public/admin/upload/20200219/1582124604202.png', null, '2020-02-01 14:57:27', null, null);
INSERT INTO `bd_category` VALUES ('2', 'adidas', '阿迪达斯', '1', '0', '0', '/public/admin/upload/20200219/1582125119268.png', null, '2020-02-01 22:24:27', null, null);
INSERT INTO `bd_category` VALUES ('3', 'converse', '匡威', '1', '0', '0', '/public/admin/upload/20200219/1582125363851.png', null, '2020-02-12 00:40:47', null, null);
INSERT INTO `bd_category` VALUES ('6', 'new balance', '新百伦', '1', '0', '0', '/public/admin/upload/20200219/1582125488065.jpg', null, '2020-02-12 01:08:50', null, null);

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
-- Records of bd_product
-- ----------------------------
INSERT INTO `bd_product` VALUES ('1', 'AIR JORDAN MARS', '1', '1', '900.00', '元', '<p><img src=\"http://127.0.0.1:7001/public/admin/upload/20200228/1582885407820.jpg\"><img src=\"http://127.0.0.1:7001/public/admin/upload/20200228/1582885410249.jpg\"><img src=\"http://127.0.0.1:7001/public/admin/upload/20200228/1582885412982.jpg\"></p>', '1', '0', null, '2020-02-01 18:53:07', null, null);
INSERT INTO `bd_product` VALUES ('2', 'Air Jordan 1 Mid AJ1', '1', null, '869.00', '元', '<div style=\"text-align:center;\"><img width=\"100%\" src=\"https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg\"/><img width=\"100%\" src=\"https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg\"/><img width=\"100%\" src=\"https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg\"/></div>', '1', '0', null, '2020-02-15 15:38:29', null, null);
INSERT INTO `bd_product` VALUES ('3', 'nikekkk鞋', '1', null, '120.00', '元', null, '1', '0', null, '2020-02-15 15:38:39', null, null);
INSERT INTO `bd_product` VALUES ('4', 'nikebbb鞋', '1', null, '120.00', '元', null, '1', '1', null, '2020-02-15 15:39:11', null, null);
INSERT INTO `bd_product` VALUES ('5', 'nikeaaaa6鞋', '1', null, '120.00', '元', null, '1', '1', null, '2020-02-15 15:40:32', null, null);
INSERT INTO `bd_product` VALUES ('6', 'nikeaaaac鞋', '1', null, '120.00', '元', null, '1', '1', null, '2020-02-15 15:41:35', null, null);
INSERT INTO `bd_product` VALUES ('7', '123', '2', null, '112.00', '', null, '1', '0', null, '2020-02-15 15:49:41', null, null);
INSERT INTO `bd_product` VALUES ('8', '111', '3', null, '111.00', '美元', null, '1', '0', null, '2020-02-15 16:02:25', null, null);
INSERT INTO `bd_product` VALUES ('9', 'test1', '3', null, '20.00', '元', null, '1', '0', null, '2020-02-19 22:25:51', null, null);
INSERT INTO `bd_product` VALUES ('10', 'test2', '3', null, '21.00', '元', null, '1', '0', null, '2020-02-19 22:26:02', null, null);
INSERT INTO `bd_product` VALUES ('11', 'test3', '3', null, '22.00', '元', null, '1', '0', null, '2020-02-19 22:26:13', null, null);
INSERT INTO `bd_product` VALUES ('12', 'test4', '3', null, '23.00', '元', null, '1', '0', null, '2020-02-19 22:26:26', null, null);
INSERT INTO `bd_product` VALUES ('13', 'test5', '3', null, '24.00', '元', null, '1', '0', null, '2020-02-19 22:26:38', null, null);
INSERT INTO `bd_product` VALUES ('14', 'test6', '2', null, '25.00', '元', null, '1', '0', null, '2020-02-19 22:26:49', null, null);
INSERT INTO `bd_product` VALUES ('15', 'nike1', '1', null, '1000.00', '元', null, '1', '0', null, '2020-02-19 22:27:05', null, null);

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
-- Records of bd_product_file
-- ----------------------------
INSERT INTO `bd_product_file` VALUES ('1', '/public/admin/upload/20200212/1581440928304.jpg', '1', '1', null, '2020-02-15 00:32:13', null, null);
INSERT INTO `bd_product_file` VALUES ('2', '/public/admin/upload/20200215/1581701967067.png', '1', '1', null, '2020-02-15 01:39:27', null, null);
INSERT INTO `bd_product_file` VALUES ('3', '/public/admin/upload/20200215/1581702515439.png', '1', '1', null, '2020-02-15 01:48:35', null, null);
INSERT INTO `bd_product_file` VALUES ('4', '/public/admin/upload/20200215/1581702785664.png', '1', '1', null, '2020-02-15 01:53:05', null, null);
INSERT INTO `bd_product_file` VALUES ('5', '/public/admin/upload/20200215/1581752316457.png', '2', '1', null, '2020-02-15 15:38:37', null, null);
INSERT INTO `bd_product_file` VALUES ('6', '/public/admin/upload/20200215/1581752816192.png', '5', '0', null, '2020-02-15 15:46:56', null, null);
INSERT INTO `bd_product_file` VALUES ('7', '/public/admin/upload/20200219/1582123726075.jpg', '2', '0', null, '2020-02-19 22:48:47', null, null);
INSERT INTO `bd_product_file` VALUES ('8', '/public/admin/upload/20200219/1582123748111.jpg', '2', '0', null, '2020-02-19 22:49:09', null, null);
INSERT INTO `bd_product_file` VALUES ('9', '/public/admin/upload/20200219/1582124456014.jpg', '1', '0', null, '2020-02-19 23:00:57', null, null);
INSERT INTO `bd_product_file` VALUES ('10', '/public/admin/upload/20200219/1582124471029.jpg', '1', '0', null, '2020-02-19 23:01:12', null, null);

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
-- Records of bd_product_stock
-- ----------------------------
INSERT INTO `bd_product_stock` VALUES ('1', '红色', '38', '1', '11', '0', null, '2020-02-16 00:12:02', null, null);
INSERT INTO `bd_product_stock` VALUES ('2', '黄色', '38', '1', '15', '0', null, '2020-02-16 00:42:31', null, null);
INSERT INTO `bd_product_stock` VALUES ('3', '黑色', '43', '2', '10', '0', null, '2020-02-20 14:32:09', null, null);
INSERT INTO `bd_product_stock` VALUES ('4', '黑色', '42', '2', '5', '0', null, '2020-02-20 14:58:19', null, null);
INSERT INTO `bd_product_stock` VALUES ('5', '红色', '42', '2', '5', '0', null, '2020-02-20 23:12:19', null, null);
INSERT INTO `bd_product_stock` VALUES ('6', '红色', '43', '3', '20', '0', null, '2020-02-27 10:34:26', null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='评论表';

-- ----------------------------
-- Records of order_comment
-- ----------------------------
INSERT INTO `order_comment` VALUES ('1', '27', 'good', '21', '1', '5', '8', '2020-02-25 23:25:48', null, null);
INSERT INTO `order_comment` VALUES ('2', '26', 'good', '1', '1', '5', '8', '2020-02-26 00:04:31', null, null);
INSERT INTO `order_comment` VALUES ('3', '22', '456', '1', '1', '5', '8', '2020-02-26 00:06:56', null, null);
INSERT INTO `order_comment` VALUES ('4', '23', '44', '2', '1', '1', '8', '2020-02-26 00:08:54', null, null);
INSERT INTO `order_comment` VALUES ('5', '20', '444', '2', '1', '2', '8', '2020-02-26 00:15:54', null, null);
INSERT INTO `order_comment` VALUES ('6', '19', '456', '1', '1', '4', '8', '2020-02-26 00:16:19', null, null);
INSERT INTO `order_comment` VALUES ('9', '18', 'gopod', '2', '1', '5', '8', '2020-02-25 00:18:34', null, null);
INSERT INTO `order_comment` VALUES ('10', '18', 'thank', '2', '2', null, '1', '2020-02-26 13:49:12', null, null);
INSERT INTO `order_comment` VALUES ('11', '18', 'no', '2', '3', null, '8', '2020-02-26 14:01:31', null, null);
INSERT INTO `order_comment` VALUES ('12', '27', '456888888', '2', '3', null, '8', '2020-02-26 22:45:59', null, null);
INSERT INTO `order_comment` VALUES ('13', '19', '6666666666', '1', '2', null, '1', '2020-02-27 14:13:52', null, null);
INSERT INTO `order_comment` VALUES ('14', '20', '谢谢你的回馈', '2', '2', null, '1', '2020-02-27 15:42:27', null, null);
INSERT INTO `order_comment` VALUES ('15', '23', '谢谢你的回馈', '2', '2', null, '1', '2020-02-27 15:44:23', null, null);

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
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES ('1', '1', '1', '1', '红色', '43', 'AIR JORDAN MARS', '/public/admin/upload/20200212/1581440928304.jpg', '600.00', null, '2020-02-24 10:19:25', null, null);
INSERT INTO `order_detail` VALUES ('2', '13', '1', '2', '红色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 17:27:01', null, null);
INSERT INTO `order_detail` VALUES ('3', '14', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 17:32:28', null, null);
INSERT INTO `order_detail` VALUES ('4', '14', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 17:32:28', null, null);
INSERT INTO `order_detail` VALUES ('5', '15', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 17:43:26', null, null);
INSERT INTO `order_detail` VALUES ('6', '15', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 17:43:26', null, null);
INSERT INTO `order_detail` VALUES ('7', '16', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 18:06:12', null, null);
INSERT INTO `order_detail` VALUES ('8', '16', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 18:06:13', null, null);
INSERT INTO `order_detail` VALUES ('9', '17', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 18:06:58', null, null);
INSERT INTO `order_detail` VALUES ('10', '17', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 18:06:58', null, null);
INSERT INTO `order_detail` VALUES ('11', '18', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:20:26', null, null);
INSERT INTO `order_detail` VALUES ('12', '18', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:20:26', null, null);
INSERT INTO `order_detail` VALUES ('13', '19', '1', '1', '红色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:31:15', null, null);
INSERT INTO `order_detail` VALUES ('14', '20', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:31:15', null, null);
INSERT INTO `order_detail` VALUES ('15', '21', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:33:03', null, null);
INSERT INTO `order_detail` VALUES ('16', '22', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:33:03', null, null);
INSERT INTO `order_detail` VALUES ('17', '23', '2', '1', '黑色', '43', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:35:51', null, null);
INSERT INTO `order_detail` VALUES ('18', '24', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:35:51', null, null);
INSERT INTO `order_detail` VALUES ('19', '25', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:36:59', null, null);
INSERT INTO `order_detail` VALUES ('20', '26', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:36:59', null, null);
INSERT INTO `order_detail` VALUES ('21', '27', '2', '1', '红色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:38:57', null, null);
INSERT INTO `order_detail` VALUES ('22', '28', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:38:57', null, null);
INSERT INTO `order_detail` VALUES ('23', '29', '2', '1', '黑色', '42', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:40:20', null, null);
INSERT INTO `order_detail` VALUES ('24', '30', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:40:20', null, null);
INSERT INTO `order_detail` VALUES ('25', '31', '2', '1', '黑色', '43', 'Air Jordan 1 Mid AJ1', '/public/admin/upload/20200219/1582123726075.jpg', '869.00', null, '2020-02-25 22:42:10', null, null);
INSERT INTO `order_detail` VALUES ('26', '32', '1', '1', '黄色', '38', 'AIR JORDAN MARS', '/public/admin/upload/20200219/1582124456014.jpg', '900.00', null, '2020-02-25 22:42:10', null, null);
INSERT INTO `order_detail` VALUES ('27', '33', '3', '1', '红色', '43', 'nikekkk鞋', '/public/admin/no_data.png', '120.00', null, '2020-02-27 10:36:16', null, null);
INSERT INTO `order_detail` VALUES ('28', '34', '3', '1', '红色', '43', 'nikekkk鞋', '/public/admin/no_data.png', '120.00', null, '2020-02-27 10:54:18', null, null);
INSERT INTO `order_detail` VALUES ('29', '35', '3', '1', '红色', '43', 'nikekkk鞋', '/public/admin/no_data.png', '120.00', null, '2020-02-27 10:58:10', null, null);

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
-- Records of order_header
-- ----------------------------
INSERT INTO `order_header` VALUES ('1', '123', '123', '123', '123', '123', '500.00', '1', null, '0', '0', '8', '2020-02-24 10:07:24', null, null);
INSERT INTO `order_header` VALUES ('13', 'OR20200225172700', '13680211019', 'kite', '哈哈哈哈测试', null, '900.00', '1', null, '0', '0', '8', '2020-02-25 17:27:01', null, null);
INSERT INTO `order_header` VALUES ('14', 'OR20200225173228', '13680211019', 'kite', '哈哈哈哈测试', null, '1738.00', '1', null, '0', '0', '8', '2020-02-25 17:32:28', null, null);
INSERT INTO `order_header` VALUES ('15', 'OR20200225174325', '13680211019', 'kite', '哈哈哈哈测试', '测试', '1738.00', '1', null, '0', '0', '8', '2020-02-25 17:43:26', null, null);
INSERT INTO `order_header` VALUES ('16', 'OR20200225180612', '13680211019', 'kite', '哈哈哈哈测试', '456', '1738.00', '1', null, '0', '0', '8', '2020-02-25 18:06:12', null, null);
INSERT INTO `order_header` VALUES ('17', 'OR20200225180658', '13680211019', 'kite', '哈哈哈哈测试', '456', '1738.00', '1', null, '0', '0', '8', '2020-02-25 18:06:58', null, null);
INSERT INTO `order_header` VALUES ('18', 'OR20200225222026', '13680211019', 'kite', '哈哈哈哈测试', '123', '1738.00', '5', '456', '1', '1', '8', '2020-02-25 22:20:26', null, null);
INSERT INTO `order_header` VALUES ('19', 'OR20200225223115', '13680211019', 'kite', '哈哈哈哈测试', '777', '900.00', '5', '123', '0', '1', '8', '2020-02-25 22:31:15', null, null);
INSERT INTO `order_header` VALUES ('20', 'OR20200225223115', '13680211019', 'kite', '哈哈哈哈测试', '777', '869.00', '5', '123', '0', '1', '8', '2020-02-25 22:31:15', null, null);
INSERT INTO `order_header` VALUES ('21', 'OR20200225223303', '13680211019', 'kite', '哈哈哈哈测试', '888', '869.00', '1', null, '0', '0', '8', '2020-02-25 22:33:03', null, null);
INSERT INTO `order_header` VALUES ('22', 'OR20200225223303', '13680211019', 'kite', '哈哈哈哈测试', '888', '900.00', '5', '123', '0', '0', '8', '2020-02-25 22:33:03', null, null);
INSERT INTO `order_header` VALUES ('23', 'OR20200225223551', '13680211019', 'kite', '哈哈哈哈测试', '999', '869.00', '5', '123', '0', '1', '8', '2020-02-25 22:35:51', null, null);
INSERT INTO `order_header` VALUES ('24', 'OR20200225223551', '13680211019', 'kite', '哈哈哈哈测试', '999', '900.00', '1', null, '0', '0', '8', '2020-02-25 22:35:51', null, null);
INSERT INTO `order_header` VALUES ('25', 'OR20200225223659', '13680211019', 'kite', '哈哈哈哈测试', '666', '869.00', '0', '123', '0', '0', '8', '2020-02-25 22:36:59', null, null);
INSERT INTO `order_header` VALUES ('26', 'OR20200225223659', '13680211019', 'kite', '哈哈哈哈测试', '666', '900.00', '5', '456', '0', '0', '8', '2020-02-25 22:36:59', null, null);
INSERT INTO `order_header` VALUES ('27', 'OR20200225223857', '13680211019', 'kite', '哈哈哈哈测试', '33', '869.00', '5', '444', '1', '0', '8', '2020-02-25 22:38:57', null, null);
INSERT INTO `order_header` VALUES ('28', 'OR20200225223857', '13680211019', 'kite', '哈哈哈哈测试', '33', '900.00', '0', null, '0', '0', '8', '2020-02-25 22:38:57', null, null);
INSERT INTO `order_header` VALUES ('29', 'OR20200225224020', '13680211019', 'kite', '广东省广州市天河区XXXXXXXXXXXXX', '11', '869.00', '2', null, '0', '0', '8', '2020-02-25 22:40:20', null, null);
INSERT INTO `order_header` VALUES ('30', 'OR20200225224020', '13680211019', 'kite', '哈哈哈哈测试', '11', '900.00', '0', null, '0', '0', '8', '2020-02-25 22:40:20', null, null);
INSERT INTO `order_header` VALUES ('31', 'OR20200225224210', '13680211019', 'kite', '哈哈哈哈测试', '44', '869.00', '2', null, '0', '0', '8', '2020-02-25 22:42:10', null, null);
INSERT INTO `order_header` VALUES ('32', 'OR20200225224210', '13680211019', 'kite', '哈哈哈哈测试', '44', '900.00', '2', null, '0', '0', '8', '2020-02-25 22:42:10', null, null);
INSERT INTO `order_header` VALUES ('33', 'OR20200227103615', '13680211019', 'kite', '哈哈哈哈测试', '4444', '120.00', '2', null, '0', '0', '8', '2020-02-27 10:36:16', null, null);
INSERT INTO `order_header` VALUES ('34', 'OR20200227105417', '13680211019', 'kite', '哈哈哈哈测试', '456', '120.00', '2', null, '0', '0', '8', '2020-02-27 10:54:18', null, null);
INSERT INTO `order_header` VALUES ('35', 'OR20200227105809', '13680211019', 'kite', '哈哈哈哈测试', '777', '120.00', '3', '66666666', '0', '0', '8', '2020-02-27 10:58:10', null, null);

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
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '123456', 'admin', '1', '10086', '1', '/public/admin/face.jpg', '0', null, '2020-01-30 15:53:40', null, '2020-02-28 17:20:33');
INSERT INTO `sys_user` VALUES ('2', 'user', '123456', 'user', '2', '10000', '1', '/public/admin/face.jpg', '0', null, '2020-01-30 16:52:38', null, null);
INSERT INTO `sys_user` VALUES ('3', 'test', '123456', 'test', '2', '123456', '1', '/public/admin/face.jpg', '1', null, '2020-01-31 19:29:58', null, null);
INSERT INTO `sys_user` VALUES ('4', 'test1', '123456', 'test1', '2', '123456', '1', '/public/admin/face.jpg', '0', null, '2020-01-31 19:33:57', null, null);
INSERT INTO `sys_user` VALUES ('5', 'test', '123456', 'test', '2', '123456', '1', '/public/admin/face.jpg', '0', null, '2020-01-31 19:34:57', null, null);
INSERT INTO `sys_user` VALUES ('8', 'kite', '123456', 'kite', '2', '13680211019', '1', '/public/admin/face.jpg', '0', null, '2020-02-21 00:36:03', null, '2020-02-26 17:55:07');
INSERT INTO `sys_user` VALUES ('9', 'bb', '123456', 'bb', '2', '666666', '1', '/public/admin/face.jpg', '0', null, '2020-02-21 00:37:09', null, null);

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

-- ----------------------------
-- Records of sys_user_address
-- ----------------------------
INSERT INTO `sys_user_address` VALUES ('1', '2', 'user', '10000', '广东湛江', '0', null, '2020-01-31 14:32:32', null, null);
INSERT INTO `sys_user_address` VALUES ('2', '2', 'user', '10000', '广东广州', '0', null, '2020-01-31 14:38:16', null, null);
INSERT INTO `sys_user_address` VALUES ('4', '2', 'user', '10000', 'test', '1', null, '2020-01-31 17:22:10', null, null);
INSERT INTO `sys_user_address` VALUES ('5', '8', 'kite', '13680211019', '哈哈哈哈测试', '1', null, '2020-02-22 12:01:55', null, null);
INSERT INTO `sys_user_address` VALUES ('6', '8', 'kite', '13680211019', '123456', '0', null, '2020-02-22 12:07:00', null, null);
INSERT INTO `sys_user_address` VALUES ('7', '8', 'kite', '13680211019', '456', '0', null, '2020-02-22 12:07:56', null, null);
INSERT INTO `sys_user_address` VALUES ('8', '8', '123', '13680211019', '444', '0', null, '2020-02-22 12:08:26', null, null);
INSERT INTO `sys_user_address` VALUES ('10', '8', '55', '55', '55', '0', null, '2020-02-22 12:14:04', null, null);
