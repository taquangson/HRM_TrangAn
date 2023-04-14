$(".main_container").hide();
$(document).ready(function () {
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
                    field: "MaToNhom",
                    title: "Mã tổ",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
            filter: "contains",
            filterFields: ["TenDayDu", "MaNhanVien", "MaThuyen", "MaToNhom"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#MaThuyen").val(e.dataItem.MaThuyen);
                $("#MaToNhom").val(e.dataItem.MaToNhom);
                // Use the selected item or its text
            }
        })
    });
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
                field: "NgayNghi",
                title: "Ngày nghỉ",
                format: "{0:dd/MM/yyyy}",
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
                field: "TenNhanVien",
                title: "Họ tên",
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
                    style: "text-align: center;",
                }
            },
            {
                field: "Loai",
                title: "Loại nghỉ phép",
                template: function (e) {
                    if (e.Loai == 1) {
                        //return "<span style='background-color:yellow'>" + "Nghỉ lý do cá nhân" + "</span>";
                        return "Nghỉ lý do cá nhân"
                    } else {
                        //return "<span style='background-color:red'>" + "Nghỉ trừ âm" + "</span>";
                        return "Nghỉ trừ âm"

                    }
                },
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
                attributes:  {
                    "class": "# if(data.Loai === 1) { # yellowbg # } else { # redbg # } #"
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

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    $("#NgayNghi").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayNghi").data("kendoDatePicker")._dateInput.setOptions({
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

    
    $("#ComboLoai").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        clearButton: false,
        dataSource: {
            data: [
                {
                    ID: 2,
                    Name: "Nghỉ trừ âm"
                },
                {
                    ID: 1,
                    Name: "Nghỉ lý do cá nhân"
                },
            ]
        },
        select: function (e) {
            
        }
    })
    
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
        //$("#ID_TaiKhoan").val(selectedItem.ID_TaiKhoan);
        $("#TenNhanVien").val(selectedItem.TenNhanVien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaToNhom").val(selectedItem.MaToNhom);
        $("#MaThuyen").val(selectedItem.MaThuyen);
        $("#ComboLoai").data("kendoComboBox").value(selectedItem.Loai);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        $("#NgayNghi").data("kendoDatePicker").value(selectedItem.NgayNghi);
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
        url: '/NghiPhep/GetAllNghiPhep',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayNghi: {
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
    Huy();

    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}


function ValidateForm() {
    var validnhanvien = SetValidate("ComboNhanVien");
    var validngay = SetValidate("NgayNghi");
    var validloai = SetValidate("ComboLoai");
    var valid = validnhanvien && validngay && validloai;
    return valid;
    
}


function Luu() {

    if (ValidateForm()) {
        
        $.ajax({
            url: '/NghiPhep/InsertOrUpdate_NghiPhep',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                Loai: $("#ComboLoai").data("kendoComboBox").value(),
                ID_NhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(),
                TenNhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
                MaToNhom: $("#MaToNhom").val(),
                MaThuyen: $("#MaThuyen").val(),
                GhiChu: $("#GhiChu").val(),
                NgayNghi: kendo.toString($("#NgayNghi").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
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
    $("#ID").val('');
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



