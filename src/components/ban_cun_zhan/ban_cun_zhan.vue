<template>
<div class="ban_cun">
    <div class="header_if" >
        <div class="_back" @click="back_event"></div>

    </div>
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

     <div class="agree1">
           <div class="text">您已经完成版权存证，是否继续申请版权登记，请点击↓</div>
            <div class="flex-h" style="margin-top:.733333rem" > 

               <div class="cancel_btn  ji_xu" @click="ji_xu" >继续申请</div>
            </div>
    </div> 
</div>

    
</template>
<script>
import  util from '../../libs/util'
export default {
    created(){
             
        let name = this.$route.query.name
        this.name = name
        let url1 = this.$route.query.url1
       
        this.url1 = url1
        let number = this.$route.query.number 
      // 请求申请成功显示证书
        this.number = number
       
        let url2 = this.$route.query.url2
         this.url2 = url2
   

        this.util.ajax.get('/admin/authCopyright/getCopyrightDataDetails.do?number='+number).then(e=>{
              if(e.code == 200){
                this.url1 = e.data.c_url1
                this.url2 = e.data.c_url2

              }
 

        })
        },
    // mounted(){
    //      let number = this.$route.query.number 
    //   // 请求申请成功显示证书
    //     this.number = number 
         

    //     this.util.ajax.get('/admin/authCopyright/getCopyrightDataDetails.do?number='+number).then(e=>{
    //           if(e.code == 200){
    //             this.url1 = e.data.c_url1
    //             this.url2 = e.data.c_url2

    //           }


    //     })
          
       
        
    // },
    data(){
        return{
            name:null,
            url1:null,
            number:null,
            url2:null,
        }
    },
    methods:{
      back_event(){
        this.$router.push('/reg_list')
      },
      ji_xu(){
          let name = this.name      
          let number = this.number
          let url = this.url1
          if(name && number){
            this.$router.push('/data_center?name='+name+'&number='+number+'&url='+url) 
          } 

      }

    }
    
    
}
</script>
<style lang="less">
@import 'ban_cun_zhan.less';
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


