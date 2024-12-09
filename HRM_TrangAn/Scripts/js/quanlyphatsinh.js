$(".main_container").hide();
$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 195;
            return height;
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
                field: "NgayApDung",
                title: "Ngày áp dụng",
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
                field: "Cong",
                title: "Công",
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
                field: "TenCongViec",
                title: "Danh mục công việc",
                width: "200px",
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

    $("#NgayApDung").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayApDung").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayApDung_Update").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayApDung_Update").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#windowNhanVien").kendoWindow({
        width: "800",
        height: "400",
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
        url: '/NhanVien/GetAllNhanVien',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),

        });
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
            dataSource: dataSource,
            select: function (e) {

            }
        })
    });
    $.ajax({
        url: '/DanhMucCongViec/GetAllDanhMucCongViec',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#ComboCongViec").kendoMultiColumnComboBox({
            dataTextField: "TenCongViec",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenCongViec",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "Cong",
                    title: "Công/Người",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenCongViec", "Cong"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                // Use the selected item or its text
            }
        })
        $("#ComboCongViec_Update").kendoMultiColumnComboBox({
            dataTextField: "TenCongViec",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenCongViec",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "Cong",
                    title: "Công/Người",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenCongViec", "Cong"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                // Use the selected item or its text
            }
        })
    });
    $(".main_container").show();
})


function TimKiem() {
    console.log(kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00");
    console.log(kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",);
    kendo.ui.progress($("#grid"), true);
    console.log("/PhatSinh/GetAllPhatSinhByDateRange"
        + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59")
    $.ajax({
        url: "/PhatSinh/GetAllPhatSinhByDateRange"
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
                        NgayApDung: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 30,
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
        console.log("openEditWindow: ",selectedItem);
        $("#ID_Update").val(selectedItem.ID);
        $("#Cong_Update").val(selectedItem.Cong);
        $("#NgayApDung_Update").data("kendoDatePicker").value(selectedItem.NgayApDung);
        $("#GhiChu_Update").val(selectedItem.GhiChu);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        $("#ComboCongViec_Update").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);

        if ($(window).width() > 800) {
            $("#windowUpdate").data("kendoWindow").center().open();
        } else {
            $("#windowUpdate").data("kendoWindow").center().maximize().open();
        }
    }

}

function LoadGridData() {
    $.ajax({
        url: '/PhatSinh/GetAllPhatSinh',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayApDung: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
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
                    NgayApDung: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm() {
    var validten = SetValidate("Cong");
    var validma = SetValidate("NgayApDung");
    var validcv = SetValidate("ComboCongViec");
    var valid = validma && validten && validcv;
    
    return valid
}
function ValidateForm2() {
    var validten = SetValidate("Cong_Update");
    var validma = SetValidate("NgayApDung_Update");
    var validnv = SetValidate("ComboNhanVien");
    var validcv = SetValidate("ComboCongViec_Update");

    var valid = validma && validten && validnv && validcv;
    return valid
}


function Luu() {
    
    if ($("#ID_Update").val() > 0 || $("#ID_Update").val() != '') {
        
        if (ValidateForm2()) {
            var bangDuLieuNhanVienPhatSinh = [$("#ComboNhanVien").data("kendoMultiColumnComboBox").value()];
            $.ajax({
                url: '/PhatSinh/InsertOrUpdate_PhatSinh',
                type: 'POST',
                data: {
                    ID: $("#ID_Update").val(),
                    Cong: $("#Cong_Update").val(),
                    NgayApDung: kendo.toString($("#NgayApDung_Update").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    ID_CongViec: $("#ComboCongViec_Update").data("kendoMultiColumnComboBox").value(),
                    GhiChu: $("#GhiChu_Update").val(),
                    lstNhanVienPhatSinh: bangDuLieuNhanVienPhatSinh
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
            var bangDuLieuNhanVienPhatSinh = [];
            $.each(bangDuLieuNhanVien, function (index, item) {
                bangDuLieuNhanVienPhatSinh.push(item.ID);
            })
            if (bangDuLieuNhanVienPhatSinh.length > 0) {
                $.ajax({
                    url: '/PhatSinh/InsertOrUpdate_PhatSinh',
                    type: 'POST',
                    data: {
                        ID: $("#ID").val(),
                        Cong: $("#Cong").val(),
                        NgayApDung: kendo.toString($("#NgayApDung").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                        ID_CongViec: $("#ComboCongViec").data("kendoMultiColumnComboBox").value(),
                        GhiChu: $("#GhiChu").val(),
                        lstNhanVienPhatSinh: bangDuLieuNhanVienPhatSinh
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
                    NgayApDung: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
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
        url: '/PhatSinh/DeleteMulti_PhatSinh?ID=' + ids.join(','),
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
        var lstNhanVienNgoaiPhatSinh = [];
        for (var i = 0; i < response.length; i++) {
            if (!CheckNhanVienTrongPhatSinh(response[i].ID)) {
                lstNhanVienNgoaiPhatSinh.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstNhanVienNgoaiPhatSinh,
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

function CheckNhanVienTrongPhatSinh(idnhanvien) {
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuNhanVien, function (index, item) {
        console.log(item);
        console.log(idnhanvien)
        if (idnhanvien == item.ID) {
            isExisted =  true;
        }
    })

    return isExisted;
}
