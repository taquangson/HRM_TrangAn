var lstHocSinhTrongLop = [];
var lstHocSinhTrongLopHocBu = [];
var lstCaHoc = []
$(document).ready(function () {
    api.setRestToken();
    $("#windowLopHocBu").kendoWindow({
        width: "680px",
        height: "410px",
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

    $("#windowChitietLopHocBu").kendoWindow({
        title: "Chi tiết danh sách học sinh thuộc lớp",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#windowChitiet").kendoWindow({
        title: "Chi tiết danh sách học sinh thuộc lớp",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });




    $("#windowBaiKiemTra").kendoWindow({
        title: "Các bài kiểm tra của học sinh",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowThemBKT").kendoWindow({
        title: "Thông tin bài kiểm tra",
        visible: false,

        width: 400,
        height: 120,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#fileBKT").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file ảnh bài kiểm tra',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            PushFormDataFile(e.files[0], $("#ID_BaiKiemTra").val());
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
                }
            },
            {
                title: "Chi tiết lớp",
                width: "100px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    if (e.ID_NhanVien > 0) {
                        return "<button class='k-button k-success text-center' onclick='openChiTietLopHocBu(" + e.ID + ")'><i class='fa fa-pencil'/> Chi tiết</button>";
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
                    if (e.IsLive > 0) {
                        return "<button class='k-button k-success text-center' onclick='openOnline(" + e.GiaoVien + "," + e.ID + ",\"" + e.Token_Room + "\")'><i class='fa fa-video-camera'/> Tham dự lớp</button>";
                    } else {
                        return "";
                    }
                }
            }
        ]

    });
    $("#gridHocSinhTrongLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 40;
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
            },
            {
                title: "Bài kiểm tra",
                width: "200px",
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-pencil'/> Bài kiểm tra</button>";
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
    $("#gridHocSinhTrongLopHocBu").kendoGrid({
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

    $("#gridHocSinhNgoaiLopHocBu").kendoGrid({
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
                    $.each(lstHocSinhTrongLopHocBu, function (index, item) {
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
                        lstHocSinhTrongLopHocBu.push({
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
                        lstHocSinhTrongLopHocBu.splice(existedindex, 1);
                    }
                }
            });

            var dataSource = new kendo.data.DataSource({
                data: lstHocSinhTrongLopHocBu,
                schema: {
                    model: {
                        id: "ID"
                    }
                },
                pageSize: 20,
            });
            $("#gridHocSinhTrongLopHocBu").data("kendoGrid").setDataSource(dataSource);
        },
        dataBound: function (e) {
            var grid = e.sender;
            var items = grid.items();
            var itemsToSelect = [];
            items.each(function (idx, row) {
                var IDHocSinh = grid.dataItem(row).get("ID");
                var existedindex = lstHocSinhTrongLopHocBu.findIndex(x => x.ID == IDHocSinh);
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

    LoadGridData();
    createGridLichHoc();
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

function ThemMoi() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('0');
    LoadGridLichHoc(0);
    if ($(window).width() > 800) {
        $("#windowLopHocBu").data("kendoWindow").center().open();
    } else {
        $("#windowLopHocBu").data("kendoWindow").center().maximize().open();
    }
}


function openChiTietLop(id) {
    $("#windowChitiet").data("kendoWindow").open().maximize();
    lstHocSinhTrongLop = [];
    LoadHocSinhTrongLop(id);
}

function openChiTietLopHocBu(id) {
    $("#windowChitietLopHocBu").data("kendoWindow").open().maximize();
    $("#gridHocSinhNgoaiLopHocBu").data("kendoGrid").clearSelection();
    lstHocSinhTrongLopHocBu = [];
    LoadHocSinhTrongLopHocBu(id);
    $("#IDLop").val(id);
}




function LoadGridData() {
    $.ajax({
        url: '/Lop/GetByGiaoVien',
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

function LoadHocSinhTrongLop(id) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhTrongLop"), true);
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
            pageSize: 20,
        });
        $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinhTrongLop"), false);
    });
}

function openBaiKiemTra(id) {
    $("#ID_HocSinh").val(id);
    LoadDSBKT();
    $("#windowBaiKiemTra").data("kendoWindow").maximize().open();
}

function ThemBaiKiemTra() {
    HuyBKT();
    $("#windowThemBKT").data("kendoWindow").center().open();
}

function LoadDSBKT() {
    var html = '<div class="itemBKT">'
        + '<div class="addnewfoler" onclick="ThemBaiKiemTra()"></div>'
        + '<label class="BKTname">Tạo bài kiểm tra mới</label>'
        + '</div>'
    $.ajax({
        url: '/BaiKiemTra/GetBaiKiemTraByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            html += '<div class="itemBKT">'
                + '<div class="folericon">'
                + '<button onclick="SuaBKT(' + item.ID + ',\'' + item.TenBaiKiemTra + '\')" class="k-button   BKTbtnedit" title="Sửa tên bài kiểm tra"><i class="fa fa-pencil"></i></button>'
                + '<button onclick="XemBKT(' + item.ID + ')" class="k-button BKTbtnedit" title="Xem ảnh bài kiểm tra"><i class="fa fa-eye"></i></button>'
                + '<button onclick="DeleteBKT(' + item.ID + ')" class="k-button BKTbtnedit" title="Xóa bài kiểm tra"><i class="fa fa-trash"></i></button>'
                + '</div>'
                + '<label class="BKTname">' + item.TenBaiKiemTra + '</label>'
                + '</div>'
        })
        $("#lstBaiKiemTra").html(html);
    });
}

function LuuBKT() {
    var validten = SetValidate("TenBKT");
    if (validten) {
        $.ajax({
            url: '/BaiKiemTra/ThemBaiKiemTra',
            type: 'POST',
            data: {
                ID: $("#ID_BaiKiemTra").val(),
                ID_HocSinh: $("#ID_HocSinh").val(),
                TenBaiKiemTra: $("#TenBKT").val()
            }
        }).done(function successCallback(response) {

            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyBKT();
                LoadDSBKT();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function SuaBKT(id, ten) {
    $("#ID_BaiKiemTra").val(id);
    $("#TenBKT").val(ten);
    $("#windowThemBKT").data("kendoWindow").center().open();
}

function HuyBKT() {
    $("#ID_BaiKiemTra").val("");
    $("#TenBKT").val("");
    $("#windowThemBKT").data("kendoWindow").close();
}

function XemBKT(ID) {
    $("#ID_BaiKiemTra").val(ID);
    var html = "";
    $.ajax({
        url: '/BaiKiemTra/GetBaiKiemTraByID?ID=' + ID,
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.lstAnh) {
            $.each(response.lstAnh, function (index, item) {
                html += '<div class="photo" style="background-image: url(../Images/BaiKiemTra/' + item.DuongDan + ')" data-role="page">'
                    + '<button type="button" onclick="DeleteImage(' + item.ID + ')" class="k-button k-upload-action BKTremovebtn" aria-label="">'
                    + '<span class="k-icon k-i-close k-i-x" title=""></span>'
                    + '</button>'
                    + '</div>'
            })

            $("#scrollView").html(html);
            if ($("#scrollView").data("kendoMobileScrollView")) {
                $("#scrollView").data("kendoMobileScrollView").destroy();
            }
            $("#scrollView").kendoMobileScrollView({
                enablePager: true,
                contentHeight: "100%"
            });
        }

    });
}

function DeleteBKT(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa bài kiểm tra?</b>", function () { XoaBKT(ID); }, function () { });
}

function XoaBKT(ID) {
    $.ajax({
        url: '/BaiKiemTra/XoaBaiKiemTra?ID=' + ID,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            LoadDSBKT();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function DeleteImage(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa ảnh?</b>", function () { XoaImage(ID); }, function () { });
}

function XoaImage(ID) {
    $.ajax({
        url: '/BaiKiemTra/XoaAnh?ID=' + ID,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            XemBKT($("#ID_BaiKiemTra").val());
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function PushFormDataFile(file, id_baikiemtra) {
    var data = new FormData();
    data.append("ID_BaiKiemTra", id_baikiemtra);
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/BaiKiemTra/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            XemBKT(id_baikiemtra);
            $("#fileBKT").data("kendoUpload").clearAllFiles();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }

    });
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

function openOnline(ID_GiaoVien,ID_Lop, RoomID) {
    window.location.href = "/LiveClass/RoomGV?RoomID=" + RoomID + "&ID_Lop=" + ID_Lop + "&ID_HocSinh=" + ID_GiaoVien
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

function Luu() {
    var validten = SetValidate("TenLop");
    var valid = validten;
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
            LichHoc: "",
            SoDoLop: "",
            lstLichHoc: lstLichHoc
        }
        //data.append("model", JSON.stringify(model));
        //if (file) {
        //    data.append('file', file.rawFile, filename);
        //}
        $.ajax({
            url: '/Lop/CreateOrUpdateByGiaoVien',
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
    $("#windowLopHocBu").data("kendoWindow").close();
}

function LoadHocSinhTrongLopHocBu(id) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhTrongLopHocBu"), true);
        lstHocSinhTrongLopHocBu = response;
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
            pageSize: 20,
        });
        $("#gridHocSinhTrongLopHocBu").data("kendoGrid").setDataSource(dataSource);
        LoadHocSinhNgoaiLopHocBu(id);
        kendo.ui.progress($("#gridHocSinhTrongLopHocBu"), false);
    });
}

function LoadHocSinhNgoaiLopHocBu(id) {
    $.ajax({
        url: '/HocSinh/GetByGiaoVien_NgoaiLop?ID_Lop=' + id,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridHocSinhNgoaiLopHocBu"), true);
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
            pageSize: 20,
        });
        $("#gridHocSinhNgoaiLopHocBu").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinhNgoaiLopHocBu"), false);
    });
}

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        if (selectedItem.ID_NhanVien > 0) {
            if ($(window).width() > 800) {
                $("#windowLopHocBu").data("kendoWindow").center().open();
            } else {
                $("#windowLopHocBu").data("kendoWindow").center().maximize().open();
            }
            $("#ID").val(selectedItem.ID);
            $("#TenLop").val(selectedItem.TenLop);
            LoadGridLichHoc(selectedItem.ID);
        } else {
            openDialog($("#dialogRoot").data("kendoDialog"), "Không thể sửa lớp do bộ phận văn phòng tạo, giáo viên chỉ có thể sửa lớp bồi dưỡng do chính giáo viên đó tạo!");
        }
    }
}

function LuuChiTietLop() {
    $.ajax({
        url: '/Lop/ThemHocSinhVaoLop',
        type: 'POST',
        data: {
            ID_Lop: $("#IDLop").val(),
            lstHocSinh: lstHocSinhTrongLopHocBu
        }
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            HuyChiTietLop();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function HuyChiTietLop() {
    $("#windowChitietLopHocBu").data("kendoWindow").close();
    $("#IDLop").val(0);
}