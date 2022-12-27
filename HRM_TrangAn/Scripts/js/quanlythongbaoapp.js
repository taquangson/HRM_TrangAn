var iconThongBao = "logodh.png";
$(document).ready(function () {
    LoadComboLop(0);
    LoadComboHocSinh(0);
    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 260;
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
                field: "ThongBao",
                title: "Thông báo",
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
                field: "ThoiGianGui",
                title: "Thời gian gửi",
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
            }
        ]

    });

    $("#gridHocSinhTrongLop").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
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
                field: "NotifyID",
                title: "Đã cài app",
                width: "50px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.addClass("k-textbox").css("width", "100%")
                        }
                    }
                },
                template: function (e) {
                    if (e.NotifyID != null) {
                        return "<i style='color:green;font-size:25px;' class='fa fa-check'></i>"
                    } else {
                        return "";
                    }
                },
                attributes: {
                    style: "text-align: center"
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
            }
        ]
    });

    $("#windowThongBao").kendoWindow({
        title: "Nội dung thông báo cho mobile",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ],
        close: function () {
        }
    });

    $("#NoiDungHTML").kendoEditor({
        tools: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent",
            "createLink",
            "unlink",
            "insertImage",
            "insertFile",
            "subscript",
            "superscript",
            "tableWizard",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "mergeCellsHorizontally",
            "mergeCellsVertically",
            "splitCellHorizontally",
            "splitCellVertically",
            "viewHtml",
            "formatting",
            "cleanFormatting",
            "copyFormat",
            "applyFormat",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor",
            "print"
        ],
        messages: {
            bold: "Bold",
            italic: "Italic",
            underline: "Underline",
            strikethrough: "Strikethrough",
            superscript: "Superscript",
            subscript: "Subscript",
            justifyCenter: "Center text",
            justifyLeft: "Align text left",
            justifyRight: "Align text right",
            justifyFull: "Justify",
            insertUnorderedList: "Insert unordered list",
            insertOrderedList: "Insert ordered list",
            indent: "Indent",
            outdent: "Outdent",
            createLink: "Insert hyperlink",
            unlink: "Remove hyperlink",
            insertImage: "Thêm ảnh",
            insertFile: "Thêm file",
            insertHtml: "Thêm mã html",
            fontName: "Chọn font chữ",
            fontNameInherit: "(Mặc định)",
            fontSize: "Chọn cỡ chữ",
            fontSizeInherit: "(Mặc định)",
            formatBlock: "Định dạng",
            formatting: "Định dạng",
            style: "Styles",
            viewHtml: "Xem dưới dạng mã html",
            overwriteFile: "Tệp có tên \"{0}\" đã tồn tại trong thư mục. Bạn có muốn ghi đè?",
            imageWebAddress: "Địa chỉ ảnh",
            imageAltText: "Mô tả ảnh",
            fileWebAddress: "Địa chỉ file",
            fileTitle: "Mô tả file",
            linkWebAddress: "Link web",
            linkText: "Mô tả",
            linkToolTip: "Chữ nổi",
            linkOpenInNewWindow: "Mở link trên tab mới",
            dialogInsert: "Thêm",
            dialogUpdate: "Cập nhật",
            dialogCancel: "Hủy",
            dialogCancel: "Hủy",
            createTable: "Tạo bảng",
            addColumnLeft: "Thêm cột bên trái",
            addColumnRight: "Thêm cột bên phải",
            addRowAbove: "Thêm dòng bên trên",
            addRowBelow: "Thêm dòng bên dưới",
            deleteRow: "Xóa dòng",
            deleteColumn: "Xóa cột",
            imageWidth: "Độ rộng (px)",
            imageHeight: "Độ cao (px)"
        }
    });


    $("#file").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải ảnh icon thông báo',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".jpg", ".png", ".jpeg", ".ico"],
        select: function (e) {
            let files = e.files[0];
            if (files.extension.toLowerCase() != ".jpg" && files.extension.toLowerCase() != ".png" && files.extension.toLowerCase() != ".jpeg") {
                e.preventDefault();
                notification.show({ kValue: "Vui lòng chọn đúng định dạng" + " .jpg;.png;.jpeg;.ico" }, "error");
            } else {
                PushFormDataFile(e.files[0]);
            }
        }
    });

    setInterval(function () { $("#thoigian").text(kendo.toString(new Date(), 'HH:mm dd/MM/yyyy')); }, 1000);
})

