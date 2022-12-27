var lstHocSinhTrongLop = [];
var lstCaHoc = []
$(document).ready(function () {
    api.setRestToken();
    $("#window").kendoWindow({
        width: "680px",
        height: "570px",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function (e) {
            $("#grid").data("kendoGrid").clearSelection();
        }
    });

    $("#windowChitiet").kendoWindow({
        title: "Chi tiết danh sách học sinh thuộc lớp",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function () {
            $("#IDLop").val(0);
        }
    });

    $("#files").kendoUpload({
        validation: {
            allowedExtensions: [".jpg", ".png", ".jpeg"]
        },
        localization: {
            select: 'Tải sơ đồ lớp',
            remove: '',
            cancel: ''
        },
        multiple: false,
        select: function (e) {
            var fileInfo = e.files[0];
            var wrapper = this.wrapper;

            setTimeout(function () {
                addPreview(fileInfo, wrapper);
            });
        }
    });

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
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách lớp";
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
                width: "30px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "60px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenLop",
                title: "Tên lớp",
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
                }
            },
            {
                field: "TenKhoi",
                title: "Tên khối",
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
                field: "TenGiaoVien",
                title: "Giáo viên",
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
                field: "SiSo",
                title: "Sĩ số",
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
                    class: "text-center"
                }
            },
            {
                field: "PhongHoc",
                title: "Phòng học",
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
                }
            },
            {
                field: "NamHoc",
                title: "Năm học",
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
                    class: "text-center"
                }
            },
            {
                title: "Chi tiết lớp",
                width: "200px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    if (e.TrangThai == -1) {
                        return "<button class='k-button k-success text-center' onclick='openChiTietLop(" + e.ID + ")'><i class='fa fa-pencil'></i> Chi tiết</button>" +
                            "<button class='k-button k-success text-center' onclick='DuyetLop(" + e.ID + ")'><i class='fa fa-check'></i> Phê duyệt lớp</button>";
                    } else {
                        return "<button class='k-button k-success text-center' onclick='openChiTietLop(" + e.ID + ")'><i class='fa fa-pencil'/> Chi tiết</button>";
                    }
                }
            },
            {
                title: "Trực tuyến",
                width: "100px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    if (e.IsLive == 0) {
                        return "<button class='k-button k-success text-center' onclick='openOnline(" + e.ID + ")'><i class='fa fa-video-camera'/> Go live</button>";
                    } else {
                        return "<button class='k-button k-error text-center' onclick='closeOnline(" + e.ID + ",\"" + e.Token_Room + "\")'><i class='fa fa-plug'/> Dừng lớp</button>";
                    }
                }
            }
        ]

    });

    $("#gridHocSinhTrongLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 120;
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
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
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
                field: "TenHocSinh",
                title: "Tên học sinh",
                width: "250px",
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
                field: "DiaChi",
                title: "Địa chỉ",
                width: "250px",
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
                field: "PhuHuynh",
                title: "Tên phụ huynh",
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
                field: "DienThoaiMacDinh",
                title: "Điện thoại",
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
                field: "TenTruong",
                title: "Tên trường học",
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
            }
        ]
    });

    $("#gridHocSinhNgoaiLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 120;
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
        change: function (e) {
            var grid = e.sender;
            var items = grid.items();
            items.each(function (idx, row) {
                var IDHocSinh = grid.dataItem(row).get("ID");
                var existedindex = -1;
                try {
                    $.each(lstHocSinhTrongLop, function (index, item) {
                        if (item.ID == IDHocSinh) {
                            existedindex = index;
                        }
                    })
                } catch (e) {
                    existedindex = -1;
                }
                if (row.className.indexOf("k-state-selected") >= 0 && IDHocSinh > 0) {
                    if (existedindex < 0) {
                        var itemselected = grid.dataItem(row);
                        lstHocSinhTrongLop.push({
                            ID: itemselected.ID,
                            TenHocSinh: itemselected.TenHocSinh,
                            DiaChi: itemselected.DiaChi,
                            PhuHuynh: itemselected.PhuHuynh,
                            DienThoaiMacDinh: itemselected.DienThoaiMacDinh,
                            TenTruong: itemselected.TenTruong,
                        });
                    }
                } else {
                    if (existedindex >= 0) {
                        lstHocSinhTrongLop.splice(existedindex, 1);
                    }
                }
            });

            var dataSource = new kendo.data.DataSource({
                data: lstHocSinhTrongLop,
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 50,
            });
            $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        },
        dataBound: function (e) {
            console.log("bound - " + lstHocSinhTrongLop.length);
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
                var IDHocSinh = grid.dataItem(row).get("ID");
                var existedindex = lstHocSinhTrongLop.findIndex(x => x.ID == IDHocSinh);
                if (existedindex >= 0) {
                    itemsToSelect.push(row);
                }
            });
            e.sender.select(itemsToSelect);
        },
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        columns: [
            {
                selectable: true,
                width: 30,
                headerAttributes: {
                    style: "text-align: left; font-size: 12px; ",
                    class: "table-header-cell"
                },
                attributes: {
                    class: "text-left"
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
                field: "TenHocSinh",
                title: "Tên học sinh",
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
                field: "DiaChi",
                title: "Địa chỉ",
                width: "250px",
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
                field: "PhuHuynh",
                title: "Tên phụ huynh",
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
                field: "DienThoaiMacDinh",
                title: "Điện thoại",
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
                field: "TenTruong",
                title: "Tên trường học",
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
            }
        ]

    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })

    createGridLichHoc();

    LoadGridData();

    LoadComboGiaoVien();

    LoadComboKhoi();

    LoadlstCaHoc();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function LoadlstCaHoc() {
    $.ajax({
        url: '/DanhMuc/GetAll_CaHoc',
        type: 'GET'
    }).done(function (response) {
        lstCaHoc = response;
    })
}


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
        console.log(selectedItem);
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#TenLop").val(selectedItem.TenLop);
        $("#PhongHoc").val(selectedItem.PhongHoc);
        $("#GiaoVienCombo").data("kendoComboBox").value(selectedItem.GiaoVien);
        $("#KhoiCombo").data("kendoComboBox").value(selectedItem.ID_Khoi);
        LoadGridLichHoc(selectedItem.ID);
        //$(".image-preview").remove();
        //if (selectedItem.SoDoLop != null) {
        //    var preview = $("<img class='image-preview'>").attr("src", "../Images/SoDoLop/" + selectedItem.SoDoLop);
        //    var wrapper = $("#files").data("kendoUpload").wrapper;
        //}
        //wrapper.append(preview);
    }
}

