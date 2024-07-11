$(".main_container").hide();
var itemToSelect = [];
var selectUID = [];
var selectdNhanVien = [];
var listGridSelected = [];
$(document).ready(function () {
    $("#Ngay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(),
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
        height: function () {
            var height = $(window).height() - 220;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            //record = 0;
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
                field: "NgayTao",
                title: "Ngày tạo",
                format: "{0:dd/MM/yyyy}",
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
                field: "NgayLamViec",
                title: "Ngày làm việc",
                format: "{0:dd/MM/yyyy}",
                width: "180px",
                //filterable: {
                //    cell: {
                //        operator: "contains",
                //        showOperators: false,
                //        template: function (e) {
                //            e.element.addClass("k-textbox").css("width", "100%")
                //        }
                //    }
                //},
                filterable: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenCongViec",
                title: "Nội dung công việc",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return e.TenCongViec;
                    } else {
                        return e.TenCongViecThucTe;
                    }
                },
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
                field: "DiaDiem",
                title: "Địa điểm",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                    class: "table-header-cell"
                }
            },

            {
                title: "Kế hoạch",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "To_SoNguoiDuKien",
                        title: "Tổ/số đò",
                        template: function (e) {
                            return e.To_SoNguoiDuKien
                        },
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
                        field: "SlgDK",
                        title: "Số lượng người",
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
                        field: "ThoiGianDuKien",
                        title: "Thời gian",
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
                ]
            },
            {
                title: "Thực tế",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "To_SoNguoiThucTe",
                        title: "Tổ/số đò",
                        template: function (e) {
                            return e.To_SoNguoiThucTe
                        },
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
                        field: "SlgTT",
                        title: "Số lượng người",
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
                        field: "ThoiGianThucTe",
                        title: "Thời gian",
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
                ]
            },
            {
                title: "Chênh lệch",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "SlgCL",
                        title: "Số lượng người",
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
                        field: "CongCL",
                        title: "Số lượng công",
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
                    class: "table-header-cell"
                }
            }

        ]

    });
    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết phân công",
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
        title: "Chi tiết phân công",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#NgayLamViec").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,
        change: function () {
            let ngay = $("#NgayLamViec").data("kendoDatePicker").value();

            var ThoiGianBatDauDuKien = $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value() ?? ngay;
            ngay.setHours(ThoiGianBatDauDuKien.getHours());
            ngay.setMinutes(ThoiGianBatDauDuKien.getMinutes());
            $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(ngay);

            var ThoiGianKetThucDuKien = $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value() ?? ngay;
            ngay.setHours(ThoiGianKetThucDuKien.getHours());
            ngay.setMinutes(ThoiGianKetThucDuKien.getMinutes());
            $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(ngay);
        }
    })
    $("#NgayLamViec").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#ThoiGianBatDauDuKien").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker")._dateInput.setOptions({
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
    $("#ThoiGianKetThucDuKien").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker")._dateInput.setOptions({
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
    $("#ThoiGianBatDauThucTe").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianBatDauThucTe").data("kendoDateTimePicker")._dateInput.setOptions({
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
    $("#ThoiGianKetThucThucTe").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianKetThucThucTe").data("kendoDateTimePicker")._dateInput.setOptions({
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

    $("#NgayLamViecDK").kendoDatePicker({
        format: "dd/MM/yyyy",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#NgayLamViecDK").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#ThoiGianBatDauDuKienDK").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianBatDauDuKienDK").data("kendoDateTimePicker")._dateInput.setOptions({
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
    $("#ThoiGianKetThucDuKienDK").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianKetThucDuKienDK").data("kendoDateTimePicker")._dateInput.setOptions({
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
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem.TrangThai == 2) {
            openUpdateWindow();
        } else {
            openEditWindow();
        }
    })
    $("#gridNhanVien").kendoGrid({
        height: function () {
            var height = 300;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    ID: "ID",
                    field: {
                        Cong: {
                            type: 'number',
                            editable: true
                        }
                    }
                }
            }
        }),
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
        editable: true,
        pageable: pageableShort,
        dataBinding: function () {
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        columns: [

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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên được phân công' style='width:100%; height:25px;' onclick='openAddNhanVienToNhomWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                field: "Cong",
                title: "Công",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "SoDienThoai",
                title: "Số điện thoại",
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
                field: "CoTicke",
                title: "Đã có ticke",
                template: function (e) {
                    if (e.CoTicke > 0) {
                        return "<b style='color:red'>Đã có </b>";
                    } else {
                        return "";
                    }
                },
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
                title: "",
                width: "100px",
                template: function (e) {
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
    $("#gridNhanVienDK").kendoGrid({
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
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        columns: [

            {
                title: "STT",
                field: "MaNhanVien",
                filterable: false,
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
                field: "SoDienThoai",
                title: "Số điện thoại",
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
                field: "Cong",
                title: "Công",
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
                    style: "text-align: center;",
                }
            },
        ]

    });
    $("#gridNhanVienThucTe").kendoGrid({
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
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        columns: [
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên được phân công' style='width:100%; height:25px;' onclick='openAddNhanVienToNhomWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                field: "SoDienThoai",
                title: "Số điện thoại",
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
                field: "Cong",
                title: "Công",
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
                    style: "text-align: center;",
                }
            },
            //{
            //    field: "CoTicke",
            //    title: "Đã có ticke",
            //    template: function (e) {
            //        if (e.CoTicke > 0) {
            //            return "<b style='color:red'>Đã có </b>";
            //        }
            //    },
            //    width: "150px",
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
            //        style: "text-align: center;",
            //    }
            //},
            {
                title: "",
                width: "150px",
                template: function (e) {
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
            var height = 500;
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
        groupable: true,
        pageable: pageableShort,
        dataBinding: function () {
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        //change: function (e) {
        //    selecteditems = e.sender.select();
        //    console.log('onchange');
        //    if (selecteditems.length > 0) {

        //        listIDTo = [];
        //        toalowcheck = [];
        //        uids = selectUID;
        //        $.each($("input[data-role=chonto]"), function (index, item) {
        //            listIDTo.push(item.id);
        //        });

        //        $.each(selecteditems, function (index, item) {
        //            var data = e.sender.dataItem(item);
        //            uids.push(data.uid);
        //            if (data.TenToNhom != null) {
        //                if (toalowcheck.indexOf(data.TenToNhom) < 0) {
        //                    toalowcheck.push(data.TenToNhom);
        //                }
        //                document.getElementById(data.TenToNhom).checked = true;
        //            }
        //            else {
        //                if (toalowcheck.indexOf('to0') < 0) {
        //                    toalowcheck.push('to0');
        //                }
        //                document.getElementById('to0').checked = true;
        //            }
        //        })

        //        $.each(listIDTo, function (index, item) {
        //            if (toalowcheck.indexOf(item) < 0) {
        //                document.getElementById(item).checked = false;
        //            }
        //        })
        //    }
        //},
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
                field: "TenToNhom",
                groupHeaderTemplate: function (e) {
                    var item = {
                        TenToNhom: e.value,
                        items: e.items
                    };
                    itemToSelect.push(item);
                    if (e.value == null) {
                        return '<input type="checkbox" data-role="chonto" id="to0" class="k-checkbox" onchange="selectTo(this,null)">   <label class="k-checkbox-label" for="to0"> Không thuộc tổ </label>';

                    } else {
                        return '<input type="checkbox" data-role="chonto" id="' + e.value + '" class="k-checkbox" onchange="selectTo(this,\'' + e.value + '\')">   <label class="k-checkbox-label" for="' + e.value + '"> ' + e.value + '</label>';
                    }
                },
                title: "Tên tổ",
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

    //$("#gridAddNhanVien tbody").on("click", "tr", function (e) {

    //    var rowElement = this;
    //    var row = $(rowElement);
    //    var grid = $("#gridAddNhanVien").getKendoGrid();

    //    if (row.hasClass("k-state-selected")) {

    //        var selected = grid.select();

    //        selected = $.grep(selected, function (x) {
    //            var itemToRemove = grid.dataItem(row);
    //            var currentItem = grid.dataItem(x);

    //            return itemToRemove.ID != currentItem.ID
    //        })

    //        grid.clearSelection();

    //        grid.select(selected);

    //        e.stopPropagation();
    //    } else {
    //        grid.select(row)

    //        e.stopPropagation();
    //    }
    //});

    $("#gridAddNhanVienToNhom").kendoGrid({
        height: function () {
            var height = 500;
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
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
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
                field: "TenToNhom",
                title: "Tên tổ",
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
                field: "MaToNhom",
                title: "Mã tổ",
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
                field: "GhiChu",
                title: "Số nhân viên đã từng làm",
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
        ]

    });


    $("#windowNhanVien").kendoWindow({
        width: "90%",
        height: "600",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowNhanVienToNhom").kendoWindow({
        width: "90%",
        height: "600",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
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

                $("#Cong").val(e.dataItem.Cong);
                $("#ThoiGianDuKien").val(e.dataItem.ThoiGian);


                // Use the selected item or its text
            }
        })
        $("#ComboCongViecThucTe").kendoMultiColumnComboBox({
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
                $("#CongThucTe").val(e.dataItem.Cong);
                $("#ThoiGianThucTe").val(e.dataItem.ThoiGian);
                // Use the selected item or its text
            }
        })
    });
    $.ajax({
        url: '/NguoiGiamSat/GetAllNguoiGiamSat',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#ComboNguoiGiamSat").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "DienThoai",
                    title: "Số điện thoại",
                    width: "200px",
                },
                {
                    field: "DiaDiemLamViec",
                    title: "Địa điểm làm việc",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenDayDu", "DienThoai", "DiaDiemLamViec"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                // Use the selected item or its text
            }
        })
        $("#ComboNguoiGiamSatThucTe").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "DienThoai",
                    title: "Số điện thoại",
                    width: "200px",
                },
                {
                    field: "DiaDiemLamViec",
                    title: "Địa điểm làm việc",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenDayDu", "DienThoai", "DiaDiemLamViec"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                // Use the selected item or its text
            }
        })
    });
    //LoadGridData();
    //TimKiem();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

