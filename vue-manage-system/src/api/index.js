import request from '../utils/request';

//创建分类
export const login = data => {
    return request({
        url: './api/login',
        method: 'post',
        data: data
    });
};
// 用户列表
export const getUser = query => {
    return request({
        url: './api/admin/userList',
        method: 'get',
        params: query
    });
};
// 删除用户
export const deleteUser = id => {
    return request({
        url: './api/admin/user/' + id,
        method: 'delete',
    });
};
// 获取分类
export const getCategoryPage = query => {
    return request({
        url: './api/admin/getCategory',
        method: 'get',
        params: query
    });
};
// 获取分类
export const getCategory = query => {
    return request({
        url: './api/getCategory',
        method: 'get',
        params: query
    });
};
//更新分类
export const updateCategory = data => {
    return request({
        url: './api/admin/category',
        method: 'put',
        data: data
    });
};
//创建分类
export const createCategory = data => {
    return request({
        url: './api/admin/category',
        method: 'post',
        data: data
    });
};
// 删除分类
export const deleteCategory = id => {
    return request({
        url: './api/admin/category/' + id,
        method: 'delete',
    });
};
// 上架下架分类
export const upOrDownCategory = query => {
    return request({
        url: './api/admin/category/upOrDown',
        method: 'get',
        params: query
    });
};
// 获取商品
export const getProduct = query => {
    return request({
        url: './api/admin/getProduct',
        method: 'get',
        params: query
    });
};
//更新商品
export const updateProduct = data => {
    return request({
        url: './api/admin/product',
        method: 'put',
        data: data
    });
};
//创建商品
export const createProduct = data => {
    return request({
        url: './api/admin/product',
        method: 'post',
        data: data
    });
};
// 删除商品
export const deleteProduct = id => {
    return request({
        url: './api/admin/product/' + id,
        method: 'delete',
    });
};
// 上架下架商品
export const upOrDownProduct = query => {
    return request({
        url: './api/admin/product/upOrDown',
        method: 'get',
        params: query
    });
};
// 获取文件
export const getProductFile = query => {
    return request({
        url: './api/admin/getProductFile',
        method: 'get',
        params: query
    });
};
//更新文件
export const updateProductFile = data => {
    return request({
        url: './api/admin/productFile',
        method: 'put',
        data: data
    });
};
//创建文件
export const createProductFile = data => {
    return request({
        url: './api/admin/productFile',
        method: 'post',
        data: data
    });
};
// 删除文件
export const deleteProductFile = id => {
    return request({
        url: './api/admin/productFile/' + id,
        method: 'delete',
    });
};
// 获取商品
export const getProductStock = query => {
    return request({
        url: './api/admin/getProductStock',
        method: 'get',
        params: query
    });
};
//更新商品
export const updateProductStock = data => {
    return request({
        url: './api/admin/productStock',
        method: 'put',
        data: data
    });
};
//创建商品
export const createProductStock = data => {
    return request({
        url: './api/admin/productStock',
        method: 'post',
        data: data
    });
};
// 删除商品
export const deleteProductStock = id => {
    return request({
        url: './api/admin/productStock/' + id,
        method: 'delete',
    });
};
//面板获取数量
export const getNum = query => {
    return request({
        url: './api/admin/getNum',
        method: 'get',
    });
};
//面板获取数量
export const getOrderNum = query => {
    return request({
        url: './api/admin/getOrderNum?status=2',
        method: 'get',
    });
};
// 订单列表
export const getOrder = query => {
    return request({
        url: './api/admin/getOrder',
        method: 'get',
        params: query
    });
};
//发货
export const deliver = data => {
    return request({
        url: './api/admin/deliver',
        method: 'put',
        data: data
    });
};
// 评论列表
export const getComment = query => {
    return request({
        url: './api/admin/getComment',
        method: 'get',
        params: query
    });
};
//创建商品
export const createComment = data => {
    return request({
        url: './api/admin/comment',
        method: 'post',
        data: data
    });
};
// 评论列表
export const getOrderById = query => {
    return request({
        url: './api/admin/getOrderById',
        method: 'get',
        params: query
    });
};