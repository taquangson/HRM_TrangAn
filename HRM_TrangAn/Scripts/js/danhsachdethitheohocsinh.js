
var selectedDanhMuc;
var lstCauHoiTrongDe = [];
var lstIDCauHoiTrongDe = [];
var lstIDHocSinhTrongDe = [];
var ID_CurrentQuest = 0;
var currentQuest;
var lstTraLoi = [];
var dataSourceCombo;
var count = 1;
var timers = 0;
var maxTime = 0;
var count_AlertChangeTab = 60000;
var timerInterval;
var timerInterval_counrtAlert;
var niemphongInterval;
var isTamDung = null;
var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
$(document).ready(function () {
    MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
    MathJax.Hub.Config({ tex2jax: { displayMath: [['$$', '$$'], ['\\(', '\\)']] } });
    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridDeThi").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
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
                field: "dethi.TenDeThi",
                title: "Tên đề thi",
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
                field: "HanNopBai",
                format: "{0: hh:mm dd/MM/yyyy}",
                title: "Hạn nộp",
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
                field: "HanNiemPhong",
                title: "Niêm phong đề",
                format: "{0: hh:mm dd/MM/yyyy}",
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
                field: "GioiHanLanLam",
                title: "Giới hạn lần làm",
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "SoLanLam",
                template: function (e) {
                    if (e.SoLanLam > 0) {
                        return "<i title='Xem bài làm' onclick='XemChiTietBaiThi(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-eye'>" + e.SoLanLam + "</i>";
                    } else {
                        return "0";
                    }
                },
                title: "Số lần đã làm",
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
                field: "ThoiGianBatDau",
                title: "Lần cuối làm bài",
                format: "{0: hh:mm dd/MM/yyyy}",
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
                field: "Diem",
                title: "Điểm",
                template: function (e) {
                    if (e.Diem > 0) {
                        return e.Diem;
                    } else {
                        return "";
                    }
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Số câu hỏi",
                width: "100px",
                template: function (e) {
                    let count = e.dethi.lstCauHoi.length;
                    //$.each(e.dethi.lstChiTiet, function (index, item) {
                    //    count += item.SoLuongCauHoi;
                    //});
                    return count;
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
                field: "dethi.TenKhoi",
                title: "Khối",
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
                field: "dethi.TenMonHoc",
                title: "Môn học",
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
                field: "dethi.NgayTao",
                title: "Ngày tạo",
                template: function (e) {
                    var dateString = e.dethi.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                field: "dethi.TenTaiKhoan",
                title: "Người tạo",
                width: "10%",
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
                field: "dethi.TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.dethi.TrangThai == 1) {
                        return "Mở";
                    } else {
                        return "Đóng";
                    }
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            },
            {
                title: "Mở đề",
                template: function (e) {
                    if (e.GioiHanLanLam == 0) {
                        return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.dethi.ID + "," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
                    }
                    else if (e.GioiHanLanLam > e.SoLanLam) {
                        return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.dethi.ID + "," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
                    } else {
                        return "";
                    }
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
                },
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]

    });

    $("#windowChiTietBaiThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Kết quả bài thi"
    });
    $("#windowXemDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Bài làm",
        actions: []
    });
    LoadGridDeThi();
    $("#listviewbailam").kendoListView({
        template: kendo.template($("#templatebailam").html()),
        dataBinding: function (e) {
            console.log(e);
            if (e.action == "sync") {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
            }
        }
    });
    //$("#listviewcauhoi").kendoListView({
    //    template: kendo.template($("#templatecauhoi").html())
    //});
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function () {
        if ((screen.height <= screen.width) && (screen.width < 1000)) {
            $("#alertOrientation").show();
            console.log('show');
        } else {
            $("#alertOrientation").hide();
            console.log('hide');
        }
    }, false);

    $(window).blur(function () {
        if (timers > 0 && currentQuest.lstDapAn.length > 0) {
            tamDungBaiThi("Chuyển tab hoặc rời khỏi trang thi");
        }
    });
})

