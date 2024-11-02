
$(document).ready(function () {

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách công việc";
            //"từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                var flag = false;
                if (rowIndex == 0) {
                    flag = true;
                }
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    if (flag) {
                        row.cells[cellIndex].textAlign = 'center';
                        row.cells[cellIndex].bold = true;
                    }
                    row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
                }
            }
        },
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
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
                field: "Ten",
                title: "Tên",
                width: "200px",
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
                field: "Ma",
                title: "Mã chính sách lương",
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
                field: "KyHanThanhToan",
                title: "Kỳ hạn thanh toán",
                width: "150px",
                template: function (dataItem) {
                    if (dataItem.KyHanThanhToan === 1) {
                        return "<strong>Ngày</strong>";
                    } else if (dataItem.KyHanThanhToan === 2) {
                        return "<strong>Tuần</strong>";
                    } else if (dataItem.KyHanThanhToan === 3) {
                        return "<strong>Tháng</strong>";
                    } else if (dataItem.KyHanThanhToan === 4) {
                        return "<strong>Quý</strong>";
                    } else if (dataItem.KyHanThanhToan === 5) {
                        return "<strong>Năm</strong>";
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
                field: "ID_LoaiHopDong",
                title: "Loại hợp đồng",
                width: "150px",
                template: function (dataItem) {
                    if (dataItem.ID_LoaiHopDong === 0) {
                        return "Thử việc";
                    } else if (dataItem.ID_LoaiHopDong === 1) {
                        return "Chính thức";
                    } else if (dataItem.ID_LoaiHopDong === 2) {
                        return "Học việc";
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
                field: "GhiChu",
                title: "Ghi chú",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },
            {
                title: "Cấu hình",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='openCauHinhWindow(" + e.ID + ")' style='color:blue' class='fa fa-cogs'></i>";
                },
                width: 150,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
            }

        ]

    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    $("#grid").on("click", ".config-icon", function (e) {
        var row = $(this).closest("tr");
        var grid = $("#grid").data("kendoGrid");
        var dataItem = grid.dataItem(row);
        selectedRowID = dataItem.ID;
    });

    $("#gridNhanVien").kendoGrid({
        height: function () {
            var height = $(window).height() - 435;
            return height;
        },
        scrollable: true,
        selectable: "multiple, row",
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách công việc";
            //"từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                var flag = false;
                if (rowIndex == 0) {
                    flag = true;
                }
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    if (flag) {
                        row.cells[cellIndex].textAlign = 'center';
                        row.cells[cellIndex].bold = true;
                    }
                    row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };
                }
            }
        },
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                title: "STT",
                field: "MaNhanVien",
                template: "#= ++record #",
                width: "100px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        //template: function (e) {
                        //    e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào chính sách lương' style='width:50%; height:25px;float: left; position: relative;' onclick='openAddNhanVienWindow()'><i class='fa fa-plus'></i></a><a class='k-button' title='Xóa nhân viên đã chọn' style='width:50%; height:25px;float: left; position: relative;' onclick='DeleteMultiRowGridNV()'><i class='fa fa-minus'></i></a>")

                        //}
                    }
                },
            },
            {
                field: "TenDayDu",
                title: "Tên Nhân Viên",
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
                field: "MaNhanVien",
                title: "Mã Nhân viên",
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
                field: "NgayTao",
                title: "Ngày tạo",
                format: "{0:dd/MM/yyyy hh:mm:ss}",
                //filterable: {
                //    cell: {
                //        operator: "contains",
                //        showOperators: false,
                //        template: function (e) {
                //            e.element.addClass("k-textbox").css("width", "100%")
                //        }
                //    }
                //},
                filterable: {
                    cell: { template: betweenFilter },
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
                field: "NgayBatDau",
                title: "Ngày bắt đầu",
                format: "{0:dd/MM/yyyy hh:mm:ss}",
                //filterable: {
                //    cell: {
                //        operator: "contains",
                //        showOperators: false,
                //        template: function (e) {
                //            e.element.addClass("k-textbox").css("width", "100%")
                //        }
                //    }
                //},
                filterable: {
                    cell: { template: betweenFilter },
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
                field: "NgayKetThuc",
                title: "Ngày kết thúc",
                format: "{0:dd/MM/yyyy hh:mm:ss}",
                //filterable: {
                //    cell: {
                //        operator: "contains",
                //        showOperators: false,
                //        template: function (e) {
                //            e.element.addClass("k-textbox").css("width", "100%")
                //        }
                //    }
                //},
                filterable: {
                    cell: { template: betweenFilter },
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },

        ]

    });
    $("#gridAddNhanVien").kendoGrid({
        height: function () {
            var height = 300;
            return height;
        },
        scrollable: true,
        selectable: "multiple, row",
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "100px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
            },
            {
                field: "TenDayDu",
                title: "Tên Nhân Viên",
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
                field: "MaNhanVien",
                title: "Mã Nhân viên",
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
                field: "SoDienThoai",
                title: "Số Điện Thoại",
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
                field: "ID_GioiTinh",
                title: "Giới Tính",
                template: function (dataItem) {
                    if (dataItem.ID_GioiTinh === 0) {
                        return "<strong>nam</strong>";
                    } else if (dataItem.ID_GioiTinh === 1) {
                        return "<strong>nữ</strong>";
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
                field: "DiaChi",
                title: "Địa Chỉ",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },

        ]

    });
    $("#windowNhanVien").kendoWindow({
        width: "800",
        height: "500",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,

    });
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,
    });
    $("#NgayBatDau").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,

    });
    $("#NgayKetThuc").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,
    });

    $("#windowCH").kendoWindow({
        width: "700",
        height: "520",
        title: "Cấu hình tham số hưởng chính sách",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#ComboHopDong").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Thử việc"
                },
                {
                    ID: 1,
                    Name: "Chính thức"
                },
                {
                    ID: 2,
                    Name: "Học việc"
                },
            ]
        }
    });


    $("#ComboKyHanThanhToan").kendoComboBox({
        dataTextField: "Label",
        dataValueField: "Value",
        delay: 1000,
        dataSource: {
            data: [
                {
                    Value: 1,
                    Label: "Ngày"
                },
                {
                    Value: 2,
                    Label: "Tuần"
                },
                {
                    Value: 3,
                    Label: "Tháng"
                },
                {
                    Value: 4,
                    Label: "Quý"
                },
                {
                    Value: 5,
                    Label: "Năm"
                }
            ]
        }
    });
    LoadGridData();
});

