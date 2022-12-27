
var selectedDanhMuc;
var lstCauHoiTrongDe = [];
var lstIDCauHoiTrongDe = [];
var lstIDHocSinhTrongDe = [];
var dataSourceCombo;
var count = 1;
var selectedDeThi;
var Ans = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
$(document).ready(function () {
    MathJax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] } });
    MathJax.Hub.Config({ tex2jax: { displayMath: [['$$', '$$'], ['\\(', '\\)']] } });

    $("#rootContainer").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $("#gridDeThi").kendoGrid({
        height: function () {
            var height = $(window).height() - 200;
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
                field: "TenDeThi",
                title: "Tên đề thi",
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
                title: "Số câu hỏi",
                width: "100px",
                template: function (e) {
                    let count = e.lstCauHoi.length;
                    $.each(e.lstChiTiet, function (index, item) {
                        count += item.SoLuongCauHoi;
                    });
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
                field: "TenKhoi",
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
                field: "TenMonHoc",
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
                field: "NgayTao",
                title: "Ngày tạo",
                template: function (e) {
                    var dateString = e.NgayTao.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    if (currentTime.getFullYear() != 1) {
                        return kendo.toString(currentTime, "dd/MM/yyyy");
                    } else {
                        return "";
                    }
                },
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
                field: "TenTaiKhoan",
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
                field: "TrangThai",
                title: "Trạng thái",
                template: function (e) {
                    if (e.TrangThai == 1) {
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
                title: "Xem trước",
                template: function (e) {
                    return "<i onclick='XemTruocDeThi(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
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
                title: "Danh sách thí sinh",
                template: function (e) {
                    return "<i onclick='openGiaoDeThi(\"" + e.uid + "\"," + e.ID + ")' style='color:blue;width:100%;height:15px;cursor:pointer' class='fa fa-list-ul'></i>";
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
                },
                attributes: {
                    style: "text-align: center;"
                }

            }
        ]

    });
    $("#gridCauHoi").kendoGrid({
        height: function () {
            var height = ($(window).height() - 280) / 2;
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
                field: 'ID_CauHoi',
                template: function (e) {
                    return "<i onclick='XoaCauHoi(\"" + e.uid + "\"," + e.ID_CauHoi + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
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
                title: "Nội dung câu hỏi",
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
                field: "TenDanhMucCauHoi",
                title: "Danh mục",
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
                field: "SoDapAn",
                title: "Số đáp án",
                width: "5%",
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
                width: "5%",
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
            }
        ]

    });
    $("#gridCauHoiTuDong").kendoGrid({
        height: function () {
            var height = ($(window).height() - 280) / 2;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_DanhMucCauHoi: { type: 'number', editable: true },
                        SoLuongCauHoi: { type: 'number', editable: true },
                        SoDiem: { type: 'number', editable: true }
                    }
                }
            },
            pageSize: 100
        }),
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
        save: function (e) {
            setTimeout(function () {
                e.sender.refresh();
                e.sender.dataSource.fetch(function () {
                });
            })
        },
        editable: true,
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
                    return "<i onclick='XoaCauHoiTuDong(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
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
                            e.element.parent().html("<a class='k-button' title='Thêm câu hỏi tự động' style='width:100%; height:25px;' onclick='ThemCauHoiTuDong()'><i class='fa fa-plus'></i></a>")
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
                field: "ID_DanhMucCauHoi",
                title: "Danh mục câu hỏi",
                template: function (e) {
                    return e.TenDanhMucCauHoi;
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
                editor: function (container, options) {
                    var control = $('<input />');
                    control.appendTo(container).kendoDropDownTree({
                        dataTextField: 'TenDanhMucCauHoi',
                        dataValueField: 'ID',
                        autoBind: false,
                        dataSource: new kendo.data.HierarchicalDataSource({
                            transport: {
                                read: {
                                    url: '/TracNghiem/GetTreeDanhMucCauHoi'
                                }
                            },
                            schema: {
                                model: {
                                    children: "lstDanhMuc"
                                }
                            },
                        }),
                        //dataSource: dataSourceCombo,
                        change: function (e) {
                            console.log(e);
                            options.model.TenDanhMucCauHoi = e.sender.text();
                            options.model.ID_DanhMucCauHoi = e.sender.value();
                        },
                    });
                    if (options.model.ID_DanhMucCauHoi > 0) {
                        control.data("kendoDropDownTree").value(options.model.ID_DanhMucCauHoi.toString());
                    }
                }
            },
            {
                field: "SoLuongCauHoi",
                title: "Số lượng câu",
                width: "30%",
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
                title: "Số điểm",
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
                    style: "text-align: center;",
                }
            }
        ]

    });
    $("#gridChonCauHoi").kendoGrid({
        height: function () {
            var height = $(window).height() - 40;
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
                template: function (e) {
                    if (lstIDCauHoiTrongDe.includes(e.ID)) {
                        return "<i onclick='XoaCauHoiKhoiDe(" + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                    } else {
                        return "<i onclick='ThemCauHoiVaoDe(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                    }
                },
                width: 60,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
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
            }
        ]

    });
    $("#treeview").kendoTreeView({
        dataTextField: "TenDanhMucCauHoi",
        dataValueField: "ID",
        select: function (e) {
            selectedDanhMuc = $("#treeview").getKendoTreeView().dataItem(e.node)
            LoadGridChonCauHoi();
        },
    });
    loadTreeview()
    $("#windowDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin đề thi"
    });
    $("#windowChiTietBaiThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Kết quả bài thi",
        close: function () {
            LoadGridDataHocSinhTrongDe();
        }
    });

    $("#windowGiaoDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin đề thi"
    });
    $("#windowChonCauHoi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Thông tin đề thi"
    });
    $("#windowXemDeThi").kendoWindow({
        width: 400,
        height: 200,
        modal: true,
        resizable: false,
        visible: false,
        title: "Xem đề thi"
    });

    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        clearButton: false,
        dataSource: new kendo.data.DataSource({
            data: [
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
        })
    });
    $("#ThangDiem").kendoNumericTextBox({
        format: 'n0'
    })
    $("#ThoiGian").kendoNumericTextBox({
        format: 'n0'
    })
    $.ajax({
        url: '/DanhMuc/GetAll_DanhMuc?TenBang=MonHoc',
        type: 'POST',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response
        });
        if ($("#comboMonHoc").data("kendoComboBox") == undefined) {
            $("#comboMonHoc").kendoComboBox({
                dataTextField: 'text',
                dataValueField: 'value',
                dataSource: dataSource,
                filter: "contains"
            })
        } else {
            $("#comboMonHoc").data("kendoComboBox").setDataSource(dataSource);
        }

    })
    LoadGridDeThi();
    $("#gridDeThi").on("dblclick", "tr[role='row']", function () {
        $("#gridDeThi").data("kendoGrid").clearSelection();
        var row = $("#gridDeThi").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#gridDeThi").data("kendoGrid").select(row);
        openEditWindow();
    });

    $("#gridChonCauHoi").kendoTooltip({
        autoHide: true,
        filter: "tr[role='row']",
        content: function (e) {
            var dataItem = $("#gridChonCauHoi").data("kendoGrid").dataItem(e.target.closest("tr"));
            var temp = kendo.template($("#templateCauHoiTooltip").html());
            return temp(dataItem);
        },
        show: function () {
            //setTimeout(function () {
            //var tooltip = document.getElementById("content-answer");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
            //}, 1000)

        }
    });
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
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
            //}, 1000)

        }
    });
    $("#gridHocSinh").kendoGrid({
        height: function () {
            var height = $(window).height() - 50;
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
                title: " ",
                template: function (e) {
                    if (lstIDHocSinhTrongDe.includes(e.ID)) {
                        //return "<i onclick='XoaHocSinhKhoiDe(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                        return "";
                    } else {
                        return "<i onclick='ThemHocSinhVaoDe(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-plus'></i>";
                    }
                },
                width: 60,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
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
                field: "LopHoc",
                title: "Lớp đang học",
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
                field: "NgaySinh",
                title: "Ngày sinh",
                format: "{0: dd/MM/yyyy}",
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
                field: "TenTruong",
                title: "Tên trường học",
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
                attributes: {
                    style: "text-align: center;",
                }
            }
        ]
    });
    $("#gridHocSinhDaGiao").kendoGrid({
        height: function () {
            var height = $(window).height() - 50;
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
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
                            editable: true
                        },
                        HanNiemPhong: {
                            type: 'date',
                            editable: true
                        },
                        HanNopBai: {
                            type: 'date',
                            editable: true
                        }
                    }
                }
            },
            pageSize: 30,
        }),
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: true,
        filterable: {
            mode: "row",
        },
        save: function (e) {
            setTimeout(function () {
                var item = {
                    ID: e.model.ID,
                    TrangThai: e.model.TrangThai,
                    HanNopBai: kendo.toString(e.model.HanNopBai, 'yyyy/MM/dd HH:mm:ss'),
                    HanNiemPhong: kendo.toString(e.model.HanNiemPhong, 'yyyy/MM/dd HH:mm:ss'),
                    GioiHanLanLam: e.model.GioiHanLanLam
                }
                console.log(item);
                $.ajax({
                    url: '/TracNghiem/DeThi_CapNhatGiaoDeChoHocSinh',
                    type: 'POST',
                    data: item
                }).done(function successCallback(response) {
                    if (response.status) {
                        notification.show({ kValue: response.msg }, "success");
                        LoadGridDataHocSinhTrongDe();
                        e.sender.refresh();
                        e.sender.dataSource.fetch(function () {
                        });
                    } else {
                        notification.show({ kValue: response.msg }, "error");
                    }

                })
            })
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
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                title: " ",
                template: function (e) {
                    return "<i onclick='XoaHocSinhKhoiDe(\"" + e.uid + "\"," + e.ID + ")' style='color:red;width:100%;height:15px;cursor:pointer' class='fa fa-trash'></i>";
                },
                width: 60,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenHocSinh",
                title: "Tên học sinh",
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
                field: "NgaySinh",
                title: "Ngày sinh",
                //template: function (e) {
                //    var dateString = e.NgaySinh.substr(6);
                //    var currentTime = new Date(parseInt(dateString));
                //    if (currentTime.getFullYear() != 1) {
                //        return kendo.toString(currentTime, "dd/MM/yyyy");
                //    } else {
                //        return "";
                //    }
                //},
                format: "{0: dd/MM/yyyy}",
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
                field: "DienThoaiMacDinh",
                title: "Điện thoại",
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
                field: "SoLanLam",
                title: "Số lần làm",
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
                field: "HanNopBai",
                format: "{0: HH:mm dd/MM/yyyy}",
                title: "Hạn nộp",
                editor: function (container, options) {
                    let html = "<input  name='" + options.field + "' />";
                    $(html).appendTo(container).kendoDateTimePicker({
                        format: "{0: HH:mm dd/MM/yyyy}"
                    });
                },
                width: "90px",
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
                format: "{0: HH:mm dd/MM/yyyy}",
                width: "90px",
                editor: function (container, options) {
                    let html = "<input  name='" + options.field + "' />";
                    $(html).appendTo(container).kendoDateTimePicker({
                        format: "{0: HH:mm dd/MM/yyyy}"
                    });
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
                field: "GioiHanLanLam",
                title: "Giới hạn lần làm",
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
                field: "ThoiGianBatDau",
                title: "Lần làm cuối",
                format: "{0: HH:mm dd/MM/yyyy}",
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
                title: " ",
                template: function (e) {
                    return "<i title='Xem bài làm' onclick='XemChiTietBaiThi(\"" + e.uid + "\"," + e.ID + ")' style='color:green;width:100%;height:15px;cursor:pointer' class='fa fa-eye'></i>";
                },
                width: 60,
                attributes: {
                    class: "text-center"
                },
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; ",
                    class: "table-header-cell"
                }
            },
        ]
    });
    $("#listviewcauhoi").kendoListView({
        template: kendo.template($("#templatecauhoi").html())
    });
    $("#listviewbailam").kendoListView({
        template: kendo.template($("#templatebailam").html()),
        dataBinding: function (e) {
            console.log(e);
            if (e.action == "sync") {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
            }
        },
        editTemplate: kendo.template($("#templateeditbailam").html()),
        save: function (e) {
            var item = {
                ID_BaiLamTracNghiem: e.model.ID_BaiLamTracNghiem,
                ID_CauHoi: e.model.ID_CauHoi,
                TraLoiDung: 1,
                TraLoi: e.model.TraLoi,
                Diem: e.model.Diem
            }
            $.ajax({
                url: '/TracNghiem/ChamDiemTuLuan',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(item)
            }).done(function successCallback(response) {
                if (response.status) {
                    notification.show({ kValue: response.msg }, "success");
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            })
        },
        edit: function (e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Editing of item with id " + e.model.id);
            var ID_CauHoi = e.model.id;
            $("#DapAn" + ID_CauHoi).kendoEditor({
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
                    e.model.TraLoi = $("#DapAn" + ID_CauHoi).data("kendoEditor").value();
                    var item = {
                        ID_BaiLamTracNghiem: e.model.ID_BaiLamTracNghiem,
                        ID_CauHoi: e.model.ID_CauHoi,
                        TraLoiDung: 1,
                        TraLoi: e.model.TraLoi,
                        Diem: e.model.Diem
                    }
                    console.log(item);
                }

            });
            $("#AnhDapAn" + ID_CauHoi).kendoUpload({
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
                        //PushFormDataFile(e.files[0]);
                        var file = e.files[0]
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
                                $("#AnhDapAn" + ID_CauHoi).data("kendoUpload").clearAllFiles();
                                var editor = $("#DapAn" + ID_CauHoi).data("kendoEditor");
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
                }
            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
        }
    });
})

