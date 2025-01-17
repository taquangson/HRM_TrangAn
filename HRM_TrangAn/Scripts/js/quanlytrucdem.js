$(document).ready(function () {
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

    $("#Ngay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })

    $.ajax({
        url: '/PhongBan/GetTreePhongBan',
        type: 'GET'
    }).done(function (response) {

        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })
        var dataSourceNhanVien = new kendo.data.DataSource({
            data: [],
        });
        $("#treePhongBan").kendoDropDownTree({
            dataSource: dataSourceCombo,
            placeholder: "Chọn phòng ban...",
            dataTextField: "TenPhongBan",
            dataValueField: "ID",
            valuePrimitive: true,
            autoBind: false
        });

        // Khởi tạo MultiSelect cho nhân viên
        $("#comboNhanVien").kendoMultiSelect({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            dataSource: dataSourceNhanVien,
            filter: "contains",
            placeholder: "Chọn nhân viên",
            downArrow: true,
            noDataTemplate: "nodata",
        });

        $("#treePhongBan").data("kendoDropDownTree").bind("change", function (e) {
            var dropDownTree = $("#treePhongBan").data("kendoDropDownTree");
            var selectedValue = dropDownTree.value(); // Lấy giá trị phòng ban đã chọn
            console.log("Phòng ban đã chọn ID: " + selectedValue);

            // Dọn dữ liệu MultiSelect khi chọn phòng ban mới
            var multiSelect = $("#comboNhanVien").data("kendoMultiSelect");
            multiSelect.value([]); // Xóa các mục đã chọn trước đó

            $.ajax({
                url: '/HoSoNhanSu/GetByIDPhongBan?ID_PhongBan=' + selectedValue,
                type: 'GET',
                success: function (data) {
                    console.log("Dữ liệu nhân viên trả về từ server:", data);

                    // Kiểm tra xem dữ liệu trả về có phải là mảng hay không
                    if (Array.isArray(data)) {
                        // Cập nhật MultiSelect với dữ liệu nhân viên
                        multiSelect.setDataSource(new kendo.data.DataSource({
                            data: data
                        }));

                        // Cập nhật lại placeholder cho MultiSelect
                        multiSelect.setOptions({
                            placeholder: "Chọn nhân viên..."
                        });
                    } else {
                        console.error("Dữ liệu trả về không hợp lệ, không phải mảng!");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi gửi yêu cầu AJAX: " + error);
                }
            });
        });

        $("#scheduler").kendoScheduler({
            date: new Date(),
            startDate: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
            endDate: new Date(),
            height: 700,
            footer: {
                command: false
            },
            toolbar: [
                "pdf",
            ],
            pdf: {
                fileName: "LichTrucDem.pdf"
            },
            views: [
                { type: "month", selected: true }
            ],
            //timezone: "Etc/UTC",
            eventTemplate: $("#eventschedule_template").html(),
            dataSource: {
                batch: true,
                inPlaceSort: false,
                transport: {
                    read: {
                        url: "/TrucDem/CountAllByDate",
                        type: 'POST',
                    },
                    parameterMap: function (options, operation) {
                        if (operation == "read") {
                            let data = {
                                ID_PhongBan: ($("#treePhongBan").data("kendoDropDownTree").value() != '' ? $("#treePhongBan").data("kendoDropDownTree").value() : 0),
                                ListID_HSNS: $("#comboNhanVien").data("kendoMultiSelect").value().join(","),
                                from: kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
                                to: kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
                            }
                            return data;
                        }
                    }
                },
                schema: {
                    parse: function (response) {
                        console.log(response);
                        var products = [];
                        //for (var i = 0; i < response.length; i++) {
                        //    var product = {
                        //        title: response[i].TenDayDu,
                        //        TenDayDu: response[i].TenDayDu,
                        //        MaNhanVien: response[i].MaNhanVien,
                        //        PhuCap: response[i].PhuCap,
                        //        start: new Date(parseInt(response[i].Ngay.replace("/Date(", "").replace(")/", ""), 10)),
                        //        end: new Date(parseInt(response[i].Ngay.replace("/Date(", "").replace(")/", ""), 10)),
                        //    };
                        //    products.push(product);
                        //}
                        //console.log(products);
                        for (var i = 0; i < response.length; i++) {
                            var product = {
                                title: "Ph/công: " + response[i].SoNhanVien_PhanCong + " người.",
                                start: new Date(parseInt(response[i].Ngay.replace("/Date(", "").replace(")/", ""), 10)),
                                end: new Date(parseInt(response[i].Ngay.replace("/Date(", "").replace(")/", ""), 10)),
                            };
                            products.push(product);
                        }
                        console.log(products);

                        $(".k-scheduler-table").first().html('<tbody><tr><th colspan="1" class="">Chủ nhật</th><th colspan="1" class="">Thứ 2</th><th colspan="1" class="">Thứ 3</th><th colspan="1" class="">Thứ 4</th><th colspan="1" class="">Thứ 5</th><th colspan="1" class="">Thứ 6</th><th colspan="1" class="">Thứ 7</th></tr></tbody>')
                        return products;
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

        $("#scheduler").on("dblclick", "td[role='gridcell']", function () {
            $("#windowAddTrucDem").data("kendoWindow").center().open();
            $("#Ngay").data("kendoDatePicker").value($("#scheduler").data('kendoScheduler').view()._selectedSlots[0].start);
            $.ajax({
                url: "/TrucDem/GetNhanVienByDate"
                    + "?ID_PhongBan=" + ($("#treePhongBan").data("kendoDropDownTree").value() != '' ? $("#treePhongBan").data("kendoDropDownTree").value() : 0)
                    + "&ListID_HSNS=" + $("#comboNhanVien").data("kendoMultiSelect").value().join(",")
                    + "&Ngay=" + kendo.toString($("#scheduler").data('kendoScheduler').view()._selectedSlots[0].start, "yyyy/MM/dd") + " 00:00:00",
                type: 'GET',
            }).done(function successCallback(response) {
                var dataSource = new kendo.data.DataSource({
                    data: response,
                    schema: {
                        model: {
                            id: "ID",
                            fields: {
                                PhuCap: {
                                    type: 'number', editable: true
                                },
                                ID: {
                                    editable: false
                                },
                                MaNhanVien: {
                                    editable: false
                                },
                                TenDayDu: {
                                    editable: false
                                }
                            }
                        }
                    },
                    pageSize: 50
                });

                $("#gridAddTrucDem").data("kendoGrid").setDataSource(dataSource);
            });
        });



        $("#dialogRoot").kendoDialog().data("kendoDialog").close();
        $(".main_container").show();
    });

    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    $("#grid").kendoGrid({
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
        detailInit: detailInit,
        detailTemplate: kendo.template($("#template").html()),
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
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
                field: "Ngay",
                title: "Ngày",
                format: "{0:dd/MM/yyyy}",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "90px",
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
                    style: "text-align: left;",
                }
            }, {
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "140px",
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
                    style: "text-align: left;",
                }
            },

            {
                field: "PhuCap",
                title: "Phụ cấp",
                format: "{0:N0}",
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
                },
                attributes: {
                    style: "text-align: center;",
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            }
        ]

    });

    $("#gridAddTrucDem").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        PhuCap: {
                            type: 'number', editable: true
                        },
                        ID: {
                            editable: false
                        },
                        MaNhanVien: {
                            editable: false
                        },
                        TenDayDu: {
                            editable: false
                        }
                    }
                }
            },
            pageSize: 50
        }),
        height: function () {
            var height = 500;
            return height;
        },
        scrollable: true,
        selectable: "multiple, row",
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: true,
        save: function (e) {
            //if (e.model.ID > 0)
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xác nhận trực đêm và phụ cấp?</b>", function () { XacNhanTrucDem(e.model.ID, e.model.ID_TaiKhoan, e.model.Ngay, e.values.PhuCap); }, function () { });
            //else
            //    openDialog(dialogRoot, "<b style='line-height:40px;'>Vui lòng</b>")
        },
        excel: {
            filterable: true
        },
        filterable: {
            mode: "row",
        },
        detailInit: detailInit,
        detailTemplate: kendo.template($("#template").html()),
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                title: "Thao tác",
                field: 'ID',
                template: function (e) {
                    if (e.id == 0) {
                        return "<i onclick='PhanCong(this,\"" + e.ID_TaiKhoan + "\")' style='color:green' class='k-button fa fa-plus'> Phân công</i>";
                    } else {
                        return "<i onclick='XoaPhanCong(this,\"" + e.ID + "\")' style='color:red' class='k-button fa fa-trash'> Huỷ </i>";
                    }
                },
                width: 50,
                filterable: false,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
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
                },
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "90px",
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
                    style: "text-align: left;",
                }
            }, {
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "140px",
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
                    style: "text-align: left;",
                }
            },
            //{
            //    field: "TenPhongBan",
            //    title: "Phòng ban",
            //    width: "90px",
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
            //        style: "text-align: left;",
            //    }
            //},

            {
                field: "PhuCap",
                title: "Phụ cấp",
                format: "{0:N0}",
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
                },
                attributes: {
                    style: "text-align: center;",
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            }
        ]
    });

    $("#windowAddTrucDem").kendoWindow({
        width: "70%",
        height: "700",
        title: "Danh sách nhân sự trực đêm",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


})

