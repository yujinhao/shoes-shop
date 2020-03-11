<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon cart" @tap="joinCart"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon cart" @tap="joinCart"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
		<!-- 	<view class="icons">
				<view class="box" @tap="share">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view>
			</view> -->
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/img/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择颜色：</view>
					<view class="sp">
						<view v-for="(item,index) in color" :class="[index==selectColor?'on':'', item.deleted==1?'no':'']" @tap="setSelectColor(index, item)" :key="index">{{item.color}}</view>
					</view>
					<view class="title">选择鞋码：</view>
					<view class="sp">
						<view v-for="(item,index) in size" :class="[index==selectSize?'on':'', item.deleted==1?'no':'']" @tap="setSelectSize(index, item)" :key="index">{{item.size}}</view>
					</view>
					<view class="length" v-if="selectColor!=null && selectSize!=null">
						<view class="text">剩余数量: {{num}}</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="checkData.num" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="finish">完成</view></view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in goodsData.bd_product_files" :key="swiper.file_id">
					<image :src="url + swiper.url"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{len}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goodsData.price}}</view>
			<view class="title">
				{{goodsData.product_name}}
			</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showService">
				<view class="text">服务</view>
				<view class="content"><view class="serviceitem" v-for="(item,index) in service" :key="index">{{item.name}}</view></view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
			<view class="row" @tap="showSpec(false)">
				<view class="text">选择</view>
				<view class="content">
					<view>选择规格：</view>
					<view v-if="selectColor!=null && selectSize!=null">
						<!-- <view v-for="(item,index) in color" :key="index" :class="[index==selectSpec?'on':'']">{{item.color}}</view> -->
						{{'(' + checkData.color}} {{'、' + checkData.size + ')'}} {{'x' + checkData.num}}
					</view>
					
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">商品评价({{comment.length}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings" v-if="comment.length > 0">
				<view class="user-info">
					<view class="face"><image :src="url+comment[0].sys_user.head_img"></image></view>
					<view class="username">{{comment[0].sys_user.user_name}}</view>
				</view>
				<view class="content">
					{{comment[0].descr}}
				</view>
			</view>
			<view class="comment" @tap="toRatings" v-if="comment.length == 0">
				<view class="content">
					暂无评论
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content"><rich-text :nodes="goodsData.descr|formatRichText"></rich-text></view>
		</view>
	</view>
</template>

