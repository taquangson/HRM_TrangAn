$(".main_container").hide();
var anhnhanvien = [];
var SERVERIMAGE = "http://localhost:56812/"

$(document).ready(function () {

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 250;
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
            sheet.title = "Danh sách in thẻ lao động";
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
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                field: "MaThuyen",
                title: "Mã số đò",
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
                field: "TenDayDu",
                title: "Họ tên",
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
                field: "MaToNhom",
                title: "Mã tổ",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                field: "AnhDaiDien.FileType",
                title: "Ảnh đại diện",
                template: function (e) {
                    if (e.AnhDaiDien.FileType == 1) {
                        return "<img class='avatar' src='" + e.AnhDaiDien.FilePath + "'/>"
                    } else {
                        return "Chưa có ảnh";
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
            //{
            //    field: "SoLanInThe",
            //    title: "Số lần in thẻ",
            //    width: "100px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //        class: "table-header-cell"
            //    }
            //}
        ]

    });

   
    $.ajax({
        url: '/ToNhom/GetAllDanhMucToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#comboToNhom").kendoComboBox({
            dataTextField: "TenToNhom",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource           
        })
    });
   
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

function InTheA5() {
    var ids = "";
    $("#grid").data("kendoGrid").select().each(function () {
        var dataItem = $("#grid").data("kendoGrid").dataItem(this);
        var id = dataItem.ID;
        ids += ',' + id;
    });
    window.open('/HoTro/InTheA5?ID_ToNhom=' + $("#comboToNhom").data("kendoComboBox").value() + '&IDs=' + ids.substr(1), '_blank');
}

function InTheA4() {
    var ids = "";
    $("#grid").data("kendoGrid").select().each(function () {
        var dataItem = $("#grid").data("kendoGrid").dataItem(this);
        var id = dataItem.ID;
        ids += ',' + id;
    });
    window.open('/HoTro/InTheA4?ID_ToNhom=' + $("#comboToNhom").data("kendoComboBox").value() + '&IDs=' + ids.substr(1), '_blank');
}
function InTheA3() {
    var ids = "";
    $("#grid").data("kendoGrid").select().each(function () {
        var dataItem = $("#grid").data("kendoGrid").dataItem(this);
        var id = dataItem.ID;
        ids += ',' + id;
    });
    window.open('/HoTro/InTheA3?ID_ToNhom=' + $("#comboToNhom").data("kendoComboBox").value() + '&IDs=' + ids.substr(1), '_blank');
}

function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/NhanVien/GetAllNhanVienTrongToNhom?ID_ToNhom=' + $("#comboToNhom").data("kendoComboBox").value(),
        type: 'GET',
    }).done(function successCallback(response) {

        kendo.ui.progress($("#grid"), false);
        var dataSource = new kendo.data.DataSource({

            data: response,
            schema: {
                model: {
                    ID: "ID",
                    fields: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 1000
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);

    })
}