function tamDungBaiThi(type) {
    $("#typeAlert").html(type);
    if (isTamDung == false) {
        isTamDung = true;

        //var wnd = $("#windowXemDeThi").data("kendoWindow");
        //if (wnd.element.is(":hidden") == false) {
        if (timers > 0) {
            clearInterval(timerInterval);
            $("#alertChangetab").show();
            timerInterval_counrtAlert = setInterval(function () {
                if (count_AlertChangeTab == 0) {
                    ketthucbaithi();
                } else {
                    count_AlertChangeTab -= 1000;
                    $("#countAlertChangeTab").text(kendo.toString(new Date(count_AlertChangeTab), 'mm:ss') + " giây");
                }
            }, 1000);
        } else {
            //$("#alertChangetab").hide();
        }
    }
}

function window_resize() {
    if (window.innerHeight != screen.height && currentQuest.lstDapAn.length > 0) {
        tamDungBaiThi("Thoát khỏi trạng thái toàn màn hình");
    }
}

function tiepTucLamBai() {
    isTamDung = false;
    $("#alertChangetab").hide();
    if (timers > 0) {
        clearInterval(timerInterval_counrtAlert);
        timerInterval = setInterval(function () {
            timers += 1000;
            $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
            if (timers >= maxTime) {
                ketthucbaithi();
            }
        }, 1000);
    }
}

function XemChiTietBaiThi(uid, id) {
    $.ajax({
        url: '/TracNghiem/GetBaiLamTracNghiem_ByID?ID_BaiLamTracNghiem=' + id,
        type: 'GET'
    }).done(function successCallback(response) {

        var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
        $("#TenDe").html(dataRow.dethi.TenDeThi);
        $("#TenMon").html(dataRow.dethi.TenMonHoc);
        $("#TenHocSinh").html(dataRow.TenHocSinh);
        $("#NgayLam").html(kendo.toString(dataRow.ThoiGianBatDau, "dd/MM/yyyy"));
        $("#BatDau").html(kendo.toString(dataRow.ThoiGianBatDau, "HH:mm"));
        $("#KetThuc").html(kendo.toString(dataRow.ThoiGianKetThuc, "HH:mm"));
        $("#DiemBaiLam").html(dataRow.Diem);
        count = 1;
        var dataSource = new kendo.data.DataSource({
            data: response.lstChitiet,
        });
        $("#listviewbailam").data("kendoListView").setDataSource(dataSource);
        $("#windowChiTietBaiThi").data("kendoWindow").open().maximize();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
    })
}



function LoadGridDeThi() {
    $.ajax({
        url: '/TracNghiem/GetAllBaiLamTracNghiem_ByHocSinh?' + window.location.href.split("#")[0].split("?")[1],
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            item.SoLanLam = item.lstLichsu.length;
        })
        kendo.ui.progress($("#gridDeThi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        TenHocSinh: {
                            type: 'text',
                            editable: false
                        },
                        DienThoaiMacDinh: {
                            type: 'text',
                            editable: false
                        },
                        Diem: {
                            type: 'number',
                            editable: false
                        },
                        SoLanLam: {
                            type: 'number',
                            editable: false
                        },
                        ThoiGianBatDau: {
                            type: 'date',
                            editable: false
                        },
                        ThoiGianKetThuc: {
                            type: 'date',
                            editable: false
                        },
                        NgaySinh: {
                            type: 'date',
                            editable: false
                        },
                        GioiHanLanLam: {
                            type: 'number',
                            editable: false
                        },
                        HanNiemPhong: {
                            type: 'date',
                            editable: false
                        },
                        HanNopBai: {
                            type: 'date',
                            editable: false
                        }
                    }
                }
            },
            pageSize: 20,
        });
        $("#gridDeThi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridDeThi"), false);
    });
}

