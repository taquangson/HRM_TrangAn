$(document).ready(function () {
    var dataThang = [];
    dataThang.push({ text: "10/" + (new Date().getFullYear() - 1), value: "10/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "11/" + (new Date().getFullYear() - 1), value: "11/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "12/" + (new Date().getFullYear() - 1), value: "12/" + (new Date().getFullYear() - 1) });
    dataThang.push({ text: "1/" + new Date().getFullYear(), value: "1/" + new Date().getFullYear() });
    dataThang.push({ text: "2/" + new Date().getFullYear(), value: "2/" + new Date().getFullYear() });
    dataThang.push({ text: "3/" + new Date().getFullYear(), value: "3/" + new Date().getFullYear() });
    dataThang.push({ text: "4/" + new Date().getFullYear(), value: "4/" + new Date().getFullYear() });
    dataThang.push({ text: "5/" + new Date().getFullYear(), value: "5/" + new Date().getFullYear() });
    dataThang.push({ text: "6/" + new Date().getFullYear(), value: "6/" + new Date().getFullYear() });
    dataThang.push({ text: "7/" + new Date().getFullYear(), value: "7/" + new Date().getFullYear() });
    dataThang.push({ text: "8/" + new Date().getFullYear(), value: "8/" + new Date().getFullYear() });
    dataThang.push({ text: "9/" + new Date().getFullYear(), value: "9/" + new Date().getFullYear() });
    dataThang.push({ text: "10/" + new Date().getFullYear(), value: "10/" + new Date().getFullYear() });
    dataThang.push({ text: "11/" + new Date().getFullYear(), value: "11/" + new Date().getFullYear() });
    dataThang.push({ text: "12/" + new Date().getFullYear(), value: "12/" + new Date().getFullYear() });
    dataThang.push({ text: "1/" + (new Date().getFullYear() + 1), value: "1/" + (new Date().getFullYear() + 1) });
    dataThang.push({ text: "2/" + (new Date().getFullYear() + 1), value: "2/" + (new Date().getFullYear() + 1) });
    dataThang.push({ text: "3/" + (new Date().getFullYear() + 1), value: "3/" + (new Date().getFullYear() + 1) });
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridTimKiemHocSinh").kendoGrid({
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
        detailTemplate: kendo.template($("#template").html()),
        detailInit: detailInit,
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
                field: "NgaySinh",
                title: "Ngày sinh",
                template: function (e) {
                    var dateString = e.NgaySinh.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
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
                field: "DiaChi",
                title: "Địa chỉ",
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
                title: "Điện thoại liên hệ",
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
                title: "Lập phiếu",
                width: "200px",
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openLapPhieuThu(" + e.ID + ",\"" + e.TenHocSinh + "\")'><i class='fa fa-plus'> Lập phiếu </i></button>"
                        + "<button class='k-button k-success text-center' onclick='openLichSuPhieuThu(" + e.ID + ")'> <i class='fa fa-search'> Lịch sử thanh toán </i></button>";
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

    $("#windowLapPhieuThu").kendoWindow({
        title: "Lập hóa đơn",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function (e) {
            LoadGridDataTimKiemHocSinh();
        }
    })

    $("#windowLichSuPhieuThu").kendoWindow({
        title: "Lịch sử lập hóa đơn",
        visible: false,
        height: '400',
        width: '1100',
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function () {
            var dataSource = new kendo.data.DataSource({
                data: [],
                schema: {
                    model: {
                        id: "ID"
                    }
                }
            });
            $("#gridLichSuPhieuThu").data("kendoGrid").setDataSource(dataSource);
        }
    })

    $("#gridLichSuPhieuThu").kendoGrid({
        height: 380,
        dataBinding: function () {
            record = 0;
        },
        scrollable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
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
                title: "Mã hóa đơn",
                field: "MaPhieu",
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
                title: "Ngày lập hóa đơn",
                field: "NgayTao",
                template: function (e) {
                    var date = new Date(parseInt(e.NgayTao.replace("/Date(", "").replace(")/", ""), 10))
                    return e.NguoiLap + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                },
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
                title: "Chỉnh sửa lần cuối",
                field: "NguoiSuaCuoi",
                template: function (e) {
                    if (e.NguoiSuaCuoi == null) {
                        return "";
                    } else {
                        var date = new Date(parseInt(e.Last_Update_Time.replace("/Date(", "").replace(")/", ""), 10))
                        return e.NguoiSuaCuoi + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                    }
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "In lần cuối",
                field: "NguoiInCuoi",
                template: function (e) {
                    if (e.NguoiInCuoi == null) {
                        return "";
                    } else {
                        var date = new Date(parseInt(e.Last_Print_Time.replace("/Date(", "").replace(")/", ""), 10))
                        return e.NguoiInCuoi + " - " + kendo.toString(date, "dd/MM/yyyy HH:mm");
                    }
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
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                filterable: false,
                template: function (e) {
                    return "<button class='k-button k-success text-center' onclick='openSuaPhieuThu(" + e.ID + ")'><i class='fa fa-pencil'> Xem hóa đơn </i></button>"
                    //+ "<button class='k-button k-success text-center' onclick='openSuaPhieuThu(" + e.ID + ")'> <i class='fa fa-pencil'> Sửa hóa đơn </i></button>";
                },
                width: "110px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }

        ]
    })

    $("#gridPhieuMua").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        NamHoc: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                        HocDuoi: { type: 'number', editable: true },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLopHoc: { type: 'text', editablle: false },
                        GhiChu: { type: 'text', editablle: true },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = ($(window).height() - 250) / 2;
            return height;
        },
        scrollable: true,
        editable: true,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        save: function (e) {

            if (e.values.ID_LopHoc || e.values.TextThang) {
                try {
                    var vlthang = "0/0"
                    if (e.values.TextThang) {
                        vlthang = e.values.TextThang.text;
                        e.model.Thang = vlthang.split("/")[0];
                        e.model.NamHoc = vlthang.split("/")[1];
                    }
                    $.ajax({
                        url: '/LichHoc/GetLichHocByLop?ID_Lop=' + e.model.ID_LopHoc,
                        type: 'GET'
                    }).done(function (response) {
                        var lichhoc = [];
                        var chinhanh = 0;
                        $.each(response, function (index, item) {
                            lichhoc.push(item.Thu);
                            chinhanh = item.ID_ChiNhanh;
                        })
                        e.model.SoBuoi = TinhSoBuoiHoc(e.model.Thang, e.model.NamHoc, lichhoc);
                        if (chinhanh == 1) {
                            if (e.model.SoBuoi >= 7 && e.model.Thang > 0) {
                                e.model.DonGia = 400000;
                            } else if (e.model.SoBuoi < 7 && e.model.Thang > 0) {
                                e.model.DonGia = 200000;
                            }
                        } else if (chinhanh == 2) {
                            e.model.DonGia = e.model.SoBuoi * 30000;
                        }
                        setTimeout(function () {
                            e.sender.refresh();
                            e.sender.dataSource.fetch(function () {
                                var results = e.sender.dataSource.aggregates().DonGia;
                                CalcTongTien();
                            });
                        })
                    })
                } catch (ex) {
                    e.sender.refresh();
                }
            } else {
                e.sender.dataSource.fetch(function () {
                    setTimeout(function () {
                        CalcTongTien();
                    })
                });
            }

        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowPhieuMua(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='AddRowPhieuMua()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ID_LopHoc",
                title: "Môn học",
                template: function (e) {
                    if (e.ID_LopHoc > 0) {
                        return e.TenLopHoc
                    } else {
                        return "";
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenLop',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/Lop/GetAllByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
                                }
                            },
                        }),
                        change: function (e) {
                            options.model.TenLopHoc = e.sender.text();
                        },
                    })
                },
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
                field: "TextThang",
                title: "Tháng",
                template: function (e) {
                    if (e.Thang > 0 && e.NamHoc > 0) {
                        return "Tháng " + e.Thang + "/" + e.NamHoc
                    } else {
                        return ""
                    }
                },
                attributes: {
                    class: "text-center"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "text",
                        dataValueField: "value",
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            data: dataThang
                        }),
                    })
                },
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
                }
            },
            {
                title: "Số buổi",
                field: "SoBuoi",
                width: "70px",
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Loại phiếu",
                field: "HocDuoi",
                template: function (e) {
                    if (e.HocDuoi > 0) {
                        return "Học đuổi"
                    } else {
                        return "Học chính";
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "text",
                        dataValueField: "value",
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            data: [{ text: "Học chính", value: 0 },
                            { text: "Học đuổi", value: 1 }
                            ]
                        }),
                    })
                },
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
                }
            },
            {
                title: "Đơn giá",
                field: "DonGia",
                format: "{0:n1}",
                footerTemplate: "<div>Tổng: #=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                width: "70px",
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
                title: "Ghi chú",
                field: "GhiChu",
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
    })

    $("#gridGiamTru").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        LyDo: { type: 'text', editablle: false },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        Nam: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLopHoc: { type: 'text', editablle: false },
                        ID_PhieuHoc: { type: 'number', editablle: false }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = ($(window).height() - 220) / 2;
            return height;
        },
        scrollable: true,
        sortable: true,
        editable: true,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        save: function (e) {
            if (e.values.TextThang) {
                var vlthang = e.values.TextThang.text;
                e.model.Thang = vlthang.split("/")[0];
                e.model.Nam = vlthang.split("/")[1];
                console.log(e);
            }
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                    CalcTongTien();
                });
            })
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowGiamTru(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='AddRowGiamTru()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ID_LopHoc",
                title: "Môn học",
                template: function (e) {
                    if (e.ID_LopHoc > 0) {
                        return e.TenLopHoc
                    } else {
                        return "";
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenLop',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/Lop/GetAllByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
                                }
                            },
                        }),
                        change: function (e) {
                            options.model.TenLopHoc = e.sender.text();
                        },
                    })
                },
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
                field: "TextThang",
                template: function (e) {
                    if (e.Thang > 0 && e.Nam > 0) {
                        return "Tháng " + e.Thang + "/" + e.Nam
                    } else {
                        return ""
                    }
                },
                title: "Tháng",
                attributes: {
                    class: "text-center"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "text",
                        dataValueField: "value",
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            data: dataThang
                        }),
                    })
                },
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
                }
            },
            {
                title: "Số buổi",
                field: "SoBuoi",
                width: "70px",
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Đơn giá",
                field: "DonGia",
                format: "{0:n1}",
                footerTemplate: "<div>Tổng: #=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                width: "70px",
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
                field: "LyDo",
                title: "Lý do giảm trừ",
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
            }

        ]
    })

    $("#gridPhuThu").kendoGrid({
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        LyDo: { type: 'text', editablle: false },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        Nam: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLopHoc: { type: 'text', editablle: false },
                        ID_PhieuHoc: { type: 'number', editablle: false }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }),
        height: function () {
            var height = ($(window).height() - 220) / 2;
            return height;
        },
        scrollable: true,
        sortable: true,
        editable: true,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        save: function (e) {
            if (e.values.TextThang) {
                var vlthang = e.values.TextThang.text;
                e.model.Thang = vlthang.split("/")[0];
                e.model.Nam = vlthang.split("/")[1];
            }
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                    CalcTongTien();
                });
            })
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='DeleteRowPhuThu(\"" + e.uid + "\")' style='color:red' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm buổi học' style='width:100%; height:25px;' onclick='AddRowPhuThu()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                field: "ID_LopHoc",
                title: "Môn học",
                template: function (e) {
                    if (e.ID_LopHoc > 0) {
                        return e.TenLopHoc
                    } else {
                        return "";
                    }
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: 'TenLop',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            transport: {
                                read: {
                                    url: '/Lop/GetAllByHocSinh?ID_HocSinh=' + $("#ID_HocSinh").val(),
                                }
                            },
                        }),
                        change: function (e) {
                            options.model.TenLopHoc = e.sender.text();
                        },
                    })
                },
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
                field: "TextThang",
                title: "Tháng",
                template: function (e) {
                    if (e.Thang > 0 && e.Nam > 0) {
                        return "Tháng " + e.Thang + "/" + e.Nam
                    } else {
                        return ""
                    }
                },
                attributes: {
                    class: "text-center"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoComboBox({
                        dataTextField: "text",
                        dataValueField: "value",
                        autoBind: false,
                        dataSource: new kendo.data.DataSource({
                            data: dataThang
                        }),
                    })
                },
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
                }
            },
            {
                title: "Số buổi",
                field: "SoBuoi",
                width: "70px",
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
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: "Đơn giá",
                field: "DonGia",
                format: "{0:n1}",
                footerTemplate: "<div>Tổng: #=kendo.toString(sum,'n0')#</div>",
                aggregates: ["sum"],
                attributes: {
                    class: "text-right"
                },
                editor: function (container, options) {
                    $('<input required name="' + options.field + '"/>').appendTo(container).kendoNumericTextBox({
                        format: "n0"
                    })
                },
                width: "70px",
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
                field: "LyDo",
                title: "Lý do phụ thu",
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
            }

        ]
    })

    $("#gridBuoiHocThangTruoc").kendoGrid({
        height: function () {
            var height = ($(window).height() - 220) / 2;
            return height;
        },
        dataBinding: function (e) {
            $.each(e.items, function (index, i) {
                i.SoBuoiTheoLich = TinhSoBuoiHoc(i.Thang, i.Nam, i.LichHoc);
            })
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        scrollable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        rowTemplate: kendo.template($("#rowTemplate").html()),
        altRowTemplate: kendo.template($("#rowTemplate").html()),
        persistSelection: true,
        sortable: true,
        autoFitColumn: true,
        resizable: true,
        columns: [
            {
                title: "Tên lớp",
                field: "TenLop",
                attributes: {
                    class: "text-right"
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
                title: "Tháng",
                field: "Thang",
                template: function (e) {
                    if (e.Thang != null) {
                        return e.Thang + "/" + e.Nam;
                    } else {
                        return "";
                    }
                },
                width: "70px",
                attributes: {
                    class: "text-right"
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
                title: "Đã học/ đã mua",
                attributes: {
                    class: "text-center"
                },
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
                }
            },
            {
                title: "Lịch học (buổi)",
                field: "SoBuoiTheoLich",
                attributes: {
                    class: "text-center"
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
                }
            }
        ]
    })

    $("#gridPhieuThangTruoc").kendoGrid({
        height: function () {
            var height = ($(window).height() - 250) / 2;
            return height;
        },
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        scrollable: true,
        sortable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        columns: [
            {
                title: "Tên lớp",
                field: "TenLop",
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
                }
            },
            {
                title: "Số buổi",
                field: "SoBuoi",
                attributes: {
                    class: "text-right"
                },
                width: "60px",
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
            //{
            //    title: "Đã học",
            //    field: "SoBuoiDaHoc",
            //    attributes: {
            //        class: "text-right"
            //    },
            //    width: "80px",
            //    filterable: {
            //        cell: {
            //            operator: "contains",
            //            showOperators: false,
            //            template: function (e) {
            //                e.element.addClass("k-textbox").css("width", "100%")
            //            }
            //        }
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    }
            //},
            {
                title: "Ngày mua",
                field: "NgayTao",
                template: function (e) {
                    var date = new Date(parseInt(e.NgayTao.replace("/Date(", "").replace(")/", ""), 10))
                    return kendo.toString(date, "dd/MM/yyyy");
                },
                width: "75px",
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
                title: "Người nhập phiếu",
                field: "TenNhanVien",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                width: "140px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                }
            }

        ]
    })

    $("#KhachDua").kendoNumericTextBox({
        format: "n0",
        change: CalcTongTien
    })
    $("#HinhThuc").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tiền mặt', value: 0 },
                { text: 'Chuyển khoản', value: 1 }
            ]
        })
    })
    LoadGridDataTimKiemHocSinh();
})

