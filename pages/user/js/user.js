'use strict'

var t;

layui.extend({
    system: '../../static/js/extends/system'
});
layui.use(['form','system','table'], function(){
    $(document).ready(function () {
        var table = layui.table;
        t = table.render({
            elem: '#data-table',
            height: 'full-170',
            where: {
                Data:{
                    code : $("#code").val(),
                    name : $("#name").val(),
                    contactTelephone : $("#phone").val()
                }
            },
            url: basePath + 'system/userManage/queryUserList', //数据接口
            request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
            contentType: "application/json",
            headers: {
                Authorization : "Bearer "+localStorage.getItem("auto_token")
            },
            method: "post",
            parseData: function(res){ //res 即为原始返回的数据
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.total, //解析数据长度
                    "data": res.data //解析数据列表
                };
            },
            cols: [[ //表头
                {type:'checkbox'}
                ,{field: 'name', title: '用户名', sort: true}
                ,{field: 'code', title: '工号', sort: true}
                ,{field: 'vDepartmentId', title: '所属部门', sort: true} 
                ,{field: 'contactTelephone', title: '联系电话', sort: true}
                ,{field: 'vCreatorId', title: '创建人', sort: true}
                ,{field: 'createDate', title: '创建时间', sort: true}
                ,{field: 'vModifierId', title: '修改人', sort: true}
                ,{field: 'modifyDate', title: '修改时间', sort: true}
            ]]
        });
        //根据条件查询用户列表
        $(document).on('click', '.query-user', function () {
            reloadTable()
        });
        //添加用户
        $(document).on('click', '.record-add', function () {
            WeAdminShow('新增用户','./addUser.html',$(window).width() * 0.8,350)
        });
        //编辑用户
        $(document).on('click', '.record-edit', function () {
            //获取行记录
            var selectData = table.checkStatus('data-table').data;
            if(selectData.length!=1){
                layer.msg("请选择一条记录", {
                    icon: 5,
                    time: 1000
                });
            }else{
                WeAdminShow('编辑用户','./editUser.html',$(window).width() * 0.8,350,selectData);
            }
        });
        //删除用户
        $(document).on('click', '.record-delete', function () {
            //获取行记录
            var selectData = table.checkStatus('data-table').data;
            if(selectData.length==0){
                layer.msg("请选择至少一条记录", {
                    icon: 5,
                    time: 1000
                });
            }else{
                layer.confirm('是否删除所选用户?', {icon: 3, title:'提示'}, function(index){
                    var idList = [];
                    //获取行记录
                    for(var i = 0; i < selectData.length; i++){
                        idList.push(selectData[i].id);
                    }
                    var requestPram = {};
                    requestPram.idList = idList;
                    var url = basePath + 'system/userManage/delUserByIds';
                    request({
                        url:url,
                        type: 'post',
                        data: JSON.stringify(requestPram),
                        async: true,
                        dataType: "json",
                    }).then((data) => {
                        if(data.code=="0"){
                            layer.msg("删除成功", {icon: 6,time: 1000}, function(){
                                reloadTable();
                            });
                        }else{
                            layer.msg(data.msg, {
                                icon: 5,
                                time: 1000
                            });
                        }
                    }).catch((error) => {
                        layer.msg(error,{icon: 5});
                    })
                });
            }
        });
    }) 

    window.reloadTable = function(){
        t.reload({
            where: { //设定异步数据接口的额外参数，任意设
                Data:{
                    code : $("#code").val(),
                    name : $("#name").val(),
                    contactTelephone : $("#phone").val()
                }
            }
        });
    }
})