function XemChiTietBaiThi(uid, id) {
    $.ajax({
        url: '/TracNghiem/GetBaiLamTracNghiem_ByID?ID_BaiLamTracNghiem=' + id,
        type: 'GET'
    }).done(function successCallback(response) {

        var dataRow = $('#gridHocSinhDaGiao').data("kendoGrid").dataSource.getByUid(uid);
        $("#TenDe").html(selectedDeThi.TenDeThi);
        $("#TenMon").html(selectedDeThi.TenMonHoc);
        $("#TenHocSinh").html(dataRow.TenHocSinh);
        //var dateStringBatDau = dataRow.ThoiGianBatDau.substr(6);
        //var dateStringKetThuc = dataRow.ThoiGianKetThuc.substr(6);
        //var batdau = new Date(parseInt(dateStringBatDau));
        //var ketthuc = new Date(parseInt(dateStringKetThuc));
        $("#NgayLam").html(kendo.toString(dataRow.ThoiGianBatDau, "dd/MM/yyyy"));
        $("#BatDau").html(kendo.toString(dataRow.ThoiGianBatDau, "HH:mm"));
        $("#KetThuc").html(kendo.toString(dataRow.ThoiGianKetThuc, "HH:mm"));
        $("#DiemBaiLam").html(dataRow.Diem);
        count = 1;
        var dataSource = new kendo.data.DataSource({
            data: response.lstChitiet,
            schema: {
                model: {
                    id: "ID_CauHoi",
                    fields: {
                        ID_BaiLamTracNghiem: { type: 'number', editable: false },
                        ID_CauHoi: { type: 'number', editable: false },
                        Diem: { type: 'number', editable: false },
                        TraLoi: { type: 'text', editable: true }
                    }
                }
            }
        });
        $("#listviewbailam").data("kendoListView").setDataSource(dataSource);
        $("#windowChiTietBaiThi").data("kendoWindow").open().maximize();
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "TFS"]);
    })
}
function chamDiem(ID_BaiLamTracNghiem, ID_CauHoi, input) {
    $.ajax({
        url: '/TracNghiem/ChamDiemTuLuan',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            ID_BaiLamTracNghiem: ID_BaiLamTracNghiem,
            ID_CauHoi: ID_CauHoi,
            Diem: parseFloat($(input).val())
        })
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function openEditWindow() {
    var arr = $("#gridDeThi").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        $("#windowDeThi").data("kendoWindow").center().maximize().open();
        var selectedItem = $("#gridDeThi").data("kendoGrid").dataItem($("#gridDeThi").data("kendoGrid").select());
        $("#ID_DeThi").val(selectedItem.ID);
        $("#TenDeThi").val(selectedItem.TenDeThi);
        $("#ThoiGian").data("kendoNumericTextBox").value(selectedItem.ThoiGian);
        $("#ThangDiem").data("kendoNumericTextBox").value(selectedItem.Diem);
        $("#comboKhoi").data("kendoComboBox").value(selectedItem.ID_Khoi);
        $("#comboMonHoc").data("kendoComboBox").value(selectedItem.ID_MonHoc);

        var datachitiet = [];
        $.each(selectedItem.lstChiTiet, function (index, item) {
            datachitiet.push(item)
        })
        let ds = new kendo.data.DataSource({
            data: datachitiet,
            schema: {
                model: {
                    id: "id",
                    fields: {
                        ID: { type: 'number', editable: false },
                        ID_DanhMucCauHoi: { type: 'number', editable: true },
                        SoLuongCauHoi: { type: 'number', editable: true },
                        SoDiem: { type: 'number', editable: true }
                    }
                }
            },
            pageSize: 100
        });
        $("#gridCauHoiTuDong").data("kendoGrid").setDataSource(ds);
        lstCauHoiTrongDe = [];
        $.each(selectedItem.lstCauHoi, function (index, item) {
            var ch = {
                ID_CauHoi: item.ID,
                ID_DanhMucCauHoi: item.ID_DanhMucCauHoi,
                ID_TaiKhoan: item.ID_TaiKhoan,
                NoiDungCauHoi: item.NoiDungCauHoi,
                SoDapAn: item.SoDapAn,
                SoDapAnDung: item.SoDapAnDung,
                TenDanhMucCauHoi: item.TenDanhMucCauHoi,
                TenTaiKhoan: item.TenTaiKhoan,
                TrangThai: item.TrangThai,
                lstDapAn: item.lstDapAn
            }
            lstIDCauHoiTrongDe.push(item.ID);
            lstCauHoiTrongDe.push(ch);
        })
        LoadDataGridCauHoi();
    }
}