<script>
import common from '../../common/common.js';
export default {
	data() {
		return {
			no_data: '/static/img/no_data.png',
			url: '',
			id: '',
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{},
			comment:[],
			// 选择信息
			checkData:{
				num: 1,
				stock_id: '',
				product_id: '',
				color: '',
				size: '',
				price: '',
				img: '',
				product_name: '',
				selected:false
			},
			service:[
				{name:"正品保证",description:"此商品官方保证为正品"},
				{name:"极速退款",description:"此商品享受退货极速退款服务"},
				{name:"7天退换",description:"此商品享受7天无理由退换服务"}
			],
			color:[],
			size:[],
			len: 0,
			selectColor:null,//选中Color
			selectSize:null,//选中Size
			isBuy:0,
			num: 0,
			isLogin:false,
		};
	},
	onLoad(option) {
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		this.url = common.websiteUrl;
		this.getProductById(option.id);
		this.getProductStockColor(option.id);
		this.getProductStockSize(option.id);
		this.getComment(option.id);
		this.id = option.id;
	},
	onReady(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onShow() {
		uni.getStorage({
			key: 'user',
			success: (res)=>{
				if(!res.data){
					return ;
				}
				this.isLogin = true;
			}
		});
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	onReachBottom() {
		// uni.showToast({ title: '触发上拉加载' });
	},
	mounted () {
		
	},
	methods: {
		//获取评论
		getComment(id){
			uni.request({
			    url: common.websiteUrl + '/api/getComment', 
			    data: {
			        product_id: id,
			    },
			    success: (res) => {
					this.comment = res.data.data;
			    }
			});
		},
		//获取商品
		getProductById(id){
			uni.request({
			    url: common.websiteUrl + '/api/getProductById', 
			    data: {
			        product_id: id,
			    },
			    success: (res) => {
					this.goodsData = res.data.data;
					this.checkData.product_id = this.goodsData.product_id;
					this.checkData.price = this.goodsData.price;
					this.checkData.product_name = this.goodsData.product_name;
					this.checkData.img = this.goodsData.bd_product_files.length == 0 ? null : this.goodsData.bd_product_files[0].url
					this.len = res.data.data.bd_product_files.length;
			    }
			});
		},
		//获取商品Color
		getProductStockColor(id){
			uni.request({
			    url: common.websiteUrl + '/api/getProductStockColor', 
			    data: {
			        product_id: id,
			    },
			    success: (res) => {
					this.color = res.data.data;
			    }
			});
		},
		//获取商品Size
		getProductStockSize(id){
			uni.request({
			    url: common.websiteUrl + '/api/getProductStockSize', 
			    data: {
			        product_id: id,
			    },
			    success: (res) => {
					this.size = res.data.data;
			    }
			});
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		// 加入购物车
		joinCart(){
			if(!this.isLogin){
				uni.showToast({title: '请先登录~',icon:"none"});
				return;
			}
			if(this.selectColor==null || this.selectSize==null){
				this.isBuy=1;
				return this.showSpec(()=>{
					uni.showToast({title: '已加入购物车',icon:"success"});
				});
			}
			uni.getStorage({
				key: 'CartList', 
				success:(res)=>{
					//增加记录
					let flag = true;
					for(let i = 0; i < res.data.length; i++){
						if(res.data[i].product_id == this.checkData.product_id && res.data[i].color == this.checkData.color && res.data[i].size == this.checkData.size){
							res.data[i].num = res.data[i].num + this.checkData.num;
							flag = false;
							break;
						}
					}
					if(flag){
						res.data.push(this.checkData);
					}
					uni.setStorage({
						key: 'CartList',
						data: res.data,
						success: function () {
							uni.showToast({title: '已加入购物车',icon:"success"});
						}
					});
				},
				fail:(e)=>{
					//新建UserList
					uni.setStorage({
						key: 'CartList',
						data: [this.checkData],
						success: function () {
							uni.showToast({title: '已加入购物车',icon:"success"});
						},
						fail:function(e){
							console.log('set error:'+JSON.stringify(e));
						}
					});
				}
			});
		},
		//立即购买
		buy(){
			if(!this.isLogin){
				uni.showToast({title: '请先登录~',icon:"none"});
				return;
			}
			if(this.selectColor==null || this.selectSize==null){
				this.isBuy=2;
				return this.showSpec(()=>{
					this.toConfirmation();
				});
			}
			this.toConfirmation();
		},
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'ratings/ratings?id=' + this.id
			})
		},
		//跳转确认订单页面
		toConfirmation(){
			let tmpList=[];
			tmpList.push(this.checkData);
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'../order/confirmation'
					})
				}
			})
		},
		//跳转评论列表
		showComments(goodsid){
			
		},
		//选择Color
		setSelectColor(index, item){
			if(item.deleted != 1){
				if(this.selectColor == index){
					this.selectColor = null;
					for(let i = 0; i < this.size.length; i++){
						this.size[i].deleted = 0;
					}
				}else{
					this.selectColor = index;
					if(this.selectSize != null){
						uni.request({
						    url: common.websiteUrl + '/api/getProductStockColorOrSize', 
						    data: {
								product_id: this.id,
								color: item.color,
								size: this.size[this.selectSize].size
						    },
						    success: (res) => {
								this.num = res.data.data[0].num;
						    }
						});
					}
					this.checkData.color = item.color;
					this.checkData.stock_id = item.stock_id;
					for(let i = 0; i < this.size.length; i++){
						this.size[i].deleted = 0;
					}		
					uni.request({
					    url: common.websiteUrl + '/api/getProductStockColorOrSize', 
					    data: {
					        product_id: this.id,
							color: item.color,
					    },
					    success: (res) => {
							let ls = res.data.data;
							for(let i = 0; i < this.size.length; i++){
								let flag = true;
								for(let j = 0; j < ls.length; j++){	
									if(this.size[i].size === ls[j].size){
										flag = false;
										break;
									}
								}
								if(flag){
									this.size[i].deleted = 1;
								}
							}
					    }
					});
				}
			}
		},
		//选择Size
		setSelectSize(index, item){
			if(item.deleted != 1){
				if(this.selectSize == index){
					this.selectSize = null;
					for(let i = 0; i < this.color.length; i++){
						this.color[i].deleted = 0;
					}
				}else{
					this.selectSize = index;
					if(this.selectColor != null){
						uni.request({
						    url: common.websiteUrl + '/api/getProductStockColorOrSize', 
						    data: {
						        product_id: this.id,
								size: item.size,
								color: this.color[this.selectColor].color
						    },
						    success: (res) => {
								this.num = res.data.data[0].num;
						    }
						});
					}
					this.checkData.size = item.size;
					this.checkData.stock_id = item.stock_id;
					for(let i = 0; i < this.color.length; i++){
						this.color[i].deleted = 0;
					}
					uni.request({
					    url: common.websiteUrl + '/api/getProductStockColorOrSize', 
					    data: {
					        product_id: this.id,
							size: item.size,
					    },
					    success: (res) => {
							let ls = res.data.data;
							for(let i = 0; i < this.color.length; i++){
								let flag = true;
								for(let j = 0; j < ls.length; j++){	
									if(this.color[i].color === ls[j].color){
										flag = false;
										break;
									}
								}
								if(flag){
									this.color[i].deleted = 1;
								}
							}
					    }
					});
				}
			}
		},
		//减少数量
		sub(){
			console.log(this.checkData.num)
			if(this.checkData.num<=1){
				return;
			}
			this.checkData.num--;
		},
		//增加数量
		add(){
			if(this.checkData.num>=this.num){
				return;
			}
			this.checkData.num++;
		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			]
			let commentsView = uni.createSelectorQuery().select("#comments");
			commentsView.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;	
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调

			this.selectSpec&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		finish() {
			if(this.selectColor==null){
					uni.showToast({title: '请选择颜色'});
			}
			if(this.selectSize==null){
					uni.showToast({title: '请选择鞋码'});
			}
			
			
			if(this.isBuy == 2){
				this.specClass = 'hide';
				this.buy()
			}else if(this.isBuy == 1){
				this.specClass = 'hide';
				this.joinCart();
			}else{
				this.hideSpec();
			}
		},
		discard() {
			//丢弃
		}
	},
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
			    match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			    match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			    match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			    return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
			    match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
			    return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			return newContent;
		}	
	}

};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}