function openChiTietLop(id) {
    $("#windowChitiet").data("kendoWindow").open().maximize();
    $("#gridHocSinhNgoaiLop").data("kendoGrid").clearSelection();
    lstHocSinhTrongLop = [];
    LoadHocSinhTrongLop(id);
    $("#IDLop").val(id);
}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    $.ajax({
        url: '/Lop/GetAll',
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
            pageSize: 50,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function LoadComboGiaoVien() {
    $.ajax({
        url: '/User/GetAllUser',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        $("#GiaoVienCombo").kendoComboBox({
            dataTextField: 'TenDayDu',
            dataValueField: 'ID',
            dataSource: dataSource
        });

        $("#QuanSinhCombo").kendoMultiSelect({
            dataTextField: 'TenDayDu',
            dataValueField: 'ID',
            autoClose: false,
            dataSource: dataSource
        });
    });
}


function LoadComboKhoi() {
    $.ajax({
        url: '/Lop/GetAllKhoi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        $("#KhoiCombo").kendoComboBox({
            dataTextField: 'TenKhoi',
            dataValueField: 'ID',
            dataSource: dataSource
        });
    });
}
function ThemMoi() {
    LoadGridLichHoc(0);
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function Luu() {
    var validten = SetValidate("TenLop");
    var validgv = SetValidate("GiaoVienCombo");
    var validkhoi = SetValidate("KhoiCombo");
    var valid = validten && validgv && validkhoi;
    if (valid) {
        var data = new FormData();
        //var file = $("#files").data("kendoUpload").getFiles()[0];
        //var filename = kendo.toString(new Date(), "yyyymmddhhmmss") + (file ? file.name : "");
        var lstLichHoc = [];
        $.each($("#gridLichHoc").data("kendoGrid").dataSource.data(), function (index, item) {
            lstLichHoc.push({
                ID: item.ID,
                Thu: item.Thu,
                Ca: item.Ca,
                GhiChu: item.GhiChu ? item.GhiChu : ""
            })
        })
        var model = {
            ID: $("#ID").val(),
            TenLop: $("#TenLop").val(),
            PhongHoc: $("#PhongHoc").val(),
            GiaoVien: $("#GiaoVienCombo").data("kendoComboBox").value(),
            ID_Khoi: $("#KhoiCombo").data("kendoComboBox").value(),
            LichHoc: "",
            SoDoLop: "",
            lstLichHoc: lstLichHoc
        }
        //data.append("model", JSON.stringify(model));
        //if (file) {
        //    data.append('file', file.rawFile, filename);
        //}
        $.ajax({
            url: '/Lop/CreateOrUpdate',
            //processData: false,
            //contentType: false,
            data: model,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
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
    $("#ID").val('0');
    $("#window").data("kendoWindow").close();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " lớp?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/Lop/Delete?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.status) {
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function LoadHocSinhNgoaiLop(id) {
    $.ajax({
        url: '/HocSinh/GetAllNgoaiLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        //kendo.ui.progress($("#gridHocSinhNgoaiLop"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 50,
        });
        $("#gridHocSinhNgoaiLop").data("kendoGrid").setDataSource(dataSource);
        //kendo.ui.progress($("#gridHocSinhNgoaiLop"), false);
        setTimeout(function () {
            kendo.ui.progress($("#windowChitiet"), false);

        }, 500)
    });
}

function LoadHocSinhTrongLop(id) {
    kendo.ui.progress($("#windowChitiet"), true);
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        //kendo.ui.progress($("#gridHocSinhTrongLop"), true);
        lstHocSinhTrongLop = response;
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 50,
        });
        $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        LoadHocSinhNgoaiLop(id);
        //kendo.ui.progress($("#gridHocSinhTrongLop"), false);       
    });
}