var isEdit = false;

function LoadGridData() {
    $.ajax({
        url: '/ChinhSachLuong/GetAllChinhSachLuong',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    Huy();
    isEdit = false;
    document.getElementById("gridNhanVien").style.display = "none";
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
    $.ajax({
        url: '/HoSoNhanSu/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVien"), true);
        parsedResponse = JSON.parse(response);
        var dataSource = new kendo.data.DataSource({
            data: parsedResponse,
            schema: {
                model: {
                    ID: "ID",
                }
            },
            pageSize: 20,
        });
        $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddNhanVien"), false);
    });
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog(dialogRoot, "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#Ten").val(selectedItem.Ten);
        $("#Ma").val(selectedItem.Ma);
        $("#SoTien").val(selectedItem.SoTien);
        $("#ComboKyHanThanhToan").data("kendoComboBox").value(selectedItem.KyHanThanhToan);
        $("#ComboHopDong").data("kendoComboBox").value(selectedItem.ID_LoaiHopDong);
        $("#GhiChu").val(selectedItem.GhiChu);
        isEdit = true;
        document.getElementById("gridNhanVien").style.display = "block"
        loadGridNVData(selectedItem.ID);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}
function Luu() {
    //var dataSourceNV = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    //var listID_NhanVien = [];
    //$.each(dataSourceNV, function () {
    //    listID_NhanVien.push(this.ID);
    //})
    //var StringID_NhanVien = listID_NhanVien.toString();
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/ChinhSachLuong/InsertOrUpdate_ChinhSachLuong',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    Ten: $("#Ten").val(),
                    Ma: $("#Ma").val(),
                    SoTien: $("#SoTien").val(),
                    KyHanThanhToan: $("#ComboKyHanThanhToan").data("kendoComboBox").value(),
                    ID_LoaiHopDong: $("#ComboHopDong").data("kendoComboBox").value(),
                    GhiChu: $("#GhiChu").val(),
                }
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    LoadGridData();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
    })

}

