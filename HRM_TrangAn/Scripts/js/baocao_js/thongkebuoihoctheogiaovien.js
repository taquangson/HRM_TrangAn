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
            LoadComboLop();
            $("#comboLop").data("kendoComboBox").value('');
        }
    });
    $("#comboKhoi").data("kendoComboBox").value(0);
    $("#comboLop").kendoComboBox({
        dataTextField: 'TenLop',
        dataValueField: 'ID',
        filter: "startswith"
    })
    LoadComboGiaoVien();
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    $("#gridthongkebuoihoctheogiaovien").kendoGrid({
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
                title: "Tên lớp",
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
                title: "Tổng số buổi dạy",
                field: "TongSoBuoi",
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
            {
                title: "Tổng lượt học sinh",
                field: "TongSiSo",
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
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })

    $("#scheduler").kendoScheduler({
        date: new Date(),
        startDate: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        endDate: new Date(),
        height: function () {
            var heightGrid = $(document).height() - ($("#navbar").height() + $(".sitemap").height());
            return heightGrid;
        },
        footer: {
            command: false
        },
        toolbar: [
            "pdf",
        ],
        pdf: {
            fileName: "BangChamCong.pdf"
        },
        views: [
            { type: "month", selected: true }
        ],
        //timezone: "Etc/UTC",
        eventTemplate: $("#eventschedule_template").html(),
        dataSource: {
            batch: false,
            inPlaceSort: false,
            transport: {
                read: {
                    url: '/BaoCao/GetData_BaoCaoSoBuoiHocTheoGiaoVien?ID_Lop=' + ($("#comboLop").data("kendoComboBox").value() != 0 ? $("#comboLop").data("kendoComboBox").value() : 0)
                        + '&ID_GiaoVien=' + ($("#comboGiaoVien").data("kendoComboBox") != undefined ? $("#comboGiaoVien").data("kendoComboBox").value() : 0)
                        + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                        + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
                    type: 'POST',
                    contentType: "application/json"
                }
            },
            schema: {
                parse: function (response) {
                    var products = [];
                    for (var i = 0; i < response.length; i++) {
                        var product = {
                            title: response[i].TenLop,
                            TenCa: response[i].TenCa,
                            SiSo: response[i].SiSo,
                            start: new Date(parseInt(response[i].NgayHoc.replace("/Date(", "").replace(")/", ""), 10)),
                            end: new Date(parseInt(response[i].NgayHoc.replace("/Date(", "").replace(")/", ""), 10)),
                        };
                        products.push(product);
                    }
                    console.log($(".k-scheduler-table"));
                    $(".k-scheduler-table").first().html('<tbody><tr><th colspan="1" class="">Chủ nhật</th><th colspan="1" class="">Thứ 2</th><th colspan="1" class="">Thứ 3</th><th colspan="1" class="">Thứ 4</th><th colspan="1" class="">Thứ 5</th><th colspan="1" class="">Thứ 6</th><th colspan="1" class="">Thứ 7</th></tr></tbody>')
                    return products;
                }
            },
            parameterMap: function (options, operation) {
                if (operation == "read") {
                    return JSON.stringify({
                        ID_Lop: ($("#comboLop").data("kendoComboBox").value() != 0 ? $("#comboLop").data("kendoComboBox").value() : 0),
                        ID_GiaoVien: ($("#comboGiaoVien").data("kendoComboBox") != undefined ? $("#comboGiaoVien").data("kendoComboBox").value() : 0),
                        TuNgay: kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
                        DenNgay: kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
                    });
                }
            }
        },
        messages: {
            allDay: "Cả ngày",
            today: "Ngày hiện tại",
            next: "Trang sau",
            previous: "Trang trước",
            views: {
                week: "Tuần"
            }
        },
        selectable: true,
        editable: false
    });


})

function CheckKhoi(khoi) {
    if (khoi.TenLop.indexOf(khoi) > 0) {
        return true;
    }
}

function LoadComboLop() {
    $.ajax({
        url: '/Lop/GetAllLop_ByGiaoVien?ID_GiaoVien=' + $("#comboGiaoVien").data("kendoComboBox").value(),
        type: 'GET',
    }).done(function successCallback(response) {
        var ds = [];
        var khoi = $("#comboKhoi").data("kendoComboBox").value();
        if (khoi == null) {
            khoi = 0;
        }
        if (khoi > 0) {
            ds = response.filter(x => parseInt(x.TenLop.substring(0, 2)) == parseInt(khoi));
        } else {
            ds = response;
        }
        var data = [{
            ID: 0, TenLop: "Tất cả"
        }];
        $.each(ds, function (index, item) {
            data.push({
                TenLop: item.TenLop,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        $("#comboLop").data("kendoComboBox").setDataSource(dataSource);
    });
}

function LoadComboGiaoVien() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [];
        $.each(response, function (index, item) {
            data.push({
                TenDayDu: item.TenDayDu,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        if ($("#comboGiaoVien").data("kendoComboBox") == undefined) {
            $("#comboGiaoVien").kendoComboBox({
                dataTextField: 'TenDayDu',
                dataValueField: 'ID',
                filter: "contains",
                dataSource: dataSource,
                change: LoadComboLop
            })
        } else {
            $("#comboGiaoVien").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function TimKiem() {
    $("#scheduler").data("kendoScheduler").options.startTime = $("#TuNgay").data("kendoDatePicker").value();
    $("#scheduler").data("kendoScheduler").options.endTime = $("#DenNgay").data("kendoDatePicker").value();
    $("#scheduler").data("kendoScheduler").dataSource.options.transport.read.url = '/BaoCao/GetData_BaoCaoSoBuoiHocTheoGiaoVien?ID_Lop=' + ($("#comboLop").data("kendoComboBox").value() != 0 ? $("#comboLop").data("kendoComboBox").value() : 0)
        + '&ID_GiaoVien=' + ($("#comboGiaoVien").data("kendoComboBox") != undefined ? $("#comboGiaoVien").data("kendoComboBox").value() : 0)
        + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    $("#scheduler").data("kendoScheduler").dataSource.read();

    $.ajax({
        url: '/BaoCao/GetDataGrid_BaoCaoSoBuoiHocTheoGiaoVien?ID_Lop=' + ($("#comboLop").data("kendoComboBox").value() != 0 ? $("#comboLop").data("kendoComboBox").value() : 0)
            + '&ID_GiaoVien=' + ($("#comboGiaoVien").data("kendoComboBox") != undefined ? $("#comboGiaoVien").data("kendoComboBox").value() : 0)
            + "&TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'POST',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID_Lop"
                }
            },
            pageSize: 50
        });

        $("#gridthongkebuoihoctheogiaovien").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#gridthongkebuoihoctheogiaovien').data('kendoGrid');

    grid.options.excel = {
        fileName: "Thong_Ke_Buoi_Hoc.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}