function selectTo(tag, TenToNhom) {
    var checked = document.getElementById(tag.id).checked;

    //var select = [];
    if (checked) {
        $.each(itemToSelect, function (index, item) {
            if (item.TenToNhom == TenToNhom) {
                $.each(item.items, function (idx, itm) {
                    selectUID.push(itm.uid);
                    //select.push(itm.uid);
                })
            }
        })
    }
    else {
        $.each(itemToSelect, function (index, item) {
            if (item.TenToNhom == TenToNhom) {
                $.each(item.items, function (idx, itm) {
                    let index = selectUID.indexOf(itm.uid);
                    if (index > -1) {
                        selectUID.splice(index, 1);
                    }
                })
            }
        })
    }
    var grid = $("#gridAddNhanVien").data("kendoGrid");
    var selectedItem = grid.select();

    refreshCheckBox(selectUID);
    //grid.clearSelection();
    //$.each(selectUID, function (index, item) {
    //    grid.select("tr[data-uid='" + item + "']");
    //})
    //console.log(selectItems);   
}

function refreshCheckBox(uids) {
    var grid = $("#gridAddNhanVien").data("kendoGrid");
    grid.clearSelection();
    $.each(uids, function (index, item) {
        grid.select("tr[data-uid='" + item + "']");
    })
}


