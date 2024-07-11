$(document).ready(function () {
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    var images = {
        logo: "/Images/img.png"
    };
    loadBinary(images["logo"], function (data, contentType) {
        images["logo"] = { type: contentType, data: data };
    });
    $("#rootContainer").show();
    LoadCombo();

    $("#gridData").kendoGrid({
        //dataSource: new kendo.data.DataSource({
        //    data: [],
        //    pageSize: 50,
        //    schema: {
        //        model: {
        //            fields: {
        //                TongTien: { type: "number" },
        //                TongTienHang: { type: "number" }
        //            }
        //        }
        //    },
        //    aggregate: [
        //        { field: "TongTien", aggregate: "sum" },
        //        { field: "TongTienHang", aggregate: "sum" }
        //    ]
        //}),
        height: function () {
            var height = $(window).height() - 230;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
        },
        excel: {
            filterable: true
        },
        excelExport: function (e) {
            e.workbook.images = images;
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Báo chi tiết chấm công"
                + "từ" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy");
            sheet.rows.unshift({ cells: [{ value: "", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "Từ ngày " + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy") + " đến ngày " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy"), fontName: "Times New Roman", italic: true, textAlign: "center", colSpan: columns.length }] });
            sheet.rows.unshift({ cells: [{ value: "Tổ:" + $("#comboToNhom").data("kendoComboBox").text(), bold: true, fontSize: 20, fontName: "Times New Roman", textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 30 });
            sheet.rows.unshift({ cells: [{ value: "BẢNG CHI TIẾT CÔNG LAO ĐỘNG THEO THÁNG", bold: true, fontName: "Times New Roman", fontSize: 25, textAlign: "center", colSpan: columns.length, verticalAlign: "center" }], height: 60 });
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
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
            sheet.rows.push({ cells: [{ value: "", textAlign: "right", verticalAlign: "center" }] });
            sheet.rows.push({ cells: [{ value: "Ngày.....Tháng.....Năm.....", fontName: "Times New Roman", italic: true, textAlign: "right", colSpan: 68, verticalAlign: "center" }] });
            sheet.rows.push({
                cells: [
                    { value: "", bold: true, textAlign: "center", colSpan: 5, verticalAlign: "center" },
                    { value: "Ban Quản Lý", fontName: "Times New Roman", colSpan: 5, bold: true, textAlign: "center", colSpan: 5, verticalAlign: "center" },
                    { value: "", bold: true, textAlign: "center", colSpan: 24, verticalAlign: "center" },
                    { value: "Tổ trưởng", fontName: "Times New Roman", colSpan: 5, bold: true, textAlign: "center", colSpan: 5, verticalAlign: "center" },
                    { value: "", bold: true, textAlign: "center", colSpan: 28, verticalAlign: "center" },
                    { value: "Người lập", fontName: "Times New Roman", colSpan: 5, bold: true, textAlign: "center", colSpan: 5, verticalAlign: "center" }
                ]
            });
            sheet.drawings = [{
                topLeftCell: "A1",
                offsetX: 0,
                offsetY: 0,
                width: 60,
                height: 60,
                image: "logo"
            }]
            sheet.filter = null;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        save: function (e) {
            if (e.values.ChuyenTo) {
                try {
                    $.ajax({
                        url: '/ChuyenTo/InsertOrUpdate_ChuyenToLaoDong',
                        data: {
                            ID_LaoDong: e.model.ID,
                            Ngay: kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "MM/yyyy") + "/01",
                            SoCong: e.values.ChuyenTo
                        },
                        type: 'POST'
                    }).done(function (response) {
                        if (response.success) {
                            notification.show({ kValue: response.msg }, "success");
                            e.sender.refresh();
                        } else {
                            notification.show({ kValue: response.msg }, "error");
                        }
                    })
                } catch (ex) {
                    e.sender.refresh();
                }
            }
            //if (e.values.Plus) {
            //    try {
            //        $.ajax({
            //            url: '/ChuyenTo/InsertOrUpdate_GiamTru',
            //            data: {
            //                ID_LaoDong: e.model.ID,
            //                Ngay: kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "MM/yyyy") + "/01",
            //                SoCong: e.values.Plus
            //            },
            //            type: 'POST'
            //        }).done(function (response) {
            //            if (response.success) {
            //                notification.show({ kValue: response.msg }, "success");
            //                e.sender.refresh();
            //            } else {
            //                notification.show({ kValue: response.msg }, "error");
            //            }
            //        })
            //    } catch (ex) {
            //        e.sender.refresh();
            //    }
            //}

        },
        resizable: true,
        sortable: true,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,
        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        }

    });
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01"),
        change: function (e) {
            var d = new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0);
            $("#DenNgay").data("kendoDatePicker").value(d);
            CheckDaChotCongLaoDong();
        }
    })
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date($("#TuNgay").data("kendoDatePicker").value().getFullYear(), $("#TuNgay").data("kendoDatePicker").value().getMonth() + 1, 0)
    })
    CheckDaChotCongLaoDong();
})

