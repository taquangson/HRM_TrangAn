var selectedDanhMuc;
var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
$(document).ready(function () {
    MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
    MathJax.Hub.Config({ tex2jax: { displayMath: [['$$', '$$'], ['\\(', '\\)']] } });

    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#treeview").kendoTreeView({
        dataTextField: "TenDanhMucCauHoi",
        dataValueField: "ID",
        select: function (e) {
            selectedDanhMuc = $("#treeview").getKendoTreeView().dataItem(e.node)
            LoadGridCauHoi();
        },
    });
    $("#gridCauHoi").kendoGrid({
        height: function () {
            var height = $(window).height() - 155;
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
                hidden: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell-checkbox"
                }
            },
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaKhoiNhom(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 60,
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi' style='width:100%; height:25px;' onclick='openWindowCauHoi()'><i class='fa fa-plus'></i></a>")
                        }
                    }
                },
            },
            {
                title: "STT",
                template: "#= ++record #",
                width: "80px",
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "NoiDungCauHoi",
                title: "Nội dung",
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
                field: "SoDapAn",
                title: "Số đáp án",
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
                field: "SoDapAnDung",
                title: "Đáp án đúng",
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
                field: "TenTaiKhoan",
                title: "Người tạo",
                width: "15%",
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
    $("#gridDapAn").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_CauHoi: { type: 'number', editable: false },
                        DapAn: { type: 'text', editable: true },
                        AnhDapAn: { type: 'text', editable: true },
                        IsDapAnDung: { type: 'boolean', editablle: true }
                    }
                }
            },
            pageSize: 100
        }),
        editable: true,
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
        dataBound: function (e) {
            var grid = this;
            this.tbody.find("input[name=files]").kendoUpload({
                multiple: false,
                select: function (e) {
                    var fileInfo = e.files[0];
                    setTimeout(function () {
                        var item = grid.dataItem(e.sender.element.closest("tr"));
                        PushFormDataFileGrid(fileInfo, item);
                    })
                },
                remove: function (e) {
                    var item = grid.dataItem(e.sender.element.closest("tr"));
                    item.HinhAnh = "";
                }
            }).closest(".k-upload").find("span").text("Chọn ảnh đáp án");;
        },
        save: function (e) {
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                });
            })
        },
        columns: [
            {
                title: " ",
                field: 'ID',
                template: function (e) {
                    return "<i onclick='XoaDapAn(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 30,
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi' style='width:100%; height:25px;' onclick='ThemDapAn()'><i class='fa fa-plus'></i></a>")
                        }
                    }
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
                field: "DapAn",
                title: "Nội dung đáp án",
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
                editor: function (container, options) {
                    let html = "<textarea class='k-textbox' rows='2' name='" + options.field + "'></textarea>";
                    $(html).appendTo(container);
                }
            },
            {
                field: "AnhDapAn",
                title: "Ảnh đáp án",
                width: "80px",
                template: function (e) {
                    if (e.AnhDapAn != null && e.AnhDapAn != "") {
                        return "<input type='file' style='display:none' name='files' /><a href='../Images/AnhDapAn/" + e.AnhDapAn + "' target='_blank'><img src='../Images/AnhDapAn/" + e.AnhDapAn + "' class='avatar' style ='float:none;'></a>";
                    } else {
                        return "<input type='file' name='files' />";
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
                attributes: { class: "text-center" },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "IsDapAnDung",
                title: "Đáp án đúng",
                width: "80px",
                template: function (e) {
                    if (e.IsDapAnDung) {
                        return "Đúng"
                    } else {
                        return "Sai"
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
            }

        ]

    });
    $("#windowDanhMuc").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin danh mục câu hỏi"
    });
    $("#windowCauHoi").kendoWindow({
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin câu hỏi"
    });
    $("#DanhMucCha").kendoDropDownTree({
        placeholder: "Chọn danh mục cha",
        dataTextField: "TenDanhMucCauHoi",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: true
    })
    $("#DanhMuc").kendoDropDownTree({
        placeholder: "Chọn danh mục câu hỏi",
        dataTextField: "TenDanhMucCauHoi",
        dataValueField: "ID",
        valuePrimitive: true,
        autoBind: true
    })
    $("#NoiDung").kendoEditor({
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
    $("#AnhCauHoi").kendoUpload({
        multiple: false,
        localization: {
            select: 'Tải ảnh câu hỏi',
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
    loadTreeview();
    $("#gridCauHoi").kendoTooltip({
        autoHide: true,
        filter: "tr[role='row']",
        content: function (e) {
            var dataItem = $("#gridCauHoi").data("kendoGrid").dataItem(e.target.closest("tr"));
            var temp = kendo.template($("#templateCauHoiTooltip").html());
            return temp(dataItem);
        },
        show: function () {
            //setTimeout(function () {
                //var tooltip = document.getElementById("content-answer");
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'TFS']);
            //}, 1000)

        }
    });
})

function ThemDanhMuc() {
    document.getElementById("formDanhMuc").reset();
    $("#ID").val(0);
    $("#windowDanhMuc").data("kendoWindow").center().open();
}

function HuyDanhMuc() {
    document.getElementById("formDanhMuc").reset();
    $("#ID").val(0);
    $("#windowDanhMuc").data("kendoWindow").close();
}

function SuaDanhMuc() {
    document.getElementById("formDanhMuc").reset();
    $("#ID").val(selectedDanhMuc.ID);
    $("#TenDanhMucCauHoi").val(selectedDanhMuc.TenDanhMucCauHoi);
    setTimeout(function () {
        $("#DanhMucCha").data("kendoDropDownTree").value(selectedDanhMuc.ID_Cha);
    })
    $("#windowDanhMuc").data("kendoWindow").center().open();
}

function LuuDanhMuc() {
    var validten = SetValidate("TenDanhMucCauHoi");
    var validcha = SetValidate("DanhMucCha");
    var valid = validten && validcha;
    if (valid) {
        $.ajax({
            url: '/TracNghiem/DanhMucCauHoi_InsertOrUpdate',
            data: {
                ID: $("#ID").val(),
                TenDanhMucCauHoi: $("#TenDanhMucCauHoi").val(),
                ID_Cha: $("#DanhMucCha").data("kendoDropDownTree").value()
            },
            type: 'POST'
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyDanhMuc();
                loadTreeview();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }

}


function loadTreeview() {
    $.ajax({
        url: '/TracNghiem/GetTreeDanhMucCauHoi',
        type: 'GET'
    }).done(function (response) {
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstDanhMuc"
                }
            }
        })

        var dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstDanhMuc"
                }
            }
        })

        $("#treeview").data("kendoTreeView").setDataSource(dataSource);

        $("#treeview").data("kendoTreeView").expand(".k-item");

        $("#DanhMucCha").data("kendoDropDownTree").setDataSource(dataSourceCombo);
        $("#DanhMuc").data("kendoDropDownTree").setDataSource(dataSourceCombo);

        //$("#treeview").data("kendoTreeView").select(".k-first");
        $("#gridCauHoi").on("dblclick", "tr[role='row']", function () {
            $("#gridCauHoi").data("kendoGrid").clearSelection();
            var row = $("#gridCauHoi").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
            $("#gridCauHoi").data("kendoGrid").select(row);
            openEditWindow();
        })
    })
}

