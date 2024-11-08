
$(document).ready(function () {
    $("#TuNgaySearch").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        change: function (e) {
            var d = new Date($("#TuNgaySearch").data("kendoDatePicker").value().getFullYear(), $("#TuNgaySearch").data("kendoDatePicker").value().getMonth() + 1, 0);
            $("#DenNgaySearch").data("kendoDatePicker").value(d);
        }
    })
    $("#DenNgaySearch").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date($("#TuNgaySearch").data("kendoDatePicker").value().getFullYear(), $("#TuNgaySearch").data("kendoDatePicker").value().getMonth() + 1, 0)
    })

    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    });

    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
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
        columns: [
            {
                width: "20px",
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
                field: "DoanhSo",
                title: "Doanh Số",
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
                field: "LuongKhach",
                title: "Lượng Khách",
                width: "110px",
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
                field: "TuNgay",
                title: "Từ Ngày",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
                editable: function () {
                    return true;

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
                field: "DenNgay",
                title: "Đến ngày",
                format: "{0:dd/MM/yyyy}",
                width: "200px",
                editable: function () {
                    return true;

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
        ]
    });
    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })
    $("#window").kendoWindow({
        width: "600px",
        height: "375px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
})

function TimKiem() {
    var tuNgay = kendo.toString($("#TuNgaySearch").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00";
    var denNgay = kendo.toString($("#DenNgaySearch").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    var url = "/DoanhSo_LuongKhach/GetByDateRange?TuNgay=" + encodeURIComponent(tuNgay) + "&DenNgay=" + encodeURIComponent(denNgay);
    console.log("TuNgay: ", tuNgay);
    console.log("DenNgay: ", denNgay);
    console.log("URL: ", url);

    $.ajax({
        url: url,
        type: 'GET',
        success: function (response) {
            console.log("Response: ", response);

            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    console.error("Failed to parse response: ", e);
                    return;
                }
            }

            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            TuNgay: { type: 'date', editable: false },
                            DenNgay: { type: 'date', editable: false },
                            DoanhSo: { type: 'number' },
                            LuongKhach: { type: 'number' },
                        }
                    }
                },
                pageSize: 30,
            });
            var grid = $("#grid").data("kendoGrid");
            console.log(grid)
            if (grid) {
                grid.setDataSource(dataSource);
            } else {
                console.error("kendoGrid not initialized.");
                $("#grid").kendoGrid({
                    dataSource: dataSource,
                    noRecords: {
                        template: "<div>No records available</div>"
                    },
                    pageable: true,
                    sortable: true,
                    columns: [
                        { field: "TuNgay", format: "{0:dd/MM/yyyy}", width: "120px" },
                        { field: "DenNgay", format: "{0:dd/MM/yyyy}", width: "120px" },
                        { field: "DoanhSo", width: "150px" },
                        { field: "LuongKhach", width: "200px" },
                    ]
                });
            }
            kendo.ui.progress($("#grid"), false);
        },
        error: function (request, error) {
            console.error("AJAX Error: ", error);
            kendo.ui.progress($("#grid"), false);
        }
    });
}




function LoadGridData() {
    $.ajax({
        url: '/DoanhSo_LuongKhach/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    ID: "ID",
                    fields: {
                        TuNgay: { type: 'date', editable: false },
                        DenNgay: { type: 'date', editable: false },
                        DoanhSo: { type: 'number', editable: false },
                        LuongKhach: { type: 'number', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        console.log(dataSource);
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").select();
    console.log(arr);
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var selectedItem = $("#grid").data("kendoGrid").dataItem(arr);
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#TuNgay").data("kendoDatePicker").value(selectedItem.TuNgay);
        $("#DenNgay").data("kendoDatePicker").value(selectedItem.DenNgay);
        $("#DoanhSo").val(selectedItem.DoanhSo);
        $("#LuongKhach").val(selectedItem.LuongKhach);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}
function Luu() {
    if (ValidateForm()) {
        var dataItem = {
            ID: $("#ID").val(),
            //ID_NhanVien: $("#ComboNhanVien").val(),
            DoanhSo: $("#DoanhSo").val(),
            LuongKhach: $("#LuongKhach").val(),
            TuNgay: kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd"),
            DenNgay: kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd"),

            MoTa: $("#MoTa").val(),
        }
        console.log(dataItem)
        $.ajax({
            url: '/DoanhSo_LuongKhach/InsertOrUpdate',
            type: 'POST',
            data: dataItem,
        }).done(function successCallback(response) {
            if (response.success) {
                $("#grid").data("kendoGrid").clearSelection();
                //TimKiem();
                Huy();
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function ValidateForm() {
    var validtungay = SetValidate("TuNgay");
    var validdenngay = SetValidate("DenNgay");
    var validdoanhso = SetValidate("DoanhSo");
    var validluongkhach = SetValidate("LuongKhach");

    var valid = validtungay && validdenngay && validdoanhso && validluongkhach;

    console.log(valid);
    return valid;
}


function Xoa() {
    var grid = $("#grid").data("kendoGrid");
    if (grid.select().length > 0) {
        var selectedCount = grid.select().length;
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + selectedCount + " bản ghi?</b>", function () { XoaDuLieu(grid); }, function () { }
        );
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
    }
}

function XoaDuLieu(bangDuLieu) {
    var ids = [];
    console.log(bangDuLieu.dataSource);
    bangDuLieu.select().each(function (index, item) {
        var dataItem = bangDuLieu.dataItem(item);
        console.log(dataItem);
        var id = dataItem.ID;
        ids.push(id);
    });
    console.log(ids);
    $.ajax({
        url: '/DoanhSo_LuongKhach/DeleteMulti?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            bangDuLieu.clearSelection();
            LoadGridData();
            //TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}