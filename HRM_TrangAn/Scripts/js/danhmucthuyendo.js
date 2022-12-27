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
        editable: { mode: "incell" },
        save: function (e) {
            console.log(e);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách thuyền";
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
                field: "MaThuyen",
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
                field: "TenDayDu",
                title: "Tên nhân viên",
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
                field: "Name_LoaiThuyen",
                title: "Loại thuyền",
                width: "120px",
                template: function (e) {
                    if (e.LoaiThuyen == 1) {
                        return "Inox";
                    } else if (e.LoaiThuyen == 2) {
                        return "Sắt";
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "SoLanCap",
                title: "Số lần cấp",
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
                field: "ChieuDai",
                title: "Chiều dài (m)",
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
                field: "ChieuRong",
                title: "Chiều rộng (m)",
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
                field: "MauSon",
                title: "Màu sơn",
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
                field: "TinhTrang",
                title: "Tình trạng",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<span style='color:blue'>" + "Mới" + "</span>";
                    } else {
                        return "<span style='color:red'>Cũ</span>";
                    }
                },
                editor: CapNhatTrangThaiDropDown,
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
        editable: { mode: "incell" },
        save: function (e) {
            console.log(e);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        },
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
                field: "MaThuyen",
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
                field: "ID_LoaiThuyen",
                title: "Loại thuyền",
                width: "120px",
                template: function (e) {
                    if (e.ID_LoaiThuyen == 1) {
                        return "Inox";
                    } else if (e.ID_LoaiThuyen == 2) {
                        return "Sắt";
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "SoLanCap",
                title: "Số lần cấp",
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
                field: "ChieuDai",
                title: "Chiều dài (m)",
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
                field: "ChieuRong",
                title: "Chiều rộng (m)",
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
                field: "MauSon",
                title: "Màu sơn",
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
                field: "TrangThai",
                title: "Tình trạng",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<span style='color:blue'>" + "Mới" + "</span>";
                    } else {
                        return "<span style='color:red'>Cũ</span>";
                    }
                },
                editor: CapNhatTrangThaiDropDown,
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
    $("#ComboLoai").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 1,
                    Name: "Inox"
                },
                {
                    ID: 2,
                    Name: "Sắt"
                },
            ]
        }
    });
    $("#ComboTinhTrang").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Cũ"
                },
                {
                    ID: 1,
                    Name: "Mới"
                },
            ]
        }
    });
    $.ajax({
        url: '/NhanVien/GetAllNhanVien',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,

        });
        $("#ComboNhanVien").kendoMultiColumnComboBox({
            dataTextField: "MaNhanVien",
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
    LoadGridData();
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
        console.log(json_object);
        jsondata = JSON.parse(json_object);
        console.log("jsondata: ", jsondata);
            $.each(jsondata, function (index, item) {
                item.STT = index + 1;
                item.MaLaiDo = item.MaNhanVien;
                item.MaNhanVien = item.MaNhanVien;
                item.MaThuyen = item.MaThuyen;
                item.ID_NhanVien = item.ID_NhanVien;
                item.LoaiThuyen = item.LoaiThuyen;
                item.ID_LoaiThuyen = item.ID_LoaiThuyen;
                item.SoLanCap = item.SoLanCap;
                item.ChieuDai = item.ChieuDai;
                item.ChieuRong = item.ChieuRong;
                item.MauSon = item.MauSon;
                item.TinhTrang = item.TinhTrang;
                item.TrangThai = item.TrangThai;
            })
            //lenght = jsondata.length;
            console.log(jsondata);
            var dsgrid = new kendo.data.DataSource({
                data: jsondata
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
        $("#MaThuyen").val(selectedItem.MaThuyen);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        $("#SoLanCap").val(selectedItem.SoLanCap);
        $("#ChieuDai").val(selectedItem.ChieuDai);
        $("#ChieuRong").val(selectedItem.ChieuRong);
        $("#MauSon").val(selectedItem.MauSon);
        $("#ComboLoai").data("kendoComboBox").value(selectedItem.LoaiThuyen);
        $("#ComboTinhTrang").data("kendoComboBox").value(selectedItem.TrangThai);

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
        $("#MaThuyen").val(selectedItem.MaThuyen);
        $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        $("#SoLanCap").val(selectedItem.SoLanCap);
        $("#ChieuDai").val(selectedItem.ChieuDai);
        $("#ChieuRong").val(selectedItem.ChieuRong);
        $("#MauSon").val(selectedItem.MauSon);
        $("#ComboLoai").data("kendoComboBox").value(selectedItem.LoaiThuyen);
        $("#ComboTinhTrang").data("kendoComboBox").value(selectedItem.TrangThai);

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
        url: '/ThuyenDo/GetAllThuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        //kendo.ui.progress($("#grid"), true);
        for (var i = 0; i < response.length; i++) {
            if (response[i].LoaiThuyen == 1) {
                response[i].Name_LoaiThuyen = "Inox";
            } else if (response[i].LoaiThuyen == 2) {
                response[i].Name_LoaiThuyen = "Sắt";
            } else {
                response[i].Name_LoaiThuyen = "";
            }
            if (response[i].TrangThai == 0) {
                response[i].TinhTrang = "Cũ";
            } else {
                response[i].TinhTrang = "Mới";
            }
        }
        
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayTao: {
                            type: 'date', editable: false
                        },
                        MaThuyen: { type: "text", editable: false },
                        MaNhanVien: { type: "text", editable: false },
                        LoaiThuyen: { type: "text", editable: false },
                        SoLanCap: { type: "text", editable: false },
                        ChieuDai: { type: "text", editable: false },
                        ChieuRong: { type: "text", editable: false },
                        MauSon: { type: "text", editable: false },
                        TrangThai: { type: "number", editable: false },
                        

                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        //kendo.ui.progress($("#grid"), false);
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

function ValidateForm(callback) {
    var validma = SetValidate("MaThuyen");
    var validloai = SetValidate("ComboLoai");
    var validlan = SetValidate("SoLanCap");
    var validtrangthai = SetValidate("ComboTinhTrang");
    var valid = validma && validloai && validlan && validtrangthai;
    if (valid) {
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            CheckMa($("#MaThuyen").val(), function (stt) {
                callback(stt);
            })

        } else {
            var grid = $("#grid").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            if ($("#MaThuyen").val() !== selectedItem.MaThuyen || ($("#ID").val() == '')) {
                CheckMa($("#MaThuyen").val(), function (stt) {
                    callback(stt);
                })
            } else {
                callback(valid);
            }
        }

    } else {
        callback(valid);
    }
}

function CheckMa(ma, callback) {
    $.ajax({
        url: '/ThuyenDo/GetByMaThuyenDo?MaThuyen=' + ma,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.length > 0) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Mã số đò đã tồn tại");

            callback(false)
        } else {
            callback(true)
        }
    })
}

function Luu() {
    // var grid = $("#grid").data("kendoGrid");
    // var selectedItem = grid.dataItem(grid.select());
    var isEdit = 0;
    // if (selectedItem.ID_NhanVien > 0) {
    //     if (selectedItem.ID_NhanVien !== $("#ComboNhanVien").data("kendoMultiColumnComboBox").value()) {
    //         isEdit = 1;
    //     } else {
    //         isEdit = 0;
    //     }
    // } else {
    //     isEdit = 1;
    // }
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/ThuyenDo/InsertOrUpdate_ThuyenDo',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    MaThuyen: $("#MaThuyen").val(),
                    ID_NhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(),
                    LoaiThuyen: $("#ComboLoai").data("kendoComboBox").value(),
                    SoLanCap: $("#SoLanCap").val(),
                    ChieuDai: $("#ChieuDai").val(),
                    TrangThai: $("#ComboTinhTrang").data("kendoComboBox").value(),
                    ChieuRong: $('#ChieuRong').val(),
                    MauSon: $('#MauSon').val(),
                    isEditNhanVien: isEdit

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
    })
    
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
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
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
        url: '/ThuyenDo/DeleteMulti_ThuyenDo?ID=' + ids.join(','),
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
function CapNhatTrangThai(id, trangthai) {
    $.ajax({
        url: '/ThuyenDo/UpdateTrangThai_ThuyenDo?ID=' + id + '&TrangThai=' + trangthai,
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
                        TrangThai: "Cũ"
                    },
                    {
                        ID_TrangThai: 1,
                        TrangThai: "Mới"
                    },
                ]
            },
            autoWidth: true
        });
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