function detailInit(e) {
    console.log(e.data);
    var detailRow = e.detailRow;
    var lstNhanVienChuaPhanCong = [];
    console.log(lstNhanVienChuaPhanCong);
    $.each(e.data.lstNhanVienChuaPhanCong, function (index, item) {
        lstNhanVienChuaPhanCong.push({
            ID: item.ID,
            MaThuyen: item.MaThuyen,
            TenToNhom: item.TenToNhom,
            MaToNhom: item.MaToNhom,
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            MaNhanVien: item.MaNhanVien,
            CoLichSuLamViec: item.CoLichSuLamViec,
            ThoiGianLamViec: item.ThoiGianLamViec,
            Checkin: item.Checkin,
            Checkout: item.Checkout
        })
    })
    var dataSource = new kendo.data.DataSource({
        data: lstNhanVienChuaPhanCong,
        schema: {
            model: {
                id: "ID",
                fields: {
                    NgaySinh: {
                        type: 'date'
                    },
                    ThoiGianLamViec: {
                        type: 'date'
                    },
                    Checkin: {
                        type: 'date'
                    },
                    Checkout: {
                        type: 'date'
                    }
                }
            }
        },
        //pageSize: 20,
    });
    detailRow.find(".orders").kendoGrid({
        dataSource: dataSource,
        persistSelection: true,
        resizable: true,
        //pageable: pageableShort,
        sortable: true,
        filterable: {
            mode: "row",
        },
        scrollable: true,
        change: function (e) {
            var selecteditems = e.sender.select()
            var selecteddata = [];
            var rowElement = this;
            var row = $(rowElement);
            $.each(selecteditems, function (index, item) {
                var data = e.sender.dataItem(item);
                if (selectdNhanVien.indexOf(data) < 0) {
                    selectdNhanVien.push(data);
                }
                selecteddata.push(data)
            });
            let intersection = selectdNhanVien.filter(x => selecteddata.includes(x));
            $.each(selectdNhanVien, function (index, item) {
                var data = e.sender.dataItem(e.sender.select());
                if (data.MaToNhom != null) {
                    if (data.MaToNhom != item.MaToNhom) {
                        intersection.push(item);
                    }
                }
            });
            selectdNhanVien = intersection;
            //selectdNhanVien = $.grep(selectdNhanVien, function (x) {

            //    var itemToRemove = e.sender.dataItem(row);
            //    var currentItem = x;

            //    if (x.MaToNhom == itemToRemove.MaToNhom) {
            //        return itemToRemove.ID != currentItem.ID
            //    } else {
            //        return true
            //    }

            //})



            //Kết quả sẽ ra array nhân viên đã chọn ở các grid con => selectdNhanVien;
            //Ok chưa e?
            console.log(selectdNhanVien);
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
                field: "MaToNhom",
                title: "Mã tổ",
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
                field: "CoLichSuLamViec",
                title: "Có kinh nghiệm",
                template: function (e) {
                    if (e.CoLichSuLamViec > 0) {
                        return "<span style='color:green' class='fa fa-check'></span>"
                    } else {
                        return "";
                    }
                },
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
                field: "Checkin",
                title: "Checkin",
                template: function (e) {
                    if (e.Checkin.getFullYear() > 1900) {
                        return kendo.toString(e.Checkin, "HH:mm:ss");
                    } else {
                        return "";
                    }
                },
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
                field: "Checkout",
                title: "Checkout",
                template: function (e) {
                    if (e.Checkout.getFullYear() > 1900) {
                        return kendo.toString(e.Checkin, "HH:mm:ss");
                    } else {
                        return "";
                    }
                },
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
                field: "ThoiGianLamViec",
                title: "Thời gian làm việc",
                template: function (e) {
                    if (e.ThoiGianLamViec.getFullYear() == 1900) {
                        return kendo.toString(e.ThoiGianLamViec, "HH:mm:ss");
                    } else {
                        return "";
                    }
                },
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
    })

}

function quickUpdate() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length == 0) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn ít nhất 1 bản ghi để thực hiện");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var lstselected = $("#grid").data("kendoGrid").select();
        var success = true;
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xác nhận công cho " + lstselected.length + " công việc?</b>", function () {
            kendo.ui.progress($("body"), true);
            $.each(lstselected, function (index, item) {
                var selectedItem = grid.dataItem(item);
                if (selectedItem.TrangThai != 2) {
                    var bangDuLieuNhanVienKeHoach = [];
                    $.each(selectedItem.lstNhanVien, function (index, item) {
                        bangDuLieuNhanVienKeHoach.push({
                            ID_NhanVien: item.ID,
                            Cong: item.Cong,
                            TrangThai: 1,
                        });
                    });
                    var dataSave = {
                        ID: selectedItem.ID,
                        GhiChu: "",
                        NgayLamViec: kendo.toString(selectedItem.NgayLamViec, 'yyyy-MM-dd HH:mm:ss'),
                        TrangThai: 2,
                        DiaDiem: selectedItem.DiaDiem,
                        ID_CongViec: selectedItem.ID_CongViec,
                        TenCongViec: selectedItem.TenCongViec,
                        Cong: selectedItem.Cong,
                        SoNguoiDuKien: selectedItem.SoNguoiDuKien,
                        ThoiGianDuKien: selectedItem.ThoiGianDuKien,
                        ThoiGianBatDauDuKien: kendo.toString(selectedItem.ThoiGianBatDauDuKien, 'yyyy-MM-dd HH:mm:ss'),
                        ThoiGianKetThucDuKien: kendo.toString(selectedItem.ThoiGianKetThucDuKien, 'yyyy-MM-dd HH:mm:ss'),
                        ID_NguoiGiamSat: selectedItem.ID_NguoiGiamSat,
                        NguoiGiamSat: selectedItem.NguoiGiamSat,
                        ID_CongViecThucTe: selectedItem.ID_CongViec,
                        TenCongViecThucTe: selectedItem.TenCongViec,
                        CongThucTe: selectedItem.Cong,
                        ThoiGianThucTe: selectedItem.ThoiGianDuKien,
                        SoNguoiThucTe: bangDuLieuNhanVienKeHoach.length,
                        ID_NguoiGiamSatThucTe: selectedItem.ID_NguoiGiamSat,
                        NguoiGiamSatThucTe: selectedItem.NguoiGiamSat,
                        ThoiGianBatDauThucTe: kendo.toString(selectedItem.ThoiGianBatDauDuKien, 'yyyy-MM-dd HH:mm:ss'),
                        ThoiGianKetThucThucTe: kendo.toString(selectedItem.ThoiGianKetThucDuKien, 'yyyy-MM-dd HH:mm:ss'),
                        lstNhanVienKeHoach: bangDuLieuNhanVienKeHoach

                    };
                    $.ajax({
                        url: '/KeHoach/InsertOrUpdate_KeHoach',
                        type: 'POST',
                        data: dataSave,
                    }).done(function successCallback(response) {
                        if (response.success) {
                            //notification.show({ kValue: response.msg }, "success");
                            //Huy();
                            if (index == lstselected.length - 1) {
                                kendo.ui.progress($("body"), false);
                                TimKiem();
                            }
                        } else {
                            notification.show({ kValue: response.msg }, "error");
                        }
                    });
                }
            })

        }, function () { });

    }
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem.TrangThai == 2) {
            $("#btnSave").hide();
            openUpdateWindow();
        } else {
            $("#btnSave").show();
            console.log(selectedItem);
            $("#ID").val(selectedItem.ID);
            $("#ComboCongViec").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
            $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
            $("#TenCongViec").val(selectedItem.TenCongViec);
            $("#Cong").val(selectedItem.Cong);
            $("#NgayLamViec").data("kendoDatePicker").value(selectedItem.NgayLamViec);
            $("#ThoiGianDuKien").val(selectedItem.ThoiGianDuKien);
            $("#GhiChu").val(selectedItem.GhiChu);
            $("#DiaDiem").val(selectedItem.DiaDiem);
            $("#SoNguoiDuKien").val(selectedItem.SoNguoiDuKien);
            $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(selectedItem.ThoiGianBatDauDuKien);
            $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(selectedItem.ThoiGianKetThucDuKien);

            var dataS = []
            for (var i = 0; i < selectedItem.lstNhanVien.length; i++) {
                if (selectedItem.lstNhanVien[i].TrangThai == 0) {
                    dataS.push(selectedItem.lstNhanVien[i])
                }
            }
            var dataSource = new kendo.data.DataSource({
                data: dataS,
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
                //pageSize: 20,
            });

            $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

            if ($(window).width() > 800) {
                $("#window").data("kendoWindow").center().open();
            } else {
                $("#window").data("kendoWindow").center().maximize().open();
            }
        }

    }

}

function openCopyWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sao chép");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $("#btnSave").show();
        console.log(selectedItem);
        //$("#ID").val(selectedItem.ID);
        $("#ComboCongViec").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
        $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
        $("#TenCongViec").val(selectedItem.TenCongViec);
        $("#Cong").val(selectedItem.Cong);
        $("#NgayLamViec").data("kendoDatePicker").value(new Date());
        $("#ThoiGianDuKien").val(selectedItem.ThoiGianDuKien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DiaDiem").val(selectedItem.DiaDiem);
        $("#SoNguoiDuKien").val(selectedItem.SoNguoiDuKien);
        var ThoiGianBatDauDuKien = new Date();
        ThoiGianBatDauDuKien.setHours(selectedItem.ThoiGianBatDauDuKien.getHours());
        ThoiGianBatDauDuKien.setMinutes(selectedItem.ThoiGianBatDauDuKien.getMinutes());
        var ThoiGianKetThucDuKien = new Date();
        ThoiGianKetThucDuKien.setHours(selectedItem.ThoiGianKetThucDuKien.getHours());
        ThoiGianKetThucDuKien.setMinutes(selectedItem.ThoiGianKetThucDuKien.getMinutes());
        $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(ThoiGianBatDauDuKien);
        $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(ThoiGianKetThucDuKien);

        var dataS = []
        for (var i = 0; i < selectedItem.lstNhanVien.length; i++) {
            if (selectedItem.lstNhanVien[i].TrangThai == 0) {
                dataS.push(selectedItem.lstNhanVien[i])
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: dataS,
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
            //pageSize: 20,
        });

        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }


    }
}

function openUpdateWindow() {
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
        if (selectedItem.TrangThai == 2) {
            $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViecThucTe);
            $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSatThucTe);
            $("#TenCongViecThucTe").val(selectedItem.TenCongViecThucTe);
            $("#CongThucTe").val(selectedItem.CongThucTe);
            $("#ThoiGianThucTe").val(selectedItem.ThoiGianThucTe);
            $("#ThoiGianBatDauThucTe").data("kendoDateTimePicker").value(selectedItem.ThoiGianBatDauThucTe);
            $("#ThoiGianKetThucThucTe").data("kendoDateTimePicker").value(selectedItem.ThoiGianKetThucThucTe);
            $("#btnUpdate").hide();
        } else {
            $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
            $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
            $("#TenCongViecThucTe").val(selectedItem.TenCongViec);
            $("#CongThucTe").val(selectedItem.Cong);
            $("#ThoiGianThucTe").val(selectedItem.ThoiGianDuKien);
            $("#ThoiGianBatDauThucTe").data("kendoDateTimePicker").value(selectedItem.ThoiGianBatDauDuKien);
            $("#ThoiGianKetThucThucTe").data("kendoDateTimePicker").value(selectedItem.ThoiGianKetThucDuKien);
            $("#btnUpdate").show();
        }
        $("#IDUpdate").val(selectedItem.ID);
        $("#TenCongViecDK").val(selectedItem.TenCongViec);
        $("#NguoiGiamSatDK").val(selectedItem.NguoiGiamSat);
        $("#CongDK").val(selectedItem.Cong);
        $("#NgayLamViecDK").data("kendoDatePicker").value(selectedItem.NgayLamViec);
        $("#ThoiGianDuKienDK").val(selectedItem.ThoiGianDuKien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DiaDiemDK").val(selectedItem.DiaDiem);
        $("#SoNguoiDK").val(selectedItem.SoNguoiDuKien);
        $("#ThoiGianBatDauDuKienDK").data("kendoDateTimePicker").value(selectedItem.ThoiGianBatDauDuKien);
        $("#ThoiGianKetThucDuKienDK").data("kendoDateTimePicker").value(selectedItem.ThoiGianKetThucDuKien);
        //$("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
        //$("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
        //$("#TenCongViecThucTe").val(selectedItem.TenCongViec);
        //$("#CongThucTe").val(selectedItem.Cong);
        //$("#ThoiGianThucTe").val(selectedItem.ThoiGianDuKien);
        var dataS = []
        var dataS2 = []
        for (var i = 0; i < selectedItem.lstNhanVien.length; i++) {
            if (selectedItem.lstNhanVien[i].TrangThai == 0) {
                dataS.push(selectedItem.lstNhanVien[i])
            } else {
                dataS2.push(selectedItem.lstNhanVien[i])
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: dataS,
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
            //pageSize: 20,
        });
        var dataSource2 = new kendo.data.DataSource({
            data: dataS2,
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
            //pageSize: 20,
        });
        $("#gridNhanVienDK").data("kendoGrid").setDataSource(dataSource);
        //});
        if (selectedItem.TrangThai == 2) {
            $("#btnUpdate").hide();
            $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource2);

        } else {
            $("#btnUpdate").show();
            $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource);

        }
        if ($(window).width() > 800) {
            $("#windowUpdate").data("kendoWindow").center().open();
        } else {
            $("#windowUpdate").data("kendoWindow").center().maximize().open();
        }
    }

}