function detailInit(e) {
    var detailRow = e.detailRow;
    var idhocsinh = e.data.ID;
    $.ajax({
        url: '/PhieuHoc/GetAllByHocSinh_Thang?ID_HocSinh=' + idhocsinh + "&Thang=" + (new Date().getMonth() + 1),
        type: 'GET',
    }).done(function successCallback(response) {
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
            pageSize: 100,
        });
        detailRow.find(".orders").kendoGrid({
            dataSource: dataSource,
            persistSelection: true,
            resizable: true,
            //pageable: pageableShort,
            sortable: false,
            filterable: false,
            scrollable: true,
            columns: [
                {
                    field: "TenLop",
                    title: "Môn học",
                    width: "150px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "SoBuoi",
                    title: "Số buổi",
                    width: "80px",
                    attributes: {
                        class: "text-center"
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "HocDuoi",
                    title: "Loại phiếu",
                    template: function (e) {
                        if (e.HocDuoi == 0) {
                            return "Học chính"
                        } else if (e.HocDuoi == 1) {
                            return "Học đuổi"
                        } else {
                            return "";
                        }
                    },
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "NgayTao",
                    title: "Ngày mua",
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    template: function (e) {
                        var dateString = e.NgayTao.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        if (currentTime.getFullYear() != 1) {
                            return kendo.toString(currentTime, "dd/MM/yyyy");
                        } else {
                            return "";
                        }
                    },
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "TenNhanVien",
                    title: "Người bán",
                    attributes: {
                        class: "text-center"
                    },
                    width: "180px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "GhiChu",
                    title: "Ghi chú",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "ID",
                    title: "Trạng thái",
                    template: function (e) {
                        if (e.ID > 0) {
                            return "<b style='height:50px;width:100%;text-align:center;color:green'>Đã mua phiếu<b>";
                        } else {
                            return "<b style='height:50px;width:100%;text-align:center;color:red'>Chưa mua phiếu<b>";
                        }
                    },
                    attributes: {
                        class: "text-center"
                    },
                    width: "120px",
                    headerAttributes: {
                        style: "text-align: center; font-size: 10px; font-weight:bold",
                        class: "table-header-cell"
                    }
                }
            ]
        })
    })
}

