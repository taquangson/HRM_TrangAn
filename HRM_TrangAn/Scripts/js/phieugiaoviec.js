$(".main_container").hide();
var itemToSelect = [];
var selectUID = [];
var selectdNhanVien = [];
var listToNhom = [];
var tailieu = [];
var SERVERIMAGE = "http://localhost:56812/"
$(document).ready(function () {
    $("#Ngay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(),
        dateInput: true,
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var widthCardContentColumn = 0;
    if (isMobile.any()) {
        widthCardContentColumn = $(window).width() - 50;
    } else {
        widthCardContentColumn = 350;
    }
    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 170;
            //if (isMobile.any()) {
            //    height = height - 300;
            //}
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            //record = 0;
        },
        //Danh sách cột của bảng dữ liệu
        columns: [
            {
                width: "35px",
                selectable: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                field: "MaPhieuPhanCong",
                title: "Thông tin",
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
                    style: "text-align:left",
                    class: "table-header-cell "
                },
                width: widthCardContentColumn,
                template: kendo.template($("#wo-template").html()),
            },
            //{
            //    title: "STT",
            //    template: "#= ++record #",
            //    width: "50px",
            //    attributes: {
            //        class: "text-center"
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    }
            //},
            {
                field: "NgayTao",
                title: "Ngày tạo",
                format: "{0:dd/MM/yyyy}",
                hidden: isMobile.any(),
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
                field: "MaPhieuPhanCong",
                title: "Mã phiếu",
                hidden: isMobile.any(),
                width: "180px",
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
                field: "NgayLamViec",
                title: "Ngày làm việc",
                hidden: isMobile.any(),
                format: "{0:dd/MM/yyyy}",
                width: "180px",
                filterable: true,
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenCongViec",
                title: "Nội dung công việc",
                hidden: isMobile.any(),
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
                hidden: isMobile.any(),
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
                title: "Kế hoạch",
                hidden: isMobile.any(),
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "To_SoNguoiDuKien",
                        title: "Tổ/số đò",
                        template: function (e) {
                            return e.To_SoNguoiDuKien
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
                        field: "SlgDK",
                        title: "Số lượng người",
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
                        field: "ThoiGianDuKien",
                        title: "Thời gian",
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
            },
            {
                title: "Thực tế",
                hidden: isMobile.any(),
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "To_SoNguoiThucTe",
                        title: "Tổ/số đò",
                        template: function (e) {
                            return e.To_SoNguoiThucTe
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
                        field: "SlgTT",
                        title: "Số lượng người",
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
                        field: "ThoiGianThucTe",
                        title: "Thời gian",
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
            },
            {
                title: "Chênh lệch",
                hidden: isMobile.any(),
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "SlgCL",
                        title: "Số lượng người",
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
                        field: "CongCL",
                        title: "Số lượng công",
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
                    }
                ]
            },
            {
                field: "GhiChu",
                hidden: isMobile.any(),
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

    $("#gridToNhom").kendoGrid({
        height: function () {
            var height = $(window).height() - 220;
            if (isMobile.any()) {
                height = height - 50;
            }
            return height;
        },
        dataSource: new kendo.data.DataSource({
            data: [],
            schema: {
                model: {
                    id: "ID_ToNhom",
                    fields: {
                        TenToNhom: { type: 'text', editable: false },
                        SoNguoi: { type: 'number', editablle: true },
                    }
                }
            },
            aggregate: [{ field: "SoNguoi", aggregate: "sum" }],
            pageSize: 100
        }),
        save: function (e) {
            e.sender.dataSource.fetch(function () {
                setTimeout(function () {
                    $("#SoNguoiDuKien").val($("#gridToNhom").data("kendoGrid").dataSource.aggregates().SoNguoi.sum);
                })
            });

        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        editable: false,
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            //record = 0;
        },
        //Danh sách cột của bảng dữ liệu
        columns: [

            {
                field: "TenToNhom",
                title: "Tên tổ",
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
                field: "SoNguoi",
                title: "Số lượng người",
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
            }
        ]

    });

    $("#gridAddNhanVien").kendoGrid({
        height: function () {
            var height = $(window).height() - 100;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        excel: {
            filterable: true
        },
        filterable: {
            mode: "row",
        },
        groupable: true,
        pageable: pageableShort,
        dataBinding: function () {
            //record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            record = 0;
        },
        //change: function (e) {
        //    selecteditems = e.sender.select();
        //    console.log('onchange');
        //    if (selecteditems.length > 0) {

        //        listIDTo = [];
        //        toalowcheck = [];
        //        uids = selectUID;
        //        $.each($("input[data-role=chonto]"), function (index, item) {
        //            listIDTo.push(item.id);
        //        });

        //        $.each(selecteditems, function (index, item) {
        //            var data = e.sender.dataItem(item);
        //            uids.push(data.uid);
        //            if (data.TenToNhom != null) {
        //                if (toalowcheck.indexOf(data.TenToNhom) < 0) {
        //                    toalowcheck.push(data.TenToNhom);
        //                }
        //                document.getElementById(data.TenToNhom).checked = true;
        //            }
        //            else {
        //                if (toalowcheck.indexOf('to0') < 0) {
        //                    toalowcheck.push('to0');
        //                }
        //                document.getElementById('to0').checked = true;
        //            }
        //        })

        //        $.each(listIDTo, function (index, item) {
        //            if (toalowcheck.indexOf(item) < 0) {
        //                document.getElementById(item).checked = false;
        //            }
        //        })
        //    }
        //},
        columns: [
            {
                width: "36px",
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
                },

            },
            {
                field: "MaNhanVien",
                title: "MNV",
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
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "TenToNhom",
                groupHeaderTemplate: function (e) {
                    var item = {
                        TenToNhom: e.value,
                        items: e.items
                    };
                    itemToSelect.push(item);
                    if (e.value == null) {
                        return '<input type="checkbox" data-role="chonto" id="to0" class="k-checkbox" onchange="selectTo(this,null)">   <label class="k-checkbox-label" for="to0"> Không thuộc tổ </label>';

                    } else {
                        return '<input type="checkbox" data-role="chonto" id="' + e.value + '" class="k-checkbox" onchange="selectTo(this,\'' + e.value + '\')">   <label class="k-checkbox-label" for="' + e.value + '"> ' + e.value + '</label>';
                    }
                },
                title: "Tổ",
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
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                }
            },
            {
                field: "MaThuyen",
                title: "Số đò",
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
                },
                attributes: {
                    style: "text-align: left;",
                }
            },

            {
                field: "SoDienThoai",
                title: "Số điện thoại",
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
            }
        ]

    });

    $("#windowNhanVien").kendoWindow({
        width: "100%",
        height: "600",
        title: "Danh sách phân công nhân viên",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#windowHinhAnh").kendoWindow({
        width: "100%",
        height: "600",
        title: "Ảnh giao việc",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });


    $("#window").kendoWindow({
        width: "100%",
        height: "100%",
        title: "Chi tiết công việc",
        visible: false,
        modal: true,
        resizable: false,
        actions: [
            "Close"
        ]
    });



    $("#NgayLamViec").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true,
        change: function () {
            var ngay = $("#NgayLamViec").data("kendoDatePicker").value();
            let ngay1 = new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate(), 7, 0, 0);
            $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(ngay1);

            let ngay2 = new Date(ngay.getFullYear(), ngay.getMonth(), ngay.getDate(), 17, 0, 0);

            $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(ngay2);
        }
    })
    $("#NgayLamViec").data("kendoDatePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });
    $("#ThoiGianBatDauDuKien").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });
    $("#ThoiGianKetThucDuKien").kendoDateTimePicker({
        format: "dd/MM/yyyy HH:mm",
        timeFormat: "HH:mm",
        dateInput: true
    })
    $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker")._dateInput.setOptions({
        messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
        }
    });


    $("#filetailieu").kendoUpload({
        multiple: true,
        localization: {
            select: 'Chọn file dữ liệu',
            remove: '',
            cancel: ''
        },
        allowedExtensions: [".xls", ".xlsx", "jpg", "pdf", "png", "zip", "doc", "docx"],
        select: function (e) {
            var wrapper = this.wrapper;
            wrapper.find(".k-file-name-size-wrapper").html("");
            $.each(e.files, function (index, item) {
                var fileInfo = item;
                setTimeout(function () {
                    PushFormDataFile2(fileInfo, wrapper);
                });
            })
        }
    });


    $("#grid").on("dblclick", "tr[role='row']", function () {
        $("#grid").data("kendoGrid").clearSelection();
        var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + $(this).attr("data-uid") + "]");
        $("#grid").data("kendoGrid").select(row);
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        openEditWindow();
    })
    $.ajax({
        url: '/DanhMucCongViec/GetAllDanhMucCongViec',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#ComboCongViec").kendoMultiColumnComboBox({
            dataTextField: "TenCongViec",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenCongViec",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "Cong",
                    title: "Công/Người",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenCongViec", "Cong"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {

                $("#Cong").val(e.dataItem.Cong);
                $("#ThoiGianDuKien").val(e.dataItem.ThoiGian);


                // Use the selected item or its text
            }
        })
    });

    $.ajax({
        url: '/ToNhom/GetAllDanhMucToNhom',
        type: 'GET',
    }).done(function successCallback(response) {
        listToNhom = response;
        $("#ComboToNhom").kendoMultiSelect({
            dataTextField: "TenToNhom",
            dataValueField: "ID",
            filter: "contains",
            suggest: true,
            autoClose: false,
            delay: 1000,
            dataSource: response,
            change: function (e) {
                var ds = [];
                var currentds = $("#gridToNhom").data("kendoGrid").dataSource;
                $.each(e.sender.value(), function (index, item) {

                    let iitem = listToNhom.find(x => x.ID == item);
                    console.log(iitem);
                    let existedItem = currentds.get(item);
                    console.log(existedItem);

                    ds.push({ ID_ToNhom: iitem.ID, TenToNhom: iitem.TenToNhom, SoNguoi: (existedItem ? existedItem.SoNguoi : 0) })

                    var dataSource = new kendo.data.DataSource({
                        data: ds,
                        schema: {
                            model: {
                                id: "ID_ToNhom",
                                fields: {
                                    TenToNhom: { type: 'text', editable: false },
                                    SoNguoi: { type: 'number', editablle: true },
                                }
                            }
                        },
                        aggregate: [{ field: "SoNguoi", aggregate: "sum" }],
                        pageSize: 100
                    });

                    $("#gridToNhom").data("kendoGrid").setDataSource(dataSource);
                    $("#SoNguoiDuKien").val($("#gridToNhom").data("kendoGrid").dataSource.aggregates().SoNguoi.sum);
                })
            }
        })
    })

    $.ajax({
        url: '/NguoiGiamSat/GetAllNguoiGiamSat',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#ComboNguoiGiamSat").kendoMultiColumnComboBox({
            dataTextField: "TenDayDu",
            dataValueField: "ID",
            columns: [
                {
                    field: "TenDayDu",
                    title: "Tên công việc",
                    width: "200px",
                },
                {
                    field: "DienThoai",
                    title: "Số điện thoại",
                    width: "200px",
                },
                {
                    field: "DiaDiemLamViec",
                    title: "Địa điểm làm việc",
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # ',
            filter: "contains",
            filterFields: ["TenDayDu", "DienThoai", "DiaDiemLamViec"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
            }
        })
    });
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})

