
$(document).ready(function () {
    $("#Ngay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 200;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        NgayDi: { type: "date" },
                        SoLuotChamCong: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "SoLuotChamCong", aggregate: "sum" }
            ]
        }),
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailChuyenDoInit,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách ticket";
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
                field: "NgayDi",
                format: "{0:dd-MM-yyyy}",
                title: "Ngày",
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
                }, attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "TenToNhom",
                title: "Tổ",
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
                field: "MaThuyen",
                title: "Mã số đò",
                width: "130px",
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
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "130px",
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
                title: "Điểm đã đi/ Điểm cần đi",
                template: function (e) {
                    let newArr = [];
                    //for (var i = 0; i < e.lstChamCong.length; i++) {
                    //    if (newArr.indexOf(e.lstChamCong[i].ID_DiemQuetThe) === -1) {
                    //        newArr.push(e.lstChamCong[i].ID_DiemQuetThe);
                    //    }
                    //}
                    //return newArr.length + "/" + e.lstDiemTuyen.length;
                    return "1/1";
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },

            {
                field: "TenNhanVien",
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
                }
            },
            {
                field: "TenTuyen",
                title: "Tuyến đò",
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
                field: "SoLuotChamCong",
                title: "Số khách",
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
                footerTemplate: function (e) {
                    if (e.SoLuotChamCong) {
                        return kendo.toString(e.SoLuotChamCong.sum ? e.SoLuotChamCong.sum : 0, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            },
            {
                field: "TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.TrangThai == 0) {
                        return "<span style='color:red'>Chưa xác nhận</span>";
                    } else if (e.TrangThai == 1) {
                        return "<span style='color:green'>Đã xác nhận</span>";
                    } else {
                        return "<span style='color:blue'></span>";
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
                field: "GhiChu",
                title: "Ghi chú",
                template: function (e) {
                    if (e.ID_TrangThai == 1) {
                        return "<span style='color:red'>" + e.GhiChu + "</span>";
                    } else if (e.ID_TrangThai == 2) {
                        return "<span style='color:blue'>" + e.GhiChu + "</span>";
                    } else {
                        return "<span style='color:green'></span>";
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
                title: "",
                width: "150px",
                template: function (e) {
                    return "<a class='k-button bg-green text-center' onclick='XacNhanTicket(" + e.ID_ChuyenDo + ")'><i class='fa fa-check'> </i> Xác nhận </a>"
                        + "<a class='k-button bg-red text-center' onclick='HuyTicket(" + e.ID_ChuyenDo + ")'><i class='fa fa-close'> </i> Hủy </a>";
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

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();


})


function detailChuyenDoInit(e) {
    var detailRow = e.detailRow;
    //var datachamcong = [];
    //console.log(e.data);
    //$.each(e.data.lstChamCong, function (index, item) {
    //    datachamcong.push({
    //        STT: index + 1,
    //        ThoiGian: item.ThoiGian,
    //        MaDiem: item.MaDiem,
    //        TenDiem: item.TenDiem,
    //        DiaDiem: item.DiaDiem,
    //        ThongTinThietBi: item.ThongTinThietBi,
    //        DiaChiIP: item.DiaChiIP

    //    })
    //})
    //console.log(datachamcong);
    $.ajax({
        url: "/ChuyenDo/GetChamCongByChuyenDo?ID_ChuyenDo=" + e.data.ID_ChuyenDo,
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: {
                        ThoiGian: {
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
                    field: "ThoiGian",
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
                    field: "MaDiem",
                    title: "Mã điểm",
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
                    attributes: {
                        style: "text-align: center;",
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
                    field: "ThongTinThietBi",
                    title: "Thiết bị",
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

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#TenHocSinh").val(selectedItem.TenHocSinh);
        $("#DiaChi").val(selectedItem.DiaChi);
        $("#DienThoai1").val(selectedItem.DienThoai1);
        $("#DienThoai2").val(selectedItem.DienThoai2);
        $("#DienThoai3").val(selectedItem.DienThoai3);
        $("#PhuHuynh").val(selectedItem.PhuHuynh);
        $("#TruongHoc").data("kendoComboBox").value(selectedItem.ID_Truong);
        $("#GioiTinh").data("kendoComboBox").value(selectedItem.GioiTinh);
        $("#NgaySinh").data("kendoDatePicker").value(toDate(selectedItem.NgaySinh));
    }

}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/ChuyenDo/GetChuyenDoByNgay?Ngay=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            pageSize: 50,
            schema: {
                model: {
                    fields: {
                        NgayDi: { type: "date" },
                        SoLuotChamCong: { type: "number" }
                    }
                }
            },
            aggregate: [
                { field: "SoLuotChamCong", aggregate: "sum" }
            ]
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function XacNhan() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xác nhận " + bangDuLieu.select().length + " tích kê?</b>", function () { XacNhanMulti(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu tích kê cần xác nhận</b>");
    }
}

function Huy() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn hủy " + bangDuLieu.select().length + " tích kê?</b>", function () { HuyMulti(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu tích kê cần hủy</b>");
    }
}

function XacNhanTicket(ID) {
    $.ajax({
        url: '/ChuyenDo/XacNhanMulti_ChuyenDo?ID=' + ID,
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

function HuyTicket(ID) {
    $.ajax({
        url: '/ChuyenDo/HuyMulti_ChuyenDo?ID=' + ID,
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

function XacNhanMulti(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.ID_ChuyenDo;
        if (dataItem.TrangThai == 0) {
            ids.push(id);
        }
    });
    $.ajax({
        url: '/ChuyenDo/XacNhanMulti_ChuyenDo?ID=' + ids.join(','),
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

function HuyMulti(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.ID_ChuyenDo;
        if (dataItem.TrangThai == 1) {
            ids.push(id);
        }
    });
    $.ajax({
        url: '/ChuyenDo/HuyMulti_ChuyenDo?ID=' + ids.join(','),
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
        fileName: "Danh_Sach_Hoc_Sinh.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveHRM_TrangAnxcel();
}

Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function TinhTicke() {
    $.ajax({
        url: '/ChuyenDo/AutoTinhChuyen?from=' + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + '&to=' + kendo.toString(($("#Ngay").data("kendoDatePicker").value().addDays(1)), "yyyy/MM/dd") +
            '&ID_TuyenDo=0&ID_TaiKhoan=0',
        type: 'GET'
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