function LoadGridDataTimKiemHocSinh() {
    $.ajax({
        url: '/HocSinh/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridTimKiemHocSinh"), true);
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
        $("#gridTimKiemHocSinh").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridTimKiemHocSinh"), false);
    });
}

function openLapPhieuThu(id, ten) {
    $("#windowLapPhieuThu").data("kendoWindow").maximize().open();
    $("#TenHocSinh").val(ten);
    $("#ID_HocSinh").val(id);
    $("#ID_PhieuThu").val(0);
    $("#TongTien").val(0);
    $("#KhachDua").val(0);
    $("#HinhThuc").data("kendoComboBox").value(0);
    $("#TraLai").val(0);
    kendo.ui.progress($("#windowLapPhieuThu"), true);
    ClearInputGrid();
    LoadGridThongKePhieuCu(id);
    LoadGridThongKeSoBuoiHocThangTruoc(id);
    LoadGridLichSuTamTinh(id);
}

function LoadPhuThuGiamTru() {
    if ($("#ID_PhieuThu").val() == 0) {
        var dataBuoiHoc = $("#gridBuoiHocThangTruoc").data("kendoGrid").dataSource.data();
        var dtphuthu = [];
        var dtgiamtru = [];
        $.each(dataBuoiHoc, function (index, item) {
            if (item.SoBuoiHoc > item.SoBuoiDaMua) {
                dtphuthu.push({
                    ID: 0,
                    LyDo: (item.SoBuoiHoc - item.SoBuoiDaMua) + " buổi " + item.TenLop + " tháng " + item.Thang,
                    DonGia: 0,
                    Thang: item.Thang,
                    ThangText: "Tháng " + item.Thang + "/" + item.Nam,
                    Nam: item.Nam,
                    SoBuoi: item.SoBuoiHoc - item.SoBuoiDaMua,
                    ID_LopHoc: item.ID_LopHoc,
                    TenLopHoc: item.TenLop,
                    ID_PhieuHoc: item.ID_PhieuHoc
                });
            } else if (item.SoBuoiHoc < item.SoBuoiDaMua) {
                dtgiamtru.push({
                    ID: 0,
                    LyDo: ((item.SoBuoiHoc - item.SoBuoiDaMua) * -1) + " buổi " + item.TenLop + " tháng " + item.Thang,
                    DonGia: 0,
                    Thang: item.Thang,
                    ThangText: "Tháng " + item.Thang + "/" + item.Nam,
                    Nam: item.Nam,
                    SoBuoi: (item.SoBuoiHoc - item.SoBuoiDaMua) * -1,
                    ID_LopHoc: item.ID_LopHoc,
                    TenLopHoc: item.TenLop,
                    ID_PhieuHoc: item.ID_PhieuHoc
                });
            }
        });
        $("#gridGiamTru").data("kendoGrid").setDataSource(new kendo.data.DataSource({
            data: dtgiamtru,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        LyDo: { type: 'text', editablle: false },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        Nam: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLopHoc: { type: 'text', editablle: false },
                        ID_PhieuHoc: { type: 'number', editablle: false }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }));
        $("#gridPhuThu").data("kendoGrid").setDataSource(new kendo.data.DataSource({
            data: dtphuthu,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        LyDo: { type: 'text', editablle: false },
                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                        Thang: { type: 'number', editable: true },
                        ThangText: { type: 'string', editable: true },
                        Nam: { type: 'number', editable: true },
                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                        ID_LopHoc: { type: 'number', editablle: true },
                        TenLopHoc: { type: 'text', editablle: false },
                        ID_PhieuHoc: { type: 'number', editablle: false }
                    }
                }
            },
            aggregate: [{ field: "DonGia", aggregate: "sum" }],
            pageSize: 100
        }));
    }
}

