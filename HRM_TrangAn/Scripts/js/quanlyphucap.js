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
    $("#NgayHuongPhuCap").kendoDatePicker({
        format: "dd/MM/yyyy",
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
    });
    $("#NgayHuongPhuCapInsert").kendoDatePicker({
        format: "dd/MM/yyyy",
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
    });
    $("#grid").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 20,
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
                field: "NgayHuongPhuCap",
                title: "Ngày Hưởng Phụ Cấp",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
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
                field: "TenNhanVien",
                title: "Tên Nhân Viên",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                    style: "text-align: left;",
                }
            },
            {
                field: "Tien",
                title: "Số Tiền",
                format: "{0:n0}",
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
                    style: "text-align: right;",
                }
            },
            {
                field: "TenPhuCap",
                title: "Loại",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },

            {
                field: "NoiDung",
                title: "Nội Dung",
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
                field: "NgayTao",
                title: "Ngày Tạo",
                format: "{0:dd/MM/yyyy hh:mm:ss}",
                width: "200px",
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
                field: "TenNguoiTao",
                title: "Người Tạo",
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

        ]

    });

    $("#gridNhanVien").kendoGrid({
        height: function () {
            var height = $(window).height() - 500;
            return height;
        },
        scrollable: true,
        selectable: "multiple, row",
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách công việc";
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
        editable: true,
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                width: "30px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                title: "STT",
                field: "MaNhanVien",
                template: "#= ++record #",
                width: "100px",
                editable: function () {
                    return false;
                },
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào chính sách lương' style='width:50%; height:25px;float: left; position: relative;' onclick='openAddNhanVienWindow()'><i class='fa fa-plus'></i></a><a class='k-button' title='Xóa nhân viên đã chọn' style='width:50%; height:25px;float: left; position: relative;' onclick='DeleteMultiRowGridNV()'><i class='fa fa-minus'></i></a>")

                        }
                    }
                },
            },
            {
                field: "TenDayDu",
                title: "Tên Nhân Viên",
                width: "250px",
                editable: function () {
                    return false;
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
                field: "MaNhanVien",
                title: "Mã Nhân viên",
                width: "100px",
                editable: function () {
                    return false;
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
                field: "SoDienThoai",
                title: "Số Điện Thoại",
                width: "150px",
                editable: function () {
                    return false;
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
                field: "DiaChi",
                title: "Địa Chỉ",
                editable: function () {
                    return false;
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },
        ]

    });

    $("#gridAddNhanVien").kendoGrid({
        height: function () {
            var height = 670;
            return height;
        },
        scrollable: true,
        selectable: "multiple, row",
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
                width: "30px",
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
                },
            },
            {
                field: "TenDayDu",
                title: "Tên Nhân Viên",
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
                field: "MaNhanVien",
                title: "Mã Nhân viên",
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
                field: "TenPhongBan",
                width: "100px",
                title: "Bộ phận",
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
                title: "Số Điện Thoại",
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
                field: "DiaChi",
                title: "Địa Chỉ",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },
        ]
    });

    $("#window").kendoWindow({
        width: "500px",
        height: "450px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#windowInsert").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Thêm dữ liệu",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowAddNhanVien").kendoWindow({
        width: "800",
        height: "800",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#NhanVien").kendoMultiColumnComboBox({
        dataTextField: "TenDayDu",
        dataValueField: "ID",
        columns: [
            {
                field: "TenDayDu",
                title: "Tên Đầy Đủ",
                width: "200px",
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "200px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource(),
    })

    $('#NoiDungPhuCap').kendoMultiColumnComboBox({
        dataTextField: "Ten",
        dataValueField: "ID",
        columns: [
            {
                field: "Ten",
                title: "Tên",
                width: "120px",
            },
            {
                field: "Ma",
                title: "Mã",
                width: "90px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource(),
    })

    $('#NoiDungPhuCapInsert').kendoMultiColumnComboBox({
        dataTextField: "Ten",
        dataValueField: "ID",
        columns: [
            {
                field: "Ten",
                title: "Tên",
                width: "120px",
            },
            {
                field: "Ma",
                title: "Mã",
                width: "90px",
            },
        ],
        filter: "contains",
        filterFields: ["TenDayDu", "MaNhanVien"],
        suggest: true,
        delay: 1000,
        dataSource: new kendo.data.DataSource(),
    })

    $.ajax({
        url: '/NoiDungPhuCap/GetAll',
        type: 'GET'
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        Ten: { type: 'string' },
                        Ma: { type: 'string' },
                    }
                }
            },
        });
        $("#NoiDungPhuCap").data("kendoMultiColumnComboBox").setDataSource(dataSource);
        $("#NoiDungPhuCapInsert").data("kendoMultiColumnComboBox").setDataSource(dataSource);
    });

    $.ajax({
        url: '/HoSoNhanSu/GetAll',
        type: 'GET'
    }).done(function successCallback(response) {
        response = JSON.parse(response);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        TenDayDu: { type: 'string' },
                        MaNhanVien: { type: 'string' },
                    }
                }
            },
        });
        $("#NhanVien").data("kendoMultiColumnComboBox").setDataSource(dataSource);
    });

    
})

