$(document).ready(function () {
    $("#rootContainer").show();
    LoadCombo();

    $("#gridData").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        TongThu: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "TongThu", aggregate: "sum" }
            ]
        }),
        height: function () {
            var height = $(window).height() - 230;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Báo cáo doanh thu"
                + "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
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
                    if (cellIndex == 1 || cellIndex == 2) {
                        try {
                            var value = row.cells[cellIndex].value;
                            var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
                            row.cells[cellIndex].value = kendo.toString(date, "dd/MM/yyyy HH:mm");;
                        } catch (ex) {

                        }
                    }

                }
            }
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
        columns: [
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
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
            },
            {
                title: "Mã phiếu",
                field: "MaPhieu",
                width: "180px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Ngày bán phiếu",
                field: "NgayTao",
                width: "100px",
                template: function (e) {
                    var date = new Date(parseInt(e.NgayTao.replace("/Date(", "").replace(")/", ""), 10))
                    return kendo.toString(date, "dd/MM/yyyy HH:mm");
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "In lần cuối",
                field: "ThoiGianIn",
                width: "100px",
                template: function (e) {
                    var date = new Date(parseInt(e.ThoiGianIn.replace("/Date(", "").replace(")/", ""), 10))
                    return kendo.toString(date, "dd/MM/yyyy HH:mm");
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Tên người bán",
                field: "TenNhanVien",
                width: "120px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Hình thức thanh toán",
                field: "HinhThucThanhToan",
                width: "120px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Tên học sinh",
                field: "TenHocSinh",
                width: "180px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Tổng tiền",
                field: "TongThu",
                format: "{0:n1}",
                width: "180px",
                aggregates: ["sum"],
                footerTemplate: "Tổng: #=kendo.toString(sum,'n1')#",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
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
                attributes: {
                    style: "text-align: center;",
                }
            },
        ]

    });
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })
})

function LoadCombo() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [{
            TenDayDu: "Tất cả",
            ID: 0
        }]
        $.each(response, function (index, item) {
            data.push({
                TenDayDu: item.TenDayDu,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        $("#comboNhanVien").kendoComboBox({
            dataTextField: 'TenDayDu',
            dataValueField: 'ID',
            dataSource: dataSource,
            filter: "contains"
        });
        $("#comboNhanVien").data("kendoComboBox").value(0);
    });
}

function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetData_BaoCaoDoanhThu?ID_NhanVien=' + $("#comboNhanVien").data("kendoComboBox").value()
            + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        TongThu: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "TongThu", aggregate: "sum" }
            ]
        });

        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoDoanhThu.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}