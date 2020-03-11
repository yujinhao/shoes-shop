<template>
	<view>
		<video id="myVideo" class="myVideo" :src="videoSrc" v-show="isPlayVideo" :show-fullscreen-btn="showFullscreenBtn" :direction="videoDirection" :show-play-btn="showPlayBtn" @pause="videoPause" @fullscreenchange="viderFullscreen">
			<cover-image class="stopPlayVideoBtn" @click="stopPlayVideo" src="/static/img/close.png"></cover-image>
		</video>
		<view class="content">
			
			<view class="label">
				<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="loadRatings(index)" :key="label.type">
					{{label.name}}({{label.number}})
				</view>
			</view>
			<view class="list">
				<view class="row" v-for="(row,Rindex) in comment" :key="Rindex">
					<view class="left">
						<view class="face">
							<image :src="url+row.sys_user.head_img"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{row.sys_user.user_name}}
							</view>
							<view class="date">
								{{row.create_time}}
							</view>
							
						</view>
						<view class="spec">
							<uni-rate disabled="true" :value="row.star"></uni-rate>
						</view>
						<view class="first">
							<view class="rat">
								{{row.descr}}
							</view>
							<!-- <view class="img-video">
								<view class="box" v-for="item in row.first.video" @tap="playVideo(item.path)" :key="item.path">
									<image mode="aspectFill" :src="item.img"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box" v-for="item in row.first.img" @tap="showBigImg(item,row.first.img)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view> -->
						</view>
						<view class="append" v-if="row.append">
							<view class="date">
								用户{{GetNumberOfDays(row.create_time,row.append.create_time)}}天后追加评论
							</view>
							<view class="rat">
								{{row.append.descr}}
							</view>
							<!-- <view class="img-video">
								<view class="box" v-for="item in row.append.video" @tap="playVideo(item.path)" :key="item.path">
									<image mode="aspectFill" :src="item.img"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box" v-for="item in row.append.img" @tap="showBigImg(item,row.append.img)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view> -->
						</view>
						<view class="reply" v-if="row.reply">
							<view class="date ">
								掌柜回复
							</view>
							<view class="rat">
								{{row.reply.descr}}
							</view>
							<!-- <view class="img-video">
								<view class="box" v-for="item in row.append.video" @tap="playVideo(item.path)" :key="item.path">
									<image mode="aspectFill" :src="item.img"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box" v-for="item in row.append.img" @tap="showBigImg(item,row.append.img)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view> -->
						</view>
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
				url: '',
				labelList:[
					{name:'全部',number:25,type:'all'},
					{name:'好评',number:23,type:'good'},
					{name:'中评',number:1,type:'secondary'},
					{name:'差评',number:1,type:'poor'},
				
				],
				labelIndex:0,
				comment:[],
				id: '',
				videoDirection:0,
				showFullscreenBtn:true,
				showPlayBtn:true,
				isPlayVideo:true,
				videoSrc:''

			};
		},
		onReady: function (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({ title: '触发上拉加载' });
		},
		onLoad(option){
			this.url = common.websiteUrl;
			this.id = option.id;
			this.getComment(option.id);
			this.getCommentNum(option.id);
		},
		methods: {
			getComment(id){
				uni.request({
				    url: common.websiteUrl + '/api/getComment', 
				    data: {
				        product_id: id,
				    },
				    success: (res) => {
						this.comment = res.data.data;
						console.log(res.data.data)
				    }
				});
			},
			getCommentNum(id){
				uni.request({
				    url: common.websiteUrl + '/api/getCommentNum', 
				    data: {
				        product_id: id,
				    },
				    success: (res) => {
						this.labelList[0].number = res.data.data.all;
						this.labelList[1].number = res.data.data.good;
						this.labelList[2].number = res.data.data.mid;
						this.labelList[3].number = res.data.data.bad;
				    }
				});
			},
			loadRatings(index){
				this.labelIndex = index;
				uni.request({
				    url: common.websiteUrl + '/api/getComment', 
				    data: {
				        product_id: this.id,
						star: this.labelIndex
				    },
				    success: (res) => {
						this.comment = res.data.data;
				    }
				});
			},
			playVideo(path) {
				this.videoSrc = path;
				// this.isPlayVideo = true;
				this.$nextTick(function() {
					this.videoContext.requestFullScreen({direction:0});
				});
				
			},
			stopPlayVideo(){
				this.videoContext.pause();
			},
			videoPause(){
				// this.isPlayVideo = false;
				this.videoSrc = '';
			}, 
			GetNumberOfDays(date1,date2){//获得天数
			    //date1：开始日期，date2结束日期
			    var a1 = Date.parse(new Date(date1));
			    var a2 = Date.parse(new Date(date2));
			    var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
			    return day
			},
			viderFullscreen(e){
				if(e.detail.fullScreen){
					this.videoContext.play();
				}else{
					this.stopPlayVideo();
				}
			},
			showBigImg(src,srclist){
				uni.previewImage({
					current:src,
					urls: srclist
				});
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}

.myVideo{
	position: fixed;
	top: 50%;
	right: 100%;
}
.content{
	view{
		display: flex;
	}
	width: 94%;
	padding: 0 3%;
	
	.label{
		width: 100%;
		flex-wrap:wrap;
		view{
			padding: 0 20upx;
			height: 50upx;
			border-radius: 40upx;
			border:solid 1upx #ddd;
			align-items: center;
			color: #555;
			font-size: 26upx;
			background-color: #f9f9f9;
			margin: 10upx 20upx 10upx 0;
			&.on{
				border:solid 1upx #f06c7a;
				color: #f06c7a;
			}
		}
	}
	.list{
		width: 100%;
		flex-wrap: wrap;
		padding: 20upx 0;
		.row{
			width: 100%;
			margin-top: 30upx;
			.left{
				width: 10vw;
				flex-shrink: 0;
				margin-right: 10upx;
				.face{
					width: 100%;
					image{
						width: 10vw;
						height: 10vw;
						border-radius: 100%;
					}
					
				}
			}
			.right{
				width: 100%;
				flex-wrap: wrap;
				border-bottom: solid 1upx #eee;
				.name-date{
					width: 100%;
					justify-content: space-between;
					align-items: baseline;
					.username{
						font-size: 32upx;
						color: #555;
						padding-left: 10upx;
					}
					.date{
						font-size:28upx;
						color: #aaa;
					}
				}
				.spec{
					width: 100%;
					color: #aaa;
					font-size: 26upx;
					margin: 20upx 0;
				}
				.first{
					width: 100%;
					flex-wrap: wrap;
					.rat{
						font-size: 30upx;
						padding-left: 10upx;
						margin-bottom: 10upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 50upx)/4);
							height: calc((84.6vw - 50upx)/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9)
								}
							}
						}
					}
				}
				.reply{
					width: 100%;
					flex-wrap: wrap;
					background-color: rgba(158, 158, 158, 0.1);
					border-radius:10upx;
					.date{
						width: 100%;
						height: 40upx;
						// border-left: 10upx solid #f06c7a;
						padding-left: 10upx;
						align-items: center;
						font-size: 26upx;
						margin: 20upx 0;
						color: #565c62;
					}
					.rat{
						font-size: 30upx;
						margin-bottom: 20upx;
						padding-left: 10upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 10upx - (10upx * 4))/4);
							height: calc((84.6vw - 10upx - (10upx * 4))/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9);
								}
							}
						}
					}
				}
				.append{
					width: 100%;
					flex-wrap: wrap;
					
					.date{
						width: 100%;
						height: 40upx;
						border-left: 10upx solid #f06c7a;
						padding-left: 10upx;
						align-items: center;
						font-size: 26upx;
						margin: 20upx 0;
						color: #ff7602;
					}
					.rat{
						font-size: 30upx;
						margin-bottom: 20upx;
						padding-left: 20upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 10upx - (10upx * 4))/4);
							height: calc((84.6vw - 10upx - (10upx * 4))/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9);
								}
							}
						}
					}
				}
			}
		}
	}
}
/*
* <view class="list">
				<view class="row">

					<view class="right">
						
						<view class="spec">
							规格：XL
						</view>
						<view class="first">
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
						<view class="append">
							<view class="date">
								65天后追加
							</view>
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			* 
			* */
</style>
