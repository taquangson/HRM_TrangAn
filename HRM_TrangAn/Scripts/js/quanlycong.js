
$(document).ready(function () {
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })
    $("#window").kendoWindow({
        width: "800px",
        height: "695px",
        title: "Chi tiết",
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

    $("#uploadfile").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải tệp đính kèm',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            //PushFormDataFile(e.files[0], $("#ID_BaiKiemTra").val());
        }
    });

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 199;
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
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                },
            },
            {
                field: "GiamSat",
                title: "Người giám sát",
                //template: function (e) {
                //    if (e.ID_TrangThai == 1) {
                //        return "<span style='color:red'>" + e.TrangThai + "</span>";
                //    } else if (e.ID_TrangThai == 2) {
                //        return "<span style='color:blue'>" + e.TrangThai + "</span>";
                //    } else {
                //        return "<span style='color:green'>" + e.TrangThai + "</span>";
                //    }
                //},
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
                field: "TongSoCong",
                title: "Tổng số công",
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
                    class:"text-center"
                }
            },
            {
                field: "GhiChu",
                title: "Ghi chú",
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
                title: "",
                width: "150px",
                template: function (e) {
                    return "<a class='k-button bg-blue text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-pencil'> </i> Sửa </a>"
                        + "<a class='k-button bg-red text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-trash'> </i> Xóa </a>";
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

    $("#gridChamCong").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [
                {
                    CongViec: "Dọn vệ sinh",
                    SoCong: "1",
                    GhiChu: ""
                },
                {
                    CongViec: "Làm vườn, cỏ",
                    SoCong: "2",
                    GhiChu: ""
                },
                {
                    CongViec: "Sửa chữa",
                    SoCong: "1.5",
                    GhiChu: ""
                }],
            //data: response,
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
        }),
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
                field:"ID",
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
                            e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='AddRowPhieuMua()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "CongViec",
                title: "Tên công việc",
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
                field: "SoCong",
                title: "Công lao động",
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
                    style: "text-align: center;",
                }
            },
            
            {
                field: "GhiChu",
                title: "Ghi chú",
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
                title: "",
                width: "150px",
                template: function (e) {
                    return "<a class='k-button bg-red text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-trash'> </i> Xóa </a>";
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

    $("#GioiTinh").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true,
        delay: 500,
        dataSource: new kendo.data.DataSource({
            data: [{ text: "Nam", value: 1 }, { text: 'Nữ', value: 0 }],
        })
    });

    $("#NgaySinh").kendoDatePicker({
        value: new Date(),
        format: "dd/MM/yyyy"
    });

    LoadDanhMucTruongHoc();


})

function LoadDanhMucTruongHoc() {
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMuc',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
            TenBang: "DanhMucTruong"
        })
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        if ($("#TruongHoc").data("kendoComboBox") == undefined) {
            $("#TruongHoc").kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                filter: "contains",
                suggest: true,
                delay: 1000,
                dataSource: dataSource
            })
        } else {
            $("#TruongHoc").data("kendoComboBox").setDataSource(dataSource);
        }
    });
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
        var selectedItem = $("#grid").data("kendoGrid").dataItem($("#grid").data("kendoGrid").select());
        $("#ID").val(selectedItem.ID);
        $("#TenHocSinh").val(selectedItem.TenHocSinh);
        $("#DiaChi").val(selectedItem.DiaChi);
        $("#DienThoai1").val(selectedItem.DienThoai1);
        $("#DienThoai2").val(selectedItem.DienThoai2);
        $("#DienThoai3").val(selectedItem.DienThoai3);
        $("#PhuHuynh").val(selectedItem.PhuHuynh);
        $("#TruongHoc").data("kendoComboBox").value(selectedItem.ID_Truong);
        $("#GioiTinh").data("kendoComboBox").value(selectedItem.GioiTinh);
        $("#NgaySinh").data("kendoDatePicker").value(toDate(selectedItem.NgaySinh));
    }

}

function toDate(value) {
    var dateRegExp = /^\/Date\((.*?)\)\/$/;
    var date = dateRegExp.exec(value);
    return new Date(parseInt(date[1]));
}


