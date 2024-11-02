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
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái hoạt động của điểm?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách điểm quẹt thẻ";
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
                field: "TenDiem",
                title: "Tên điểm",
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
                field: "DiaDiem",
                title: "Điểm quẹt thẻ",
                width: "400px",
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
                field: "DiaChiIP",
                title: "Địa chỉ IP",
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            //{
            //    field: "Port",
            //    title: "Port",
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
            },
            {
                field: "TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<span style='color:blue'>" + "Hoạt động" + "</span>";
                    } else {
                        return "<span style='color:red'>Tạm dừng</span>";
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
                field: "TenDiem",
                title: "Tên điểm",
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
                field: "DiaDiem",
                title: "Điểm quẹt thẻ",
                width: "400px",
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
                field: "DiaChiIP",
                title: "Địa chỉ IP",
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "Port",
                title: "Port",
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
                    class: "table-header-cell"
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
    $("#windowMCC").kendoWindow({
        width: "800",
        height: "400",
        title: "Danh sách máy chấm công",
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
    $("#gridMCC").kendoGrid({
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

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                title: "STT",
                field: "MaThietBi",
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
                            e.element.parent().html("<a class='k-button' title='Thêm máy chấm công' style='width:100%; height:25px;' onclick='openAddMCCWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "TenThietBi",
                title: "Tên thiết bị",
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
                field: "MaThietBi",
                title: "Mã thiết bị",
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
                field: "DiaChiIP",
                title: "Địa chỉ IP",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                    class: "table-header-cell"
                }
            },
            {
                field: "Port",
                title: "Port",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                    class: "table-header-cell"
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
    $("#gridAddMCC").kendoGrid({
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
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách máy chấm công";
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
                field: "TenThietBi",
                title: "Tên thiết bị",
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
                field: "MaThietBi",
                title: "Mã thiết bị",
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
                field: "DiaChiIP",
                title: "Địa chỉ IP",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                    class: "table-header-cell"
                }
            },
            {
                field: "Port",
                title: "Port",
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
                    style: "text-align: right; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: left;",
                    class: "table-header-cell"
                }
            },

        ]

    });

    function PushFormDataFile(file) {
        kendo.ui.progress($("#gridImport"), true);
        parseExcel(file.rawFile);
    }
    LoadGridData();
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
                item.TenDiem = item.TenDiem;
                item.MaDiem = item.MaDiem;
                item.DiaDiem = item.DiaDiem;
                item.DiaChiIP = item.DiaChiIP;
                item.Port = item.Port;
                item.ThongTinThietBi = item.ThongTinThietBi;
                item.GhiChu = item.GhiChu;
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
        $("#TenDiem").val(selectedItem.TenDiem);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaDiem").val(selectedItem.MaDiem);
        $("#DiaChiIP").val(selectedItem.DiaChiIP);
        $("#Port").val(selectedItem.Port);
        $("#DiaDiem").val(selectedItem.DiaDiem);
        $("#ThongTinThietBi").val(selectedItem.ThongTinThietBi);
        $("#DanhSachMCC").val(selectedItem.lstMayChamCong);
        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstMayChamCong,
            schema: {
                model: {
                    ID: "ID",
                    fields: {

                    }
                }
            },
            pageSize: 20,
        });
        $("#gridMCC").data("kendoGrid").setDataSource(dataSource);
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
        $("#TenDiem").val(selectedItem.TenDiem);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaDiem").val(selectedItem.MaDiem);
        $("#DiaChiIP").val(selectedItem.DiaChiIP);
        $("#Port").val(selectedItem.Port);
        $("#DiaDiem").val(selectedItem.DiaDiem);
        $("#ThongTinThietBi").val(selectedItem.ThongTinThietBi);
        $("#DanhSachMCC").val(selectedItem.lstMayChamCong);
        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstMayChamCong,
            schema: {
                model: {
                    ID: "ID",
                    fields: {

                    }
                }
            },
            pageSize: 20,
        });
        $("#gridMCC").data("kendoGrid").setDataSource(dataSource);
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
        url: '/DiemQuetThe/GetAllDiemQuetThe',
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].lstMayChamCong != null && response[i].lstMayChamCong != undefined) {
                if (response[i].lstMayChamCong.length > 0) {
                    if (response[i].lstMayChamCong.length == 1) {
                        response[i].DiaChiIP = response[i].lstMayChamCong[0].DiaChiIP + ":" + response[i].lstMayChamCong[0].Port
                    } else {
                        var str = ""
                        for (var j = 0; j < response[i].lstMayChamCong.length; j++) {
                            if (j == 0) {
                                str = response[i].lstMayChamCong[j].DiaChiIP + ":" + response[i].lstMayChamCong[j].Port

                            } else {
                                str = str + "\n" + response[i].lstMayChamCong[j].DiaChiIP + ":" + response[i].lstMayChamCong[j].Port

                            }
                        }
                        response[i].DiaChiIP = str

                    }
                    
                }
            }
        }
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgaySinh: {
                            type: 'date', editable: false
                        },
                        GhiChu: { type: "text", editable: false },
                        DiaDiem: { type: "text", editable: false },
                        MaDiem: { type: "text", editable: false },
                        DiaChiIP: { type: "text", editable: false },
                        Port: { type: "text", editable: false },
                        TenDiem: { type: "text", editable: false },
                        TrangThai: { type: "number", editable: true }

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