function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/KeHoach/GetAllKeHoachByNgay' + "?Ngay=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
        type: 'GET',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        for (var i = 0; i < response.length; i++) {
            var lst1 = []
            var lst2 = []
            response[i].TongCong = 0;
            response[i].CongTT = 0;
            if (response[i].lstNhanVien) {
                for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                    if (response[i].lstNhanVien[j].TrangThai == 0) {
                        lst1.push(response[i].lstNhanVien[j]);
                        response[i].TongCong = response[i].TongCong + response[i].lstNhanVien[j].Cong;
                    } else {
                        lst2.push(response[i].lstNhanVien[j]);
                        response[i].CongTT = response[i].CongTT + response[i].lstNhanVien[j].Cong;
                    }
                }
            }
            response[i].SlgDK = lst1.length > response[i].SoNguoiDuKien ? lst1.length : response[i].SoNguoiDuKien;
            response[i].SlgTT = lst2.length;
            response[i].SlgCL = response[i].SlgTT - response[i].SlgDK;
            response[i].CongCL = response[i].TongCong - response[i].CongTT;
            var strTo = "";
            var strMa = "";


        }

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayLamViec: { type: 'date', editable: false },
                        NgayTao: { type: 'date', editable: false },
                        ThoiGianBatDauDuKien: { type: 'date', editable: false },
                        ThoiGianKetThucDuKien: { type: 'date', editable: false },
                        ThoiGianBatDauThucTe: { type: 'date', editable: false },
                        ThoiGianKetThucThucTe: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);

        kendo.ui.progress($("#grid"), false);

    });
}

function LoadGridData() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/KeHoach/GetAllKeHoach',
        type: 'GET',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        for (var i = 0; i < response.length; i++) {
            var lst1 = []
            var lst2 = []
            response[i].TongCong = 0;
            response[i].CongTT = 0;
            if (response[i].lstNhanVien) {
                for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                    if (response[i].lstNhanVien[j].TrangThai == 0) {
                        lst1.push(response[i].lstNhanVien[j]);
                        response[i].TongCong = response[i].TongCong + response[i].lstNhanVien[j].Cong;
                    } else {
                        lst2.push(response[i].lstNhanVien[j]);
                        response[i].CongTT = response[i].CongTT + response[i].lstNhanVien[j].Cong;
                    }
                }
            }
            response[i].SlgDK = lst1.length > response[i].SoNguoiDuKien ? lst1.length : response[i].SoNguoiDuKien;
            response[i].SlgTT = lst2.length;
            response[i].SlgCL = response[i].SlgTT - response[i].SlgDK;
            response[i].CongCL = response[i].TongCong - response[i].CongTT;
            var strTo = "";
            var strMa = "";


        }

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayLamViec: { type: 'date', editable: false },
                        NgayTao: { type: 'date', editable: false },
                        ThoiGianBatDauDuKien: { type: 'date', editable: false },
                        ThoiGianKetThucDuKien: { type: 'date', editable: false },
                        ThoiGianBatDauThucTe: { type: 'date', editable: false },
                        ThoiGianKetThucThucTe: { type: 'date', editable: false },
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
    //if ($(window).width() > 800) {
    //    $("#window").data("kendoWindow").center().open();
    //} else {
    var dataSource = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                ID: "ID",
                field: {
                    Cong: {
                        type: 'number',
                        editable: true
                    }
                }
            }
        },
        //pageSize: 20,
    });
    $("#btnSave").show();
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
    $("#window").data("kendoWindow").center().maximize().open();
    //}
}

function ValidateForm() {
    var validten = SetValidate("ComboCongViec");
    var validgs = SetValidate("ComboNguoiGiamSat");
    var validma = SetValidate("Cong");
    var validdiachi = SetValidate("DiaDiem");
    var validngay = SetValidate("NgayLamViec");
    var validthoigian = SetValidate("ThoiGianDuKien");
    var validthoigianbatdau = SetValidate("ThoiGianBatDauDuKien");
    var validthoigianketthuc = SetValidate("ThoiGianKetThucDuKien");
    var valid = validma && validten && validdiachi && validngay && validthoigian && validgs && validthoigianbatdau && validthoigianketthuc;
    return valid;
}

function ValidateForm2() {
    var validten = SetValidate("ComboCongViecThucTe");
    var validgs = SetValidate("ComboNguoiGiamSatThucTe");
    var validma = SetValidate("CongThucTe");
    var validthoigian = SetValidate("ThoiGianThucTe");
    var validthoigianbatdau = SetValidate("ThoiGianBatDauThucTe");
    var validthoigianketthuc = SetValidate("ThoiGianKetThucThucTe");
    var valid = validma && validten && validthoigian && validgs && validthoigianbatdau && validthoigianketthuc;
    return valid;
}

//function CheckTicke(data, datefrom, dateto, callback) {
//    $.ajax({
//        url: '/NhanVien/CheckNhanVienDaCoTicke',
//        type: 'POST',
//        data: {
//            lst: data,
//            from: datefrom,
//            to: dateto
//        }
//    }).done(function successCallback(response) {
//        if (response) {
//            $.each()
//            callback(true)
//        } else {
//            callback(false)
//        }
//    })
//}