function LoadGridChonCauHoi() {
    $.ajax({
        url: '/TracNghiem/GetCauHoiByDanhMuc?ID_DanhMuc=' + selectedDanhMuc.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridChonCauHoi"), true);
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridChonCauHoi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridChonCauHoi"), false);
    });
}


function ThemDeThi() {
    document.getElementById("formDeThi").reset();
    $("#ID_DeThi").val(0);
    lstCauHoiTrongDe = [];
    lstIDCauHoiTrongDe = [];
    LoadDataGridCauHoi();
    let ds = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                id: "id",
                fields: {
                    ID: { type: 'number', editable: false },
                    ID_DanhMucCauHoi: { type: 'number', editable: true },
                    SoLuongCauHoi: { type: 'number', editable: true },
                    SoDiem: { type: 'number', editable: true }
                }
            }
        },
        pageSize: 100
    });
    $("#gridCauHoiTuDong").data("kendoGrid").setDataSource(ds);
    $("#ThangDiem").data('kendoNumericTextBox').value(10);
    $("#windowDeThi").data("kendoWindow").center().maximize().open();
}

function openWindowCauHoi() {
    $("#windowChonCauHoi").data("kendoWindow").center().open().maximize();
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

        dataSourceCombo = new kendo.data.HierarchicalDataSource({
            data: response,
            schema: {
                model: {
                    children: "lstDanhMuc"
                }
            }
        })
        $("#treeview").data("kendoTreeView").setDataSource(dataSource);
        $("#treeview").data("kendoTreeView").expand(".k-item");
    })
}