function XemTruocDeThi(uid, id_dethi, idbailam) {
    kendo.ui.progress($("#windowXemDeThi"), true);
    isTamDung = false;
    $("#windowXemDeThi").data("kendoWindow").center().open().maximize();
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    if (dataRow.HanNiemPhong != null) {
        if (dataRow.HanNiemPhong > new Date()) {
            $("#btnbatdau").prop('disabled', true);
            $("#btnbatdau").text("Chưa tới giờ thi");
            niemphongInterval = setInterval(function () {
                var seconds = ((dataRow.HanNiemPhong.getTime() - new Date().getTime()) / 1000).toFixed(0);
                $("#btnbatdau").text("Chưa tới giờ thi, còn " + seconds + " giây");
            }, 1000)
        } else {
            $("#btnbatdau").prop('disabled', false);
            $("#btnbatdau").text("Bắt đầu");
            clearInterval(niemphongInterval);
        }
    }
    maxTime = dataRow.dethi.ThoiGian * 60000;

    $("#TenDe").text(dataRow.dethi.TenDeThi);
    $("#TenMon").text(dataRow.dethi.TenMonHoc);
    $("#ThoiGianLamBai").text(dataRow.dethi.ThoiGian);
    $("#ID_BaiLamTracNghiem").val(idbailam);
    let html = '';
    ID_CurrentQuest = dataRow.dethi.lstCauHoi[0].ID;
    currentQuest = dataRow.dethi.lstCauHoi[0];
    lstCauHoiTrongDe = [];
    lstTraLoi = [];
    $.each(dataRow.dethi.lstCauHoi, function (index, item) {
        item.ID_BaiLamTracNghiem = idbailam;
        if (index == 0) {
            html += '<span id="ch' + item.ID + '" class="question-item selected" onclick="loadCauHoi(' + index + ')">Câu ' + (index + 1) + '</span>';
        } else {
            html += '<span id="ch' + item.ID + '" class="question-item" onclick="loadCauHoi(' + index + ')">Câu ' + (index + 1) + '</span>';
        }
        lstCauHoiTrongDe.push(item);
    })
    $(".question-list").html(html);
    $("#btnbatdau").show();
    $("#btnketthuc").hide();
    $(".question-item").hide();

    if ((screen.height <= screen.width) && (screen.width < 1000)) {
        $("#alertOrientation").show();
    } else {
        $("#alertOrientation").hide();
    }
    if (screen.width >= 1000) {
        document.querySelector("#windowXemDeThi").requestFullscreen({ navigationUI: "hide" })
            .then(function () {
                var dialog = $("#windowXemDeThi").data("kendoWindow");
                dialog.bind("resize", window_resize);
            })
            .catch(function (error) {

            });
    }
    kendo.ui.progress($("#windowXemDeThi"), false);
}

