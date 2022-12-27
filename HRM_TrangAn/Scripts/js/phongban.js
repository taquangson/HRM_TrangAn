var selectedPhongBan;
$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#treeview").kendoTreeView({
        dataTextField: "TenPhongBan",
        dataValueField: "ID",
        select: function (e) {
            selectedPhongBan = $("#treeview").getKendoTreeView().dataItem(e.node)
            LoadGridNhanVienTrongPhongBan();
            LoadGridChucNangTrongPhongBan();
        },
    });
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    $("#gridNhanVienTrongPhongBan").kendoGrid({
        height: function () {
            var height = $(window).height() - 185;
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
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaNhanVienKhoiNhom(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 30,
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
                            e.element.parent().html("<a class='k-button' title='Thêm nhân viên' style='width:100%; height:25px;' onclick='OpenGridNhanVienNgoaiPhongBan()'><i class='fa fa-plus'></i></a>")
                        }
                    }
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
                field: "TenDayDu",
                title: "Tên nhân viên",
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
                field: "TaiKhoan",
                title: "Tên tài khoản",
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
                field: "DienThoai",
                title: "Điện thoại",
                width: "80px",
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
    $("#gridNhanVienNgoaiPhongBan").kendoGrid({
        height: 498,
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
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='ThemNhanVienVaoNhom(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                },
                width: 30,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: false
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
                field: "TenDayDu",
                title: "Tên nhân viên",
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
                field: "TaiKhoan",
                title: "Tên tài khoản",
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
                field: "DienThoai",
                title: "Điện thoại",
                width: "80px",
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
    $("#gridChucNangTrongPhongBan").kendoGrid({
        height: function () {
            var height = $(window).height() - 185;
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
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaChucNangKhoiNhom(\"" + e.uid + "\"," + e.ID_ChucNang + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: "65px",
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
                            e.element.parent().html("<a class='k-button' title='Thêm chức năng' style='width:100%; height:25px;' onclick='OpenGridChucNangNgoaiNhom()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "100px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenNhomChucNang",
                title: "Nhóm chức năng",
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
                field: "TenChucNang",
                title: "Tên chức năng",
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
    $("#gridChucNangNgoaiPhongBan").kendoGrid({
        height: 498,
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
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='ThemChucNangVaoNhom(\"" + e.uid + "\"," + e.ID_ChucNang + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                },
                width: 30,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                },
                filterable: false
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
                field: "TenNhomChucNang",
                title: "Nhóm chức năng",
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
                field: "TenChucNang",
                title: "Tên chức năng",
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
    $("#windowChonNhanVien").kendoWindow({
        width: 700,
        height: 500,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thêm nhân viên vào phòng ban"
    });
    $("#windowChonChucNang").kendoWindow({
        width: 700,
        height: 500,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thêm chức năng cho phòng ban"
    });
    $("#windowPhongBan").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin phòng ban"
    });
    $("#PhongBanCha").kendoDropDownTree({
        placeholder: "Chọn phòng ban...",
        dataTextField: "TenPhongBan",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: true
    })
    loadTreeview();

})

function ThemPhongBan() {
    document.getElementById("formPhongBan").reset();
    $("#ID_PhongBan").val(0);
    $("#windowPhongBan").data("kendoWindow").center().open();
}

function HuyPhongBan() {
    document.getElementById("formPhongBan").reset();
    $("#ID_PhongBan").val(0);
    $("#windowPhongBan").data("kendoWindow").close();
}

function SuaPhongBan() {
    document.getElementById("formPhongBan").reset();
    $("#ID_PhongBan").val(selectedPhongBan.ID);
    $("#TenPhongBan").val(selectedPhongBan.TenPhongBan);
    setTimeout(function () {
        $("#PhongBanCha").data("kendoDropDownTree").value(selectedPhongBan.ID_PhongBanCha);
    })
    $("#windowPhongBan").data("kendoWindow").center().open();
}

function LuuPhongBan() {
    var validten = SetValidate("TenPhongBan");
    var validcha = SetValidate("PhongBanCha");
    var valid = validten && validcha;
    if (valid) {
        $.ajax({
            url: '/PhongBan/CreateOrUpdate',
            data: {
                ID: $("#ID_PhongBan").val(),
                TenPhongBan: $("#TenPhongBan").val(),
                ID_PhongBanCha: $("#PhongBanCha").data("kendoDropDownTree").value()
            },
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyPhongBan();
                loadTreeview();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }

}

function loadTreeview() {
    $.ajax({
        url: '/PhongBan/GetTreePhongBan',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })

        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstChild"
                }
            }
        })

        $("#treeview").data("kendoTreeView").setDataSource(dataSource);

        $("#treeview").data("kendoTreeView").expand(".k-item");

        $("#PhongBanCha").data("kendoDropDownTree").setDataSource(dataSourceCombo);

        //$("#treeview").data("kendoTreeView").select(".k-first");
    })
}

function OpenGridNhanVienNgoaiPhongBan() {
    $("#windowChonNhanVien").data("kendoWindow").center().open();
    $.ajax({
        url: '/User/GetAllUser_NgoaiPhongBan?ID_PhongBan=' + selectedPhongBan.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridNhanVienNgoaiPhongBan"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridNhanVienNgoaiPhongBan").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridNhanVienNgoaiPhongBan"), false);
    });
}


function LoadGridNhanVienTrongPhongBan() {
    $.ajax({
        url: '/User/GetAllUser_TrongPhongBan?ID_PhongBan=' + selectedPhongBan.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridNhanVienTrongPhongBan"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridNhanVienTrongPhongBan").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridNhanVienTrongPhongBan"), false);
    });
}