function TimKiem() {
    var tuNgay = kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00";
    var denNgay = kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    var url = "/PhuCap/GetPhuCapByDateRange?TuNgay=" + encodeURIComponent(tuNgay) + "&DenNgay=" + encodeURIComponent(denNgay);

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {

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
                            NgayHuongPhuCap: { type: 'date', editable: false },
                            NgayTao: { type: 'date', editable: false },
                        }
                    }
                },
                pageSize: 30,
            });
            var grid = $("#grid").data("kendoGrid");
            if (grid) {
                grid.setDataSource(dataSource);
            } else {
                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    noRecords: {
                        template: "<div>No records available</div>"
                    },
                    pageable: true,
                    sortable: true,
                    columns: [
                        { field: "NgayHuongPhuCap", format: "{0:dd/MM/yyyy}", width: "120px" },
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

function ThemMoi() {
    HuyInsert();
    if ($(window).width() > 800) {
        $("#windowInsert").data("kendoWindow").center().open();
    } else {
        $("#windowInsert").data("kendoWindow").center().maximize().open();
    }
}
function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log("openEditWindow: ", selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#Tien").val(selectedItem.Tien);
        $("#NoiDung").val(selectedItem.NoiDung);
        $("#NgayHuongPhuCap").data("kendoDatePicker").value(selectedItem.NgayHuongPhuCap);
        $("#NhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_HoSoNhanSu);
        $("#NoiDungPhuCap").data("kendoMultiColumnComboBox").value(selectedItem.ID_NoiDungPhuCap);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}

function ValidateForm() {
    var validtien = SetValidate("Tien");
    var validnoidung = SetValidate("NoiDungPhuCap");
    var validnhanvien = SetValidate("NhanVien");
    var valid = validtien && validnoidung && validnhanvien;
    console.log(valid);
    return valid;
}

function ValidateInsertForm() {
    var validtien = SetValidate("TienInsert");
    var validnoidung = SetValidate("NoiDungPhuCapInsert");
    var dataSource = $("#gridNhanVien").data("kendoGrid").dataSource._pristineData;
    if (dataSource.length <= 0) {
        notification.show({ kValue: "Cần thêm nhân viên để lưu" }, "error");
        return false;
    }
    return validtien && validnoidung;
}

function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            ID_HoSoNhanSu: $("#NhanVien").data("kendoMultiColumnComboBox").value(),
            ID_NoiDungPhuCap: $("#NoiDungPhuCap").data("kendoMultiColumnComboBox").value(),
            Tien: $("#Tien").val(),
            NoiDung: $("#NoiDung").val(),
            NgayHuongPhuCap: kendo.toString($("#NgayHuongPhuCap").data("kendoDatePicker").value(), 'yyyy/MM/dd'),
            ID_NguoiTao: 0,
        }
        console.log(dataItem)
        $.ajax({
            url: '/PhuCap/InsertOrUpdate',
            type: 'POST',
            data: dataItem
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                Huy();
                TimKiem();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function LuuInsert() {
    if (ValidateInsertForm()) {
        var ListID_HSNS = [];
        var dataSource = $("#gridNhanVien").data("kendoGrid").dataSource._pristineData;
        console.log(dataSource);
        $.each(dataSource, function (index, item) {
            ListID_HSNS.push(item.ID);
        });
        var dataItem = {
            ID: 0,
            Tien: $("#TienInsert").val(),
            ID_NoiDungPhuCap: $("#NoiDungPhuCapInsert").data("kendoMultiColumnComboBox").value(),
            NoiDung: $("#NoiDungInsert").val(),
            NgayHuongPhuCap: kendo.toString($("#NgayHuongPhuCapInsert").data("kendoDatePicker").value(), "yyyy/MM/dd"),
            ID_NguoiTao: 0,
        }
        $.ajax({
            url: '/PhuCap/InsertMulti?StringID=' + ListID_HSNS.join(","),
            type: 'POST',
            data: {
                model: dataItem
            }
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                HuyInsert();
                TimKiem();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function openAddNhanVienWindow() {
    $.ajax({
        url: '/HoSoNhanSu/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        pResponse = JSON.parse(response); // chuyển đổi respon thành JSON và gán tên biến pResponse
        kendo.ui.progress($("#gridAddNhanVien"), true);
        var bangDuLieuADCS = $("#gridNhanVien").data("kendoGrid").dataSource.data();  //tạo biến lưu data có trong #gridNhanVien
        var ListID_HSDaCo = [];
        $.each(bangDuLieuADCS, function (index, item) {  //hàm $.(each) lặp qua tất cả các phần tử của bangDuLieuADCS thông qua index(chỉ số của phần tử) và item(đối tượng hiện tại từ bangDuLieuADCS)
            ListID_HSDaCo.push(item.ID); // lấy thuộc tính ID_HoSoNhanSu của từng item và thêm vào bangDuLieuADCS
        })
        var result = pResponse.filter((item) => !ListID_HSDaCo.includes(item.ID)); // trả về true các item.ID không tồn tại trong ListID_HSDaCo, -> filter tạo ra mảng mới từ pResopnse dựa trên bộ lọc, lưu vào result
        var dataSource = new kendo.data.DataSource({ // khởi tạo đối tượng DataSource

            data: result,
            schema: {
                model: {
                    ID: "ID",
                }
            },
            pageSize: 20,
        });
        $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddNhanVien"), false);
        if ($(window).width() > 800) {
            $("#windowAddNhanVien").data("kendoWindow").center().open();
        } else {
            $("#windowAddNhanVien").data("kendoWindow").center().maximize().open();
        }
    });
}

function LuuAddNhanVien() {
    var gridAddNhanVien = $("#gridAddNhanVien").data("kendoGrid");
    var gridNhanVien = $("#gridNhanVien").data("kendoGrid");
    var dataSourceAddNV = gridAddNhanVien.dataSource._pristineData;
    var dataSourceNV = gridNhanVien.dataSource._pristineData;
    var listSelectedID_HSNS = [];
    gridAddNhanVien.select().each(function (index, item) {
        dataItem = gridAddNhanVien.dataItem(item);
        listSelectedID_HSNS.push(dataItem.ID);
        dataSourceNV.push({
            ID: dataItem.ID,
            MaNhanVien: dataItem.MaNhanVien,
            SoDienThoai: dataItem.SoDienThoai,
            TenDayDu: dataItem.TenDayDu,
            DiaChi: dataItem.DiaChi
        })
    });
    var result = dataSourceAddNV.filter((item) => !listSelectedID_HSNS.includes(item.ID));

    var newDataSourceAddNV = new kendo.data.DataSource({
        data: result,
        schema: {
            model: {
                ID: "ID",
            }
        },
        pageSize: 20,
    });

    var newDataSourceNV = new kendo.data.DataSource({
        data: dataSourceNV,
        schema: {
            model: {
                ID: "ID",
            }
        },
        pageSize: 20,
    });
    gridNhanVien.setDataSource(newDataSourceNV);
    gridAddNhanVien.setDataSource(newDataSourceAddNV);
    $("#windowAddNhanVien").data("kendoWindow").close();
}

function Huy() {
    $("#ID").val('');
    $("#Tien").val(0);
    $("#NoiDung").val('');
    $("#NhanVien").data("kendoMultiColumnComboBox").value('');
    $("#NoiDungPhuCap").data("kendoMultiColumnComboBox").value('');
    $("#NgayHuongPhuCap").data("kendoDatePicker").value(null);
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function HuyInsert() {
    $("#ID").val('');
    $("#TienInsert").val(0);
    $("#NgayHuongPhuCapInsert").data("kendoDatePicker").value(new Date());
    $("#windowInsert").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
    $("#gridNhanVien").data("kendoGrid").setDataSource(new kendo.data.DataSource());
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
        url: '/PhuCap/DeleteMulti?ID=' + ids.join(','),
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


function DeleteMultiRowGridNV() {
    var gridNV = $("#gridNhanVien").data("kendoGrid");
    var selectedRows = gridNV.select();  // Lấy các dòng được chọn
    var PristineDatasource = gridNV.dataSource._pristineData
    var listID_NV = []
    selectedRows.each(function () {
        var dataItem = gridNV.dataItem(this);
        listID_NV.push(dataItem.ID)
    });

    var result = PristineDatasource.filter((item) => !listID_NV.includes(item.ID));
    var newDataSourceNV = new kendo.data.DataSource({
        data: result,
        schema: {
            model: {
                ID: "ID",
            }
        },
    });
    gridNV.setDataSource(newDataSourceNV);
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

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "quanlyphucap.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}