var cur_user = "";
var cur_idtaikhoan = "";
$(document).ready(function () {

    //$("#DenNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date()
    //})
    //$("#TuNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    //});

    $("#gridUser").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                field: "UserName",
                title: "Tài khoản",
                width: "150px",
                template: function (e) {
                    return '<div class="row" style="cursor:pointer" onclick="ChatWithUser(\'' + e.UserName + '\',' + e.ID + ')"><div style="width:10%;;padding:2%;float:left">' +
                        '<img src = "/Images/user_image.png" alt = "' + e.UserName + '" class="img-responsive img-circle" />' +
                        '</div >' +
                        '<div style="width:70%;float:left">' +
                        '<span class="name">' + e.UserName + '</span><br />' +
                        '<span class="glyphicon glyphicon-map-marker text-muted c-info"></span>' +
                        '<span class="visible-xs"> <span class="text-muted">HS: ' + e.DanhSachHocSinh + '</span><br /></span>' +
                        '</div></div>'
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            }
        ]
    });

    $("#gridTinNhanMoi").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                field: "UserName",
                title: "Tài khoản",
                width: "150px",
                template: function (e) {
                    return '<div class="row" style="cursor:pointer" onclick="ChatWithUser(\'' + e.UserName + '\',' + e.ID + ')"><div style="width:10%;;padding:2%;float:left">' +
                        '<img src = "/Images/user_image.png" alt = "' + e.UserName + '" class="img-responsive img-circle" />' +
                        '</div >' +
                        '<div style="width:70%;float:left">' +
                        '<span class="name">' + e.UserName + '</span><br />' +
                        '<span class="glyphicon glyphicon-map-marker text-muted c-info"></span>' +
                        '<span class="visible-xs"> <span class="text-muted">HS: ' + e.DanhSachHocSinh + '</span><br /></span>' +
                        '</div></div>'
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            }
        ]
    });
    LoadUserApp();
    LoadListSession();


    var signalR_tinnhan = $.connection.tinNhanHub;
    signalR_tinnhan.client.pushTinNhan = function (DienThoai) {
        //notifyTinNhan(DienThoai);
        LoadListSession();
        if (DienThoai == cur_user)
            LoadTinNhanByUser(DienThoai);
    }

    $.connection.hub.start().done(function () {
        console.log("Connect signalR OK!");
    });
})
function SendMessage() {
    $.ajax({
        url: '/ChatMessage/SendMesage',
        data: {
            ID_TaiKhoan: cur_idtaikhoan,
            MessageContent: $("#btn-input").val(),
            BotChat: 0
        },
        type: 'GET',
    }).done(function successCallback(response) {
        LoadTinNhanByUser(cur_user);
        $("#btn-input").val("");
    });
}

function notifyTinNhan(DienThoai) {
    //if (Notification.permission !== 'granted')
    //    Notification.requestPermission();
    //else {
    //    var notification = new Notification('Thông báo tin nhắn mới!', {
    //        icon: '/Images/sms.png',
    //        body: "Có tin nhắn mới được gửi từ số: " + DienThoai
    //    });
    //    notification.onclick = function () {
    //        window.open('/ChatMessage/Index');
    //    };
    //}
    LoadListSession();
    if (cur_user == DienThoai) {
        LoadTinNhanByUser(cur_user);
    }
}

function LoadListSession() {
    $.ajax({
        url: '/User/GetUserOnline_TinNhanMoi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50
        });
        $("#gridTinNhanMoi").data("kendoGrid").setDataSource(dataSource);
    });

}

function ChatWithUser(UserName, ID) {
    cur_user = UserName;
    cur_idtaikhoan = ID
    LoadTinNhanByUser(UserName);
    $.ajax({
        url: '/ChatMessage/UpdateDaXem?Username=' + UserName,
        type: 'GET',
    }).done(function successCallback(response) {

    });
}

function LoadUserApp() {
    $.ajax({
        url: '/User/GetAllAppUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50
        });
        $("#gridUser").data("kendoGrid").setDataSource(dataSource);
    });
}

function LoadTinNhanByUser(UserName) {
    $("#chat-content").html("");
    $("#cur_user").html(UserName);
    $.ajax({
        url: '/ChatMessage/GetTinNhanByUser?Username=' + UserName,
        type: 'GET',
    }).done(function successCallback(response) {
        var html = '';
        $.each(response, function (index, item) {
            var myDate = new Date(item.NgayGui.match(/\d+/)[0] * 1);
            if (item.Loai == 0) {
                html += '<div class="row msg_container base_receive">'
                    + '<div class="col-md-2 col-xs-2 avatar">'
                    + '<img src="/Images/user_image.png" class="img-responsive" />'
                    + '</div>'
                    + '<div class="col-md-10 col-xs-10">'
                    + '<div class="messages msg_receive">'
                    + '<p>'
                    + item.NoiDung
                    + '</p>'
                    + '<time datetime="' + kendo.toString(myDate, 'dd/MM/yyyy hh:mm') + '">' + item.ID_User + ' - ' + kendo.toString(myDate, 'dd/MM/yyyy hh:mm') + '</time>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
            } else if (item.Loai == 1) {
                html += '<div class="row msg_container base_sent">'

                    + '<div class="col-md-10 col-xs-10">'
                    + '<div class="messages msg_receive">'
                    + '<p>'
                    + item.NoiDung
                    + '</p>'
                    + '<time datetime="' + kendo.toString(myDate, 'dd/MM/yyyy hh:mm') + '">' + item.ID_User + ' - ' + kendo.toString(myDate, 'dd/MM/yyyy hh:mm') + '</time>'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-md-2 col-xs-2 avatar" >'
                    + '<img src="/Images/img.png" class="img-responsive" />'
                    + '</div>'
                    + '</div>';
            }
        })
        $("#chat-content").html(html);
    });
}

//function LoadTinNhan() {
//    kendo.ui.progress($("#windowChitiet"), true);
//    $.ajax({
//        url: '/ChatMessage/GetAllTinNhan?TuNgay=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
//            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
//        type: 'GET',
//    }).done(function successCallback(response) {
//        kendo.ui.progress($("#gridTinNhan"), true);
//        lstHocSinhTrongLop = response;
//        var dataSource = new kendo.data.DataSource({
//            data: response,
//            schema: {
//                model: {
//                    id: "ID",
//                    field: {                        
//                        NgayGui: {
//                            type: 'date'
//                        }
//                    }
//                }
//            },
//            pageSize: 5000,
//        });
//        $("#gridTinNhan").data("kendoGrid").setDataSource(dataSource);
//        kendo.ui.progress($("#gridTinNhan"), false);
//    });
//}