function openAddNhanVienWindow(uid) {
    $("#grid").data("kendoGrid").clearSelection();
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + uid + "]");
    $("#grid").data("kendoGrid").select(row);
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var selectedTo = selectedItem.lstToNhomKeHoach.map(function (x) { return x.ID_ToNhom });
    console.log(selectedItem);
    $.ajax({
        url: '/NhanVien/GetAllNhanVienTrongMultiToNhom?ID_ToNhom=' + selectedTo.join(','),
        type: 'GET',
    }).done(function successCallback(response) {
        kendo.ui.progress($("#gridAddNhanVien"), true);
        var lstNhanVienChuaPhanCong = response;
        //for (var i = 0; i < response.length; i++) {
        //    if (!CheckNhanVienChuaPhanCong(response[i].ID)) {
        //        lstNhanVienChuaPhanCong.push(response[i])
        //    }
        //}
        var dataSource = new kendo.data.DataSource({

            data: lstNhanVienChuaPhanCong,
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
            group: {
                field: "TenToNhom"
            },
            //pageSize: 20,
        });

        $("#gridAddNhanVien").data("kendoGrid").setDataSource(dataSource);
        $("#gridAddNhanVien").data("kendoGrid").clearSelection();

        $.each(selectedItem.lstNhanVien, function (index, item) {
            let idx = $("#gridAddNhanVien").data("kendoGrid").dataSource.get(item.ID);
            var row = $("#gridAddNhanVien").data("kendoGrid").table.find("[data-uid=" + idx.uid + "]");
            $("#gridAddNhanVien").data("kendoGrid").select(row);
        });

        kendo.ui.progress($("#gridAddNhanVien"), false);
        if ($(window).width() > 800) {
            $("#windowNhanVien").data("kendoWindow").center().open();
        } else {
            $("#windowNhanVien").data("kendoWindow").center().maximize().open();
        }
    });
}

