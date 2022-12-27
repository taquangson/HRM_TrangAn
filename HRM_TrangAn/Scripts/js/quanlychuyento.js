$(".main_container").hide();
var selectdNhanVien = [];
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailChuyenToInit,
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
                field: "NgayTao",
                title: "Ngày tạo",
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
            //{
            //    field: "TenNhanVien",
            //    title: "Họ tên",
            //    width: "200px",
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
            //    field: "MaThuyen",
            //    title: "Mã số đò",
            //    width: "100px",
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
            //{
            //    field: "MaToNhom",
            //    title: "Mã tổ",
            //    width: "100px",
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
                field: "Cong",
                title: "Công/Người",
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
                field: "SoNhanVien",
                title: "Số nhân viên",
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
    $("#windowNhanVienToNhom").kendoWindow({
        width: "800",
        height: "600",
        title: "Danh sách nhân viên",
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
    $("#gridNhanVien").kendoGrid({
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
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
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
                field: "MaThuyen",
                title: "Mã số đò",
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
                field: "TenToNom",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
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
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
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
        ]

    });

    LoadGridData();
    //$.ajax({
    //    url: '/NhanVien/GetAllNhanVien',
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
    //                field: "MaThuyen",
    //                title: "Mã số đò",
    //                width: "200px",
    //            },
    //            {
    //                field: "MaToNhom",
    //                title: "Mã tổ",
    //                width: "200px",
    //            },
    //        ],
    //        footerTemplate: 'Tổng #: instance.dataSource.total() # nhân viên',
    //        filter: "contains",
    //        filterFields: ["TenDayDu", "MaThuyen", "MaToNhom"],
    //        suggest: true,
    //        delay: 1000,
    //        dataSource: dataSource,
    //        select: function (e) {
    //            $("#MaThuyen").val(e.dataItem.MaThuyen);
    //            $("#MaToNhom").val(e.dataItem.MaToNhom);
    //            // Use the selected item or its text
    //        }
    //    })
    //});

    
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
        $("#NgayTao").val(kendo.toString(selectedItem.NgayTao,'yyyy-mm-dd'));
        //$("#ID_TaiKhoan").val(selectedItem.ID_TaiKhoan);
        //$("#TenNhanVien").val(selectedItem.TenNhanVien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#Cong").val(selectedItem.Cong);

        //$("#MaToNhom").val(selectedItem.MaToNhom);
        //$("#MaThuyen").val(selectedItem.MaThuyen);
        //$("#ComboNhanVien").data("kendoMultiColumnComboBox").value(selectedItem.ID_NhanVien);
        //});

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
                    fields: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });

        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}


function LoadGridData() {
    $.ajax({
        url: '/ChuyenTo/GetAllChuyenTo',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        for (var i = 0; i < response.length; i++) {
            response[i].SoNhanVien = response[i].lstNhanVien.length
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
    var dataSource = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgaySinh: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}


function ValidateForm() {
    //var validnhanvien = SetValidate("ComboNhanVien");
    var validcong = SetValidate("Cong");
    //var valid = validnhanvien && validcong;
    return validcong;
    
}


function Luu() {

    if (ValidateForm()) {
        var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
        var bangDuLieuNhanVienChuyenTo = [];
        $.each(bangDuLieuNhanVien, function (index, item) {
            bangDuLieuNhanVienChuyenTo.push({
                ID_NhanVien: item.ID,
                TrangThai: 0,
            });
        })
        $.ajax({
            url: '/ChuyenTo/InsertOrUpdate_ChuyenTo',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                //ID_NhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").value(),
                //TenNhanVien: $("#ComboNhanVien").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
                //TenToNhom: $("#ComboNhanVien").data("kendoMultiColumnComboBox").dataItem().TenToNhom,
                //MaToNhom: $("#MaToNhom").val(),
                Cong: $("#Cong").val(),
                lstNhanVienChuyenTo: bangDuLieuNhanVienChuyenTo,
                //MaThuyen: $("#MaThuyen").val(),
                GhiChu: $("#GhiChu").val(),
                NgayTao: $("#NgayTao").val()
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
        url: '/ChuyenTo/DeleteMutli_ChuyenTo?ID=' + ids.join(','),
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
            MaNhanVien: item.MaNhanVien

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
                    }
                }
            }
        },
        pageSize: 20,
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
            }
        ]
    })

}

