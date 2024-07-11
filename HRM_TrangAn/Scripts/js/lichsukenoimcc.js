$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    $("#rootContainer").show();

    $("#grid").kendoGrid({
        data: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    fields: {
                        ThoiGianKetNoi: { type: 'date' }
                    }
                }
            },
            pageSize: 30,
        }),
        height: function () {
            var height = $(window).height() - 210;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: false,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "CheckPoint Connect Log";
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
            //{
            //    width: "32px",
            //    selectable: true,
            //    headerAttributes: {
            //        style: "text-align:left",
            //        class: "table-header-cell "
            //    },
            //},
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
                field: "TenThietBi",
                title: "Tên thiết bị",
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
                field: "DiaChiIP",
                title: "Địa chỉ IP",
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
                field: "TrangThaiKetNoi",
                title: "Trạng thái",
                width: "150px",
                template: function (e) {
                    if (e.TrangThaiKetNoi == 1) {
                        return "<b style='color:green'>Connect</b>";
                    } else {
                        return "<b style='color:red'>Disconnect</b>";
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "ThoiGianKetNoi",
                title: "Thời gian",
                format:"{0:dd/MM/yyyy HH:mm}",
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
                }
            },            
            {
                field: "GhiChu",
                title: "Ghi chú",
                width: "110px",
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
    $("#TuNgay").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        change: function (e) {
            $("#DenNgay").data("kendoDateTimePicker").value($("#TuNgay").data("kendoDateTimePicker").value());
        }
    })
    $("#DenNgay").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        value: $("#TuNgay").data("kendoDateTimePicker").value()
    })
})


function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/MayChamCong/GetLichSuMayChamCong"
            + "?from=" + kendo.toString($("#TuNgay").data("kendoDateTimePicker").value(), "yyyy/MM/ddTHH:mm:ss")
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDateTimePicker").value(), "yyyy/MM/ddTHH:mm:ss"),
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {

        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    fields: {
                        ThoiGianKetNoi: { type: 'date'}
                    }
                }
            },
            pageSize: 30,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "LichSuKetNoiMayChamCong.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}