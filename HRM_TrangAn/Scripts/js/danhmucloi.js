$(".main_container").hide();
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
            sheet.title = "Danh sách ngày lễ";
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
                width: "26px",
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
                field: "TenLoi",
                title: "Tên lỗi",
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
                field: "MoTa",
                title: "Mô tả",
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
                field: "PhatTien",
                title: "Tiền phạt",
                width: "150px",
                format: "{0:N1}",
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
                field: "PhatCong",
                title: "Công phạt",
                format: "{0:N1}",
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
            }
        ]
    });

    $("#window").kendoWindow({
        width: "40%",
        height: "42%",
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

    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();

})

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
      
        $("#ID").val(selectedItem.ID);
        $("#TenLoi").val(selectedItem.TenLoi);
        $("#MoTa").val(selectedItem.MoTa);
        $("#PhatTien").val(selectedItem.PhatTien);
        $("#PhatCong").val(selectedItem.PhatCong);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}

function LoadGridData() {
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMucLoi',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        PhatTien: { type: 'number', editable: false },
                        PhatCong: { type: 'number', editable: false },
                    }
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
    if ($(window).width() > 600) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}


function ValidateForm(callback) {
    var validten = SetValidate("TenLoi");

    var valid = validten;
    if (valid) {
        callback(valid);
    } else {
        callback(valid);
    }
}


function Luu() {
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/DanhMuc/InsertOrUpdate_DanhMucLoi',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenLoi: $("#TenLoi").val(),
                    MoTa: $("#MoTa").val(),
                    PhatTien: $("#PhatTien").val(),
                    PhatCong: $("#PhatCong").val()
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



function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục lỗi?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/DanhMuc/Delete_DanhMucLoi?ID=' + ids.join(','),
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

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}