function loadChiTietChuyenDo(idnv, ngay) {
    console.log(idnv);
    console.log(ngay);
    $.ajax({
        url: '/KeHoach/GetByChamCongNhanVien?ID_NhanVien=' + idnv + '&Ngay=' + ngay,
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayLamViec: { type: 'date', editable: false },
                        NgayTao: { type: 'date', editable: false },
                    }
                }
            }
        });
        var container = document.createElement('div');
        $(container).kendoGrid({
            height: 200,
            dataSource: dataSource,
            scrollable: true,
            persistSelection: true,
            autoFitColumn: true,
            resizable: true,
            sortable: true,
            filterable: {
                mode: "row",
            },
            pageable: false,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            columns: [
                {
                    field: "NgayTao",
                    title: "Ngày tạo",
                    format: "{0:dd/MM/yyyy}",
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
                    field: "TenCongViec",
                    title: "Nội dung công việc",
                    template: function (e) {
                        if (e.TrangThai == 1) {
                            return e.TenCongViec;
                        } else {
                            return e.TenCongViecThucTe;
                        }
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
                    field: "DiaDiem",
                    title: "Địa điểm",
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
                        style: "text-align: right; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                    attributes: {
                        style: "text-align: left;",
                        class: "table-header-cell"
                    }
                },
                {
                    field: "Cong",
                    title: "Số công/người",
                    template: function (e) {
                        if (e.TrangThai == 1) {
                            return e.Cong;
                        } else {
                            return e.CongThucTe;
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
                        style: "text-align: right; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                    attributes: {
                        style: "text-align: left;",
                        class: "table-header-cell"
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
                        style: "text-align: right; font-size: 12px; font-weight:bold",
                        class: "table-header-cell"
                    },
                    attributes: {
                        style: "text-align: left;",
                        class: "table-header-cell"
                    }
                }

            ]

        });
        $('#contentgrid').html(container);
    });
}