function LuuChiTietLop() {
    $.ajax({
        url: '/Lop/ThemHocSinhVaoLop',
        type: 'POST',
        data: {
            ID_Lop: $("#IDLop").val(),
            lstHocSinh: lstHocSinhTrongLop
        }
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            //LoadHocSinhTrongLop($("#IDLop").val());
            LoadGridData();
            //HuyChiTietLop();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function HuyChiTietLop() {
    $("#windowChitiet").data("kendoWindow").close();
    $("#IDLop").val(0);
}

function addPreview(file, wrapper) {
    var raw = file.rawFile;
    var reader = new FileReader();

    if (raw) {
        reader.onloadend = function () {
            var preview = $("<img class='image-preview'>").attr("src", this.result);

            wrapper.find(".k-file[data-uid='" + file.uid + "'] .k-file-extension-wrapper")
                .replaceWith(preview);
        };

        reader.readAsDataURL(raw);
    }
}

function XuatExcelHocSinh() {
    var grid = $('#gridHocSinhTrongLop').data('kendoGrid');

    grid.options.excel = {
        fileName: "Danh_Sach_Hoc_Sinh.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}

function createGridLichHoc() {
    if ($("#gridLichHoc").data("kendoGrid") == undefined) {
        $("#gridLichHoc").kendoGrid({
            dataSource: new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            ID: { type: 'number', editable: false },
                            Thu: { type: 'number', editable: true },
                            Ca: { type: 'number', editable: true },
                            GhiChu: { type: 'text', editable: true },
                            TenCa: { type: 'text', editablle: false },
                            TenBuoi: { type: 'text', editablle: false }
                        }
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
            columns: [
                {
                    title: " ",
                    field: 'ID',
                    template: function (e) {
                        return "<i onclick='DeleteRowLichHoc(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
                                e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='AddRowLichHoc()'><i class='fa fa-plus'></i></a>")
                            }
                        }
                    },
                },
                {
                    field: "Thu",
                    title: "Ngày trong tuần",
                    width: 160,
                    template: function (e) {
                        if (e.TenBuoi) {
                            return e.TenBuoi;
                        } else {
                            return '';
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
                                data: [{ text: "Thứ 2", value: 2 },
                                { text: "Thứ 3", value: 3 },
                                { text: "Thứ 4", value: 4 },
                                { text: "Thứ 5", value: 5 },
                                { text: "Thứ 6", value: 6 },
                                { text: "Thứ 7", value: 7 },
                                { text: "Chủ nhật", value: 1 },
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
                {
                    field: "Ca",
                    title: "Ca học",
                    width: 120,
                    template: function (e) {
                        if (e.TenCa) {
                            return e.TenCa;
                        } else {
                            return '';
                        }
                    },
                    editor: function (container, options) {
                        $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                            dataTextField: "TenCa",
                            dataValueField: "ID",
                            autoBind: false,
                            change: function (e) {
                                options.model.TenCa = e.sender.text();
                            },
                            dataSource: new kendo.data.DataSource({
                                data: lstCaHoc
                            }),
                        })
                    },
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
                    field: "GhiChu",
                    title: "Ghi chú",
                    width: 230,
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

            ]
        });
    }
}

function LoadGridLichHoc(ID_Lop) {
    $.ajax({
        url: '/LichHoc/GetLichHocByLop?ID_Lop=' + ID_Lop,
        type: 'GET'
    }).done(function (response) {
        var ds = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thu: { type: 'number', editable: true },
                        Ca: { type: 'number', editable: true },
                        GhiChu: { type: 'text', editable: true },
                        TenCa: { type: 'text', editablle: false },
                        TenBuoi: { type: 'text', editablle: false }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridLichHoc").data("kendoGrid").setDataSource(ds);
    })

}

function AddRowLichHoc(e) {
    var grid = $("#gridLichHoc").data("kendoGrid");
    grid.addRow();
}
function DeleteRowLichHoc(uid) {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    if (selectedItem) {
        if (selectedItem.trangThai > 0) {
            openDialog(dialogRoot, "Vui lòng liên hệ bộ phân văn phòng để sửa lịch học");
            return;
        }
    }
    var dataRow = $('#gridLichHoc').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridLichHoc').data("kendoGrid").dataSource.remove(dataRow);
}

function DuyetLop(ID_Lop) {
    $.ajax({
        url: '/Lop/DuyetLop?ID_Lop=' + ID_Lop,
        type: 'GET',
    }).done(function successCallback(response) {
        LoadGridData();
    })
}

async function openOnline(ID_Lop) {
    var room = await api.createRoom();
    console.log(room);
    $.ajax({
        url: '/Lop/Golive?ID_Lop=' + ID_Lop + '&Token=' + room.roomId + '&TrangThai=1',
        type: 'POST',
    }).done(function successCallback(response) {
        LoadGridData();
    })
}

async function closeOnline(ID_Lop, Token_Room) {
    var room = await api.deleteRoom(Token_Room);
    console.log(room);
    $.ajax({
        url: '/Lop/Golive?ID_Lop=' + ID_Lop + '&Token=' + '&TrangThai=0',
        type: 'POST',
    }).done(function successCallback(response) {
        LoadGridData();
    })
}

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "DanhSanhLopHoc.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveAsExcel();
}