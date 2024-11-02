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
                field: "DienThoai",
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
                field: "DiaDiemLamViec",
                title: "Địa điểm làm việc",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                }
            },

        ]

    });
    $("#gridImport").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
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

        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                field: "STT",
                title: "STT",
                width: "50px",
                filterable: false,
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
                field: "DienThoai",
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
                field: "DiaDiemLamViec",
                title: "Địa điểm làm việc",
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
    $("#windowImport").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Nhập liệu từ file excel",
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

    LoadGridData();
    //$.ajax({
    //    url: '/User/GetAllUser',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    var dataSource = new kendo.data.DataSource({
    //        data: response,
    //    });
    //    $("#ComboNhanVien").kendoMultiColumnComboBox({
    //        dataTextField: "TenDayDu",
    //        dataValueField: "ID",
    //        columns: [
    //            {
    //                field: "TenDayDu",
    //                title: "Họ tên",
    //                width: "200px",
    //            },
    //            {
    //                field: "DienThoai",
    //                title: "Số điện thoại",
    //                width: "200px",
    //            },
    //        ],
    //        footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
    //        filter: "contains",
    //        filterFields: ["TenDayDu", "DienThoai"],
    //        suggest: true,
    //        delay: 1000,
    //        dataSource: dataSource
    //    })
    //});
    $.ajax({
        url: '/NhanVien/GetAllNhanVien',
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
                    title: "Họ tên",
                    width: "200px",
                },
                {
                    field: "SoDienThoai",
                    title: "Số điện thoại",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
            filter: "contains",
            filterFields: ["TenDayDu", "SoDienThoai"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#DienThoai").val(e.dataItem.SoDienThoai);
                $("#TenGiamSat").val(e.dataItem.TenDayDu);
                // Use the selected item or its text
            }
        })
    });
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboTaiKhoan").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Họ tên",
                    width: "200px",
                },
                {
                    field: "DienThoai",
                    title: "Số điện thoại",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
            filter: "contains",
            filterFields: ["TenDayDu", "DienThoai"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                $("#DienThoai").val(e.dataItem.DienThoai);
                $("#TenGiamSat").val(e.dataItem.TenDayDu);
                // Use the selected item or its text
            }
        })

    });
    $("#ComboNhom").kendoComboBox({
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
                    Name: "Nhân viên"
                },
                {
                    ID: 1,
                    Name: "Lái đò"
                },
                {
                    ID: 2,
                    Name: "Khác"
                },
            ]
        },
        select: function (e) {
            console.log(e.item.text());
            if (e.item.text() == "Nhân viên") {
                LoadDataCombo(0);
            }
            if (e.item.text() == "Lái đò") {
                LoadDataCombo(1);
            }
            if (e.item.text() == "Khác") {
                LoadDataCombo(2);
            }
        }
    })
    $("#file").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file dữ liệu đầu vào',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".xls", ".xlsx"],
        select: function (e) {
            PushFormDataFile(e.files[0]);
        }
    });
    function PushFormDataFile(file) {
        kendo.ui.progress($("#gridImport"), true);
        parseExcel(file.rawFile);
    }
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

