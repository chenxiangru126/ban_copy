<template>
 <div class="fail">
   <!-- 头部查看版权证书按钮 -->
        <div class="header_if" >
            <div class="_save" @click="toSeeZhen">存证证书</div>
            
        </div>
   <div>
   <div><img src="../../static/images/faildog.png" alt=""></div>
   <!-- <span class='fail_desc'>存证登记失败，详细情况请联系客服！客服电话：（010）59626817</span> -->
   <span class='fail_desc'>{{opiniion}}</span>
                <!-- <div class='p-b'> -->
                <!-- <img src='/images/faildog.png' class='w4 log_alert_logo' /> -->
                    <!-- <div class="layer_title p-b c11" style='text-align:center'>· 证书登记失败 ·</div>
                    <p class="c1 font-2 w t-c over-h p-l p-r">证书登记失败，详细情况请联系客服！<br>客服电话：（010）59626817</p>

                </div> -->
    <div class="fail_img">
         <span  v-for=" (img,index) in copyright_url" :key="index"> <img :src="img" alt=""></span>
         <!-- <span> <img src="../../static/images/1.png" alt=""></span> -->
    </div>
   </div>
   <div class="cancel_btn btn" v-if='$route.query.status==7' @click='toAgain'>重新申请</div>
   <div class="cancel_btn btn" v-if='$route.query.status==8' @click='toRevise'>再次申请</div>
 </div>
    
</template>
<script>
import util from '../../libs/util'
export default {
      data(){
        return{
          name:null,
          number:null,
          copyright_url:[],//失败原因图
          opiniion:null,//失败原因
        }
          
      },
      created(){
          let number = this.$route.query.number 
          this.util.ajax.get('/admin/authCopyright/dengjiFailures.do?number='+number).then(e=>{
              if(e.code == 200){
                  this.copyright_url = e.data.copyright_url.split(',')
                  
                  
                  this.opiniion = e.data.opiniion 
              }
          })
      },
      // mounted(){
      //         let name = this.$route.query.name
      //         this.name = name
      //         let number = this.$route.query.number
      //         this.number = number
      // },
      methods:{
         toSeeZhen(){
            let name = this.$route.query.name
            this.name = name
            // let url1 = this.$route.query.url1
          
            // this.url1 = url1
            let number = this.$route.query.number 
            // 请求申请成功显示证书
            this.number = number
            this.$router.push('/ban_cun_zhan?number='+this.number+'&name='+this.name)
         },
        //  重新申请，跳转到版权登记列表
         toAgain(){
            this.$router.push('/reg_list') 
            //  let number = this.$route.query.number 
            //  let name = this.$route.query.name
            
            //  this.$router.push('/data_center?name='+name+'&number='+number) 
         },
        //  再次申请，进行修改信息
         toRevise(){
             let number = this.$route.query.number 
             let name = this.$route.query.name
            
             this.$router.push('/data_center?name='+name+'&number='+number) //填写信息页面
         }

        }

    
}
</script>
<style lang="less">
 @import 'fail.less';
 .header_if{
    background: #232323;
    width:100%;
    position: fixed;
    z-index: 100;
    text-align: center;
    top:1.25rem;

    ._save{
        width: 4rem;
        height: 2.933333rem;
        position: absolute;
        right: .75rem;
        top: 0;
        color: #4A90E2;
        font-size: .975rem;
        line-height: 2.933333rem;
    }

}
</style>