function loadChiTietPhatSinh(idnv, ngay) {
    $.ajax({
        url: '/PhatSinh/GetByNhanVien_Ngay?ID_NhanVien=' + idnv + '&Ngay=' + ngay,
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayApDung: { type: 'date', editable: false },
                    }
                }
            }
        });
        var container = document.createElement('div');
        $(container).kendoGrid({
            height: 200,
            dataSource: dataSource,
            scrollable: true,
            persistSelection: true,
            autoFitColumn: true,
            resizable: true,
            sortable: true,
            filterable: {
                mode: "row",
            },
            pageable: false,
            dataBinding: function () {
                record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            },
            columns: [
                {
                    field: "NgayApDung",
                    title: "Ngày áp dụng",
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
                    field: "Cong",
                    title: "Công",
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
                    },
                    attributes: {
                        style: "text-align: center;",
                    }
                },
                {
                    field: "TenDayDu",
                    title: "Tên nhân viên",
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
                    },
                    attributes: {
                        style: "text-align: left;",
                    }
                },

                {
                    field: "MaThuyen",
                    title: "Mã số đò",
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
                    field: "TenToNhom",
                    title: "Tên tổ",
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
                    field: "TenCongViec",
                    title: "Danh mục công việc",
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
        $('#contentgridPS').html(container);
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
}

function TimKiem() {
    kendo.ui.progress($("#gridData"), true);
    $.ajax({
        url: "/BaoCao/GetData_BaoCaoChiTietChamCong"
            + "?TuNgay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&DenNgay=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=" + ($("#comboToNhom").data("kendoComboBox").value() ? $("#comboToNhom").data("kendoComboBox").value() : 0),
        type: 'POST',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        console.log(response);

        var f = [];
        var columns = [];
        var aggregates = [];
        columns.push(
            {
                title: "STT",
                template: "#= ++record #",
                width: "50px",
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
                locked: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenDayDu",
                title: "Tên nhân viên",
                width: "170px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                locked: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
                width: "150px",
                locked: true,
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },

            },
            {
                field: "MaThuyen",
                title: "Mã số đò",
                width: "100px",
                locked: true,
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                field: "NoCongTonDau",
                title: "Tồn đầu",
                format: "{0:n2}",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center'
                }
            }
        )
        var dates = getDates($("#TuNgay").data("kendoDatePicker").value(), $("#DenNgay").data("kendoDatePicker").value());
        var listcolumnNgay = [];
        $.each(dates, function (index, item) {
            listcolumnNgay.push({
                title: kendo.toString(item, 'dd/MM'),
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        template: function (e) {
                            var html = '';
                            let nghiphep = e['data3' + kendo.toString(item, 'yyyyMMdd')];
                            if (e['data2' + kendo.toString(item, 'yyyyMMdd')] > 0) {
                                //html = e['data' + kendo.toString(item, 'yyyyMMdd')];
                                html = "<div class='congld' data-idnhanvien='" + e.ID + "' data-ngay='" + kendo.toString(item, 'yyyy/MM/dd') + "'>" + e['data2' + kendo.toString(item, 'yyyyMMdd')] + "</div>";
                            } else {
                                if (nghiphep == 1) {
                                    return "<span class='nghiphep'><span/>";
                                } else if (nghiphep == 2) {
                                    return "<span class='nghipheptruam'><span/>";
                                }
                            }
                            return html;
                        },
                        field: 'data2' + kendo.toString(item, 'yyyyMMdd'),
                        footerTemplate: "#=kendo.toString(sum,'n2')#",
                        aggregates: ["sum"],
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.addClass("k-textbox").css("width", "100%")
                                }
                            }
                        },
                        title: "Công LĐ",
                        width: "70px",
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center; font-size: 12px;padding:0;"
                        }

                    },
                    {
                        template: function (e) {
                            var html = '';
                            //if (e['data' + kendo.toString(item, 'yyyyMMdd')] > 0) {
                                html = e['data' + kendo.toString(item, 'yyyyMMdd')];
                            //} else {

                            //}
                            return html;
                        },
                        field: 'data' + kendo.toString(item, 'yyyyMMdd'),
                        footerTemplate: "#=kendo.toString(sum,'n2')#",
                        aggregates: ["sum"],
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.addClass("k-textbox").css("width", "100%")
                                }
                            }
                        },
                        title: "Ticket",
                        width: "70px",
                        headerAttributes: {
                            style: "text-align: center; font-size: 12px; font-weight:bold",
                            class: "table-header-cell"
                        },
                        attributes: {
                            style: "text-align: center; font-size: 12px;padding:0;"
                        }

                    }
                ]
            })
            f['data' + kendo.toString(item, 'yyyyMMdd')] = { type: 'number', editable: false };
            f['data2' + kendo.toString(item, 'yyyyMMdd')] = { type: 'number', editable: false };
            f['data3' + kendo.toString(item, 'yyyyMMdd')] = { type: 'number', editable: false };
            aggregates.push({ field: 'data' + kendo.toString(item, 'yyyyMMdd'), aggregate: "sum" });
            aggregates.push({ field: 'data2' + kendo.toString(item, 'yyyyMMdd'), aggregate: "sum" });
        });
        f['Plus'] = { type: 'number', editable: true };
        f['CongPhatSinh'] = { type: 'number', editable: false };
        f['TongCongLDTrongThang'] = { type: 'number', editable: false };
        f['Ticket'] = { type: 'number', editable: false };
        f['NoCong'] = { type: 'number', editable: false };
        f['TenDayDu'] = { type: 'text', editable: false };
        f['MaThuyen'] = { type: 'text', editable: false };
        f['NoCongTonDau'] = { type: 'number', editable: false };
        f['ChuyenTo'] = { type: 'number', editable: true };
        var columnNgayTrongThang = {
            title: "Ngày trong tháng",
            headerAttributes: {
                style: "text-align: center; font-size: 12px; font-weight:bold;",
                class: "table-header-cell"
            },
            columns: listcolumnNgay
        };
        columns.push(columnNgayTrongThang);
        columns.push(
            //{
            //    field: "Plus",
            //    title: "+",
            //    width: "170px",
            //    footerTemplate: "#=kendo.toString(sum,'n2')#",
            //    aggregates: ["sum"],
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
            //        style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        class: 'text-center'
            //    }
            //},
            {
                field: "CongPhatSinh",
                title: "PS",
                template: function (e) {
                    return "<div class='congPS' data-idnhanvien='" + e.ID + "' data-ngay='" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), 'yyyy/MM/dd') + "'/>" + e.CongPhatSinh + "</div>";
                },
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center congPS'
                }
            },
            {
                field: "TongCongLDTrongThang",
                title: "Tổng công LĐ trong tháng",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "Ticket",
                title: "Tổng tích kê",
                width: "170px",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "ChuyenTo",
                title: "Chuyến tổ",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                field: "NoCong",
                format: "{0:n2}",
                footerTemplate: "#=kendo.toString(sum,'n2')#",
                aggregates: ["sum"],
                title: "Nợ công",
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                },
                attributes: {
                    class: 'text-center'
                }
            },
            {
                title: "Ký tên",
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            },
            {
                title: "Ghi chú",
                width: "170px",
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
                    style: "text-align: center; font-size: 12px; font-weight:bold; vertical-align: middle;",
                    class: "table-header-cell"
                }
            }
        )

        aggregates.push({ field: 'Ticket', aggregate: "sum" });
        aggregates.push({ field: 'NoCong', aggregate: "sum" });
        aggregates.push({ field: 'ChuyenTo', aggregate: "sum" });
        aggregates.push({ field: 'TongCongLDTrongThang', aggregate: "sum" });
        aggregates.push({ field: 'NoCongTonDau', aggregate: "sum" });
        aggregates.push({ field: 'CongPhatSinh', aggregate: "sum" });
        aggregates.push({ field: 'Plus', aggregate: "sum" });

        $("#gridData").data("kendoGrid").setOptions({
            dataSource: new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        fields: f
                    }
                },
                aggregate: aggregates,
                pageSize: 50
            }),
            columns: columns,
            editable: true
        });
        $("#contentgrid").html('');
        $("#gridData").kendoTooltip({
            autoHide: true,
            filter: "div.congld",
            content: kendo.template($("#templateTooltip").html()),
        });
        $("#gridData").kendoTooltip({
            autoHide: true,
            filter: "div.congPS",
            content: kendo.template($("#templateTooltipPS").html()),
        });
        kendo.ui.progress($("#gridData"), false);
    });


}

