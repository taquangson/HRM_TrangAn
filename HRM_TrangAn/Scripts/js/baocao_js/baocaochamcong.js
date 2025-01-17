$(".main_container").hide();
$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    $("#grid").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        Ngay: { type: 'date', editable: false },
                        CheckIn: { type: 'date', editable: false },
                        CheckOut: { type: 'date', editable: false },
                        SoCong: { type: 'float', editable: false },
                        SoCongTangCa: { type: 'float', editable: false },
                        XuatAn: { type: 'float', editable: false },
                    }
                }
            },
            pageSize: 40,
            aggregate: [{ field: 'SoCong', aggregate: "sum" },
            { field: 'SoCongTangCa', aggregate: "sum" },
            { field: 'XuatAn', aggregate: "sum" }]
        }),
        height: function () {
            var height = $(window).height() - 280;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        //filterable:true,
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
            sheet.title = "Báo cáo chấm công";
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
                    row.cells[cellIndex].borderLeft = { color: "#000", size: 1 };
                }
            }
        },
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
                field: "Ngay",
                title: "Ngày",
                format: "{0:dd/MM/yyyy}",
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
                title: "Mã nhân viên",
                width: "90px",
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
            }, {
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "140px",
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
                field: "TenCa",
                title: "Ca",
                width: "50px",
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
                field: "CheckIn",
                title: "CheckIn",
                format: "{0:dd/MM/yyyy HH:mm:ss}",
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
                field: "CheckOut",
                title: "CheckOut",
                format: "{0:dd/MM/yyyy HH:mm:ss}",
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
                field: "SoCong",
                title: "Số công",
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
                },
                footerTemplate: function (e) {
                    if (e.SoCong) {
                        return kendo.toString(e.SoCong.sum ? e.SoCong.sum : 0, "N1");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            },
            {
                field: "SoCongTangCa",
                title: "Số công tăng ca",
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
                },
                footerTemplate: function (e) {
                    if (e.SoCongTangCa) {
                        return kendo.toString(e.SoCongTangCa.sum ? e.SoCongTangCa.sum : 0, "N1");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            },
            {
                field: "XuatAn",
                title: "Số xuất ăn",
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
                },
                footerTemplate: function (e) {
                    if (e.XuatAn) {
                        return kendo.toString(e.XuatAn.sum ? e.XuatAn.sum : 0, "N1");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
            },
            //{
            //    title: "",
            //    width: "100px",
            //    template: function (e) {
            //        return "<a class='k-button text-center' onclick='DieuChinh(" + e.MaNhanVien + ")'><i class='fa fa-cogs' style='margin-right: 2px;'></i> Điều chỉnh </a>"
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
    $("#window").kendoWindow({
        width: "40%",
        height: "555px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $.ajax({
        url: '/DanhMuc/GetAll_CaLamViec',
        type: 'GET',
    }).done(function successCallback(response) {
        dataCa = response;
        var dataSource = new kendo.data.DataSource({
            data: dataCa
        });
        $("#ComboCa").kendoComboBox({
            dataSource: dataSource,
            dataTextField: 'TenCa',
            dataValueField: 'ID',
            filter: "contains",
            change: function (e) {
                var grid = $("#grid").data("kendoGrid");
                var selectedItem = grid.dataItem(grid.select());
                let ci = new Date(selectedItem.Ngay);
                let co = new Date(selectedItem.Ngay);
                $.each(dataSource.data(), function (index, item) {
                    if (item.ID == e.sender.value()) {
                        ci.setHours(item.BatDauTinhCa.Hours, item.BatDauTinhCa.Minutes, 0, 0);
                        co.setHours(item.KetThucTinhCa.Hours, item.KetThucTinhCa.Minutes, 0, 0);
                        $("#CheckIn").data("kendoDateTimePicker").setOptions({ min: ci});
                        $("#CheckOut").data("kendoDateTimePicker").setOptions({ min: ci });
                    }

                })
                $("#CheckIn").data("kendoDateTimePicker").value(selectedItem.CheckIn == null ? ci : selectedItem.CheckIn);
                $("#CheckOut").data("kendoDateTimePicker").value(selectedItem.CheckOut == null ? ci : selectedItem.CheckOut);
            }
        })
    });

    $("#CheckIn").kendoDateTimePicker({
        dateInput: false,
        format: "dd/MM/yyyy HH:mm",
    })

    $("#CheckOut").kendoDateTimePicker({
        dateInput: false,
        format: "dd/MM/yyyy HH:mm",
    })


    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    });

    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        change: function (e) {
            var d = new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0);
            $("#DenNgay").data("kendoDatePicker").value(d);
        }
    })
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0)
    })

    $.ajax({
        url: '/PhongBan/GetTreePhongBan',
        type: 'GET'
    }).done(function (response) {

        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })
        var dataSourceNhanVien = new kendo.data.DataSource({
            data: [],
        });
        $("#treePhongBan").kendoDropDownTree({
            dataSource: dataSourceCombo,
            placeholder: "Chọn phòng ban...",
            dataTextField: "TenPhongBan",
            dataValueField: "ID",
            valuePrimitive: true,
            autoBind: false
        });

        // Khởi tạo MultiSelect cho nhân viên
        $("#comboNhanVien").kendoMultiSelect({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            dataSource: dataSourceNhanVien,
            filter: "contains",
            placeholder: "Chọn nhân viên",
            downArrow: true,
            noDataTemplate: "nodata",
        });

        $("#treePhongBan").data("kendoDropDownTree").bind("change", function (e) {
            var dropDownTree = $("#treePhongBan").data("kendoDropDownTree");
            var selectedValue = dropDownTree.value(); // Lấy giá trị phòng ban đã chọn
            console.log("Phòng ban đã chọn ID: " + selectedValue);

            // Dọn dữ liệu MultiSelect khi chọn phòng ban mới
            var multiSelect = $("#comboNhanVien").data("kendoMultiSelect");
            multiSelect.value([]); // Xóa các mục đã chọn trước đó

            $.ajax({
                url: '/HoSoNhanSu/GetByIDPhongBan?ID_PhongBan=' + selectedValue,
                type: 'GET',
                success: function (data) {
                    console.log("Dữ liệu nhân viên trả về từ server:", data);

                    // Kiểm tra xem dữ liệu trả về có phải là mảng hay không
                    if (Array.isArray(data)) {
                        // Cập nhật MultiSelect với dữ liệu nhân viên
                        multiSelect.setDataSource(new kendo.data.DataSource({
                            data: data
                        }));

                        // Cập nhật lại placeholder cho MultiSelect
                        multiSelect.setOptions({
                            placeholder: "Chọn nhân viên..."
                        });
                    } else {
                        console.error("Dữ liệu trả về không hợp lệ, không phải mảng!");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Lỗi khi gửi yêu cầu AJAX: " + error);
                }
            });
        });

        $("#dialogRoot").kendoDialog().data("kendoDialog").close();
        $(".main_container").show();
    });

})