function ClearInputGrid() {
    $("#gridPhieuMua").data("kendoGrid").setDataSource(new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    Thang: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    NamHoc: { type: 'number', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    HocDuoi: { type: 'number', editable: true },
                    ID_LopHoc: { type: 'number', editablle: true },
                    TenLopHoc: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    }));
    $("#gridGiamTru").data("kendoGrid").setDataSource(new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    LyDo: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                    Thang: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    Nam: { type: 'number', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    ID_LopHoc: { type: 'number', editablle: true },
                    ID_PhieuHoc: { type: 'number', editablle: false },
                    TenLopHoc: { type: 'text', editablle: false }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    }));
    $("#gridPhuThu").data("kendoGrid").setDataSource(new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    LyDo: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                    Thang: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    Nam: { type: 'number', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    ID_LopHoc: { type: 'number', editablle: true },
                    ID_PhieuHoc: { type: 'number', editablle: false },
                    TenLopHoc: { type: 'text', editablle: false }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    }));
}

function AddRowPhieuMua(e) {
    var grid = $("#gridPhieuMua").data("kendoGrid");
    grid.addRow();
}

function DeleteRowPhieuMua(uid) {
    var dataRow = $('#gridPhieuMua').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridPhieuMua').data("kendoGrid").dataSource.remove(dataRow);
}