function ThemCauHoiVaoDe(uid, id) {
    if (!lstIDCauHoiTrongDe.includes(id)) {
        lstIDCauHoiTrongDe.push(id);
        var dataRow = $('#gridChonCauHoi').data("kendoGrid").dataSource.getByUid(uid);
        var item = {
            ID: 0,
            ID_CauHoi: dataRow.ID,
            ID_DanhMucCauHoi: dataRow.ID_DanhMucCauHoi,
            ID_TaiKhoan: dataRow.ID_TaiKhoan,
            NoiDungCauHoi: dataRow.NoiDungCauHoi,
            SoDapAn: dataRow.SoDapAn,
            SoDapAnDung: dataRow.SoDapAnDung,
            TenDanhMucCauHoi: dataRow.TenDanhMucCauHoi,
            TenTaiKhoan: dataRow.TenTaiKhoan,
            TrangThai: dataRow.TrangThai,
            lstDapAn: dataRow.lstDapAn
        }
        lstCauHoiTrongDe.push(item);
    }
    setTimeout(function () {
        $("#gridChonCauHoi").data("kendoGrid").refresh();
        LoadDataGridCauHoi()
    })
}

function XoaCauHoiKhoiDe(id) {
    if (lstIDCauHoiTrongDe.includes(id)) {
        let index = lstIDCauHoiTrongDe.indexOf(id);
        lstIDCauHoiTrongDe.splice(index, 1);
        lstCauHoiTrongDe.splice(index, 1);
    }
    setTimeout(function () {
        $("#gridChonCauHoi").data("kendoGrid").refresh();
        LoadDataGridCauHoi();
    })
}