function openWindowCauHoi() {
    HuyCauHoi();
    $("#windowCauHoi").data("kendoWindow").center().open().maximize();
}

function PushFormDataFile(file) {
    var data = new FormData();
    data.append('file', file.rawFile, file.name);
    var t = $.ajax({
        url: '/TracNghiem/UploadAnh',
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            let img = '<img src="../Images/AnhCauHoi/' + response.msg + '" alt="" width="200" />'
            $("#AnhCauHoi").data("kendoUpload").clearAllFiles();
            var editor = $("#NoiDung").data("kendoEditor");
            editor.value(editor.value() + img);

            var range = editor.getRange() || editor.createRange();
            range.selectNodeContents(editor.body);
            range.collapse(false); //colapse to end
            editor.selectRange(range);
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function insertLatex() {
    $("#test").html($("#latex_syntax").val());
    var math = document.getElementById("test");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
}

function PushFormDataFileGrid(fileInfo, item) {
    var data = new FormData();
    data.append('file', fileInfo.rawFile, fileInfo.name);
    var t = $.ajax({
        url: "/TracNghiem/UploadAnhDapAn",
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: "Upload thành công" }, "success");
            item.AnhDapAn = response.msg;
            $("#gridDapAn").data("kendoGrid").refresh();
        } else {
            notification.show({ kValue: "Upload thất bại, vui lòng thử lại" }, "error");
        }
    });
}

