
var aggreate = [];
$(document).ready(function () {

    $("#Thang").kendoDatePicker({
        depth: "year",
        start: "year",
        format: "MM/yyyy",
        value: new Date()
    })
    //TimKiem();
})

function TimKiem() {
    var date = $("#Thang").data("kendoDatePicker").value();
    var tuan = 0;
    var thang = kendo.toString(date, "MM");
    var quy = 0;
    var nam = kendo.toString(date, "yyyy");

    if ($("#grid").data("kendoGrid"))
        $("#gridContainer").html('<div id="grid"></div>');

    var listColumn = [];
    listColumn.push({
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
    });
    listColumn.push({
        field: "MaNhanVien",
        width: "150px",
        title: "Mã Nhân Viên",
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
    });
    listColumn.push({
        field: "TenDayDu",
        width: "150px",
        title: "Tên Nhân Viên",
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
    });

    listColumn.push({
        field: "TenPhongBan",
        width: "150px",
        title: "Bộ phận",
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
    });

    listColumn.push({
        field: "TenChucDanh",
        width: "150px",
        title: "Chức vụ",
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
    });


    listColumn.push({
        field: "TenLoaiHopDong",
        width: "150px",
        title: "Loại hợp đồng",
        //template: function (e) {
        //    if (e.ID_LoaiHopDong == 0) {
        //        return "Thử việc";
        //    }
        //    if (e.ID_LoaiHopDong == 1) {
        //        return "Chính thức";
        //    }
        //    if (e.ID_LoaiHopDong == 2) {
        //        return "Học việc";
        //    }
        //    else {
        //        return "";
        //    }
        //},
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
    });


    var date = $("#Thang").data("kendoDatePicker").value();
    var thang = kendo.toString(date, "MM");
    var nam = kendo.toString(date, "yyyy");

    $.ajax({
        url: '/ChinhSachLuong/GetAllChinhSachLuongByThangNam?Thang=' + thang + "&Nam=" + nam,
        type: 'GET',
    }).done(function successCallback(response) {
        var dynamicColumn = [];
        $.each(response, function (index, item) {
            if (item.Loai == 1) {
                dynamicColumn.push({
                    field: item.Loai == 1 ? item.Ma + '_DM' : item.Ma,
                    title: item.Ten,
                    format: '{0:N0}',
                    aggregates: ["sum"],
                    groupHeaderColumnTemplate: function (e) {
                        console.log(e);
                        if (e[item.Ma]) {
                            return '<b class="groupHeaderSum">' + (e[item.Ma].sum ? kendo.toString(e[item.Ma].sum, "N0") : '0') + '</b>';
                        } else if (e.aggregates[item.Ma]) {

                            return kendo.toString(e.aggregates[item.Ma].sum, "N0");
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: function (e) {
                        if (e[item.Ma]) {
                            return kendo.toString(e[item.Ma].sum ? e[item.Ma].sum : 0, "N0");
                        }
                    },
                    footerAttributes: { style: "text-align: right; font-weight:700" },
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
                        style: "text-align: right;"
                    }
                });
                aggreate.push({ field: item.Ma, aggregate: "sum" })
            }
        })

        listColumn.push({
            field: "",
            title: "Lương và các khoản phụ cấp theo lương",
            headerAttributes: {
                style: "text-align: center; font-size: 12px; font-weight:bold",
                class: "table-header-cell"
            },
            columns: dynamicColumn
        });

        listColumn.push({
            field: "TongTienLuong",
            title: "Tổng lương",
            aggregates: ["sum"],
            groupHeaderColumnTemplate: function (e) {
                if (e.TongTienLuong) {
                    return '<b class="groupHeaderSum">' + kendo.toString(e.TongTienLuong.sum, "N0") + '</b>'
                } else if (e.aggregates.TongTienLuong) {

                    return kendo.toString(e.aggregates.TongTienLuong.sum, "N0");
                } else {
                    return "";
                }
            },
            footerTemplate: function (e) {
                if (e.TongTienLuong) {
                    return kendo.toString(e.TongTienLuong.sum, "N0");
                }
            },
            footerAttributes: { style: "text-align: right; font-weight:700" },
            width: "150px",
            format: '{0:N0}',
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
                style: "text-align: right;"
            }
        });

        $.ajax({
            url: '/NoiDungPhuCap/GetAll',
            type: 'GET',
        }).done(function successCallback(response) {
            var dynamicColumn1 = [];
            var dynamicColumn2 = [];

            dynamicColumn2.push({
                field: 'NLD_ThucTe',
                title: 'BHXH',
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.NLD_ThucTe) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.NLD_ThucTe.sum ? e.NLD_ThucTe.sum : 0, "N0") + '</b>'
                    } else if (e.aggregates.NLD_ThucTe) {

                        return kendo.toString(e.aggregates.NLD_ThucTe.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.NLD_ThucTe) {
                        return kendo.toString(e.NLD_ThucTe.sum ? e.NLD_ThucTe.sum : 0, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                format: '{0:N0}',
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
                    style: "text-align: right;"
                }
            });
            dynamicColumn2.push({
                field: 'TienPhat',
                title: 'Xử lý vi phạm',
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.TienPhat) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.TienPhat.sum ? e.TienPhat.sum : 0, "N0") + '</b>'
                    } else if (e.aggregates.TienPhat) {

                        return kendo.toString(e.aggregates.TienPhat.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.TienPhat) {
                        return kendo.toString(e.TienPhat.sum ? e.TienPhat.sum : 0, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                format: '{0:N0}',
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
                    style: "text-align: right;"
                }
            });

            $.each(response, function (index, item) {
                if (item.Loai == 1) {
                    dynamicColumn1.push({
                        field: item.Ma,
                        title: item.Ten,
                        aggregates: ["sum"],
                        groupHeaderColumnTemplate: function (e) {
                            console.log(e);
                            if (e[item.Ma]) {
                                return '<b class="groupHeaderSum">' + (e[item.Ma].sum ? kendo.toString(e[item.Ma].sum, "N0") : '0') + '</b>';
                            } else if (e.aggregates[item.Ma]) {

                                return kendo.toString(e.aggregates[item.Ma].sum, "N0");
                            } else {
                                return "";
                            }
                        },
                        footerTemplate: function (e) {
                            if (e[item.Ma]) {
                                return kendo.toString(e[item.Ma].sum ? e[item.Ma].sum : 0, "N0");
                            }
                        },
                        footerAttributes: { style: "text-align: right; font-weight:700" },
                        width: "150px",
                        format: '{0:N0}',
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
                            style: "text-align: right;"
                        }
                    })
                } else if (item.Loai == -1) {
                    dynamicColumn2.push({
                        field: item.Ma,
                        title: item.Ten,
                        aggregates: ["sum"],
                        groupHeaderColumnTemplate: function (e) {
                            console.log(e);
                            if (e[item.Ma]) {
                                return '<b class="groupHeaderSum">' + (e[item.Ma].sum ? kendo.toString(e[item.Ma].sum, "N0") : '0') + '</b>';
                            } else if (e.aggregates[item.Ma]) {

                                return kendo.toString(e.aggregates[item.Ma].sum, "N0");
                            } else {
                                return "";
                            }
                        },
                        footerTemplate: function (e) {
                            if (e[item.Ma]) {
                                return kendo.toString(e[item.Ma].sum ? e[item.Ma].sum : 0, "N0");
                            }
                        },
                        footerAttributes: { style: "text-align: right; font-weight:700" },
                        width: "150px",
                        format: '{0:N0}',
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
                            style: "text-align: right;"
                        }
                    })
                }
                aggreate.push({ field: item.Ma, aggregate: "sum" })
            })

            listColumn.push({
                field: "",
                title: "Các khoản phụ cấp khác",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: dynamicColumn1
            });

            listColumn.push({
                field: "TongTienPhuCap",
                title: "Tổng phụ cấp",
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.TongTienPhuCap) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.TongTienPhuCap.sum, "N0") + '</b>'
                    } else if (e.aggregates.TongTienPhuCap) {

                        return kendo.toString(e.aggregates.TongTienPhuCap.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.TongTienPhuCap) {
                        return kendo.toString(e.TongTienPhuCap.sum ? e.TongTienPhuCap.sum : 0, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                format: '{0:N0}',
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
                    style: "text-align: right;"
                }
            });

            listColumn.push({
                field: "",
                title: "Các khoản giảm trừ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: dynamicColumn2
            });

            listColumn.push({
                field: "TongTienGiamTru",
                title: "Tổng giảm trừ",
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.TongTienGiamTru) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.TongTienGiamTru.sum, "N0") + '</b>'
                    } else if (e.aggregates.TongTienGiamTru) {

                        return kendo.toString(e.aggregates.TongTienGiamTru.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.TongTienGiamTru) {
                        return kendo.toString(e.TongTienGiamTru.sum, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                format: '{0:N0}',
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
                    style: "text-align: right;"
                }
            });

            listColumn.push({
                field: "LuongThucNhan",
                title: "Lương thực nhận",
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.LuongThucNhan) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.LuongThucNhan.sum, "N0") + '</b>'
                    } else if (e.aggregates.LuongThucNhan) {

                        return kendo.toString(e.aggregates.LuongThucNhan.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.LuongThucNhan) {
                        return kendo.toString(e.LuongThucNhan.sum, "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                width: "150px",
                format: '{0:N0}',
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
                    style: "text-align: right;"
                }
            });

            $("#grid").kendoGrid({
                height: function () {
                    var height = $(window).height() - 200;
                    return height;
                },
                scrollable: true,
                persistSelection: true,
                autoFitColumn: true,
                resizable: true,
                sortable: true,
                //filterable:true,
                filterable: {
                    mode: "row",
                },
                pageable: pageableShort,
                dataBinding: function () {
                    record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
                },
                columns: listColumn
            });

            aggreate.push({ field: "TongTienLuong", aggregate: "sum" });
            aggreate.push({ field: "TongTienPhuCap", aggregate: "sum" });
            aggreate.push({ field: "TongTienGiamTru", aggregate: "sum" });
            aggreate.push({ field: "LuongThucNhan", aggregate: "sum" });
            aggreate.push({ field: "TienPhat", aggregate: "sum" });
            aggreate.push({ field: "NLD_ThucTe", aggregate: "sum" });

            $.ajax({
                url: '/BangLuong/GetBangLuong?tuan=' + tuan + '&thang=' + thang + '&quy=' + quy + '&nam=' + nam,
                type: 'GET',
            }).done(function successCallback(BLresponse) {
                var listBL = JSON.parse(BLresponse);
                console.log(listBL);
                var dataSource = new kendo.data.DataSource({
                    data: listBL,
                    group: {
                        field: "TenPhongBan", aggregates: aggreate
                    },

                    aggregate: aggreate,
                    pageSize: 500,
                });
                $("#grid").data("kendoGrid").setDataSource(dataSource);
            })
        });
    });



}