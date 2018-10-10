<template>
<div class="switch">


</div>
    
</template>

<script>
import util from '../../libs/util'
/* 
1.判断是否是第一次，浏览版权说明页面，如果不是，页面不显示，得到状态值，这个是前提
2.判断是否实名认证，如果实名认证的话，得到状态值，
   跳转到上传页面，没有实名认证的话跳转到选择类型页面，得到状态值
*/
export default {

    created(){
      let orderId = sessionStorage.getItem('copyright_p_orderId');
      setTimeout(()=>{
        var _p={
           orderId:orderId
         }
        this.util.ajax.post('/admin/copyrightTemp/getId.do',_p).then(e=>{
          // console.log(e.data)
          var data = JSON.parse(e.data)
          let art_name =data.pro_name
          let number = data.number
          // console.log(data);
          this.util.ajax.get('/mall/invoice_order/checkPay.do?orderId='+orderId).then((e)=>{
            // console.log(data);
            
            if(e.code != 200){
              this.$router.push('/pay_money?name='+art_name+'&number='+number)
            }else{
              this.$router.push('/success');

            }})
        })
      },3000)
    },
    mounted(){
   
    },
    data(){
      return{


      }
    },
    methods:{

            

    }
    
}
</script>

 
 <style scoped>
  @import 'blank.less';
 </style>
 
 