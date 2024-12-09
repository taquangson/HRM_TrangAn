$(".main_container").hide();
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
    $("#grid").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayPhat: {
                            type: 'date'
                        },
                        PhatTien: {
                            type: 'number'
                        },
                        PhatCong: {
                            type: 'number'
                        }
                    }
                }
            },
            pageSize: 20,
            aggregate: [{ field: 'PhatTien', aggregate: "sum" },
            { field: 'PhatCong', aggregate: "sum" },]
        }),
        height: function () {
            var height = $(window).height() - 200;
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
            sheet.title = "Danh sách xử phạt";
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
                field: "TenLoi",
                title: "Lỗi vi phạm",
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
                field: "PhatTien",
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
                field: "PhatCong",
                title: "Số công phạt",
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
    //LoadGridData();
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên' style='width:100%; height:25px;' onclick='openAddNhanVienWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
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
                field: "TaiKhoan",
                title: "Tên tài khoản",
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
                field: "DienThoai",
                title: "Điện thoại",
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
                field: "Email",
                title: "Email",
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
                field: "TaiKhoan",
                title: "Tên tài khoản",
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
                field: "DienThoai",
                title: "Điện thoại",
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
                field: "Email",
                title: "Email",
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
        ]

    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,

        });
        $("#ComboNhanVien").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Tên đầy đủ",
                    width: "200px",
                },
                {
                    field: "DienThoai",
                    title: "Điện thoại",
                    width: "200px",
                },
                {
                    field: "TaiKhoan",
                    title: "Tên tài khoản",
                    width: "200px",
                },
                {
                    field: "Email",
                    title: "Email",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # lái đò',
            filter: "contains",
            filterFields: ["TenDayDu", "DienThoai", "Email", "TaiKhoan"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

            }
        })
    });

    $.ajax({
        url: '/DanhMuc/GetAll_DanhMucLoi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,

        });
        $("#ComboLoi").kendoComboBox({
            dataTextField: "TenLoi",
            dataValueField: "ID",

            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#SoTien").val(e.dataItem.PhatTien);
            }
        });
        $("#ComboLoi_Update").kendoComboBox({
            dataTextField: "TenLoi",
            dataValueField: "ID",

            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#SoTien_Update").val(e.dataItem.PhatTien);
            }
        })
    });


    $(".main_container").show();
})

function TimKiem() {
    var tuNgay = kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00";
    var denNgay = kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    var url = "/XuPhatNhanVien/GetXuPhatNhanVienByDateRange?TuNgay=" + encodeURIComponent(tuNgay) + "&DenNgay=" + encodeURIComponent(denNgay);
    console.log("TuNgay: ", tuNgay);
    console.log("DenNgay: ", denNgay);
    console.log("URL: ", url);

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log("Response: ", response);

            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    console.error("Failed to parse response: ", e);
                    return;
                }
            }


            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            NgayPhat: { type: 'date', editable: false },
                            TenDayDu: { type: 'string' },
                            GhiChu: { type: 'string' },
                            SoTien: {
                                type: 'number'
                            }
                        }
                    }
                },
                pageSize: 20,
                aggregate: [
                    { field: 'PhatTien', aggregate: "sum" },
                    { field: 'PhatCong', aggregate: "sum" }
                ]

            });
            var grid = $("#grid").data("kendoGrid");
            if (grid) {
                grid.setDataSource(dataSource);
            } else {
                console.error("kendoGrid not initialized.");
                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    noRecords: {
                        template: "<div>No records available</div>"
                    },
                    pageable: true,
                    sortable: true,
                    columns: [
                        { field: "NgayPhat", title: "Ngày bị phạt", format: "{0:dd/MM/yyyy}", width: "120px" },
                        { field: "TenDayDu", title: "Tên nhân viên", width: "150px" },
                        { field: "GhiChu", title: "Ghi chú", width: "200px" },
                    ]
                });
            }
            kendo.ui.progress($("#grid"), false);
        },
        error: function (request, error) {
            console.error("AJAX Error: ", error);
            kendo.ui.progress($("#grid"), false);
        }
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
        $("#SoTien_Update").val(selectedItem.PhatTien);
        $("#NgayPhat_Update").data("kendoDatePicker").value(selectedItem.NgayPhat);
        $("#ComboLoi_Update").data("kendoComboBox").value(selectedItem.ID_DanhMucLoi);
        $("#GhiChu_Update").val(selectedItem.GhiChu);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_TaiKhoan);
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
        url: '/XuPhatNhanVien/GetAllXuPhat',
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
                        PhatTien: {
                            type: 'number'
                        },
                        PhatCong: {
                            type: 'number'
                        }
                    }
                }
            },
            pageSize: 20,
            aggregate: [{ field: 'PhatTien', aggregate: "sum" },
            { field: 'PhatCong', aggregate: "sum" },]
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
                    PhatTien: {
                        type: 'number'
                    },
                    PhatCong: {
                        type: 'number'
                    }
                }
            }
        },
        pageSize: 20,
        aggregate: [{ field: 'PhatTien', aggregate: "sum" },
        { field: 'PhatCong', aggregate: "sum" },]
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
                url: '/XuPhatNhanVien/InsertOrUpdate_XuPhat',
                type: 'POST',
                data: {
                    ID: $("#ID_Update").val(),
                    NgayPhat: kendo.toString($("#NgayPhat_Update").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    ID_DanhMucLoi: $("#ComboLoi_Update").data('kendoComboBox').value(),
                    GhiChu: $("#GhiChu_Update").val(),
                    FromDMVS:0,
                    lstNhanVienXuPhat: bangDuLieuNhanVienXuPhat
                }
            }).done(function successCallback(response) {

                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    LoadGridData();
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
                    url: '/XuPhatNhanVien/InsertOrUpdate_XuPhat',
                    type: 'POST',
                    data: {
                        ID: $("#ID").val(),
                        NgayPhat: kendo.toString($("#NgayPhat").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                        ID_DanhMucLoi: $("#ComboLoi").data('kendoComboBox').value(),
                        GhiChu: $("#GhiChu").val(),
                        FromDMVS: 0,
                        lstNhanVienXuPhat: bangDuLieuNhanVienXuPhat
                    }
                }).done(function successCallback(response) {

                    if (response.success) {
                        notification.show({ kValue: response.msg }, "success");
                        Huy();
                        LoadGridData();
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
                    PhatTien: {
                        type: 'number'
                    },
                    PhatCong: {
                        type: 'number'
                    }
                }
            }
        },
        pageSize: 20,
        aggregate: [{ field: 'PhatTien', aggregate: "sum" },
        { field: 'PhatCong', aggregate: "sum" },]
    });

    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " bản ghi?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/XuPhatNhanVien/DeleteMulti_XuPhat?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}






function openAddNhanVienWindow() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVien"), true);
        var lstNhanVienNgoaiXuPhat = [];
        //response = JSON.parse(response);
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
            DienThoai: item.DienThoai,
            Email: item.Email,
            TaiKhoan: item.TaiKhoan
        });
    })
    var bangDuLieuAddNhanVien = $("#gridAddNhanVien").data("kendoGrid");
    bangDuLieuAddNhanVien.select().each(function () {
        var dataItem = bangDuLieuAddNhanVien.dataItem(this);
        bangDuLieuNhanVien.push({
            ID: dataItem.ID,
            TenDayDu: dataItem.TenDayDu,
            DienThoai: dataItem.DienThoai,
            Email: dataItem.Email,
            TaiKhoan: dataItem.TaiKhoan
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