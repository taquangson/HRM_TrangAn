$(".main_container").hide();
var TuNgay = '', DenNgay = '', Nam = new Date().getFullYear(), Thang = 0, Quy = 0, CauHinh = [];
$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 180;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        editable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function (e) {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            console.log(e.items);
            $.each(e.items, function (index, item) {
                item.STT = ++record;
                try {
                    item.ThuongCongCauHinh = CauHinh.filter(function (ch) { return ch.TuSo <= item.STT && item.STT <= ch.DenSo })[0].ThuongCong;
                    item.ThuongTienCauHinh = CauHinh.filter(function (ch) { return ch.TuSo <= item.STT && item.STT <= ch.DenSo })[0].ThuongTien;
                } catch {
                    item.ThuongCongCauHinh = 0;
                    item.ThuongTienCauHinh = 0;
                }
            })
        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách thưởng";
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
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                title: "STT",
                field: "STT",
                filterable: false,
                //template: "#= ++record #",
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
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                field: "LuotDanhGia",
                title: "Số lượt đánh giá",
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
                field: "DiemDanhGia",
                title: "Điểm TB",
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
                field: "ThuongCongCauHinh",
                title: "Thưởng công",
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
            },
            {
                field: "ThuongCong",
                title: "Thưởng công (thực tế)",
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
                field: "ThuongTienCauHinh",
                title: "Thưởng tiền",
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
            },
            {
                field: "ThuongTien",
                title: "Thưởng tiền (thực tế)",
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
                title: "",
                width: "100px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align:center"
                },
                template: function (e) {
                    return "<button class='k-button text-center' onclick='luuThuong(" + e.ID + ")'><i class='fa fa-check'/> Xác nhận thưởng</button>";
                }
            }
        ]

    });

    //LoadGridData();
    LoadDataConfig();
    LoadCombo();

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

    $(".main_container").show();
})


function LoadGridData() {
    CalcNgay();
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/NhanVien/GetAllThuongLaiDo"
            + "?ID_ToNhom=" + $("#comboToNhom").data("kendoComboBox").value()
            + "&Nam=" + Nam
            + "&Quy=" + Quy
            + "&Thang=" + Thang
            + "&From=" + TuNgay
            + "&To=" + DenNgay,
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        TenDayDu: { type: 'text', editable: false },
                        MaNhanVien: { type: 'text', editable: false },
                        LuotDanhGia: { type: 'number', editable: false },
                        DiemDanhGia: { type: 'number', editable: false },
                        ThuongCong: { type: 'number', editable: true },
                        ThuongTien: { type: 'number', editable: true }
                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function LoadDataConfig() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: "/NhanVien/GetAll_CauHinhThuongDanhGia",
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        CauHinh = response;
    });
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
    $("#showQuyThang").hide();
    $("#comboLoai").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: "Thưởng năm", value: 1 },
                { text: "Thưởng quý", value: 2 },
                { text: "Thưởng tháng", value: 3 },
            ]
        }),
        change: function (e) {
            item = e.sender.value();
            Nam = $("#comboNam").data("kendoComboBox").value();
            Quy = $("#comboQuy").data("kendoComboBox").value();
            Thang = $("#comboThang").data("kendoComboBox").value();
            if (item == 1) {
                $("#showQuyThang").hide();
                Thang = 0;
                Quy = 0
            } else if (item == 2) {
                $("#textthoigian").text("Quý")
                $("#showThang").hide();
                $("#showQuy").show();
                $("#showQuyThang").show();
                Thang = 0;
            } else if (item == 3) {
                $("#textthoigian").text("Tháng")
                $("#showQuy").hide();
                $("#showThang").show();
                $("#showQuyThang").show();
                Quy = 0;
            }
        },
        filter: "contains"
    });
    $("#comboLoai").data("kendoComboBox").value(1);

    var lstNam = [];
    for (var i = 0; i < 10; i++) {
        lstNam.push({ value: new Date().getFullYear() - 1 + i });
    }
    $("#comboNam").kendoComboBox({
        dataTextField: 'value',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: lstNam
        }),
        change: function (e) {
            Nam = e.sender.value();
        },
        filter: "contains"
    });
    $("#comboNam").data("kendoComboBox").value(new Date().getFullYear());
    var lstThang = [];
    for (var i = 1; i <= 12; i++) {
        lstThang.push({ value: i });
    }

    $("#comboThang").kendoComboBox({
        dataTextField: 'value',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: lstThang
        }),
        change: function (e) {
            Thang = e.sender.value();
        },
        filter: "contains"
    });

    $("#comboQuy").kendoComboBox({
        dataTextField: 'value',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [{
                value: 1
            }, {
                value: 2
            }, {
                value: 3
            }, {
                value: 4
            }]
        }),
        change: function (e) {
            Quy = e.sender.value();
        },
        filter: "contains"
    });
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
function CalcNgay() {
    var loai = $("#comboLoai").data("kendoComboBox").value();

    switch (loai) {
        case '1':
            TuNgay = Nam + '-01-01T00:00:00';
            DenNgay = Nam + '-12-31T23:59:59';
            break;
        case '2':
            if (Quy == '1') {
                TuNgay = Nam + '-01-01T00:00:00';
                DenNgay = Nam + '-03-31T23:59:59';
            }
            else if (Quy == '2') {
                TuNgay = Nam + '-04-01T00:00:00';
                DenNgay = Nam + '-06-30T23:59:59';
            }
            else if (Quy == '3') {
                TuNgay = Nam + '-07-01T00:00:00';
                DenNgay = Nam + '-09-30T23:59:59';
            }
            else if (Quy == '4') {
                TuNgay = Nam + '-10-01T00:00:00';
                DenNgay = Nam + '-12-31T23:59:59';
            }
            break;
        case '3':
            TuNgay = kendo.toString(new Date(Nam, Thang, 1), 'yyyy-MM-ddT00:00:00');
            DenNgay = kendo.toString(new Date(Nam, parseInt(Thang) + 1, 0), 'yyyy-MM-ddT23:59:59');
            break;
    }
    console.log(TuNgay);
    console.log(DenNgay);
}