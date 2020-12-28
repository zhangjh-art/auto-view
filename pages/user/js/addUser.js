layui.extend({
    system: '../../static/js/extends/system'
});
layui.use(['form','layer','admin','system'], function(){
    var form = layui.form,
        layer = layui.layer;
        form.render();
    //自定义验证规则
    form.verify({
        pass: [/(.+){6,12}$/, '密码必须6到12位']
        ,repass: function(value){
            if($('#L_pass').val()!=$('#L_repass').val()){
                return '两次密码不一致';
            }
        }
    });
    //监听提交
    form.on('submit(add)', function(){
        //发异步，把数据提交给php
        // layer.alert("增加成功", {icon: 6},function () {
        //     // 获得frame索引
        //     var index = parent.layer.getFrameIndex(window.name);
        //     //关闭当前frame
        //     parent.layer.close(index);
        // });
        return false;
    });
});