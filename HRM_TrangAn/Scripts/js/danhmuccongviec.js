$(".main_container").hide();
$(document).ready(function () {
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        //editable: { mode: "incell" },
        //save: function (e) {
        //    console.log(e);
        //    openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        //},
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách công việc";
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
        //Danh sách cột của bảng dữ liệu
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
                field: "TenCongViec",
                title: "Tên công việc",
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
                field: "MaCongViec",
                title: "Mã công việc",
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
                field: "Cong",
                title: "Công lao động",
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
                title: "Thời gian/Ngày",
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
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },

        ]

    });
    $("#gridImport").kendoGrid({
        height: function () {
            var height = $(window).height() - 300;
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
        pageable: false,
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                field: "STT",
                title: "STT",
                width: "50px",
                filterable: false,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenCongViec",
                title: "Tên công việc",
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
                field: "MaCongViec",
                title: "Mã công việc",
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
                field: "Cong",
                title: "Công lao động",
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
                title: "Thời gian/Ngày",
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
                    style: "text-align: center;",
                    class: "table-header-cell"
                }
            },

        ]

    });
    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#windowImport").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Nhập liệu từ file excel",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });

    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        openEditWindow();
    })

    $("#file").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải file dữ liệu đầu vào',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".xls", ".xlsx"],
        select: function (e) {
            PushFormDataFile(e.files[0]);
        }
    });

    function PushFormDataFile(file) {
        kendo.ui.progress($("#gridImport"), true);
        parseExcel(file.rawFile);
    }

    LoadGridData();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();

})

function parseExcel(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //workbook.SheetNames.forEach(function (sheetName) {
            // Here is your object
            var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]]);
            var json_object = JSON.stringify(XL_row_object);

            jsondata = JSON.parse(json_object);
            $.each(jsondata, function (index, item) {
                item.STT = index + 1;
                item.TenCongViec = item.TenCongViec;
                item.ThoiGian = item.ThoiGian;
                item.Cong = Number(item.Cong);
                item.MaCongViec = item.MaCongViec;
                item.GhiChu = item.GhiChu;
            })
            //lenght = jsondata.length;
            var dsgrid = new kendo.data.DataSource({
                data: jsondata,
                //pageSize: 50
            });
        if (ValidateList(jsondata)) {
            $("#gridImport").data("kendoGrid").setDataSource(dsgrid);
            notification.show({ kValue: "Tải dữ liệu thành công" }, "success");

        } else {
            notification.show({ kValue: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại file" }, "error");

        };
        kendo.ui.progress($("#gridImport"), false);
        //})

    };

    reader.onerror = function (ex) {
        console.log(ex);
    };

    reader.readAsBinaryString(file);

};

function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#ID").val(selectedItem.ID);
        $("#TenCongViec").val(selectedItem.TenCongViec);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaCongViec").val(selectedItem.MaCongViec);
        $("#CongLaoDong").val(selectedItem.Cong);
        $("#ThoiGian").val(selectedItem.ThoiGian);

        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}
function openCopyWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để nhân bản");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#ID").val('');
        $("#TenCongViec").val(selectedItem.TenCongViec);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#MaCongViec").val(selectedItem.MaCongViec);
        $("#CongLaoDong").val(selectedItem.Cong);
        $("#ThoiGian").val(selectedItem.ThoiGian);

        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}

function LoadGridData() {
    $.ajax({
        url: '/DanhMucCongViec/GetAllDanhMucCongViec',
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false);
    });
}

function ThemMoi() {
    Huy();
    if ($(window).width() > 800) {
        $("#window").data("kendoWindow").center().open();
    } else {
        $("#window").data("kendoWindow").center().maximize().open();
    }
}

function openPhanQuyen(id) {
    $("#ID_TaiKhoan").val(id);
    GetQuyen();
    if ($(window).width() > 800) {
        $("#windowPhanQuyen").data("kendoWindow").center().open();
    } else {
        $("#windowPhanQuyen").data("kendoWindow").center().maximize().open();
    }
}