function XacNhanTrucDem(id, idtaikhoan, ngay, phucap) {
    $.ajax({
        url: '/TrucDem/InsertOrUpdate',
        data: {
            ID: id,
            ID_TaiKhoan: idtaikhoan,
            TrangThai: 1,
            Ngay: kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
            PhuCap: phucap,
        },
        type: 'POST',
    }).done(function successCallback(response) {
    });
}

function PhanCong(tag, id) {
    $.ajax({
        url: '/TrucDem/InsertOrUpdate',
        data: {
            ID_TaiKhoan: id,
            Ngay: kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
        },
        type: 'POST',
    }).done(function successCallback(response) {
        $(tag).hide();
    });
}

function XoaPhanCong(tag, id) {
    $.ajax({
        url: '/TrucDem/Delete?ID=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        $(tag).hide();
    });
}

function TimKiem() {
    $("#scheduler").data("kendoScheduler").options.startTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    $("#scheduler").data("kendoScheduler").options.endTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    $("#scheduler").data("kendoScheduler").dataSource.options.transport.read.url = "/TrucDem/CountAllByDate"
        + "?ID_PhongBan=" + ($("#treePhongBan").data("kendoDropDownTree").value() != '' ? $("#treePhongBan").data("kendoDropDownTree").value() : 0)
        + "&ListID_HSNS=" + $("#comboNhanVien").data("kendoMultiSelect").value().join(",")
        + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    $("#scheduler").data("kendoScheduler").dataSource.read();

    $.ajax({
        url: "/TrucDem/GetAllByDate"
            + "?ID_PhongBan=" + ($("#treePhongBan").data("kendoDropDownTree").value() != '' ? $("#treePhongBan").data("kendoDropDownTree").value() : 0)
            + "&ListID_HSNS=" + $("#comboNhanVien").data("kendoMultiSelect").value().join(",")
            + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'POST',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        Ngay: { type: 'date' }
                    }
                }
            },
            pageSize: 50
        });

        $("#grid").data("kendoGrid").setDataSource(dataSource);
    });
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "LichTrucDem.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function detailInit(e) {
    var detailRow = e.detailRow;
    console.log(e.data.lstChamCong);
    var dataSource = new kendo.data.DataSource({
        data: e.data.lstChamCong,
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
            }

        ]

    });


}