function XoaCauHoi(uid, id) {
    if (lstIDCauHoiTrongDe.includes(id)) {
        let index = lstIDCauHoiTrongDe.indexOf(id);
        lstIDCauHoiTrongDe.splice(index, 1);
        lstCauHoiTrongDe.splice(index, 1);
    }
    setTimeout(function () {
        var dataRow = $('#gridCauHoi').data("kendoGrid").dataSource.getByUid(uid);
        $('#gridCauHoi').data("kendoGrid").dataSource.remove(dataRow);
        $("#gridChonCauHoi").data("kendoGrid").refresh();
    })
}

function LoadDataGridCauHoi() {
    var dataSource = new kendo.data.DataSource({
        data: lstCauHoiTrongDe,
        schema: {
            model: {
                id: "ID"
            }
        },
        pageSize: 20,
    });
    $("#gridCauHoi").data("kendoGrid").setDataSource(dataSource);
}

function ThemCauHoiTuDong() {
    var grid = $("#gridCauHoiTuDong").data("kendoGrid");
    grid.addRow();
}
function XoaCauHoiTuDong(uid, id) {
    var dataRow = $('#gridCauHoiTuDong').data("kendoGrid").dataSource.getByUid(uid);
    $('#gridCauHoiTuDong').data("kendoGrid").dataSource.remove(dataRow);
}

