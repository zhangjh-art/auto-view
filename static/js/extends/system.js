/**
 * 系统工具，采用window方式定义不需要显示调用
 * 定义全局变量，基本每个页面都需要引入的模块
 * 目前没有自动引入，需要手动引入
 * 封装了ajax工具
 **/
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
                    if(localStorage.getItem("auto_token")!=null&&localStorage.getItem("auto_token")!="undefined"&&localStorage.getItem("auto_token")!=""){
                        XHR.setRequestHeader("Authorization","Bearer "+localStorage.getItem("auto_token"));
                        //XHR.setRequestHeader("Content-Type","");
                        if(params.url.indexOf("/oauth/token")==-1){//非token请求都采用json格式
                            XHR.setRequestHeader("Content-Type","application/json");
                        }
                    }else{
                        XHR.setRequestHeader("Authorization","");
                    }
                    this.layerIndex = layer.load(1);
                },
                success:function(data){
                    if(data.code=="A0230"){
                        layer.close(this.layerIndex);
                        layer.msg('登录已过期，请重新登录！',{icon: 5});//失败
                        localStorage.setItem("auto_token","");
                        setTimeout(function(){
                            window.location.href='./login.html';
                        },2000);
                        return
                    }
                    layer.close(this.layerIndex);
                    resolve(data)
                },
                error:function (error) {
                    layer.close(this.layerIndex);
                    reject(error)
                },
                complete: function (XHR, TS) {

                },
            });
        })
    }
    window.request = requestUtil;
    exports('system', {});
})