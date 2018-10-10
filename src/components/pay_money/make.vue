<template>
<div class="make">
    <!--<div class="header_if" >-->
        <!--<div class="_back" @click="back_event"></div>-->
        <!---->
    <!--</div>-->
    <div ><img src="../../static/images/yiGouShan.gif" alt=""></div>
  <span style="font-size:1.6rem; margin-top:1.0625rem" >版权存证证书生成中</span>
  <span style="font-size:1.5rem;margin-top: 1.3rem">请不要退出APP</span>
  <span style='font-size: 1rem;padding: 2.45rem  2.4rem 4.5rem;box-sizing: border-box;text-align: center;
    line-height: 1.7rem;color: #4A8ADA;'>
    如需申请版权登记证书<br/>请在获得存证证书后点击继续申请</span>
</div>
    
</template>
<script>
import { Indicator,Toast } from 'mint-ui';
import util from '../../libs/util'
export default {
  data(){
    return{
      art_name: ''
    }
  },
   created(){
       
       let orderId = sessionStorage.getItem('copyright_s_orderId');
       setTimeout(()=>{
         var _p={
           orderId:orderId
         }
         this.util.ajax.post('/admin/copyrightTemp/getId.do',_p).then(e=>{
            
           var data = JSON.parse(e.data)
           this.art_name = data.name
           data.orderId = orderId
           this.initData(data)

         })
       },800)
    },
  mounted(){ 
        
  },

  methods:{
//    back_event(){
////      console.log(this.art_name)
//      this.$router.push('/ban_copy');
//    },
  
    
     initData(data){
      
        //  this.$indicator.close();
         this.util.ajax.post('/admin/authCopyright/save.do',data).then(e=>{
                 
                    // this.$indicator.close();
                   if(e.code == 200){
                      
                    sessionStorage.removeItem("copyright_s_orderId")
                    let url1 = e.data.bc_certificate_url1
                    let url2 = e.data.bc_certificate_url2 
                    let number = e.data.block_cert_number
                    let name = e.data.name

                    this.$router.push('/ban_cun_zhan?name='+name+'&url1='+url1+'&number='+number+'&url2='+url2)
                   }else {
                    
                       this.Toast(e.message)
                       setTimeout(()=>{
                           this.$router.push('/reg_list')
                       },1000) 
                   }
              
           })


     }
       
  }
  
    
}
</script>
 <style lang="less">
 @import 'make.less';
 /*.header_if{*/
     /*background: #232323;*/
     /*width:100%;*/
     /*position: absolute;*/
     /*z-index: 100;*/
     /*text-align: center;*/
     /*top:1.25rem;*/

     /*._back{*/
         /*width: 4rem;*/
         /*height: 2.933333rem;*/
         /*background: url(../../static/images/left.svg) no-repeat;*/
         /*background-size: 1.466667rem;*/
         /*background-position: 1.333333rem center;*/
         /*position: absolute;*/
         /*left: 0;*/
         /*top: 0;*/

     /*}*/
     /**/
 /*}*/


 </style>