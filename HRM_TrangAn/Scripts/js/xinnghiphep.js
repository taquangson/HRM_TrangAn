var iconThongBao = "logodh.png";
$(document).ready(function () {
    LoadComboLop(0);
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    });

    $("#gridHocSinhTrongLop").kendoGrid({
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
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
                width: "150px",
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
                field: "DienThoai",
                title: "Điện thoại",
                width: "110px",
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
                field: "PhuHuynh",
                title: "Tên phụ huynh",
                width: "150px",
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
                field: "NgayXinPhep",
                title: "Ngày gửi",
                width: "150px",
                template: function (e) {
                    var dateString = e.NgayXinPhep.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
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
                }
            },
            {
                field: "NgayNghi",
                title: "Xin nghỉ học ngày",
                width: "150px",
                template: function (e) {
                    var dateString = e.NgayNghi.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
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
                }
            },
            {
                field: "LyDoNghi",
                title: "Lý do",
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
                field: "TrangThai",
                title: "Trạng thái",
                width: "100px",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<button class='k-button' style='color:green' onclick='UpdateTrangThai(0," + e.ID + ")'><i class='fa fa-refresh' style='margin-right:2px'></i> Đã xử lý</button>"
                    } else {
                        return "<button class='k-button' style='color:red' onclick='UpdateTrangThai(1," + e.ID + ")'><i class='fa fa-refresh' style='margin-right:2px'></i> Chưa xử lý</button>"
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
                }
            }
        ]
    });

})

function LoadLichXinPhep() {
    kendo.ui.progress($("#windowChitiet"), true);
    $.ajax({
        url: '/XinNghiHoc/GetAllLichNghi?ID_Lop=' + ($("#comboLop").data("kendoComboBox").value() > 0 ? $("#comboLop").data("kendoComboBox").value() : 0)
            + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhTrongLop"), true);
        lstHocSinhTrongLop = response;
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayNghi: {
                            type: 'date'
                        },
                        NgayXinPhep: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 5000,
        });
        $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinhTrongLop"), false);
    });
}

function UpdateTrangThai(TrangThai, ID) {
    kendo.ui.progress($("#gridHocSinhTrongLop"), true);
    var item = $("#gridHocSinhTrongLop").data("kendoGrid").dataSource.get(ID);
    var model = {
        ID: item.ID,
        ID_HocSinh: item.ID_HocSinh,
        LyDoNghi: item.LyDoNghi,
        NgayNghi: kendo.toString(new Date(parseInt(item.NgayNghi.substr(6))),'yyyy-MM-dd HH:mm:ss'),
        NgayXinPhep: kendo.toString(new Date(parseInt(item.NgayXinPhep.substr(6))), 'yyyy-MM-dd HH:mm:ss'),
        TrangThai: TrangThai
    }
    //console.log(model);
    $.ajax({
        url: '/XinNghiHoc/UpdateTrangThaiNghiPhep',
        type: 'POST',
        data: {
            item: model
        }
    }).done(function successCallback(response) {
        LoadLichXinPhep();
    });

}
function LoadComboLop(khoi) {
    $.ajax({
        url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var ds = [];
        if (khoi > 0) {
            ds = response.filter(x => parseInt(x.TenLop.substring(0, 2)) == parseInt(khoi));
        } else {
            ds = response;
        }
        var dataSource = new kendo.data.DataSource({
            data: ds
        });

        $("#comboLop").kendoComboBox({
            dataTextField: 'TenLop',
            dataValueField: 'ID',
            dataSource: dataSource,
            filter: "startswith",
            change: function (e) {
                LoadComboHocSinh(e.sender.value());
            }
        })
        LoadLichXinPhep();
    });
}