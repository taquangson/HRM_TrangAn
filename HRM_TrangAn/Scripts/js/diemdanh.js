var path;
$(document).ready(function () {
    $("#rootContainer").show();
    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        clearButton: false,
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tất cả', value: 0 },
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 },
                { text: '5', value: 5 },
                { text: '6', value: 6 },
                { text: '7', value: 7 },
                { text: '8', value: 8 },
                { text: '9', value: 9 },
                { text: '10', value: 10 },
                { text: '11', value: 11 },
                { text: '12', value: 12 },
            ]
        }),
        change: function (e) {
            LoadComboLop(e.sender.value());
            $("#comboLop").data("kendoComboBox").value('');
        }
    });


    LoadComboCaHoc();

    $("#comboKhoi").data("kendoComboBox").value(0);
    LoadComboLop(0);

    $("#windowSoDo").kendoWindow({
        title: "Sơ đồ chỗ ngồi học sinh trong lớp",
        modal: true,
        visible: false
    })

    $("#gridDiemDanh").kendoGrid({
        height: function () {
            var height = $(window).height() - 250;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
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
        dataBound: function (e) {
            var grid = $("#gridDiemDanh").data("kendoGrid");
            var data = grid.dataSource.data();
            $.each(data, function (i, row) {
                if (!row.DaMuaPhieu) {
                    $('tr[data-uid="' + row.uid + '"] ').css("background-color", "#ff8e8e");
                }
            })
        },
        save: function (e) {
            if (e.values.GhiChu) {
                if (e.model.ID_DiemDanh > 0) {
                    $.ajax({
                        url: '/DiemDanh/UpdateGhiChuDiemDanh',
                        type: 'POST',
                        data: JSON.stringify({
                            ID: e.model.ID_DiemDanh,
                            GhiChu: e.values.GhiChu,
                            Diem: e.model.Diem
                        }),
                        contentType: "application/json; charset=utf-8"
                    }).done(function successCallback(response) {
                        if (typeof response == "string") {
                            location.reload(true);
                        }
                    })
                }
                e.model.GhiChu = e.values.GhiChu;
                //e.model.Diem = e.values.Diem;
            }
            else if (e.values.Diem) {
                if (e.model.ID_DiemDanh > 0) {
                    console.log(e.values.Diem);
                    $.ajax({
                        url: '/DiemDanh/UpdateGhiChuDiemDanh',
                        type: 'POST',
                        data: JSON.stringify({
                            ID: e.model.ID_DiemDanh,
                            GhiChu: e.model.GhiChu,
                            Diem: e.values.Diem
                        }),
                        contentType: "application/json; charset=utf-8"
                    }).done(function successCallback(response) {
                        if (typeof response == "string") {
                            location.reload(true);
                        }
                    })
                }
                //e.model.GhiChu = e.values.GhiChu;
                e.model.Diem = e.values.Diem;
            }
            setTimeout(function () {
                e.sender.refresh();
            })
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
                title: "<span title='Có mặt'>C</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == 0) {
                            return '<input type="checkbox" id="comat' + e.ID + '" onchange="DiemDanh(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="comat' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="comat' + e.ID + '" onchange="DiemDanh(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="comat' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                title: "<span title='Vắng mặt'>V</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == -1) {
                            return '<input type="checkbox" id="vangmat' + e.ID + '" onchange="VangMat(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="vangmat' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="vangmat' + e.ID + '" onchange="VangMat(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="vangmat' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                title: "<span title='Nghỉ có phép'>P</span>",
                width: "50px",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                attributes: {
                    style: "text-align: center;",
                },
                template: function (e) {
                    if (e.QuaGioDiemDanh == 1) {
                        return '';
                    }
                    else {
                        if (e.ID_DiemDanh > 0 && e.CoPhep == 1) {
                            return '<input type="checkbox" id="cophep' + e.ID + '"  onchange="CoPhep(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" checked="checked" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="cophep' + e.ID + '"></label>';
                        } else {
                            return '<input type="checkbox" id="cophep' + e.ID + '"  onchange="CoPhep(' + e.ID + ',' + e.IsHocDuoi + ',\'' + e.GhiChu + '\',' + e.Diem + ')" class="k-checkbox">'
                                + '<label class="k-checkbox-label" for="cophep' + e.ID + '"></label>';
                        }
                    }
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
                width: "150px",
                template: function (e) {
                    if (!e.DaMuaPhieu) {
                        style = "style='background-color:red'";
                    }
                    if (e.IsHocDuoi) {
                        return "<span>" + e.TenHocSinh + " <i title='Học sinh học bồi dưỡng hoặc học đuổi' class='fa fa-exclamation-circle'/></span>";
                    } else {
                        return "<span>" + e.TenHocSinh + "</span>";
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
                }
            },
            //{
            //    field: "NgaySinh",
            //    title: "Ngày sinh",
            //    template: function (e) {
            //        var dateString = e.NgaySinh.substr(6);
            //        var currentTime = new Date(parseInt(dateString));
            //        if (currentTime.getFullYear() != 1) {
            //            return kendo.toString(currentTime, "dd/MM/yyyy");
            //        } else {
            //            return "";
            //        }
            //    },
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
                field: "GhiChu",
                title: "Nhận xét",
                width: "100px",
                editor: function (container, options) {
                    $('<textarea row="2" class="k-textbox" style="width:100%;border:none" name="' + options.field + '"></textarea').appendTo(container);
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
                    style: "text-align: left;white-space:pre-wrap",
                }
            },
            {
                field: "Diem",
                title: "Điểm kiểm tra",
                width: "100px",
                editor: function (container, options) {
                    $('<input lass="k-textbox" type="number" step="0.1" style="width:100%" name="' + options.field + '"></textarea').appendTo(container);
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
                    style: "text-align: left;white-space:pre-wrap",
                }
            },
            {
                field: "DienThoaiMacDinh",
                title: "Điện thoại",
                template: function (e) {
                    if (e.DienThoaiMacDinh) {
                        return '<a href="tel:' + e.DienThoaiMacDinh + '">' + e.DienThoaiMacDinh + '</a>'
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

        ]

    });

    $("#file").kendoUpload({
        multiple: true,
        localization: {
            select: 'Tải ảnh camera lớp',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg"],
        select: function (e) {
            $each(e.files, function (index, item) {
                PushFormDataFile(item, $("#comboCa").data("kendoComboBox").value(), $("#comboLop").data("kendoComboBox").value());

            })
        }
    });

    var signalR = $.connection.diemDanhHub;
    // Create a function that the hub can call back to display messages.
    signalR.client.pushDiemDanh = function (ID_Lop) {
        if ($("#comboLop").data("kendoComboBox").value() == ID_Lop)
            LoadHocSinhTrongLop(ID_Lop)
    };

    $.connection.hub.start().done(function () {
        console.log("Connect signalR OK!");
    });
})

function DeleteImage(ID) {
    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa ảnh?</b>", function () { XoaImage(ID); }, function () { });
}

function XoaImage(ID) {
    $.ajax({
        url: '/DiemDanh/DeleteAnhDiemDanh?ID=' + ID,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            LoadAnhDiemDanh($("#comboLop").data("kendoComboBox").value(), $("#comboCa").data("kendoComboBox").value(), new Date());
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function PushFormDataFile(file, ID_CaHoc, ID_LopHoc) {
    var data = new FormData();
    data.append("ID_LopHoc", ID_LopHoc);
    data.append("ID_CaHoc", ID_CaHoc);
    data.append("Ngay", kendo.toString(new Date(), "yyyy-MM-dd"));
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/DiemDanh/UpAnhDiemDanh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        path.push(response.path);
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
            $("#file").data("kendoUpload").clearAllFiles();
            LoadAnhDiemDanh(ID_LopHoc, ID_CaHoc, new Date());
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function LoadAnhDiemDanh(ID_LopHoc, ID_CaHoc, Ngay) {
    $.ajax({
        url: '/DiemDanh/GetAnhDiemDanh?ID_LopHoc=' + ID_LopHoc + "&ID_CaHoc=" + ID_CaHoc + "&Ngay=" + kendo.toString(new Date(), "yyyy-MM-dd"),
        type: 'GET'
    }).done(function (response) {
        $("#listAnhDiemDanh").html("");
        $.each(response, function (index, item) {
            var html = '<div class="photo" title="' + item.DuongDan + '" style="background-image: url(' + item.DuongDan + ')" >'
                + '<button type="button" onclick="DeleteImage(' + item.ID + ')" class="k-button k-upload-action BKTremovebtn" aria-label="">'
                + '<span class="k-icon k-i-close k-i-x" title=""></span>'
                + '</button>'
                + '</div>'
            $("#listAnhDiemDanh").append(html)
        });
        $("#listAnhDiemDanh").kendoTooltip({
            autoHide: true,
            filter: "div",
            content: kendo.template($("#templateTooltip").html()),
            position: "bottom",
            show: function (e) {
                console.log(e.sender.element);
            }
        });
    })
}

function CheckKhoi(khoi) {
    if (khoi.TenLop.indexOf(khoi) > 0) {
        return true;
    }
}

function LoadComboCaHoc() {
    $.ajax({
        url: '/DanhMuc/GetAll_CaHoc',
        type: 'GET'
    }).done(function (response) {
        if ($("#comboCa").data("kendoComboBox") == undefined) {
            $("#comboCa").kendoComboBox({
                dataTextField: "TenCa",
                dataValueField: "ID",
                clearButton: false,
                dataSource: new kendo.data.DataSource({
                    data: response
                }),
                change: function (e) {
                    LoadHocSinhTrongLop($("#comboLop").data("kendoComboBox").value());
                }
            });
        } else {

        }
        $("#comboCa").data("kendoComboBox").value(1);

    })
}

function LoadComboLop(khoi) {
    $.ajax({
        url: '/Lop/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var ds = [];
        if (khoi > 0) {
            ds = response.filter(x => parseInt(x.TenLop.substring(0, 2)) == parseInt(khoi));
        } else {
            ds = response;
        }
        var dataSource = new kendo.data.DataSource({
            data: ds
        });
        if ($("#comboLop").data("kendoComboBox") == undefined) {
            $("#comboLop").kendoComboBox({
                dataTextField: 'TenLop',
                dataValueField: 'ID',
                clearButton: false,
                dataSource: dataSource,
                change: function (e) {
                    LoadHocSinhTrongLop(e.sender.value());
                }
            })
        } else {
            $("#comboLop").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function LoadHocSinhTrongLop(id) {
    if (id > 0) {
        kendo.ui.progress($("#gridDiemDanh"), true);
        $.ajax({
            url: '/DiemDanh/GetDSHocSinh_DiemDanh?ID_Lop=' + id + "&Ca=" + $("#comboCa").data("kendoComboBox").value(),
            type: 'GET',
        }).done(function successCallback(response) {
            if (typeof response == "string") {
                location.reload(true);
            }
            var dataSource = new kendo.data.DataSource({
                data: response,
                schema: {
                    model: {
                        id: "ID",
                        fields: {
                            NgaySinh: {
                                type: 'date', editable: false
                            },
                            GhiChu: { type: 'text', editable: true },
                            Diem: { type: 'text', editable: true },
                            TenHocSinh: { type: 'text', editable: false },
                            DienThoaiMacDinh: { type: 'text', editable: false },
                        }
                    }
                },
                pageSize: 100,
            });
            $("#gridDiemDanh").data("kendoGrid").setDataSource(dataSource);
            LoadAnhDiemDanh(id, $("#comboCa").data("kendoComboBox").value(), new Date());
            kendo.ui.progress($("#gridDiemDanh"), false);
        });
    }
}

function DiemDanh(ID_HocSinh, HocDuoi, GhiChu, Diem) {
    kendo.ui.progress($("#gridDiemDanh"), true);
    let data = {
        ID: 0,
        ID_Lop: $("#comboLop").data("kendoComboBox").value(),
        ID_HocSinh: ID_HocSinh,
        CoPhep: 0,
        Diem: Diem,
        GhiChu: GhiChu == "null" ? "" : GhiChu,
        HocDuoi: HocDuoi ? 1 : 0,
        Ca: $("#comboCa").data("kendoComboBox").value()
    }
    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function successCallback(response) {
        if (typeof response == "string") {
            location.reload(true);
        }
        $("#cophep" + ID_HocSinh).removeAttr("checked");
        $("#vangmat" + ID_HocSinh).removeAttr("checked");
        kendo.ui.progress($("#gridDiemDanh"), false);
    })
}
function CoPhep(ID_HocSinh, HocDuoi, GhiChu, Diem) {
    kendo.ui.progress($("#gridDiemDanh"), true);
    let data = {
        ID: 0,
        ID_Lop: $("#comboLop").data("kendoComboBox").value(),
        ID_HocSinh: ID_HocSinh,
        CoPhep: 1,
        Diem: Diem,
        GhiChu: GhiChu == "null" ? "" : GhiChu,
        HocDuoi: HocDuoi ? 1 : 0,
        Ca: $("#comboCa").data("kendoComboBox").value()
    };
    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function successCallback(response) {
        if (typeof response == "string") {
            location.reload(true);
        }
        if (($("#comat" + ID_HocSinh + ":checked")[0]) || ($("#vangmat" + ID_HocSinh + ":checked")[0])) {
            $("#comat" + ID_HocSinh).removeAttr("checked");
            $("#vangmat" + ID_HocSinh).removeAttr("checked");

        } else {
        }
        kendo.ui.progress($("#gridDiemDanh"), false);
    })

}
function VangMat(ID_HocSinh, HocDuoi, GhiChu, Diem) {
    kendo.ui.progress($("#gridDiemDanh"), true);
    let data = {
        ID: 0,
        ID_Lop: $("#comboLop").data("kendoComboBox").value(),
        ID_HocSinh: ID_HocSinh,
        CoPhep: -1,
        Diem: Diem,
        GhiChu: GhiChu == "null" ? "" : GhiChu,
        HocDuoi: HocDuoi ? 1 : 0,
        Ca: $("#comboCa").data("kendoComboBox").value()
    };
    $.ajax({
        url: '/DiemDanh/DiemDanhHocSinh',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function successCallback(response) {
        if (typeof response == "string") {
            location.reload(true);
        }
        $("#cophep" + ID_HocSinh).removeAttr("checked");
        $("#comat" + ID_HocSinh).removeAttr("checked");
        kendo.ui.progress($("#gridDiemDanh"), false);
    })

}
function XemSoDo() {
    $("#anhsodo").css("background-image", "");
    $.ajax({
        url: '/Lop/GetById?ID=' + $("#comboLop").data("kendoComboBox").value(),
        type: 'GET',

    }).done(function successCallback(response) {
        $("#anhsodo").css("background-image", "url(../Images/SoDoLop/" + response.SoDoLop + ")");
        $("#windowSoDo").data("kendoWindow").maximize().open();
    })
}

function LoadLaiDuLieu() {
    LoadHocSinhTrongLop($("#comboLop").data("kendoComboBox").value())
}