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
            e.workbook.images = images;            
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            //sheet.title = "Báo chốt công"
            //    + "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            sheet.rows.unshift({ cells: [{ value: "", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "Từ ngày " + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến ngày " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy"), italic: true, textAlign: "center", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "Tổ:" + $("#comboToNhom").data("kendoComboBox").text(), bold: true, fontSize: 20, fontName: "Times New Roman", textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 30 });
            sheet.rows.unshift({ cells: [{ value: "BẢNG CHỐT CÔNG LAO ĐỘNG THEO THÁNG", bold: true, fontSize: 25, textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 60 });
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
                    row.cells[cellIndex].format = "#,##0";
                    row.cells[cellIndex].borderBottom = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderTop = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderRight = { color: "#000", size: 1 };
                    row.cells[cellIndex].borderleft = { color: "#000", size: 1 };

                }
            }
            sheet.rows.push({ cells: [{ value: "", textAlign: "right", verticalAlign: "center" }] });
            sheet.rows.push({ cells: [{ value: "Ngày.....Tháng.....Năm.....", italic: true, textAlign: "right", colSpan: 9, verticalAlign: "center" }] });
            sheet.rows.push({
                cells: [
                    { value: "Ban Quản Lý", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" },
                    { value: "Tổ trưởng", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" },
                    { value: "Người lập", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" }
                ]
            });
            sheet.drawings = [{
                topLeftCell: "A1",
                offsetX: 0,
                offsetY: 0,
                width: 60,
                height: 60,
                image: "logo"
            }]
            sheet.filter = null;
        },
        editable: false,
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
        save: function (e) {
            if (e.values.ChuyenTo) {
                try {
                    $.ajax({
                        url: '/ChuyenTo/InsertOrUpdate_ChuyenToLaoDong',
                        data: {
                            ID_LaoDong: e.model.ID,
                            Ngay: "01/" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "MM/yyyy"),
                            SoCong: e.values.ChuyenTo
                        },
                        type: 'POST'
                    }).done(function (response) {
                        if (response.success) {
                            notification.show({ kValue: response.msg }, "success");
                            Huy();
                            LoadGridData();
                        } else {
                            notification.show({ kValue: response.msg }, "error");
                        }
                    })
                } catch (ex) {
                    e.sender.refresh();
                }
            }

        },
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
        url: "/BaoCao/GetData_BaoCaoChotCong"
            + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=" + ($("#comboToNhom").data("kendoComboBox").value() ? $("#comboToNhom").data("kendoComboBox").value() : 0),
        type: 'POST',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: 'number', editable: false },
                        MaThuyen: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        NoCongTonDau: { type: 'number', editable: false },
                        TenDayDu: { type: 'text', editable: false },
                        Ticket: { type: 'number', editable: false },
                        TongCongLDTrongThang: { type: 'number', editable: false },
                        CongTrachNhiem: { type: 'number', editable: false },
                        ChuyenTo: { type: 'number', editable: true }
                    }
                }
            },
            aggregate: [
                { field: 'NoCongTonDau', aggregate: "sum" },
                { field: 'Ticket', aggregate: "sum" },
                { field: 'TongCongLDTrongThang', aggregate: "sum" },
                { field: 'CongTrachNhiem', aggregate: "sum" },
                { field: 'ChuyenTo', aggregate: "sum" }
            ],
            pageSize: 50
        });

        var columns = [];
        columns.push(
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/ Mã Số Ticket",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;white-space: normal;",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenDayDu",
                title: "Họ và tên",
                width: "170px",
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
                field: "NoCongTonDau",
                title: "Tồn đầu",
                footerTemplate: function (e) {
                    return e.NoCongTonDau ? kendo.toString(e.NoCongTonDau.sum, 'n0') : 0
                },
                aggregates: ["sum"],
                width: "70px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "CongPhatSinh",
                title: "Công trách nhiệm",
                footerTemplate: function (e) {
                    return e.CongPhatSinh ? kendo.toString(e.CongPhatSinh.sum, 'n0') : 0
                },
                aggregates: ["sum"],
                width: "70px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "TongCongLDTrongThang",
                title: "Tổng công LĐ trong tháng",
                footerTemplate: function (e) {
                    return e.TongCongLDTrongThang ? kendo.toString(e.TongCongLDTrongThang.sum, 'n0') : 0
                },
                aggregates: ["sum"],
                width: "170px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "Ticket",
                title: "Tổng tích kê",
                footerTemplate: function (e) {
                    return e.Ticket ? kendo.toString(e.Ticket.sum, 'n0') : 0
                },
                aggregates: ["sum"],
                width: "170px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "ChuyenTo",
                title: "Chuyến tổ",
                aggregates: ["sum"],
                footerTemplate: function (e) {
                    return e.ChuyenTo ? kendo.toString(e.ChuyenTo.sum, 'n0') : 0
                },
                width: "170px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "NoCong",
                format: "{0:n2}",
                aggregates: ["sum"],
                footerTemplate: function (e) {
                    return e.NoCong ? kendo.toString(e.NoCong.sum, 'n0') : 0
                },
                title: "Nợ công",
                width: "170px",
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
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                title: "Ký tên",
                width: "170px",
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
                title: "Ghi chú",
                width: "170px",
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
        $("#gridData").data("kendoGrid").setOptions({
            columns: columns
        });
        $("#gridData").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridData"), false);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BangChotCong.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}