function detailChuyenToInit(e) {
    console.log(e.data);
    var detailRow = e.detailRow;
    
    
    var lstNhanVien = [];
    $.each(e.data.lstNhanVien, function (index, item) {
        lstNhanVien.push({
            STT: index + 1,
            ID: item.ID,
            MaThuyen: item.MaThuyen,
            TenToNhom: item.TenToNhom,
            MaToNhom: item.MaToNhom,
            TenDayDu: item.TenDayDu,
            MaThuyen: item.MaThuyen,
            MaNhanVien: item.MaNhanVien

        })
    })
    var dataSource = new kendo.data.DataSource({
        data: lstNhanVien,
        schema: {
            model: {
                id: "ID",
                fields: {
                    NgaySinh: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
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
        columns: [

            {
                title: "STT",
                field: "STT",
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
                field: "MaThuyen",
                title: "Mã số đò",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]

    })

}

function openAddNhanVienToNhomWindow() {
    selectdNhanVien = []
    $.ajax({
        url: '/ToNhom/GetAllToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVienToNhom"), true);
        var dataNhanVienToNhomChuaPhanCong = []
        //$.ajax({
        //    url: '/NhanVien/GetAllNhanVienNgoaiToNhom',
        //    type: 'GET',
        //}).done(function successCallback(response2) {
        //    var lstNhanVienNgoaiToNhomChuaPhanCong = [];
        //    for (var i = 0; i < response2.length; i++) {
        //        if (!CheckNhanVienChuaPhanCong(response2[i].ID)) {
        //            lstNhanVienNgoaiToNhomChuaPhanCong.push(response2[i])
        //        }
        //    }
        //    dataNhanVienToNhomChuaPhanCong.push({
        //        ID: 0,
        //        TenToNhom: "Không có tổ",
        //        MaToNhom: "",
        //        lstNhanVien: response2,
        //        lstNhanVienChuaPhanCong: lstNhanVienNgoaiToNhomChuaPhanCong


        //    })
        getDataNhanVienNgoaiTo(function (json) {
            dataNhanVienToNhomChuaPhanCong = json
            for (var i = 0; i < response.length; i++) {
                var lstNhanVienChuaPhanCong = [];
                if (response[i].lstNhanVien.length > 0) {
                    console.log(response[i].lstNhanVien)

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

            console.log(dataNhanVienToNhomChuaPhanCong);
            var dataSource = new kendo.data.DataSource({

                data: dataNhanVienToNhomChuaPhanCong,
                schema: {
                    model: {
                        ID: "ID",
                        fields: {
                            NgaySinh: {
                                type: 'date'
                            }
                        }
                    }
                },
                pageSize: 20,
            });

            $("#gridAddNhanVienToNhom").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#gridAddNhanVienToNhom"), false);
            if ($(window).width() > 800) {
                $("#windowNhanVienToNhom").data("kendoWindow").center().open();
            } else {
                $("#windowNhanVienToNhom").data("kendoWindow").center().maximize().open();
            }
        })


        //});

    });
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
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuNhanVien, function (index, item) {
        if (idnhanvien == item.ID) {
            isExisted = true;
        }
    })

    return isExisted;
}

function LuuAddNhanVienToNhom() {
    $("#windowNhanVienToNhom").data("kendoWindow").close();
    var bangDuLieuNhanVienTo = $("#gridNhanVien").data("kendoGrid").dataSource.data();
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
            MaNhanVien: item.MaNhanVien
        });
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
            MaNhanVien: item.MaNhanVien
        });
    })
    //var bangDuLieuAddNhanVien = $("#gridAddNhanVienToNhom").data("kendoGrid");
    //bangDuLieuAddNhanVien.select().each(function () {
    //    var dataItem = bangDuLieuAddNhanVien.dataItem(this);
    //    bangDuLieuNhanVien.push({
    //        ID: dataItem.ID,
    //        TenDayDu: dataItem.TenDayDu,
    //        SoDienThoai: dataItem.SoDienThoai,
    //        Email: dataItem.Email,
    //        CCCD: dataItem.CCCD,
    //        NgaySinh: dataItem.NgaySinh,
    //        DiaChi: dataItem.DiaChi,
    //        TrangThai: dataItem.TrangThai,
    //        MaNhanVien: dataItem.MaNhanVien
    //    });
    //});

    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuNhanVien,
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgaySinh: {
                        type: 'date'
                    }
                }
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

}
function DeleteRow(uid) {
    var dataRow = $('#gridNhanVien').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridNhanVien').data("kendoGrid").dataSource.remove(dataRow);
}



