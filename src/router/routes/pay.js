//测试弹出层，选择作品
const pay = [{  
    path: '/secret',
    name: 'secret',
        meta: {
            title: "付款"
        },
        components: {
            default:resolve => require(['../../components/pay_money/secret.vue'], resolve),
            headers:resolve => require(['../../components/common/header.vue'], resolve)
        }
    },

    {  
        path: '/pay_money',
        name: 'pay_money',
            meta: {
                title: "付款"
            },
            components: {
                default:resolve => require(['../../components/pay_money/pay_money.vue'], resolve),
                headers:resolve => require(['../../components/common/header.vue'], resolve)
            }
        },{  
            path: '/make',
            name: 'make',
                meta: {
                    title: "证书生成"
                },
                components: {
                    default:resolve => require(['../../components/pay_money/make.vue'], resolve),
                    headers:resolve => require(['../../components/common/header.vue'], resolve)
                }
            },
  {
    path: '/blank',
    name: 'blank',
    meta: {
      title: ""
    },
    components: {
      default: resolve => require(['../../components/pay_money/blank.vue'], resolve),
      // headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
  },
  {
    path: '/continue',
    name: 'continue',
    meta: {
      title: ""
    },
    components: {
      default: resolve => require(['../../components/pay_money/continue.vue'], resolve),
      // headers: resolve => require(['../../components/common/header.vue'], resolve)
    }
  },{
        path: '/nextBlank',
        name: 'nextBlank',
        meta: {
            title: ""
        },
        components: {
            default: resolve => require(['../../components/pay_money/nextBlank.vue'], resolve),
            // headers: resolve => require(['../../components/common/header.vue'], resolve)
        }
    }
]
export default pay;