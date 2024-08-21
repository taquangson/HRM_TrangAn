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



