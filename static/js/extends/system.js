layui.define(['jquery', 'form', 'layer', 'element'], function(exports) {
    window.basePath = "http://localhost:8080/";
    window.client_id = "client";
    window.client_secret = "123456";
    window.grant_type = "password";
    window.$ = layui.jquery
    layui.$(function() {
        console.log("加载系统模块成功！");
    })
    var requestUtil = function(params){
        return new Promise((resolve,reject)=>{
            if(params.url==""||params.url==undefined){
                layer.msg("请求url不能为空",{icon: 2});//失败的表情
            }
            $.ajax({
                url : params.url,
                type : (params.type!=undefined)?params.type:'get',//默认发起get请求
                data : (params.data!=undefined)?params.data:'',//表单参数
                async : (params.async!=undefined)?params.async:true,//默认异步请求
                dataType : (params.dataType!=undefined)?params.dataType:'json',//服务器默认返回json类型数据
                //......
                beforeSend:function (XHR) {
                    //附带token信息，设置header值
                    if(localStorage.getItem("auto_token")!=""&&localStorage.getItem("auto_token")!=null){
                        XHR.setRequestHeader("Authorization",localStorage.getItem("auto_token"));
                    }else{
                        XHR.setRequestHeader("Authorization","");
                    }
                    this.layerIndex = layer.load(1);
                },
                success:function(data){
                    layer.close(this.layerIndex);
                    resolve(data)
                },
                error:function (error) {
                    layer.close(this.layerIndex);
                    reject(error)
                },
                complete: function (XHR, TS) {
                    layer.close(this.layerIndex);
                    //验证是否token过期请求，如果过期则重定向至登录页面
                    if(TS=="error"){
                        layer.msg('登录已过期，请重新登录！',{icon: 5});//失败
                        window.location.href='./login.html';
                    }
                },
            });
        })
    }
    window.request = requestUtil;
    exports('system', {});
})