function ValidateForm(callback) {
    var validten = SetValidate("Ten");
    var validma = SetValidate("Ma");
    var validComboHopDong = SetValidate("ComboHopDong");
    var validKyHanThanhToan = SetValidate("ComboKyHanThanhToan");

    var valid = validma && validten && validComboHopDong && validKyHanThanhToan;
    if (valid) {
        if ($("#ID").val() === '') {
            CheckMa($("#Ma").val(), function (stt) {
                callback(stt);
            })
        } else {
            callback(valid);
        }
    } else {
        callback(valid);
    }
}

function ValidateForm1(callback) {
    //var validca = SetValidate("ComboCa");
    var validtungay = SetValidate("NgayBatDau");
    var validdenngay = SetValidate("NgayKetThuc");
    var validcongchuan = SetValidate("CongChuan");
    var validdoangsotoithieu = SetValidate("DoanhSoToiThieu");
    var validluongkhachtoithieu = SetValidate("LuongKhachToiThieu");
    var validngaycongtoithieu = SetValidate("NgayCongToiThieu");
    var validluykedoanhso = SetValidate("LuyKe_DoanhSoToiThieu");
    var validluykeluongkhach = SetValidate("LuyKe_LuongKhachToiThieu");
    var validluykengaycong = SetValidate("LuyKe_NgayCongToiThieu");

    var valid = validtungay && validdenngay && validcongchuan && validdoangsotoithieu && validluongkhachtoithieu && validdenngay && validngaycongtoithieu && validluykedoanhso && validluykeluongkhach && validluykengaycong;
    console.log(valid);
    return valid;
}

