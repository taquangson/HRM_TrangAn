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
        //var data = [{
        //    TenDayDu: "Tất cả",
        //    ID: 0
        //}]
        //$.each(response, function (index, item) {
        //    data.push({
        //        TenDayDu: item.TenDayDu,
        //        ID: item.ID
        //    })
        //})
        //var dataSource = new kendo.data.DataSource({
        //    data: data
        //});
        //$("#NguoiTaoCombobox").kendoComboBox({
        //    dataTextField: 'TenDayDu',
        //    dataValueField: 'ID',
        //    dataSource: dataSource,
        //    filter: "contains"
        //});
        //console.log($("#NguoiTaoCombobox").kendoComboBox());
        $("#NguoiTaoCombobox").data("kendoComboBox").value(1);
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
                width: "26px",
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
                format: "{0:dd/MM/yyyy hh:mm:ss}",
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
                format: "{0:dd/MM/yyyy hh:mm:ss}",
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
        height: "400px",
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
        value: new Date(),
        change: function () {
            var date = this.value()
            console.log(date);
            var TuNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy/MM/dd") + " 00:00:00";
            var DenNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59";
            console.log(TuNgay)
            console.log(DenNgay)
            $.ajax({
                url: '/NoCong/GetNoCong'
                    + '?TuNgay=' + TuNgay
                    + '&DenNgay=' + DenNgay
                    + '&ID_ToNhom=' + 0,
                type: 'GET'
            }).done(function successCallback(response) {
                response = JSON.parse(response);
                console.log(response);
                if (response && response.length > 0) {
                    var dataSource = new kendo.data.DataSource({
                        data: response,
                        schema: {
                            model: {
                                id: "ID",
                                fields: {
                                    TenDayDu: { type: 'string' },
                                    MaNhanVien: { type: 'string' },
                                    MaThuyen: { type: 'string' },
                                    NoCong: { type: 'number' }
                                }
                            }
                        }
                    });
                    $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
                } else {
                    console.error("Data is missing the field TenDayDu or is empty");
                }
            });
        }
    })

    $("#NguoiChuyenCong").kendoMultiColumnComboBox({
        dataTextField: "TenDayDu",
        dataValueField: "ID",
        columns: [
            {
                field: "TenDayDu",
                title: "Tên Đầy Đủ",
                width: "200px",
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "200px",
            },
            {
                field: "MaThuyen",
                title: "Mã Thuyền",
                width: "200px",
            },
            {
                field: "NoCong",
                title: "Nợ Công",
                width: "200px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaThuyen", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource(),
        select: function (e) {
            var item = e.item;
            var dataItem = $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").dataItem(item);
            $("#CongTon").val(dataItem.NoCong);
        }
    });

    $("#NguoiNhanCong").kendoMultiColumnComboBox({
        dataTextField: "TenDayDu",
        dataValueField: "ID",
        columns: [
            {
                field: "TenDayDu",
                title: "Tên Đầy Đủ",
                width: "200px",
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "200px",
            },
            {
                field: "MaThuyen",
                title: "Mã Thuyền",
                width: "200px",
            },
            {
                field: "NoCong",
                title: "Nợ Công",
                width: "200px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaThuyen", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource()
    })

     $.ajax({
         url: '/NoCong/GetNoCong'
             + '?TuNgay=' + kendo.toString(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1), "yyyy/MM/dd") + " 00:00:00"
             + '&DenNgay=' + kendo.toString(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59"
             + '&ID_ToNhom=' + 0,
         type: 'GET'
     }).done(function successCallback(response) {
         response = JSON.parse(response);
         var dataSource = new kendo.data.DataSource({
             data: response,
             schema: {
                 model: {
                     id: "ID",
                     fields: {
                         TenDayDu: { type: 'string' },
                         MaNhanVien: { type: 'string' },
                         MaThuyen: { type: 'string' },
                         NoCong: { type: 'number' },
                     }
                 }
             },
         });
         $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
         $("#NguoiNhanCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
     });
 
})

function TimKiem() {
    var date = $("#month").data("kendoDatePicker").value();

    var TuNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy/MM/dd") + " 00:00:00";
    var DenNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59";
    var ID_NguoiTao = $("#NguoiTaoCombobox").data("kendoComboBox").value();
    if (ID_NguoiTao == null) {
        ID_NguoiTao = 0
    }
    var url = `/ChuyenCong/GetLichSuChuyenCongByThangAndNguoiTao?TuNgay=${TuNgay}&DenNgay=${DenNgay}&ID_NguoiTao=${ID_NguoiTao}`;

    console.log(url);

    kendo.ui.progress($("#grid"), true);

    $.ajax({
        url: url,
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {

        response = JSON.parse(response);
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
        console.log(dataSource);
        $("#grid").data("kendoGrid").setDataSource(dataSource);
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
        openDialog(dialogRoot, "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#CongChuyen").val(selectedItem.CongChuyen);
        $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiChuyenCong);
        $("#NguoiNhanCong").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiNhanCong);
        $("#NgayTinhCong").data("kendoDatePicker").value(new Date(selectedItem.NgayTinhCong));
        var item = $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").item;
        var CongTonVal = $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").dataItem(item).NoCong;
        $("#CongTon").val(CongTonVal);
        $.ajax({
            url: '/NoCong/GetNoCong'
                + '?TuNgay=' + kendo.toString(new Date((new Date(selectedItem.NgayTinhCong)).getFullYear(), (new Date(selectedItem.NgayTinhCong)).getMonth(), 1), "yyyy/MM/dd") + " 00:00:00"
                + '&DenNgay=' + kendo.toString(new Date((new Date(selectedItem.NgayTinhCong)).getFullYear(), (new Date(selectedItem.NgayTinhCong)).getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59"
                + '&ID_ToNhom=' + 0,
            type: 'GET'
        }).done(function successCallback(response) {
            response = JSON.parse(response);
            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            TenDayDu: { type: 'string' },
                            MaNhanVien: { type: 'string' },
                            MaThuyen: { type: 'string' },
                            NoCong: { type: 'number' },
                        }
                    }
                },
            });
            $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").setDataSource(dataSource);
        });
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}

function Huy() {
    $("#ID").val(0);
    $("#CongChuyen").val(0);
    $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value(0);
    $("#NguoiNhanCong").data("kendoMultiColumnComboBox").value(0);
    $("#NgayTinhCong").data("kendoDatePicker").value(new Date());
    $("#window").data("kendoWindow").close();
}

function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            CongChuyen: $("#CongChuyen").val(),
            NgayTinhCong: kendo.toString($("#NgayTinhCong").data("kendoDatePicker").value(), "yyyy-MM-ddTHH:mm:ss"),
            ID_NguoiChuyenCong: $("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value(),
            ID_NguoiNhanCong: $("#NguoiNhanCong").data("kendoMultiColumnComboBox").value(),
            ID_NguoiTao: 0,
        }
        console.log(dataItem)
        $.ajax({
            url: '/ChuyenCong/InsertOrUpdate_ChuyenCong',
            type: 'POST',
            data: dataItem
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                Huy()
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
    console.log(dataItem);
    if ($("#NguoiChuyenCong").data("kendoMultiColumnComboBox").value() == 0) {
        openDialog(dialogRoot, "Cần chọn 1 nhân viên chuyển công");
        return false;
    } else if ($("#NguoiNhanCong").data("kendoMultiColumnComboBox").value() == 0) {
        openDialog(dialogRoot, "Cần chọn 1 nhân viên nhận công");
        return false;
    }
    if (congTon < 0) {
        openDialog(dialogRoot, "Nhân viên không còn công");
        return false;
    } else if (congTon < congChuyen) {
        openDialog(dialogRoot, "Nhân viên không đủ công để chuyển");
        return false;
    } else if (congChuyen <= 0) {
        openDialog(dialogRoot, "Công chuyển phải lớn hơn 0");
        return false;
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
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + grid.select().length + " lịch sử chuyển công?</b>", function () { XoaDuLieu(grid); }, function () { });
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
        url: '/ChuyenCong/DeleteMulti_ChuyenCong?string_ID_ChuyenCong=' + ids.join(','),
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