function LoadGridData() {
    //$.ajax({
    //    url: '/HocSinh/GetAll',
    //    type: 'GET',
    //}).done(function successCallback(response) {
    //    kendo.ui.progress($("#grid"), true);
    var dataSource = new kendo.data.DataSource({
        data: [
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10102",
                TenNhanVien: "Nguyễn Văn Vịnh",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Hoàn thành",
                GhiChu: "Đã chấm đủ điểm",
                TongSoCong: 3
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10103",
                TenNhanVien: "Trần Thành Đạt",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Chưa hoàn thành",
                GhiChu: "Chưa chấm đủ điểm",
                TongSoCong: 1
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10104",
                TenNhanVien: "Đào Bá Tô",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Hoàn thành",
                GhiChu: "Đã chấm đủ điểm",
                TongSoCong: 3
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10105",
                TenNhanVien: "Nguyễn Văn Vỹ",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Hoàn thành",
                GhiChu: "Thời gian chưa đủ 90 phút",
                TongSoCong: 2
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10106",
                TenNhanVien: "Đinh Huy Hùng",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Chưa hoàn thành",
                GhiChu: "Chưa chấm đủ điểm",
                TongSoCong: 1
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10107",
                TenNhanVien: "Phạm Hà Linh",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Chưa hoàn thành",
                GhiChu: "Thời gian chưa đủ 90 phút",
                TongSoCong: 2
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10108",
                TenNhanVien: "Vũ Ngọc Anh",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Chưa hoàn thành",
                GhiChu: "Thời gian chưa đủ 90 phút",
                TongSoCong: 2
            },
            {
                Ngay: "04-05-2021",
                MaNhanVien: "10109",
                TenNhanVien: "Đào Ngọc Hải",
                NguoiGiamSat: "Nguyễn Văn Vịnh",
                TrangThai: "Chưa hoàn thành",
                GhiChu: "Chưa chấm đủ điểm",
                TongSoCong: 1
            }],
        //data: response,
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
    $("#grid").data("kendoGrid").setDataSource(dataSource);
    //kendo.ui.progress($("#grid"), false);
    //});
}

function ThemMoi() {
    //document.getElementById("formChiTiet").reset();
    //$("#ID").val('');
    //if ($(window).width() > 800) {
    $("#window").data("kendoWindow").center().open();
    //} else {
    //    $("#window").data("kendoWindow").center().maximize().open();
    //}
}

function Luu() {
    var validten = SetValidate("TenHocSinh");
    var validdienthoai = SetValidate("DienThoai1");
    var valid = validten && validdienthoai;
    if (valid) {
        $.ajax({
            url: '/HocSinh/CreateOrUpdate',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenHocSinh: $("#TenHocSinh").val(),
                DiaChi: $("#DiaChi").val(),
                PhuHuynh: $("#PhuHuynh").val(),
                DienThoai1: $("#DienThoai1").val(),
                DienThoai2: $("#DienThoai2").val(),
                DienThoai3: $("#DienThoai3").val(),
                DienThoaiMacDinh: $("#DienThoai1").val(),
                ID_Truong: $("#TruongHoc").data("kendoComboBox").value(),
                GioiTinh: $("#GioiTinh").data("kendoComboBox").value(),
                NgaySinh: kendo.toString($("#NgaySinh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss')
            }
        }).done(function successCallback(response) {

            if (response.status) {
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

function OpenDanhMucTruongHoc() {
    var windowOption = {
        width: "50%",
        height: "50%",
        title: "Thêm danh mục trường học"
    }
    OpenLayoutWindow('/DanhMuc/DanhMucTruongHoc', windowOption);
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " học sinh?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/HocSinh/Delete?ID=' + ids.join(','),
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

function XuatExcel() {
    var grid = $('#grid').data('kendoGrid');

    grid.options.excel = {
        fileName: "Danh_Sach_Hoc_Sinh.xlsx",
        filterable: true,
        allPages: true
    }
    grid.saveHRM_TrangAnxcel();
}
