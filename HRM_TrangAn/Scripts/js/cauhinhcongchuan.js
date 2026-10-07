$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 185;
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
        selectable: true,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                width: "10px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
            //{
            //    title: "STT",
            //    template: "#= ++record #",
            //    width: "50px",
            //    attributes: {
            //        class: "text-center"
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    }
            //},
            {
                field: "TenPhongBan",
                title: "Tên bộ phận",
                width: "100px",
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
            },
            {
                field: "CongChuan",
                title: "Công chuẩn cố định",
                width: "100px",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "CongChuanTheoThang",
                title: "Công chuẩn tuỳ biến theo tháng",
                width: "80px",
                template: function (e) {
                    if (e.CongChuanTheoThang > 0) {
                        return "<b>Tính theo tháng<b>"
                    } else {
                        return "";
                    }
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]

    });


    $("#windowPhongBan").kendoWindow({
        width: 400,
        height: 290,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin công chuẩn bp"
    });

    $("#PhongBanCha").kendoComboBox({
        placeholder: "Chọn bộ phận...",
        dataTextField: "TenPhongBan",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: true
    })

    $.ajax({
        url: '/PhongBan/GetAllPhongBan',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        })

        $("#PhongBanCha").data("kendoComboBox").setDataSource(dataSource);
    })
    loadData();

})

function ThemPhongBan() {
    document.getElementById("formPhongBan").reset();
    $("#windowPhongBan").data("kendoWindow").center().open();
}

function HuyPhongBan() {
    document.getElementById("formPhongBan").reset();
    $("#windowPhongBan").data("kendoWindow").close();
}

function SuaPhongBan() {
    document.getElementById("formPhongBan").reset();
    setTimeout(function () {
        $("#PhongBanCha").data("kendoComboBox").value(selectedPhongBan.ID_PhongBan);
    })
    $("#windowPhongBan").data("kendoWindow").center().open();
}

function LuuPhongBan() {
    var validcha = SetValidate("PhongBanCha");
    var validccong = SetValidate("CongChuan");
    var valid = validcha && validccong;
    if (valid) {
        $.ajax({
            url: '/PhongBan/InsertPhongBanCongChuan',
            data: {
                ID_PhongBan: $("#PhongBanCha").data("kendoComboBox").value(),
                CongChuan: $("#CongChuan").val(),
                CongChuanTheoThang: $("#CongChuanTheoThang").is(":checked") ? 1 : 0,
                NgayTao: kendo.toString(new Date(),"yyyy-MM-dd HH:mm:ss"),
                TrangThai: 1
            },
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyPhongBan();
                loadData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }

}

function loadData() {
    $.ajax({
        url: '/PhongBan/GetAllPhongBanCongChuan',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 20,
            }
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
    })
}

function UpdateCongChuanTheoThang() {
    if ($("#CongChuanTheoThang").is(":checked")) {
        $("#CongChuan").val(0);
        $("#CongChuan").prop('readonly', true);
    } else {
        $("#CongChuan").prop('readonly', false);
    }
}