function AddRowGiamTru(e) {
    var grid = $("#gridGiamTru").data("kendoGrid");
    grid.addRow();
}

function DeleteRowGiamTru(uid) {
    var dataRow = $('#gridGiamTru').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridGiamTru').data("kendoGrid").dataSource.remove(dataRow);
}

function AddRowPhuThu(e) {
    var grid = $("#gridPhuThu").data("kendoGrid");
    grid.addRow();
}

function DeleteRowPhuThu(uid) {
    var dataRow = $('#gridPhuThu').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridPhuThu').data("kendoGrid").dataSource.remove(dataRow);
}

function TinhSoBuoiHoc(month, year, lichhoc) {

    var count = 0;
    if (lichhoc.length > 0) {
        $.each(lichhoc, function (index, item) {
            var day = parseInt(item) - 1;
            count += countDayInMonth(day, (parseInt(month) - 1), year);
        })
    }
    return count;
}

function countDayInMonth(dayofweek, month, year) {
    var day, counter, date;
    day = 1;
    counter = 0;
    date = new Date(year, month, day);
    while (date.getMonth() === parseInt(month)) {
        if (date.getDay() === dayofweek) { // Sun=0, Mon=1, Tue=2, etc.
            counter += 1;
        }
        day += 1;
        date = new Date(year, month, day);
    }
    return counter;
}

function LoadGridThongKePhieuCu(id) {
    $.ajax({
        url: '/BaoCao/GetData_ThongKePhieuHocTheoHocSinh?ID_HocSinh=' + id
            + "&TuNgay=2019-01-01 00:00:00" + "&DenNgay=" + kendo.toString(new Date(), "yyyy-MM-dd") + " 23:59:00",
        type: 'GET',
    }).done(function successCallback(response) {
        if (typeof response == "string") {
            location.reload(true);
        }
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 100
        });

        $("#gridPhieuThangTruoc").data("kendoGrid").setDataSource(dataSource);
    });
}

function LoadGridThongKeSoBuoiHocThangTruoc(id) {
    $.ajax({
        url: '/BaoCao/GetData_ThongKeSoBuoiTheoHocSinhTheoThang?ID_HocSinh=' + id
            + "&TuNgay=2019-01-01 00:00:00" + "&DenNgay=" + kendo.toString(new Date(), "yyyy-MM-dd 23:59:59"),
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 100
        });

        $("#gridBuoiHocThangTruoc").data("kendoGrid").setDataSource(dataSource);
        LoadPhuThuGiamTru();
        setTimeout(function () {
            kendo.ui.progress($("#windowLapPhieuThu"), false);
        }, 500);
    });
}
function TaoPhieuThu() {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn tạo và in phiếu thu?</b>", function () { LuuPhieuThu(); }, function () { });
}

function InTamTinh() {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn tạo và in phiếu tạm tính?</b>", function () { InPhieuTamTinh(); }, function () { });
}

function LuuPhieuThu() {
    kendo.ui.progress($("#windowLapPhieuThu"), true);
    var lstPhieuHoc = [];
    var lstPhuThu = [];
    var lstGiamTru = [];
    var Tong = $("#gridPhieuMua").data("kendoGrid").dataSource.aggregates().DonGia.sum
        + $("#gridPhuThu").data("kendoGrid").dataSource.aggregates().DonGia.sum
        - $("#gridGiamTru").data("kendoGrid").dataSource.aggregates().DonGia.sum;

    $.each($("#gridPhieuMua").data("kendoGrid").dataSource.data(), function (index, item) {
        lstPhieuHoc.push({
            ID: item.ID,
            ID_HocSinh: $("#ID_HocSinh").val(),
            SoBuoi: item.SoBuoi,
            SoTien: item.DonGia,
            ID_Lop: item.ID_LopHoc,
            HocDuoi: item.HocDuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            NamHoc: item.NamHoc,
            GhiChu: item.GhiChu ? item.GhiChu : ""
        })
    })

    $.each($("#gridPhuThu").data("kendoGrid").dataSource.data(), function (index, item) {
        lstPhuThu.push({
            ID: item.ID,
            LyDo: item.LyDo,
            DonGia: item.DonGia,
            Type: 0,
            SoBuoi: item.SoBuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            ID_Lop: item.ID_LopHoc,
            Nam: item.Nam,
            ID_PhieuHoc: item.ID_PhieuHoc
        })
    })

    $.each($("#gridGiamTru").data("kendoGrid").dataSource.data(), function (index, item) {
        lstGiamTru.push({
            ID: item.ID,
            LyDo: item.LyDo,
            DonGia: item.DonGia,
            Type: 1,
            SoBuoi: item.SoBuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            ID_Lop: item.ID_LopHoc,
            Nam: item.Nam,
            ID_PhieuHoc: item.ID_PhieuHoc
        })
    })
    var data = {
        ID: $("#ID_PhieuThu").val(),
        ID_HocSinh: $("#ID_HocSinh").val(),
        lstPhieuHoc: lstPhieuHoc,
        lstPhuThu: lstPhuThu,
        lstGiamTru: lstGiamTru,
        TongThu: Tong,
        HinhThucThanhToan: $("#HinhThuc").data("kendoComboBox").value()
    }
    $.ajax({
        url: '/PhieuThu/CreateOrUpdate',
        type: 'POST',
        data: data
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            //HuyPhieuThu();
            $("#ID_PhieuThu").val(response.ID_Phieu)
            InPhieuThu();
            LoadGridLichSuMuaPhieu($("#ID_HocSinh").val());
            LoadGridDataTimKiemHocSinh();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
        kendo.ui.progress($("#windowLapPhieuThu"), false);
    });
}

