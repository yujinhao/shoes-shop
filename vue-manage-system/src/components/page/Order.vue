<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.order_no" placeholder="订单号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column label="ID" type="index" width="50"></el-table-column>
<!--                <el-table-column prop="user_id" label="ID" width="55" align="center"></el-table-column>-->
                <el-table-column prop="order_no" width="160" label="订单号"></el-table-column>
                <el-table-column prop="recipient" label="下单人"></el-table-column>
<!--                <el-table-column prop="user_mobile" label="收件电话"></el-table-column>-->
<!--                <el-table-column prop="address" label="地址"></el-table-column>-->
                <el-table-column label="商品详情" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-search"
                                @click="productSee(scope.$index, scope.row)"
                        >查看商品详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="total_price" label="订单价格"></el-table-column>
                <el-table-column label="订单状态" width="80">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.status===2?'danger':(scope.row.sex===3?'warning':'success')"
                        >{{scope.row.status===2?'未发货':(scope.row.sex===3?'待收货':'已收货')}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="express_no" label="快递单号"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.status===2"
                                type="text"
                                icon="el-icon-truck"
                                @click="handleEdit(scope.$index, scope.row)"
                        >发货</el-button>
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

        <!-- 查看商品详情 -->
        <el-dialog title="商品详情查看" :visible.sync="seeProductVisible" width="60%">
            <el-table :data="product">
                <el-table-column label="ID" type="index" width="50"></el-table-column>
                <el-table-column prop="product_name" label="商品名称" width="200"></el-table-column>
                <el-table-column label="图片(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.img"
                                :preview-src-list="[scope.row.img]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="product_color" label="颜色"></el-table-column>
                <el-table-column prop="product_size" label="鞋码"></el-table-column>
                <el-table-column prop="product_num" label="数量"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="seeProductVisible = false">关闭</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="发货" :visible.sync="editVisible" width="30%">
            <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="收件人">
                    <span>{{ checkOrder.recipient }}</span>
                </el-form-item>
                <el-form-item label="收件人电话">
                    <span>{{ checkOrder.user_mobile }}</span>
                </el-form-item>
                <el-form-item label="收件地址">
                    <span>{{ checkOrder.address }}</span>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="send" label-width="70px">
                <el-form-item label="快递单号">
                    <el-input v-model="send.express_no"></el-input>
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
    import { getOrder, deliver } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    page: 1,
                    limit: 10,
                    status: [2, 3, 4, 5],
                    order_no: '',
                },
                send: {
                    order_id: '',
                    express_no: '',
                },
                tableData: [],
                multipleSelection: [],
                editVisible: false,
                seeProductVisible: false,
                count: 0,
                product:[],
                checkOrder:{},
                url:'',
            };
        },
        created() {
            this.url = this.baseURL;
            this.getData();
        },
        methods: {
            productSee(index, row) {
                this.product = row.order_details;
                this.seeProductVisible = true;
            },
            // 获取数据
            getData() {
                getOrder({data: JSON.stringify(this.query)}).then(res => {
                    this.tableData = res.data.rows;
                    this.count = res.data.count || 50;
                    for (let i = 0; i < this.tableData.length; i++) {
                        for (let j = 0; j < this.tableData[i].order_details.length; j++) {
                            this.tableData[i].order_details[j].img = this.url + this.tableData[i].order_details[j].img;
                        }
                    }
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'page', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        deleteUser(row.user_id).then(res => {
                            console.log(res);
                            this.tableData.splice(index, 1);
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
					this.$message.error('请勾选需要删除的用户');
				}else{
                for (let i = 0; i < length; i++) {
                    deleteUser(this.multipleSelection[i].user_id).then(res => {
                        console.log(res);
                        this.getData();
                    });
                }
                this.$message.success('删除成功');
                this.multipleSelection = [];

            }},
            // 编辑操作
            handleEdit(index, row) {
                this.send.order_id = row.order_id;
                this.checkOrder = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                //this.$set(this.tableData, this.idx, this.form);
                deliver(this.send).then(res => {
                    this.getData();
                    this.$message.success(res.msg);
                });
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.getData();
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

</style>