function ValidateForm(callback) {
    var validten = SetValidate("TenCongViec");
    var validma = SetValidate("MaCongViec");
    var validcong = SetValidate("CongLaoDong");
    var validtg = SetValidate("ThoiGian");

    var valid = validma && validten && validcong && validtg;
    if (valid) {
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            CheckMa($("#MaCongViec").val(), function (stt) {
                callback(stt);
            })

        } else {
            var grid = $("#grid").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            if ($("#MaCongViec").val() !== selectedItem.MaCongViec || ($("#ID").val() == '')) {
                CheckMa($("#MaCongViec").val(), function (stt) {
                    callback(stt);
                })
            } else {
                callback(valid);
            }
        }

    } else {
        callback(valid);
    }
}

function CheckMa(ma, callback) {
    $.ajax({
        url: '/DanhMucCongViec/GetByMaDanhMucCongViec?MaCongViec=' + ma,
        type: 'GET',
    }).done(function successCallback(response) {
        console.log("response", response)
        if (response.length > 0) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Mã công việc đã tồn tại");

            callback(false)
        } else {
            callback(true)
        }
    })
}

function Luu() {
    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/DanhMucCongViec/InsertOrUpdate_DanhMucCongViec',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenCongViec: $("#TenCongViec").val(),
                    GhiChu: $("#GhiChu").val(),
                    MaCongViec: $("#MaCongViec").val(),
                    Cong: $("#CongLaoDong").val(),
                    ThoiGian: $("#ThoiGian").val(),
                }
            }).done(function successCallback(response) {
                //response controller này trả về success và msg
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    LoadGridData();
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });
        }
    })

}

//function LuuList(data) {
//    $.each(data, function (index, item) {
//        $.ajax({
//            url: '/DanhMucCongViec/InsertOrUpdate_DanhMucCongViec',
//            type: 'POST',
//            data: item
//        }).done(function successCallback(response) {
//            if (response.success) {
//                LoadGridData();
//                //notification.show({ kValue: response.msg }, "success");
//            } else {
//                //notification.show({ kValue: response.msg }, "error");
//            }
//        });
//    });
//    notification.show({ kValue: "Xử lý excel nhập liệu thành công!" }, "success");
//    $("#windowImport").data("kendoWindow").close();
//    LoadGridData();
//}

function ValidateList(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (ValidateData(item)) {
            if (i == (data.length - 1)) {
                return true
            }
        } else {
            return false
        }
    }

}