function ThemNhanVienVaoNhom(uid, idtaikhoan) {
    var dataRow = $('#gridNhanVienNgoaiPhongBan').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/PhongBan/ThemTaiKhoanVaoPhongBan?ID_PhongBan=' + selectedPhongBan.ID + "&ID_TaiKhoan=" + idtaikhoan,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridNhanVienNgoaiPhongBan').data("kendoGrid").dataSource.remove(dataRow);
            LoadGridNhanVienTrongPhongBan();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}


function XoaNhanVienKhoiNhom(uid, idtaikhoan) {
    var dataRow = $('#gridNhanVienTrongPhongBan').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/PhongBan/XoaTaiKhoanKhoiPhongBan?ID_PhongBan=' + selectedPhongBan.ID + "&ID_TaiKhoan=" + idtaikhoan,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridNhanVienTrongPhongBan').data("kendoGrid").dataSource.remove(dataRow);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function OpenGridChucNangNgoaiNhom() {
    $("#windowChonChucNang").data("kendoWindow").center().open();
    $.ajax({
        url: '/ChucNang/GetAllChucNangNgoaiPhongBan?ID_PhongBan=' + selectedPhongBan.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridChucNangNgoaiPhongBan"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridChucNangNgoaiPhongBan").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChucNangNgoaiPhongBan"), false);
    });
}

function LoadGridChucNangTrongPhongBan() {
    $.ajax({
        url: '/ChucNang/GetAllChucNangTrongPhongBan?ID_PhongBan=' + selectedPhongBan.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridChucNangTrongPhongBan"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridChucNangTrongPhongBan").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChucNangTrongPhongBan"), false);
    });
}
function ThemChucNangVaoNhom(uid, idchucnang) {
    var dataRow = $('#gridChucNangNgoaiPhongBan').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/ChucNang/ThemChucNangVaoPhongBan?ID_PhongBan=' + selectedPhongBan.ID + "&ID_ChucNang=" + idchucnang,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridChucNangNgoaiPhongBan').data("kendoGrid").dataSource.remove(dataRow);
            LoadGridChucNangTrongPhongBan();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}


function XoaChucNangKhoiNhom(uid, idchucnang) {
    var dataRow = $('#gridChucNangTrongPhongBan').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/ChucNang/XoaChucNangVaoPhongBan?ID_PhongBan=' + selectedPhongBan.ID + "&ID_ChucNang=" + idchucnang,
        type: 'POST',
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $('#gridChucNangTrongPhongBan').data("kendoGrid").dataSource.remove(dataRow);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}