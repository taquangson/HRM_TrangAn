
$(document).ready(function () {
    LoadCombo();
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
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
    $("#rootContainer").show();
    $("#gridData").kendoGrid({
        data: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "STT",
                    fields: {
                        STT: { type: 'number', editable: false },
                        DiemDanhGia: { type: 'number', editable: false },
                        TenDayDu: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        NgayTao: { type: 'date', editable: false }
                    }
                }
            },
            pageSize: 30,
        }),
        height: function () {
            var height = $(window).height() - 170;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: { mode: "incell" },
        excel: {
            filterable: true
        },
        save: function (e) {
            console.log(e);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái phê duyệt?</b>", function () { CapNhatTrangThai(e.model.STT, e.values.TrangThai); }, function () { });

        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "DanhGia";
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
                width: "120px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                field: "DiemDanhGia",
                title: "Điểm đánh giá",
                width: "110px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                field: "NgayTao",
                title: "Thời gian đánh giá",
                format:"{0:hh:mm dd/MM/yyyy}",
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
                field: "TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<span style='color:blue'>" + "Đã duyệt" + "</span>";
                    } else {
                        return "<span style='color:red'>Chưa duyệt</span>";
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

    //LoadGridData();
    //$.ajax({
    //    url: '/TuyenDo/GetAllTuyenDo',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    var datashow = []
    //    for (var i = 0; i < response.length; i++) {
    //        if (response[i].MaNhanVien !== null && response[i].MaNhanVien !== "") {
    //            datashow.push(response[i])
    //        }
    //    }
    //    var dataSource = new kendo.data.DataSource({
    //        data: datashow,
    //    });

    //    $("#ComboTuyenDo").kendoMultiColumnComboBox({
    //        dataTextField: "TenTuyen",
    //        dataValueField: "ID",
    //        columns: [
    //            {
    //                field: "TenTuyen",
    //                title: "Tên tuyến",
    //                width: "200px",
    //            },
    //            {
    //                field: "ThoiGianToiThieu",
    //                title: "Thời gian tối thiểu",
    //                width: "200px",
    //            },
    //            {
    //                field: "ThoiGianToiDa",
    //                title: "Thời gian tối đa",
    //                width: "200px",
    //            },
    //        ],
    //        footerTemplate: 'Tổng #: instance.dataSource.total() # thuyền',
    //        filter: "contains",
    //        filterFields: ["TenTuyen"],
    //        suggest: true,
    //        delay: 1000,
    //        dataSource: dataSource,
    //        select: function (e) {
    //            // Use the selected item or its text
    //        }
    //    })
    //});


})

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
                        ID_TrangThai: 1,
                        TrangThai: "Đã duyệt"
                    },
                    {
                        ID_TrangThai: 0,
                        TrangThai: "Chưa duyệt"
                    },
                ]
            },
            autoWidth: true
        });
}

function CapNhatTrangThai(id, trangthai) {
    $.ajax({
        url: '/NhanVien/UpdateTrangThaiDanhGia?STT=' + id + '&TrangThai=' + trangthai,
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            //TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function CapNhatTrangThaiMulti() {
    var ids = "";
    $("#gridData").data("kendoGrid").select().each(function () {
        var dataItem = $("#gridData").data("kendoGrid").dataItem(this);
        var id = dataItem.STT;
        ids += ',' + id;
    });
    $.ajax({
        url: '/NhanVien/UpdateTrangThaiDanhGiaMulti?STT=' + ids.substr(1) + '&TrangThai=1',
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function XacNhan() {
    var bangDuLieu = $("#gridData").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn phê duyệt " + bangDuLieu.select().length + "  đánh giá lái đò?</b>", function () { CapNhatTrangThaiMulti(); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần thao tác</b>");
        //notification.show({kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}

function LoadCombo() {
    $.ajax({
        url: '/ToNhom/GetAllDanhMucToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [{
            TenToNhom: "Tất cả",
            ID: 0
        }]
        $.each(response, function (index, item) {
            data.push({
                TenToNhom: item.TenToNhom,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        $("#comboToNhom").kendoComboBox({
            dataTextField: 'TenToNhom',
            dataValueField: 'ID',
            dataSource: dataSource,
            filter: "contains"
        });
        $("#comboToNhom").data("kendoComboBox").value(0);
    });
}



function TimKiem() {
    kendo.ui.progress($("#gridData"), true);
    $.ajax({
        url: "/NhanVien/GetAllDataDanhGia"
            + "?From=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&To=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=" + $("#comboToNhom").data("kendoComboBox").value()
            + "&MaNhanVien=" + $("#MaNhanVien").val(),
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "STT",
                    fields: {
                        STT: { type: 'number', editable: false },
                        DiemDanhGia: { type: 'number', editable: false },
                        TenDayDu: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        NgayTao: { type: 'date', editable: false }
                    }
                }
            },
            pageSize: 30,
        });
        $("#gridData").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridData"), false);
    });
}


function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "QuanLyDanhGia.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function detailInit(e) {
    var detailRow = e.detailRow;
    $.ajax({
        url: "/NhanVien/GetDataDanhGiaBySTT?STT=" + e.data.STT,            
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    fields: {
                        WorkDate: {
                            type: 'date'
                        },
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
            //pageable: pageableShort,
            pageable:false,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            columns: [               
                {
                    field: "CauHoi",
                    title: "Câu hỏi",
                    width: "40%",
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
                    field: "TraLoi",
                    title: "Trả lời",
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
    });



}