function ValidateData(item) {
    var validten = CheckValidItem(item.TenCongViec);
    var validma = CheckValidItem(item.MaCongViec);
    var validcong = Number(item.Cong) >= 0;
    var validtg = CheckValidItem(item.ThoiGian);
    var valid = validma && validten && validcong && validtg;
    return valid
}
function CheckValidItem(item) {
    var valid = item !== "" && item != undefined;
    return valid
}
function LuuList(data) {
    if (ValidateList(data)) {
        $.ajax({
            url: '/DanhMucCongViec/InsertOrUpdate_ListDanhMucCongViec',
            type: 'POST',
            data: {
                list: data
            }
        }).done(function successCallback(response) {
            if (response.success) {
                LoadGridData();
                notification.show({ kValue: response.msg }, "success");
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
            $("#windowImport").data("kendoWindow").close();

        });
    } else {
        notification.show({ kValue: "Dữ liệu không hợp lệ" }, "error");
        $("#windowImport").data("kendoWindow").close();

    }
    
}

function CheckDublicate(arrayOfObjects ) {
    const resultArray = [];
    //arrayOfObjects.map(item => {
    //    //for each item in arrayOfObjects check if the object exists in the resulting array
    //    if (resultArray.find(object => {
    //        if (object.MaCongViec === item.MaCongViec) {
    //            //if the object exists iterate times
    //            object.times++;
    //            return true;
    //            //if it does not return false
    //        } else {
    //            return false;
    //        }
    //    })) {

    //    } else {
    //        //if the object does not exists push it to the resulting array and set the times count to 1
    //        item.times = 1;
    //        resultArray.push(item);
    //    }
    //})
    const lookup = arrayOfObjects.reduce((a, e) => {
        a[e.MaCongViec] = ++a[e.MaCongViec] || 0;
        return a;
    }, {});
    console.log(arrayOfObjects.filter(e => lookup[e.MaCongViec]));

    return arrayOfObjects.filter(e => lookup[e.MaCongViec])
}

function LuuImport() {
    var data = $("#gridImport").data("kendoGrid").dataSource.data();
    var valid_data = [];
    var check_data = [];
    var checkall_data = [];

    var count = 0;
    var grid_data = $("#grid").data("kendoGrid").dataSource.data();
    $.each(data, function (index, item) {
        check_data.push({
            TenCongViec: item.TenCongViec,
            Cong: Number(item.Cong),
            MaCongViec: item.MaCongViec,
            ThoiGian: item.ThoiGian,
            GhiChu: item.GhiChu
        })
        checkall_data.push({
            TenCongViec: item.TenCongViec,
            Cong: Number(item.Cong),
            MaCongViec: item.MaCongViec,
            ThoiGian: item.ThoiGian,
            GhiChu: item.GhiChu
        })
        
    });
    $.each(grid_data, function (index, item) {
        checkall_data.push({
            TenCongViec: item.TenCongViec,
            Cong: Number(item.Cong),
            MaCongViec: item.MaCongViec,
            ThoiGian: item.ThoiGian,
            GhiChu: item.GhiChu
        })
    });
    var dubAll_data = CheckDublicate(checkall_data);
    var dub_data = CheckDublicate(check_data);
    if (dub_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã công việc không được trùng nhau: " + dub_data[0].MaCongViec }, "error");
    } else if (dubAll_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã công việc đã tồn tại trong hệ thống: " + dub_data[0].MaCongViec }, "error");
    } else {
        $.each(data, function (index, item) {
            valid_data.push({
                TenCongViec: item.TenCongViec,
                Cong: Number(item.Cong),
                MaCongViec: item.MaCongViec,
                ThoiGian: item.ThoiGian,
                GhiChu: item.GhiChu
            })
            count++;
        });
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn nhập " + count + " bản ghi danh mục công việc từ file excel?</b>", function () { LuuList(valid_data); }, function () { });
    }
    
    console.log(valid_data);
}

function OpenDanhMucLoi() {
    var windowOption = {
        width: "30%",
        height: "10%",
        title: "Thêm danh mục lỗi vi phạm"
    }
    OpenLayoutWindow('/DanhMuc/DanhMucLoi', windowOption);
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function HuyImport() {
    document.getElementById("formImport").reset();
    $("#windowImport").data("kendoWindow").close();
    $("#gridImport").data("kendoGrid").clearSelection();
}

function DownloadTemp() {
    // UpdateTemplate()
    //
    //$.ajax({
    //    url: '/DanhMucCongViec/UpdateTemplate',
    //    type: 'GET'
    //}).done(function (response) {
    //    if (response.success) {
            //window.open('../Content/ExcelTemplate/Temp_DanhMucCongViec.xlsx', '_blank')
    //    } else {
    //        notification.show({ kValue: response.msg }, "error");
    //    }
    //})
    window.open('../Content/ExcelTemplate/Temp_DanhMucCongViec.xlsx', '_blank')

   
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " danh mục công việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
        //notification.show({kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
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
        url: '/DanhMucCongViec/DeleteMulti_DanhMucCongViec?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            LoadGridData();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
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

function NhapExcel() {
    $("#windowImport").data("kendoWindow").center().maximize().open();
}