function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    var listHSNSStr = $("#comboNhanVien").data("kendoMultiSelect").value().join(",");  // Join các giá trị ID thành chuỗi, phân tách bằng dấu phẩy
    console.log($("#comboNhanVien").data("kendoMultiSelect").value());
    var url = "/BaoCao/GetBangChamCong"
        + "?ID_PhongBan=" + ($("#treePhongBan").data("kendoDropDownTree").value() != '' ? $("#treePhongBan").data("kendoDropDownTree").value() : 0)
        + "&ListID_HSNS=" + listHSNSStr
        + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
        + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59";
    console.log(url);
    $.ajax({
        url: url,
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        console.log(response)
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        Ngay: { type: 'date', editable: false },
                        CheckIn: { type: 'date', editable: false },
                        CheckOut: { type: 'date', editable: false },
                        SoCong: { type: 'float', editable: false },
                        SoCongTangCa: { type: 'float', editable: false },
                        XuatAn: { type: 'float', editable: false },
                    }
                }
            },
            pageSize: 40,
            aggregate: [{ field: 'SoCong', aggregate: "sum" },
            { field: 'SoCongTangCa', aggregate: "sum" },
            { field: 'XuatAn', aggregate: "sum" }]
        });
        if (dataSource === undefined || dataSource === null) {
            console.log("void");
        } else {
            console.log(dataSource);
            console.log($("#grid").data("kendoGrid"));
            $("#grid").data("kendoGrid").setDataSource(dataSource);
            kendo.ui.progress($("#grid"), false);
        }
        kendo.ui.progress($("#grid"), false);
    });
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
        $("#ID_HoSoNhanSu").val(selectedItem.ID_HoSoNhanSu);
        $("#Ngay").val(kendo.toString(selectedItem.Ngay, 'yyyy-MM-dd'));
        $("#TenCa").val(selectedItem.TenCa);
        $("#TenNhanVien").val(selectedItem.TenDayDu);
        $("#XuatAn").val(selectedItem.XuatAn);
        $("#SoCong").val(selectedItem.SoCong);
        $("#SoCongTangCa").val(selectedItem.SoCongTangCa);
        $("#ComboCa").data("kendoComboBox").value(selectedItem.ID_Ca);
        let ci = new Date(selectedItem.Ngay);
        let co = new Date(selectedItem.Ngay);
        $.each($("#ComboCa").data("kendoComboBox").dataSource.data(), function (index, item) {
            console.log(ci);
            if (item.ID == selectedItem.ID_Ca) {
                ci.setHours(item.BatDauTinhCa.Hours, item.BatDauTinhCa.Minutes, 0, 0);
                co.setHours(item.KetThucTinhCa.Hours, item.KetThucTinhCa.Minutes, 0, 0);
                $("#CheckIn").data("kendoDateTimePicker").setOptions({ min: ci, max: co });
                $("#CheckOut").data("kendoDateTimePicker").setOptions({ min: ci, max: co });
            }

        })
        $("#CheckIn").data("kendoDateTimePicker").value(selectedItem.CheckIn == null ? ci : selectedItem.CheckIn);
        $("#CheckOut").data("kendoDateTimePicker").value(selectedItem.CheckOut == null ? ci : selectedItem.CheckOut);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}



