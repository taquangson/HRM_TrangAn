$(".main_container").hide();
$(document).ready(function () {
    $("#Nam").kendoDatePicker({
        format: "yyyy",
        value: new Date(),
        dateInput: true,
        start: "decade",
        depth: "year"
    });

    var date = new Date();
    date.setDate(date.getDate() - 1);
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 200;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            pageSize: 50,
        }),
        scrollable: true,
        selectable: "single",
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailNghiPhepNamInit,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách nghỉ phép năm";
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
                width: "16px",
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
                }
            },
            {
                title: "Số ngày nghỉ",
                //hidden: isMobile.any(),
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "SoNgayNghiPhepHienTai",
                        title: "Số ngày nghỉ hiện tại",
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
                        field: "SoNgayNghiPhepQuyDinh",
                        title: "Số ngày nghỉ quy định",
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
        ]
    });

    /*$("#gridNgayNghi").kendoGrid({
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
        filterable: {
            mode: "row",
        },
        editable: true,
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        dataSource: {
            data: [],
            schema: {
                model: {
                    ID: "ID", // Định danh
                    fields: {
                        ID_HoSoNhanSu: { type: "number" }, // Kiểu dữ liệu
                        NgayNghi: { type: "date" }
                    }
                }
            }
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
                width: "50px",
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào chính sách lương' style='width:50%; height:25px;float: left; position: relative;' onclick='addNewRow()'><i class='fa fa-plus'></i></a><a class='k-button' title='Xóa nhân viên đã chọn' style='width:50%; height:25px;float: left; position: relative;' onclick='deleteSelectedRows()'><i class='fa fa-minus'></i></a>")

                        }
                    }
                },
            },
            {
                field: "NgayNghi",
                format: "{0:dd/MM/yyyy}",
                title: "Ngày nghỉ",
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
                field: "GhiChu",
                title: "Ghi chú",
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
        ]
    });*/

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        console.log(row);
        console.log($("#grid").data("kendoGrid").select())
        $("#grid").data("kendoGrid").select(row);
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        openEditWindow();
    })

    $("#window").kendoWindow({
        width: "600px",
        title: "Chi tiết",
        visible: false, // Ẩn cửa sổ khi khởi tạo
        modal: true,    // Đặt chế độ modal
        actions: ["Close"]
    });


    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

/*function addNewRow() {
    var gridNgayNghi = $("#gridNgayNghi").data("kendoGrid");
    var grid = $("#grid").data("kendoGrid");
    
    var rows = grid.select();
    gridNgayNghi.addRow();
    grid.clearSelection();
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(rows[0]).attr("data-uid") + "]");
    grid.select(row);
}

function deleteSelectedRows() {
    var gridNgayNghi = $("#gridNgayNghi").data("kendoGrid");
    var grid = $("#grid").data("kendoGrid");
    var checkedBoxes = $("#gridNgayNghi").find("input:checked");
    if (gridNgayNghi.select().length > 0) {
        var items = [];
        gridNgayNghi.select().each(function (index, item) {
            var dataItem = gridNgayNghi.dataItem(item);
            items.push(dataItem);
        });
        $.each(items, function (index, item) {
            $('#gridNgayNghi').data("kendoGrid").dataSource.remove(item);
            console.log(item);
            console.log(index);
        })
    }
    //checkedBoxes.each(function () {
    //    var row = $(this).closest("tr"); 
    //    var dataItem = gridNgayNghi.dataItem(row);
    //    itemsToRemove.push(dataItem);
    //});
    //itemsToRemove.forEach(function (item) {
    //    gridNgayNghi.dataSource.remove(item);
    //});
    //var rows = grid.select();
    //grid.clearSelection();
    //var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(rows[0]).attr("data-uid") + "]");
    //grid.select(row);
}
*/


/*function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $("#btnSave").show();
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID_HoSoNhanSu);
        $("#TenDayDu").val(selectedItem.TenDayDu);
        $("#MaNhanVien").val(selectedItem.MaNhanVien);

        var listNgayNghiPhep = selectedItem.ListNgayNghiPhep;
        console.log(listNgayNghiPhep)
        var dataSource = new kendo.data.DataSource({
            data: listNgayNghiPhep,
            schema: {
                model: {
                    fields: {
                        NgayNghi: { type: 'date' }, // Kiểu dữ liệu là ngày
                    }
                }
            },
            pageSize: 100
        });
        console.log(dataSource);

        $("#gridNgayNghi").data("kendoGrid").setDataSource(dataSource);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();

        }

    }

}*/
function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/NghiPhepNam/GetByNam' + "?Nam=" + kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy"),
        type: 'GET',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        console.log(response);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID_HoSoNhanSu",
                    fields: {
                        SoNgayNghiPhepHienTai: { type: 'number', editable: false },
                        SoNgayNghiPhepQuyDinh: { type: 'number', editable: false },
                    }
                }
            },
            pageSize: 30,
        });

        console.log(dataSource);
        console.log($("#grid").data("kendoGrid"));
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);

    });
}

