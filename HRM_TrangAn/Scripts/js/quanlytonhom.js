$(".main_container").hide();
$(document).ready(function () {
    var ds = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "ID",
                fields: {
                    SoLaoDong_HoatDong: { type: 'number' },
                    SoLaoDong_DaTraDo: { type: 'number' },
                    SoLaoDong_TamNghi: { type: 'number' },
                    SoLaoDong_Tong: { type: 'number' }
                }
            }
        },
        aggregate: [
            { field: "SoLaoDong_HoatDong", aggregate: "sum" },
            { field: "SoLaoDong_DaTraDo", aggregate: "sum" },
            { field: "SoLaoDong_TamNghi", aggregate: "sum" },
            { field: "SoLaoDong_Tong", aggregate: "sum" }
        ],
        pageSize: 20,
    });
    console.log(ds);
    $("#grid").kendoGrid({
        data: ds,
        height: function () {
            var height = $(window).height() - 160;
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
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách tổ nhóm";
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
                field: "MaToNhom",
                title: "Mã tố",
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
                field: "TenToTruong",
                title: "Tổ trưởng",
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
            },
            {
                field: "SDTToTruong",
                title: "SĐT Tổ trưởng",
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
                field: "TenToPho",
                title: "Tổ phó",
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
            },
            {
                field: "SDTToPho",
                title: "SĐT Tổ phó",
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
                field: "SoLaoDong_HoatDong",
                title: "Đang hoạt động",
                aggregates: ["sum"],
                footerTemplate: function (e) {
                    return e.SoLaoDong_HoatDong ? kendo.toString(e.SoLaoDong_HoatDong.sum, 'n0') : 0
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
                field: "SoLaoDong_DaTraDo",
                title: "Đã trả đò",
                footerTemplate: function (e) {
                    return e.SoLaoDong_DaTraDo ? kendo.toString(e.SoLaoDong_DaTraDo.sum, 'n0') : 0
                },
                aggregates: ["sum"],
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
                field: "SoLaoDong_TamNghi",
                title: "Tạm nghỉ",
                footerTemplate: function (e) {
                    return e.SoLaoDong_TamNghi ? kendo.toString(e.SoLaoDong_TamNghi.sum, 'n0') : 0
                },
                aggregates: ["sum"],
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
                field: "SoLaoDong_Tong",
                title: "Tổng số lượng",
                footerTemplate: function (e) {
                    return e.SoLaoDong_Tong ? kendo.toString(e.SoLaoDong_Tong.sum, 'n0') : 0
                },
                aggregates: ["sum"],
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
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            }
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
    LoadGridData();
    $("#windowNhanVien").kendoWindow({
        width: "800",
        height: "400",
        title: "Danh sách nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
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
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách tổ nhóm";
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên vào tổ/nhóm' style='width:50%; height:25px;float: left; position: relative;' onclick='openAddNhanVienWindow()'><i class='fa fa-plus'></i></a><a class='k-button' title='Xóa nhân viên đã chọn' style='width:50%; height:25px;float: left; position: relative;' onclick='DeleteMultiRow()'><i class='fa fa-minus'></i></a>")

                        }
                    }
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
                //template: function (e) {
                //    var dateString = e.NgaySinh.substr(6);
                //    var currentTime = new Date(parseInt(dateString));
                //    if (currentTime.getFullYear() != 1) {
                //        return kendo.toString(currentTime, "dd/MM/yyyy");
                //    } else {
                //        return "";
                //    }
                //},
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
            },
            {
                field: "IsToTruong",
                title: "Tổ trưởng",
                width: "100px",
                filterable: false,
                template: function (e) {
                    //console.log(e.IsToTruong);
                    if (e.IsToTruong) {
                        if (e.IsToTruong == 0) {
                            return "<input type='checkbox' onchange='UpdateToTruong(" + e.ID + ")' />"
                        } else {
                            return "<input type='checkbox' checked ='checked' disable/>"
                        }
                    } else {
                        return "<input type='checkbox' onchange='UpdateToTruong(" + e.ID + ")' />"
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
                field: "IsToPho",
                title: "Tổ phó",
                width: "100px",
                filterable: false,
                template: function (e) {
                    //console.log(e.IsToPho);
                    if (e.IsToPho) {
                        if (e.IsToPho == 0) {
                            return "<input type='checkbox' onchange='UpdateToPho(" + e.ID + ")' />"
                        } else {
                            return "<input type='checkbox' checked ='checked' disable/>"
                        }
                    } else {
                        return "<input type='checkbox' onchange='UpdateToPho(" + e.ID + ")' />"
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
                    //return "<a class='k-button bg-red text-center' onclick='XoaNhanVien(" + e.ID + ")'><i class='fa fa-trash'> </i> Xóa </a>";
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

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMucQuyen',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboQuyen").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource
        })
    });
    $(".main_container").show();
})


function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        //console.log("openEditWindow: ",selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#TenToNhom").val(selectedItem.TenToNhom);
        $("#MaToNhom").val(selectedItem.MaToNhom);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DanhSachNhanVien").val(selectedItem.lstNhanVien);
        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstNhanVien,
            schema: {
                model: {
                    ID: "ID",
                    fields: {
                        NgaySinh: { type: 'date', editable: false },
                        TenDayDu: { type: "text", editable: false },
                        MaThuyen: { type: "text", editable: false },
                        SoDienThoai: { type: "text", editable: false },
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
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/ToNhom/GetAllToNhom',
        type: 'GET',
    }).done(function successCallback(responsee) {
        response = JSON.parse(responsee);
        for (var i = 0; i < response.length; i++) {
            response[i].TenToTruong = ""
            response[i].SDTToTruong = ""
            response[i].TenToPho = ""
            response[i].SDTToPho = ""
            for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                if (response[i].lstNhanVien[j].IsToTruong == 1) {
                    response[i].TenToTruong = response[i].lstNhanVien[j].TenDayDu
                    response[i].SDTToTruong = response[i].lstNhanVien[j].SoDienThoai
                }
                if (response[i].lstNhanVien[j].IsToPho == 1) {
                    response[i].TenToPho = response[i].lstNhanVien[j].TenDayDu
                    response[i].SDTToPho = response[i].lstNhanVien[j].SoDienThoai
                }
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        SoLaoDong_HoatDong: { type: 'number' },
                        SoLaoDong_DaTraDo: { type: 'number' },
                        SoLaoDong_TamNghi: { type: 'number' },
                        SoLaoDong_Tong: { type: 'number' }
                    }
                }
            },
            aggregate: [
                { field: 'SoLaoDong_HoatDong', aggregate: "sum" },
                { field: 'SoLaoDong_DaTraDo', aggregate: "sum" },
                { field: 'SoLaoDong_TamNghi', aggregate: "sum" },
                { field: 'SoLaoDong_Tong', aggregate: "sum" }
            ],
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

function ValidateForm(callback) {
    var validten = SetValidate("TenToNhom");
    var validma = SetValidate("MaToNhom");
    var valid = validma && validten;
    if (valid) {
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            CheckMa($("#MaToNhom").val(), function (stt) {
                console.log("stt: ", stt)
                callback(stt);
            })

        } else {
            var grid = $("#grid").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            if ($("#MaToNhom").val() !== selectedItem.MaToNhom || ($("#ID").val() == '')) {
                CheckMa($("#MaToNhom").val(), function (stt) {
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
        url: '/ToNhom/GetByMaToNhom?MaToNhom=' + ma,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.length > 0) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Mã tổ nhóm đã tồn tại");

            callback(false)
        } else {
            callback(true)
        }
    })
}

function Luu() {
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVienToNhom = [];
    $.each(bangDuLieuNhanVien, function (index, item) {
        bangDuLieuNhanVienToNhom.push({
            ID_NhanVien: item.ID,
            IsToTruong: item.IsToTruong,
            IsToPho: item.IsToPho
        });
    })
    //console.log("data: ", bangDuLieuNhanVienToNhom.length)
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/ToNhom/InsertOrUpdate_ToNhom',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenToNhom: $("#TenToNhom").val(),
                    MaToNhom: $("#MaToNhom").val(),
                    GhiChu: $("#GhiChu").val(),
                    lstNhanVienToNhom: bangDuLieuNhanVienToNhom.length > 0 ? bangDuLieuNhanVienToNhom : null
                }
            }).done(function successCallback(response) {

                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    LoadGridData();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
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
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " tổ?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({ kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
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
        url: '/ToNhom/DeleteMulti_ToNhom?ID=' + ids.join(','),
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






function openAddNhanVienWindow() {
    $.ajax({
        url: '/NhanVien/GetAllNhanVienNgoaiToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVien"), true);
        var lstNhanVienNgoaiToNhom = [];
        for (var i = 0; i < response.length; i++) {
            if (!CheckNhanVienTrongToNhom(response[i].ID)) {
                lstNhanVienNgoaiToNhom.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstNhanVienNgoaiToNhom,
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
        $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddNhanVien"), false);
        if ($(window).width() > 800) {
            $("#windowNhanVien").data("kendoWindow").center().open();
        } else {
            $("#windowNhanVien").data("kendoWindow").center().maximize().open();
        }
    });
}


function LuuAddNhanVien() {
    $("#windowNhanVien").data("kendoWindow").close();
    var bangDuLieuNhanVienTo = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var bangDuLieuNhanVien = [];

    $.each(bangDuLieuNhanVienTo, function (index, item) {
        bangDuLieuNhanVien.push({
            ID: item.ID,
            TenDayDu: item.TenDayDu,
            MaThuyen: item.MaThuyen,
            SoDienThoai: item.SoDienThoai,
            Email: item.Email,
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: item.TrangThai,
            MaNhanVien: item.MaNhanVien,
            IsToTruong: item.IsToTruong,
            IsToPho: item.IsToPho,
        });
    })
    var bangDuLieuAddNhanVien = $("#gridAddNhanVien").data("kendoGrid");
    bangDuLieuAddNhanVien.select().each(function () {
        var dataItem = bangDuLieuAddNhanVien.dataItem(this);
        bangDuLieuNhanVien.push({
            ID: dataItem.ID,
            TenDayDu: dataItem.TenDayDu,
            MaThuyen: dataItem.MaThuyen,
            SoDienThoai: dataItem.SoDienThoai,
            Email: dataItem.Email,
            CCCD: dataItem.CCCD,
            NgaySinh: dataItem.NgaySinh,
            DiaChi: dataItem.DiaChi,
            TrangThai: dataItem.TrangThai,
            MaNhanVien: dataItem.MaNhanVien,
            IsToTruong: dataItem.IsToTruong,
            IsToPho: dataItem.IsToPho,
        });
    });
    //console.log(bangDuLieuNhanVien)

    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuNhanVien,
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgaySinh: { type: 'date', editable: false },
                    TenDayDu: { type: "text", editable: false },
                    MaThuyen: { type: "text", editable: false },
                    SoDienThoai: { type: "text", editable: false },
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
function DeleteMultiRow() {
    var bangDuLieu = $("#gridNhanVien").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        var item = [];
        bangDuLieu.select().each(function () {
            var dataItem = bangDuLieu.dataItem(this);
            item.push(dataItem);
        });
        $.each(item, function (index, item) {
            $('#gridNhanVien').data("kendoGrid").dataSource.remove(item);

        })

    }
}

function CheckNhanVienTrongToNhom(idnhanvien) {
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuNhanVien, function (index, item) {
        //console.log(item);
        //console.log(idnhanvien)
        if (idnhanvien == item.ID) {
            isExisted = true;
        }
    })

    return isExisted;
}


function UpdateToTruong(ID_NhanVien) {
    //Xóa tổ trưởng cũ
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();
    $.each(bangDuLieuNhanVien, function (index, item) {
        if (ID_NhanVien == item.ID) {
            item.IsToTruong = 1;
            item.IsToPho = 0;
        } else {
            item.IsToTruong = 0;
        }
    })
    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuNhanVien,
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgaySinh: { type: 'date', editable: false },
                    TenDayDu: { type: "text", editable: false },
                    MaThuyen: { type: "text", editable: false },
                    SoDienThoai: { type: "text", editable: false },
                }
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
    //Thêm tổ trưởng mới
    //Reload grid nhân viên
}
function UpdateToPho(ID_NhanVien) {
    //console.log(ID_NhanVien);
    var bangDuLieuNhanVien = $("#gridNhanVien").data("kendoGrid").dataSource.data();

    $.each(bangDuLieuNhanVien, function (index, item) {
        if (ID_NhanVien == item.ID) {
            item.IsToTruong = 0;
            item.IsToPho = 1;
        } else {
            item.IsToPho = 0;
        }
    })
    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuNhanVien,
        schema: {
            model: {
                ID: "ID",
                fields: {
                    NgaySinh: { type: 'date', editable: false },
                    TenDayDu: { type: "text", editable: false },
                    MaThuyen: { type: "text", editable: false },
                    SoDienThoai: { type: "text", editable: false },
                }
            }
        },
        pageSize: 20,
    });
    $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);
}