$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    var images = {
        logo: "/Images/img.png"
    };
    loadBinary(images["logo"], function (data, contentType) {
        images["logo"] = { type: contentType, data: data };
    });


    $("#rootContainer").show();
    LoadCombo();

    $("#gridData").kendoGrid({
        data: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID_NhanVien",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        MaThuyen: { type: 'text', editable: false },
                        TenToNhom: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        TenNhanVien: { type: 'text', editable: false },
                        ChuyenDoHRM: { type: 'number', editable: false },
                        ChuyenDoThem: { type: 'number', editablle: true, validation: { min: 0 } },
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
            sheet.title = "Ticket";
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
                width: "32px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
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
                field: "TenToNhom",
                title: "Tổ nhóm",
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
                }
            },
            {
                field: "MaThuyen",
                title: "Mã số đò",
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
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "150px",
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
                field: "TenNhanVien",
                title: "Tên nhân viên",
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
            //{
            //    field: "SoLuotChamCong",
            //    title: "Lượt chấm công",
            //    width: "110px",
            //    filterable: {
            //        cell: {
            //            operator: "equals",
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
            //    }
            //},
            //{
            //    field: "ChuyenDoHRM",
            //    title: "Chuyến đò đã được tính",
            //    width: "110px",
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
            //    }
            //},
            {
                field: "ChuyenDoThem",
                title: "Chuyến đò đã thêm tay",
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
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        change: function (e) {
            var d = new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0);
            $("#DenNgay").data("kendoDatePicker").value(d);
        }
    })
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0)
    })
})

function loadBinary(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(xhr.response, xhr.getResponseHeader("Content-Type"));
    };
    xhr.onerror = function () {
        callback(null);
    };
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send();
}

function LoadCombo() {
    $.ajax({
        url: '/ToNhom/GetAllDanhMucToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [{
            TenToNhom: "Tất cả",
            ID: 0
        }]
        $.each(response, function (index, item) {
            data.push({
                TenToNhom: item.TenToNhom,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        $("#comboToNhom").kendoComboBox({
            dataTextField: 'TenToNhom',
            dataValueField: 'ID',
            dataSource: dataSource,
            filter: "contains"
        });
        $("#comboToNhom").data("kendoComboBox").value(0);
    });
}

function TimKiem() {
    kendo.ui.progress($("#gridData"), true);
    $.ajax({
        url: "/BaoCao/GetData_BaoCaoChuyenDoNhapTay"
            + "?from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=" + ($("#comboToNhom").data("kendoComboBox").value() ? $("#comboToNhom").data("kendoComboBox").value() : 0),
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID_NhanVien",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        MaThuyen: { type: 'text', editable: false },
                        TenToNhom: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        TenNhanVien: { type: 'text', editable: false },
                        ChuyenDoHRM: { type: 'number', editable: false },
                        ChuyenDoThem: { type: 'number', editablle: true, validation: { min: 0 } },
                    }
                }
            },
            pageSize: 30,
        });
        $("#gridData").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridData"), false);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "ChuyenDoThemTay.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}