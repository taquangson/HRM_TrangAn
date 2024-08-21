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

        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách ca làm việc";
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
                field: "TenCa",
                title: "Tên ca",
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
                field: "MaCa",
                title: "Mã ca",
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
                field: "BatDau",
                title: "Th/gian bắt đầu ca",
                template: function (e) {
                    return e.BatDau.Hours + ' giờ ' + e.BatDau.Minutes + ' phút';
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
                }
            },
            {
                field: "KetThuc",
                title: "Th/gian kết thúc ca",
                template: function (e) {
                    return e.KetThuc.Hours + ' giờ ' + e.KetThuc.Minutes + ' phút';
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
                }
            },
            {
                field: "CaDem",
                title: "Ca đêm",
                template: function (e) {
                    return e.IsCaDem == 1 ? 'Ca đêm' : ''
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
                }
            },
            {
                field: "SoGioLamViec",
                title: "Số giờ làm việc",
                width: "150px",
                format: "{0:N1}",
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
                field: "SoGioNghi",
                title: "Số giờ nghỉ giữa ca",
                width: "150px",
                format: "{0:N1}",
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
        width: "50%",
        height: "85%",
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
    });

    $("#BatDau").kendoTimePicker({
        dateInput: false,
        format: "H:mm",
        componentType: "modern"
    })

    $("#KetThuc").kendoTimePicker({
        dateInput: false,
        format: "H:mm",
        componentType: "modern"
    })
    $("#BatDauTinhCa").kendoTimePicker({
        dateInput: false,
        format: "H:mm",
        componentType: "modern"
    })

    $("#KetThucTinhCa").kendoTimePicker({
        dateInput: false,
        format: "H:mm",
        componentType: "modern"
    })
    createGridPhanBo();

    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();

})

function LoadGridPhanBo(data) {
    //$.ajax({
    //    url: '/LichHoc/GetLichHocByLop?ID_Lop=' + ID_Lop,
    //    type: 'GET'
    //}).done(function (response) {
    var ds = new kendo.data.DataSource({
        data: data,
        schema: {
            model: {
                id: "id",
                fields: {
                    BatDau: { type: 'text', editable: true },
                    KetThuc: { type: 'text', editable: true },
                    SoCong: { type: 'number', editablle: true },
                    TangCa: { type: 'number', editablle: true }
                }
            },
            parse: function (res) {
                for (var i = 0; i < res.length; i++) {
                    let bd = new Date();
                    bd.setHours(res[i].BatDau.Hours);
                    bd.setMinutes(res[i].BatDau.Minutes);
                    res[i].BatDau = bd;

                    let kt = new Date();
                    kt.setHours(res[i].KetThuc.Hours);
                    kt.setMinutes(res[i].KetThuc.Minutes);
                    res[i].KetThuc = kt;
                }
                return res;
            }
        },
        pageSize: 100
    });
    $("#gridPhanBo").data("kendoGrid").setDataSource(ds);
    //})

}

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
        $("#TenCa").val(selectedItem.TenCa);
        $("#MaCa").val(selectedItem.MaCa);
        $("#SoGioLamViec").val(selectedItem.SoGioLamViec);
        $("#SoGioNghi").val(selectedItem.SoGioNghi);
        $("#SoCong").val(selectedItem.SoCong);

        $("#BatDau").data("kendoTimePicker").value(selectedItem.BatDau.Hours + ':' + selectedItem.BatDau.Minutes);
        $("#KetThuc").data("kendoTimePicker").value(selectedItem.KetThuc.Hours + ':' + selectedItem.KetThuc.Minutes);
        $("#BatDauTinhCa").data("kendoTimePicker").value(selectedItem.BatDauTinhCa.Hours + ':' + selectedItem.BatDauTinhCa.Minutes);
        $("#KetThucTinhCa").data("kendoTimePicker").value(selectedItem.KetThucTinhCa.Hours + ':' + selectedItem.KetThucTinhCa.Minutes);
        if (selectedItem.IsCaDem) {
            $("#CaDem").prop('checked', 'true')
        } else {
            $("#CaDem").removeProp('checked')
        }
        LoadGridPhanBo(selectedItem.PhanBo)
        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}

