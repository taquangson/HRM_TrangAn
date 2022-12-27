$(document).ready(function () {
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridLichSuMuaPhieu").kendoGrid({
        height: function () {
            var height = ($(window).height() - 160) / 2;
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
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "40px",
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
                title: "Lớp",
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
                field: "SoBuoi",
                title: "Số buổi học",
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
            //{
            //    field: "SoBuoiDaHoc",
            //    title: "Số đã buổi học",
            //    width: "100px",
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
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //},
            {
                field: "NgayTao",
                title: "Ngày mua",
                template: function (e) {
                    var dateString = e.NgayTao.substr(6);
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
                },
            },
        ]

    });
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
        columns: [
            {
                width: "26px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "30px",
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
            }
        ]

    });

    var dataThang = [];
    for (var i = new Date().getMonth() + 1; i <= 12; i++) {
        dataThang.push({ text: "Tháng " + i, value: i })
    }

    $("#Thang").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: dataThang
        }),
        filter: "contains",
        change: function (e) {
            TinhSoBuoiHoc(e.sender.value(), $("#LopHoc").data("kendoComboBox").value());
        }
    })
    $("#Thang").data("kendoComboBox").value(new Date().getMonth() + 1);

    function onTimKiemClick(e) {
        var grid = $("#gridTimKiemHocSinh").data("kendoGrid");
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        LoadComboLop(item.ID);
        LoadGridLichSuMuaPhieu(item.ID);
        HuyPhieu();
        $("#TenHocSinh").val(item.TenHocSinh)
        if (row.hasClass("k-state-selected")) {
            setTimeout(function (e) {
                var grid = $("#gridTimKiemHocSinh").data("kendoGrid");
                grid.clearSelection();
            })
        } else {
            grid.clearSelection();
        };
    };

    function onLichSuClick(e) {
        var grid = $("#gridLichSuMuaPhieu").data("kendoGrid");
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        CheckItemCanEdit(item);
    };

    $("#gridTimKiemHocSinh").data("kendoGrid").tbody.on("click", ".k-checkbox", onTimKiemClick);
    $("#gridLichSuMuaPhieu").data("kendoGrid").tbody.on("click", ".k-checkbox", onLichSuClick);

    $("#gridTimKiemHocSinh").on("dblclick", "tr[role='row']", function () {
        $("#gridTimKiemHocSinh").data("kendoGrid").clearSelection();
        var row = $("#gridTimKiemHocSinh").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#gridTimKiemHocSinh").data("kendoGrid").select(row);
        var item = $("#gridTimKiemHocSinh").data("kendoGrid").dataItem(row);
        LoadComboLop(item.ID);
        LoadGridLichSuMuaPhieu(item.ID);
        $("#TenHocSinh").val(item.TenHocSinh)
    })

    $("#gridLichSuMuaPhieu").on("dblclick", "tr[role='row']", function () {
        $("#gridLichSuMuaPhieu").data("kendoGrid").clearSelection();
        var row = $("#gridLichSuMuaPhieu").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#gridLichSuMuaPhieu").data("kendoGrid").select(row);
        var item = $("#gridLichSuMuaPhieu").data("kendoGrid").dataItem(row);
        CheckItemCanEdit(item);
    })

    $("#LoaiPhieu").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true,
        delay: 500,
        dataSource: new kendo.data.DataSource({
            data: [{ text: "Học chính", value: 0 }, { text: 'Học đuổi', value: 1 }],
        })
    });

    LoadGridDataTimKiemHocSinh();
    LoadComboLop(0);
})

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

function LoadGridLichSuMuaPhieu(ID_HocSinh) {
    $.ajax({
        url: '/PhieuHoc/GetAllByHocSinh?ID_HocSinh=' + ID_HocSinh,
        type: 'GET',
    }).done(function successCallback(response) {
        if (typeof response == "string") {
            location.reload(true);
        }
        kendo.ui.progress($("#gridLichSuMuaPhieu"), true);
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
        $("#gridLichSuMuaPhieu").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridLichSuMuaPhieu"), false);
    });
}

