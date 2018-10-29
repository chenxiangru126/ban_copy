<template>
<div class="reg_list">
    <div class="list_c" v-for="(item,index) in reg_list" :key="index" @click="dianji(item)">
            <p  v-if='item.status==6' class="list_h" ><span style='color:#cb383f'>存证失败</span> </p>
            <p v-else class="list_h" ><span>编号：{{item.number}}</span> </p>
            <div class="list_d" >
                <div class="list_lt" >
                    <!-- <img v-if='item.status==6' style='' src="../../static/images/lbbj@3x.png" /> -->
                    <img :src="item.url" />
                    <div style="flex: 1;position: relative">
                   
                        </div>
                        <div class="list_introduce">
                            <div class="list_span">
                            <span style="color:#e7e7e7; font-size:1rem">{{item.name}}</span>
                            <span style="color:#8B8B8B;font-size:14px;">版权存证证书</span>
                            <span  style="color:#8B8B8B;font-size:12px;">{{item.upload_time}}</span>
                            </div>
                         <P class="list_rt">
                            <img src="../../static/images/dengji_zhong.png" alt="" v-show="item.status == 1 ">
                            <img src="../../static/images/dengji_guo.png" alt="" v-show="item.status == 0 ">
                            <span class='state_text' style='color:#cb383f;font-size: 14px; margin-top: -2.225rem;' v-show="item.status == 2||item.status == 7||item.status == 8">版权登记失败</span>
                             <span style="color:#8B8B8B;font-size:12px;" v-show="item.status == 0 ">{{item.over_time}}</span>
                        </P>
                        </div>
                       
                    </div>
              </div>

              
               
            </div>
            <div class="cuo_wrap" v-show='showNo'>
                <div class="cuo_404"><span class="iconfont icon-wushuju"></span></div>

                <p class="detail_p">此页暂无数据</p>

            </div>
                      
        </div>

        
    
</template>
<script>
import util from '../../libs/util'
import {_alert} from '../../libs/ui'
import { Indicator,Toast } from 'mint-ui';
export default {
    mounted(){
        var that = this
        setTimeout(()=>{
         that.initData();
         
        },1000)
          
         },
    data(){
        return{
           reg_list:[], 
           showNo:false      
        }
    },
    methods:{
        
        initData(){
        
            
           this.util.ajax.post('/admin/authCopyright/getCopyrightDataList.do').then(e=>{
            if( e.code == 200){
                // console.log(e.data) 
                if(e.data.length==0){
                        //  if(this.currentPage==1){
                        //     this.nones = true;
                        //     this.nulldata = false;
                        // }else{
                        //      this.nulldata = true;
                        // }
                        this.showNo = true
                        return false;
                    }           
                this.reg_list = e.data
                this.showNo = false
            }
        })
        },     
        dianji(item){
      
            let state = item.status
            if(state == 0){
                // 跳转到申请成功的页面
                let number = item.number
                 this.$router.push('/shen_wan?number='+number)
            }else if(state == 1){
                //跳转到申请中的页面 
                let  number = item.number
                 this.$router.push('/shen_zhong?number='+number)
            }else if(state == 3){
                // 跳转到未申请的页面
                let  number = item.number
                let name = item.name
                this.$router.push('/ban_cun_zhan?number='+number+'&name='+name)
            }else if(state == 2 || state == 7 ||state == 8){
               let  number = item.number
                let name = item.name
                this.$router.push('/fail?number='+number+'&name='+name+'&status='+state)

            }else if(state == 6){//新添加的
                const html=`<div class='p-b'>
                <img src='/images/faildog.png' class='w4 log_alert_logo' />
                    <div class="layer_title p-b c11">· 存证失败 ·</div>
                    <p class="c1 font-2 w t-c over-h p-l p-r">存证失败，详细情况请联系客服！客服电话：（010）59626817</p>

                </div>
                `
                this._alert({
                        html:html,
                        // title:'我是标题',// 选填
                        // content:'存证失败，详细情况请联系客服！（010）59626817',
                        sureTxt:'确定',
                        yes(){
                            
                        }
                })
            }
        },
        search_list(){
        this.$router.push('/search')

        },        
    }   
}
</script>
<style lang="less">
@import 'reg_list.less';
.cuo_wrap{
       position: absolute;
       top: 40vh;
    //    top: 30vh;
       left: 50%;
       transform: translate(-50%,-70%);
       display: flex;
       justify-content: space-around;
       align-items: center;
       flex-direction: column;
       .detail_p{
           color: #CBCBCB;
           font-size: .75rem;
           line-height: 1.875rem;
           text-align: center;
    
       }
       .cuo_404{
           margin-bottom: 1.875rem;
           >span{
            color: #4E4E4E;
            font-size: 6.25rem; 
         
           }
       }
    
    }
</style>


