<template>
<div class="ban_cun">
    <div class="ban_cun_img">
       <div class="img1">
           <img  :src="url1" alt="">
           <a class="dianji_ewm" href="http://www.zhongyunwenhua.cn"></a>
       </div>
       
       <div class="img2">
           <img  :src="url2" alt="">
           <a class="dianji_ewm" href="http://www.zhongyunwenhua.cn"></a>
       </div>
    </div>
     <div class="agree2 ">
            <div class="flex-h" style="margin-top:15px;" >    
           <div class="cancel_btn ji_btn " @click="ji_xu_s" >申请已提交</div>
            </div>
    </div> 
</div>

    
</template>
<script>
import  util from '../../libs/util'
export default {
    data(){
        return{
           url1:null,
           url2:null,
           number:null,

        }

    },
    mounted(){
         let number = this.$route.query.number 
      // 请求申请成功显示证书
        this.number = number 
        this.util.ajax.get('/admin/authCopyright/getCopyrightDataDetails.do?number='+number).then(e=>{
              if(e.code == 200){
                this.url1 = e.data.c_url1
                this.url2 = e.data.c_url2
              }

        })

       
    },
    methods:{
      ji_xu_s(){
            this.$router.push('/success') 
          
      }

    }
    
    
}
</script>
<style lang="less">
@import 'shen_zhong.less';
</style>


