$(document).ready(function () {
    $("#month").kendoDatePicker({
        format: "MM/yyyy",
        value: new Date(),
        depth: "year",
        start: "year",
    })

    $("#NguoiTaoCombobox").kendoComboBox({
        dataTextField: "TenDayDu",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource()
    })
    // Load NguoiTaoCombobox dataSource
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET'
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        $("#NguoiTaoCombobox").data("kendoComboBox").setDataSource(dataSource);
    })

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 199;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách chuyển công";
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
        columns: [
            {
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
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
                field: "TenNguoiChuyen",
                title: "Tên Người Chuyển",
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
                field: "TenNguoiNhan",
                title: "Tên Người Nhận",
                width: "120px",
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
            },
            {
                field: "TenNguoiTao",
                title: "Tên Người Tạo",
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
                field: "CongChuyen",
                title: "Công Chuyển",
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
                    class: "text-center"
                }
            },
            {
                field: "NgayTao",
                title: "Ngày Tạo",
                width: "120px",
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
                field: "NgayTinhCong",
                title: "Ngày Tính Công",
                width: "120px",
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

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })

    $("#window").kendoWindow({
        width: "800px",
        height: "320px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#NgayTinhCong").kendoDatePicker({
        format: "dd/MM/yyyy",
        //value: new Date(),
        change: function () {
            var date = this.value()
            console.log(date);
            var TuNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy/MM/dd") + " 00:00:00";
            var DenNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59";
            $.ajax({
                url: '/ChuyenCong/GetNoCong?ID_ToNhom=0&from=' + TuNgay + '&to=' + DenNgay,
                type: 'GET'
            }).done(function successCallback(response) {

                var dataSource = new kendo.data.DataSource({
                    data: JSON.parse(response)
                });
                $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
                $("#NguoiNhanCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
            })
        }
    })

    $("#NguoiChuyenCong").kendoMultiColumnComboBox({
        dataTextField: "TenDayDuView",
        dataValueField: "ID",
        columns: [
            {
                field: "FileAnhDaiDien",
                title: "Ảnh đại diện",
                width: "120px",
                template: function (e) {
                    if (e.FileAnhDaiDien != "0") {
                        return "<img class='avatar' src='" + e.FileAnhDaiDien + "'/>"
                    } else {
                        return "Chưa có ảnh";
                    }

                }
            },
            {
                field: "TenDayDu",
                title: "Tên đầy đủ",
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "120px",
            },
            {
                field: "MaThuyen",
                title: "Mã Thuyền",
                width: "120px",
            },
            {
                field: "NoCong",
                title: "Nợ Công",
                width: "120px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaThuyen", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource()
    })

    $("#NguoiNhanCong").kendoMultiColumnComboBox({
        dataTextField: "TenDayDuView",
        dataValueField: "ID",
        columns: [
            {
                field: "FileAnhDaiDien",
                title: "Ảnh đại diện",
                width: "120px",
                template: function (e) {
                    if (e.FileAnhDaiDien != "0") {
                        return "<img class='avatar' src='" + e.FileAnhDaiDien + "'/>"
                    } else {
                        return "Chưa có ảnh";
                    }

                }
            },
            {
                field: "TenDayDu",
                title: "Tên đầy đủ",
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "120px",
            },
            {
                field: "MaThuyen",
                title: "Mã Thuyền",
                width: "120px",
            },
            {
                field: "NoCong",
                title: "Nợ Công",
                width: "120px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaThuyen", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource()
    })

})

function TimKiem() {
    var date = $("#month").data("kendoDatePicker").value()
    var TuNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy/MM/dd") + " 00:00:00";
    var DenNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59";
    console.log(TuNgay);
    console.log(DenNgay);
    var ID_NguoiTao = $("#NguoiTaoCombobox").data("kendoComboBox").value();
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/ChuyenCong/GetLichSuChuyenCongByThangAndNguoiTao"
            + "?TuNgay=" + TuNgay
            + "&DenNgay=" + DenNgay
            + "&ID_NguoiTao=" + ID_NguoiTao > 0 ? ID_NguoiTao : 0,
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: { type: 'date', editable: false },
                        NgayTinhCong: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 30,
        });
        if (dataSource === undefined || dataSource === null) {
            console.log("void");
        } else {
            console.log(dataSource);
            console.log($("#grid").data("kendoGrid"));
            $("#grid").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#grid"), false);
        }
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    Huy();
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#CongChuyen").val(selectedItem.CongChuyen);
        $("#NguoiChuyenCong").data("kendoComboBox").value(selectedItem.ID_NguoiChuyenCong);
        $("#NguoiNhanCong").data("kendoComboBox").value(selectedItem.ID_NguoiNhanCong);
        $("#NgayTinhCong").data("kendoDatePicker").value(toDate(selectedItem.NgaySinh));
    }
}

function Huy() {
    $("#ID").val(0);
    $("#CongChuyen").val(0);
    $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value(0);
    $("#NguoiNhanCong").data("kendoMultiColumnComboBox").value(0);
    $("#NgayTinhCong").data("kendoDatePicker").value("");
    $("#window").data("kendoWindow").close();
}

function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            CongChuyen: $("#CongChuyen").val(),
            NgayTinhCong: kendo.toString($("#NgayTinhCong").data("kendoDatePicker").value(), "yyyy/MM/dd"),
            ID_NguoiChuyenCong: $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value,
            ID_NguoiNhanCong: $("#NguoiNhanCong").data("kendoMultiColumnComboBox").value,
            ID_NguoiTao: 0,
        }
        console.log(dataItem)
        $.ajax({
            url: '',
            type: 'POST',
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                TimKiem();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function ValidateForm() {
    var validcong = SetValidate("CongChuyen");
    var validnguoichuyen = SetValidate("NguoiChuyenCong");
    var validnguoinhan = SetValidate("NguoiNhanCong");
    var item = $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").item;
    var dataItem = $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").dataItem(item);
    var congTon = dataItem.NoCong;
    var congChuyen = $("#CongChuyen").val();
    if (congTon < 0) {

    } else if (congTon < congChuyen) {

    }
    var valid = validcong && validnguoichuyen && validnguoinhan;
    return valid
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

function Xoa() {
    var grid = $("#grid").data("kendoGrid");
    if (grid.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + grid.select().length + " lịch sử chuyển công?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({ kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.id;
        ids.push(id);
    });
    $.ajax({
        url: '',
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}