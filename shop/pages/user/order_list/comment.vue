<template>
	<view class="content">
		<my-issue key="3" :starsShow="star" :headPicShow="false" :headTitleValue="headTitleValue" @submit="sub" />
	</view>
</template>

<script>
	import common from '../../../common/common.js';
  import myIssue from '@/components/myIssue.vue'
	export default {
		components:{myIssue},
		data() {
			return {
				title: 'Hello',
				order_id: '',
				user:{},
				star: true,
				headTitleValue: '评价',
			}
		},
		onLoad(option) {
			this.order_id = option.order_id;
			if(option.type == '3'){
				this.star = false;
				this.headTitleValue = "追加评价";
			}else{
				this.star = true;
				this.headTitleValue = "评价";
			}
			this.type = option.type;
			uni.getStorage({
				key: 'user',
				success: (res)=>{
					if(!res.data){
						return ;
					}
					this.user = res.data;
				}
			});
		},
		methods: {
			sub(e){
				if(this.type == '3'){
					uni.request({
					    url: common.websiteUrl + '/api/comment', 
						data: {
						    order_id: this.order_id,
							descr: e.textareaValue,
							create_by: this.user.user_id
						},
						method:'POST',
					    success: (res) => {
							uni.showToast({
								title:'评论成功'
							});
							setTimeout(function(){
								uni.navigateBack();
							},1000)
					    }
					});
				}else{
					uni.request({
					    url: common.websiteUrl + '/api/setComment', 
						data: {
						    order_id: this.order_id,
							descr: e.textareaValue,
							star: e.score,
							create_by: this.user.user_id
						},
						method:'PUT',
					    success: (res) => {
							uni.showToast({
								title:'评论成功'
							});
							setTimeout(function(){
								uni.navigateBack();
							},1000)
					    }
					});
				}
				
			}
		}
	}
</script>

<style>
	.content{
		height: 100%;
	}
</style>
