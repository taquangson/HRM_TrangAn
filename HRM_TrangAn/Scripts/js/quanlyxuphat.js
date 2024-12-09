$(".main_container").hide();
$(document).ready(function () {
    $("#grid").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        MaThuyen: { type: 'string', editable: false },
                        TenToNhom: { type: 'string', editable: false },
                        MaNhanVien: { type: 'string', editable: false },
                        TenDayDu: { type: 'string', editable: false },
                        NgayPhat: { type: 'date', editable: false },
                        LyDo: { type: 'string', editable: false },
                        SoTien: { type: 'number', editable: false },
                        GhiChu: { type: 'string', editable: false },
                    }
                }
            },
            pageSize: 20,
            aggregate: [{ field: 'SoTien', aggregate: "sum" }]
        }),
        height: function () {
            var height = $(window).height() - 195;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        //filterable:true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách tổ nhóm";
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
        columns: [
            {
                width: "35px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "150px",
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
                field: "TenToNhom",
                title: "Tên tổ",
                width: "150px",
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
                field: "NgayPhat",
                title: "Ngày bị phạt",
                format: "{0:dd/MM/yyyy hh:mm:ss}",
                width: "200px",
                //filterable: {
                //    cell: {
                //        operator: "contains",
                //        showOperators: false,
                //        template: function (e) {
                //            e.element.addClass("k-textbox").css("width", "100%")
                //        }
                //    }
                //},
                filterable: {
                    cell: { template: betweenFilter },
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
                field: "LyDo",
                title: "Lý do",
                width: "300px",
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
                field: "SoTien",
                title: "Số tiền phạt",
                format: "{0:n0}",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
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
                field: "GhiChu",
                title: "Ghi chú",
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
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        dateInput: true,
        change: function (e) {
            var d = new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0);
            $("#DenNgay").data("kendoDatePicker").value(d);
        }
    });
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,
        value: new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0)
    });
    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowUpdate").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#NgayPhat").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayPhat").data("kendoDatePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });
    $("#NgayPhat_Update").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayPhat_Update").data("kendoDatePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    /*LoadGridData();*/
    $("#windowNhanVien").kendoWindow({
        width: "800",
        height: "450",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#gridNhanVien").kendoGrid({
        height: function () {
            var height = 300;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách tổ nhóm";
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
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
            {
                title: "STT",
                field: "MaNhanVien",
                template: "#= ++record #",
                width: "50px",
                attributes: {
                    class: "text-center"
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào tổ/nhóm' style='width:100%; height:25px;' onclick='openAddNhanVienWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
                //template: function (e) {
                //    var dateString = e.NgaySinh.substr(6);
                //    var currentTime = new Date(parseInt(dateString));
                //    if (currentTime.getFullYear() != 1) {
                //        return kendo.toString(currentTime, "dd/MM/yyyy");
                //    } else {
                //        return "";
                //    }
                //},
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
                    style: "text-align: left;",
                }
            },
            {
                field: "TenToNhom",
                title: "Tên tổ",
                width: "150px",
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
                field: "SoDienThoai",
                title: "Số điện thoại",
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
                title: "",
                width: "150px",
                template: function (e) {
                    //return "<a class='k-button bg-red text-center' onclick='XoaNhanVien(" + e.ID + ")'><i class='fa fa-trash'> </i> Xóa </a>";
                    return "<i onclick='DeleteRow(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
    $("#gridAddNhanVien").kendoGrid({
        height: function () {
            var height = 300;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
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
                title: "Mã Nhân viên/Mã Số Ticket",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
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
                    style: "text-align: left;",
                }
            },

            {
                field: "SoDienThoai",
                title: "Số điện thoại",
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
            }
        ]

    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMucQuyen',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboQuyen").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource
        })
    });
    //$.ajax({
    //    url: '/NhanVien/GetAllNhanVien',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    var dataSource = new kendo.data.DataSource({
    //        data: response,

    //    });
    $("#ComboNhanVien").kendoMultiColumnComboBox({
        dataTextField: "TenDayDu",
        dataValueField: "ID",
        columns: [
            {
                field: "TenDayDu",
                title: "Tên lái đò",
                width: "200px",
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "200px",
            },
            {
                field: "MaThuyen",
                title: "Mã số đò",
                width: "200px",
            },
            {
                field: "TenToNhom",
                title: "Tên tổ",
                width: "200px",
            },
        ],
        footerTemplate: 'Tổng #: instance.dataSource.total() # lái đò',
        filter: "contains",
        filterFields: ["TenDayDu", "MaThuyen", "MaNhanVien", "TenToNhom"],
        suggest: true,
        delay: 1000,
        //dataSource: dataSource,
        select: function (e) {

        }
    })
    //});
    $(".main_container").show();
})

