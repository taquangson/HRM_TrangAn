$(".main_container").hide();
$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 160;
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
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách cấu hình";
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
                field: "TuSo",
                title: "Từ số",
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
                field: "DenSo",
                title: "Đến số",
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
                field: "ThuongCong",
                title: "Số công thưởng",
                width: "130px",
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
                field: "ThuongTien",
                title: "Số tiền thưởng",
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
                field: "NgayTao",
                title: "Ngày tạo",
                format:"{0:dd/MM/yyyy}",
                width: "130px",
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
            }
        ]

    });
    $("#window").kendoWindow({
        width: "40%",
        height: "350",
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
    })
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
        //console.log("openEditWindow: ",selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#TuSo").val(selectedItem.TuSo);
        $("#DenSo").val(selectedItem.DenSo);
        $("#ThuongCong").val(selectedItem.ThuongCong);
        $("#ThuongTien").val(selectedItem.ThuongTien);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}

function LoadGridData() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/NhanVien/GetAll_CauHinhThuongDanhGia',
        type: 'GET',
    }).done(function successCallback(response) {       
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: { type: 'date' }
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
    //if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    //} else {
        //$("#window").data("kendoWindow").center().maximize().open();
    //}
}

function ValidateForm(callback) {
    var validtuso = SetValidate("TuSo");
    var validdenso = SetValidate("DenSo");
    var validthuongcong = SetValidate("ThuongCong");
    var validthuongtien = SetValidate("ThuongTien");
    var valid = validtuso && validdenso && validthuongcong && validthuongtien;
    if (valid) {
        if (isNaN(parseInt($("#TuSo").val())) || isNaN(parseInt($("#DenSo").val()))
            || isNaN(parseInt($("#ThuongCong").val())) || isNaN(parseInt($("#ThuongTien").val()))) {
            valid = false;
            notification.show({ kValue: "Dữ liệu phải là dạng số" }, "error");
        }
        callback(valid);

    } else {
        callback(valid);
    }
}

function Luu() {   
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/NhanVien/InsertOrUpdate_CauHinhThuong',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TuSo: $("#TuSo").val(),
                    DenSo: $("#DenSo").val(),
                    ThuongCong: $("#ThuongCong").val(),
                    ThuongTien: $("#ThuongTien").val()
                }
            }).done(function successCallback(response) {

                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    LoadGridData();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
    });


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


function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn từng bản ghi để xóa");
    } else {
        if (bangDuLieu.select().length > 0) {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " tổ?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
        } else {
            openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
            //notification.show({ kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
        }
    }
}

function XoaDuLieu(bangDuLieu) {
    var id = 0;
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        id = dataItem.id;
    });
    $.ajax({
        url: '/NhanVien/Delete_CauHinhThuong?ID=' + id,
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




