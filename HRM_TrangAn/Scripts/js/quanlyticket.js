
$(document).ready(function () {
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

    $("#windowTicket").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Duyệt ticket",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#NgayDi").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayDi").data("kendoDatePicker")._dateInput.setOptions({
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
    //$("#windowBaiKiemTra").kendoWindow({
    //    title: "Các bài kiểm tra của học sinh",
    //    visible: false,
    //    modal: true,
    //    resizable: false,
    //    actions: [
    //        "Close"
    //    ]
    //});

    //$("#windowThemBKT").kendoWindow({
    //    title: "Thông tin bài kiểm tra",
    //    visible: false,

    //    width: 400,
    //    height: 120,
    //    modal: true,
    //    resizable: false,
    //    actions: [
    //        "Close"
    //    ]
    //});

    //$("#fileBKT").kendoUpload({
    //    multiple: false,
    //    localization: {
    //        select: 'Tải file ảnh bài kiểm tra',
    //        remove: '',
    //        cancel: ''
    //    },
    //    allowedExtensions: [".jpg", ".png", ".jpeg"],
    //    select: function (e) {
    //        PushFormDataFile(e.files[0], $("#ID_BaiKiemTra").val());
    //    }
    //});

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 160;
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
            sheet.title = "Ticket";
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
                width: "32px",
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
                title: "Ngày",
                format: "{0:dd/MM/yyyy}",
                template: function (e) {
                    if (e.IsManager == 1) {
                        return "<span style='color:orange'>" + kendo.toString(e.NgayDi, 'dd/MM/yyyy') + "</span>";
                    } else {
                        return "<span>" + kendo.toString(e.NgayDi, 'dd/MM/yyyy') + "</span>";
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
                },
                attributes: {
                    style: "text-align: center;",
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
                title: "Điểm đã đi/ Điểm cần đi",
                template: function (e) {
                    let newArr = [];
                    for (var i = 0; i < e.lstChamCong.length; i++) {
                        if (newArr.indexOf(e.lstChamCong[i].ID_DiemQuetThe) === -1) {
                            newArr.push(e.lstChamCong[i].ID_DiemQuetThe);
                        }
                    }
                    return newArr.length + "/" + e.lstDiemTuyen.length;
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
                attributes: {
                    style: "text-align: center;",
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenToNhom",
                title: "Tổ nhóm",
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
                field: "TenNhanVien",
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
                field: "TenTuyen",
                title: "Tuyến đò",
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
                field: "Diem1",
                title: "Điểm 1",
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
                field: "Diem2",
                title: "Điểm 2",
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
                field: "Diem3",
                title: "Điểm 3",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            //{
            //    title: "",
            //    width: "150px",
            //    template: function (e) {
            //        return "<a class='k-button bg-green text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-check'> </i> Phê duyệt </a>"
            //            + "<a class='k-button bg-red text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-trash'> </i> Hủy </a>";
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //}
        ]

    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })

    $("#gridChamCong").kendoGrid({

        height: function () {
            var height = 300;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        editable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách học sinh";
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
                field: 'ID',
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
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.parent().html("<a class='k-button' title='Thêm chấm công' style='width:100%; height:25px;' onclick='AddRow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ThoiGian",
                title: "Thời gian chấm công",
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
                field: "ID_DiemQuetThe",
                title: "Điểm quẹt thẻ",
                template: function (e) {
                    if (e.ID_DiemQuetThe > 0) {
                        return e.TenDiem;
                    } else {
                        return "";
                    }
                },
                width: "150px",
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenDiem',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/DiemQuetThe/GetAllDiemQuetThe'
                                }
                            },
                        }),
                        change: function (e) {
                            options.model.TenDiem = e.sender.text();
                        },
                    })
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "DiaChiIP",
                title: "Địa  chỉ IP",
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
                field: "TenTaiKhoan",
                title: "Người tạo",
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
                width: "50px",
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
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $.ajax({
        url: '/ThuyenDo/GetAllThuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        var datashow = []
        for (var i = 0; i < response.length; i++) {
            if (response[i].MaNhanVien !== null && response[i].MaNhanVien !== "") {
                datashow.push(response[i])
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: datashow,
        });

        $("#ComboThuyen").kendoMultiColumnComboBox({
            dataTextField: "MaThuyen",
            dataValueField: "ID",
            columns: [
                {
                    field: "MaThuyen",
                    title: "Mã số đò",
                    width: "200px",
                },
                {
                    field: "MaNhanVien",
                    title: "Mã Nhân viên/Mã Số Ticket",
                    width: "200px",
                },
                {
                    field: "LoaiThuyen",
                    title: "Loại thuyền",
                    template: function (e) {
                        if (e.LoaiThuyen == 1) {
                            return "Sắt";
                        } else {
                            return "Inox";
                        }
                    },
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # thuyền',
            filter: "contains",
            filterFields: ["MaThuyen", "MaNhanVien"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#MaNhanVien").val(e.dataItem.MaNhanVien);
                $("#ID_NhanVien").val(e.dataItem.ID_NhanVien);

                // Use the selected item or its text
            }
        })
    });
    $.ajax({
        url: '/TuyenDo/GetAllTuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        var datashow = []
        for (var i = 0; i < response.length; i++) {
            if (response[i].MaNhanVien !== null && response[i].MaNhanVien !== "") {
                datashow.push(response[i])
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: datashow,
        });

        $("#ComboTuyenDo").kendoMultiColumnComboBox({
            dataTextField: "TenTuyen",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenTuyen",
                    title: "Tên tuyến",
                    width: "200px",
                },
                {
                    field: "ThoiGianToiThieu",
                    title: "Thời gian tối thiểu",
                    width: "200px",
                },
                {
                    field: "ThoiGianToiDa",
                    title: "Thời gian tối đa",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # thuyền',
            filter: "contains",
            filterFields: ["TenTuyen"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                // Use the selected item or its text
            }
        })
    });


})



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
        $("#ID").val(selectedItem.ID_ChuyenDo);
        $("#ID_NhanVien").val(selectedItem.ID_NhanVien);
        $("#ComboTuyenDo").data("kendoMultiColumnComboBox").value(selectedItem.ID_TuyenDo)
        $("#ComboThuyen").data("kendoMultiColumnComboBox").value(selectedItem.ID_Thuyen);
        $("#MaNhanVien").val(selectedItem.MaNhanVien);
        $("#NgayDi").data("kendoDatePicker").value(selectedItem.NgayDi);
        $("#GhiChu").val(selectedItem.GhiChu);
        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstChamCong,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ThoiGian: { type: 'date', editable: true },
                        ID_DiemQuetThe: { type: 'number', editable: true },
                        TenDiem: { type: 'text', editable: false },
                        DiaChiIP: { type: 'text', editable: false },
                        TenTaiKhoan: { type: 'text', editable: false }
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridChamCong").data("kendoGrid").setDataSource(dataSource);
    }

}

