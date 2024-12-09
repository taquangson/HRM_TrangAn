$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    $("#rootContainer").show();

    $("#grid").kendoGrid({
        data: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    fields: {
                        ThoiGianKetNoi: { type: 'date' }
                    }
                }
            },
            pageSize: 30,
        }),
        height: function () {
            var height = $(window).height() - 210;
            return height;
        },
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: false,
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "CheckPoint Connect Log";
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
            //{
            //    width: "32px",
            //    selectable: true,
            //    headerAttributes: {
            //        style: "text-align:left",
            //        class: "table-header-cell "
            //    },
            //},
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
                field: "TaiKhoan.TenDayDu",
                title: "Tên nhân viên",
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
                field: "Ngay",
                title: "Ngày làm việc",
                format: "{0:dd/MM/yyyy}",
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
                field: "CaLam.TenCa",
                title: "Ca làm việc",
                template: function (e) {
                    if (e.CaLam) {
                        return e.CaLam.TenCa + " - Từ <b style='color:blue'>" + kendo.toString(e.BatDauCa, 'HH:mm dd/MM/yyyy') + "</b> đến <b style='color:blue'>" + kendo.toString(e.KetThucCa, 'HH:mm dd/MM/yyyy') + "</b>"
                    }
                },
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
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "",
                title: "Thao tác",
                width: "200px",
                template: function (e) {
                    let html = "";
                    if (e.DaXuLy == 0) {
                        html += "<button onclick='XuPhat(" + e.ID + "," + e.TaiKhoan.ID + ",\"" + e.TaiKhoan.TenDayDu + "\",\"" + kendo.toString(e.Ngay, 'yyyy-MM-dd') + "\")' class='k-button bg-red'><i class='fa fa-wrench'> Xử phạt </i></button>";
                    }
                    if (e.DaTinhCong == 0) {
                        html += "<button onclick='TinhCong(" + e.ID + "," + e.TaiKhoan.ID + ",\"" + e.TaiKhoan.TenDayDu + "\",\"" + kendo.toString(e.Ngay, 'yyyy-MM-dd') + "\")' class='k-button bg-green'><i class='fa fa-check'> Tính công </i> </button>"
                    }
                    return html;
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
            }
        ]

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

    $("#windowXuPhat").kendoWindow({
        width: "50%",
        height: "50%",
        title: "Xử phạt vi phạm",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#NgayPhat").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayPhat").data("kendoDatePicker")._dateInput.setOptions({
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

    $.ajax({
        url: '/DanhMuc/GetAll_DanhMucLoi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,

        });
        $("#ComboLoi").kendoComboBox({
            dataTextField: "TenLoi",
            dataValueField: "ID",

            filter: "contains",
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                $("#SoTien").val(e.dataItem.PhatTien);
            }
        });
    });

    LoadTreeview();
})


function LoadTreeview() {
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
        $("#treePhongBan").kendoDropDownTree({
            dataSource: dataSourceCombo,
            placeholder: "Chọn phòng ban...",
            dataTextField: "TenPhongBan",
            dataValueField: "ID",
            valuePrimitive: true,
            autoBind: true
        })
        //$("#treePhongBan").data("kendoDropDownTree").setDataSource(dataSourceCombo);

        //$("#treeview").data("kendoTreeView").select(".k-first");
    })
}


function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/ChamCongNhanVien/GetData_DiMuonVeSom"
            + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/ddTHH:mm:ss")
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/ddTHH:mm:ss")
            + "&ID_PhongBan=" + ($("#treePhongBan").data("kendoDropDownTree").value() ? $("#treePhongBan").data("kendoDropDownTree").value() : 0),
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {

        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    fields: {
                        Ngay: { type: 'date' },
                        BatDauCa: { type: 'date' },
                        KetThucCa: { type: 'date' }
                    }
                }
            },
            pageSize: 30,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "QlyDiMuonVeSom.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function detailInit(e) {
    var detailRow = e.detailRow;
    var dataSource = new kendo.data.DataSource({
        data: e.data.lstChamCong,
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
                field: "WorkDate",
                format: "{0:HH:mm:ss}",
                title: "Thời gian chấm công",
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
                field: "TenDiem",
                title: "Tên điểm",
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
                //attributes: { style: "color: green;" },
                template: function (e) {
                    if (e.TenDiem) {

                        return e.TenDiem;
                    } else return '';
                }
            },
            {
                field: "DiaDiem",
                title: "Vị trí",
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
                field: "DiaChiIP",
                title: "IP",
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
            }

        ]

    });


}


function XuPhat(id, idnhanvien, tennhanvien, ngayphat) {
    $("#TenNhanVien").val(tennhanvien);
    $("#ID_TaiKhoan").val(idnhanvien);
    $("#ID").val(id);
    let date = new Date(ngayphat);
    $("#NgayPhat").data("kendoDatePicker").value(date);
    $("#windowXuPhat").data("kendoWindow").center().open();
}


function TinhCong(id, idnhanvien, tennhanvien, ngayphat) {
    $.ajax({
        url: '/ChamCongNhanVien/UpdatetLichSuDiMuonVeSom',
        type: 'POST',
        data: {
            ID: id,
            DaXuLy: -1,
            DaTinhCong: 1
        }
    }).done(function successCallback(response) {
        if (response.success) {
            notification.show({ kValue: response.msg }, "success");
            TimKiem();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#windowXuPhat").data("kendoWindow").close();
}

function ValidateForm() {
    var validten = SetValidate("SoTien");
    var validma = SetValidate("NgayPhat");
    var valid = validma && validten;

    return valid
}

function Luu() {
    if (ValidateForm()) {
        $.ajax({
            url: '/ChamCongNhanVien/UpdatetLichSuDiMuonVeSom',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                DaXuLy: 1,
                DaTinhCong: -1
            }
        }).done(function successCallback(response) {
            $.ajax({
                url: '/XuPhatNhanVien/InsertOrUpdate_XuPhatFromDiMuon',
                type: 'POST',
                data: {
                    ID_TaiKhoan: $("#ID_TaiKhoan").val(),
                    NgayPhat: kendo.toString($("#NgayPhat").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    ID_DanhMucLoi: $("#ComboLoi").data('kendoComboBox').value(),
                    GhiChu: $("#GhiChu").val(),
                    FromDMVS: 1,
                    lstNhanVienXuPhat: [{ ID_NhanVien: $("#ID_TaiKhoan").val() }]
                }
            }).done(function successCallback(response) {

                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    TimKiem();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        })
    }
}