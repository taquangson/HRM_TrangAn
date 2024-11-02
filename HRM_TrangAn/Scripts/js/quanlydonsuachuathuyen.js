$(".main_container").hide();
$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
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
                field: "SoDo",
                title: "Mã số đò",
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
                field: "LyDo",
                title: "Lý do sửa chữa",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                }
            },
            {
                field: "SoTienSua",
                title: "Số tiền sửa chữa",
                width: "120px",
                format: "{0:n0}",
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
                field: "TrangThai",
                title: "Tình trạng",
                template: function (e) {
                    if (e.TrangThai == 3) {
                        return "<span style='color:green'>" + "Xác nhận hoàn thành" + "</span>";
                    } else if (e.TrangThai == 2) {
                        return "<span style='color:blue'>" + "Xác nhận chi phí" + "</span>";
                    } else if (e.TrangThai == 1) {
                        return "<span style='color:orange'>" + "Kiểm tra hiện trạng" + "</span>";
                    } else {
                        return "<span style='color:red'>Thông báo sửa thuyền</span>";
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
                field: "NgayLapPhieu",
                title: "Ngày lập đơn",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "NgayHoanThanh",
                title: "Ngày hoàn thành",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "GhiChu",
                title: "Ghi chú",
                template: function (e) {
                    if (e.TrangThai == 3) {
                        var str1 = "<span style='color:blue'>" + "1. Thông báo sửa thuyền: " + "</span>" + "<span>" + (e.GhiChu1 ?? "") + "</span><br/>";
                        var str2 = "<span style='color:blue'>" + "2. Kiểm tra hiện trạng: " + "</span>" + "<span>" + (e.GhiChu2 ?? "") + "</span><br/>";
                        var str3 = "<span style='color:blue'>" + "3. Xác nhận chi phí: " + "</span>" + "<span>" + (e.GhiChu3 ?? "") + "</span><br/>";
                        var str4 = "<span style='color:blue'>" + "4. Xác nhận hoàn thành: " + "</span>" + "<span>" + (e.GhiChu4 ?? "") + "</span><br/>";
                        var str = str1 + "</br>" + str2 + "</br>" + str3 + "</br>" + str4
                        return str;
                    } else if (e.TrangThai == 2) {
                        var str1 = "<span style='color:blue'>" + "1. Thông báo sửa thuyền: " + "</span>" + "<span>" + (e.GhiChu1 ?? "") + "</span><br/>";
                        var str2 = "<span style='color:blue'>" + "2. Kiểm tra hiện trạng: " + "</span>" + "<span>" + (e.GhiChu2 ?? "") + "</span><br/>";
                        var str3 = "<span style='color:blue'>" + "3. Xác nhận chi phí: " + "</span>" + "<span>" + (e.GhiChu3 ?? "") + "</span><br/>";
                        var str = str1 + "</br>" + str2 + "</br>" + str3
                        return str;

                    } else if (e.TrangThai == 1) {
                        var str1 = "<span style='color:blue'>" + "1. Thông báo sửa thuyền: " + "</span>" + "<span>" + (e.GhiChu1 ?? "") + "</span><br/>";
                        var str2 = "<span style='color:blue'>" + "2. Kiểm tra hiện trạng: " + "</span>" + "<span>" + (e.GhiChu2 ?? "") + "</span><br/>";
                        var str = str1 + "</br>" + str2
                        return str;
                    } else {
                        var str1 = "<span style='color:blue'>" + "1. Thông báo sửa thuyền: " + "</span>" + "<span>" + (e.GhiChu1 ?? "") + "</span><br/>";
                        var str = str1
                        return str;
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
        actions: [
            "Close"
        ]
    });
    $("#windowUpdate2").kendoWindow({
        width: "800",
        height: "180",
        title: "Cập nhật kiểm tra",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowUpdate3").kendoWindow({
        width: "800",
        height: "250",
        title: "Cập nhật sửa chữa",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#windowUpdate4").kendoWindow({
        width: "800",
        height: "250",
        title: "Cập nhật xác nhận thu phí",
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
    $.ajax({
        url: '/ThuyenDo/GetAllThuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboThuyen").kendoComboBox({
            dataTextField: "MaThuyen",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource
        })
    });
    $("#ComboTinhTrang").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        clearButton: false,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Thông báo sửa thuyền"
                },
                {
                    ID: 1,
                    Name: "Kiểm tra hiện trạng"
                },
                {
                    ID: 2,
                    Name: "Xác nhận chi phí"
                },
                {
                    ID: 3,
                    Name: "Xác nhận hoàn thành"
                },
            ]
        },
        select: function (e) {
            if (e.dataItem.ID == 2) {
                $("#NgayHoanThanh").data("kendoDatePicker").readonly(false);
            } else {
                $("#NgayHoanThanh").data("kendoDatePicker").readonly(true);
                $("#NgayHoanThanh").data("kendoDatePicker").value("")
            }
            console.log(e.item.text());
            //if (e.item.text() == "Đã sửa") {
            //    $("#NgayHoanThanh").data("kendoDatePicker").readonly(false);
            //} else {
            //    $("#NgayHoanThanh").data("kendoDatePicker").readonly(true);
            //    $("#NgayHoanThanh").data("kendoDatePicker").value("")
            //}
        }
    })
    $("#NgayHoanThanh").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    });
    $("#NgayLapPhieu").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    });
    $("#NgayHoanThanh").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayLapPhieu").data("kendoDatePicker")._dateInput.setOptions({
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
    LoadGridData();
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
        $("#SoDo").val(selectedItem.SoDo);
        //$("#SoTienSua").val(selectedItem.SoTienSua);
        $("#LyDo").val(selectedItem.LyDo);
        $("#NgayLapPhieu").data("kendoDatePicker").value(selectedItem.NgayLapPhieu);
        $("#ComboThuyen").data("kendoComboBox").value(selectedItem.ID_ThuyenDo);
        //$("#ComboTinhTrang").data("kendoComboBox").value(selectedItem.TrangThai);

        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}