function LuuTamTinh() {
    kendo.ui.progress($("#windowLapPhieuThu"), true);
    var lstPhieuHoc = [];
    var lstPhuThu = [];
    var lstGiamTru = [];
    var Tong = $("#gridPhieuMua").data("kendoGrid").dataSource.aggregates().DonGia.sum
        + $("#gridPhuThu").data("kendoGrid").dataSource.aggregates().DonGia.sum
        - $("#gridGiamTru").data("kendoGrid").dataSource.aggregates().DonGia.sum;

    $.each($("#gridPhieuMua").data("kendoGrid").dataSource.data(), function (index, item) {
        lstPhieuHoc.push({
            ID: item.ID,
            ID_HocSinh: $("#ID_HocSinh").val(),
            SoBuoi: item.SoBuoi,
            SoTien: item.DonGia,
            ID_Lop: item.ID_LopHoc,
            HocDuoi: item.HocDuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            NamHoc: item.NamHoc,
            GhiChu: item.GhiChu ? item.GhiChu : ""
        })
    })

    $.each($("#gridPhuThu").data("kendoGrid").dataSource.data(), function (index, item) {
        lstPhuThu.push({
            ID: item.ID,
            LyDo: item.LyDo,
            DonGia: item.DonGia,
            Type: 0,
            SoBuoi: item.SoBuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            ID_Lop: item.ID_LopHoc,
            Nam: item.Nam,
            ID_PhieuHoc: item.ID_PhieuHoc
        })
    })

    $.each($("#gridGiamTru").data("kendoGrid").dataSource.data(), function (index, item) {
        lstGiamTru.push({
            ID: item.ID,
            LyDo: item.LyDo,
            DonGia: item.DonGia,
            Type: 1,
            SoBuoi: item.SoBuoi,
            Thang: item.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            ID_Lop: item.ID_LopHoc,
            Nam: item.Nam,
            ID_PhieuHoc: item.ID_PhieuHoc
        })
    })
    var data = {
        ID: $("#ID_PhieuThu").val(),
        ID_HocSinh: $("#ID_HocSinh").val(),
        lstPhieuHoc: lstPhieuHoc,
        lstPhuThu: lstPhuThu,
        lstGiamTru: lstGiamTru,
        TongThu: Tong
    }
    $.ajax({
        url: '/PhieuThu/CreateOrUpdate_Temp',
        type: 'POST',
        data: data
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            LoadGridLichSuTamTinh($("#ID_HocSinh").val());
            $("#ID_PhieuThu").val(response.ID_Phieu)
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
        kendo.ui.progress($("#windowLapPhieuThu"), false);
    });
}

function HuyPhieuThu() {
    $("#windowLapPhieuThu").data("kendoWindow").close();
    $("#ID_HocSinh").val(0);
    $("#ID_PhieuThu").val(0);
    ClearInputGrid();
}

function openLichSuPhieuThu(id) {
    LoadGridLichSuMuaPhieu(id);
    $("#windowLichSuPhieuThu").data("kendoWindow").center().open();
}

function LoadGridLichSuMuaPhieu(ID_HocSinh) {
    $.ajax({
        url: '/PhieuThu/GetbyHocSinh?ID_HocSinh=' + ID_HocSinh,
        type: 'GET'
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            }
        });
        $("#gridLichSuPhieuThu").data("kendoGrid").setDataSource(dataSource);
    });
}

