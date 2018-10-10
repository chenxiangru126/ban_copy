<template>
   <div>
       <div class="qiye_real">
          <div class="input_b">
            <div class="w h3 line-h-3 flex-h b-b m-t">
                <div class="flex-1 c1 font-1 ">公司名称</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入公司名称"  class="_input" v-model="com_name">
                </div>
            </div>
            
             <div class="w h3 line-h-3 flex-h b-b ">
                <div class="flex-1 c1 font-1 ">证件号码</div>
                <div class="flex-3">
                    <input type="text" placeholder="输入证件号"  class="_input"  v-model="card_num">
                </div>
            </div>
            <!-- 上传执照 -->
              <p class="c1 font-0  p-t"  style="color:#BABABA;box-sizing:border-box;margin: .325rem 0;">营业执照:</p>
            <div class="upload"  @click="trigger_file" style="height:22rem">
              <span  v-show='showDelet' class='deletImg' @click='deletImg'><i class='iconfont icon-chahao chahao'></i></span>
              <img :src="avatar" alt=""  class="show_img" v-show="avatar !== null"> 
              <div class='updata_img_q'><span  v-show='showUpdataImg' class='updata_small'>重新上传</span></div>
              <div class="input_cssY">
              <img src="../../static/images/shenfen.png" alt=""  style="width:113px;height:27px" v-show="avatar == null">  
             </div>   
            </div> 

            </div>
             <div class="submit-btn-1" @click="get_real">
              确&nbsp;定
            </div> 
       </div>
       <div class="tishi" v-show ="tiShi">
        <p>相机无法照片编辑<br>建议您使用相册图片</p>
        <div class='down'></div>
    </div>
       <!-- 上传营业执照 -->
       <input type="file" class="hide file" :disabled = disabled accept="image/*" @change="upload_img">
   </div>
    
</template>
<script>
 import util from '../../libs/util'
 import { Indicator,Toast } from 'mint-ui';
export default {
    data(){
    return{
      avatar:null,
      com_name:null,
      card_num:null,
      showUpdataImg:false,
      showDelet:false,
      tiShi:false,
      disabled:false
    }

    },
    methods:{
        // 上传图片
         deletImg(){
                this.avatar = null
                this.showUpdataImg = false
                this.showDelet = false
                event.stopPropagation();
            },
            trigger_file() {
                this.tiShi=true;
                this.avatar=null
                this.showUpdataImg = false
                this.showDelet = false
                setTimeout(e=>{
                    this.tiShi= false
                },4000)
                // 获取input，添加点击事件
                const file = document.querySelector(".file");
                file.click();
            },
             // input发生改变，调用图片的上传
            upload_img(e) {
                
                let formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('type', 'test');
                // 发送异步请求，把formData发送异步请求
              
                this.util.ajax.post("/admin/authCopyright/upload.do", formData).then(e => {   
                    //  返回的参数
                    Indicator.open({spinnerType: 'fading-circle'});
                     var image = new Image();
                     image.src = e.data.path;
                     var that=this;
                     image.onload = function() {
                        Indicator.close();  
                        that.avatar=e.data.path
                        that.showUpdataImg = true
                        that.showDelet = true
                     }
                    
                }).catch()
            },
            get_real(){
                 this.disabled = true
                 let regIdNo = /(^[0-9a-zA-Z]{15}$)|(^[0-9a-zA-Z]{18}$)|(^\d{17}(\d|X|x)$)/ 
                 
                   let  realname = this.com_name
                   let  id_card = this.card_num
                   let  idcard_front = this.avatar
                   let  status = 1

                   if(realname == null){
                    this.Toast('请输入公司名称')
                    this.disabled = false
                    return false
                   }else if(!regIdNo.test(id_card)){
                       this.Toast('请输入正确的证件号码')
                       this.disabled = false
                       return false
                   }else if(!idcard_front){
                       this.Toast('请上传营业执照')
                       this.disabled = false
                       return false
                   }else{
                      let _p = {
                       realname,
                       id_card,
                       idcard_front,
                       status
                      }
                      this.disabled = true
                     this.util.ajax.post('/admin/sysUserReal/save.do',_p).then(e=>{
                       if(e.code == 200){
                            // debugger;
                            this.$router.push('/ban_copy')
                       }
                     })
                   }
            }
    }  
}
</script>
<style lang="less">
@import 'qiye.less';

</style>