function ThemDapAn(e) {
    var grid = $("#gridDapAn").data("kendoGrid");
    grid.addRow();
}

function XoaDapAn(uid, id) {
    var dataRow = $('#gridDapAn').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridDapAn').data("kendoGrid").dataSource.remove(dataRow);
}

function HuyCauHoi() {
    document.getElementById("formCauHoi").reset();
    var ds = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    ID_CauHoi: { type: 'number', editable: false },
                    DapAn: { type: 'text', editable: true },
                    AnhDapAn: { type: 'text', editable: true },
                    IsDapAnDung: { type: 'boolean', editablle: true }
                }
            }
        },
        pageSize: 100
    });
    $("#gridDapAn").data("kendoGrid").setDataSource(ds);
    $("#NoiDung").data("kendoEditor").value("");
    $("#ID_CauHoi").val('0');
    $("#windowCauHoi").data("kendoWindow").close();
}

function LuuCauHoi() {
    var validdanhmuc = SetValidate("DanhMuc");
    var validnoidung = SetValidate("NoiDung");
    var valid = validdanhmuc && validnoidung;
    if (valid) {
        var cauhoi = {
            ID: $("#ID_CauHoi").val(),
            NoiDungCauHoi: $("#NoiDung").data("kendoEditor").value(),
            ID_DanhMucCauHoi: $("#DanhMuc").data("kendoDropDownTree").value()
        };
        var dsdapan = [];
        $.each($("#gridDapAn").data("kendoGrid").dataSource.data(), function (index, item) {
            dsdapan.push({
                ID: item.ID,
                ID_CauHoi: $("#ID_CauHoi").val(),
                DapAn: item.DapAn,
                AnhDapAn: item.AnhDapAn,
                IsDapAnDung: item.IsDapAnDung ? 1 : 0,
            })
        })
        cauhoi.lstDapAn = dsdapan;
        $.ajax({
            url: '/TracNghiem/CauHoi_InsertOrUpdate',
            type: 'POST',
            data: cauhoi
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyCauHoi();
                LoadGridCauHoi();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
    //}
}

function LoadGridCauHoi() {
    $.ajax({
        url: '/TracNghiem/GetCauHoiByDanhMuc?ID_DanhMuc=' + selectedDanhMuc.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridCauHoi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridCauHoi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridCauHoi"), false);
    });
}



function openEditWindow() {
    var arr = $("#gridCauHoi").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#windowCauHoi").data("kendoWindow").center().maximize().open();
        console.log(selectedItem);
        var selectedItem = $("#gridCauHoi").data("kendoGrid").dataItem($("#gridCauHoi").data("kendoGrid").select());
        $("#ID_CauHoi").val(selectedItem.ID);
        $("#NoiDung").data("kendoEditor").value(selectedItem.NoiDungCauHoi);
        $("#DanhMuc").data("kendoDropDownTree").value(selectedItem.ID_DanhMucCauHoi);
        var data = [];
        $.each(selectedItem.lstDapAn, function (index, item) {
            data.push({
                ID: item.ID,
                ID_CauHoi: item.ID_CauHoi,
                DapAn: item.DapAn,
                AnhDapAn: item.AnhDapAn,
                IsDapAnDung: item.IsDapAnDung == 1 ? true : false
            })
        })
        var ds = new kendo.data.DataSource({
            data: data,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_CauHoi: { type: 'number', editable: false },
                        DapAn: { type: 'text', editable: true },
                        AnhDapAn: { type: 'text', editable: true },
                        IsDapAnDung: { type: 'boolean', editablle: true }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridDapAn").data("kendoGrid").setDataSource(ds);
    }
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}