function LuuCauHinh() {
    if (ValidateForm1()) {
        var dataItem = {
            ID_ChinhSachLuong: $("#ID").val(),
            NgayBatDau: kendo.toString($("#NgayBatDau").data("kendoDatePicker").value(), "yyyy/MM/dd"),
            NgayKetThuc: kendo.toString($("#NgayKetThuc").data("kendoDatePicker").value(), "yyyy/MM/dd"),
            CongChuan: $("#CongChuan").val(),
            DoanhSoToiThieu: $("#DoanhSoToiThieu").val(),
            LuongKhachToiThieu: $("#LuongKhachToiThieu").val(),
            NgayCongToiThieu: $("#NgayCongToiThieu").val(),
            LuyKe_DoanhSoToiThieu: $("#LuyKe_DoanhSoToiThieu").is(":checked") ? 1 : 0,
            LuyKe_LuongKhachToiThieu: $("#LuyKe_LuongKhachToiThieu").is(":checked") ? 1 : 0,
            LuyKe_NgayCongToiThieu: $("#LuyKe_NgayCongToiThieu").is(":checked") ? 1 : 0,
            GhiChu: $("#GhiChu").val(),
        }
        console.log(dataItem)
        $.ajax({
            url: '/ChinhSachLuong/InsertCSL_CHFromChinhSachLuong',
            type: 'POST',
            data: dataItem,
        }).done(function successCallback(response) {
            console.log(response);
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                //TimKiem();
                HuyCauHinh();
                LoadGridData()
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function CheckMa(ma, callback) {
    $.ajax({
        url: '/ChinhSachLuong/GetByMa?Ma=' + ma,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log("response", response)
        if (response.length > 0) {
            openDialog(dialogRoot, "Mã chính sách lương đã tồn tại");
            callback(false)
        } else {
            callback(true)
        }
    })
}

function Huy() {
    $("#ID").val('');
    $("#Ten").val('');
    $("#Ma").val('');
    $("#SoTien").val(0);
    $("#GhiChu").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
    $("#ComboKyHanThanhToan").data("kendoComboBox").value(1);
    $("#ComboHopDong").data("kendoComboBox").value(1);
    var dataSource = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "ID"
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
}

function HuyCauHinh() {
    document.getElementById("formCauHinh").reset();
    $("#windowCH").data("kendoWindow").close();

}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục chính sách lương?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.id;
        ids.push(id);
        console.log(dataItem);
    });
    $.ajax({
        url: '/ChinhSachLuong/DeleteMulti_ChinhSachLuong?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function loadGridNVData(ID_CS) {
    $.ajax({
        url: '/ChinhSachLuong/GetChinhSachLuongNhanVien?ID_ChinhSachLuong=' + ID_CS + '&ID_NhanVien=0',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#gridNhanVien"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: { type: 'date', editable: false },
                        NgayBatDau: { type: 'date', editable: false },
                        NgayKetThuc: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridNhanVien"), false);
    });
}

function openAddNhanVienWindow() {
    if (isEdit) {
        console.log($("#ID").val());
        $.ajax({
            url: '/NhanVien/GetByNotID_ChinhSachLuong?ID_ChinhSachLuong=' + $("#ID").val(),
            type: 'GET',
        }).done(function successCallback(response) {
            kendo.ui.progress($("#gridAddNhanVien"), true);
            parsedResponse = JSON.parse(response);
            var dataSource = new kendo.data.DataSource({
                data: parsedResponse,
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 20,
            });
            $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#gridAddNhanVien"), false);
        });
    }
    if ($(window).width() > 800) {
        $("#windowNhanVien").data("kendoWindow").center().open();
    } else {
        $("#windowNhanVien").data("kendoWindow").center().maximize().open();
    }
}

function openCauHinhWindow(ID_ChinhSach) {
    $("#ID").val(ID_ChinhSach);
    $.ajax({
        url: '/ChinhSachLuong/GetChinhSachLuongCauHinh?ID_ChinhSachLuong=' + ID_ChinhSach,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.length > 0) {
            var data = response[0]; // Lấy đối tượng đầu tiên trong mảng

            $("#NgayBatDau").data("kendoDatePicker").value(data.NgayBatDau);
            $("#NgayKetThuc").data("kendoDatePicker").value(data.NgayKetThuc);
            $("#CongChuan").val(data.CongChuan);
            $("#DoanhSoToiThieu").val(data.DoanhSoToiThieu);
            $("#LuongKhachToiThieu").val(data.LuongKhachToiThieu);
            $("#NgayCongToiThieu").val(data.NgayCongToiThieu);
            $("#LuyKe_DoanhSoToiThieu").prop("checked", Number(data.LuyKe_DoanhSoToiThieu) === 1);
            $("#LuyKe_LuongKhachToiThieu").prop("checked", Number(data.LuyKe_LuongKhachToiThieu) === 1);
            $("#LuyKe_NgayCongToiThieu").prop("checked", Number(data.LuyKe_NgayCongToiThieu) === 1);
            $("#GhiChu").val(data.GhiChu);

            if ($(window).width() > 800) {
                $("#windowCH").data("kendoWindow").center().open();
            } else {
                $("#windowCH").data("kendoWindow").center().maximize().open();
            }
        } else {
             if ($(window).width() > 800) {
                $("#windowCH").data("kendoWindow").center().open();
            } else {
                $("#windowCH").data("kendoWindow").center().maximize().open();
            }
        }
    })
}

function DeleteMultiRowGridNV() {
    let gridNV = $("#gridNhanVien").data("kendoGrid");
    if (gridNV.select().length > 0) {
        let listID_NV = [];
        gridNV.select().each(function () {
            let dataItem = gridNV.dataItem(this);
            listID_NV.push(dataItem.ID);
            console.log(listID_NV);
        })
        $.ajax({
            url: '/ChinhSachLuong/DeleteCSL_NVFromChinhSachLuong?ID_ChinhSachLuong=' + $("#ID").val() + '&ListID_NhanVien=' + listID_NV,
            type: 'POST',
        }).done(function (response) {
            if (response.success) {
                $("#gridNhanVien").data("kendoGrid").clearSelection();
                loadGridNVData($("#ID").val());
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    } else {
        alert("hay chọn ít nhất 1 nhân viên")
    }
    //var bangDuLieu = $("#gridNhanVien").data("kendoGrid");
    //var dataSourceAddNV = $("#gridAddNhanVien").data("kendoGrid").dataSource;
    //if (bangDuLieu.select().length > 0) {
    //    var items = [];
    //    bangDuLieu.select().each(function () {
    //        var dataItem = bangDuLieu.dataItem(this);
    //        dataSourceAddNV.insert(dataItem);
    //        items.push(dataItem);
    //    });
    //    $.each(items, function (index, item) {
    //        $('#gridNhanVien').data("kendoGrid").dataSource.remove(item);
    //    })
    //}
}

function CheckNhanVienTrongToNhom(idnhanvien) {
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuNhanVien, function (index, item) {
        //console.log(item);
        //console.log(idnhanvien)
        if (idnhanvien == item.ID) {
            isExisted = true;
        }
    })

    return isExisted;
}

function LuuAddNhanVien() {
    if (isEdit) {
        let gridAddNV = $("#gridAddNhanVien").data("kendoGrid");
        let listAddID_NV = [];
        gridAddNV.select().each(function () {
            let dataItem = gridAddNV.dataItem(this);
            listAddID_NV.push(dataItem.ID);
        })

        $.ajax({
            url: '/ChinhSachLuong/InsertCSL_NVFromChinhSachLuong?ID_ChinhSachLuong=' + $("#ID").val()
                + '&ListID_NhanVien=' + listAddID_NV.toString() + '&ID_NguoiApDung=1'
                + '&NgayBatDau=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                + '&NgayKetThuc=' + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
            type: 'POST',
            error: function (request, error) {
                console.log(error);
            },
        }).done(function successCallback(response) {
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                loadGridNVData($("#ID").val());
                $("#windowNhanVien").data("kendoWindow").close();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    } else {
        //let gridAddNV = $("#gridAddNhanVien").data("kendoGrid");
        //let listSelectedAddNV = $("#gridAddNhanVien").data("kendoGrid").select();
        //let listNVPrepareToAdd = $("#gridNhanVien").data("kendoGrid").dataSource;
        //let items = [];
        //listSelectedAddNV.each(function () {
        //    let dataItem = gridAddNV.dataItem(this);
        //    listNVPrepareToAdd.add(dataItem);
        //    items.push(dataItem);
        //});
        //$.each(items, function (index, item) {
        //    $('#gridAddNhanVien').data("kendoGrid").dataSource.remove(item);
        //})
    }
}

function betweenFilter(args) {
    var filterCell = args.element.parents(".k-filtercell");

    filterCell.empty();
    filterCell.html('<span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Từ:</span><input style="width:80%" class="start-date"/></span><span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Đến:</span><input style="width:80%;" class="end-date"/></span>');

    $(".start-date", filterCell).kendoDatePicker({
        format: '{0: dd-MM-yyyy}',
        change: function (e) {
            var startDate = e.sender.value(),
                endDate = $("input.end-date", filterCell).data("kendoDatePicker").value().setHours(23),
                dataSource = $("#grid").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "NgayPhat", operator: "gte", value: startDate });
                filter.filters.push({ field: "NgayPhat", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });
    $(".end-date", filterCell).kendoDatePicker({
        format: '{0: dd-MM-yyyy}',
        change: function (e) {
            var startDate = $("input.start-date", filterCell).data("kendoDatePicker").value(),
                endDate = e.sender.value().setHours(23),
                dataSource = $("#grid").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "NgayPhat", operator: "gte", value: startDate });
                filter.filters.push({ field: "NgayPhat", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });

}