function HuyDeThi() {
    document.getElementById("formDeThi").reset();
    $("#windowDeThi").data("kendoWindow").close();
}

function LuuDeThi() {
    var validten = SetValidate("TenDeThi");
    var validkhoi = SetValidate("comboKhoi");
    var validmon = SetValidate("comboMonHoc");
    var validthoigian = SetValidate("ThoiGian");
    var validthangdiem = SetValidate("ThangDiem");
    var valid = validten && validkhoi && validmon && validthoigian && validthangdiem;
    if (valid) {
        var dethi = {
            ID: $("#ID_DeThi").val(),
            TenDeThi: $("#TenDeThi").val(),
            ID_MonHoc: $("#comboMonHoc").data("kendoComboBox").value(),
            ID_Khoi: $("#comboKhoi").data("kendoComboBox").value(),
            ThoiGian: $("#ThoiGian").data("kendoNumericTextBox").value(),
            Diem: $("#ThangDiem").data("kendoNumericTextBox").value()
        };
        var dschitiet = [];
        $.each($("#gridCauHoiTuDong").data("kendoGrid").dataSource.data(), function (index, item) {
            dschitiet.push({
                ID: item.ID,
                ID_DeThi: $("ID_DeThi").val(),
                ID_DanhMucCauHoi: item.ID_DanhMucCauHoi,
                SoLuongCauHoi: item.SoLuongCauHoi,
                Diem: item.Diem
            })
        })

        var dscauhoi = [];
        $.each($("#gridCauHoi").data("kendoGrid").dataSource.data(), function (index, item) {
            dscauhoi.push({
                ID: item.ID,
                ID_DeThi: $("ID_DeThi").val(),
                ID_CauHoi: item.ID_CauHoi
            })
        })
        dethi.lstDeThiCauHoi = dscauhoi;
        dethi.lstChiTiet = dschitiet;
        console.log(dethi);
        $.ajax({
            url: '/TracNghiem/DeThi_InsertOrUpdate',
            type: 'POST',
            data: dethi
        }).done(function successCallback(response) {
            if (response.status) {
                notification.show({ kValue: response.msg }, "success");
                HuyDeThi();
                LoadGridDeThi();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}

function LoadGridDeThi() {
    kendo.ui.progress($("#gridDeThi"), true);
    $.ajax({
        url: '/TracNghiem/GetAllDeThi',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID"
                }
            },
            pageSize: 20,
        });
        $("#gridDeThi").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridDeThi"), false);
    });
}

