$(".main_container").hide();
$(document).ready(function () {
    $.ajax({
        url: '/User/GetAllUser_DangKyLichNghi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboNhanVien").kendoComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            //columns: [
            //    {
            //        field: "TenDayDu",
            //        title: "Tên đầy đủ",
            //        width: "200px",
            //    },
            //    {
            //        field: "TaiKhoan",
            //        title: "Tên tài khoản",
            //        width: "200px",
            //    },
            //],
            footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
            filter: "contains",
            filterFields: ["TenDayDu", "MaNhanVien"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                //$("#MaThuyen").val(e.dataItem.MaThuyen);
                //$("#MaToNhom").val(e.dataItem.MaToNhom);
                // Use the selected item or its text
            }
        });



        $("#Tag_NhanVien").kendoMultiSelect({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            autoClose: false,
            delay: 1000,
            dataSource: dataSource
        });

        $("#Tag_NhanVien1").kendoMultiSelect({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            autoClose: false,
            delay: 1000,
            dataSource: dataSource
        })
    });

    $.ajax({
        url: '/DanhMuc/GetAll_DanhMuc?TenBang=DanhMucNgayNghi',
        type: 'POST',
    }).done(function successCallback(response) {
        $("#ComboLoai").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            suggest: true,
            delay: 1000,
            clearButton: false,
            dataSource: {
                data: response
            },
            select: function (e) {

            }
        })
    })


    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 250;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        //editable: { mode: "incell" },
        //save: function (e) {
        //    console.log(e);
        //    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        //},
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách người giám sát";
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
        //Danh sách cột của bảng dữ liệu
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
                field: "BatDauNghi",
                title: "Bắt đầu nghỉ",
                format: "{0:dd/MM/yyyy HH:mm}",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "KetThucNghi",
                title: "Kết thúc nghỉ",
                format: "{0:dd/MM/yyyy HH:mm}",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
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
                field: "TenLoai",
                title: "Loại nghỉ phép",
                width: "200px",
                template: function (e) {
                    return "<b style='background-color:" + e.KyHieuMau + ";display: block;color: #fff; '>" + e.TenLoai + "</b>";
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
                },
                //attributes: {
                //    "class": "# if(data.Loai === 1) { # yellowbg # } else { # redbg # } #"
                //}
            },

            {
                field: "TrangThai",
                title: "Trạng thái",
                width: "150px",
                template: function (e) {
                    if (e.TrangThai == 0) {
                        return "<b style='color:black'>Chưa gửi</b>"
                    } else if (e.TrangThai == 1) {
                        return "<b style='color:blue'>Chưa duyệt</b>"
                    } else if (e.TrangThai == 2) {
                        return "<b style='color:green'>Đã duyệt</b>"
                    } else {
                        return "";
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                }
            },
            {
                field: "NguoiPhuTrach",
                title: "Phụ trách",
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
                    style: "text-align: left;",
                }
            },

        ]

    });

    $("#gridHoSo").kendoGrid({
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
        editable: true,
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào chính sách lương' style='width:50%; height:25px;float: left; position: relative;' onclick='openAddHoSoWindow()'><i class='fa fa-plus'></i></a><a class='k-button' title='Xóa nhân viên đã chọn' style='width:50%; height:25px;float: left; position: relative;' onclick='DeleteMultiRowGridHS()'><i class='fa fa-minus'></i></a>")

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
            //{
            //    field: "MaNhanVien",
            //    title: "Mã Nhân viên",
            //    width: "100px",
            //    editable: function () {
            //        return false;
            //    },
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
            //    }
            //},
            //{
            //    field: "SoDienThoai",
            //    title: "Số Điện Thoại",
            //    width: "150px",
            //    editable: function () {
            //        return false;
            //    },
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
            //    }
            //},
            //{
            //    field: "DiaChi",
            //    title: "Địa Chỉ",
            //    editable: function () {
            //        return false;
            //    },
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
            //        style: "text-align: right; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //        class: "table-header-cell"
            //    }
            //},
            /*{
                field: "BatDauApDung",
                title: "Thời gian bắt đầu",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
                editable: function () {
                    return true;
                },
                editor: function (container, options) {
                    // Tạo DatePicker trong container
                    $("<input data-bind='value:" + options.field + "' />")
                        .appendTo(container)
                        .kendoDatePicker({
                            format: "dd/MM/yyyy", // Định dạng ngày hiển thị
                            value: options.model[options.field] // Gắn giá trị ngày hiện tại
                        });
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
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
                editor: function (container, options) {
                    // Tạo DatePicker trong container
                    $("<input data-bind='value:" + options.field + "' />")
                        .appendTo(container)
                        .kendoDatePicker({
                            format: "dd/MM/yyyy", // Định dạng ngày hiển thị
                            value: options.model[options.field] // Gắn giá trị ngày hiện tại
                        });
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                }
            },*/
            {
                field: "BatDauNghi",
                title: "Thời gian bắt đầu",
                format: "{0:dd/MM/yyyy HH:mm}",
                width: "200px",
                editable: function () {
                    return true;
                },
                editor: function (container, options) {
                    // Kiểm tra nếu options hoặc field không phải là undefined
                    if (options && options.model && options.field) {
                        // Tạo DatePicker trong container
                        $("<input data-bind='value:" + options.field + "' />")
                            .appendTo(container)
                            .kendoDateTimePicker({
                                format: "dd/MM/yyyy HH:mm", // Định dạng ngày hiển thị
                                value: options.model[options.field] || null // Gắn giá trị ngày hiện tại (hoặc null nếu không có giá trị)
                            });
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "KetThucNghi",
                title: "Thời gian kết thúc",
                format: "{0:dd/MM/yyyy HH:mm}",
                width: "200px",
                editable: function () {
                    return true;
                },
                editor: function (container, options) {
                    // Kiểm tra nếu options hoặc field không phải là undefined
                    if (options && options.model && options.field) {
                        // Tạo DatePicker trong container
                        $("<input data-bind='value:" + options.field + "' />")
                            .appendTo(container)
                            .kendoDateTimePicker({
                                format: "dd/MM/yyyy HH:mm", // Định dạng ngày hiển thị
                                value: options.model[options.field] || null // Gắn giá trị ngày hiện tại (hoặc null nếu không có giá trị)
                            });
                    }
                },
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%");
                        }
                    }
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                }
            },
            {
                field: "Loai", // Tên field để bind giá trị
                title: "Loại nghỉ",
                width: "200px",
                template: function (dataItem) {
                    return dataItem.LoaiNghiText || "Chưa chọn";
                    // Hiển thị tên loại nghỉ hoặc giá trị mặc định nếu chưa chọn
                },
                editor: function (container, options) {
                    // Tạo input trong container để khởi tạo DropDownList
                    $("<input data-bind='value:" + options.field + "'/>")
                        .appendTo(container)
                        .kendoDropDownList({
                            optionLabel: "Chọn loại nghỉ", // Văn bản hiển thị mặc định
                            dataTextField: "text", // Hiển thị tên trong danh sách
                            dataValueField: "value", // Giá trị thực tế
                            dataSource: {
                                transport: {
                                    read: {
                                        url: '/DanhMuc/GetAll_DanhMuc?TenBang=DanhMucNgayNghi',
                                        type: 'POST',
                                        dataType: 'json'
                                    }
                                }
                            },
                            change: function (e) {
                                var dropdownlist = this;
                                var selectedItem = dropdownlist.dataItem();

                                // Gắn giá trị hiển thị (nếu cần lưu thêm text)
                                options.model.set("LoaiNghiText", selectedItem ? selectedItem.text : "");
                            }
                        });
                },
                filterable: false, // Không áp dụng bộ lọc
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-center"
                }
            }

        ]

    });
    $("#gridAddHoSo").kendoGrid({
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
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
            {
                field: "DienThoai",
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
                },
                attributes: {
                    style: "text-align: center;"
                }
            },            {
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
                },
                attributes: {
                    style: "text-align: center;"
                }
            },
        ]
    });

    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        open: function () {
            //console.log($("#ComboNhanVien").data("kendoComboBox"));
            //console.log(ID_TaiKhoan);
            if (Role == 3) {
                $("#ComboNhanVien").data("kendoComboBox").value(ID_TaiKhoan);
            }
        },
        actions: [
            "Close"
        ]
    });
    $("#windowAddMulti").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Danh sách hồ sơ",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowAddHoSo").kendoWindow({
        width: "800",
        height: "500",
        title: "Danh sách hồ sơ",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    $("#BatDauNghi").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        dateInput: true
    });
    $("#KetThucNghi").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        dateInput: true
    });

    $("#BatDauNghi").data("kendoDateTimePicker")._dateInput.setOptions({
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

    $("#KetThucNghi").data("kendoDateTimePicker")._dateInput.setOptions({
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

    //LoadGridData();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})


function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#ID").val(selectedItem.ID);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#ComboLoai").data("kendoComboBox").value(selectedItem.Loai);
        $("#ComboNhanVien").data("kendoComboBox").value(selectedItem.ID_TaiKhoan);
        $("#BatDauNghi").data("kendoDateTimePicker").value(selectedItem.BatDauNghi);
        $("#KetThucNghi").data("kendoDateTimePicker").value(selectedItem.KetThucNghi);
        $("#Tag_NhanVien").data("kendoMultiSelect").value(selectedItem.Tag_NhanVien);
        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}


function LoadGridData() {
    $.ajax({
        url: "/DangKyLichNGhi/GetDangKyLichNghiByDate"
            + "?from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        BatDauNghi: {
                            type: 'date', editable: false
                        },
                        KetThucNghi: {
                            type: 'date', editable: false
                        },
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
    //Huy();
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}
function ThemNhieu() {
    //Huy();
    if ($(window).width() > 800) {
        $("#windowAddMulti").data("kendoWindow").center().open();
    } else {
        $("#windowAddMulti").data("kendoWindow").center().maximize().open();
    }
}
function GuiYeuCau() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để gửi");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $.ajax({
            url: '/DangKyLichNghi/UpdateTrangThai_DangKyLichNghi',
            type: 'POST',
            data: {
                ID: selectedItem.ID,
                TrangThai: 1
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function DuyetYeuCau() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để gửi");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $.ajax({
            url: '/DangKyLichNghi/UpdateTrangThai_DangKyLichNghi',
            type: 'POST',
            data: {
                ID: selectedItem.ID,
                TrangThai: 2,
                NgayPheDuyet: kendo.toString(new Date, 'yyyy-MM-dd HH:mm')
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}


function ValidateForm() {
    var validnhanvien = SetValidate("ComboNhanVien");
    var validkt = SetValidate("KetThucNghi");
    var validbd = SetValidate("BatDauNghi");
    var validloai = SetValidate("ComboLoai");
    var valid = validnhanvien && validbd && validkt && validloai;
    return valid;

}


function Luu() {

    if (ValidateForm()) {

        $.ajax({
            url: '/DangKyLichNghi/InsertOrUpdate_DangKyLichNghi',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                Loai: $("#ComboLoai").data("kendoComboBox").value(),
                TenLoai: $("#ComboLoai").data("kendoComboBox").text(),
                ID_TaiKhoan: $("#ComboNhanVien").data("kendoComboBox").value(),
                TenDayDu: $("#ComboNhanVien").data("kendoComboBox").text(),
                TrangThai: 0,
                Tag_NhanVien: $("#Tag_NhanVien").data("kendoMultiSelect").value(),
                GhiChu: $("#GhiChu").val(),
                BatDauNghi: kendo.toString($("#BatDauNghi").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm'),
                KetThucNghi: kendo.toString($("#KetThucNghi").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm'),
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function LuuVaGui() {

    if (ValidateForm()) {

        $.ajax({
            url: '/DangKyLichNghi/InsertOrUpdate_DangKyLichNghi',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                Loai: $("#ComboLoai").data("kendoComboBox").value(),
                TenLoai: $("#ComboLoai").data("kendoComboBox").text(),
                ID_TaiKhoan: $("#ComboNhanVien").data("kendoComboBox").value(),
                TenDayDu: $("#ComboNhanVien").data("kendoComboBox").text(),
                TrangThai: 1,
                Tag_NhanVien: $("#Tag_NhanVien").data("kendoMultiSelect").value(),
                GhiChu: $("#GhiChu").val(),
                BatDauNghi: kendo.toString($("#BatDauNghi").data("kendoDateTimePicker").value(), 'yyyy-MM-dd hh:mm'),
                KetThucNghi: kendo.toString($("#KetThucNghi").data("kendoDateTimePicker").value(), 'yyyy-MM-dd hh:mm'),
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                LoadGridData();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}




function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}
function HuyAddHS() {
    document.getElementById("formChiTiet1").reset();
    $("#windowAddMulti").data("kendoWindow").close();
    var grid = $("#gridHoSo").data("kendoGrid");
    var DataSource = new kendo.data.DataSource();
    grid.setDataSource(DataSource);
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " người giám sát?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
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
        url: '/NghiPhep/DeleteMutli_NghiPhep?ID=' + ids.join(','),
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
function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function openAddHoSoWindow() {
    $.ajax({
        /*url: '/HoSoNhanSu/GetAll',*/
        url: '/User/GetAllUser_DangKyLichNghi',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        //pResponse = JSON.parse(response); // chuyển đổi respon thành JSON và gán tên biến pResponse
        kendo.ui.progress($("#gridAddHoSo"), true);
        var bangDuLieuADCS = $("#gridHoSo").data("kendoGrid").dataSource.data();  //tạo biến lưu data có trong #gridNhanVien
        var ListID_HSDaCo = [];
        $.each(bangDuLieuADCS, function (index, item) {  //hàm $.(each) lặp qua tất cả các phần tử của bangDuLieuADCS thông qua index(chỉ số của phần tử) và item(đối tượng hiện tại từ bangDuLieuADCS)
            ListID_HSDaCo.push(item.ID_HoSoNhanSu); // lấy thuộc tính ID_HoSoNhanSu của từng item và thêm vào bangDuLieuADCS
        })
        console.log(ListID_HSDaCo);
        var result = response.filter((item) => !ListID_HSDaCo.includes(item.ID)); // trả về true các item.ID không tồn tại trong ListID_HSDaCo, -> filter tạo ra mảng mới từ pResopnse dựa trên bộ lọc, lưu vào result
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
        $("#gridAddHoSo").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddHoSo"), false);
        if ($(window).width() > 800) {
            $("#windowAddHoSo").data("kendoWindow").center().open();
        } else {
            $("#windowAddHoSo").data("kendoWindow").center().maximize().open();
        }
    });
}

function loadGridHSData(ID_BHXH) {
    $.ajax({
        url: '/HoSoNhanSu/GetByID_BaoHiemXaHoi?ID_BaoHiemXaHoi=' + ID_BHXH,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        kendo.ui.progress($("#gridHoSo"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                }
            },
            pageSize: 20,
        });
        $("#gridHoSo").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHoSo"), false);
    });
}

function DeleteMultiRowGridHS() {
    var gridHS = $("#gridHoSo").data("kendoGrid");
    var selectedRows = gridHS.select();  // Lấy các dòng được chọn
    var PristineDatasource = gridHS.dataSource._pristineData
    var listID_HS = []
    selectedRows.each(function () {
        var dataItem = gridHS.dataItem(this);
        listID_HS.push(dataItem.ID_HoSoNhanSu)
    });

    var result = PristineDatasource.filter((item) => !listID_HS.includes(item.ID_HoSoNhanSu));
    var newDataSourceHS = new kendo.data.DataSource({
        data: result,
        schema: {
            model: {
                ID: "ID",
            }
        },
        pageSize: 20,
    });
    gridHS.setDataSource(newDataSourceHS);
}

function LuuAddHoSo() {
    var gridAddHoSo = $("#gridAddHoSo").data("kendoGrid");
    var gridHoSo = $("#gridHoSo").data("kendoGrid");
    var dataSourceAddHS = gridAddHoSo.dataSource._pristineData;
    var dataSourceHS = gridHoSo.dataSource._pristineData;
    var listSelectedID_HSNS = [];
    gridAddHoSo.select().each(function (index, item) {
        dataItem = gridAddHoSo.dataItem(item);

        listSelectedID_HSNS.push(dataItem.ID);
        dataSourceHS.push({
            ID: 0,
            ID_BaoHiemXaHoi: Number($("#ID").val()),
            ID_HoSoNhanSu: dataItem.ID,
            MaNhanVien: dataItem.MaNhanVien,
            SoDienThoai: dataItem.SoDienThoai,
            TenDayDu: dataItem.TenDayDu,
        })

    });
    var result = dataSourceAddHS.filter((item) => !listSelectedID_HSNS.includes(item.ID));
    //console.log(listSelectedID_HSNS);
    //console.log(dataSourceNV);
    //console.log(result);

    var newDataSourceAddHS = new kendo.data.DataSource({
        data: result,
        schema: {
            model: {
                ID: "ID",
            }
        },
        pageSize: 20,
    });

    var newDataSourceHS = new kendo.data.DataSource({
        data: dataSourceHS,
        schema: {
            model: {
                ID: "ID",
            }
        },
        pageSize: 20,
    });
    gridHoSo.setDataSource(newDataSourceHS);
    gridAddHoSo.setDataSource(newDataSourceAddHS);
    $("#windowAddHoSo").data("kendoWindow").close();

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
function LuuMulti() {
    var dataSourceHoSo = $("#gridHoSo").data("kendoGrid").dataSource.data();
    console.log(dataSourceHoSo);
    var listHS = [];

    $.each(dataSourceHoSo, function (index, item) {
        var fixitem = {
            ID: 0,
            ID_TaiKhoan: item.ID_HoSoNhanSu,
            TenDayDu: item.TenDayDu,

            BatDauNghi: null, // Khởi tạo với null
            KetThucNghi: null, // Khởi tạo với null
            Loai: item.Loai.value,
            TrangThai: 0,
            Tag_NhanVien: $("#Tag_NhanVien1").data("kendoMultiSelect").value(),
            GhiChu: "",
        };
        if (item.BatDauNghi != null) {
            fixitem.BatDauNghi = kendo.toString(item.BatDauNghi, "yyyy/MM/dd");
        }
        if (item.KetThucNghi != null) {
            fixitem.KetThucNghi = kendo.toString(item.KetThucNghi, "yyyy/MM/dd");
        }

        if (fixitem.BatDauNghi || fixitem.KetThucNghi) {
            if (fixitem.BatDauNghi > fixitem.KetThucNghi) {
                openDialog(dialogRoot, "<b style='line-height:40px;'>Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc</b>");
                return false;
            }
        }
        listHS.push(fixitem);
    });

    console.log(listHS);
    $.ajax({
        url: '/DangKyLichNghi/MultiInsert',
        type: 'POST',
        data: {
            list: listHS,
           
        },
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
            HuyAddHS();
            LoadGridData();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function LuuMultiVaGui() {
    var dataSourceHoSo = $("#gridHoSo").data("kendoGrid").dataSource.data();
    console.log(dataSourceHoSo);
    var listHS = [];

    $.each(dataSourceHoSo, function (index, item) {
        var fixitem = {
            ID: 0,
            ID_TaiKhoan: item.ID_HoSoNhanSu,
            TenDayDu: item.TenDayDu,

            BatDauNghi: null, // Khởi tạo với null
            KetThucNghi: null, // Khởi tạo với null
            Loai: item.Loai.value,
            TrangThai: 1,
            Tag_NhanVien: $("#Tag_NhanVien1").data("kendoMultiSelect").value(),
            GhiChu: "",
        };
        if (item.BatDauNghi != null) {
            fixitem.BatDauNghi = kendo.toString(item.BatDauNghi, "yyyy/MM/dd");
        }
        if (item.KetThucNghi != null) {
            fixitem.KetThucNghi = kendo.toString(item.KetThucNghi, "yyyy/MM/dd");
        }

        if (fixitem.BatDauNghi || fixitem.KetThucNghi) {
            if (fixitem.BatDauNghi > fixitem.KetThucNghi) {
                openDialog(dialogRoot, "<b style='line-height:40px;'>Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc</b>");
                return false;
            }
        }
        listHS.push(fixitem);
    });

    console.log(listHS);
    $.ajax({
        url: '/DangKyLichNghi/MultiInsert',
        type: 'POST',
        data: {
            list: listHS,

        },
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
            HuyAddHS();
            LoadGridData();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}