function openUpdate2Window() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem.TrangThai == 1) {
            $("#GhiChu2").val(selectedItem.GhiChu2);
        }


        if ($(window).width() > 800) {
            $("#windowUpdate2").data("kendoWindow").center().open();
        } else {
            $("#windowUpDate2").data("kendoWindow").center().maximize().open();
        }
    }

}

function openUpdate3Window() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem.TrangThai == 2) {
            $("#SoTienSua").val(selectedItem.SoTienSua);
            $("#GhiChu3").val(selectedItem.GhiChu3);
        }


        if ($(window).width() > 800) {
            $("#windowUpdate3").data("kendoWindow").center().open();
        } else {
            $("#windowUpDate3").data("kendoWindow").center().maximize().open();
        }
    }

}

function openUpdate4Window() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        if (selectedItem.TrangThai == 3) {
            $("#GhiChu4").val(selectedItem.GhiChu4);
            $("#NgayHoanThanh").data("kendoDatePicker").value(selectedItem.NgayHoanThanh);
        }


        if ($(window).width() > 800) {
            $("#windowUpdate4").data("kendoWindow").center().open();
        } else {
            $("#windowUpDate4").data("kendoWindow").center().maximize().open();
        }
    }

}


function LoadGridData() {
    $.ajax({
        url: '/DonSuaChuaThuyen/GetAllDonSuaChuaThuyen',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: {
                            type: 'date', editable: false
                        },
                        NgayHoanThanh: { type: 'date', editable: false },
                        NgayLapPhieu: { type: 'date', editable: false },
                        SoTienSua: { type: 'number' }

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
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function openPhanQuyen(id) {
    $("#ID_TaiKhoan").val(id);
    GetQuyen();
    if ($(window).width() > 800) {
        $("#windowPhanQuyen").data("kendoWindow").center().open();
    } else {
        $("#windowPhanQuyen").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm() {
    //var validsotien = SetValidate("SoTienSua");
    var validthuyen = SetValidate("ComboThuyen");
    //var validtrangthai = SetValidate("ComboTinhTrang");
    //var valid = validsotien && validthuyen && validtrangthai;
    return validthuyen;
}


function Luu() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    console.log("NgayHoanThanh: ", $('#NgayHoanThanh').val())
    if (ValidateForm()) {
        $.ajax({
            url: '/DonSuaChuaThuyen/InsertOrUpdate_DonSuaChuaThuyen',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                SoDo: $("#ComboThuyen").data("kendoComboBox").text(),
                ID_ThuyenDo: $("#ComboThuyen").data("kendoComboBox").value(),
                SoTienSua: 0,
                LyDo: $("#LyDo").val(),
                GhiChu: $("#GhiChu1").val(),
                NgayLapPhieu: kendo.toString($("#NgayLapPhieu").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                NgayHoanThanh: kendo.toString($("#NgayHoanThanh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                TrangThai: 0,

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

function Update1() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    $.ajax({
        url: '/DonSuaChuaThuyen/InsertOrUpdate_DonSuaChuaThuyen',
        type: 'POST',
        data: {
            ID: selectedItem.ID,
            SoDo: selectedItem.SoDo,
            ID_ThuyenDo: selectedItem.ID_ThuyenDo,
            SoTienSua: selectedItem.SoTienSua,
            LyDo: selectedItem.LyDo,
            GhiChu1: selectedItem.GhiChu1,
            GhiChu2: $("#GhiChu2").val(),
            GhiChu3: selectedItem.GhiChu3,
            GhiChu4: selectedItem.GhiChu4,
            NgayLapPhieu: kendo.toString(selectedItem.NgayLapPhieu, 'yyyy-MM-dd hh:mm:ss'),
            NgayHoanThanh: kendo.toString(selectedItem.NgayHoanThanh, 'yyyy-MM-dd hh:mm:ss'),
            TrangThai: 1,

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

function Update2() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (SetValidate("SoTienSua")) {
        $.ajax({
            url: '/DonSuaChuaThuyen/InsertOrUpdate_DonSuaChuaThuyen',
            type: 'POST',
            data: {
                ID: selectedItem.ID,
                SoDo: selectedItem.SoDo,
                ID_ThuyenDo: selectedItem.ID_ThuyenDo,
                SoTienSua: $("#SoTienSua").val(),
                LyDo: selectedItem.LyDo,
                GhiChu1: selectedItem.GhiChu1,
                GhiChu2: selectedItem.GhiChu2,
                GhiChu3: $("#GhiChu3").val(),
                GhiChu4: selectedItem.GhiChu4,
                NgayLapPhieu: kendo.toString(selectedItem.NgayLapPhieu, 'yyyy-MM-dd hh:mm:ss'),
                NgayHoanThanh: kendo.toString(selectedItem.NgayHoanThanh, 'yyyy-MM-dd hh:mm:ss'),
                TrangThai: 2,

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

function Update3() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (SetValidate("NgayHoanThanh")) {
        $.ajax({
            url: '/DonSuaChuaThuyen/InsertOrUpdate_DonSuaChuaThuyen',
            type: 'POST',
            data: {
                ID: selectedItem.ID,
                SoDo: selectedItem.SoDo,
                ID_ThuyenDo: selectedItem.ID_ThuyenDo,
                SoTienSua: selectedItem.SoTienSua,
                LyDo: selectedItem.LyDo,
                GhiChu1: selectedItem.GhiChu1,
                GhiChu2: selectedItem.GhiChu2,
                GhiChu3: selectedItem.GhiChu3,
                GhiChu4: $("#GhiChu4").val(),
                NgayLapPhieu: kendo.toString(selectedItem.NgayLapPhieu, 'yyyy-MM-dd hh:mm:ss'),
                NgayHoanThanh: kendo.toString($("#NgayHoanThanh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                TrangThai: 3,

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
    document.getElementById("formUpdate2").reset();
    document.getElementById("formUpdate3").reset();
    document.getElementById("formUpdate4").reset();

    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#windowUpdate2").data("kendoWindow").close();
    $("#windowUpdate3").data("kendoWindow").close();
    $("#windowUpdate4").data("kendoWindow").close();

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
        url: '/DonSuaChuaThuyen/DeleteMulti_DonSuaChuaThuyen?ID=' + ids.join(','),
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
function CapNhatTrangThai(trangthai) {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để cập nhật");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $.ajax({
            url: '/DonSuaChuaThuyen/UpdateTrangThai_DonSuaChuaThuyen?ID=' + selectedItem.ID + '&TrangThai=' + trangthai,
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

}
function CapNhatTrangThaiDropDown(container, options) {
    $('<input required name="TrangThai">')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "TrangThai",
            dataValueField: "ID_TrangThai",
            template: "<div class='dropdown-country-wrap'><span>#:TrangThai #</span></div>",
            dataSource: {
                data: [
                    {
                        ID_TrangThai: 0,
                        TrangThai: "Chưa sửa"
                    },
                    {
                        ID_TrangThai: 1,
                        TrangThai: "Đã sửa"
                    },
                ]
            },
            autoWidth: true
        });
}