function openHinhAnhWindow(uid) {
    $("#grid").data("kendoGrid").clearSelection();
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + uid + "]");
    $("#grid").data("kendoGrid").select(row);
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    $("#previewimage").html("");
    tailieu = [];
    $.ajax({
        url: '/KeHoach/GetListFileKeHoach?ID_KeHoach=' + selectedItem.ID,
        type: 'GET',
    }).done(function successCallback(response) {
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            let ext = item.FilePath.split('.').pop();
            let preview = '';
            if (ext == 'jpg' || ext == 'jpeg' || ext == 'png') {
                preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + item.FilePath + " src=" + SERVERIMAGE + item.FilePath + "></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + item.FileName + "</p></div>");
            } else if (ext == 'pdf') {
                preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + item.FilePath + " src='../Images/pdficon.jpg'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + item.FileName + "</p></div>");
            } else if (ext == 'doc' || ext == 'docx') {
                preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + item.FilePath + " src='../Images/docicon.png'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + item.FileName + "</p></div>");
            } else if (ext == 'xls' || ext == 'xlsx') {
                preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + item.FilePath + " src='../Images/xlsicon.png'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + item.FileName + "</p></div>");
            }
            $("#previewimage").append(preview);
            tailieu.push(item)
        }
        if ($(window).width() > 800) {
            $("#windowHinhAnh").data("kendoWindow").center().open();
        } else {
            $("#windowHinhAnh").data("kendoWindow").center().maximize().open();
        }
    })
}
function addPreview(fileInfo, wrapper, path) {
    var preview = "";
    if (fileInfo.extension == '.jpg' || fileInfo.extension == '.jpeg' || fileInfo.extension == '.png') {
        preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + path + " src=" + SERVERIMAGE + path + "></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + fileInfo.name + "</p></div>");
    } else if (fileInfo.extension == '.pdf') {
        preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + path + " src='../Images/pdficon.png'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + fileInfo.name + "</p></div>");
    } else if (fileInfo.extension == '.doc' || fileInfo.extension == '.docx') {
        preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + path + " src='../Images/docicon.png'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + fileInfo.name + "</p></div>");
    } else if (fileInfo.extension == '.xls' || fileInfo.extension == '.xlsx') {
        preview = $("<div class='image-preview'><img style='max-width:90px;max-height:90px' data-src=" + SERVERIMAGE + path + " src='../Images/xlsicon.png'></img><span class='k-icon k-i-close k-i-x' style='cursor:pointer' title='Xóa' onclick='removeAnh(this)'></span><p>" + fileInfo.name + "</p></div>");
    }
    $("#previewimage").append(preview);
}

