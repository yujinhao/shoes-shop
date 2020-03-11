<template>
	<view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{address.name}}
					</view>
					<view class="tel">
						{{address.telephone}}
					</view>
				</view>
				<view class="addres">
					{{address.address}}
				</view>
				
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="row.img?url + row.img:'/static/img/no_data.png'"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">选择颜色:{{row.color}},鞋码:{{row.size}},数量:{{row.num}}</view>
						<view class="price-number">
							<view class="price">￥{{row.price*row.num}}</view>
							<view class="number">
								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view>
		</view>
		<view class="detail">
			<textarea placeholder-style="font-size: 14px;" @blur="bindTextAreaBlur" placeholder="备注"/>
		</view>
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{goodsPrice|toFixed}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js';
	export default {
		data() {
			return {
				buylist:[],		//订单列表
				goodsPrice:0.0,	//商品合计价格
				address:{
					name:'',
					telephone: '',
					address: '点击设置地址',
					address_id: '',
				},
				descr: '',
				user:{},
				url: common.websiteUrl,
			};
		},
		onShow() {
			uni.getStorage({
				key: 'user',
				success: (res)=>{
					if(!res.data){
						return ;
					}
					this.user = res.data;
					this.getAddress(res.data.user_id);
				}
			});
			//页面显示时，加载订单信息
			uni.getStorage({
				key:'buylist',
				success: (ret) => {
					this.goodsPrice=0;
					for(let i = 0; i < ret.data.length; i++){
						uni.request({
						    url: common.websiteUrl + '/api/getProductById', 
						    data: {
						        product_id: ret.data[i].product_id,
						    },
						    success: (res) => {
								ret.data[i].price = res.data.data.price;
								this.buylist.push(ret.data[i])
								this.len = res.data.data.bd_product_files.length;
								this.goodsPrice = this.goodsPrice + (ret.data[i].num*ret.data[i].price);
						    }
						});
					}
				}
			});
		},
		onHide() {
			
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed:function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			bindTextAreaBlur: function (e) {
				this.descr = e.detail.value;
			},
			//地址
			getAddress(id){
				uni.getStorage({
					key:'selectAddress',
					success: (e) => {
						this.address = e.data;
						uni.removeStorage({
							key:'selectAddress'
						})
					},
				});
				if(this.address.address_id === ''){
					uni.request({
					    url: common.websiteUrl + '/api/getAddress', 
						data: {
						    user_id: id,
						},
					    success: (res) => {
							if(res.data.data.length > 0){
								this.address = res.data.data[0];
							}
					    }
					});
				}
			},
			clearOrder(){
				uni.removeStorage({
					key: 'buylist',
					success: (res)=>{
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay(){
				//商品列表
				let paymentOrder = [];
				let goods =[];
				let len = this.buylist.length;
				goods = this.groupArr(this.buylist)
				console.log(goods);
				for(let i = 0; i < goods.length; i++){
					let order = {
						user_mobile: this.address.telephone,
						recipient: this.address.name,
						address: this.address.address,
						descr: this.descr,
						create_by: this.user.user_id,
						productList: []
					}
					for(let j = 0; j < goods[i].data.length; j++){
						let orderDetail = {
							product_id: goods[i].data[j].product_id,
							product_name: goods[i].data[j].product_name,
							product_num: goods[i].data[j].num,
							product_color: goods[i].data[j].color,
							product_size: goods[i].data[j].size,
							img: goods[i].data[j].img,
							price: goods[i].data[j].price
						}
						order.productList.push(orderDetail);
					}
					paymentOrder.push(order);
				}
				if(paymentOrder.length==0){
					uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
					return ;
				}
				uni.showLoading({
					title:'正在提交订单...'
				})
				uni.request({
					url: common.websiteUrl + '/api/order', 
					data: {
						data: JSON.stringify(paymentOrder)
					},
					method: 'post',
					success: (res) => {
						if(res.data.code == 200){
							setTimeout(()=>{
								uni.setStorage({
									key:'paymentOrder',
									data:res.data.data,
									success: () => {
										uni.hideLoading();
										uni.redirectTo({
											url:"../pay/payment/payment?amount="+this.goodsPrice
										})
									}
								})
							},1000)
						}else{
							uni.hideLoading();
							uni.showToast({title:'订单信息有误，请重新购买',icon:'none'});
						}
					}
				});
			},
			groupArr(data){
				var map = {}, dest = [];
				for(var i = 0; i < data.length; i++){
				    var ai = data[i];    //ai代表list中的某一项
				    if(!map[ai.product_id]){  //临时键值对变量中不存在此键
				        dest.push({     //将此数据以json对象格式放到数组中{key1:value1,key2:value2},key1是分组的字段,key2是list中的某一条数据
				            product_id: ai.product_id,
				            data: [ai]
				        });
				        map[ai.product_id] = ai;    //将未加入map的key放入
				    }else{   //临时键值对中有此键
				        for(var j = 0; j < dest.length; j++){    //遍历list
				            var dj = dest[j];    //结果数组中某一项数据
				            if(dj.product_id == ai.product_id){    //结果数据中此dest[key1]的值和该list[i].uname的值相等时
				                dj.data.push(ai);    //把list[i]也放入该dest[key1].data中去
				                break;
				            }
				        }
				    }
				}
				return dest;
			},
			//选择收货地址
			selectAddress(){
				uni.navigateTo({
					url:'../user/address/address?type=select'
				})
			}
		}
	}
</script>

<style lang="scss">
.addr{
	width: 86%;
	padding: 20upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	display: flex;
	.icon{
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
	.tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	}
}
.buy-list{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 30upx 0;
		.goods-info{
			width: 100%;
			display: flex;
			.img{
				width: 22vw;
				height: 22vw;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 10upx;
				image{
					width: 22vw;
					height: 22vw;
				}
			}
			.info{
				width: 100%;
				height: 22vw;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				.title{
					width: 100%;
					font-size: 28upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// text-align: justify;
					overflow: hidden;
				}
				.spec{
					font-size: 22upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 40upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 20upx;
					margin-bottom: 20vw;
				}
				.price-number{
					position: absolute;
					width: 100%;
					bottom: 0upx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 28upx;
					height: 40upx;
					.price{
						color: #f06c7a;
					}
					.number{
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
	}
}
.order{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 20upx 0;
		height: 40upx;
		display: flex;
		.left{
			font-size: 28upx;
		}
		.right{
			margin-left: 40upx;
			font-size: 26upx;
			color: #999;
			input{
				font-size: 26upx;
				color: #999;
			}
		}
	}
}
.blck{
	width: 100%;
	height: 100upx;
}
.footer{
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
.detail{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		height: 60upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nominal{
			font-size: 28upx;
		}
		.content{
			font-size: 26upx;
			color: #f06c7a;
		}
	}
}
</style>
