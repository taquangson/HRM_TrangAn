var aggregates = [];
var f = [];
var columns = [];
$(document).ready(function () {
    var dscongviec = null;
    
   
    var images = {
        logo: "/Images/img.png"
    };
    loadBinary(images["logo"], function (data, contentType) {
        images["logo"] = { type: contentType, data: data };
    });
    $("#rootContainer").show();
    LoadCombo();
    $.ajax({
        url: '/DanhMucCongViec/GetAllDanhMucCongViec',
        type: 'GET',
    }).done(function successCallback(response) {
        dscongviec = response
        
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
                locked: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaThuyen",
                title: "Số đò",
                width: "100px",
                locked: true,
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
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "120px",
                locked: true,
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
        $.each(dscongviec, function (index, item) {
            columns.push({
                title: item.TenCongViec,
                field: 'data' + item.ID,
                format: "{0:n1}",
                footerTemplate: "#=sum#",
                aggregates: ["sum"],
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                width: "150px",
                attributes: {
                    style: "text-align: center; font-size: 12px;padding:0;"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            });
            f['data' + item.ID] = { type: 'number' };
            aggregates.push({ field: 'data' + item.ID, aggregate: "sum" });
        });

        f['TongCongLDTrongThang'] = { type: 'number' };

        aggregates.push({ field: 'TongCongLDTrongThang', aggregate: "sum" });

        columns.push({
            field: "TongCongLDTrongThang",
            title: "Tổng",
            width: "100px",
            format: "{0:n1}",
            filterable: {
                cell: {
                    operator: "contains",
                    showOperators: false,
                    template: function (e) {
                        e.element.addClass("k-textbox").css("width", "100%")
                    }
                }
            },
            aggregates: ["sum"],
            footerTemplate: "#=sum#",
            attributes: {
                style: "text-align: center; font-size: 12px;padding:0;"
            },
            headerAttributes: {
                style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                class: "table-header-cell"
            }
        })

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
                //sheet.title = "Báo chi tích kê của tổ "
                //    + "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
                sheet.rows.unshift({ cells: [{ value: "", colSpan: columns.length }] });
                sheet.rows.unshift({ cells: [{ value: "Từ ngày " + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến ngày " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy"), fontName: "Times New Roman", italic: true, textAlign: "center", colSpan: columns.length }] });
                sheet.rows.unshift({ cells: [{ value: "Tổ:" + $("#comboToNhom").data("kendoComboBox").text(), bold: true, fontSize: 20, fontName: "Times New Roman", textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 30 });
                sheet.rows.unshift({ cells: [{ value: "BẢNG BÁO CÁO CÔNG THEO DANH MỤC CÔNG VIỆC", bold: true, fontName: "Times New Roman", fontSize: 25, textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 60 });
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
                sheet.rows.push({
                    cells: [{ value: "", textAlign: "right", colSpan: 27, verticalAlign: "center" },
                    { value: "Ngày.....Tháng.....Năm.....", fontName: "Times New Roman", italic: true, textAlign: "right", colSpan: 3, verticalAlign: "center" }]
                });
                sheet.rows.push({
                    cells: [
                        { value: "", bold: true, textAlign: "center", colSpan: 2, verticalAlign: "center" },
                        { value: "Ban Quản Lý", fontName: "Times New Roman", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" },
                        { value: "", bold: true, textAlign: "center", colSpan: 10, verticalAlign: "center" },
                        { value: "Tổ trưởng", fontName: "Times New Roman", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" },
                        { value: "", bold: true, textAlign: "center", colSpan: 12, verticalAlign: "center" },
                        { value: "Người lập", fontName: "Times New Roman", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" }
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
            }
        });

    })
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
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
    $.ajax({
        url: "/BaoCao/GetData_BaoCaoCongTheoDanhMucCongViec"
            + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=" + ($("#comboToNhom").data("kendoComboBox").value() ? $("#comboToNhom").data("kendoComboBox").value() : 0),
        type: 'POST',
    }).done(function successCallback(r) {
        //console.log(response);
        response = JSON.parse(r);
        $("#gridData").data("kendoGrid").setOptions({
            dataSource: new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        fields: f
                    }
                },
                aggregate: aggregates,
                pageSize: 50
            }),
            columns: columns
        });
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoTichKeToTrongThang.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
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

