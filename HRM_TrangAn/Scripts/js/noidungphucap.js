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
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:center",
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
                field: "Ten",
                title: "Tên",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "Ma",
                title: "Mã",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "Loai",
                title: "Loại",
                template: function (e) {
                    if (e.Loai == 1) {
                        return "<b style='color:green'>Phụ cấp</b>";
                    } else {
                        return "<b style='color:red'>Giảm trừ</b>";
                    }
                },
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "GhiChu",
                title: "Ghi chú",
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

    $('#ComboLoai').kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        autoBind: false,
        dataSource: new kendo.data.DataSource({
            data: [{ text: "Phụ cấp", value: 1 }, { text: "Giảm trừ", value: -1 }]
        }),
    })

    LoadGridData();
    $("#window").kendoWindow({
        width: "500px",
        height: "400px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function LoadGridData() {
    $.ajax({
        url: '/NoiDungPhuCap/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    ID: "ID",
                    fields: {
                        Ten: { type: 'text', editable: false },
                        Ma: { type: 'text', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        console.log(dataSource);
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

var isEdit = false;

function ThemMoi() {
    Huy();
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").select();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var selectedItem = $("#grid").data("kendoGrid").dataItem(arr);
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#Ten").val(selectedItem.Ten);
        $("#Ma").val(selectedItem.Ma);
        $("#ComboLoai").data("kendoComboBox").value(selectedItem.Loai);
        $("#GhiChu").val(selectedItem.GhiChu);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}
function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            Ten: $("#Ten").val(),
            Loai: $("#ComboLoai").data("kendoComboBox").value(),
            Ma: $("#Ma").val(),
            GhiChu: $("#GhiChu").val(),
        }
        console.log(dataItem)
        $.ajax({
            url: '/NoiDungPhuCap/InsertOrUpdate',
            type: 'POST',
            data: dataItem,
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                //TimKiem();
                Huy();
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function ValidateForm() {
    var validten = SetValidate("Ten");
    var validma = SetValidate("Ma");
    var validloai = SetValidate("ComboLoai");
    var valid = validten && validma && validloai;

    console.log(valid);
    return valid;
}

function Xoa() {
    var grid = $("#grid").data("kendoGrid");
    if (grid.select().length > 0) {
        var selectedCount = grid.select().length;
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + selectedCount + " nội dung phụ cấp này không?</b>", function () { XoaDuLieu(grid); }, function () { }
        );
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    console.log(bangDuLieu.dataSource);
    bangDuLieu.select().each(function (index, item) {
        var dataItem = bangDuLieu.dataItem(item);
        console.log(dataItem);
        var id = dataItem.ID;
        ids.push(id);
    });
    console.log(ids);
    $.ajax({
        url: '/NoiDungPhuCap/DeleteMulti?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            bangDuLieu.clearSelection();
            LoadGridData();
            //TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid'); // Đảm bảo dùng kendoGrid

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    };
    grid.saveAsExcel();
}
