'use strict'
layui.extend({
    system: '../../static/js/extends/system'
});
layui.use(['form','system','table'], function(){
    $(document).ready(function () {
        var table = layui.table;
        var t = table.render({
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
                    "code": '0', //解析接口状态
                    "msg": '', //解析提示文本
                    "count": res.total, //解析数据长度
                    "data": res.Data //解析数据列表
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
            // var requestPram = {
            //     Data:{
            //         code : $("#code").val(),
            //         name : $("#code").val(),
            //         contactTelephone : $("#phone").val()
            //     },
            //     pageNum : 0,
            //     pageSize : 10
            // };
            // var url = basePath + 'system/userManage/queryUserList';
            // request({
            //     url:url,
            //     type: 'post',
            //     data: JSON.stringify(requestPram),
            //     async: true,
            //     dataType: "json",
            // }).then((data) => {
            //     console.log(data)
            // }).catch((error) => {
            //     layer.msg('查询用户列表失败！',{icon: 5});//失败的表情
            // })
            t.reload({
                where: { //设定异步数据接口的额外参数，任意设
                    Data:{
                        code : $("#code").val(),
                        name : $("#name").val(),
                        contactTelephone : $("#phone").val()
                    }
                }
            });
        });
        //添加用户
        $(document).on('click', '.record-add', function () {
            WeAdminShow('新增用户','./addUser.html',$(window).width() * 0.8,350)
        });
    }) 
})