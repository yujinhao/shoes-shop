<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 评论管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="star" placeholder="评分" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="差评" value="差评"></el-option>
                    <el-option key="3" label="一般" value="一般"></el-option>
                    <el-option key="4" label="好评" value="好评"></el-option>
                </el-select>
                <el-select v-model="reply" placeholder="回复/未回复" class="handle-select mr10">
                    <el-option key="1" label="全部" value="全部"></el-option>
                    <el-option key="2" label="未回复" value="未回复"></el-option>
                </el-select>
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
                <el-table-column prop="descr" label="评论内容"></el-table-column>
                <el-table-column prop="append.descr" label="追论内容"></el-table-column>
                <el-table-column label="星级">
                    <template slot-scope="scope">
                        <el-rate
                                v-model="scope.row.star"
                                disabled
                                show-score
                                text-color="#ff9900">
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column label="评分" width="80">
                    <template slot-scope="scope">
                        <el-tag
                                :type="(scope.row.star===0||scope.row.star===1)?'danger':((scope.row.star===2||scope.row.star===3)?'warning':'success')"
                        >{{(scope.row.star===0||scope.row.star===1)?'差评':((scope.row.star===2||scope.row.star===3)?'一般':'好评')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="订单详情" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-search"
                                @click="productSee(scope.$index, scope.row)"
                        >查看订单详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.order_header.reply===0"
                                type="text"
                                icon="el-icon-truck"
                                @click="handleEdit(scope.$index, scope.row)"
                        >回复</el-button>
                        <el-button
                                v-if="scope.row.order_header.reply===1"
                                type="text"
                                icon="el-icon-search"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >查看回复</el-button>
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

        <!-- 查看订单详情 -->
        <el-dialog title="订单详情查看" :visible.sync="seeProductVisible" width="60%">
            <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="订单号">
                    <span>{{ order.order_no }}</span>
                </el-form-item>
                <el-form-item label="下单人">
                    <span>{{ order.recipient }}</span>
                </el-form-item>
                <el-form-item label="收件人电话">
                    <span>{{ order.user_mobile }}</span>
                </el-form-item>
                <el-form-item label="收件地址">
                    <span>{{ order.address }}</span>
                </el-form-item>
                <el-form-item label="备注">
                    <span>{{ order.descr }}</span>
                </el-form-item>
                <el-form-item label="总价">
                    <span>{{ order.total_price }}</span>
                </el-form-item>
            </el-form>
            <el-table :data="order.order_details">
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
        <el-dialog title="回复评论" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="send" label-width="70px">
                <el-form-item label="回复内容">
                    <el-input type="textarea" :autosize="{ minRows: 6}" v-model="send.descr"></el-input>
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
    import { createComment, getComment, getOrderById } from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    page: 1,
                    limit: 10,
                    reply: '',
                    star: [0,1,2,3,4, 5],
                },
                star: '全部',
                reply: '全部',
                send: {
                    order_id: '',
                    descr: '',
                    create_by: JSON.parse(localStorage.getItem('ms_username')).user_id,
                },
                tableData: [],
                multipleSelection: [],
                editVisible: false,
                seeProductVisible: false,
                count: 0,
                order:{},
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
                this.seeProductVisible = true;
                this.order = row.order_header;
            },
            // 获取数据
            getData() {
                switch(this.star) {
                    case "差评":
                        this.query.star = [0,1];
                        break;
                    case "一般":
                        this.query.star = [2,3];
                        break;
                    case "好评":
                        this.query.star = [4,5];
                        break;
                    default:
                        this.query.star = [0,1,2,3,4,5];
                }
                switch(this.reply) {
                    case "未回复":
                        this.query.reply = 0;
                        break;
                    default:
                        this.query.reply = '';
                }
                getComment({ data: JSON.stringify(this.query) }).then(res => {
                    this.tableData = res.data.rows;
                    this.count = res.data.count || 50;
                    for (let i = 0; i < this.tableData.length; i++) {
                        for (let j = 0; j < this.tableData[i].order_header.order_details.length; j++) {
                            this.tableData[i].order_header.order_details[j].img = this.url + this.tableData[i].order_header.order_details[j].img;
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
                this.$alert(row.reply.descr, '回复内容', {
                    confirmButtonText: '确定'
                });

            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    deleteUser(this.multipleSelection[i].user_id).then(res => {
                        console.log(res);
                        this.getData();
                    });
                }
                this.$message.success('删除成功');
                this.multipleSelection = [];

            },
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
                createComment(this.send).then(res => {
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
