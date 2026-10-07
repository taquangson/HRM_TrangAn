
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

//function TinhBangLuong() {
//    kendo.ui.progress($("#grid"), true);
//    var date = $("#Thang").data("kendoDatePicker").value();
//    var thang = kendo.toString(date, "MM");
//    var nam = kendo.toString(date, "yyyy");
//    $.ajax({
//        url: '/BangLuong/GetDataTinhBangLuong?ngay=0&tuan=0&quy=0&thang=' + thang + "&nam=" + nam,
//        type: 'GET',
//    }).done(function successCallback(response) {
//        TimKiem()
//        kendo.ui.progress($("#grid"), false);
//    })
//}

function TimKiem() {
    kendo.ui.progress($("#grid"), true);
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
        locked: true,
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
        locked: true,
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
        locked: true,
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
        locked: true,
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
        locked: true,
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
        locked: true,
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

    listColumn.push({
        field: "MucLuong",
        title: "Mức lương",
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


    var date = $("#Thang").data("kendoDatePicker").value();
    var thang = kendo.toString(date, "MM");
    var nam = kendo.toString(date, "yyyy");

    $.ajax({
        url: '/ChinhSachLuong/GetAllChinhSachLuongByThangNam?Thang=' + thang + "&Nam=" + nam,
        //url: '/Content/ChinhSachLuong/' + nam + '-' + parseInt(thang) + '.json',
        type: 'GET',
    }).done(function successCallback(response) {
        var dynamicColumn = [];
        $.each(response, function (index, item) {
            console.log(item);
            if (item.Loai == 1) {
                dynamicColumn.push({
                    //field: item.ID_LoaiHopDong == 1 ? item.Ma : item.Ma + '_TV',
                    field: item.Ma,
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
            title: "Tổng lương theo ngày công",
            aggregates: ["sum"],
            groupHeaderColumnTemplate: function (e) {
                if (e.TongTienLuong) {
                    return '<b class="groupHeaderSum">' + kendo.toString(e.TongTienLuong.sum, "N2") + '</b>'
                } else if (e.aggregates.TongTienLuong) {

                    return kendo.toString(e.aggregates.TongTienLuong.sum, "N2");
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
            format: '{0:N2}',
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
            field: "LuongLeTet",
            title: "Lương lễ tết",
            aggregates: ["sum"],
            groupHeaderColumnTemplate: function (e) {
                if (e.LuongLeTet) {
                    return '<b class="groupHeaderSum">' + kendo.toString(e.LuongLeTet.sum, "N0") + '</b>'
                } else if (e.aggregates.LuongLeTet) {

                    return kendo.toString(e.aggregates.LuongLeTet.sum, "N0");
                } else {
                    return "";
                }
            },
            footerTemplate: function (e) {
                if (e.LuongLeTet) {
                    return kendo.toString(e.LuongLeTet.sum, "N0");
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

            dynamicColumn1.push({
                field: 'HoTroXuatAn',
                title: 'Hỗ trợ xuất ăn',
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.HoTroXuatAn) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.HoTroXuatAn.sum ? e.HoTroXuatAn.sum : 0, "N0") + '</b>'
                    } else if (e.aggregates.HoTroXuatAn) {

                        return kendo.toString(e.aggregates.HoTroXuatAn.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.HoTroXuatAn) {
                        return kendo.toString(e.HoTroXuatAn.sum ? e.HoTroXuatAn.sum : 0, "N0");
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
            dynamicColumn1.push({
                field: 'HoTroTrucDemDenTran',
                title: 'Trực đêm đền Trần',
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.HoTroTrucDemDenTran) {
                        return '<b class="groupHeaderSum">' + kendo.toString(e.HoTroTrucDemDenTran.sum ? e.HoTroTrucDemDenTran.sum : 0, "N0") + '</b>'
                    } else if (e.aggregates.HoTroTrucDemDenTran) {

                        return kendo.toString(e.aggregates.HoTroTrucDemDenTran.sum, "N0");
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.HoTroTrucDemDenTran) {
                        return kendo.toString(e.HoTroTrucDemDenTran.sum ? e.HoTroTrucDemDenTran.sum : 0, "N0");
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
                title: "Các khoản cộng vào lương",
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
                title: "Tổng lương",
                aggregates: ["sum"],
                groupHeaderColumnTemplate: function (e) {
                    if (e.LuongThucNhan) {
                        return '<b class="groupHeaderSum">' + kendo.toString(roundToHundreds(e.LuongThucNhan.sum), "N0") + '</b>'
                        //return '<b class="groupHeaderSum">' + roundToHundreds(e.LuongThucNhan.sum) + '</b>'
                    } else if (e.aggregates.LuongThucNhan) {

                        return kendo.toString(roundToHundreds(e.aggregates.LuongThucNhan.sum), "N0");
                        //return roundToHundreds(e.aggregates.LuongThucNhan.sum)
                    } else {
                        return "";
                    }
                },
                footerTemplate: function (e) {
                    if (e.LuongThucNhan) {
                        //return roundToHundreds(e.LuongThucNhan.sum)
                        return kendo.toString(roundToHundreds(e.LuongThucNhan.sum), "N0");
                    }
                },
                footerAttributes: { style: "text-align: right; font-weight:700" },
                width: "150px",
                //format: '{0:N0}',
                template: function (e) {
                    if (e.LuongThucNhan) {
                        return kendo.toString(roundToHundreds(e.LuongThucNhan), "N0");
                    } else {
                        return "";
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
                    style: "text-align: right;"
                }
            });

            listColumn.push({
                field: "",
                title: "Dữ liệu lương",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "CongChuan",
                        title: "Công chuẩn",
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
                    },
                    {
                        field: "SoCong",
                        title: "Ngày công đi làm",
                        width: "150px",
                        format: '{0:N2}',
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
                    },
                    {
                        field: "SoCongLeTet",
                        title: "Ngày công lễ tết",
                        width: "150px",
                        format: '{0:N2}',
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
                    },
                    {
                        field: "TrucDem",
                        title: "Công đêm",
                        width: "150px",
                        format: '{0:N2}',
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
                    },
                    {
                        field: "TrucDemDenTran",
                        title: "Công đêm đền Trần",
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
                    },
                    {
                        field: "XuatAn",
                        title: "Số suất ăn",
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
                    },
                ]
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
            aggreate.push({ field: "LuongLeTet", aggregate: "sum" });
            aggreate.push({ field: "HoTroXuatAn", aggregate: "sum" });
            aggreate.push({ field: "HoTroTrucDemDenTran", aggregate: "sum" });
            //aggreate.push({ field: "TongTienPhuCap", aggregate: "sum" });
            //aggreate.push({ field: "TongTienGiamTru", aggregate: "sum" });
            aggreate.push({ field: "LuongThucNhan", aggregate: "sum" });
            //aggreate.push({ field: "TienPhat", aggregate: "sum" });
            //aggreate.push({ field: "NLD_ThucTe", aggregate: "sum" });

            $.ajax({
                url: '/BangLuong/GetBangLuong?tuan=' + tuan + '&thang=' + thang + '&quy=' + quy + '&nam=' + nam,
                //url: '/Content/BangLuong/' + nam + '-' + parseInt(thang) + '-' + quy + '-' + tuan + '.json',
                type: 'GET',
            }).done(function successCallback(BLresponse) {
                var listBL = JSON.parse(BLresponse);
                //var listBL = BLresponse;
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
                kendo.ui.progress($("#grid"), false);
            })
        });
    });



}
function roundToHundreds(num) {
    return Math.round(num / 100) * 100;
}


function XuatExcel() {
    $("#grid").data("kendoGrid").saveAsExcel();
}