function XuatExcel() {
    var grid = $('#gridData').data('kendoGrid');

    grid.options.excel = {
        fileName: "BaoCaoChiTietChamCong.xlsx",
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
function loadBinary(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(xhr.response, xhr.getResponseHeader("Content-Type"));
    };
    xhr.onerror = function () {
        callback(null);
    };
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send();
}

function ChotCong() {
    var date = $("#TuNgay").data("kendoDatePicker").value();
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn chốt công tháng " + kendo.toString(date, "MM/yyyy")  + " ?</b>", function () { ChotCongLaoDong(); }, function () { });
}
function ChotCongLaoDong() {
    $.ajax({
        url: "/BaoCao/ChotCong?Ngay=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",         
        type: 'GET',
    }).done(function successCallback(response) {
        TimKiem();
    })
}

function CheckDaChotCongLaoDong() {
    var date = $("#TuNgay").data("kendoDatePicker").value();
    $.ajax({
        url: "/BaoCao/GetData_LichSuChotCong?Thang=" + kendo.toString(date, "MM") + "&Nam=" + kendo.toString(date, "yyyy"),
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.length > 0) {
            $("#btnChotCong").prop('disabled', true);
            $("#btnChotCong").html('<i class="fa fa-lock"> Đã chốt công tháng ' + kendo.toString(date, "MM/yyyy"));
        } else {
            $("#btnChotCong").prop('disabled', false);
            $("#btnChotCong").html('<i class="fa fa-lock"> Chốt công tháng ' + kendo.toString(date, "MM/yyyy"));
        }
    })
}