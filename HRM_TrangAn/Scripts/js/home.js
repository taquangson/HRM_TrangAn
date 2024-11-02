$(document).ready(function () {
    $("#gridChamCong").kendoGrid({
        height: function () {
            var height = $(window).height() - 650;
            if (isMobile.any()) {
                height = height - 50;
            }
            return 300;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: true,
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
                    class: "text-center",
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                field: "MaThuyen",
                title: "Mã số đò",
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
                field: "TenDiem",
                title: "Tên điểm",
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
                field: "ThoiGian",
                title: "Thời gian",
                format: "{0:dd/MM/yyyy HH:mm}",
                width: "250px",
                //filterable: true,
                filterable: {
                    cell: { template: betweenFilter },
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
        ]

    });

    $("#gridThuyen").kendoGrid({
        height: function () {
            var height = $(window).height() - 650;
            if (isMobile.any()) {
                height = height - 50;
            }
            return 300;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: true,
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
                    class: "text-center",
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaNhanVien",
                title: "Mã nhân viên",
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
                field: "MaThuyen",
                title: "Mã số đò",
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

    });

    //LoadDataChamCong();
    //LoadDataThuyen();
    //LoadData_SoLaiDoCoTichKeTrongThang();
    //LoadData_GetTinhTrangChungChi();
    //LoadData_SoHopDongSapHetHan();
    //LoadData_GetDataMatKetNoi();
    //LoadData_SoLaiDoDangLam_DaNghi();
})

function LoadDataChamCong() {
    kendo.ui.progress($("#gridChamCong"), true);
    $.ajax({
        url: '/Home/GetDataChamCong?from=' + kendo.toString(new Date(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString(new Date(), "yyyy/MM/dd") + " 23:59:59"
            + "&ID_ToNhom=0",
        type: 'GET',
    }).done(function successCallback(response) {
        //if (typeof response == "string") {
        //    location.reload(true);
        //}
        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ThoiGian: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 100,
        });
        $("#gridChamCong").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChamCong"), false);
    });
}

function LoadDataThuyen() {
    kendo.ui.progress($("#gridThuyen"), true);
    $.ajax({
        url: '/Home/GetDataThuyenVeBen?Ngay=' + kendo.toString(new Date(), "yyyy/MM/dd") + " 00:00:00",
        type: 'GET',
    }).done(function successCallback(response) {
        //if (typeof response == "string") {
        //    location.reload(true);
        //}
        var dataSource = new kendo.data.DataSource({
            data: JSON.parse(response),
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 100,
        });
        $("#gridThuyen").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridThuyen"), false);
    });
}


function LoadData_SoLaiDoCoTichKeTrongThang() {
    $.ajax({
        url: '/Home/SoLaiDoCoTichKeTrongThang',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        var data = JSON.parse(response);
        $("#soluongdocoticke").html(data);
    });
}
function LoadData_SoLaiDoDangLam_DaNghi() {
    $.ajax({
        url: '/Home/SoLaiDoDangLam_DaNghi',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        var data = JSON.parse(response);
        $("#soluongdodanglam").html(data.DangLam);
        $("#soluongdodanghi").html(data.DaNghi);
    });
}

function LoadData_GetTinhTrangChungChi() {
    $.ajax({
        url: '/Home/GetTinhTrangChungChi',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        var data = JSON.parse(response);
        $("#ccnvdaco").html(data.CCNghiepVu);
        $("#ccnvchuaco").html(data.TongSoLaiDo - data.CCNghiepVu);
        $("#ccpcccdaco").html(data.CCPCCC);
        $("#ccpcccchuaco").html(data.TongSoLaiDo - data.CCPCCC);
        $("#cctnddaco").html(data.CCDuongThuy);
        $("#cctndchuaco").html(data.TongSoLaiDo - data.CCDuongThuy);
        $("#cctadaco").html(data.CCTiengAnh);
        $("#cctachuaco").html(data.TongSoLaiDo - data.CCTiengAnh);
    });
}

function LoadData_SoHopDongSapHetHan() {
    $.ajax({
        url: '/Home/SoHopDongSapHetHan',
        type: 'GET',
    }).done(function successCallback(response) {
        console.log(response);
        var data = JSON.parse(response);
        $("#hdhocviec").html(data.HocViec);
        $("#hdthuviec").html(data.ThuViec);
        $("#hdchinhthuc").html(data.ChinhThuc);
    });
}

function LoadData_GetDataMatKetNoi() {
    $.ajax({
        url: '/Home/GetDataMatKetNoi?from=' + kendo.toString(new Date(), 'yyyy-MM-ddT') + '00:00:00' + '&to=' + kendo.toString(new Date(), 'yyyy-MM-ddT') + '23:59:59',
        type: 'GET',
    }).done(function successCallback(response) {
        var html = '';
        //console.log(response);
        $.each(JSON.parse(response), function (index, item) {
            html += '<li>Thiết bị : <span>' + item.TenThietBi + '</span> - IP: ' + item.DiaChiIP + ' - ';
            if (item.TrangThaiKetNoi == 1) {
                html += '<span style="color:green">Dữ liệu gửi về lần cuối ( ' + item.GhiChu + ' ) trước</span>';
            } else {
                html += '<span style="color:red">Dữ liệu gửi về lần cuối ( ' + item.GhiChu + ' ) trước</span>';
            }
        })
        $("#ttketnoi").html(html);
    });
    $.ajax({
        url: '/Home/GetDataMatKetNoi2?from=' + kendo.toString(new Date(), 'yyyy-MM-ddT') + '00:00:00' + '&to=' + kendo.toString(new Date(), 'yyyy-MM-ddT') + '23:59:59',
        type: 'GET',
    }).done(function successCallback(response) {
        var html = '';
        console.log(JSON.parse(response));
        $.each(JSON.parse(response), function (index, item) {
            html += '<li>Thiết bị : <span>' + item.TenThietBi + '</span> - IP: ' + item.DiaChiIP + ' - ';
            if (item.TrangThaiKetNoi == 1) {
                html += '<span style="color:green">Connected</span>';
            } else {
                html += '<span style="color:red">Disconnect (' + item.GhiChu + ')</span>';
            }
        })
        $("#ttketnoi2").html(html);
    });
}

function betweenFilter(args) {
    var filterCell = args.element.parents(".k-filtercell");

    filterCell.empty();
    filterCell.html('<span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Từ:</span><input style="width:80%" class="start-date"/></span><span style="display:flex; justify-content:center;padding:0"><span style="width:20%;">Đến:</span><input style="width:80%;" class="end-date"/></span>');
    var d1 = new Date();
    d1.setHours(0, 0, 0, 0);
    var d2 = new Date();
    d2.setHours(23, 59, 59, 0);
    $(".start-date", filterCell).kendoDateTimePicker({
        format: '{0: dd-MM-yyyy HH:mm}',
        min: d1,
        max: d2,
        change: function (e) {
            var startDate = e.sender.value(),
                endDate = $("input.end-date", filterCell).data("kendoDateTimePicker").value(),
                dataSource = $("#gridChamCong").data("kendoGrid").dataSource;

            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "ThoiGian", operator: "gte", value: startDate });
                filter.filters.push({ field: "ThoiGian", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });
    $(".end-date", filterCell).kendoDateTimePicker({
        format: '{0: dd-MM-yyyy HH:mm}',
        min: d1,
        max: d2,
        change: function (e) {
            var startDate = $("input.start-date", filterCell).data("kendoDateTimePicker").value(),
                endDate = e.sender.value(),
                dataSource = $("#gridChamCong").data("kendoGrid").dataSource;
            console.log(startDate);
            console.log(endDate);
            if (startDate & endDate) {
                var filter = { logic: "and", filters: [] };
                filter.filters.push({ field: "ThoiGian", operator: "gte", value: startDate });
                filter.filters.push({ field: "ThoiGian", operator: "lte", value: endDate });
                dataSource.filter(filter);
            }
        }
    });

}