function removeAnh(icon) {
    var path = $(icon).prev().attr("data-src");
    var index = -1;
    $.each(tailieu, function (ind, item) {
        if ((SERVERIMAGE + item.FilePath) == path) {
            index = ind;
        }
    })
    if (index > -1) {
        tailieu.splice(index, 1);
        $(icon).parent().remove();
    }
}


function PushFormDataFile2(fileInfo, wrapper) {
    var url = "";
    var data = new FormData();
    data.append('file', fileInfo.rawFile, fileInfo.name);
    var t = $.ajax({
        url: "/KeHoach/UploadFile",
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: "Upload thành công" }, "success");
            addPreview(fileInfo, wrapper, response.path);
            wrapper.find(".k-file-name").remove();
            tailieu.push({
                ID: 0,
                FilePath: response.path,
                FileName: response.name
            })

        } else {
            notification.show({ kValue: "Upload thất bại, vui lòng thử lại" }, "error");
        }
    });
}

function LuuTaiLieu() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    $.ajax({
        url: '/KeHoach/UpdateAnh',
        type: 'POST',
        data: { lstFile: tailieu, ID_KeHoach: selectedItem.ID }
    }).done(function successCallback(response) {
        if (response.success) {
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function CloseTaiLieuWindow() {
    $("#grid").data("kendoGrid").clearSelection();
    $("#windowHinhAnh").data("kendoWindow").close();
}


function openEditWindow() {
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $("#btnSave").show();
        console.log(selectedItem);
        $("#ID").val(selectedItem.ID);
        $("#ComboCongViec").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
        $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
        $("#TenCongViec").val(selectedItem.TenCongViec);
        $("#Cong").val(selectedItem.Cong);
        $("#NgayLamViec").data("kendoDatePicker").value(selectedItem.NgayLamViec);
        $("#ThoiGianDuKien").val(selectedItem.ThoiGianDuKien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DiaDiem").val(selectedItem.DiaDiem);
        $("#SoNguoiDuKien").val(selectedItem.SoNguoiDuKien);
        $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(selectedItem.ThoiGianBatDauDuKien);
        $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(selectedItem.ThoiGianKetThucDuKien);
        var selectedTo = selectedItem.lstToNhomKeHoach.map(function (x) { return x.ID_ToNhom });
        $("#ComboToNhom").data("kendoMultiSelect").value(selectedTo);

        var dataSource = new kendo.data.DataSource({
            data: selectedItem.lstToNhomKeHoach,
            schema: {
                model: {
                    id: "ID_ToNhom",
                    fields: {
                        TenToNhom: { type: 'text', editable: false },
                        SoNguoi: { type: 'number', editablle: true },
                    }
                }
            },
            aggregate: [{ field: "SoNguoi", aggregate: "sum" }],
            pageSize: 100
        });

        $("#gridToNhom").data("kendoGrid").setDataSource(dataSource);

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
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sao chép");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        $("#btnSave").show();
        console.log(selectedItem);
        //$("#ID").val(selectedItem.ID);
        $("#ComboCongViec").data("kendoMultiColumnComboBox").value(selectedItem.ID_CongViec);
        $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(selectedItem.ID_NguoiGiamSat);
        $("#TenCongViec").val(selectedItem.TenCongViec);
        $("#Cong").val(selectedItem.Cong);
        $("#NgayLamViec").data("kendoDatePicker").value(new Date());
        $("#ThoiGianDuKien").val(selectedItem.ThoiGianDuKien);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#DiaDiem").val(selectedItem.DiaDiem);
        $("#SoNguoiDuKien").val(selectedItem.SoNguoiDuKien);
        var ThoiGianBatDauDuKien = new Date();
        ThoiGianBatDauDuKien.setHours(selectedItem.ThoiGianBatDauDuKien.getHours());
        ThoiGianBatDauDuKien.setMinutes(selectedItem.ThoiGianBatDauDuKien.getMinutes());
        var ThoiGianKetThucDuKien = new Date();
        ThoiGianKetThucDuKien.setHours(selectedItem.ThoiGianKetThucDuKien.getHours());
        ThoiGianKetThucDuKien.setMinutes(selectedItem.ThoiGianKetThucDuKien.getMinutes());
        $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(ThoiGianBatDauDuKien);
        $("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(ThoiGianKetThucDuKien);

        var dataS = []
        for (var i = 0; i < selectedItem.lstNhanVien.length; i++) {
            if (selectedItem.lstNhanVien[i].TrangThai == 0) {
                dataS.push(selectedItem.lstNhanVien[i])
            }
        }
        var dataSource = new kendo.data.DataSource({
            data: dataS,
            schema: {
                model: {
                    ID: "ID",
                    field: {
                        NgaySinh: {
                            type: 'date'
                        }
                    }
                }
            },
            //pageSize: 20,
        });

        $("#gridNhanVien").data("kendoGrid").setDataSource(dataSource);

        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }


    }
}

function TimKiem() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/KeHoach/GetAllKeHoachByNgay' + "?Ngay=" + kendo.toString($("#Ngay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00",
        type: 'GET',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        for (var i = 0; i < response.length; i++) {
            var lst1 = []
            var lst2 = []
            response[i].TongCong = 0;
            response[i].CongTT = 0;
            if (response[i].lstNhanVien) {
                for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                    if (response[i].lstNhanVien[j].TrangThai == 0) {
                        lst1.push(response[i].lstNhanVien[j]);
                        response[i].TongCong = response[i].TongCong + response[i].lstNhanVien[j].Cong;
                    } else {
                        lst2.push(response[i].lstNhanVien[j]);
                        response[i].CongTT = response[i].CongTT + response[i].lstNhanVien[j].Cong;
                    }
                }
            }
            response[i].SlgDK = lst1.length > response[i].SoNguoiDuKien ? lst1.length : response[i].SoNguoiDuKien;
            response[i].SlgTT = lst2.length;
            response[i].SlgCL = response[i].SlgTT - response[i].SlgDK;
            response[i].CongCL = response[i].TongCong - response[i].CongTT;
            var strTo = "";
            var strMa = "";


        }

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayLamViec: { type: 'date', editable: false },
                        NgayTao: { type: 'date', editable: false },
                        ThoiGianBatDauDuKien: { type: 'date', editable: false },
                        ThoiGianKetThucDuKien: { type: 'date', editable: false },
                        ThoiGianBatDauThucTe: { type: 'date', editable: false },
                        ThoiGianKetThucThucTe: { type: 'date', editable: false },
                    }
                }
            },
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);

        kendo.ui.progress($("#grid"), false);

    });
}