function ValidateForm(callback) {
    //var validca = SetValidate("ComboCa");
    var validbatdau = SetValidate("CheckIn");
    var validketthuc = SetValidate("CheckOut");
    var validca = SetValidate("ComboCa");
    var validcong = SetValidate("SoCong");
    var validcongtangca = SetValidate("SoCongTangCa");
    var validxuatan = SetValidate("XuatAn");
    var valid = validbatdau && validketthuc && validca && validcong && validcongtangca && validxuatan
    if (valid) {
        callback(valid);
    } else {
        callback(valid);
    }
}


function Luu() {
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/ChamCongNhanVien/DieuChinhCong?ID_HoSoNhanSu=' + $("#ID_HoSoNhanSu").val()
                    + '&Ngay=' + $("#Ngay").val()
                    + '&ID_Ca=' + $("#ComboCa").data("kendoComboBox").value()
                    + '&Checkin=' + kendo.toString($("#CheckIn").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm')
                    + '&Checkout=' + kendo.toString($("#CheckOut").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm')
                    + '&SoCong=' + $("#SoCong").val()
                    + '&SoCongTangCa=' + $("#SoCongTangCa").val()
                    + '&XuatAn=' + $("#XuatAn").val(),
                type: 'GET',
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    TimKiem();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
    })

}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID_HoSoNhanSu").val('');
    $("#Ngay").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

/*function Xoa() {
    var treeList = $("#grid").data("kendoTreeList");
    var row = treeList.select();
    if (row.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 nhân viên hoặc 1 phòng ban cần xóa ca làm việc");
    } else {
        var selectedItem = treeList.dataItem(row);
        if (selectedItem.MaNhanVien != null) {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa phân ca của nhân viên: " + selectedItem.TenDayDu + " ?</b>", function () { XoaDuLieu(selectedItem); }, function () { });
        } else {
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa phân ca của phòng ban: " + selectedItem.TenDayDu + " ?</b>", function () { XoaDuLieu(selectedItem); }, function () { });
        }
    }
 
}*/
/*function XoaDuLieu(dulieu) {
    console.log(dulieu);
    if (dulieu.MaNhanVien != null) {
        $.ajax({
            url: '/CaLamViecNhanVien/Delete?ID_NhanVien=' + dulieu.ID + '&ID_PhongBan=0'
                + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
            type: 'POST'
        }).done(function (response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    } else {
        $.ajax({
            url: '/CaLamViecNhanVien/Delete?ID_PhongBan=' + (dulieu.ID - 10000) + '&ID_NhanVien=0'
                + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
                + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
            type: 'POST'
        }).done(function (response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        })
    }
 
}*/

function XuatExcel() {
    var grid = $('#grid').data('kendoTreeList');

    grid.options.excel = {
        fileName: "data.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}


function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function dateFromJson(jsonDate) {
    return new Date(parseInt(jsonDate.substr(6)));
}