function TimKiem() {
    console.log(kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00");
    console.log(kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",);
    kendo.ui.progress($("#grid"), true);
    console.log("/XuPhat/GetAllXuPhatByDateRange"
        + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59")
    $.ajax({
        url: "/XuPhat/GetAllXuPhatByDateRange"
            + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        MaThuyen: { type: 'string', editable: false },
                        TenToNhom: { type: 'string', editable: false },
                        MaNhanVien: { type: 'string', editable: false },
                        TenDayDu: { type: 'string', editable: false },
                        NgayPhat: { type: 'date', editable: false },
                        LyDo: { type: 'string', editable: false },
                        SoTien: { type: 'number', editable: false },
                        GhiChu: { type: 'string', editable: false },
                    }
                }
            },
            aggregate: [{ field: 'SoTien', aggregate: "sum" }],
            pageSize:30,
        });
        if (dataSource === undefined || dataSource === null) {
            console.log("void");
        } else {
            console.log(dataSource);
            console.log($("#grid").data("kendoGrid"));
            $("#grid").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#grid"), false);
        }
        kendo.ui.progress($("#grid"), false);
    });
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log("openEditWindow: ", selectedItem);
        $("#ID_Update").val(selectedItem.ID);
        $("#SoTien_Update").val(selectedItem.SoTien);
        $("#NgayPhat_Update").data("kendoDatePicker").value(selectedItem.NgayPhat);
        $("#LyDo_Update").val(selectedItem.LyDo);
        $("#GhiChu_Update").val(selectedItem.GhiChu);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        //var dataSource = new kendo.data.DataSource({
        //    data: selectedItem.lstNhanVien,
        //    schema: {
        //        model: {
        //            ID: "ID",
        //            fields: {
        //                NgaySinh: {
        //                    type: 'date'
        //                }
        //            }
        //        }
        //    },
        //    pageSize: 20,
        //});
        //$("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
        if ($(window).width() > 800) {
            $("#windowUpdate").data("kendoWindow").center().open();
        } else {
            $("#windowUpdate").data("kendoWindow").center().maximize().open();
        }
    }

}

function LoadGridData() {
    $.ajax({
        url: '/XuPhat/GetAllXuPhat',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayPhat: {
                            type: 'date'
                        },
                        SoTien: {
                            type: 'number'
                        }
                    }
                }
            },
            pageSize: 20,
            aggregate: [{ field: 'SoTien', aggregate: "sum" }]
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    Huy();
    var dataSource = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgayPhat: {
                        type: 'date'
                    },
                    SoTien: {
                        type: 'number'
                    }
                }
            }
        },
        pageSize: 20,
        aggregate: [{ field: 'SoTien', aggregate: "sum" }]
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm() {
    var validten = SetValidate("SoTien");
    var validma = SetValidate("NgayPhat");
    var valid = validma && validten;

    return valid
}
function ValidateForm2() {
    var validten = SetValidate("SoTien_Update");
    var validma = SetValidate("NgayPhat_Update");
    var validnv = SetValidate("ComboNhanVien");
    var valid = validma && validten && validnv;
    return valid
}


