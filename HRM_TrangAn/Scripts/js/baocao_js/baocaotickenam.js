$(document).ready(function () {
    $("#rootContainer").show();
    var images = {
        logo: "/Images/img.png"
    };
    loadBinary(images["logo"], function (data, contentType) {
        images["logo"] = { type: contentType, data: data };
    });
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
            //sheet.title = "Báo cáo tích kê năm " + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy");
            sheet.rows.unshift({ cells: [{ value: "", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "Năm " + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"), fontName: "Times New Roman", italic: true, textAlign: "center", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "BẢNG BÁO CÁO TỔNG HỢP TÍCH KÊ THEO NĂM", bold: true, fontName: "Times New Roman", fontSize: 25, textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 60 });
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

                }
            }
            sheet.rows.push({ cells: [{ value: "", textAlign: "right", verticalAlign: "center" }] });
            sheet.rows.push({ cells: [{ value: "Ngày.....Tháng.....Năm.....", fontName: "Times New Roman", italic: true, textAlign: "right", colSpan: 13, verticalAlign: "center" }] });
            sheet.rows.push({
                cells: [
                    { value: "", bold: true, textAlign: "center", verticalAlign: "center" },
                    { value: "Người phê duyệt", fontName: "Times New Roman", bold: true, textAlign: "center", colSpan: 3, verticalAlign: "center" },
                    { value: "", bold: true, textAlign: "center", colSpan: 6, verticalAlign: "center" },
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
    $("#Nam").kendoDatePicker({
        depth: "decade",
        start: "decade",
        format: "yyyy",
        value: new Date()
    })
})
function TimKiem() {
    $.ajax({
        url: "/BaoCao/GetData_BaoCaoTickeCuaCacToTrongNam"
            + "?Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'POST',
    }).done(function successCallback(response) {
        console.log(response);
        $.each(response, function (index, item) {
            if (!isNaN(item.MaToNhom))
                item.MaToNhom = parseInt(item.MaToNhom);
            else
                item.MaToNhom = 1000;
        })
        var columns = [];
        var aggregates = [];
        var f = [];
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
                field: "MaToNhom",
                template: function (e) {
                    return e.TenToNhom;
                },
                title: "Tổ",
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
            }
        )
        var dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        $.each(dates, function (index, item) {
            columns.push({
                title: item,
                field: 'data' + item,
                format: "{0:n1}",
                width: "100px",
                footerTemplate: "#=kendo.toString(sum,'n0')#",
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
                attributes: {
                    style: "text-align: center; font-size: 12px;padding:0;"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            });
            f['data' + item] = { type: 'number' };
            aggregates.push({ field: 'data' + item, aggregate: "sum" });
        });

        f['TongCong'] = { type: 'number' };
        f['MaToNhom'] = { type: 'number' };

        aggregates.push({ field: 'TongCong', aggregate: "sum" });


        columns.push({
            field: "TongCong",
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
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: f
                    //TongCongLDTrongThang: { type: 'number' }
                }
            },
            aggregate: aggregates,
            //aggregate: [
            //    { field: "TongCongLDTrongThang", aggregate: "sum" }
            //],
            pageSize: 50
        });
        //$("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoTichKeNam.xlsx",
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