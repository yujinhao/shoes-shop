<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分类管理
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
                <el-input v-model="query.category_name" placeholder="分类名" class="handle-input mr10"></el-input>
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
                <el-table-column prop="category_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="category_name" label="分类名"></el-table-column>
                <el-table-column prop="descr" label="分类描述"></el-table-column>
                <el-table-column label="logo(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.logo_url"
                            :preview-src-list="[scope.row.logo_url]"
                        ></el-image>
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="分类名">
                    <el-input v-model="form.category_name"></el-input>
                </el-form-item>
                <el-form-item label="分类描述">
                    <el-input v-model="form.descr"></el-input>
                </el-form-item>
                <el-form-item label="logo">
                    <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            :on-change="updateImg"
                            :auto-upload="false">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getCategoryPage, updateCategory, createCategory, deleteCategory, upOrDownCategory } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                limit: 10
            },
            tableData: [],
            multipleSelection: [],
            editVisible: false,
            count: 0,
            form: {
                category_id: '',
                category_name: '',
                descr: ''
            },
            idx: -1,
            id: -1,
            url: '',
            imageUrl: '',
            file: ''
        };
    },
    created() {
        this.url = this.baseURL;
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            getCategoryPage(this.query).then(res => {
                this.tableData = res.data.rows;
                this.count = res.data.count || 50;
                for (let i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].logo_url = this.baseURL + this.tableData[i].logo_url;
                }
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
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteCategory(row.category_id).then(res => {
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
				this.$message.error('请勾选需要删除的分类');
			}else{
            for (let i = 0; i < length; i++) {
                deleteCategory(this.multipleSelection[i].category_id).then(res => {
                    this.getData();
                });
            }
            this.$message.success('删除成功');
            this.multipleSelection = [];

        }},
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            // this.form = row;
            this.form.category_id = row.category_id;
            this.form.category_name = row.category_name;
            this.form.descr = row.descr;
            this.editVisible = true;
            this.imageUrl = row.logo_url;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            let str = JSON.stringify(this.form);
            const formData = new FormData();
            formData.append("data", str);
            formData.append("logo_url", this.file);
            if(this.form.category_id === ''){
                createCategory(formData).then(res => {
                    this.getData();
                    this.$message.success(res.msg);
                });
            }else{
                updateCategory(formData).then(res => {
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
                category_id: row.category_id
            }
            upOrDownCategory(d).then(res => {
                this.$message.success(res.msg);
                this.getData();
            });
        },
        updateImg(file, fileList) {
            console.log(file, fileList);
            this.file = file.raw;
            this.imageUrl = URL.createObjectURL(file.raw);
        }
    }
};
</script>

<style scoped>
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
</style>