function NhapExcel() {
    $("#windowImport").data("kendoWindow").center().maximize().open();
}

function DownloadTemp() {
    $.ajax({
        url: '/ThuyenDo/UpdateTemplate',
        type: 'GET'
    }).done(function (response) {
        if (response.success) {
            window.open('../Content/ExcelTemplate/Temp_DanhMucThuyen.xlsx', '_blank')
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function ValidateList(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (ValidateData(item)) {
            if (i == (data.length - 1)) {
                return true
            }
        } else {
            return false
        }
    }
}

function ValidateData(item) {
    var validma = CheckValidItem(item.MaThuyen);
    var validloai = CheckValidItem(item.LoaiThuyen);
    var validlan = CheckValidItem(item.SoLanCap);
    var validtrangthai = CheckValidItem(item.TrangThai);
    var valid = validma && validloai && validlan && validtrangthai;
    return valid
}
function CheckValidItem(item) {
    var valid = item !== "" && item != undefined;
    return valid
}
function LuuList(data) {
    if (ValidateList(data)) {
        $.ajax({
            url: '/ThuyenDo/InsertOrUpdate_ListThuyenDo',
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
        $("#windowImport").data("kendoWindow").close();

    }


}

function CheckDublicate(arrayOfObjects) {
    const lookup = arrayOfObjects.reduce((a, e) => {
        a[e.MaThuyen] = ++a[e.MaThuyen] || 0;
        return a;
    }, {});
    console.log(arrayOfObjects.filter(e => lookup[e.MaThuyen]));

    return arrayOfObjects.filter(e => lookup[e.MaThuyen])
}

function LuuImport() {
    var data = $("#gridImport").data("kendoGrid").dataSource.data();
    var valid_data = [];
    var check_data = [];
    var checkall_data = [];

    var count = 0;
    var grid_data = $("#grid").data("kendoGrid").dataSource.data();
    $.each(data, function (index, item) {
        check_data.push({
            MaThuyen: item.MaThuyen,
            ID_NhanVien: item.ID_NhanVien,
            LoaiThuyen: item.ID_LoaiThuyen,
            SoLanCap: item.SoLanCap,
            ChieuDai: item.ChieuDai,
            TrangThai: item.TrangThai,
            ChieuRong: item.ChieuRong,
            MauSon: item.MauSon,
        })
        checkall_data.push({
            MaThuyen: item.MaThuyen,
            ID_NhanVien: item.ID_NhanVien,
            LoaiThuyen: item.ID_LoaiThuyen,
            SoLanCap: item.SoLanCap,
            ChieuDai: item.ChieuDai,
            TrangThai: item.TrangThai,
            ChieuRong: item.ChieuRong,
            MauSon: item.MauSon,
        })

    });
    $.each(grid_data, function (index, item) {
        checkall_data.push({
            MaThuyen: item.MaThuyen,
            ID_NhanVien: item.ID_NhanVien,
            LoaiThuyen: item.ID_LoaiThuyen,
            SoLanCap: item.SoLanCap,
            ChieuDai: item.ChieuDai,
            TrangThai: item.TrangThai,
            ChieuRong: item.ChieuRong,
            MauSon: item.MauSon,
        })
    });
    var dubAll_data = CheckDublicate(checkall_data);
    var dub_data = CheckDublicate(check_data);
    if (dub_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã số đò không được trùng nhau: " + dub_data[0].MaThuyen }, "error");
    } else if (dubAll_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã số đò đã tồn tại trong hệ thống: " + dub_data[0].MaThuyen }, "error");
    } else {
        $.each(data, function (index, item) {
            valid_data.push({
                MaThuyen: item.MaThuyen,
                ID_NhanVien: item.ID_NhanVien,
                LoaiThuyen: item.ID_LoaiThuyen,
                SoLanCap: item.SoLanCap,
                ChieuDai: item.ChieuDai,
                TrangThai: item.TrangThai,
                ChieuRong: item.ChieuRong,
                MauSon: item.MauSon,
            })
            count++;
        });
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn nhập " + count + " bản ghi danh mục công việc từ file excel?</b>", function () { LuuList(valid_data); }, function () { });
    }

    console.log(valid_data);
}

function HuyImport() {
    document.getElementById("formImport").reset();
    $("#windowImport").data("kendoWindow").close();
    $("#gridImport").data("kendoGrid").clearSelection();
}