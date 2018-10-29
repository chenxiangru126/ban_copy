
    <template>
    <div class="reg2_wrap">
        <div class="header_if" >
            <div class="_back" @click="back_event"></div>
            <!--<div class="_title">证书申请</div>-->
        </div>
    <!-- 交保证金 -->
   <div class="reg2_content">
      <div>版权登记证书申请费</div>
      <p><span>¥</span><span>99.0</span></p>
      <div class="reg2_contnet_con">
       <span @click="submit_e(1)"></span>
       <span @click="submit_e(2)"></span>
      </div>

   </div>
    </div> 
    </template>
    
    <script>
    import util from '../../libs/util'
    export default {

        created(){
            var that = this 
             let name = that.$route.query.name
             that.name = name
             setTimeout(()=>{
              that.userGetinfo()
              },500)
        },
        mounted(){
           
             let number = this.$route.query.number
              this.number = number
             let name =this.$route.query.name
              this.name = name
             let url =this.$route.query.url
             this.name = url
        },
        data(){
            return{
                number:null,
                token:null, 
                name:null,
                url:null,
                orderId:null
            }
        },
         methods:{
           back_event(){
//            this.$router.go(-1)  //payMoney返回跳转
               this.$router.push('/reg_list');
           },
              userGetinfo(){
                        var _this = this;
                        setTimeout(function(){
                        try{
                        let objdata = iosObject.getUserInfo();
                        let jsondata = eval('(' + objdata + ')');
                        window.jsondata = jsondata;
                        if(window.jsondata.token){
                           this.token = window.jsondata.token
                        }else{
                        _this.userGetinfo();
                        }
                        }catch(e){
                        _this.userGetinfo();
                        }
                        },300)
                        },
                   submit_e(a) {//
                //a 支付方式 1支付宝 2微信
                     
                    var url;
                    let number = this.number 
                    let token = this.token

                    let temp_id = sessionStorage.getItem('copyright_temp_id_p'); 
                    let objdata = iosObject.getUserInfo();
                        let jsondata = eval('(' + objdata + ')');
                        window.jsondata = jsondata;
                        if(window.jsondata.token){
                           this.token = window.jsondata.token
                        }else{
                        _this.userGetinfo();
                        }
                     this.util.ajax.get('/mall/invoice_order/yuPayOrder.do?temp_id='+temp_id).then(e=>{
                           if(e.code == 200){
                               this.orderId = e.data.orderId
                               sessionStorage.setItem('copyright_p_orderId',this.orderId);   

                                if(a==1){  
                                    url= location.protocol+'//'+location.hostname

                                    +'/mall/invoice_order/payForcopyright.do?number='+number+'&money=0.01'+'&payWay=1'+'&token='+this.token+'&fromType=2'+'&orderId='+this.orderId;
                                }else if(a==2){
                                    url= location.protocol+'//'+location.hostname
                                        +'/mall/invoice_order/payForcopyright.do?number='+number+'&money=0.01'+'&payWay=2'+'&token='+this.token+'&fromType=2'+'&orderId='+this.orderId;

                                }
                                iosObject.showCheckOrderBtn(location.origin+'/index.html#/continue')
                                    window.location.href=url;    
                           } 
                     })      
                   
                                     
            } 
         }
        
        
        
    }
    </script>
    <style lang="less">
    @import 'pay_money.less';
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
        /*._title{*/
            /*height: 2.933333rem;*/
            /*line-height: 2.933333rem;*/
            /*font-size: 1.2rem;*/
            /*color: #fff;*/
        /*}*/
    }
    </style>
    