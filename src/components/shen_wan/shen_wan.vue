<template>
<div class="ban_cun">
   <div class="click_weier" @click="goto"></div>
   <div class="once_er" @click="goto_er"></div>
  <!-- 加上调用分享的弹出层 -->
    <div class="ser_img" v-if="isShare" @click="ser_on" >
      
        <img  src="../../static/images/ssss-ios.png"  />
    </div>
   <div class="wan_img">

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

       <p class="zhu">注：点击二维码可查看更多证书详情</p>
       <div style=" padding: 0 1.375rem;">
       <h3 style="font-size:18px;color:#ffffff;border-bottom: .0625rem solid #9B9B9B;padding-bottom:4px">版权登记</h3>
       <p style="font-size: 10px;color: #9B9B9B;">版权登记证书已申请</p>
       <img class="ban_shenwan" :src="b_url" alt="">
       </div>
      
   </div>
     <div class="agree3">
         <h3 style="font-size:18px;color:#ffffff;border-bottom: .0625rem solid #9B9B9B;padding-bottom:4px">版权记录</h3>
         <div class="content"  v-show="showChange" v-for="(it,index) in list" :key='index'>
             <p style="text-align:left">当前著作权人<span>{{it.createTime}}</span></p>
             <div v-show="!isshow">
                 <div style="font-size:1rem;text-align:center">变更信息</div>

             </div>
             <div v-show="isshow">
                 <p style="font-size:14px;color:#ffffff">{{it.createTime}}&nbsp;&nbsp;&nbsp;{{it.new_realname}}转让给{{it.old_realname}}</p>

             </div>
         </div>
         <p v-show="showNull" style="text-align:center">暂无变更信息</p>

    </div>

       <div class="share" v-show="share">
            <div class="share_m">
                <p><span></span><label>分享到</label><span></span></p>
                <div class="share_i"><img  src="../../static/images/circle@3x.png"/><img  src="../../static/images/wechat@3x.png"/>
                    <img  src="../../static/images/qq4x@3x.png"/><img  src="../../static/images/weibo@3x.png"/></div>
            </div>
        </div>
</div>

    
</template>
<script>
import  util from '../../libs/util'
export default {
    created(){
      let _p={
        number:this.$route.query.number
      }
      this.util.ajax.post('/admin/authCopyright/bq_change.do',_p).then(e=>{
        //获取url
        if(e.code == 200){
          this.showNull=false
          this.showChange =true
            this.list = e.data
        }else{
          this.showNull=true
          this.showChange =false
        }

      })
    },
    mounted(){
      // 请求申请成功显示证书
        // let number = this.$route.query.number
        let number = this.$route.query.number
        this.number = this.$route.query.number
        let _p ={
          number
        }
        this.util.ajax.post('/admin/authCopyright/getCopyrightDataDetails.do',_p).then(e=>{
          //获取url
          if(e.code == 200){
               this.url1 = e.data.c_url1
               this.url2 = e.data.c_url2
               this.b_url = e.data.b_url
          }else{
          }

        })
        
       
    },
    data(){
      return{
        number :null,
        isShare:true,
        share:false,
        url1:null,
        url2:null,
        b_url:null,
        showChange:false,
        isshow:false,
        showNull:false,
        list:[]
      }

    },
    methods:{
          ser_on(){   
            this.share = !this.share
            let number = this.number  
            let ur = '/index.html#/fenxiang?number='+numbe
            let str = base64.base64encode(ur);
            let url = window.location.host+'/mall/toGoodsShareUrl/usl/'+str
            // alert("base64 encode:" + str);  http://59.110.169.175:8081/index.html#/
                //解密
            //    let str1 = base64.base64decode(str);
            //     alert("base64 decode:" + str1);
            iosObject.shareContentTitlePicUrl(this.goodsInfo.goodsDescribe,this.goodsInfo.goodsName,this.goodsInfo.sharePhoto,url); 
            // this.share = !this.share

          },
          goto(){
            let number = this.number 
              this.$router.push('/zheng_detail?number='+number)

          },
           goto_er(){
            let number = this.number 
              this.$router.push('/zheng_detail?number='+number)
          }
           
        },
    }
    

</script>
<style lang="less">
@import 'shen_wan.less';
</style>