//function LoadGridData() {
//    kendo.ui.progress($("#grid"), true);
//    $.ajax({
//        url: '/KeHoach/GetAllKeHoach',
//        type: 'GET',
//    }).done(function successCallback(r) {
//        response = JSON.parse(r);
//        for (var i = 0; i < response.length; i++) {
//            var lst1 = []
//            var lst2 = []
//            response[i].TongCong = 0;
//            response[i].CongTT = 0;
//            if (response[i].lstNhanVien) {
//                for (var j = 0; j < response[i].lstNhanVien.length; j++) {
//                    if (response[i].lstNhanVien[j].TrangThai == 0) {
//                        lst1.push(response[i].lstNhanVien[j]);
//                        response[i].TongCong = response[i].TongCong + response[i].lstNhanVien[j].Cong;
//                    } else {
//                        lst2.push(response[i].lstNhanVien[j]);
//                        response[i].CongTT = response[i].CongTT + response[i].lstNhanVien[j].Cong;
//                    }
//                }
//            }
//            response[i].SlgDK = lst1.length > response[i].SoNguoiDuKien ? lst1.length : response[i].SoNguoiDuKien;
//            response[i].SlgTT = lst2.length;
//            response[i].SlgCL = response[i].SlgTT - response[i].SlgDK;
//            response[i].CongCL = response[i].TongCong - response[i].CongTT;
//            var strTo = "";
//            var strMa = "";


//        }

//        var dataSource = new kendo.data.DataSource({
//            data: response,
//            schema: {
//                model: {
//                    id: "ID",
//                    fields: {
//                        NgayLamViec: { type: 'date', editable: false },
//                        NgayTao: { type: 'date', editable: false },
//                        ThoiGianBatDauDuKien: { type: 'date', editable: false },
//                        ThoiGianKetThucDuKien: { type: 'date', editable: false },
//                        ThoiGianBatDauThucTe: { type: 'date', editable: false },
//                        ThoiGianKetThucThucTe: { type: 'date', editable: false },
//                    }
//                }
//            },
//            pageSize: 20,
//        });
//        $("#grid").data("kendoGrid").setDataSource(dataSource);

//        kendo.ui.progress($("#grid"), false);

//    });
//}

/*function ThemMoi() {
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
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        //pageSize: 20,
    });
    $("#btnSave").show();
    $("#gridToNhom").data("kendoGrid").setDataSource(dataSource);
    $("#window").data("kendoWindow").center().maximize().open();
    //}
}*/

/*function ValidateForm() {
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
}*/

/*function Luu() {
    var gridNN = $("#gridNgayNghi").data("kendoGrid");
    var dataSourceNN = gridNN.dataSource.data();
    //var grid = $("#grid").data("kendoGrid");
    //var selectedRows = gridNN.select(); // Lấy các hàng được chọn
    var listNN = [];

    $.each(dataSourceNN,function (index, item) {
        //var item = gridNN.dataItem(this); // Lấy dataItem của hàng được chọn
        console.log("Phần tử:", item);
        var fixitem = {
            ID_HoSoNhanSu: $("#ID").val(),
            //ID_HoSoNhanSu: item.ID_HoSoNhanSu,
            NgayNghi: null, // Khởi tạo với null
            GhiChu: null,
        };
        if (item.NgayNghi != null) {
            fixitem.NgayNghi = kendo.toString(item.NgayNghi, "yyyy/MM/dd");
        }
        if (item.GhiChu != null) {
            fixitem.GhiChu = item.GhiChu;
        }
       
        listNN.push(fixitem);
    });

    console.log(listNN);
    $.ajax({
        url: '/NghiPhepNam/UpdateListNgayNghiPhep',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            ID_HoSoNhanSu: $("#ID").val(),
            ListNgayNghiPhep: listNN,
            Nam: kendo.toString($("#Nam").data("kendoDatePicker").value(), "yyyy")
        }),
        success: function (response) {
            console.log(response);
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                HuyApDung();
                TimKiem();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        },
        error: function (error) {
            console.error(error);
            notification.show({ kValue: "Có lỗi xảy ra!" }, "error");
        }
    });
}

function HuyApDung() {
    $("#window").data("kendoWindow").close();
    var grid = $("#gridNgayNghi").data("kendoGrid");
    var DataSource = new kendo.data.DataSource();
    grid.setDataSource(DataSource);
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
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " công việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
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
}*/

function detailNghiPhepNamInit(e) {
    var detailRow = e.detailRow;
    var listNgayNghiPhep = [];
    $.each(e.data.ListNgayNghiPhep, function (index, item) {
        listNgayNghiPhep.push({
            ID: item.ID,
            ID_HoSoNhanSu: item.ID_HoSoNhanSu,
            ID_NguoiSua: item.ID_NguoiSua,
            ID_NguoiTao: item.ID_NguoiTao,
            NgayNghi: item.NgayNghi,
            NgayTao: item.NgayTao,
            TrangThai: item.TrangThai,
            GhiChu: item.GhiChu
        })
    })
    var dataSource = new kendo.data.DataSource({
        data: listNgayNghiPhep,
        schema: {
            model: {
                fields: {
                    NgayNghi: { type: "date" }
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
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách nghỉ phép năm chi tiết";
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
                field: "NgayNghi",
                format: "{0:dd/MM/yyyy}",
                title: "Ngày nghỉ",
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
                field: "GhiChu",
                title: "Ghi chú",
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
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "NghiPhepNam.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}