function LoadGridData() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/KeHoach/GetAllKeHoach',
        type: 'GET',
    }).done(function successCallback(r) {
        response = JSON.parse(r);
        for (var i = 0; i < response.length; i++) {
            var lst1 = []
            var lst2 = []
            response[i].TongCong = 0;
            response[i].CongTT = 0;
            if (response[i].lstNhanVien) {
                for (var j = 0; j < response[i].lstNhanVien.length; j++) {
                    if (response[i].lstNhanVien[j].TrangThai == 0) {
                        lst1.push(response[i].lstNhanVien[j]);
                        response[i].TongCong = response[i].TongCong + response[i].lstNhanVien[j].Cong;
                    } else {
                        lst2.push(response[i].lstNhanVien[j]);
                        response[i].CongTT = response[i].CongTT + response[i].lstNhanVien[j].Cong;
                    }
                }
            }
            response[i].SlgDK = lst1.length > response[i].SoNguoiDuKien ? lst1.length : response[i].SoNguoiDuKien;
            response[i].SlgTT = lst2.length;
            response[i].SlgCL = response[i].SlgTT - response[i].SlgDK;
            response[i].CongCL = response[i].TongCong - response[i].CongTT;
            var strTo = "";
            var strMa = "";


        }

        var dataSource = new kendo.data.DataSource({
            data: response,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        NgayLamViec: { type: 'date', editable: false },
                        NgayTao: { type: 'date', editable: false },
                        ThoiGianBatDauDuKien: { type: 'date', editable: false },
                        ThoiGianKetThucDuKien: { type: 'date', editable: false },
                        ThoiGianBatDauThucTe: { type: 'date', editable: false },
                        ThoiGianKetThucThucTe: { type: 'date', editable: false },
                    }
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
    //if ($(window).width() > 800) {
    //    $("#window").data("kendoWindow").center().open();
    //} else {
    var dataSource = new kendo.data.DataSource({
        data: [],
        schema: {
            model: {
                ID: "ID",
                field: {
                    Cong: {
                        type: 'number',
                        editable: true
                    }
                }
            }
        },
        aggregate: [{ field: "DonGia", aggregate: "sum" }],
        //pageSize: 20,
    });
    $("#btnSave").show();
    $("#gridToNhom").data("kendoGrid").setDataSource(dataSource);
    $("#window").data("kendoWindow").center().maximize().open();
    //}
}

function ValidateForm() {
    var validten = SetValidate("ComboCongViec");
    var validgs = SetValidate("ComboNguoiGiamSat");
    var validma = SetValidate("Cong");
    var validdiachi = SetValidate("DiaDiem");
    var validngay = SetValidate("NgayLamViec");
    var validthoigian = SetValidate("ThoiGianDuKien");
    var validthoigianbatdau = SetValidate("ThoiGianBatDauDuKien");
    var validthoigianketthuc = SetValidate("ThoiGianKetThucDuKien");
    var valid = validma && validten && validdiachi && validngay && validthoigian && validgs && validthoigianbatdau && validthoigianketthuc;
    return valid;
}
function Luu() {

    var bangDuLieuToNhom = $("#gridToNhom").data("kendoGrid").dataSource.data();
    var bangDuLieuToNhomVienKeHoach = [];
    var songuoi = 0;
    $.each(bangDuLieuToNhom, function (index, item) {
        bangDuLieuToNhomVienKeHoach.push({
            ID_ToNhom: item.ID_ToNhom,
            SoNguoi: item.SoNguoi
        });

        songuoi += item.SoNguoi
    })
    var hours = Math.abs($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value() - $("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value())

    if (ValidateForm()) {

        if (hours < 0) {
            notification.show({ kValue: "Thời gian không hợp lệ" }, "error");
        } else {
            var dataSave = {
                ID: $("#ID").val(),
                GhiChu: $("#GhiChu").val(),
                NgayLamViec: kendo.toString($("#NgayLamViec").data("kendoDatePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                TrangThai: 1,
                DiaDiem: $('#DiaDiem').val(),
                ID_CongViec: $("#ComboCongViec").data("kendoMultiColumnComboBox").value(),
                TenCongViec: $("#ComboCongViec").data("kendoMultiColumnComboBox").dataItem().TenCongViec,
                Cong: $('#Cong').val(),
                SoNguoiDuKien: $('#SoNguoiDuKien').val() == 0 ? songuoi : $('#SoNguoiDuKien').val(),
                ThoiGianDuKien: hours / 3600000,
                ThoiGianBatDauDuKien: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucDuKien: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ID_NguoiGiamSat: $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").value(),
                NguoiGiamSat: $("#ComboNguoiGiamSat").data("kendoMultiColumnComboBox").dataItem().TenDayDu,
                ID_CongViecThucTe: 0,
                TenCongViecThucTe: "",
                CongThucTe: 0,
                ThoiGianThucTe: "",
                SoNguoiThucTe: 0,
                ID_NguoiGiamSatThucTe: 0,
                NguoiGiamSatThucTe: "",
                ThoiGianBatDauThucTe: kendo.toString($("#ThoiGianBatDauDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                ThoiGianKetThucThucTe: kendo.toString($("#ThoiGianKetThucDuKien").data("kendoDateTimePicker").value(), 'yyyy-MM-dd HH:mm:ss'),
                lstToNhomKeHoach: bangDuLieuToNhomVienKeHoach

            }
            console.log(dataSave);
            $.ajax({
                url: '/KeHoach/InsertOrUpdate_KeHoachV3',
                type: 'POST',
                data: dataSave
            }).done(function successCallback(response) {
                if (response.success) {
                    notification.show({ kValue: response.msg }, "success");
                    Huy();
                    TimKiem()
                } else {
                    notification.show({ kValue: response.msg }, "error");
                }
            });


        }

    }
}

function editPhieu(uid) {
    $("#grid").data("kendoGrid").clearSelection();
    console.log(this);
    var row = $("#grid").data("kendoGrid").table.find("[data-uid=" + uid + "]");
    $("#grid").data("kendoGrid").select(row);
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    openEditWindow();
}

function Huy() {
    document.getElementById("formChiTiet").reset();
    $("#ID").val('');
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function HuyThemNhanVien() {
    $("#windowNhanVien").data("kendoWindow").close();
    $("#gridAddNhanVien").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length + " công việc?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần xóa</b>");
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
        url: '/KeHoach/DeleteMulti_KeHoach?ID=' + ids.join(','),
        type: 'POST'
    }).done(function (response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            //LoadGridData();
            TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}

function selectTo(tag, TenToNhom) {
    var checked = document.getElementById(tag.id).checked;

    //var select = [];
    if (checked) {
        $.each(itemToSelect, function (index, item) {
            if (item.TenToNhom == TenToNhom) {
                $.each(item.items, function (idx, itm) {
                    selectUID.push(itm.uid);
                    //select.push(itm.uid);
                })
            }
        })
    }
    else {
        $.each(itemToSelect, function (index, item) {
            if (item.TenToNhom == TenToNhom) {
                $.each(item.items, function (idx, itm) {
                    let index = selectUID.indexOf(itm.uid);
                    if (index > -1) {
                        selectUID.splice(index, 1);
                    }
                })
            }
        })
    }
    var grid = $("#gridAddNhanVien").data("kendoGrid");
    var selectedItem = grid.select();

    refreshCheckBox(selectUID);
    //grid.clearSelection();
    //$.each(selectUID, function (index, item) {
    //    grid.select("tr[data-uid='" + item + "']");
    //})
    //console.log(selectItems);   
}

function refreshCheckBox(uids) {
    var grid = $("#gridAddNhanVien").data("kendoGrid");
    grid.clearSelection();
    $.each(uids, function (index, item) {
        grid.select("tr[data-uid='" + item + "']");
    })
}

function LuuAddNhanVien() {
    $("#windowNhanVien").data("kendoWindow").close();
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var arr_idnhanvien = [];
    var bangDuLieuAddNhanVien = $("#gridAddNhanVien").data("kendoGrid");
    bangDuLieuAddNhanVien.select().each(function () {
        var dataItem = bangDuLieuAddNhanVien.dataItem(this);
        //console.log(dataItem);
        //bangDuLieuNhanVien.push({
        //    ID: dataItem.ID,
        //    TenDayDu: dataItem.TenDayDu,
        //    SoDienThoai: dataItem.SoDienThoai,
        //    Email: dataItem.Email,
        //    CCCD: dataItem.CCCD,
        //    NgaySinh: dataItem.NgaySinh,
        //    DiaChi: dataItem.DiaChi,
        //    TrangThai: dataItem.TrangThai,
        //    MaNhanVien: dataItem.MaNhanVien
        //});
        arr_idnhanvien.push(dataItem.ID);
    });


    $.ajax({
        url: '/KeHoach/UpdateDanhSachNhanVien',
        type: 'POST',
        data: {
            lst_id: arr_idnhanvien.join(','),
            ID_KeHoach: selectedItem.ID
        }
    }).done(function successCallback(response) {
        if (response.success) {
            notification.show({ kValue: response.msg }, "success");
            Huy();
            TimKiem();
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })


}