function htmlDecode(value) {
    return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function loadCauHoi(index) {
    let cauhoi = lstCauHoiTrongDe[index];
    count = index;
    $("span#ch" + ID_CurrentQuest).removeClass("selected");
    ID_CurrentQuest = cauhoi.ID;
    currentQuest = cauhoi;
    var temp = kendo.template($("#templatecauhoi").html());
    $("#listviewcauhoi").html(temp(lstCauHoiTrongDe[index]));
    if (cauhoi.lstDapAn.length == 0) {
        $("#DapAn").kendoEditor({
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
            },
            change: function () {
                //var cauhoi = currentQuest;
                //$.each(lstCauHoiTrongDe, function (index, item) {
                //    if (item.ID == ID_CurrentQuest) {
                //        cauhoi = item;
                //    }
                //})
                if ($("span#ch" + ID_CurrentQuest).hasClass("answered")) {
                    $.each(lstTraLoi, function (index, item) {
                        if (item.ID_CauHoi == ID_CurrentQuest) {
                            item.TraLoi = $("#DapAn").data("kendoEditor").value()
                        }
                    })
                } else {
                    var item = {
                        ID_BaiLamTracNghiem: $("#ID_BaiLamTracNghiem").val(),
                        ID_CauHoi: currentQuest.ID,
                        TraLoiDung: 0,
                        TraLoi: $("#DapAn").data("kendoEditor").value(),
                        Diem: currentQuest.Diem.toString().replace('.', ',')
                    }
                    lstTraLoi.push(item);
                    $("span#ch" + currentQuest.ID).addClass("answered");
                }
            }
        });
        $("#AnhDapAn").kendoUpload({
            multiple: false,
            localization: {
                select: 'Tải ảnh đáp án',
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
    }
    if ($("span#ch" + cauhoi.ID).hasClass("answered")) {
        $.each(lstTraLoi, function (index, item) {
            if (item.ID_CauHoi == cauhoi.ID) {
                $("#DapAn").data("kendoEditor").value(item.TraLoi);
            }
        })

    }
    $("span#ch" + ID_CurrentQuest).addClass("selected");
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
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
            $("#AnhDapAn").data("kendoUpload").clearAllFiles();
            var editor = $("#DapAn").data("kendoEditor");
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

function updateDapAn(ID_BaiLamTracNghiem, ID_CauHoi, ID_DapAn, IsDapAnDung, Diem) {
    if ($("span#ch" + ID_CauHoi).hasClass("answered")) {
        $.each(lstTraLoi, function (index, item) {
            if (item.ID_CauHoi == ID_CauHoi) {
                item.TraLoi = ID_DapAn;
                item.TraLoiDung = IsDapAnDung;
            }
        })
    } else {
        var item = {
            ID_BaiLamTracNghiem: ID_BaiLamTracNghiem,
            ID_CauHoi: ID_CauHoi,
            TraLoiDung: IsDapAnDung,
            TraLoi: ID_DapAn,
            Diem: Diem
            //Diem: Diem.toString().replace('.', ',')
        }
        lstTraLoi.push(item);
        $("span#ch" + ID_CauHoi).addClass("answered");
    }
}

function batdaulambai() {
    $.ajax({
        url: '/TracNghiem/BaiLamTracNghiem_BatDauLamBai',
        type: 'POST',
        data: {
            ID: $("#ID_BaiLamTracNghiem").val()
        }
    }).done(function successCallback(response) {
        kendo.ui.progress($("#windowXemDeThi"), true);
        loadCauHoi(0);
        isTamDung = false;
        $("#btnbatdau").hide();
        $("#btnketthuc").show();
        $(".question-item").show();
        $("#batdau").text(kendo.toString(new Date(), 'hh:mm dd/MM/yyyy'));
        timerInterval = setInterval(function () {
            timers += 1000;
            $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
            if (timers >= maxTime) {
                ketthucbaithi();
            }
        }, 1000);
        if (screen.width >= 1000) {
            if (window.innerHeight != screen.height) {
                document.querySelector("#windowXemDeThi").requestFullscreen({ navigationUI: "hide" })
                    .then(function () {
                        var dialog = $("#windowXemDeThi").data("kendoWindow");
                        dialog.bind("resize", window_resize);
                    })
                    .catch(function (error) {

                    });
            }
        }
        kendo.ui.progress($("#windowXemDeThi"), false);
    });
}

function ketthucbaithi() {
    $.ajax({
        url: '/TracNghiem/BaiLamTracNghiem_KetThucLamBai',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            ID: $("#ID_BaiLamTracNghiem").val(),
            lstChitiet: lstTraLoi
        })
    }).done(function successCallback(response) {
        clearInterval(timerInterval);
        clearInterval(timerInterval_counrtAlert);
        timers = 0;
        $("#listviewcauhoi").html("");
        $("#thoigian").text(kendo.toString(new Date(timers), 'mm:ss'));
        $("#alertOrientation").hide();
        $("#alertChangetab").hide();
        $("#windowXemDeThi").data("kendoWindow").unbind("resize");
        count_AlertChangeTab = 60000;
        if (screen.width >= 1000) {
            document.exitFullscreen()
                .then(function () {

                })
                .catch(function (error) {
                    // element could not exit fullscreen mode
                    // error message
                    console.log(error.message);
                });
        }
        $("#windowXemDeThi").data("kendoWindow").close();
        kendo.ui.progress($("#windowXemDeThi"), false);
    });

}