function Luu() {

    if ($("#ID_Update").val() > 0 || $("#ID_Update").val() != '') {

        if (ValidateForm2()) {
            var bangDuLieuNhanVienXuPhat = [{
                ID_NhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(),
            }];
            $.ajax({
                url: '/XuPhat/InsertOrUpdate_XuPhat',
                type: 'POST',
                data: {
                    ID: $("#ID_Update").val(),
                    SoTien: $("#SoTien_Update").val(),
                    NgayPhat: kendo.toString($("#NgayPhat_Update").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    LyDo: $("#LyDo_Update").val(),
                    GhiChu: $("#GhiChu_Update").val(),
                    lstNhanVienXuPhat: bangDuLieuNhanVienXuPhat
                }
            }).done(function successCallback(response) {

                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    TimKiem();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }

    } else {
        if (ValidateForm()) {
            var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
            var bangDuLieuNhanVienXuPhat = [];
            $.each(bangDuLieuNhanVien, function (index, item) {
                bangDuLieuNhanVienXuPhat.push({
                    ID_NhanVien: item.ID,
                });
            })
            if (bangDuLieuNhanVienXuPhat.length > 0) {
                $.ajax({
                    url: '/XuPhat/InsertOrUpdate_XuPhat',
                    type: 'POST',
                    data: {
                        ID: $("#ID").val(),
                        SoTien: $("#SoTien").val(),
                        NgayPhat: kendo.toString($("#NgayPhat").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                        LyDo: $("#LyDo").val(),
                        GhiChu: $("#GhiChu").val(),
                        lstNhanVienXuPhat: bangDuLieuNhanVienXuPhat
                    }
                }).done(function successCallback(response) {

                    if (response.success) {
                        notification.show({ kValue: response.msg }, "success");
                        Huy();
                        TimKiem();
                    } else {
                        notification.show({ kValue: response.msg }, "error");
                    }
                });
            } else {
                notification.show({ kValue: "Vui lòng chọn nhân viên" }, "error");
            }
        }


    }



}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function OpenDanhMucLoi() {
    var windowOption = {
        width: "30%",
        height: "10%",
        title: "Thêm danh mục lỗi vi phạm"
    }
    OpenLayoutWindow('/DanhMuc/DanhMucLoi', windowOption);
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    document.getElementById("formUpdate").reset();

    $("#ID").val('');
    $("#ID_Update").val('');
    $("#window").data("kendoWindow").close();
    $("#windowUpdate").data("kendoWindow").close();

    $("#grid").data("kendoGrid").clearSelection();
    var dataSource = new kendo.data.DataSource({

        data: [],
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgayPhat: {
                        type: 'date'
                    },
                    SoTien: {
                        type: 'number'
                    }
                }
            }
        },
        pageSize: 20,
        aggregate: [{ field: 'SoTien', aggregate: "sum" }]
    });

    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " tổ?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({ kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.id;
        ids.push(id);
    });
    $.ajax({
        url: '/XuPhat/DeleteMulti_XuPhat?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}






function openAddNhanVienWindow() {
    $.ajax({
        url: '/NhanVien/GetAllNhanVien',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVien"), true);
        var lstNhanVienNgoaiXuPhat = [];
        response = JSON.parse(response);
        for (var i = 0; i < response.length; i++) {
            if (!CheckNhanVienTrongXuPhat(response[i].ID)) {
                lstNhanVienNgoaiXuPhat.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstNhanVienNgoaiXuPhat,
            schema: {
                model: {
                    ID: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddNhanVien"), false);
        if ($(window).width() > 800) {
            $("#windowNhanVien").data("kendoWindow").center().open();
        } else {
            $("#windowNhanVien").data("kendoWindow").center().maximize().open();
        }
    });
}


function LuuAddNhanVien() {
    $("#windowNhanVien").data("kendoWindow").close();
    var bangDuLieuNhanVienTo = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVien = [];

    $.each(bangDuLieuNhanVienTo, function (index, item) {
        bangDuLieuNhanVien.push({
            ID: item.ID,
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            Email: item.Email,
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: item.TrangThai,
            MaNhanVien: item.MaNhanVien
        });
    })
    var bangDuLieuAddNhanVien = $("#gridAddNhanVien").data("kendoGrid");
    bangDuLieuAddNhanVien.select().each(function () {
        var dataItem = bangDuLieuAddNhanVien.dataItem(this);
        bangDuLieuNhanVien.push({
            ID: dataItem.ID,
            TenDayDu: dataItem.TenDayDu,
            SoDienThoai: dataItem.SoDienThoai,
            Email: dataItem.Email,
            CCCD: dataItem.CCCD,
            NgaySinh: dataItem.NgaySinh,
            DiaChi: dataItem.DiaChi,
            TrangThai: dataItem.TrangThai,
            MaNhanVien: dataItem.MaNhanVien
        });
    });

    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuNhanVien,
        schema: {
            model: {
                ID: "ID",
                field: {
                    NgaySinh: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
    });

    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

}
function DeleteRow(uid) {
    var dataRow = $('#gridNhanVien').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridNhanVien').data("kendoGrid").dataSource.remove(dataRow);
}

function CheckNhanVienTrongXuPhat(idnhanvien) {
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuNhanVien, function (index, item) {
        console.log(item);
        console.log(idnhanvien)
        if (idnhanvien == item.ID) {
            isExisted = true;
        }
    })

    return isExisted;
}


function betweenFilter(args) {
    var filterCell = args.element.parents(".k-filtercell");

    filterCell.empty();
    filterCell.html('<span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Từ:</span><input style="width:80%" class="start-date"/></span><span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Đến:</span><input style="width:80%;" class="end-date"/></span>');

    $(".start-date", filterCell).kendoDatePicker({
        format: '{0: dd-MM-yyyy}',
        change: function (e) {
            var startDate = e.sender.value(),
                endDate = $("input.end-date", filterCell).data("kendoDatePicker").value().setHours(23),
                dataSource = $("#grid").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "NgayPhat", operator: "gte", value: startDate });
                filter.filters.push({ field: "NgayPhat", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });
    $(".end-date", filterCell).kendoDatePicker({
        format: '{0: dd-MM-yyyy}',
        change: function (e) {
            var startDate = $("input.start-date", filterCell).data("kendoDatePicker").value(),
                endDate = e.sender.value().setHours(23),
                dataSource = $("#grid").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "NgayPhat", operator: "gte", value: startDate });
                filter.filters.push({ field: "NgayPhat", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });

}