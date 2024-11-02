$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    $.ajax({
        url: '/NhanVien/GetAllNhanVien',
        type: 'GET',
    }).done(function successCallback(responsee) {
        var response = JSON.parse(responsee);
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboNhanVien").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Họ tên",
                },
                {
                    field: "MaNhanVien",
                    title: "Mã Nhân viên/Mã Số Ticket",
                },
                {
                    field: "MaToNhom",
                    title: "Mã tổ",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
            filter: "contains",
            filterFields: ["TenDayDu", "MaNhanVien", "MaToNhom"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
        })
    })

   /* $("#ThoiGianBatDau").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    });
    $("#ThoiGianBatDau").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#ThoiGianKetThuc").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#ThoiGianKetThuc").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#ThoiGianBatDauRead").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    });
    $("#ThoiGianBatDauRead").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#ThoiGianKetThucRead").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#ThoiGianKetThucRead").data("kendoDatePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });*/

    $("#grid").kendoGrid({
        /*dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID_NhanVien: { type: 'number', editable: false },
                        TenDayDu: { type: 'string', editable: false },
                        MucLuongDongBaoHiem: { type: 'number', editable: false },
                        TyLeDongBaoHiem: { type: 'number', editable: false },
                        ThoiGianBatDau: { type: 'date', editable: false },
                        ThoiGianKetThuc: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 20,
        }),*/
        height: function () {
            var height = $(window).height() - 150;
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
        /*excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách chuyển công";
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
        },*/
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
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
           /* {
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                field: "SoDo",
                title: "Số đò",
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
                field: "ChucVu",
                title: "Chức vụ",
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
                field: "ToDo",
                title: "Tổ đò",
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
            },*/
            {
                field: "MucLuongDongBaoHiem",
                title: "Mức lương",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                title: "Người SDLĐ phải đóng",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "SDLD_BHXH",
                        title: "BHXH 17,5%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                    {
                        field: "SDLD_BHYT",
                        title: "BHYT 3%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                    {
                        field: "SDLD_BHTN",
                        title: "BHTN",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                ]
            },
            {
                field: "SDLD_Tong",
                title: "Tổng công ty đóng 21,5%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "SDLD_ThucTe",
                title: "Tổng công ty đóng thực tế%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                title: "NLĐ phải đóng",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "NLD_BHXH",
                        title: "BHXH 8%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                    {
                        field: "NLD_BHYT",
                        title: "BHYT 1,5%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                    {
                        field: "NLD_BHTN",
                        title: "BHTN 1%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
                                }
                            }
                        },
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center;"
                        }
                    },
                ]
            },
            {
                field: "NLD_Tong",
                title: "Tổng NLĐ đóng 10,5%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "NLD_ThucTe",
                title: "Tổng NLĐ đóng thực tế",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "Tong",
                title: "Tổng 32%",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
        ]
    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })

    $("#gridNhanVien").kendoGrid({
        height: function () {
            var height = $(window).height() - 435;
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
            }, {
                field: "BatDauApDung",
                title: "Thời gian bắt đầu",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
                editable: function () {
                    return true;

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
                field: "KetThucApDung",
                title: "Thời gian kết thúc",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
                editable: function () {
                    return true;

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
        ]

    });
    $("#gridAddNhanVien").kendoGrid({
        height: function () {
            var height = 300;
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
                width: "100px",
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
                field: "ID_GioiTinh",
                title: "Giới Tính",
                template: function (dataItem) {
                    if (dataItem.ID_GioiTinh === 0) {
                        return "<strong>nam</strong>";
                    } else if (dataItem.ID_GioiTinh === 1) {
                        return "<strong>nữ</strong>";
                    }
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

    LoadGridData();
    $("#window").kendoWindow({
        width: "800px",
        height: "700px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowAddNhanVien").kendoWindow({
        width: "800",
        height: "500",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowADCS").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function TimKiem() {
    var date = $("#month").data("kendoDatePicker").value();

    var TuNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth(), 1), "yyyy/MM/dd") + " 00:00:00";
    var DenNgay = kendo.toString(new Date(date.getFullYear(), date.getMonth() + 1, 0), "yyyy/MM/dd") + " 23:59:59";
    var ID_NguoiTao = $("#NguoiTaoCombobox").data("kendoComboBox").value();
    var url = `/ChuyenCong/GetLichSuChuyenCongByThangAndNguoiTao?TuNgay=${encodeURIComponent(TuNgay)}&DenNgay=${encodeURIComponent(DenNgay)}&ID_NguoiTao=${encodeURIComponent(ID_NguoiTao)}`;

    console.log(ID_NguoiTao);
    console.log("TuNgay:", TuNgay);
    console.log("DenNgay:", DenNgay);

    kendo.ui.progress($("#grid"), true);

    $.ajax({
        url: url,
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
                        NgayTao: { type: 'date', editable: false },
                        NgayTinhCong: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 30,
        });
        if (!dataSource || dataSource.total() === 0) {
            console.log("null");
        } else {
            console.log(dataSource);
            console.log($("#grid").data("kendoGrid"));
            $("#grid").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#grid"), false);
        }
        kendo.ui.progress($("#grid"), false);
    });
}

function LoadGridData() {
    $.ajax({
        url: '/BaoHiem/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    ID: "ID",
                    fields: {
                        MucLuongDongBaoHiem: { type: 'number', editable: false },
                        SDLD_BHXH: { type: 'number', editable: false },
                        SDLD_BHYT: { type: 'number', editable: false },
                        SDLD_BHTN: { type: 'number', editable: false },
                        SDLD_Tong: { type: 'number', editable: false },
                        SDLD_ThucTe: { type: 'number', editable: false },
                        NLD_BHXH: { type: 'number', editable: false },
                        NLD_BHYT: { type: 'number', editable: false },
                        NLD_BHTN: { type: 'number', editable: false },
                        NLD_Tong: { type: 'number', editable: false },
                        NLD_ThucTe: { type: 'number', editable: false },
                        Tong: { type: 'number', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        console.log(dataSource);
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

var isEdit = false;

function ThemMoi() {
    Huy();
    isEdit = false;
    console.log(isEdit);
    document.getElementById("gridNhanVien").style.visibility = "hidden";
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function tinhBaoHiem() {
    var mucLuong = parseFloat(document.getElementById("MucLuongDongBaoHiem").value) || 0;
    var sdldBHXH = mucLuong * 0.175;
    var sdldBHYT = mucLuong * 0.03;
    var sdldBHTN = mucLuong * 0.01;
    var tongCongTyDong = sdldBHXH + sdldBHYT + sdldBHTN;

    var nldBHXH = mucLuong * 0.08;
    var nldBHYT = mucLuong * 0.015;
    var nldBHTN = mucLuong * 0.01;
    var tongNLDDong = nldBHXH + nldBHYT + nldBHTN;

    var tong = tongCongTyDong + tongNLDDong;

    document.getElementById("SDLDBaoHiemXaHoi").value = sdldBHXH;
    document.getElementById("SDLDBaoHiemYTe").value = sdldBHYT;
    document.getElementById("SDLDBaoHiemThatNghiep").value = sdldBHTN;
    document.getElementById("SDLDTong").value = tongCongTyDong;

    document.getElementById("NLDBaoHiemXaHoi").value = nldBHXH;
    document.getElementById("NLDBaoHiemYTe").value = nldBHYT;
    document.getElementById("NLDBaoHiemThatNghiep").value = nldBHTN;
    document.getElementById("NLDTong").value = tongNLDDong;

    document.getElementById("TongTien").value = tong;

    document.getElementById("MucLuongDongBaoHiem").addEventListener("input", tinhBaoHiem);
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").select();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        document.getElementById("gridNhanVien").style.visibility = "visible";
        var selectedItem = $("#grid").data("kendoGrid").dataItem(arr);
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#MucLuongDongBaoHiem").val(selectedItem.MucLuongDongBaoHiem);
        $("#SDLDBaoHiemXaHoi").val(selectedItem.SDLD_BHXH);
        $("#SDLDBaoHiemYTe").val(selectedItem.SDLD_BHYT);
        $("#SDLDBaoHiemThatNghiep").val(selectedItem.SDLD_BHTN);
        $("#SDLDTong").val(selectedItem.SDLD_Tong);
        $("#SDLDThucTe").val(selectedItem.SDLD_ThucTe);
        $("#NLDBaoHiemXaHoi").val(selectedItem.NLD_BHXH);
        $("#NLDBaoHiemYTe").val(selectedItem.NLD_BHYT);
        $("#NLDBaoHiemThatNghiep").val(selectedItem.NLD_BHTN);
        $("#NLDTong").val(selectedItem.NLD_Tong);
        $("#NLDThucTe").val(selectedItem.NLD_ThucTe);
        $("#TongTien").val(selectedItem.Tong);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MoTa").val(selectedItem.MoTa);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}
/*function openAcceptWindow() {
    var arr = $("#grid").data("kendoGrid").select();

    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
        return;
    }

    document.getElementById("gridNhanVien").style.visibility = "visible";
    var selectedItem = $("#grid").data("kendoGrid").dataItem(arr);
    console.log(selectedItem);

    // Set basic values
    $("#ID").val(selectedItem.ID);
    $("#MucLuongDongBaoHiemRead").val(selectedItem.MucLuongDongBaoHiem);
    $("#TyLeDongBaoHiemRead").val(selectedItem.TyLeDongBaoHiem);
    if ($("#ThoiGianBatDauRead").data("kendoDatePicker")) {
        $("#ThoiGianBatDauRead").data("kendoDatePicker").value(selectedItem.ThoiGianBatDau);
    }
    if ($("#ThoiGianKetThucRead").data("kendoDatePicker")) {
        $("#ThoiGianKetThucRead").data("kendoDatePicker").value(selectedItem.ThoiGianKetThuc);
    }
    $("#CongTyDongRead").val(selectedItem.CongTyDong);
    $("#NhanVienDongRead").val(selectedItem.NhanVienDong);

    isEdit = true;
    loadGridNVData(selectedItem.ID);
    if ($(window).width() > 800) {
        $("#windowADCS").data("kendoWindow").center().open();
    } else {
        $("#windowADCS").data("kendoWindow").center().maximize().open();
    }
}*/

function openAcceptWindow() {
    var arr = $("#grid").data("kendoGrid").select();

    // Kiểm tra số lượng bản ghi được chọn
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
        return;
    }

    // Hiển thị và thiết lập các giá trị cơ bản cho form
    document.getElementById("gridNhanVien").style.visibility = "visible";
    var selectedItem = $("#grid").data("kendoGrid").dataItem(arr);
    console.log(selectedItem);

    $("#ID").val(selectedItem.ID);
    $("#MucLuongDongBaoHiemRead").val(selectedItem.MucLuongDongBaoHiem);
    $("#TyLeDongBaoHiemRead").val(selectedItem.TyLeDongBaoHiem);// gasn duwx lieeuj cho input numbertyledongbh
    if ($("#ThoiGianBatDauRead").data("kendoDatePicker")) {
        $("#ThoiGianBatDauRead").data("kendoDatePicker").value(selectedItem.ThoiGianBatDau);
    }
    if ($("#ThoiGianKetThucRead").data("kendoDatePicker")) {
        $("#ThoiGianKetThucRead").data("kendoDatePicker").value(selectedItem.ThoiGianKetThuc);
    }
    $("#CongTyDongRead").val(selectedItem.CongTyDong);
    $("#NhanVienDongRead").val(selectedItem.NhanVienDong);

    isEdit = true;

    $.ajax({
        url: '/BaoHiem/GetByID_BaoHiemXaHoi?ID_BaoHiemXaHoi=' + selectedItem.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#griNhandVien"), true);

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        BatDauApDung: { type: 'date', editable: true },
                        KetThucApDung: { type: 'date', editable: true },
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridNhanVien"), false);
         if ($(window).width() > 800) {
            $("#windowADCS").data("kendoWindow").center().open();
        } else {
            $("#windowADCS").data("kendoWindow").center().maximize().open();
        }
    });
    //$.ajax({
    //    url: '/BaoHiem/GetByNotID_BaoHiemXaHoi?ID_BaoHiemXaHoi=' + selectedItem.ID,
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    console.log(response);
    //    kendo.ui.progress($("#gridAddNhanVien"), true);

    //    var dataSource = new kendo.data.DataSource({
    //        data: response,
    //        schema: {
    //            model: {
    //                id: "ID",
    //            }
    //        },
    //        pageSize: 20,
    //    });
    //    $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
    //    kendo.ui.progress($("#gridAddNhanVien"), false);

    //    // Hiển thị cửa sổ windowADCS
    //    if ($(window).width() > 800) {
    //        $("#windowADCS").data("kendoWindow").center().open();
    //    } else {
    //        $("#windowADCS").data("kendoWindow").center().maximize().open();
    //    }
    //});
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
            ListID_HSDaCo.push(item.ID_HoSoNhanSu); // lấy thuộc tính ID_HoSoNhanSu của từng item và thêm vào bangDuLieuADCS
        })
        console.log(ListID_HSDaCo);
        console.log(pResponse);
        var result = pResponse.filter((item) => !ListID_HSDaCo.includes(item.ID)); // trả về true các item.ID không tồn tại trong ListID_HSDaCo, -> filter tạo ra mảng mới từ pResopnse dựa trên bộ lọc, lưu vào result
        console.log(result);
        var dataSource = new kendo.data.DataSource({ // khởi tạo đối tượng DataSource

            data: result,
            schema: {
                model: {
                    ID: "ID",
                }
            },
            pageSize: 20,
        });
        console.log(dataSource);
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
            ID: 0,
            ID_BaoHiemXaHoi: Number($("#ID").val()),
            ID_HoSoNhanSu: dataItem.ID,
            MaNhanVien: dataItem.MaNhanVien,
            SoDienThoai: dataItem.SoDienThoai,
            TenDayDu: dataItem.TenDayDu,
            BatDauApDung: $("#ThoiGianBatDauRead").data("kendoDatePicker").value(),
            KetThucApDung: $("#ThoiGianKetThucRead").data("kendoDatePicker").value(),
        })
    });
    var result = dataSourceAddNV.filter((item) => !listSelectedID_HSNS.includes(item.ID));
    //console.log(listSelectedID_HSNS);
    //console.log(dataSourceNV);
    //console.log(result);

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
    
    //var dataSource = new kendo.data.DataSource({

    //    data: bangDuLieuHS,
    //    schema: {
    //        model: {
    //            ID: "ID",
    //            field: {
    //                STT: { type: 'number', editable: true },
    //                TenDayDu: { type: 'string', editable: false },
    //                MaNhanVien: { type: 'string', editable: false },
    //                SoDienThoai: { type: 'string', editable: false },
    //                ID_GioiTinh: { type: 'number', editable: false },
    //                DiaChi: { type: 'string', editable: false }
    //            }
    //        }
    //    },
    //    pageSize: 20,
    //});

    //$("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

}

/*function openAddNhanVienWindow() {
    if (isEdit) {
        console.log($("#ID").val());
        $.ajax({
            url: '/HoSoNhanSu/GetByNotID_BaoHiemXaHoi?ID_BaoHiemXaHoi=' + $("#ID").val(),
            type: 'GET',
        }).done(function successCallback(response) {
            kendo.ui.progress($("#gridAddNhanVien"), true);
            parsedResponse = JSON.parse(response);
            var dataSource = new kendo.data.DataSource({
                data: parsedResponse,
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 20,
            });
            $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#gridAddNhanVien"), false);
        });
    }
    if ($(window).width() > 800) {
        $("#windowNhanVien").data("kendoWindow").center().open();
    } else {
        $("#windowNhanVien").data("kendoWindow").center().maximize().open();
    }
}*/

function Huy() {
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            //ID_NhanVien: $("#ComboNhanVien").val(),
            MucLuongDongBaoHiem: $("#MucLuongDongBaoHiem").val(),
            SDLD_BHXH: $("#SDLDBaoHiemXaHoi").val(),
            SDLD_BHYT: $("#SDLDBaoHiemYTe").val(),
            SDLD_BHTN: $("#SDLDBaoHiemThatNghiep").val(),
            SDLD_Tong: $("#SDLDTong").val(),
            SDLD_ThucTe: $("#SDLDThucTe").val(),
            NLD_BHXH: $("#NLDBaoHiemXaHoi").val(),
            NLD_BHYT: $("#NLDBaoHiemYTe").val(),
            NLD_BHTN: $("#NLDBaoHiemThatNghiep").val(),
            NLD_Tong: $("#NLDTong").val(),
            NLD_ThucTe: $("#NLDThucTe").val(),
            Tong: $("#TongTien").val(),
            GhiChu: $("#GhiChu").val(),
            MoTa: $("#MoTa").val(),
        }
        console.log(dataItem)
        $.ajax({
            url: '/BaoHiem/InsertOrUpdate_BaoHiem',
            type: 'POST',
            data: dataItem,
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                //TimKiem();
                Huy();
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function ValidateForm() {
    var validmucluong = SetValidate("MucLuongDongBaoHiem");
    var validsdldbhxh = SetValidate("SDLDBaoHiemXaHoi");
    var validsdldbhyt = SetValidate("SDLDBaoHiemYTe");
    var validsdldbhtn = SetValidate("SDLDBaoHiemThatNghiep");
    var validsdldtong = SetValidate("SDLDTong");
    var validsdldthucte = SetValidate("SDLDThucTe");
    var validnldbhxh = SetValidate("NLDBaoHiemXaHoi");
    var validnldbhyt = SetValidate("NLDBaoHiemYTe");
    var validnldbhtn = SetValidate("NLDBaoHiemThatNghiep");
    var validnldtong = SetValidate("NLDTong");
    var validnldthucte = SetValidate("NLDThucTe");
    var validtong = SetValidate("TongTien");
    var valid = validmucluong && validsdldbhxh && validsdldbhyt &&
        validsdldbhtn && validsdldtong && validsdldthucte &&
        validnldbhxh && validnldbhyt && validnldbhtn &&
        validnldtong && validnldthucte && validtong;

    console.log(valid);
    return valid;
}

function ValidateForm1() {
    var validmucluongdong = SetValidate("MucLuongDongBaoHiemRead");
    var validtyle = SetValidate("TyLeDongBaoHiemRead");
    var validngaybatdau = SetValidate("ThoiGianBatDauRead");
    var validngayketthuc = SetValidate("ThoiGianKetThucRead");
    var validcongty = SetValidate("CongTyDongRead");
    var validnhanvien = SetValidate("NhanVienDongRead");
    var valid = validmucluongdong && validtyle && validngaybatdau && validngayketthuc && validcongty && validnhanvien;

    console.log(valid);
    return valid;
}

function LuuApDung() {
    var dataSourceNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    console.log(dataSourceNhanVien);
    var listHS = [];

    $.each(dataSourceNhanVien, function (index, item) {
        var fixitem = {
            ID_BaoHiemXaHoi: $("#ID").val(),
            ID_HoSoNhanSu: item.ID,

            BatDauApDung: $("#ThoiGianBatDauRead").data("kendoDatePicker").value(),
            KetThucApDung: $("#ThoiGianKetThucRead").data("kendoDatePicker").value(),
        }
        if (item.BatDauApDung != null) {
            fixitem.BatDauApDung = item.BatDauApDung;
        }
        if (item.KetThucApDung != null) {
            fixitem.KetThucApDung = item.KetThucApDung;
        }
        if (item.BatDauApDung != null || item.KetThucApDung != null) {
            if (fixitem.BatDauApDung > fixitem.KetThucApDung) {
                openDialog(dialogRoot, "<b style='line-height:40px;'>Thời gian bắt đầu phải nhỏ hơn thời gian kết thú</b>");
                return 0;
            }
        }
        listHS.push(fixitem);
    });

    //CheckTicke(dulieuchecknhanvien, dataSave.ThoiGianBatDauThucTe, dataSave.ThoiGianKetThucThucTe, function (isTicke) {
    //    if (isTicke) {
    //        notification.show({ kValue: "Có nhân viên đã có ticke" }, "error");

    //    } else {
    console.log(listHS);
    $.ajax({
        url: '/BaoHiem/InsertOrUpdateWithHoSo',
        type: 'POST',
        data: JSON.stringify(listHS), // Chuyển đổi danh sách thành chuỗi JSON
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error(error);
        }
    }).done(function successCallback(response) {
        //response controller này trả về success và msg
        console.log(response);
        if (response.success) {
            notification.show({ kValue: response.msg }, "success");
            HuyApDung();
            LoadGridData();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}


function HuyApDung() {
    $("#windowADCS").data("kendoWindow").close();
    var grid = $("#gridNhanVien").data("kendoGrid");
    var DataSource = new kendo.data.DataSource();
    grid.setDataSource(DataSource);
}


function Xoa() {
    var grid = $("#grid").data("kendoGrid");
    if (grid.select().length > 0) {
        var selectedCount = grid.select().length;
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + selectedCount + " thông tin bảo hiểm?</b>", function () { XoaDuLieu(grid); }, function () { }
        );
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    console.log(bangDuLieu.dataSource);
    bangDuLieu.select().each(function (index, item) {
        var dataItem = bangDuLieu.dataItem(item);
        console.log(dataItem);
        var id = dataItem.ID;
        ids.push(id);
    });
    console.log(ids);
    $.ajax({
        url: '/BaoHiem/DeleteMulti_ThongTinBaoHiem?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            bangDuLieu.clearSelection();
            LoadGridData();
            //TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function enableInput() {
    const mucluong = document.getElementById("MucLuongDongBaoHiem").value;
    const ctdong = document.getElementById("CongTyDong");
    const nvdong = document.getElementById("NhanVienDong");
    if (mucluong > 0) {
        ctdong.removeAttribute("readonly");
        nvdong.removeAttribute("readonly");
    }
    else if (mucluong <= 0 || mucluong == null) {
        ctdong.setAttribute("readonly", true);
        nvdong.setAttribute("readonly", true);
    }
}

function loadGridNVData(ID_BHXH) {
    $.ajax({
        url: '/HoSoNhanSu/GetByID_BaoHiemXaHoi?ID_BaoHiemXaHoi=' + ID_BHXH,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#gridNhanVien"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                }
            },
            pageSize: 20,
        });
        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridNhanVien"), false);
    });
}

function DeleteMultiRowGridNV() {
    var grid = $("#gridNhanVien").data("kendoGrid");
    var selectedRows = grid.select();  // Lấy các dòng được chọn
    var dataSource = grid.dataSource;  // Lấy dataSource của grid

    selectedRows.each(function () {
        var dataItem = grid.dataItem(this);  // Lấy đối tượng dữ liệu của mỗi dòng
        dataSource.remove(dataItem);  // Xóa dòng khỏi dataSource
    });

    // Cập nhật lại dataSource sau khi xóa
    dataSource.sync();
}