function Luu() {

    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVienKeHoach = [];
    var dulieuchecknhanvien = [];
    $.each(bangDuLieuNhanVien, function (index, item) {
        bangDuLieuNhanVienKeHoach.push({
            ID_NhanVien: item.ID,
            Cong: item.Cong,
            TrangThai: 0,
        });
        dulieuchecknhanvien.push({
            ID: item.ID
        })
    })
    //console.log("data: ", bangDuLieuNhanVienKeHoach.length)
    //console.log("TenCongViec: ", $("#ComboCongViec").data("kendoMultiColumnComboBox").dataItem())
    var hours = Math.abs($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value() - $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value())

    if (ValidateForm()) {

        if ($('#SoNguoiDuKien').val() > 0 && $('#SoNguoiDuKien').val() != bangDuLieuNhanVienKeHoach.length && bangDuLieuNhanVienKeHoach.length > 0) {
            notification.show({ kValue: "Số người dự kiến không hợp lệ" }, "error");
        } else if ($('#SoNguoiDuKien').val() < 0) {
            notification.show({ kValue: "Số người dự kiến không hợp lệ" }, "error");
        } else if (hours < 0) {
            notification.show({ kValue: "Thời gian không hợp lệ" }, "error");

        } else {
            var dataSave = {
                ID: $("#ID").val(),
                GhiChu: $("#GhiChu").val(),
                NgayLamViec: kendo.toString($("#NgayLamViec").data("kendoDatePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                TrangThai: 1,
                DiaDiem: $('#DiaDiem').val(),
                ID_CongViec: $("#ComboCongViec").data("kendoMultiColumnComboBox").value(),
                TenCongViec: $("#ComboCongViec").data("kendoMultiColumnComboBox").dataItem().TenCongViec,
                Cong: $('#Cong').val(),
                SoNguoiDuKien: $('#SoNguoiDuKien').val() == 0 ? bangDuLieuNhanVienKeHoach.length : $('#SoNguoiDuKien').val(),
                ThoiGianDuKien: hours / 3600000,
                ThoiGianBatDauDuKien: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucDuKien: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ID_NguoiGiamSat: $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(),
                NguoiGiamSat: $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
                ID_CongViecThucTe: 0,
                TenCongViecThucTe: "",
                CongThucTe: 0,
                ThoiGianThucTe: "",
                SoNguoiThucTe: 0,
                ID_NguoiGiamSatThucTe: 0,
                NguoiGiamSatThucTe: "",
                ThoiGianBatDauThucTe: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucThucTe: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                lstNhanVienKeHoach: bangDuLieuNhanVienKeHoach

            }
            //CheckTicke(dulieuchecknhanvien, dataSave.ThoiGianBatDauThucTe, dataSave.ThoiGianKetThucThucTe, function (isTicke) {
            //    if (isTicke) {
            //        notification.show({ kValue: "Có nhân viên đã có ticke" }, "error");

            //    } else {
            $.ajax({
                url: '/KeHoach/InsertOrUpdate_KeHoach',
                type: 'POST',
                data: dataSave
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    //LoadGridData();
                    TimKiem()
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
            //}
            //})


        }

    }
}

function Update() {

    var bangDuLieuNhanVien = $("#gridNhanVienThucTe").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVienKeHoach = [];
    $.each(bangDuLieuNhanVien, function (index, item) {
        bangDuLieuNhanVienKeHoach.push({
            ID_NhanVien: item.ID,
            Cong: item.Cong,
            TrangThai: 1,
        });
    })
    console.log(bangDuLieuNhanVienKeHoach)
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var hours = Math.abs($("#ThoiGianKetThucThucTe").data("kendoDateTimePicker").value() - $("#ThoiGianBatDauThucTe").data("kendoDateTimePicker").value())
    //console.log(hours / 3600000)
    //console.log("data: ", bangDuLieuNhanVienKeHoach.length)
    if (ValidateForm2()) {
        if (hours > 0) {
            var dataSave = {
                ID: $("#IDUpdate").val(),
                GhiChu: $("#GhiChu").val(),
                NgayLamViec: kendo.toString($("#NgayLamViecDK").data("kendoDatePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                TrangThai: 2,
                DiaDiem: selectedItem.DiaDiem,
                ID_CongViec: selectedItem.ID_CongViec,
                TenCongViec: selectedItem.TenCongViec,
                Cong: selectedItem.Cong,
                SoNguoiDuKien: selectedItem.SoNguoiDuKien,
                ThoiGianDuKien: selectedItem.ThoiGianDuKien,
                ThoiGianBatDauDuKien: kendo.toString($("#ThoiGianBatDauDuKienDK").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucDuKien: kendo.toString($("#ThoiGianKetThucDuKienDK").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ID_NguoiGiamSat: selectedItem.ID_NguoiGiamSat,
                NguoiGiamSat: selectedItem.NguoiGiamSat,
                ID_CongViecThucTe: $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").value(),
                TenCongViecThucTe: $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").dataItem().TenCongViec,
                CongThucTe: $('#CongThucTe').val(),
                ThoiGianThucTe: hours / 3600000,
                SoNguoiThucTe: bangDuLieuNhanVienKeHoach.length,
                ID_NguoiGiamSatThucTe: $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").value(),
                NguoiGiamSatThucTe: $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
                ThoiGianBatDauThucTe: kendo.toString($("#ThoiGianBatDauThucTe").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucThucTe: kendo.toString($("#ThoiGianKetThucThucTe").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                lstNhanVienKeHoach: bangDuLieuNhanVienKeHoach

            }
            //if (bangDuLieuNhanVienKeHoach.length > 0) {
            //CheckTicke(bangDuLieuNhanVienKeHoach, dataSave.ThoiGianBatDauThucTe, dataSave.ThoiGianKetThucThucTe, function (isTicke) {
            //    if (isTicke) {
            //        notification.show({ kValue: "Có nhân viên đã có ticke" }, "error");

            //    } else {
            $.ajax({
                url: '/KeHoach/InsertOrUpdate_KeHoach',
                type: 'POST',
                data: dataSave
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    //LoadGridData();
                    TimKiem();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
        //})
        //} else {

        //    $.ajax({
        //        url: '/KeHoach/InsertOrUpdate_KeHoach',
        //        type: 'POST',
        //        data: dataSave
        //    }).done(function successCallback(response) {
        //        //response controller này trả về success và msg
        //        if (response.success) {
        //            notification.show({ kValue: response.msg }, "success");
        //            Huy();
        //            LoadGridData();
        //        } else {
        //            notification.show({ kValue: response.msg }, "error");
        //        }
        //    });
        //}
        //$.ajax({
        //    url: '/KeHoach/InsertOrUpdate_KeHoach',
        //    type: 'POST',
        //    data: {
        //        ID: $("#IDUpdate").val(),
        //        GhiChu: $("#GhiChu").val(),
        //        NgayLamViec: kendo.toString($("#NgayLamViecDK").data("kendoDatePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
        //        TrangThai: 2,
        //        DiaDiem: selectedItem.DiaDiem,
        //        ID_CongViec: selectedItem.ID_CongViec,
        //        TenCongViec: selectedItem.TenCongViec,
        //        Cong: selectedItem.Cong,
        //        SoNguoiDuKien: selectedItem.SoNguoiDuKien,
        //        ThoiGianDuKien: selectedItem.ThoiGianDuKien,
        //        ThoiGianBatDauDuKien: kendo.toString($("#ThoiGianBatDauDuKienDK").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
        //        ThoiGianKetThucDuKien: kendo.toString($("#ThoiGianKetThucDuKienDK").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
        //        ID_NguoiGiamSat: selectedItem.ID_NguoiGiamSat,
        //        NguoiGiamSat: selectedItem.NguoiGiamSat,
        //        ID_CongViecThucTe: $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").value(),
        //        TenCongViecThucTe: $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").dataItem().TenCongViec,
        //        CongThucTe: $('#CongThucTe').val(),
        //        ThoiGianThucTe: hours / 3600000,
        //        SoNguoiThucTe: bangDuLieuNhanVienKeHoach.length,
        //        ID_NguoiGiamSatThucTe: $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").value(),
        //        NguoiGiamSatThucTe: $("#ComboNguoiGiamSatThucTe").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
        //        ThoiGianBatDauThucTe: kendo.toString($("#ThoiGianBatDauThucTe").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
        //        ThoiGianKetThucThucTe: kendo.toString($("#ThoiGianKetThucThucTe").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
        //        lstNhanVienKeHoach: bangDuLieuNhanVienKeHoach

        //    }
        //}).done(function successCallback(response) {
        //    //response controller này trả về success và msg
        //    if (response.success) {
        //        notification.show({ kValue: response.msg }, "success");
        //        Huy();
        //        LoadGridData();
        //    } else {
        //        notification.show({ kValue: response.msg }, "error");
        //    }
        //});
    } else {
        notification.show({ kValue: "Thời gian không hợp lệ" }, "error");

    }
}


function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#windowUpdate").data("kendoWindow").close();
    bangDuLieuNhanVien = [];
    $("#grid").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục công việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/KeHoach/DeleteMulti_KeHoach?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            //LoadGridData();
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
        var lstNhanVienChuaPhanCong = [];
        for (var i = 0; i < response.length; i++) {
            if (!CheckNhanVienChuaPhanCong(response[i].ID)) {
                lstNhanVienChuaPhanCong.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstNhanVienChuaPhanCong,
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
            group: {
                field: "TenToNhom"
            },
            //pageSize: 20,
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

function openAddNhanVienToNhomWindow() {
    selectdNhanVien = [];
    let url = '/ToNhom/GetAllToNhom';
    let idcongviec = $("#ComboCongViec").data("kendoMultiColumnComboBox").value();
    if (idcongviec > 0) {
        url = '/ToNhom/GetAllToNhomTheoCongViec?ID_CongViec=' + idcongviec;
        if ($("#NgayLamViec").data("kendoDatePicker").value() != null) {
            url = '/ToNhom/GetAllToNhomTheoCongViecNgay?ID_CongViec=' + idcongviec
                + '&Ngay=' + kendo.toString($("#NgayLamViec").data("kendoDatePicker").value(), "yyyy/MM/dd");
        }
    }
    kendo.ui.progress($("#windowNhanVienToNhom"), true);
    $.ajax({
        url: url,
        type: 'GET',
    }).done(function successCallback(responsee) {
        var response = JSON.parse(responsee);
        var dataNhanVienToNhomChuaPhanCong = []
        getDataNhanVienNgoaiTo(function (json) {
            dataNhanVienToNhomChuaPhanCong = json
            for (var i = 0; i < response.length; i++) {
                var lstNhanVienChuaPhanCong = [];
                if (response[i].lstNhanVien.length > 0) {
                    //console.log(response[i].lstNhanVien)

                    for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                        if (!CheckNhanVienChuaPhanCong(response[i].lstNhanVien[j].ID)) {
                            lstNhanVienChuaPhanCong.push(response[i].lstNhanVien[j])
                        }
                    }
                    response[i].lstNhanVienChuaPhanCong = lstNhanVienChuaPhanCong
                    if (lstNhanVienChuaPhanCong.length > 0) {
                        dataNhanVienToNhomChuaPhanCong.push(response[i])

                    }
                }
            }
            //console.log(dataNhanVienToNhomChuaPhanCong);
            var dataSource = new kendo.data.DataSource({

                data: dataNhanVienToNhomChuaPhanCong,
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
                //pageSize: 20,
            });

            $("#gridAddNhanVienToNhom").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#windowNhanVienToNhom"), false);
        })
    });
    if ($(window).width() > 800) {
        $("#windowNhanVienToNhom").data("kendoWindow").center().open();
    } else {
        $("#windowNhanVienToNhom").data("kendoWindow").center().maximize().open();
    }
}

function getDataNhanVienNgoaiTo(callback) {
    var dataNhanVienToNhomChuaPhanCong = []
    $.ajax({
        url: '/NhanVien/GetAllNhanVienNgoaiToNhom',
        type: 'GET',
    }).done(function successCallback(response2) {
        var lstNhanVienNgoaiToNhomChuaPhanCong = [];
        for (var i = 0; i < response2.length; i++) {
            if (!CheckNhanVienChuaPhanCong(response2[i].ID)) {
                lstNhanVienNgoaiToNhomChuaPhanCong.push(response2[i])
            }
        }
        if (lstNhanVienNgoaiToNhomChuaPhanCong.length > 0) {
            dataNhanVienToNhomChuaPhanCong.push({
                ID: 0,
                TenToNhom: "Không có tổ",
                MaToNhom: "",
                lstNhanVien: response2,
                lstNhanVienChuaPhanCong: lstNhanVienNgoaiToNhomChuaPhanCong


            })
        }

        callback(dataNhanVienToNhomChuaPhanCong)

    });
}

function CheckNhanVienChuaPhanCong(idnhanvien) {
    if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
        //var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
        var isExisted = false;
        //$.each(bangDuLieuNhanVien, function (index, item) {
        //    if (idnhanvien == item.ID) {
        //        isExisted = true;
        //    }
        //})

        return isExisted;

    } else {
        var bangDuLieuNhanVien = $("#gridNhanVienThucTe").data("kendoGrid").dataSource.data();
        var isExisted = false;
        $.each(bangDuLieuNhanVien, function (index, item) {
            if (idnhanvien == item.ID) {
                isExisted = true;
            }
        })

        return isExisted;

    }
}
function LuuAddNhanVien() {
    $("#windowNhanVien").data("kendoWindow").close();
    var bangDuLieuNhanVienTo = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVien = [];
    var arr_idnhanvien;
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
            MaNhanVien: item.MaNhanVien,

        });
        arr_idnhanvien.push(item.ID);
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


    $.ajax({
        url: '/NhanVien/CheckNhanVienDaCoTicke',
        type: 'POST',
        data: {
            lst: arr_idnhanvien.join(','),
            from: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
            to: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss')
        }
    }).done(function successCallback(response) {
        if (response) {
            $.each(response, function (index, item) {
                item.Cong = parseFloat($('#Cong').val())
            })
            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        ID: "ID",
                        field: {
                            Cong: {
                                type: 'number'
                            }
                        }
                    }
                },
                //pageSize: 20,
            });
            if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
                $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
            } else {
                $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource);

            }
        } else {
            var dataSource = new kendo.data.DataSource({
                data: bangDuLieuNhanVien,
                schema: {
                    model: {
                        ID: "ID",
                        field: {
                            Cong: {
                                type: 'number'
                            }
                        }
                    }
                },
                //pageSize: 20,
            });
            if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
                $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
            } else {
                $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource);

            }
        }
    })


}
function LuuAddNhanVienToNhom() {
    $("#windowNhanVienToNhom").data("kendoWindow").close();
    var bangDuLieuNhanVienTo = [];
    var arr_idnhanvien = [];
    if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
        bangDuLieuNhanVienTo = $("#gridNhanVien").data("kendoGrid").dataSource.data();

    } else {
        bangDuLieuNhanVienTo = $("#gridNhanVienThucTe").data("kendoGrid").dataSource.data();

    }
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
            MaNhanVien: item.MaNhanVien,
            Cong: parseFloat($('#Cong').val())
        });
        arr_idnhanvien.push(item.ID);
    })
    $.each(selectdNhanVien, function (index, item) {
        bangDuLieuNhanVien.push({
            ID: item.ID,
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            Email: item.Email,
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: item.TrangThai,
            MaNhanVien: item.MaNhanVien,
            Cong: parseFloat($('#Cong').val())
        });
        arr_idnhanvien.push(item.ID);
    });

    $.ajax({
        url: '/NhanVien/CheckNhanVienDaCoTicke',
        type: 'POST',
        data: {
            lst_id: arr_idnhanvien.join(','),
            from: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
            to: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss')
        }
    }).done(function successCallback(r) {
        var response = JSON.parse(r);
        $.each(response, function (index, item) {
            item.Cong = parseFloat($('#Cong').val())
        })
        if (response) {
            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        ID: "ID",
                        field: {
                            Cong: {
                                type: 'number', editable: true
                            }
                        }
                    }
                },
                //pageSize: 20,
            });
            if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
                $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
            } else {
                $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource);

            }
        } else {
            var dataSource = new kendo.data.DataSource({
                data: bangDuLieuNhanVien,
                schema: {
                    model: {
                        ID: "ID",
                        field: {
                            Cong: {
                                type: 'number', editable: true
                            }
                        }
                    }
                },
                //pageSize: 20,
            });
            if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
                $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
            } else {
                $("#gridNhanVienThucTe").data("kendoGrid").setDataSource(dataSource);

            }
        }
    })

}
function DeleteRow(uid) {
    if ($("#windowUpdate").data("kendoWindow").element.is(":hidden")) {
        var dataRow = $('#gridNhanVien').data("kendoGrid").dataSource.getByUid(uid);
        $('#gridNhanVien').data("kendoGrid").dataSource.remove(dataRow);

    } else {
        var dataRow = $('#gridNhanVienThucTe').data("kendoGrid").dataSource.getByUid(uid);
        $('#gridNhanVienThucTe').data("kendoGrid").dataSource.remove(dataRow);

    }
}

function UpdateTimeDK(cong) {

    $("#ThoiGianDuKien").val(cong * ($("#ComboCongViec").data("kendoMultiColumnComboBox").dataItem().ThoiGian / $("#ComboCongViec").data("kendoMultiColumnComboBox").dataItem().Cong));
}
function UpdateTimeTT(cong) {
    $("#ThoiGianThucTe").val(cong * ($("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").dataItem().ThoiGian / $("#ComboCongViecThucTe").data("kendoMultiColumnComboBox").dataItem().Cong));

}