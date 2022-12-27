$(document).ready(function () {
    $("#rootContainer").show();

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
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Báo cáo học sinh nợ phiếu";
                //+ "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
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
                    //if (cellIndex == 1 || cellIndex == 2) {
                    //    try {
                    //        var value = row.cells[cellIndex].value;
                    //        var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10))
                    //        row.cells[cellIndex].value = kendo.toString(date, "dd/MM/yyyy HH:mm");;
                    //    } catch (ex) {

                    //    }
                    //}
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
                width: "200px",
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
            },
            {
                title: "Số phiếu nợ",
                field: "SoPhieuNo",
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
                title: "Tên lớp còn nợ phiếu",
                field: "TenLop",
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
            },
            {
                title: "Tên lớp đã mua phiếu",
                field: "TenLopDaMua",
                width: "250px",
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
            }
        ]

    });
    $("#comboThang").kendoDatePicker({
        format: "MM/yyyy",
        start: "year",
        depth: "year",
    })
})

function TimKiem() {
    console.log($("#comboThang").data("kendoDatePicker").value());
    $.ajax({
        url: '/BaoCao/GetData_BaoCaoNoPhieu'
            + "?Thang=" + kendo.toString($("#comboThang").data("kendoDatePicker").value(), "MM")
            + "&Nam=" + kendo.toString($("#comboThang").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50
        });
        $("#gridData").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoNoPhieu.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function detailInit(e) {
    console.log(e.data);
    var detailRow = e.detailRow;
    var idhocsinh = e.data.ID_HocSinh;
    $.ajax({
        url: '/PhieuHoc/GetAllByHocSinh_Thang?ID_HocSinh=' + idhocsinh + "&Thang=" + kendo.toString($("#comboThang").data("kendoDatePicker").value(), "MM"),
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayTao: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });
        detailRow.find(".orders").kendoGrid({
            dataSource: dataSource,
            persistSelection: true,
            resizable: true,
            //pageable: pageableShort,
            sortable: false,
            filterable: false,
            scrollable: true,
            columns: [
                {
                    field: "TenLop",
                    title: "Môn học",
                    width: "150px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "SoBuoi",
                    title: "Số buổi",
                    width: "80px",
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "HocDuoi",
                    title: "Loại phiếu",
                    template: function (e) {
                        if (e.HocDuoi == 0) {
                            return "Học chính"
                        } else if (e.HocDuoi == 1) {
                            return "Học đuổi"
                        } else {
                            return "";
                        }
                    },
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "NgayTao",
                    title: "Ngày mua",
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    template: function (e) {
                        var dateString = e.NgayTao.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        if (currentTime.getFullYear() != 1) {
                            return kendo.toString(currentTime, "dd/MM/yyyy");
                        } else {
                            return "";
                        }
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TenNhanVien",
                    title: "Người bán",
                    attributes: {
                        class: "text-center"
                    },
                    width: "180px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "GhiChu",
                    title: "Ghi chú",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "ID",
                    title: "Trạng thái",
                    template: function (e) {
                        if (e.ID > 0) {
                            return "<b style='height:50px;width:100%;text-align:center;color:green'>Đã mua phiếu<b>";
                        } else {
                            return "<b style='height:50px;width:100%;text-align:center;color:red'>Chưa mua phiếu<b>";
                        }
                    },
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                }
            ]
        })
    })
}