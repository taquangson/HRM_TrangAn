$(".main_container").hide();
var dataCa = [];
$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    $("#grid").kendoTreeList({
        height: function () {
            var height = $(window).height() - 250;
            return height;
        },
        excel: {
            filterable: true
        },
        selectable: true,
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
        }
    });
    $("#window").kendoWindow({
        width: "50%",
        height: "60%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    });

    $("#BatDau").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })

    $("#KetThuc").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })





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


    LoadTreeview();

    $.ajax({
        url: '/ChinhSachLuong/GetAllChinhSachLuong',
        type: 'GET',
    }).done(function successCallback(response) {
        dataCa = response;
        var dataSource = new kendo.data.DataSource({
            data: dataCa
        });
        $("#ComboChinhSachLuong").kendoComboBox({
            dataSource: dataSource,
            dataTextField: 'Ten',
            dataValueField: 'ID',
            filter: "contains"
        })
    });
    //LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();

})

function LoadTreeview() {
    $.ajax({
        url: '/PhongBan/GetTreePhongBan',
        type: 'GET'
    }).done(function (response) {


        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })
        $("#treePhongBan").kendoDropDownTree({
            dataSource: dataSourceCombo,
            placeholder: "Chọn phòng ban...",
            dataTextField: "TenPhongBan",
            dataValueField: "ID",
            valuePrimitive: true,
            autoBind: true
        })
        //$("#treePhongBan").data("kendoDropDownTree").setDataSource(dataSourceCombo);

        //$("#treeview").data("kendoTreeView").select(".k-first");
    })
}

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
        url: '/ChinhSachLuong/GetDataTreeChinhSachLuong?ID_PhongBan=' + ($("#treePhongBan").data("kendoDropDownTree").value() ? $("#treePhongBan").data("kendoDropDownTree").value() : 0),
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#grid"), true);

        var columns = [];
        var f = [];
        columns.push(
            {
                width: "40px",
                selectable: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                title: "Phòng ban",
                template: function (e) {
                    if (e.MaNhanVien != null) {
                        return "";
                    } else {
                        return e.TenNhanVien;
                    }
                },
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
                attributes: {
                    style: "font-size: 12px; font-weight:bold; vertical-align: middle;",
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenNhanVien",
                title: "Tên nhân viên",
                template: function (e) {
                    if (e.MaNhanVien == null) {
                        return "";
                    } else {
                        return e.TenNhanVien;
                    }
                },
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "chinhsachluong",
                title: "Chính sách lương",
                template: function (e) {
                    if (e.MaNhanVien == null) {
                        return "";
                    } else {
                        if (e.chinhsachluong.length == 0) {
                            return "Chưa có chính sách";
                        } else {
                            let html = "";
                            $.each(e.chinhsachluong, function (index, item) {
                                html += "<span class='itemchinhsach'><b>" + item.TenChinhSach + "</b><i onclick='XoaChinhSach(\"" + item.TenChinhSach + "\"," + item.ID_ChinhSachLuong + ")' style='margin-left:15px;color:red; cursor:pointer' class='fa fa-times'></i></span>"
                            })
                            return html;
                        }
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            }
        )
        var ds = new kendo.data.TreeListDataSource({
            data: response,
            schema: {
                model: {
                    id: "ID_HoSoNhanSu",
                    parentId: "ID_Parent",
                    expanded: true,
                    fields: {
                        ID_HoSoNhanSu: { type: "number", editable: false, nullable: false },
                        ID_Parent: { type: "number", nullable: true },
                    }
                },
                parse: function (res) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].ID_HoSoNhanSu == 10000 + parseInt($("#treePhongBan").data("kendoDropDownTree").value())) {
                            res[i].ID_Parent = null;
                        }
                        if (res[i].ID_Parent == 0) {
                            res[i].ID_Parent = null;
                        }
                    }
                    console.log(res);
                    return res;
                }
            },
        });

        $("#grid").data("kendoTreeList").setOptions({
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
            $("#Ten").val(selectedItem.TenNhanVien);
            $("#ID_HoSoNhanSu").val(selectedItem.ID_HoSoNhanSu);
        } else {
            $("#TenDoiTuong").text('Nhóm: ');
            $("#Ten").val(selectedItem.TenNhanVien);
            $("#ID_PhongBan").val(selectedItem.ID_HoSoNhanSu);
            console.log($)
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


function Luu() {
    ValidateForm(function (valid) {
        if (valid) {
            if ($("#ID_HoSoNhanSu").val() == 0 || $("#ID_HoSoNhanSu").val() == '' || $("#ID_HoSoNhanSu").val() == null) {
                var dataSource = $("#grid").data("kendoTreeList").dataSource._pristineData
                var ID_PhongBan = $("#ID_PhongBan").val();
                var listHSNS = dataSource.filter((item) => (item.ID_Parent == ID_PhongBan && item.ID_HoSoNhanSu < 10000));
                $.each(listHSNS, function (index, item) {
                    $.ajax({
                        url: '/ChinhSachLuong/InsertCSL_NVFromChinhSachLuong',
                        type: 'POST',
                        data: {
                            ID_ChinhSachLuong: $("#ComboChinhSachLuong").data("kendoComboBox").value(),
                            MucLuong: $("#MucLuong").val(),
                            ID_HoSoNhanSu: item.ID_HoSoNhanSu,
                            GhiChu: $("#GhiChu").val(),
                            NgayBatDau: kendo.toString($("#BatDau").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            NgayKetThuc: kendo.toString($("#KetThuc").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                        }
                    }).done(function successCallback(response) {
                        //response controller này trả về success và msg
                        if (response.success) {
                            notification.show({ kValue: response.msg }, "success");
                        } else {
                            notification.show({ kValue: response.msg }, "error");
                        }
                    });
                })
                LoadGridData();
                setTimeout(function () {
                    Huy();
                }, 4000);
            } else {
                $.ajax({
                    url: '/ChinhSachLuong/InsertCSL_NVFromChinhSachLuong',
                    type: 'POST',
                    data: {
                        ID_ChinhSachLuong: $("#ComboChinhSachLuong").data("kendoComboBox").value(),
                        MucLuong: $("#MucLuong").val(),
                        ID_HoSoNhanSu: $("#ID_HoSoNhanSu").val(),
                        GhiChu: $("#GhiChu").val(),
                        NgayBatDau: kendo.toString($("#BatDau").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                        NgayKetThuc: kendo.toString($("#KetThuc").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
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
        }
    })

}

function getAllChildHSNS(listHSNS, ID_PhongBan) {
    var dataSource = $("#grid").data("kendoTreeList").dataSource._pristineData
    var child = dataSource.filter((item) => item.ID_Parent == ID_PhongBan)
    console.log(child);
    console.log(ID_PhongBan);
    //$.each(child, function (index, item) {
    //    if (item.ID < 10000) {
    //        listHSNS.push(item)
    //    } else {
    //        getAllChildHSNS(listHSNS, item.ID);
    //    }
    //    console.log(item.ID);
    //    console.log(listHSNS);
    //})
    //return listHSNS;
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
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa áp dụng chính sách của nhân viên: " + selectedItem.TenNhanVien + " ?</b>", function () { XoaDuLieu(selectedItem, 0); }, function () { });
        } else {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa áp dụng chính sách của phòng ban: " + selectedItem.TenNhanVien + " ?</b>", function () { XoaDuLieu(selectedItem, 0); }, function () { });
        }
    }

}

function XoaChinhSach(TenChinhSach, ID_ChinhSach) {

    setTimeout(function () {
        var treeList = $("#grid").data("kendoTreeList");
        var row = treeList.select();
        if (row.length != 1) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 nhân viên hoặc 1 phòng ban cần xóa ca làm việc");
        } else {
            var selectedItem = treeList.dataItem(row);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa áp dụng chính sách " + TenChinhSach + " của nhân viên: " + selectedItem.TenNhanVien + " ?</b>", function () { XoaDuLieu(selectedItem, ID_ChinhSach); }, function () { });
        }
    }, 500)
}
function XoaDuLieu(dulieu, ID_ChinhSach) {
    console.log(dulieu);
    if (dulieu.MaNhanVien != null) {
        console.log(dulieu.MaNhanVien);
        $.ajax({
            url: '/ChinhSachLuong/DeleteCSL_NVFromChinhSachLuong?ID_NhanVien=' + dulieu.ID_HoSoNhanSu + '&ID_ChinhSachLuong=' + ID_ChinhSach,
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
        var dataSource = $("#grid").data("kendoTreeList").dataSource._pristineData
        var ID_PhongBan = dulieu.ID_HoSoNhanSu;
        var listHSNS = dataSource.filter((item) => (item.ID_Parent == ID_PhongBan && item.ID_HoSoNhanSu < 10000));
        $.each(listHSNS, function (index, item) {
            $.ajax({
                url: '/ChinhSachLuong/DeleteCSL_NVFromChinhSachLuong?ID_NhanVien=' + item.ID_HoSoNhanSu + '&ID_ChinhSachLuong=' + ID_ChinhSach,
                type: 'POST',
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        })
        LoadGridData();
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