function parseExcel(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //workbook.SheetNames.forEach(function (sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
            var json_object = JSON.stringify(XL_row_object);

            jsondata = JSON.parse(json_object);
            $.each(jsondata, function (index, item) {
                item.STT = index + 1;
                if (item.ID_LaoDong != null) {
                    item.Loai = 1;
                    item.ID_TaiKhoan = item.ID_LaoDong;
                } else if (item.ID_NhanVien != null) {
                    item.Loai = 0;
                    item.ID_TaiKhoan = item.ID_NhanVien;
                } else {
                    item.Loai = 2;
                }
                item.TenDayDu = item.TenDayDu;
                item.DienThoai = item.DienThoai;
                item.GhiChu = item.GhiChu;
                item.DiaDiemLamViec = item.DiaDiemLamViec;
            })
            console.log(jsondata)
            //lenght = jsondata.length;
            var dsgrid = new kendo.data.DataSource({
                data: jsondata,
                //pageSize: 50
            });
        if (ValidateList(jsondata)) {
            $("#gridImport").data("kendoGrid").setDataSource(dsgrid);
            notification.show({ kValue: "Tải dữ liệu thành công" }, "success");

        } else {
            notification.show({ kValue: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại file" }, "error");

        };
        kendo.ui.progress($("#gridImport"), false);
        //})

    };

    reader.onerror = function (ex) {
        console.log(ex);
    };

    reader.readAsBinaryString(file);

};

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
        $("#DiaDiemLamViec").val(selectedItem.DiaDiemLamViec);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DienThoai").val(selectedItem.DienThoai);
        $("#TenGiamSat").val(selectedItem.TenDayDu);
        $("#ComboNhom").data("kendoComboBox").value(selectedItem.Loai);
        LoadDataComboEdit(selectedItem.Loai, selectedItem.ID_TaiKhoan)
        
        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}
function openCopyWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để nhân bản");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        //$("#ID_TaiKhoan").val(selectedItem.ID_TaiKhoan);
        $("#DiaDiemLamViec").val(selectedItem.DiaDiemLamViec);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DienThoai").val(selectedItem.DienThoai);
        $("#TenGiamSat").val(selectedItem.TenDayDu);
        $("#ComboNhom").data("kendoComboBox").value(selectedItem.Loai);
        LoadDataComboEdit(selectedItem.Loai, selectedItem.ID_TaiKhoan)

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
        url: '/NguoiGiamSat/GetAllNguoiGiamSat',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
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
    LoadDataCombo(0);
    var data = {
        ID: 0,
        Name: "Nhân viên"
    };
    $("#ComboNhom").data("kendoComboBox").value(data.ID);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}


function ValidateForm() {
    if ($("#ComboNhom").data("kendoComboBox").value() == 2) {
        var validnhanvien = SetValidate("TenGiamSat");
        return validnhanvien;
    } else if ($("#ComboNhom").data("kendoComboBox").value() == 1) {
        var validnhanvien = SetValidate("ComboNhanVien");
        return validnhanvien;
    } else {
        var validnhanvien = SetValidate("ComboTaiKhoan");
        return validnhanvien;
    }
    
}


