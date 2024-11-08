$(document).ready(function () {

    $("#month").kendoDatePicker({
        format: "MM/yyyy",
        value: new Date(),
        depth: "year",
        start: "year",
    })
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    $("#grid").kendoGrid({
        height: function () {
            var height = $(window).height() - 200;
            return height;
        },
        scrollable: true,
        editable: true,
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
                 field: "MaNhanVien",
                 title: "Mã nhân viên",
                 width: "150px",
                 editable: function () {
                     return false;
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
                     style: "text-align: left;",
                 }
             },
             {
                 field: "TenDayDu",
                 title: "Tên nhân viên",
                 width: "150px",
                 editable: function () {
                     return false;
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
                     style: "text-align: left;",
                 }
             },
             {
                 field: "TenChucDanh",
                 title: "Chức vụ",
                 width: "150px",
                 editable: function () {
                     return false;
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
                     style: "text-align: left;",
                 }
             },
             {
                 field: "TenPhongBan",
                 title: "Phòng ban",
                 width: "150px",
                 editable: function () {
                     return false;
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
                     style: "text-align: left;",
                 }
             },
            {
                field: "MucLuongDongBaoHiem",
                title: "Mức lương",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
            {
                title: "Người SDLĐ phải đóng",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "SDLD_BHXH",
                        title: "BHXH 17,5%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                    {
                        field: "SDLD_BHYT",
                        title: "BHYT 3%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                    {
                        field: "SDLD_BHTN",
                        title: "BHTN",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                ]
            },
            {
                field: "SDLD_Tong",
                title: "Tổng công ty đóng 21,5%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
            {
                field: "SDLD_ThucTe",
                title: "Tổng công ty đóng thực tế%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
            {
                title: "NLĐ phải đóng",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "NLD_BHXH",
                        title: "BHXH 8%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                    {
                        field: "NLD_BHYT",
                        title: "BHYT 1,5%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                    {
                        field: "NLD_BHTN",
                        title: "BHTN 1%",
                        width: "150px",
                        filterable: {
                            cell: {
                                operator: "contains",
                                showOperators: false,
                                template: function (e) {
                                    e.element.kendoNumericTextBox({
                                        format: "#,##0.00",
                                        decimals: 2,
                                        min: 0
                                    }).css("width", "100%");
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
                    },
                ]
            },
            {
                field: "NLD_Tong",
                title: "Tổng NLĐ đóng 10,5%",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
            {
                field: "NLD_ThucTe",
                title: "Tổng NLĐ đóng thực tế",
                width: "150px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
            {
                field: "Tong",
                title: "Tổng 32%",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "contains",
                        showOperators: false,
                        template: function (e) {
                            e.element.kendoNumericTextBox({
                                format: "#,##0.00",
                                decimals: 2,
                                min: 0
                            }).css("width", "100%");
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
            },
        ]
    });

    $("#dialogRoot").kendoDialog().data("kendoDialog").close();

})

function TimKiem() {
    var date = $("#month").data("kendoDatePicker").value();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();
    var url = '/BaoHiemXaHoi_LichSu/GetByThang?Thang=' + month + '&Nam=' + year;
    console.log(url);


    $.ajax({
        url: url,
        type: 'GET',
        error: function (request, error) {
            console.log(error);
        },
    }).done(function successCallback(response) {
        kendo.ui.progress($("#grid"), true);
        parsedResponse = JSON.parse(response)
        console.log(parsedResponse)
        console.log(Array.isArray(parsedResponse));
        var dataSource = new kendo.data.DataSource({
            data: parsedResponse,
            schema: {
                model: {
                    ID: "ID_HoSoNhanSu",
                }
            },
            pageSize: 20,
        });
        console.log(dataSource);
        $("#grid").data("kendoGrid").setDataSource(dataSource);
        kendo.ui.progress($("#grid"), false)
    });
}

function XacNhanLuu(dirtyItems) {
    var listData = [];
    var date = $("#month").data("kendoDatePicker").value();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();
    $.each(dirtyItems, function (index, item) {
        if (item.GhiChu == null) {
            item.GhiChu = ''
        }
        if (item.MoTa == null) {
            item.MoTa = ''
        }
        var dataItem = {
            ID: 0,
            MucLuongDongBaoHiem: item.MucLuongDongBaoHiem,
            SDLD_BHXH: item.SDLD_BHXH,
            SDLD_BHYT: item.SDLD_BHYT,
            SDLD_BHTN: item.SDLD_BHTN,
            SDLD_Tong: item.SDLD_Tong,
            SDLD_ThucTe: item.SDLD_ThucTe,
            NLD_BHXH: item.NLD_BHXH,
            NLD_BHYT: item.NLD_BHYT,
            NLD_BHTN: item.NLD_BHYT,
            NLD_Tong: item.NLD_Tong,
            NLD_ThucTe: item.NLD_ThucTe,
            Tong: item.Tong,
            GhiChu: item.GhiChu,
            MoTa: item.MoTa,
            ID_HoSoNhanSu: item.ID_HoSoNhanSu,
            ID_BaoHiemXaHoi: item.ID_BaoHiemXaHoi,
            Thang: month,
            Nam: year
        }
        listData.push(dataItem);
    })
    console.log(listData);
    $.ajax({
        url: '/BaoHiemXaHoi_LichSu/InsertOrUpdate',
        type: 'POST',
        data: {
            list: listData
        },
    }).done(function successCallback(response) {
        if (response.success) {
            $("#grid").data("kendoGrid").clearSelection();
            TimKiem();
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function Luu() {
    var grid = $("#grid").data("kendoGrid");
    var dirtyItems = grid.dataSource.data().filter(function (item) {
        return item.dirty === true;
    });
    console.log(dirtyItems);
    if (dirtyItems.length > 0) {
        var editedCount = dirtyItems.length;
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn lưu thay đổi " + editedCount + " lịch sử thông tin bảo hiểm không?</b>", function () { XacNhanLuu(dirtyItems); }, function () { }
        );
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải thay đổi dữ liệu để lưu</b>");
    }
}

