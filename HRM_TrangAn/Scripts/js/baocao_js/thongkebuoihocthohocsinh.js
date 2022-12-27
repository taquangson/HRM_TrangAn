$(document).ready(function () {
    $("#rootContainer").show();
    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tất cả', value: 0 },
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 },
                { text: '6', value: 6 },
                { text: '7', value: 7 },
                { text: '8', value: 8 },
                { text: '9', value: 9 },
                { text: '10', value: 10 },
                { text: '11', value: 11 },
                { text: '12', value: 12 },
            ]
        }),
        change: function (e) {
            LoadComboLop(e.sender.value());
            $("#comboLop").data("kendoComboBox").value('');
        }
    });
    $("#comboKhoi").data("kendoComboBox").value(0);
    LoadComboLop(0);
    LoadComboHocSinh(0);

    $("#gridData").kendoGrid({
        height: function () {
            var height = $(window).height() - 270;
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
            sheet.title = "Thống kê số buổi học";
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
                    if (cellIndex == 2) {
                        try {
                            var value = row.cells[cellIndex].value;
                            var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
                            row.cells[cellIndex].value = kendo.toString(date, "dd/MM/yyyy");;
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
                title: "Tên lớp học",
                field: "TenLop",
                width: "150px",
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
                title: "Ngày",
                field: "ThoiGianVaoLop",
                width: "100px",
                template: function (e) {
                    var date = new Date(parseInt(e.ThoiGianVaoLop.replace("/Date(", "").replace(")/", ""), 10))
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
                 title: "Có mặt",
                 field: "CoMat",
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
                 template: function (e) {
                     if (e.CoPhep == 0) {
                         return "<i class='fa fa-check'></i>";
                     } else {
                         return "";
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
                title: "Vắng không phép",
                field: "VangKhongPhep",
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
                template: function (e) {
                    if (e.CoPhep == -1) {
                        return "<i class='fa fa-check'></i>";
                    } else {
                        return "";
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
                title: "Vắng có phép",
                field: "VangCoPhep",
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
                template: function (e) {
                    if (e.CoPhep == 1) {
                        return "<i class='fa fa-check'></i>";
                    } else {
                        return "";
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
                title: "Giáo viên điểm danh",
                field: "TenGiaoVien",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                width: "170px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
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

function CheckKhoi(khoi) {
    if (khoi.TenLop.indexOf(khoi) > 0) {
        return true;
    }
}

function LoadComboLop(khoi) {
    $.ajax({
        url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var ds = [];
        if (khoi > 0) {
            ds = response.filter(x => parseInt(x.TenLop.substring(0, 2)) == parseInt(khoi));
        } else {
            ds = response;
        }
        var dataSource = new kendo.data.DataSource({
            data: ds
        });
        if ($("#comboLop").data("kendoComboBox") == undefined) {
            $("#comboLop").kendoComboBox({
                dataTextField: 'TenLop',
                dataValueField: 'ID',
                dataSource: dataSource,
                filter: "startswith",
                change: function (e) {
                    LoadComboHocSinh(e.sender.value());
                }
            })
        } else {
            $("#comboLop").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function LoadComboHocSinh(lop) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + lop,
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [{
            TenHocSinh: "Tất cả",
            ID: 0
        }]
        $.each(response, function (index, item) {
            data.push({
                TenHocSinh: item.TenHocSinh,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        if ($("#comboHocSinh").data("kendoComboBox") == undefined) {
            $("#comboHocSinh").kendoComboBox({
                dataTextField: 'TenHocSinh',
                dataValueField: 'ID',
                filter: "contains",
                dataSource: dataSource
            })
        } else {
            $("#comboHocSinh").data("kendoComboBox").setDataSource(dataSource);
        }
        $("#comboHocSinh").data("kendoComboBox").value(0);
    });
}

function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetData_ThongKeBuoiHocTheoHocSinh?ID_Lop=' + $("#comboLop").data("kendoComboBox").value() + '&ID_HocSinh=' + $("#comboHocSinh").data("kendoComboBox").value()
        + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 50
        });

        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "Thong_Ke_Buoi_Hoc.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}