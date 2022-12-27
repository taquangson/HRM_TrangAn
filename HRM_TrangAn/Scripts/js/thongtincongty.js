$(".main_container").hide();
var dataCongTy = {
    ID: -1
}
$(document).ready(function () {
    //$("#grid").kendoGrid({
    //    height: function () {
    //        var height = $(window).height() - 150;
    //        return height;
    //    },
    //    scrollable: true,
    //    persistSelection: true,
    //    autoFitColumn: true,
    //    resizable: true,
    //    sortable: true,
    //    //editable: { mode: "incell" },
    //    //save: function (e) {
    //    //    console.log(e);
    //    //    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

    //    //},
    //    filterable: {
    //        mode: "row",
    //    },
    //    pageable: pageableShort,

    //    dataBinding: function () {
    //        record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
    //    },
    //    //Danh sách cột của bảng dữ liệu
    //    columns: [
    //        {
    //            width: "26px",
    //            selectable: true,
    //            headerAttributes: {
    //                style: "text-align:left",
    //                class: "table-header-cell "
    //            }
    //        },
    //        {
    //            title: "STT",
    //            template: "#= ++record #",
    //            width: "50px",
    //            attributes: {
    //                class: "text-center"
    //            },
    //            headerAttributes: {
    //                style: "text-align: center; font-size: 12px; font-weight:bold",
    //                class: "table-header-cell"
    //            }
    //        },
    //        {
    //            field: "TenCongTy",
    //            title: "Tên công ty",
    //            width: "200px",
    //            filterable: {
    //                cell: {
    //                    operator: "contains",
    //                    showOperators: false,
    //                    template: function (e) {
    //                        e.element.addClass("k-textbox").css("width", "100%")
    //                    }
    //                }
    //            },
    //            headerAttributes: {
    //                style: "text-align: center; font-size: 12px; font-weight:bold",
    //                class: "table-header-cell"
    //            }
    //        },
    //        {
    //            field: "MaCongTy",
    //            title: "Mã công ty",
    //            width: "120px",
    //            filterable: {
    //                cell: {
    //                    operator: "contains",
    //                    showOperators: false,
    //                    template: function (e) {
    //                        e.element.addClass("k-textbox").css("width", "100%")
    //                    }
    //                }
    //            },
    //            headerAttributes: {
    //                style: "text-align: center; font-size: 12px; font-weight:bold",
    //                class: "table-header-cell"
    //            }
    //        },
    //        {
    //            field: "DiaChi",
    //            title: "Địa chỉ",
    //            width: "500px",
    //            filterable: {
    //                cell: {
    //                    operator: "contains",
    //                    showOperators: false,
    //                    template: function (e) {
    //                        e.element.addClass("k-textbox").css("width", "100%")
    //                    }
    //                }
    //            },
    //            headerAttributes: {
    //                style: "text-align: right; font-size: 12px; font-weight:bold",
    //                class: "table-header-cell"
    //            },
    //            attributes: {
    //                style: "text-align: center;",
    //                class: "table-header-cell"
    //            }
    //        },
    //        {
    //            field: "GhiChu",
    //            title: "Ghi chú",
    //            filterable: {
    //                cell: {
    //                    operator: "contains",
    //                    showOperators: false,
    //                    template: function (e) {
    //                        e.element.addClass("k-textbox").css("width", "100%")
    //                    }
    //                }
    //            },
    //            headerAttributes: {
    //                style: "text-align: right; font-size: 12px; font-weight:bold",
    //                class: "table-header-cell"
    //            },
    //            attributes: {
    //                style: "text-align: center;",
    //                class: "table-header-cell"
    //            }
    //        },

    //    ]

    //});
    //$("#window").kendoWindow({
    //    width: "100%",
    //    height: "100%",
    //    title: "Chi tiết",
    //    visible: false,
    //    modal: true,
    //    resizable: false,
    //    actions: [
    //        "Close"
    //    ]
    //});

    //$("#grid").on("dblclick", "tr[role='row']", function () {
    //    $("#grid").data("kendoGrid").clearSelection();
    //    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
    //    $("#grid").data("kendoGrid").select(row);
    //    openEditWindow();
    //})

    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

function showData(item) {
    $("#ID").val(item.ID);
    $("#TenCongTy").val(item.TenCongTy);
    $("#GhiChu").val(item.GhiChu);
    $("#MaCongTy").val(item.MaCongTy);
    $("#PhoGiamDoc").val(item.PhoGiamDoc);
    $("#KeToan").val(item.KeToan);
    $("#BanQuanLy").val(item.BanQuanLy);
    $("#DiaChi").val(item.DiaChi);

}

function openEditWindow() {
    //var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        //var grid = $("#grid").data("kendoGrid");
        //var selectedItem = grid.dataItem(grid.select());
        //console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#ID").val(selectedItem.ID);
        $("#TenCongTy").val(selectedItem.TenCongTy);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaCongTy").val(selectedItem.MaCongTy);
        $("#PhoGiamDoc").val(selectedItem.PhoGiamDoc);
        $("#KeToan").val(selectedItem.KeToan);
        $("#BanQuanLy").val(selectedItem.BanQuanLy);
        $("#DiaChi").val(selectedItem.DiaChi);
        //});
        //if ($(window).width() > 800) {
        //    $("#window").data("kendoWindow").center().open();
        //} else {
        //    $("#window").data("kendoWindow").center().maximize().open();
        //}
    }

}


function LoadGridData() {
    $.ajax({
        url: '/ThongTinCongTy/GetAllThongTinCongTy',
        type: 'GET',
    }).done(function successCallback(response) {
        //kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        if (response.length > 0) {
            dataCongTy = response[0];
            showData(response[0])
        }
        //$("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    Huy();
    //if ($(window).width() > 800) {
    //    $("#window").data("kendoWindow").center().open();
    //} else {
    //    $("#window").data("kendoWindow").center().maximize().open();
    //}
}

function openPhanQuyen(id) {
    $("#ID_TaiKhoan").val(id);
    GetQuyen();
    if ($(window).width() > 800) {
        $("#windowPhanQuyen").data("kendoWindow").center().open();
    } else {
        $("#windowPhanQuyen").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm() {
    var validten = SetValidate("TenCongTy");
    var validma = SetValidate("MaCongTy");
    var valid = validma && validten;
    return valid;
}


function Luu() {

    if (ValidateForm()) {
        $.ajax({
            url: '/ThongTinCongTy/InsertOrUpdate_ThongTinCongTy',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenCongTy: $("#TenCongTy").val(),
                GhiChu: $("#GhiChu").val(),
                DiaChi: $("#DiaChi").val(),
                PhoGiamDoc: $("#PhoGiamDoc").val(),
                BanQuanLy: $("#BanQuanLy").val(),
                KeToan: $("#KeToan").val(),
                MaCongTy: $("#MaCongTy").val()
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                document.getElementById("formChiTiet").reset();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function OpenDanhMucLoi() {
    var windowOption = {
        width: "30%",
        height: "10%",
        title: "Thêm danh mục lỗi vi phạm"
    }
    OpenLayoutWindow('/DanhMuc/DanhMucLoi', windowOption);
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    if (dataCongTy.ID > 0) {
        showData(dataCongTy)
    }
    //$("#ID").val('');
    //$("#window").data("kendoWindow").close();
    //$("#grid").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục công việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
    });
    $.ajax({
        url: '/ThongTinCongTy/Delete_ThongTinCongTy?ID=' + ids.join(','),
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