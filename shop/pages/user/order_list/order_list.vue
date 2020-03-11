<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">{{typeText[row.status]}}</view>
					
					<view class="order-info" v-for="(item,index1) in row.order_details" :key="index1">
						<view class="left">
							<image :src="item.img?url + item.img:'/static/img/no_data.png'"></image>
						</view>
						<view class="right">
							<view class="orderno">
								订单号:{{row.order_no}}
							</view>
							<view class="name">
								{{item.product_name}}
							</view>
							<view class="spec">{{item.product_color}} {{item.product_size}}</view>
							<view class="price-number">
								￥<view class="price">{{item.price}}</view>
								x<view class="number">{{item.product_num}}</view>
							</view>
						</view>
						
					</view>
					<view class="detail">
						<view class="sum">合计￥<view class="price">{{row.total_price}}</view></view>
					</view>
					<view class="btns">
						<block v-if="row.status==1"><view class="default" @tap="cancelOrder(row)">取消订单</view><view class="pay" @tap="toPayment(row)">付款</view></block>
						<block v-if="row.status==2"><view class="default" @tap="remindDeliver(row)">提醒发货</view></block>
						<block v-if="row.status==3"><view class="pay" @tap="showLogistics(row)">确认收货</view></block>
						<block v-if="row.status==4"><view class="default" @tap="toComment(row)">评价</view></block>
						<block v-if="row.status==5 && row.append==0"><view class="default" @tap="toAddComment(row)">追加评价</view></block>
						<!-- <block v-if="row.status=='refunds'"><view class="default">查看进度</view></block>
						<block v-if="row.status=='cancelled'"><view class="default">已取消</view></block> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
		import common from '../../../common/common.js';
	export default {
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				typeText:['已取消','等待付款', '等待商家发货', '商家已发货', '等待用户评价', '交易已完成'],
				orderType: ['全部','待付款','待发货','待收货','待评价','已完成'],
				list:[],
				user:{},
				url: common.websiteUrl,
				tabbarIndex:0
			};
		},
		onLoad(option) {
			uni.getStorage({
				key: 'user',
				success: (res)=>{
					if(!res.data){
						return ;
					}
					this.user = res.data;
				}
			});
				//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex)+1;
			this.tabbarIndex = tbIndex;
			
			//兼容H5下排序栏位置
			// #ifdef H5
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
			
		},
		onShow(){
			this.showType(this.tabbarIndex);
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				let status = '';
				if(tbIndex != 0){
					status = tbIndex;
				}
				uni.request({
					url: common.websiteUrl + '/api/getOrder', 
					data: {
						status: status,
						user_id: this.user.user_id
					},
					success: (res) => {
						this.list = res.data.data;
					}
				});
				
				
				//this.list = this.orderList[tbIndex];
				
			},
			showLogistics(row){
				uni.showModal({
					title: '确认送达',
					content: '确认送达？',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
							    url: common.websiteUrl + '/api/confirm', 
								data: {
								    order_id: row.order_id,
								},
								method:'PUT',
							    success: (res) => {
									uni.showToast({
										title:'确认送达'
									});
									this.showType(this.tabbarIndex);
							    }
							});
						}
					}
				});
			},
			remindDeliver(row){
				uni.showToast({
					title:'已提醒商家发货'
				})
			},
			cancelOrder(row){
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
							    url: common.websiteUrl + '/api/cancel', 
								data: {
								    order_id: row.order_id,
								},
								method:'PUT',
							    success: (res) => {
									uni.showToast({
										title:'取消成功'
									});
									this.showType(this.tabbarIndex);
							    }
							});
						}
					}
				});
			},
			toPayment(row){
				uni.showLoading({
					title:'正在获取订单...'
				})
				let paymentOrder = [];
				paymentOrder.push(row);
				setTimeout(()=>{
					uni.setStorage({
						key:'paymentOrder',
						data:paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.navigateTo({
								url:'../../pay/payment/payment?amount='+row.total_price
							})
						}
					})
				},500)
			},
			toComment(row){
				uni.navigateTo({
					url:'comment?order_id=' + row.order_id + '&type=1'
				})
			},
			toAddComment(row){
				uni.navigateTo({
					url:'comment?order_id=' + row.order_id + '&type=3'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #f8f8f8;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.grid{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		width: 94%;
		margin: 0 auto;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.type{
				font-size: 26upx;
				color: #ec652f;
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.orderno{
				font-size: 26upx;
				color: rgba(0,0,0,0.65);
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.order-info{
				width: 100%;
				display: flex;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 22upx;

					}
					.price-number{
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: flex-end;
						font-size: 22upx;
						color: #333;
						display: flex;
						align-items: flex-end;
						.price{
							font-size: 24upx;
							margin-right: 5upx;
						}
						
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				height: 60upx;
				font-size: 26upx;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: flex-end;
					.price{
						font-size: 30upx;
					}
				}
				
			}
			.btns{
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
					min-width: 120upx;
					height: 50upx;
					padding: 0 20upx;
					border-radius: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28upx;
					margin-left: 20upx;
				}
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx #ec652f;
					color: #ec652f;
				}
			}
		}
	}
}
</style>
