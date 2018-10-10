<template>
 <div class="success">
     <div class="header_if" >
         <div class="_back" @click="back_event"></div>
         <!--<div class="_title">证书申请</div>-->
     </div>
     <div>
   <div><img src="../../static/images/shenhe.png" alt=""></div>
   <span>您的版权登记证书申请已提交</span>
   <span>1~15个工作日您可以通过</span>
   <span>【个人中心-版权】点击查询</span>
   </div>
   <div class="submit-btn-1 btn" @click="go_list">返回版权登记列表</div>
    <div class="mask">   
    </div>

 </div>
    
</template>
<script>
import { Indicator,Toast } from 'mint-ui';
import util from '../../libs/util'
export default {
   created(){

     var that = this 
     let orderId = sessionStorage.getItem('copyright_p_orderId');
      setTimeout(()=>{
        var _p={
           orderId:orderId
         }
        that.util.ajax.post('/admin/copyrightTemp/getId.do',_p).then(e=>{
          var data = JSON.parse(e.data)
          data.orderId = orderId
          this.initData(data)
//           let art_name =data.pro_name
//           let number = data.number
//           this.zhifu(art_name,number)
        })
       },800)



    },

     mounted(){
        this.loading();
     },
     methods:{
      
//       zhifu(art_name,number){
//          this.util.ajax.get('/mall/invoice_order/checkPay.do').then((e)=>{
//                    if(e.code != 200){
//                    this.$router.push('/pay_money?name='+art_name+'&number='+number)
//                    return false;
//                    }else{
//                      setTimeout(()=>{
//                           // 调用临时接口查询数据
//                          this.util.ajax.post('/admin/copyrightTemp/getId.do').then(e=>{
//                          let data = e.data
//                          data = JSON.parse(data)
//                          //得到名称和url还有证书编码
//                          // 在这里在真正保存的请求
//                          this.initData(data)
//                      })
//                    },1000)
//                  }
//                })
//       },
        loading(){
             Indicator.open({spinnerType: 'fading-circle'});
              
        },
       back_event(){
         this.$router.push('/reg_list')
       },
        go_list(){
          this.$router.push('/reg_list')
        },
        initData(data){
            let _p = data
            this.util.ajax.post('/admin/register/save.do',_p).then(e=>{
                
          //  跳转到展现的页面
              //返回证书编码和url图片
                   if(e.code != 200){    
                     Indicator.close();     
                     $('.mask').hide()             
                   }
                   sessionStorage.setItem('copyright_p_orderId',this.orderId);
           })
     }
     }
}
</script>
<style lang="less">
 @import 'success.less';
 .header_if{
     background: #232323;
     width:100%;
     position: fixed;
     z-index: 100;
     text-align: center;
     top:1.25rem;

     ._back{
         width: 4rem;
         height: 2.933333rem;
         background: url(../../static/images/left.svg) no-repeat;
         background-size: 1.466667rem;
         background-position: 1.333333rem center;
         position: absolute;
         left: 0;
         top: 0;

     }
 }
</style>