function ValidateForm(callback) {
    var validten = SetValidate("TenDiem");
    var validma = SetValidate("MaDiem");
    var validdiadiem = SetValidate("DiaDiem");
    //var validdiachiip = SetValidate("DiaChiIP");
    //var validport = SetValidate("Port");
    var valid = validma && validten && validdiadiem ;
    if (valid) {
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            CheckMa($("#MaDiem").val(), function (stt) {
                callback(stt);
            })

        } else {
            var grid = $("#grid").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            if ($("#MaDiem").val() !== selectedItem.MaDiem || ($("#ID").val() == '')) {
                CheckMa($("#MaDiem").val(), function (stt) {
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
        url: '/DiemQuetThe/GetByMaDiemQuetThe?MaDiem=' + ma,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.length > 0) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Mã điểm đã tồn tại");

            callback(false)
        } else {
            callback(true)
        }
    })
}

function Luu() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var bangDuLieuMCC = $("#gridMCC").data("kendoGrid").dataSource.data();
    var bangDuLieuMCCDQT = [];
    $.each(bangDuLieuMCC, function (index, item) {
        bangDuLieuMCCDQT.push({
            ID_MayChamCong: item.ID,

        });
    })
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/DiemQuetThe/InsertOrUpdate_DiemQuetThe',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenDiem: $("#TenDiem").val(),
                    GhiChu: $("#GhiChu").val(),
                    MaDiem: $("#MaDiem").val(),
                    DiaChiIP: "",
                    Port: "",
                    TrangThai: $("#ID").val() > 0 ? selectedItem.TrangThai : 1,
                    ThongTinThietBi: $('#ThongTinThietBi').val(),
                    DiaDiem: $('#DiaDiem').val(),
                    lstMayChamCongDiemQuetThe: bangDuLieuMCCDQT

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
        url: '/DiemQuetThe/DeleteMulti_DiemQuetThe?ID=' + ids.join(','),
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
        url: '/DiemQuetThe/UpdateTrangThai_DiemQuetThe?ID=' + id + '&TrangThai=' + trangthai,
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
                        TrangThai: "Tạm dừng"
                    },
                    {
                        ID_TrangThai: 1,
                        TrangThai: "Hoạt động"
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
    window.open('../Content/ExcelTemplate/Temp_DanhMucDiemQuetThe.xlsx', '_blank')
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
    var validten = CheckValidItem(item.TenDiem) ;
    var validma = CheckValidItem(item.MaDiem);
    var validdiadiem = CheckValidItem(item.DiaDiem);
    var validdiachiip = CheckValidItem(item.DiaChiIP);
    var validport = CheckValidItem(item.Port);
    var valid = validma && validten && validdiadiem && validdiachiip && validport;
    return valid
}
function CheckValidItem(item) {
    var valid = item !== "" && item != undefined;
    return valid
}
function LuuList(data) {
    if (ValidateList(data)) {
        $.ajax({
            url: '/DiemQuetThe/InsertOrUpdate_ListDiemQuetThe',
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
        a[e.MaDiem] = ++a[e.MaDiem] || 0;
        return a;
    }, {});
    console.log(arrayOfObjects.filter(e => lookup[e.MaDiem]));

    return arrayOfObjects.filter(e => lookup[e.MaDiem])
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
            TenDiem: item.TenDiem,
            MaDiem: item.MaDiem,
            DiaDiem: item.DiaDiem,
            DiaChiIP: item.DiaChiIP,
            Port: item.Port,
            ThongTinThietBi: item.ThongTinThietBi,
            GhiChu: item.GhiChu
        })
        checkall_data.push({
            TenDiem: item.TenDiem,
            MaDiem: item.MaDiem,
            DiaDiem: item.DiaDiem,
            DiaChiIP: item.DiaChiIP,
            Port: item.Port,
            ThongTinThietBi: item.ThongTinThietBi,
            GhiChu: item.GhiChu
        })

    });
    $.each(grid_data, function (index, item) {
        checkall_data.push({
            TenDiem: item.TenDiem,
            MaDiem: item.MaDiem,
            DiaDiem: item.DiaDiem,
            DiaChiIP: item.DiaChiIP,
            Port: item.Port,
            ThongTinThietBi: item.ThongTinThietBi,
            GhiChu: item.GhiChu
        })
    });
    var dubAll_data = CheckDublicate(checkall_data);
    var dub_data = CheckDublicate(check_data);
    if (dub_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã điểm không được trùng nhau: " + dub_data[0].MaDiem }, "error");
    } else if (dubAll_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã điểm đã tồn tại trong hệ thống: " + dub_data[0].MaDiem }, "error");
    } else {
        $.each(data, function (index, item) {
            valid_data.push({
                TenDiem: item.TenDiem,
                MaDiem: item.MaDiem,
                DiaDiem: item.DiaDiem,
                DiaChiIP: item.DiaChiIP,
                Port: item.Port,
                ThongTinThietBi: item.ThongTinThietBi,
                GhiChu: item.GhiChu
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

function openAddMCCWindow() {
    $.ajax({
        url: '/MayChamCong/GetAllMayChamCong',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddMCC"), true);
        var lstMCCNgoaiToNhom = [];
        for (var i = 0; i < response.length; i++) {
            if (!CheckMCCTrongToNhom(response[i].ID)) {
                lstMCCNgoaiToNhom.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstMCCNgoaiToNhom,
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
        $("#gridAddMCC").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddMCC"), false);
        if ($(window).width() > 800) {
            $("#windowMCC").data("kendoWindow").center().open();
        } else {
            $("#windowMCC").data("kendoWindow").center().maximize().open();
        }
    });
}

function LuuAddMCC() {
    $("#windowMCC").data("kendoWindow").close();
    var bangDuLieuMCCTo = $("#gridMCC").data("kendoGrid").dataSource.data();
    var bangDuLieuMCC = [];

    $.each(bangDuLieuMCCTo, function (index, item) {
        bangDuLieuMCC.push({
            ID: item.ID,
            TenThietBi: item.TenThietBi,
            MaThietBi: item.MaThietBi,
            DiaChiIP: item.DiaChiIP,
            Port: item.Port,
        });
    })
    var bangDuLieuAddMCC = $("#gridAddMCC").data("kendoGrid");
    bangDuLieuAddMCC.select().each(function () {
        var dataItem = bangDuLieuAddMCC.dataItem(this);
        bangDuLieuMCC.push({
            ID: dataItem.ID,
            TenThietBi: dataItem.TenThietBi,
            MaThietBi: dataItem.MaThietBi,
            DiaChiIP: dataItem.DiaChiIP,
            Port: dataItem.Port,
        });
    });
    console.log(bangDuLieuMCC)

    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuMCC,
        schema: {
            model: {
                ID: "ID",
                fields: {

                }
            }
        },
        pageSize: 20,
    });

    $("#gridMCC").data("kendoGrid").setDataSource(dataSource);

}
function DeleteRow(uid) {
    var dataRow = $('#gridMCC').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridMCC').data("kendoGrid").dataSource.remove(dataRow);
}
function CheckMCCTrongToNhom(idMCC) {
    var bangDuLieuMCC = $("#gridMCC").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuMCC, function (index, item) {
        console.log(item);
        console.log(idMCC)
        if (idMCC == item.ID) {
            isExisted = true;
        }
    })

    return isExisted;
}