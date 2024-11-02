$(".main_container").hide();
$(document).ready(function () {
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
                field: "MaTuyen",
                title: "Mã tuyến",
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
                field: "TenTuyen",
                title: "Tên tuyến",
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
                title: "Số lượng điểm",
                template: function (e) {
                    return "<span style='color:blue'>" + e.lstDiemTuyen.length + "</span>";
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
                field: "ThoiGianToiThieu",
                title: "Thời gian tối thiểu",
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
                field: "ThoiGianToiDa",
                title: "Thời gian tối đa",
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
    $("#windowDiem").kendoWindow({
        width: "800",
        height: "400",
        title: "Danh sách điểm",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });
    $("#gridDiem").kendoGrid({
        height: function () {
            var height = 300;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: { mode: "incell" },
        save: function (e) {
            
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi thứ tự điểm?</b>", function () { reloadSTT(); }, function () { });

        },
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
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
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
                            e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='openAddDiemWindow()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
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
                field: "TenDiem",
                title: "Tên điểm",
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
                field: "DiaDiem",
                title: "Địa điểm",
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
    $("#gridAddDiem").kendoGrid({
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
                attributes: {
                    style: "text-align: left;",
                }
            },

            {
                field: "DiaDiem",
                title: "Địa điểm",
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
        $("#ID").val(selectedItem.ID);
        $("#TenTuyen").val(selectedItem.TenTuyen);
        $("#MaTuyen").val(selectedItem.MaTuyen);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#ThoiGianToiThieu").val(selectedItem.ThoiGianToiThieu);
        $("#ThoiGianToiDa").val(selectedItem.ThoiGianToiDa);
        $("#DanhSachDiem").val(selectedItem.lstDiemTuyen);
        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstDiemTuyen,
            schema: {
                model: {
                    ID: "ID_DiemQuetThe",
                    field: {
                        STT: { type: 'number', editable: true },
                        TenDiem: { type: 'string', editable: false },
                        MaDiem: { type: 'string', editable: false },
                        DiaDiem: { type: 'string', editable: false },

                    }
                }
            },
            pageSize: 20,
        });
        $("#gridDiem").data("kendoGrid").setDataSource(dataSource);
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}

function LoadGridData() {
    $.ajax({
        url: '/TuyenDo/GetAllTuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgayTao: {
                            type: 'date'
                        }
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
                ID: "ID_DiemQuetThe",
                field: {
                    STT: { type: 'number', editable: true },
                    TenDiem: { type: 'string', editable: false },
                    MaDiem: { type: 'string', editable: false },
                    DiaDiem: { type: 'string', editable: false },

                }
            }
        },
        pageSize: 20,
    });
    $("#gridDiem").data("kendoGrid").setDataSource(dataSource);
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm() {
    var validten = SetValidate("TenTuyen");
    var validma = SetValidate("MaTuyen");
    var valid = validma && validten;
    return valid;
}

function Luu() {
    var bangDuLieuDiem = $("#gridDiem").data("kendoGrid").dataSource.data();
    var bangDuLieuDiemTuyen = [];
    $.each(bangDuLieuDiem, function (index, item) {
        bangDuLieuDiemTuyen.push({
            ID_DiemQuetThe: item.ID_DiemQuetThe,
            STT: item.STT
        });
    })

    if (ValidateForm()) {
        $.ajax({
            url: '/TuyenDo/InsertOrUpdate_TuyenDo',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenTuyen: $("#TenTuyen").val(),
                MaTuyen: $("#MaTuyen").val(),
                GhiChu: $("#GhiChu").val(),
                ThoiGianToiThieu: $("#ThoiGianToiThieu").val(),
                ThoiGianToiDa: $("#ThoiGianToiDa").val(),
                lstDiemTuyen: bangDuLieuDiemTuyen
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
        url: '/TuyenDo/DeleteMulti_TuyenDo?ID=' + ids.join(','),
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

function openAddDiemWindow() {
    $.ajax({
        url: '/DiemQuetThe/GetAllDiemQuetThe',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddDiem"), true);
        var lstDiemNgoaiTuyen = [];
        for (var i = 0; i < response.length; i++) {
            if (!CheckDiemTrongTuyen(response[i].ID)) {
                lstDiemNgoaiTuyen.push(response[i])
            }
        }

        var dataSource = new kendo.data.DataSource({

            data: lstDiemNgoaiTuyen,
            schema: {
                model: {
                    ID: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridAddDiem").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridAddDiem"), false);
        if ($(window).width() > 800) {
            $("#windowDiem").data("kendoWindow").center().open();
        } else {
            $("#windowDiem").data("kendoWindow").center().maximize().open();
        }
    });
}


function LuuAddDiem() {
    $("#windowDiem").data("kendoWindow").close();
    var bangDuLieuDiemTuyen = $("#gridDiem").data("kendoGrid").dataSource.data();
    var bangDuLieuDiem = [];

    $.each(bangDuLieuDiemTuyen, function (index, item) {
        bangDuLieuDiem.push({
            ID_DiemQuetThe: item.ID_DiemQuetThe,
            TenDiem: item.TenDiem,
            DiaDiem: item.DiaDiem,
            MaDiem: item.MaDiem
        });
    })
    var bangDuLieuAddDiem = $("#gridAddDiem").data("kendoGrid");
    bangDuLieuAddDiem.select().each(function () {
        var dataItem = bangDuLieuAddDiem.dataItem(this);
        bangDuLieuDiem.push({
            ID_DiemQuetThe: dataItem.ID,
            TenDiem: dataItem.TenDiem,
            DiaDiem: dataItem.DiaDiem,
            MaDiem: dataItem.MaDiem
        });
    });

    $.each(bangDuLieuDiem, function (index, item) {
        item.STT = index;
    })
    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuDiem,
        schema: {
            model: {
                ID: "ID_DiemQuetThe",
                field: {
                    STT: { type: 'number', editable: true },
                    TenDiem: { type: 'string', editable: false },
                    MaDiem: { type: 'string', editable: false },
                    DiaDiem: { type: 'string', editable: false },

                }
            }
        },
        pageSize: 20,
    });

    $("#gridDiem").data("kendoGrid").setDataSource(dataSource);

}
function DeleteRow(uid) {
    var dataRow = $('#gridDiem').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridDiem').data("kendoGrid").dataSource.remove(dataRow);
    reloadSTT()
}

function CheckDiemTrongTuyen(iddiem) {
    var bangDuLieuDiem = $("#gridDiem").data("kendoGrid").dataSource.data();
    var isExisted = false;
    $.each(bangDuLieuDiem, function (index, item) {
        console.log(item);
        console.log(iddiem)
        if (iddiem == item.ID_DiemQuetThe) {
            isExisted = true;
        }
    })

    return isExisted;
}

function reloadSTT() {
    var bangDuLieuDiemTuyen = $("#gridDiem").data("kendoGrid").dataSource.data();
    var bangDuLieuDiem = [];

    $.each(bangDuLieuDiemTuyen, function (index, item) {
        bangDuLieuDiem.push({
            STT: item.STT,
            ID_DiemQuetThe: item.ID_DiemQuetThe,
            TenDiem: item.TenDiem,
            DiaDiem: item.DiaDiem,
            MaDiem: item.MaDiem
        });
    })
    bangDuLieuDiem.sort(function (a, b) {
        return a.STT - b.STT;
    });
    $.each(bangDuLieuDiem, function (index, item) {
        item.STT = index + 1;
    })
    var dataSource = new kendo.data.DataSource({

        data: bangDuLieuDiem,
        schema: {
            model: {
                ID: "ID_DiemQuetThe",
                field: {
                    STT: { type: 'number', editable: true },
                    TenDiem: { type: 'string', editable: false },
                    MaDiem: { type: 'string', editable: false },
                    DiaDiem: { type: 'string', editable: false },

                }
            }
        },
        pageSize: 20,
    });

    $("#gridDiem").data("kendoGrid").setDataSource(dataSource);
}
