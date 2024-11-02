
$(document).ready(function () {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    $("#Ngay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: date,
        dateInput: true,
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    })

    $("#grid").kendoGrid({
        data: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID_NhanVien",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        MaThuyen: { type: 'number', editable: false },
                        TenToNhom: { type: 'text', editable: false },
                        MaNhanVien: { type: 'number', editable: false },
                        TenNhanVien: { type: 'text', editable: false },
                        ChuyenDoHRM: { type: 'number', editable: false },
                        ChuyenDoThem: { type: 'number', editablle: true, validation: { min: 0 } },
                    }
                }
            },
            aggregate: [
                { field: "ChuyenDoHRM", aggregate: "sum" },
                { field: "ChuyenDoThem", aggregate: "sum" }                
            ],
            pageSize: 30,
        }),
        save: function (e) {
            console.log(e.values)
            if (e.values.ChuyenDoThem >= 0) {
                $.ajax({
                    url: '/ChuyenDo/Delete_ChuyenDoThemByNgay?Ngay=' + kendo.toString($("#Ngay").data("kendoDatePicker").value(), 'yyyy-MM-dd') + "&ID_NhanVien=" + e.model.ID_NhanVien,
                    type: 'POST',
                }).done(function successCallback(response) {
                    for (var i = 0; i < e.values.ChuyenDoThem; i++) {
                        $.ajax({
                            url: '/ChuyenDo/InsertOrUpdate_ChuyenDo',
                            type: 'POST',
                            data: {
                                ID_ChuyenDo: 0,
                                MaThuyen: e.model.MaThuyen,
                                ID_NhanVien: e.model.ID_NhanVien,
                                ID_TuyenDo: 3004,
                                GhiChu: "Chuyến đò tính thêm",
                                TrangThai: 1,
                                IsManager: 1,
                                NgayDi: kendo.toString($("#Ngay").data("kendoDatePicker").value(), 'yyyy-MM-dd 00:00:01'),
                                lstChamCong: []
                            }
                        }).done(function successCallback(response) {
                            //if (response.success) {
                            //    notification.show({ kValue: response.msg }, "success");
                            //} else {
                            //    notification.show({ kValue: response.msg }, "error");
                            //}
                        });
                    }
                });
            }
        },
        height: function () {
            var height = $(window).height() - 210;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: true,
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
            {
                field: "SoLuotChamCong",
                title: "Lượt chấm công",
                width: "110px",
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
                field: "ChuyenDoHRM",
                title: "Chuyến đò đã được tính",
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
                field: "ChuyenDoThem",
                title: "Chuyến đò đã thêm",
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

    //LoadGridData();
    //$.ajax({
    //    url: '/TuyenDo/GetAllTuyenDo',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    var datashow = []
    //    for (var i = 0; i < response.length; i++) {
    //        if (response[i].MaNhanVien !== null && response[i].MaNhanVien !== "") {
    //            datashow.push(response[i])
    //        }
    //    }
    //    var dataSource = new kendo.data.DataSource({
    //        data: datashow,
    //    });

    //    $("#ComboTuyenDo").kendoMultiColumnComboBox({
    //        dataTextField: "TenTuyen",
    //        dataValueField: "ID",
    //        columns: [
    //            {
    //                field: "TenTuyen",
    //                title: "Tên tuyến",
    //                width: "200px",
    //            },
    //            {
    //                field: "ThoiGianToiThieu",
    //                title: "Thời gian tối thiểu",
    //                width: "200px",
    //            },
    //            {
    //                field: "ThoiGianToiDa",
    //                title: "Thời gian tối đa",
    //                width: "200px",
    //            },
    //        ],
    //        footerTemplate: 'Tổng #: instance.dataSource.total() # thuyền',
    //        filter: "contains",
    //        filterFields: ["TenTuyen"],
    //        suggest: true,
    //        delay: 1000,
    //        dataSource: dataSource,
    //        select: function (e) {
    //            // Use the selected item or its text
    //        }
    //    })
    //});


})




function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/ChuyenDo/GetAllChuyenDoThieu"
            + "?From=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&To=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
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
                        MaThuyen: { type: 'number', editable: false },
                        TenToNhom: { type: 'text', editable: false },
                        MaNhanVien: { type: 'number', editable: false },
                        TenNhanVien: { type: 'text', editable: false },
                        ChuyenDoHRM: { type: 'number', editable: false },
                        ChuyenDoThem: { type: 'number', editablle: true, validation: { min: 0 } },
                    }
                }
            },
            aggregate: [
                { field: "ChuyenDoHRM", aggregate: "sum" },
                { field: "ChuyenDoThem", aggregate: "sum" }
            ],
            pageSize: 30,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
        dataSource.fetch(function () {
            var auto = dataSource.aggregates().ChuyenDoHRM;
            var manual = dataSource.aggregates().ChuyenDoThem;
            var total = auto.sum + manual.sum;
            var tyle = auto.sum / total * 100;
            $("#tyle").text("Tỷ lệ tự động tính chuyến: " + kendo.toString(tyle, "N2") + "%");
            if (tyle >= 95) {
                $("#tyle").css("color", "#0b7018");
            } else {
                $("#tyle").css("color", "red");
            }

        });
    });
}


function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "QuanLyTicket.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function detailInit(e) {
    var detailRow = e.detailRow;
    $.ajax({
        url: "/ChuyenDo/GetChamCongByNgay_NhanVien?ID_NhanVien=" + e.data.ID_NhanVien
            + "&from=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: {
                        WorkDate: {
                            type: 'date'
                        },
                    }
                }
            },
            pageSize: 100
        });
        detailRow.find(".orders").kendoGrid({
            dataSource: dataSource,
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
                    width: "35px",
                    selectable: true,
                    headerAttributes: {
                        style: "text-align:left",
                        class: "table-header-cell "
                    },
                },
                {
                    title: "STT",
                    template: "#= ++record #",
                    filterable: false,
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
                    field: "WorkDate",
                    format: "{0:HH:mm:ss}",
                    title: "Thời gian chấm công",
                    width: "130px",
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
                    field: "TenDiem",
                    title: "Tên điểm",
                    width: "130px",
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
                    //attributes: { style: "color: green;" },
                    template: function (e) {
                        if (e.ID_ChuyenDo > 0) {
                            return "<span style='color:green'>" + e.TenDiem + "</span>";
                        } else {
                            return e.TenDiem;
                        }
                    }
                },
                {
                    field: "DiaDiem",
                    title: "Vị trí",
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
                    title: "IP",
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
                }

            ]

        });
    });



}