function LoadComboLop(ID_HocSinh) {
    $.ajax({
        url: '/Lop/GetAllByHocSinh?ID_HocSinh=' + ID_HocSinh,
        //url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        if ($("#LopHoc").data("kendoComboBox") == undefined) {
            $("#LopHoc").kendoComboBox({
                dataTextField: 'TenLop',
                dataValueField: 'ID',
                dataSource: dataSource,
                filter: "startswith",
                select: function (e) {
                    if (e.dataItem) {
                        //var count = 0;
                        //var lichhoc = [];
                        //$.ajax({
                        //    url: '/LichHoc/GetLichHocByLop?ID_Lop=' + e.dataItem.ID,
                        //    type: 'GET'
                        //}).done(function (response) {
                        //    $.each(response, function (index, item) {
                        //        lichhoc.push(item.Thu)
                        //    })
                        //    var month = new Date().getMonth();
                        //    var year = new Date().getFullYear();
                        //    if (lichhoc.length > 0) {
                        //        $.each(lichhoc, function (index, item) {
                        //            var day = parseInt(item) - 1;
                        //            console.log(day);
                        //            count += countDayInMonth(day, month, year);
                        //        })
                        //        $("#SoBuoiHoc").val(count);
                        //    }
                        //    var tien = 400000 / count;
                        //    if (Math.floor(tien) == 44444) {
                        //        tien = 45000
                        //    }
                        //    $("#GhiChu").val(kendo.toString(tien, 'n0') + " / buổi");
                        //})
                        TinhSoBuoiHoc($("#Thang").data("kendoComboBox").value(), e.dataItem.ID);


                    }

                }
            })
        } else {
            $("#LopHoc").data("kendoComboBox").setDataSource(dataSource);
        }
        $("#LopHoc").data("kendoComboBox").value("");
    });
}

function TinhSoBuoiHoc(month, lop) {

    var count = 0;
    var lichhoc = [];
    $.ajax({
        url: '/LichHoc/GetLichHocByLop?ID_Lop=' + lop,
        type: 'GET'
    }).done(function (response) {
        $.each(response, function (index, item) {
            lichhoc.push(item.Thu)
        })
        var year = new Date().getFullYear();
        if (lichhoc.length > 0) {
            $.each(lichhoc, function (index, item) {
                var day = parseInt(item) - 1;
                console.log(day);
                console.log(month);
                console.log(lop)
                count += countDayInMonth(day, (parseInt(month) - 1), year);
                console.log(count);
            })
            $("#SoBuoiHoc").val(count);
        }
        var tien = 400000 / count;
        if (Math.floor(tien) == 44444) {
            tien = 45000
        }
        $("#GhiChu").val(kendo.toString(tien, 'n0') + " / buổi");
    })
}

function HuyPhieu() {
    $("#IDPhieuHoc").val(0);
    $("#LopHoc").data("kendoComboBox").value("");
    $("#Thang").data("kendoComboBox").value("");
    $("#SoBuoiHoc").val("");
    $("#GhiChu").val("");
    $("#LoaiPhieu").data("kendoComboBox").value("");
}
function LuuPhieu() {
    if (validateDuLieu()) {
        var row = $("#gridTimKiemHocSinh").data("kendoGrid").select();
        var hocsinh = $("#gridTimKiemHocSinh").data("kendoGrid").dataItem(row);
        $.ajax({
            url: '/PhieuHoc/CreateOrUpdate',
            type: 'POST',
            data: {
                ID: $("#IDPhieuHoc").val(),
                ID_HocSinh: hocsinh.ID,
                ID_Lop: $("#LopHoc").data("kendoComboBox").value(),
                Thang: $("#Thang").data("kendoComboBox").value(),
                Nam: new Date().getFullYear(),
                SoBuoi: $("#SoBuoiHoc").val(),
                HocDuoi: $("#LoaiPhieu").data("kendoComboBox").value(),
                GhiChu: $("#GhiChu").val()
            }
        }).done(function successCallback(response) {

            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyPhieu();
                LoadGridLichSuMuaPhieu(hocsinh.ID);
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    } else {

    }
}
function validateDuLieu() {
    var validlop = SetValidate("LopHoc");
    var validsobuoi = SetValidate("SoBuoiHoc");
    var validloai = SetValidate("LoaiPhieu");
    var validthang = SetValidate("Thang");
    return validlop && validsobuoi && validloai && validthang;
}

function CheckItemCanEdit(item) {
    $.ajax({
        url: '/PhieuHoc/CheckItemCanEdit?ID_Lop=' + item.ID_Lop + "&ID_Phieu=" + item.ID + "&ID_HocSinh=" + item.ID_HocSinh,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response) {
            $("#LopHoc").data("kendoComboBox").value(item.ID_Lop);
            $("#Thang").data("kendoComboBox").value(item.Thang);
            $("#LoaiPhieu").data("kendoComboBox").value(item.HocDuoi);
            $("#GhiChu").val(item.GhiChu);
            $("#SoBuoiHoc").val(item.SoBuoi);
            $("#IDPhieuHoc").val(item.ID);
        } else {
            $("#gridLichSuMuaPhieu").data("kendoGrid").clearSelection();
            HuyPhieu();
            notification.show({ kValue: "Phiếu đã hết hạn, không thể chuyển đổi" }, "error");
        }
    });
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