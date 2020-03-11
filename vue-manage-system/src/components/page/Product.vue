<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.product_name" placeholder="商品名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-lx-add" @click="handleCreate">新建</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="product_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="product_name" label="商品名称"></el-table-column>
                <el-table-column prop="bd_category.category_name" label="商品分类"></el-table-column>

                <el-table-column label="价格">
                    <template slot-scope="scope">{{scope.row.price}} {{scope.row.unit}}</template>
                </el-table-column>
                <el-table-column label="Banner图片" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-search"
                                @click="bannerEdit(scope.$index, scope.row)"
                        >查看Banner图片</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="库存" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-search"
                                @click="stockSee(scope.$index, scope.row)"
                        >查看库存</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="是否上架" align="center">
                    <template slot-scope="scope">
                        <el-tag class="upDown"
                            :type="scope.row.enabled===1?'success':(scope.row.enabled===0?'danger':'')"
                                @click="upOrDown(scope.$index, scope.row)"
                        >{{scope.row.enabled===1?'上架':'下架'}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.page"
                    :page-size="query.limit"
                    :total="count"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 查看Banner弹出框 -->
        <el-dialog title="图片查看" :visible.sync="editBannerVisible" width="60%">
            <el-table :data="banner">
                <el-table-column property="file_id" label="id" width="150"></el-table-column>
                <el-table-column label="图片(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.url"
                                :preview-src-list="[scope.row.url]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="bannerDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-upload
                    class="upload-demo"
                    :action="upload"
                    name="url"
                    :data="updateData"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                <el-button size="small"  >+</el-button>
            </el-upload>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editBannerVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <!-- 查看Stock弹出框 -->
        <el-dialog title="图片查看" :visible.sync="seeStockVisible" width="60%">
            <el-table :data="stock">
                <el-table-column property="stock_id" label="id" width="150"></el-table-column>
                <el-table-column property="color" label="颜色" ></el-table-column>
                <el-table-column property="size" label="鞋码" ></el-table-column>
                <el-table-column property="num" label="数量" ></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="stockEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="stockDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button size="small" style="display:block;margin:0 auto" @click="stockCreate">+</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="seeStockVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <!-- Stock编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editStockVisible" width="30%">
            <el-form ref="stockForm" :model="stockForm" >
                <el-form-item label="颜色">
                    <el-input v-model="stockForm.color" placeholder="请输入颜色"></el-input>
                </el-form-item>
                <el-form-item label="鞋码">
                    <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="stockForm.size" placeholder="请输入鞋码"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="stockForm.num" placeholder="请输入数量"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editStockVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveStockEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" >
                <el-form-item label="分类">
                    <el-select v-model="form.category_id" placeholder="请选择">
                        <el-option v-for="item in category" :key="item.category_id" :label="item.category_name" :value="item.category_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="form.product_name" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入价格" v-model="form.price" class="input-with-select">
                        <el-select v-model="form.unit" slot="append" placeholder="请选择">
                            <el-option label="元" value="元"></el-option>
                            <el-option label="美元" value="美元"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <quill-editor
                        v-model="form.descr"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="onEditorChange($event)"
                ></quill-editor>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { quillRedefine } from 'vue-quill-editor-upload'
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    // require styles 引入样式
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";

    import {
        getProduct,
        updateProduct,
        createProduct,
        deleteProduct,
        upOrDownProduct,
        getProductFile,
        deleteProductFile,
        getCategory,
        getProductStock,
        updateProductStock,
        createProductStock,
        deleteProductStock
    } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            editorOption: {},
            dragOptions:{
                animation: 120,
                scroll: true,
                group: 'sortlist',
                ghostClass: 'ghost-style'
            },
            query: {
                page: 1,
                limit: 10
            },
            stock:[],
            banner: [],
            category: [],
            tableData: [],
            multipleSelection: [],
            editVisible: false,
            editBannerVisible: false,
            seeStockVisible: false,
            editStockVisible: false,
            count: 0,
            form: {
                product_id: '',
                product_name: '',
                category_id: '',
                price: '',
                unit: '',
                descr: '',
            },
            stockForm: {
                color: '',
                size: '',
                num: '',
                stock_id: '',
                product_id: ''
            },
            updateData: {
                data:''
            },
            url: '',
            upload: '',
            imageUrl: '',
            file: '',
            id:0
        };
    },
    components: { quillEditor, quillRedefine },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    created() {
        this.url = this.baseURL;
        this.upload = this.baseURL + '/api/admin/productFile';
        this.getData();
        this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
            {
                placeholder: "请输入...",
                toolOptions: [
                    ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
                    [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],  //列表
                    [{ 'header': [1, 2, 3, 4, 5, 6] }],  //几级标题
                    [{ 'color': [] }, { 'background': [] }],  // 字体颜色，字体背景颜色
                    [{ 'font': [] }],  //字体
                    ['image'] //上传图片
                ], //工具栏设置
                theme:'snow',
                // 图片上传的设置
                uploadConfig: {
                    action: this.baseURL + '/api/admin/upload',  // 必填参数 图片上传地址
                    res: (respnse) => {
                        return this.baseURL + respnse.data.file;//return图片url
                    },
                    name: 'file'  // 图片上传参数名
                }
            })
    },

    methods: {

        onEditorChange() {
            console.log(this.form.descr);
        }, // 内容改变事件
        // 获取数据
        getData() {
            getProduct(this.query).then(res => {
                this.tableData = res.data.rows;
                console.log(this.tableData);
                this.count = res.data.count || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 出发新建按钮
        handleCreate() {
            this.editVisible = true;
            this.form.product_id = '';
            this.form.product_name = '';
            this.form.unit = '';
            this.form.category_id = '';
            this.form.price = '';
            getCategory().then(res => {
                this.category = res.data;
            });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteProduct(row.product_id).then(res => {
                        this.$message.success(res.msg);
                        if(res.code == 200){
                            this.tableData.splice(index, 1);
                        }
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
			if(length==0){
				this.$message.error('请勾选需要删除的球鞋');
			}else{
            for (let i = 0; i < length; i++) {
                deleteProduct(this.multipleSelection[i].product_id).then(res => {
                    this.getData();
                });
            }
            this.$message.success('删除成功');
            this.multipleSelection = [];

        }},
        // 编辑操作
        handleEdit(index, row) {
            this.form.product_id = row.product_id;
            this.form.product_name = row.product_name;
            this.form.unit = row.unit;
            this.form.category_id = row.category_id;
            this.form.price = row.price;
            this.form.descr = row.descr;
            this.editVisible = true;
            getCategory().then(res => {
                this.category = res.data;
            });

        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            console.log(this.form);
            if(this.form.product_id === ''){
                createProduct(this.form).then(res => {
                    this.getData();
                    this.$message.success(res.msg);
                });
            }else{
                updateProduct(this.form).then(res => {
                    this.getData();
                    this.$message.success(res.msg);
                });
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        },
        // 上架下架
        upOrDown(index, row) {
            let d = {
                product_id: row.product_id
            }
            upOrDownProduct(d).then(res => {
                this.$message.success(res.msg);
                this.getData();
            });
        },
        // banner编辑操作
        bannerEdit(index, row) {
            let d = {
                product_id: row.product_id
            }
            this.editBannerVisible = true;

            getProductFile(d).then(res => {
                this.banner = res.data;
                for (let i = 0; i < this.banner.length; i++) {
                    this.banner[i].url = this.url + this.banner[i].url;
                }
            });

            this.updateData.data = JSON.stringify(d);;
            this.id = row.product_id;
        },
        // stock查看操作
        stockSee(index, row) {
            let d = {
                product_id: row.product_id
            }
            this.seeStockVisible = true;

            getProductStock(d).then(res => {
                this.stock = res.data;
            });
            this.id = row.product_id;
        },
        // 删除操作
        bannerDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteProductFile(row.file_id).then(res => {
                        this.$message.success(res.msg);
                        if(res.code == 200){
                            this.banner.splice(index, 1);
                        }
                    });
                })
                .catch(() => {});
        },
        handleAvatarSuccess() {
            let d = {
                product_id: this.id
            }
            getProductFile(d).then(res => {
                this.banner = res.data;
                for (let i = 0; i < this.banner.length; i++) {
                    this.banner[i].url = this.url + this.banner[i].url;
                }
            });
        },
        updateImg(file, fileList) {
            console.log(file, fileList);
            this.file = file.raw;
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        // stock编辑操作
        stockEdit(index, row) {
            this.editStockVisible = true;
            this.stockForm.color = row.color;
            this.stockForm.size = row.size;
            this.stockForm.num = row.num;
            this.stockForm.stock_id = row.stock_id;
            this.stockForm.product_id = this.id;
        },
        // stock删除操作
        stockDelete(index, row) {

        },
        // stock创建操作
        stockCreate(){
            this.editStockVisible = true;
            this.stockForm.color = '';
            this.stockForm.size = '';
            this.stockForm.num = '';
            this.stockForm.stock_id = '';
            this.stockForm.product_id = this.id;
        },
        saveStockEdit(){
            this.editStockVisible = false;
            if(this.stockForm.stock_id === ''){
                createProductStock(this.stockForm).then(res => {
                    let d = {
                        product_id: this.id
                    }
                    this.seeStockVisible = true;

                    getProductStock(d).then(res => {
                        this.stock = res.data;
                    });
                    this.$message.success(res.msg);
                });
            }else{
                updateProductStock(this.stockForm).then(res => {
                    let d = {
                        product_id: this.id
                    }
                    this.seeStockVisible = true;

                    getProductStock(d).then(res => {
                        this.stock = res.data;
                    });
                    this.$message.success(res.msg);
                });
            }
        }
    }
};
</script>

<style>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
.avatar-uploader{
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;

}
.upDown {
    cursor:pointer;
}
.upload-demo{
    text-align: center;
}
.el-select .el-input__inner {

    width: 100px;
}
</style>