function LoadGridLichSuTamTinh(ID_HocSinh) {
    $.ajax({
        url: '/PhieuThu/GetTempbyHocSinh?ID_HocSinh=' + ID_HocSinh,
        type: 'GET'
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        if ($("#combotamtinh").data("kendoComboBox")) {
            $("#combotamtinh").data("kendoComboBox").setDataSource(dataSource);
            $("#combotamtinh").data("kendoComboBox").value(0);
        } else {
            $("#combotamtinh").kendoComboBox({
                dataTextField: 'NguoiLap',
                dataValueField: 'ID',
                autoBind: false,
                dataSource: dataSource,
                change: function (e) {
                    $.ajax({
                        url: '/PhieuThu/GetTempbyID?ID=' + e.sender.value(),
                        type: 'GET',
                    }).done(function successCallback(response) {
                        let item = response;
                        $("#ID_HocSinh").val(item.ID_HocSinh);
                        $("#ID_PhieuTamTinh").val(item.ID);
                        $("#TenHocSinh").val(item.TenHocSinh);
                        $("#TongTien").val(kendo.toString(item.TongThu, 'n0'));
                        var lstGiamTru = [];
                        var lstPhuThu = [];
                        var lstPhieuMua = [];
                        $("#TraLai").val(0);
                        $("#KhachDua").data("kendoNumericTextBox").value(0);
                        $("#HinhThuc").data("kendoComboBox").value(item.HinhThucThanhToan);
                        $.each(item.lstGiamTru, function (index, i) {
                            lstGiamTru.push({
                                DonGia: i.DonGia,
                                ID: 0,
                                ID_PhieuThu: i.ID_PhieuThu,
                                LyDo: i.LyDo,
                                Type: i.Type,
                                Thang: i.Thang,
                                Nam: i.Nam,
                                ThangText: "Tháng " + item.Thang + "/" + item.Nam,
                                SoBuoi: i.SoBuoi,
                                ID_LopHoc: i.ID_Lop,
                                TenLopHoc: i.TenLop,
                                ID_PhieuHoc: i.ID_PhieuHoc
                            })
                        })
                        $.each(item.lstPhuThu, function (index, i) {
                            lstPhuThu.push({
                                DonGia: i.DonGia,
                                ID: 0,
                                ID_PhieuThu: i.ID_PhieuThu,
                                LyDo: i.LyDo,
                                Type: i.Type,
                                Thang: i.Thang,
                                Nam: i.Nam,
                                ThangText: "Tháng " + item.Thang + "/" + item.Nam,
                                SoBuoi: i.SoBuoi,
                                ID_LopHoc: i.ID_Lop,
                                TenLopHoc: i.TenLop,
                                ID_PhieuHoc: i.ID_PhieuHoc
                            })
                        })
                        $.each(item.lstPhieuHoc, function (index, i) {
                            lstPhieuMua.push({
                                GhiChu: i.GhiChu,
                                HocDuoi: i.HocDuoi,
                                ID: 0,
                                ID_LopHoc: i.ID_Lop,
                                SoBuoi: i.SoBuoi,
                                DonGia: i.SoTien,
                                TenLopHoc: i.TenLop,
                                Thang: i.Thang,
                                ThangText: "Tháng " + item.Thang + "/" + item.Nam,
                                NamHoc: i.NamHoc
                            })
                        })

                        var dtphuthu = new kendo.data.DataSource({
                            data: lstPhuThu,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        ID: { type: 'number', editable: false },
                                        LyDo: { type: 'text', editablle: false },
                                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                                        Thang: { type: 'number', editable: true },
                                        ThangText: { type: 'string', editable: true },
                                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                                        ID_LopHoc: { type: 'number', editablle: true },
                                        TenLopHoc: { type: 'text', editablle: false },
                                        ID_PhieuHoc: { type: 'number', editablle: false }
                                    }
                                }
                            },
                            aggregate: [{ field: "DonGia", aggregate: "sum" }],
                            pageSize: 100
                        });

                        var dtgiamtru = new kendo.data.DataSource({
                            data: lstGiamTru,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        ID: { type: 'number', editable: false },
                                        LyDo: { type: 'text', editablle: false },
                                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                                        Thang: { type: 'number', editable: true },
                                        Nam: { type: 'number', editable: true },
                                        ThangText: { type: 'string', editable: true },
                                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                                        ID_LopHoc: { type: 'number', editablle: true },
                                        TenLopHoc: { type: 'text', editablle: false },
                                        ID_PhieuHoc: { type: 'number', editablle: false }
                                    }
                                }
                            },
                            aggregate: [{ field: "DonGia", aggregate: "sum" }],
                            pageSize: 100
                        });

                        var dtphieumua = new kendo.data.DataSource({
                            data: lstPhieuMua,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        ID: { type: 'number', editable: false },
                                        Thang: { type: 'number', editable: true },
                                        NamHoc: { type: 'number', editable: true },
                                        ThangText: { type: 'string', editable: true },
                                        SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                                        HocDuoi: { type: 'number', editable: true },
                                        ID_LopHoc: { type: 'number', editablle: true },
                                        TenLopHoc: { type: 'text', editablle: false },
                                        GhiChu: { type: 'text', editablle: true },
                                        DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                                    }
                                }
                            },
                            aggregate: [{ field: "DonGia", aggregate: "sum" }],
                            pageSize: 100
                        });

                        $("#gridPhieuMua").data("kendoGrid").setDataSource(dtphieumua);
                        $("#gridPhuThu").data("kendoGrid").setDataSource(dtphuthu);
                        $("#gridGiamTru").data("kendoGrid").setDataSource(dtgiamtru);
                    });
                },
            });
            $("#combotamtinh").data("kendoComboBox").value(0);
        }

    });
}


function CalcTongTien() {
    var Tong = $("#gridPhieuMua").data("kendoGrid").dataSource.aggregates().DonGia.sum
        + $("#gridPhuThu").data("kendoGrid").dataSource.aggregates().DonGia.sum
        - $("#gridGiamTru").data("kendoGrid").dataSource.aggregates().DonGia.sum;
    $("#TongTien").val(kendo.toString(Tong, "n0"));
    var Thua = $("#KhachDua").data("kendoNumericTextBox").value() - Tong;
    $("#TraLai").val(kendo.toString(Thua, "n0"));
}