.icon {
	font-size: 26upx;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;

	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.back {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42upx;
			}
		}
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5upx;
				}
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				width: 100%;
				height: 100vw;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	width: 92%;
	padding: 20upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.goods-info {
	.price {
		font-size: 46upx;
		font-weight: 600;
		color: #f47925;
	}
	.title {
		font-size: 30upx;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
	}
}
.comments {
	.row {
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 30upx;
		}
		.arrow {
			font-size: 28upx;
			position: absolute;
			right: 4%;
			color: #17e6a1;
			.show {
				display: flex;
				align-items: center;
				.icon {
					color: #17e6a1;
				}
			}
		}
	}
	.comment {
		width: 100%;
		.user-info {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			.face {
				width: 40upx;
				height: 40upx;
				margin-right: 8upx;
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 100%;
				}
			}
			.username {
				font-size: 24upx;
				color: #999;
			}
		}
		.content {
			margin-top: 10upx;
			font-size: 26upx;
		}
	}
}
.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 92%;
	padding: 0 4%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80upx;
		margin-left: -4%;
		.box {
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		height: 80upx;
		border-radius: 40upx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			height: 80upx;
			padding: 0 40upx;
			color: #fff;
			display: flex;
			align-items: center;
			font-size: 28upx;
		}
		.joinCart {
			background-color: #f0b46c;
		}
		.buy {
			background-color: #f06c7a;
		}
	}
}
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -70%;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30upx 0;
			.title {
				font-size: 30upx;
				margin: 10upx 0;
			}
			.description {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
				&.no{
					color: #ccc;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}
			.number{
				display: flex;
				justify-content: center;
				align-items: center;
				.input{
					width: 80upx;
					height: 60upx;
					margin: 0 10upx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					input{
						width: 80upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26upx;
					}
				}
				
				.sub ,.add{
					width: 60upx;
					height: 60upx;
					background-color: #f3f3f3;
					border-radius: 5upx;
					.icon{
						font-size: 30upx;
						width: 60upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
		
	}
}
.share{
	display: none;
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.15s linear both;
		}
		.layer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.15s linear both;
		}
		
		.layer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.layer{
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.list{
			width: 100%;
			display: flex;
			padding:10upx 0 30upx 0;
			.box{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.title{
					margin-top: 10upx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26upx;
				}
			}
		}
		.btn{
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			border-top: solid 1upx #666666;
		}
		.h1{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
		}
	}
}
</style>