function LoadGridData() {
    $.ajax({
        url: '/ChuyenDo/GetAllChuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 0; i < response.length; i++) {
        //    if (response[i].lstChamCong.length >= 3) {
        //        response[i].Diem1 = response[i].lstChamCong[0].TenDiem;
        //        response[i].Diem2 = response[i].lstChamCong[1].TenDiem;
        //        response[i].Diem3 = response[i].lstChamCong[2].TenDiem;

        //    } else if (response[i].lstChamCong.length == 2) {
        //        response[i].Diem1 = response[i].lstChamCong[0].TenDiem;
        //        response[i].Diem2 = response[i].lstChamCong[1].TenDiem;
        //        response[i].Diem3 = "";
        //    } else if (response[i].lstChamCong.length == 1) {
        //        response[i].Diem1 = response[i].lstChamCong[0].TenDiem;
        //        response[i].Diem2 = "";
        //        response[i].Diem3 = "";
        //    } else {
        //        response[i].Diem1 = "";
        //        response[i].Diem2 = "";
        //        response[i].Diem3 = "";
        //    }
            let arrdiem = toUniqueArray_DiemQuetThe(response[i].lstChamCong);
            response[i].Diem1 = arrdiem[0];
            response[i].Diem2 = arrdiem[1];
            response[i].Diem3 = arrdiem[2];
        }
        
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID_ChuyenDo",
                    fields: {
                        NgayDi: { type: 'date', editable: false },
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
                    ID: { type: 'number', editable: false },
                    ThoiGian: { type: 'date', editable: true },
                    ID_DiemQuetThe: { type: 'number', editable: true },
                    TenDiem: { type: 'text', editable: false },
                    DiaChiIP: { type: 'text', editable: false },
                    TenTaiKhoan: { type: 'text', editable: false }
                }
            }
        },
        pageSize: 20,
    });
    $("#gridChamCong").data("kendoGrid").setDataSource(dataSource);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}
function ValidateForm() {
    var validtuyen = SetValidate("ComboTuyenDo");
    var validthuyen = SetValidate("ComboThuyen");
    var validngay = SetValidate("NgayDi");

    var valid = validtuyen && validthuyen && validngay;
    return valid;
}
function Luu() {

    if (ValidateForm()) {
        var bangDuLieuNhanVien = $("#gridChamCong").data("kendoGrid").dataSource.data();
        var bangDuLieuNhanVienChuyenTo = [];
        console.log(bangDuLieuNhanVien)
        $.each(bangDuLieuNhanVien, function (index, item) {
            bangDuLieuNhanVienChuyenTo.push({
                ID_DiemQuetThe: item.ID_DiemQuetThe,
                ThoiGian: kendo.toString(item.ThoiGian, 'yyyy-MM-dd hh:mm:ss'),
                DiaChiIP: "",
                TenTaiKhoan: ""
            });
        })
        console.log(bangDuLieuNhanVienChuyenTo)
        $.ajax({
            url: '/ChuyenDo/InsertOrUpdate_ChuyenDo',
            type: 'POST',
            data: {
                ID_ChuyenDo: $("#ID").val(),
                MaThuyen: $("#ComboThuyen").data("kendoMultiColumnComboBox").value(),                
                ID_NhanVien: $("#ID_NhanVien").val(),
                ID_TuyenDo: $("#ComboTuyenDo").data("kendoMultiColumnComboBox").value(),
                GhiChu: $("#GhiChu").val(),
                TrangThai: 1,
                IsManager: 1,
                NgayDi: kendo.toString($("#NgayDi").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                lstChamCong: bangDuLieuNhanVienChuyenTo
            }
        }).done(function successCallback(response) {

            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                Huy();
                $("#grid").data("kendoGrid").clearSelection();
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
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " ticket?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/ChuyenDo/DeleteMulti_ChuyenDo?ID=' + ids.join(','),
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
        fileName: "Ticket.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveHRM_TrangAnxcel();
}

function AddRow(e) {
    var grid = $("#gridChamCong").data("kendoGrid");
    grid.addRow();
}
function DeleteRow(uid) {
    var dataRow = $('#gridChamCong').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridChamCong').data("kendoGrid").dataSource.remove(dataRow);
}

function toUniqueArray_DiemQuetThe(a) {
    var newArr = [];
    for (var i = 0; i < a.length; i++) {
        if (newArr.indexOf(a[i].TenDiem) === -1) {
            newArr.push(a[i].TenDiem);
        }
    }
    return newArr;
}