function updateTitle() {
    $("#titleapp1").text($("#TieuDe").val());
    $("#titleapp2").text($("#TieuDe").val());
}
function updateContent() {
    $("#contentapp1").text($("#NoiDung").val().substring(0, 50));
    $("#contentapp2").text($("#NoiDung").val());
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
            pageSize: 5000,
        });
        $("#gridHocSinhTrongLop").data("kendoGrid").setDataSource(dataSource);
        //kendo.ui.progress($("#gridHocSinhTrongLop"), false);       
    });
}

function sendThongBao() {
    var bangDuLieu = $("#gridHocSinhTrongLop").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thông báo cho " + bangDuLieu.select().length + " phụ huynh đã chọn?</b>", function () { pushNoti(bangDuLieu); }, function () { });
    } else {
        notification.show({ kValue: "Chưa chọn phụ huynh học sinh nào để gửi thông báo!" }, "error");
    }
}

function pushNoti(grid) {
    let model = {
        Users: [],
        Tokens: [],
        TieuDe: $("#TieuDe").val(),
        NoiDung: $("#NoiDung").val(),
        NoiDungHTML: $("#NoiDungHTML").data("kendoEditor").value(),
        NoiDungRieng: $("#NoiDungRieng").val(),
        AnhDaiDien: iconThongBao
    };
    $.each(grid.select(), function (index, item) {
        let dataitem = grid.dataItem(item);
        model.Users.push(dataitem.DienThoaiMacDinh);
        model.Tokens.push(dataitem.NotifyID);
    });

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
}

function PushFormDataFile(file) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/ThongBaoApp/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            let html = '<div class="photo" style="background-image: url(\'../Images/AnhThongBao/' + response.msg + '\')" data-role="page">'
                + '</div>';
            iconThongBao = response.msg;
            $("#iconThongBao").html(html);
            $("#file").data("kendoUpload").clearAllFiles();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}


function openThongBaoWindow() {
    $("#windowThongBao").data("kendoWindow").maximize().open();
}

function huyGuiThongBao() {
    $("#windowThongBao").data("kendoWindow").close();
    resetFormThongBao();
}

function resetFormThongBao() {

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
                dataSource: dataSource,
                filter: "startswith",
                change: function (e) {
                    LoadComboHocSinh(e.sender.value());
                }
            })
            $("#comboLop2").kendoComboBox({
                dataTextField: 'TenLop',
                dataValueField: 'ID',
                dataSource: dataSource,
                filter: "startswith",
                change: function (e) {
                    LoadHocSinhTrongLop(e.sender.value());
                }
            })
        } else {
            $("#comboLop").data("kendoComboBox").setDataSource(dataSource);
            $("#comboLop2").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function LoadComboHocSinh(lop) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + lop,
        type: 'GET',
    }).done(function successCallback(response) {
        var data = []
        $.each(response, function (index, item) {
            data.push({
                DienThoaiMacDinh: item.DienThoaiMacDinh + " - " + item.TenHocSinh,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        if ($("#comboHocSinh").data("kendoComboBox") == undefined) {
            $("#comboHocSinh").kendoComboBox({
                dataTextField: 'DienThoaiMacDinh',
                dataValueField: 'ID',
                filter: "contains",
                dataSource: dataSource, placeholder: "Tất cả..."

            })
        } else {
            $("#comboHocSinh").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}