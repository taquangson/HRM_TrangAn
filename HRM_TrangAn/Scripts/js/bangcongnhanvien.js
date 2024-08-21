$(".main_container").hide();
$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    //$("#grid").kendoTreeList({
    $("#grid").kendoGrid({
        excel: {
            filterable: true
        },
        selectable: false,
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: false,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        dataBound: function (e) {
            var treelist = this;
            var rows = treelist.items();
            $.each(rows, function (i, row) {
                var dataItem = treelist.dataItem(row);
                if (dataItem.MaNhanVien == null) {
                    $.each($(row).find("td"), function (j, td) {
                        $(td).addClass("bg-purple");
                    })
                }

                //else {
                //    $(row).find("td:first-child").addClass("green");
                //}
            });
        }
    });
    //$("#window").kendoWindow({
    //    width: "50%",
    //    height: "40%",
    //    title: "Chi tiết",
    //    visible: false,
    //    modal: true,
    //    resizable: false,
    //    actions: [
    //        "Close"
    //    ]
    //});

    //$("#TuNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
    //    change: function (e) {
    //        var d = new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0);
    //        $("#DenNgay").data("kendoDatePicker").value(d);
    //    }
    //})
    //$("#DenNgay").kendoDatePicker({
    //    format: "dd/MM/yyyy",
    //    value: new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0)
    //})

    LoadGridData();
})

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#ID").val(selectedItem.ID);
        $("#TenCa").val(selectedItem.TenCa);
        $("#MaCa").val(selectedItem.MaCa);
        $("#SoGioLamViec").val(selectedItem.SoGioLamViec);
        $("#SoGioNghi").val(selectedItem.SoGioNghi);

        $("#BatDau").data("kendoTimePicker").value(selectedItem.BatDau.Hours + ':' + selectedItem.BatDau.Minutes);
        $("#KetThuc").data("kendoTimePicker").value(selectedItem.KetThuc.Hours + ':' + selectedItem.KetThuc.Minutes);
        if (selectedItem.IsCaDem) {
            $("#CaDem").prop('checked', 'true')
        } else {
            $("#CaDem").removeProp('checked')
        }

        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}