function Luu() {

    if (ValidateForm()) {
        var idnv = 0;
        if ($("#ComboNhom").data("kendoComboBox").value() == 0) {
            idnv = $("#ComboTaiKhoan").data("kendoMultiColumnComboBox").value();
        } else if ($("#ComboNhom").data("kendoComboBox").value() == 1) {
            idnv = $("#ComboNhanVien").data("kendoMultiColumnComboBox").value();
        } else {
            idnv = 0;
        }
        $.ajax({
            url: '/NguoiGiamSat/InsertOrUpdate_NguoiGiamSat',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                Loai: $("#ComboNhom").data("kendoComboBox").value(),
                ID_TaiKhoan: idnv,
                TenDayDu: $("#TenGiamSat").val(),
                DienThoai: $("#DienThoai").val(),
                GhiChu: $("#GhiChu").val(),
                DiaDiemLamViec: $("#DiaDiemLamViec").val()
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
        url: '/NguoiGiamSat/DeleteMutli_NguoiGiamSat?ID=' + ids.join(','),
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
function LoadDataCombo(type) {
    console.log("Load Combo: ", type);
    $("#TenGiamSat").val('');
    $("#DienThoai").val('');
    
    if (type == 0) {

        $("#comboGiamSatTK").show();
        $("#comboGiamSatNV").hide();
        $("#txtGiamSat").hide();
    } else if (type == 1) {

        $("#comboGiamSatTK").hide();
        $("#comboGiamSatNV").show();
        $("#txtGiamSat").hide();
    } else {

        $("#comboGiamSatTK").hide();
        $("#comboGiamSatNV").hide();
        $("#txtGiamSat").show();

    }

}
function LoadDataComboEdit(type, ID_TaiKhoan) {
    if (type == 0) {
        $("#ComboTaiKhoan").data("kendoMultiColumnComboBox").value(ID_TaiKhoan);
        $("#comboGiamSatTK").show();
        $("#comboGiamSatNV").hide();
        $("#txtGiamSat").hide();
    } else if (type == 1) {
        
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(ID_TaiKhoan);
        $("#comboGiamSatTK").hide();
        $("#comboGiamSatNV").show();
        $("#txtGiamSat").hide();
    } else {
        $("#comboGiamSatTK").hide();
        $("#comboGiamSatNV").hide();
        $("#txtGiamSat").show();
    }
}

function NhapExcel() {
    $("#windowImport").data("kendoWindow").center().maximize().open();
}

function HuyImport() {
    document.getElementById("formImport").reset();
    $("#windowImport").data("kendoWindow").close();
    $("#gridImport").data("kendoGrid").clearSelection();
}

function DownloadTemp(type) {
    if (type == 0) {
        $.ajax({
            url: '/NguoiGiamSat/UpdateTemplate_NhanVien',
            type: 'GET'
        }).done(function (response) {
            if (response.success) {
                window.open('../Content/ExcelTemplate/Temp_DanhMucNguoiGiamSat_NhanVien.xlsx', '_blank')
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    } else if (type == 1) {
        $.ajax({
            url: '/NguoiGiamSat/UpdateTemplate_LaoDong',
            type: 'GET'
        }).done(function (response) {
            if (response.success) {
                window.open('../Content/ExcelTemplate/Temp_DanhMucNguoiGiamSat_LaoDong.xlsx', '_blank')
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    } else {
        window.open('../Content/ExcelTemplate/Temp_DanhMucNguoiGiamSat_Khac.xls', '_blank')
    }
}
function ValidateList(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i]
        if (ValidateData(item)) {
            if (i == (data.length - 1)) {
                return true
            }
        } else {
            return false
        }
    }
    //$.each(data, function (index, item) {
    //    if (ValidateData(item)) {
    //        if (index == (data.length - 1)) {
    //            return true
    //        }
    //    } else {
    //        return false
    //    }
    //})
}

function ValidateData(item) {
    if (item.Loai == 2) {
        var validnhanvien = CheckValidItem(item.TenDayDu);
        return validnhanvien;
    } else if (item.Loai == 1) {
        var validnhanvien = CheckValidItem(item.TenDayDu);
        return validnhanvien;
    } else {
        var validnhanvien = CheckValidItem(item.TenDayDu);
        return validnhanvien;
    }
    //var validten = item.TenGiamSat !== "";
    //var validma = item.MaCongViec !== "";
    //var validcong = Number(item.Cong) >= 0;
    //var valid = validma && validten && validcong;
    //return valid
}
function CheckValidItem(item) {
    var valid = item !== "" && item != undefined;
    return valid
}
function LuuList(data) {
    if (ValidateList(data) == true) {
        $.ajax({
            url: '/NguoiGiamSat/InsertOrUpdate_ListNguoiGiamSat',
            type: 'POST',
            data: { list: data }
        }).done(function successCallback(response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
            $("#windowImport").data("kendoWindow").close();

        });
    } else {
        notification.show({ kValue: "Dữ liệu không hợp lệ" }, "error");
        //$("#windowImport").data("kendoWindow").close();

    }


}


function LuuImport() {
    var data = $("#gridImport").data("kendoGrid").dataSource.data();
    var valid_data = [];
    var count = 0;
    $.each(data, function (index, item) {
        valid_data.push({
            Loai: item.Loai,
            ID_TaiKhoan: item.ID_TaiKhoan ?? 0,
            TenDayDu: item.TenDayDu,
            DienThoai: item.DienThoai,
            GhiChu: item.GhiChu,
            DiaDiemLamViec: item.DiaDiemLamViec
        })
        count++;
    });
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn nhập " + count + " bản ghi danh mục công việc từ file excel?</b>", function () { LuuList(valid_data); }, function () { });

    console.log(valid_data);
}