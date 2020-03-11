<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收件人
				</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="form.name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					电话号码
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="form.telephone" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="form.address" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="#f06c7a" :checked="form.seq" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../../common/common.js';
	export default {
		data() {
			return {
				editType:'create',
				form: {
					address_id:'',
					user_id: '',
					name:'',
					telephone:'',
					address:'',
					seq: false
				},
				themeColor: '#007AFF'
			};
		},
		onLoad(option) {
			if(option.id){
				this.form.address_id = option.id;
				this.editType = 'edit';
				this.getAddressById(option.id);
			}
		},
		methods: {
			//获取商品
			getAddressById(id){
				uni.request({
				    url: common.websiteUrl + '/api/getAddressById', 
				    data: {
				        address_id: id,
				    },
				    success: (res) => {
						this.form = res.data.data;
				    }
				});
			},
			isDefaultChange(e){
				this.form.seq = e.detail.value;
			},
			del(){
				uni.showModal({
					title: '删除地址',
					content: '你将删除这个收货地址',
					success: (res)=>{
						if (res.confirm) {
							uni.request({
							    url: common.websiteUrl + '/api/address/' + this.form.address_id, 
								method: 'DELETE',
							    success: (res) => {
									uni.showToast({title:'删除成功',icon:'success'});
									setTimeout(function(){
										uni.navigateBack();
									},1000)
							    }
							});
						}
					}
				});
				
			},
			save(){
				uni.getStorage({
					key: 'user',
					success: (res)=>{
						this.form.user_id = res.data.user_id;
					}
				});
				if(!this.form.name){
					uni.showToast({title:'请输入收件人姓名',icon:'none'});
					return ;
				}
				if(!this.form.telephone){
					uni.showToast({title:'请输入收件人电话号码',icon:'none'});
					return ;
				}
				if(!this.form.address){
					uni.showToast({title:'请输入收件人详细地址',icon:'none'});
					return ;
				}
				uni.showLoading({
					title:'正在提交'
				})
				setTimeout(()=>{
					if(this.editType == 'edit'){
						uni.request({
						    url: common.websiteUrl + '/api/address', 
							method:'PUT',
						    data: this.form,
						    success: (res) => {
								uni.showToast({title:'编辑成功',icon:'success'});
								setTimeout(function(){
									uni.navigateBack();
								},1000)
						    }
						});
					}else{
						uni.request({
						    url: common.websiteUrl + '/api/address', 
							method:'POST',
						    data: this.form,
						    success: (res) => {
								uni.showToast({title:'添加成功',icon:'success'});
								setTimeout(function(){
									uni.navigateBack();
								},1000)
						    }
						});
					}
				},300)
			}
		}
	};
</script>
<style lang="scss">

.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #f06c7a;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
		}
		.row{
			width: 94%;
			
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #f06c7a;
				background-color: rgba(255,0,0,0.05);
				border-bottom: solid 1upx #eee;
			}
		}
	}
	
</style>