function LoadGridData() {
    $.ajax({
        url: '/ChamCongNhanVien/CongNhanSu_GetDataByNhanVien'
            + "?from=" + from + " 00:00:00"
            + "&to=" + to + " 23:59:59"
            + "&ID_TaiKhoan=" + idtaikhoan,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);

        var columns = [];
        var f = [];
        columns.push(
            //{
            //    title: "Phòng ban",
            //    template: function (e) {
            //        if (e.MaNhanVien != null) {
            //            return "";
            //        } else {
            //            return e.TenDayDu;
            //        }
            //    },
            //    width: "150px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    attributes: function (e) {
            //        console.log(e.MaNhanVien);
            //        //if (e.MaNhanVien != null) {
            //        //    return { style: "font-size: 12px; font-weight:bold; vertical-align: middle;" };
            //        //} else {
            //        //    return { style: "font-size: 12px; font-weight:bold; vertical-align: middle; background-color:#232323" };
            //        //}

            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
            //        class: "table-header-cell"
            //    }
            //},
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "100px",
                locked: true,
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
                template: function (e) {
                    if (e.MaNhanVien == null) {
                        return "";
                    } else {
                        return e.TenDayDu;
                    }
                },
                locked: true,
                width: "180px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            }
        )
        var dates = getDates(new Date(from), new Date(to));
        $.each(dates, function (index, item) {
            columns.push({
                title: kendo.toString(item, 'dd/MM'),
                field: 'data2' + kendo.toString(item, 'yyyyMMdd'),
                template: function (e) {
                    return e['data2' + kendo.toString(item, 'yyyyMMdd')];
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
                width: "80px",
                attributes: {
                    style: "text-align: center; font-size: 12px;padding:0;"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            });
        });
        columns.push({
            title: 'Tổng công',
            field: 'TongCong',
            template: function (e) {
                if (e.MaNhanVien == null) {
                    return "";
                } else {
                    return e.TongCong;
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
            format: '{0:N0}',
            width: "80px",
            attributes: {
                style: "text-align: center; font-size: 12px;padding:0;"
            },
            headerAttributes: {
                style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                class: "table-header-cell"
            }
        });
        var ds = new kendo.data.DataSource({
            //var ds = new kendo.data.TreeListDataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    id: "ID",
                    //parentId: "ID_Parent",
                    //expanded: true,
                    fields: {
                        ID: { type: "number", editable: false, nullable: false },
                        //ID_Parent: { type: "number", nullable: true },
                        TongCong: { type: "number", nullable: true },
                    }
                },
                parse: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        //if (res[i].ID == 10000 + parseInt($("#treePhongBan").data("kendoDropDownTree").value())) {
                        //    res[i].ID_Parent = null;
                        //}
                        $.each(dates, function (index, item) {
                            if (res[i]['MaNhanVien'] != null) {
                                res[i]['data2' + kendo.toString(item, 'yyyyMMdd')] = res[i]['data' + kendo.toString(item, 'yyyyMMdd')]
                            } else {
                                res[i]['data2' + kendo.toString(item, 'yyyyMMdd')] = "";
                            }
                        })
                    }
                    console.log(res);
                    $("#congtt").text(res[0].TongCong);
                    return res;
                }
            },
        });

        //$("#grid").data("kendoTreeList").setOptions({
        $("#grid").data("kendoGrid").setOptions({
            dataSource: ds,
            columns: columns
        });
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    var treeList = $("#grid").data("kendoTreeList");
    var row = treeList.select();
    if (row.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 nhân viên hoặc 1 phòng ban cần phân ca làm việc");
    } else {
        var selectedItem = treeList.dataItem(row);
        console.log(selectedItem);
        if (selectedItem.MaNhanVien != null) {
            $("#TenDoiTuong").text('Nhân viên: ');
            $("#Ten").val(selectedItem.TenDayDu);
            $("#ID_NhanVien").val(selectedItem.ID);
        } else {
            $("#TenDoiTuong").text('Nhóm: ');
            $("#Ten").val(selectedItem.TenDayDu);
            $("#ID_NhomNhanVien").val(selectedItem.ID - 10000);
        }
        if ($(window).width() > 600) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}


function ValidateForm(callback) {
    //var validca = SetValidate("ComboCa");
    var validbatdau = $("#BatDau").data("kendoDatePicker").value() == null ? false : true;
    var validketthuc = $("#KetThuc").data("kendoDatePicker").value() == null ? false : true;
    var valid = validbatdau && validketthuc;
    if (valid) {
        callback(valid);
    } else {
        callback(valid);
    }
}


function ChotCong() {
    $.ajax({
        url: '/ChamCongNhanVien/ChotBangCongNhanVien' + window.location.search,
        type: 'GET',

    }).done(function successCallback(response) {
        if (response.success) {
            window.location.reload();
        }
    });
}



function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoTreeList").clearSelection();
}

function Xoa() {
    var treeList = $("#grid").data("kendoTreeList");
    var row = treeList.select();
    if (row.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 nhân viên hoặc 1 phòng ban cần xóa ca làm việc");
    } else {
        var selectedItem = treeList.dataItem(row);
        if (selectedItem.MaNhanVien != null) {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa phân ca của nhân viên: " + selectedItem.TenDayDu + " ?</b>", function () { XoaDuLieu(selectedItem); }, function () { });
        } else {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa phân ca của phòng ban: " + selectedItem.TenDayDu + " ?</b>", function () { XoaDuLieu(selectedItem); }, function () { });
        }
    }

}
function XoaDuLieu(dulieu) {
    console.log(dulieu);
    if (dulieu.MaNhanVien != null) {
        $.ajax({
            url: '/CaLamViecNhanVien/Delete?ID_NhanVien=' + dulieu.ID + '&ID_PhongBan=0'
                + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
            type: 'POST'
        }).done(function (response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    } else {
        $.ajax({
            url: '/CaLamViecNhanVien/Delete?ID_PhongBan=' + (dulieu.ID - 10000) + '&ID_NhanVien=0'
                + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
            type: 'POST'
        }).done(function (response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    }

}

function XuatExcel() {
    var grid = $('#grid').data('kendoTreeList');

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}


function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function dateFromJson(jsonDate) {
    return new Date(parseInt(jsonDate.substr(6)));
}