function XemTruocDeThi(uid, id) {
    $("#windowXemDeThi").data("kendoWindow").center().open().maximize();
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    $("#TenDe").text(dataRow.TenDeThi);
    $("#TenMon").text(dataRow.TenMonHoc);
    $("#ThoiGianLamBai").text(dataRow.ThoiGian);
    count = 1;
    var dataSource = new kendo.data.DataSource({
        data: dataRow.lstCauHoi,
        schema: {
            model: {
                id: "ID",
                fields: {
                    NgayTao: {
                        type: 'date'
                    }
                }
            }
        }
    });
    $("#listviewcauhoi").data("kendoListView").setDataSource(dataSource);
    kendo.ui.progress($("#rootContainer"), false);
}

function htmlDecode(value) {
    if (value != null) {
        return value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    } else {
        return "";
    }
}

function openGiaoDeThi(uid, id) {
    var dataRow = $('#gridDeThi').data("kendoGrid").dataSource.getByUid(uid);
    selectedDeThi = dataRow;
    $("#ID_De").val(id);
    $("#windowGiaoDeThi").data("kendoWindow").open().maximize();
    LoadGridDataHocSinh();
    LoadGridDataHocSinhTrongDe();
}

function LoadGridDataHocSinh() {
    kendo.ui.progress($("#gridHocSinh"), true);

    $.ajax({
        url: '/HocSinh/GetAll',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            pageSize: 30,
        });
        $("#gridHocSinh").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#gridHocSinh"), false);
    });
}

function LoadGridDataHocSinhTrongDe() {
    lstIDHocSinhTrongDe = [];
    kendo.ui.progress($("#gridHocSinhDaGiao"), true);
    $.ajax({
        url: '/TracNghiem/GetAllBaiLamTracNghiem_ByDeThi?ID_DeThi=' + $("#ID_De").val(),
        type: 'GET',
    }).done(function successCallback(response) {
        $.each(response, function (index, item) {
            lstIDHocSinhTrongDe.push(item.ID_HocSinh);
            item.SoLanLam = item.lstLichsu.length;
        })

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
                            editable: true
                        },
                        HanNiemPhong: {
                            type: 'date',
                            editable: true
                        },
                        HanNopBai: {
                            type: 'date',
                            editable: true
                        }
                    }
                }
            },
            pageSize: 30,
        });
        $("#gridHocSinhDaGiao").data("kendoGrid").setDataSource(dataSource);
        setTimeout(function () {
            $("#gridHocSinh").data("kendoGrid").refresh();
        })
        kendo.ui.progress($("#gridHocSinhDaGiao"), false);
    });
}

function ThemHocSinhVaoDe(uid, id) {
    if (!lstIDHocSinhTrongDe.includes(id)) {
        var dataRow = $('#gridHocSinh').data("kendoGrid").dataSource.getByUid(uid);
        var item = {
            ID: 0,
            ID_DeThi: $("#ID_De").val(),
            ID_HocSinh: id,
            TrangThai: 1
        }
        $.ajax({
            url: '/TracNghiem/DeThi_GiaoDeChoHocSinh',
            type: 'POST',
            data: item
        }).done(function successCallback(response) {
            LoadGridDataHocSinhTrongDe();
        })
    }
}

function XoaHocSinhKhoiDe(uid, id) {
    var dataRow = $('#gridHocSinhDaGiao').data("kendoGrid").dataSource.getByUid(uid);
    $.ajax({
        url: '/TracNghiem/DeThi_XoaDeChoHocSinh?ID_BailamTracNghiem=' + id,
        type: 'POST'
    }).done(function successCallback(response) {
        LoadGridDataHocSinhTrongDe();
    })
}