function openSuaPhieuThu(id) {
    var item = $("#gridLichSuPhieuThu").data("kendoGrid").dataSource.get(id);
    $("#windowLapPhieuThu").data("kendoWindow").maximize().open();
    LoadGridLichSuTamTinh(item.ID_HocSinh);
    $("#ID_HocSinh").val(item.ID_HocSinh);
    $("#ID_PhieuThu").val(item.ID);
    $("#TenHocSinh").val(item.TenHocSinh);
    $("#TongTien").val(kendo.toString(item.TongThu, 'n0'));
    var lstGiamTru = [];
    var lstPhuThu = [];
    var lstPhieuMua = [];
    $("#TraLai").val(0);
    $("#KhachDua").data("kendoNumericTextBox").value(0);
    $("#HinhThuc").data("kendoComboBox").value(item.HinhThucThanhToan);
    console.log(item)
    $.each(item.lstGiamTru, function (index, i) {
        lstGiamTru.push({
            DonGia: i.DonGia,
            ID: i.ID,
            ID_PhieuThu: i.ID_PhieuThu,
            LyDo: i.LyDo,
            Type: i.Type,
            Thang: i.Thang,
            Nam: i.Nam,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            SoBuoi: i.SoBuoi,
            ID_LopHoc: i.ID_Lop,
            TenLopHoc: i.TenLop,
            ID_PhieuHoc: i.ID_PhieuHoc
        })
    })
    $.each(item.lstPhuThu, function (index, i) {
        lstPhuThu.push({
            DonGia: i.DonGia,
            ID: i.ID,
            ID_PhieuThu: i.ID_PhieuThu,
            LyDo: i.LyDo,
            Type: i.Type,
            Thang: i.Thang,
            Nam: i.Nam,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            SoBuoi: i.SoBuoi,
            ID_LopHoc: i.ID_Lop,
            TenLopHoc: i.TenLop,
            ID_PhieuHoc: i.ID_PhieuHoc
        })
    })
    $.each(item.lstPhieuHoc, function (index, i) {
        lstPhieuMua.push({
            GhiChu: i.GhiChu,
            HocDuoi: i.HocDuoi,
            ID: i.ID,
            ID_LopHoc: i.ID_Lop,
            SoBuoi: i.SoBuoi,
            DonGia: i.SoTien,
            TenLopHoc: i.TenLop,
            Thang: i.Thang,
            ThangText: "Tháng " + item.Thang + "/" + item.Nam,
            NamHoc: i.NamHoc
        })
    })

    LoadGridThongKeSoBuoiHocThangTruoc(item.ID_HocSinh);
    LoadGridThongKePhieuCu(item.ID_HocSinh)

    var dtphuthu = new kendo.data.DataSource({
        data: lstPhuThu,
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    LyDo: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                    Thang: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    ID_LopHoc: { type: 'number', editablle: true },
                    TenLopHoc: { type: 'text', editablle: false },
                    ID_PhieuHoc: { type: 'number', editablle: false }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    });

    var dtgiamtru = new kendo.data.DataSource({
        data: lstGiamTru,
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    LyDo: { type: 'text', editablle: false },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } },
                    Thang: { type: 'number', editable: true },
                    Nam: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    ID_LopHoc: { type: 'number', editablle: true },
                    TenLopHoc: { type: 'text', editablle: false },
                    ID_PhieuHoc: { type: 'number', editablle: false }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    });

    var dtphieumua = new kendo.data.DataSource({
        data: lstPhieuMua,
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    Thang: { type: 'number', editable: true },
                    NamHoc: { type: 'number', editable: true },
                    ThangText: { type: 'string', editable: true },
                    SoBuoi: { type: 'number', editable: true, validation: { min: 0 } },
                    HocDuoi: { type: 'number', editable: true },
                    ID_LopHoc: { type: 'number', editablle: true },
                    TenLopHoc: { type: 'text', editablle: false },
                    GhiChu: { type: 'text', editablle: true },
                    DonGia: { type: 'number', editablle: true, validation: { min: 0 } }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        pageSize: 100
    });

    $("#gridPhieuMua").data("kendoGrid").setDataSource(dtphieumua);
    $("#gridPhuThu").data("kendoGrid").setDataSource(dtphuthu);
    $("#gridGiamTru").data("kendoGrid").setDataSource(dtgiamtru);
}

function InPhieuThu() {
    var ID_PhieuThu = $("#ID_PhieuThu").val();
    $.ajax({
        url: '/PhieuThu/InPhieu?ID_PhieuThu=' + ID_PhieuThu,
        type: 'GET',
    }).done(function successCallback(response) {
        HuyPhieuThu();
        window.open('/PhieuThu/InPhieu?ID_PhieuThu=' + ID_PhieuThu, '_blank');
    });
}

function InPhieuTamTinh() {
    var ID_PhieuThu = $("#ID_PhieuTamTinh").val();
    window.open('/PhieuThu/InPhieuTamTinh?ID_PhieuTamTinh=' + ID_PhieuThu, '_blank');
}

function ThongBaoHocPhi() {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn gửi thông báo học phí đến phụ huynh?</b>", function () { GuiThongBao(); }, function () { });
}

function GuiThongBao() {
    var idphieutamtinh = $("#ID_PhieuTamTinh").val();
    if (idphieutamtinh > 0) {
        let hocsinh = $("#gridTimKiemHocSinh").data("kendoGrid").dataSource.get($("#ID_HocSinh").val());
        let link = "http://" + window.location.host + "/PhieuThu/ThongBaoHocPhi?ID_PhieuThu=" + idphieutamtinh;
        let html = "<a style='display:block;width:100%;text-align:center;font-size:6em;text-decoration:none;' href='" + link + "'>Bấm để mở</a>"
        let model = {
            Users: [],
            Tokens: [],
            TieuDe: "Trung Tâm Luyện Thi Dương Hòa",
            NoiDung: "Thông báo học phí",
            NoiDungHTML: html,
            NoiDungRieng: "",
            AnhDaiDien: "logodh.png"
        };
        model.Users.push(hocsinh.DienThoaiMacDinh);
        model.Tokens.push(hocsinh.NotifyID);
        console.log(model);
        $.ajax({
            url: '/FBNotification/PushNotify',
            data: model,
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    } else {
        notification.show({ kValue: "Vui lòng chọn phiếu tạm tính cần gửi" }, "error");
    }
}