function createGridPhanBo() {
    if ($("#gridPhanBo").data("kendoGrid") == undefined) {
        $("#gridPhanBo").kendoGrid({
            dataSource: new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            BatDau: { type: 'text', editable: true },
                            KetThuc: { type: 'text', editable: true },
                            SoCong: { type: 'number', editablle: true },
                            TangCa: { type: 'number', editablle: true }
                        }
                    },
                    parse: function (res) {
                        for (var i = 0; i < res.length; i++) {
                            res[i].BatDau = new Date().setHours(res[i].BatDau.Hours).setMinutes(res[i].BatDau.Minutes);
                            res[i].KetThuc = new Date().setHours(res[i].KetThuc.Hours).setMinutes(res[i].KetThuc.Minutes);
                        }
                        return res;
                    }
                },
                pageSize: 100
            }),
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            height: 250,
            editable: true,
            persistSelection: true,
            resizable: true,
            pageable: false,
            sortable: false,
            filterable: {
                mode: "row",
            },
            scrollable: true,
            save: function (e) {
                console.log(e);
            },
            columns: [
                {
                    title: " ",
                    field: 'id',
                    template: function (e) {
                        return "<i onclick='DeleteRowPhanBo(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
                    },
                    width: 50,
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 12px; ",
                        class: "table-header-cell"
                    },
                    filterable: {
                        cell: {
                            operator: "contains",
                            showOperators: false,
                            template: function (e) {
                                e.element.parent().html("<a class='k-button' title='Thêm khoảng thời gian' style='width:100%; height:25px;' onclick='AddRowPhanBo()'><i class='fa fa-plus'></i></a>")
                            }
                        }
                    },
                },
                {
                    field: "BatDau",
                    title: "Th/gian bắt đầu",
                    width: 160,
                    template: function (e) {
                        return e.BatDau.getHours() + ' giờ ' + e.BatDau.getMinutes() + ' phút';
                    },
                    editor: function (container, options) {
                        $('<input required name="' + options.field + '"/>').appendTo(container).kendoTimePicker({
                            dateInput: false,
                            format: "H:mm",
                            componentType: "modern"
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
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                },
                {
                    field: "KetThuc",
                    title: "Th/gian kết thúc",
                    width: 160,
                    template: function (e) {
                        return e.KetThuc.getHours() + ' giờ ' + e.KetThuc.getMinutes() + ' phút';
                    },
                    editor: function (container, options) {
                        $('<input required name="' + options.field + '"/>').appendTo(container).kendoTimePicker({
                            dateInput: false,
                            format: "H:mm",
                            componentType: "modern"
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
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                },
                {
                    field: "SoCong",
                    title: "Số công",
                    width: 150,
                    attributes: {
                        class: "text-center"
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
                },
                {
                    field: "TangCa",
                    title: "Tăng ca",
                    width: 160,
                    template: function (e) {
                        if (e.CaDem == 0) {
                            return '';
                        } else {
                            return 'Tính tăng ca';
                        }
                    },
                    editor: function (container, options) {
                        $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataTextField: "text",
                            dataValueField: "value",
                            autoBind: false,
                            change: function (e) {
                                options.model.TenBuoi = e.sender.text();
                            },
                            dataSource: new kendo.data.DataSource({
                                data: [{ text: "Không tính tăng ca", value: 0 },
                                { text: "Tính tăng ca", value: 1 }
                                ]
                            }),
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
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                },
            ]
        });
    }
}


function AddRowPhanBo(e) {
    var grid = $("#gridPhanBo").data("kendoGrid");
    grid.addRow();
}
function DeleteRowPhanBo(uid) {
    var dataRow = $('#gridPhanBo').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridPhanBo').data("kendoGrid").dataSource.remove(dataRow);
}

function LoadGridData() {
    $.ajax({
        url: '/DanhMuc/GetAll_CaLamViec',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        SoGioLamViec: { type: 'number', editable: false },
                        SoGioNghi: { type: 'number', editable: false },
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
    LoadGridPhanBo([]);
    if ($(window).width() > 600) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}


function ValidateForm(callback) {
    var validten = SetValidate("TenCa");
    var validma = SetValidate("MaCa");

    var valid = validma && validten;
    if (valid) {
        callback(valid);
    } else {
        callback(valid);
    }
}


function Luu() {
    ValidateForm(function (valid) {
        if (valid) {
            var lstPhanBo = [];
            $.each($("#gridPhanBo").data("kendoGrid").dataSource.data(), function (index, item) {
                lstPhanBo.push({
                    ID_CaLamViec: $("#ID").val(),
                    BatDau: kendo.toString(item.BatDau, 'HH:mm'),
                    KetThuc: kendo.toString(item.KetThuc, 'HH:mm'),
                    SoCong: item.SoCong.toString().replace('.', ','),
                    CaDem: item.CaDem
                })
            })
            $.ajax({
                url: '/DanhMuc/InsertOrUpdate_CaLamViec',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenCa: $("#TenCa").val(),
                    MaCa: $("#MaCa").val(),
                    SoGioLamViec: $("#SoGioLamViec").val().replace('.', ','),
                    SoGioNghi: $("#SoGioNghi").val().replace('.', ','),
                    SoCong: $("#SoCong").val().replace('.', ','),
                    BatDau: kendo.toString($("#BatDau").data("kendoTimePicker").value(), 'HH:mm'),
                    KetThuc: kendo.toString($("#KetThuc").data("kendoTimePicker").value(), 'HH:mm'),
                    BatDauTinhCa: kendo.toString($("#BatDauTinhCa").data("kendoTimePicker").value(), 'HH:mm'),
                    KetThucTinhCa: kendo.toString($("#KetThucTinhCa").data("kendoTimePicker").value(), 'HH:mm'),
                    IsCaDem: $("#CaDem:checked").val() ? 1 : 0,
                    PhanBo: lstPhanBo
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



function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục ca làm việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/DanhMuc/Delete_CaLamViec?ID=' + ids.join(','),
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
