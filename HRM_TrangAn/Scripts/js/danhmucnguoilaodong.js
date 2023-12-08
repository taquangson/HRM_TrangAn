$(".main_container").hide();
var anhnhanvien = [];
var SERVERIMAGE = "https://hrm.disantrangan.vn/"

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
var canvas, camera_button, video;
$(document).ready(function () {
    canvas = document.querySelector("#canvas");
    camera_button = document.querySelector("#start-camera");
    video = document.querySelector("#video");
    click_button = document.querySelector("#click-photo");

    camera_button.addEventListener('click', async function () {
        let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
        video.srcObject = stream;
        //navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 400 }, audio: false })
        //    .then(stream => video.srcObject = stream)
    });

    click_button.addEventListener('click', function () {
        //400x225 => 
        canvas.getContext('2d').drawImage(video, 150, 0, 900, 1200, 0, 0, 900, 1200);
        let image_data_url = canvas.toDataURL('image/jpeg');

        // data url of the image
        var block = image_data_url.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];// In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
        var blob = b64toBlob(realData, contentType);
        var fileInfo = {
            rawFile: blob,
            name: "anhchup.png"
        };
        PushFormDataFile2(fileInfo, $("#fileManager").data("kendoUpload").wrapper);
    });

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
        save: function (e) {
            console.log(e);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        },
        excelExport: function (e) {
            var columns = e.workbook.sheets[0].columns;
            var sheet = e.workbook.sheets[0];
            sheet.title = "Danh sách lao động";
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
        columns: [
            {
                width: "26px",
                selectable: true,
                locked: true,
                headerAttributes: {
                    style: "text-align:left",
                    class: "table-header-cell "
                }
            },
            {
                title: "STT",
                template: "#= ++record #",
                locked: true,
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
                title: "Mã Nhân viên/Mã Số Ticket",
                locked: true,
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
                field: "MaThuyen",
                title: "Mã số đò",
                locked: true,
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
                field: "TenDayDu",
                title: "Họ tên",
                locked: true,
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
                field: "TenChucDanh",
                title: "Chức danh",
                template: function (e) {
                    return e.TenChucDanh
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
                field: "MaToNhom",
                title: "Mã tổ",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                field: "FileAnhDaiDien",
                title: "Ảnh đại diện",
                template: function (e) {
                    if (e.FileAnhDaiDien != "0") {
                        return "<img class='avatar' src='" + e.FileAnhDaiDien + "'/>"
                    } else {
                        return "Chưa có ảnh";
                    }

                },
                width: "100px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                //format: "{0:dd/MM/yyyy}",
                template: function (e) {
                    if (e.NgaySinh.getFullYear() == 1) {
                        return ""
                    } else {
                        return kendo.toString(e.NgaySinh, 'dd/MM/yyyy')
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
            {
                field: "GioiTinh",
                title: "Giới tính",
                //template: function (e) {
                //    if (e.ID_GioiTinh == 1) {
                //        return "Nữ";
                //    } else {
                //        return "Nam";
                //    }
                //},
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
                field: "NgayBatDauLamViec",
                title: "Ngày vào",
                format: "{0:dd/MM/yyyy}",
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
                field: "LoaiThuyen",
                title: "Loại thuyền",
                //template: function (e) {
                //    if (e.ID_LoaiThuyen == 1) {
                //        return "Sắt";
                //    } else {
                //        return "Inox";
                //    }
                //},
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
                field: "TinhTrangHoSo",
                title: "Hồ sơ",
                //template: function (e) {
                //    if (e.ID_TinhTrangHoSo == 0) {
                //        return "Chưa có";
                //    } else if (e.ID_TinhTrangHoSo == 1) {
                //        return "Chưa đủ";
                //    } else {
                //        return "Đủ";
                //    }
                //},
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
                title: "THÔNG TIN HỢP ĐỒNG",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "LoaiHopDong",
                        title: "Loại hợp đồng",
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
                        field: "NgayBatDauHopDong",
                        title: "Ngày bắt đầu",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "NgayKetThucHopDong",
                        title: "Ngày kết thúc",
                        format: "{0:dd/MM/yyyy}",
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
                title: "CHỨNG MINH NHÂN DÂN",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "CCCD",
                        title: "Số CMND",
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
                        field: "NgayCapCCCD",
                        title: "Ngày cấp",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "NoiCapCCCD",
                        title: "Nơi cấp",
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
                    },
                ]
            },
            {
                title: "THÔNG TIN THUẾ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "MaSoThue",
                        title: "Mã số thuế",
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
                        field: "NgayCapMaSoThue",
                        title: "Ngày cấp",
                        format: "{0:dd/MM/yyyy}",
                        template: function (e) {
                            if (e.NgayCapMaSoThue.getFullYear() > 1) {
                                return kendo.toString(e.NgayCapMaSoThue, 'dd/MM/yyyy');
                            } else {
                                return ''
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
                    {
                        field: "CoQuanThueQuanLy",
                        title: "Cơ quan thuế quản lý",
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
                    },
                ]
            },
            {
                title: "CÁC CHỨNG CHỈ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "TinhTrangCCNghiepVu",
                        title: "Nghiệp vụ du lịch",
                        //template: function (e) {
                        //    if (e.ID_TinhTrangCCNghiepVu == 0) {
                        //        return "Chưa có";
                        //    } else {
                        //        return "Đã có";
                        //    }
                        //},
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
                            style: "text-align: center;",
                        }
                    },
                    {
                        field: "TinhTrangCCDuongThuy",
                        title: "Đường thủy nội địa",
                        //template: function (e) {
                        //    if (e.ID_TinhTrangCCDuongThuy == 0) {
                        //        return "Chưa có";
                        //    } else {
                        //        return "Đã có";
                        //    }
                        //},
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
                            style: "text-align: center;",
                        }
                    },
                    {
                        field: "TinhTrangCCPCCC",
                        title: "PCCC",
                        //template: function (e) {
                        //    if (e.ID_TinhTrangCCPCCC == 0) {
                        //        return "Chưa có";
                        //    } else {
                        //        return "Đã có";
                        //    }
                        //},
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
                        field: "TinhTrangCCTiengAnh",
                        title: "Tiếng Anh",
                        //template: function (e) {
                        //    if (e.ID_TinhTrangCCTiengAnh == 0) {
                        //        return "Chưa có";
                        //    } else {
                        //        return "Đã có";
                        //    }
                        //},
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
                field: "MaTheBH",
                title: "Mã thẻ BHYT",
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
                title: "Nơi đang ký hộ khẩu",
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
                },
                attributes: {
                    style: "text-align: right;",
                    class: "table-header-cell"
                }
            },
            {
                title: "ĐỊA CHỈ CỤ THỂ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "DuongPho",
                        title: "Số nhà/Tổ/Thôn",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Phuong",
                        title: "Xã/Phường",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Quan",
                        title: "Quận/Huyện",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Tinh",
                        title: "Tỉnh/TP",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                ]
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
            },
            {
                field: "TinhTrangLamViec",
                title: "Tình trạng làm việc",
                template: function (e) {
                    if (e.TrangThai == 0) {
                        return "<span style='color:blue'>" + e.TinhTrangLamViec + "</span>";
                    }
                    else if (e.TrangThai == 2) {
                        return "<span style='color:red'>" + e.TinhTrangLamViec + "</span>";
                    }
                    else if (e.TrangThai == 1) {
                        return "<span style='color:green'>" + e.TinhTrangLamViec + "</span>";
                    }
                    else if (e.TrangThai == 3) {
                        return "<span style='color:orange'>" + e.TinhTrangLamViec + "</span>";
                    } else {
                        return "";
                    }
                },
                editor: CapNhatTrangThaiDropDown,
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
                    style: "text-align: center;",
                }
            },
            {
                field: "NguoiThan",
                title: "Vợ/Chồng/Con",
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
                field: "DienThoaiNguoiThan",
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
            },
            {
                title: "CON",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "NamSinhCon1",
                        title: "Năm sinh con 1",
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
                        field: "NamSinhCon2",
                        title: "Năm sinh con 2",
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
                        field: "NamSinhCon3",
                        title: "Năm sinh con 3",
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
                ]
            },
            {
                field: "LoaiLaiDo",
                title: "Loại lái đò",
                //template: function (e) {
                //    if (e.ID_LoaiLaiDo == 1) {
                //        return "Đi chuyên";
                //    } else {
                //        return "Đi cháy";
                //    }
                //},
                editor: CapNhatTrangThaiDropDown,
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
                field: "GhiChu",
                title: "Ghi chú",
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
                },
                attributes: {
                    style: "text-align: right;",
                    class: "table-header-cell"
                }
            },
            //{
            //    title: "",
            //    width: "150px",
            //    template: function (e) {
            //        return "<a class='k-button bg-blue text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-check' style='margin-right: 5px'> </i> Kích hoạt </a>"
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //}
        ]

    });
    $("#gridImport").kendoGrid({
        height: function () {
            var height = $(window).height() - 150;
            return height;
        },
        scrollable: true,
        persistSelection: true,
        autoFitColumn: true,
        resizable: true,
        sortable: true,
        /*editable: { mode: "incell" },*/
        save: function (e) {
            console.log(e);
            openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc của nhân viên?</b>", function () { CapNhatTrangThai(e.model.ID, e.values.TrangThai); }, function () { });

        },
        filterable: {
            mode: "row",
        },
        pageable: pageableShort,

        dataBinding: function () {
            record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
        },
        /*groupable: true,*/
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
                field: "MaNhanVien",
                title: "Mã Nhân viên/Mã Số Ticket",
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
                field: "MaToNhom",
                title: "Mã tổ",
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
                field: "MaThuyen",
                title: "Mã số đò",
                width: "100px",
                filterable: {
                    cell: {
                        operator: "equals",
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
                field: "TenDayDu",
                title: "Họ tên",
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
                field: "TenChucDanh",
                title: "Chức danh",
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
                field: "NgaySinh",
                title: "Ngày sinh",
                format: "{0:dd/MM/yyyy}",

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
                field: "GioiTinh",
                title: "Giới tính",
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
                field: "NgayBatDauLamViec",
                title: "Ngày vào",
                format: "{0:dd/MM/yyyy}",
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
                field: "LoaiThuyen",
                title: "Loại thuyền",
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
                field: "TinhTrangHoSo",
                title: "Hồ sơ",
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
                title: "THÔNG TIN HỢP ĐỒNG",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "LoaiHopDong",
                        title: "Loại hợp đồng",
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
                        field: "NgayBatDauHopDong",
                        title: "Ngày bắt đầu",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "NgayKetThucHopDong",
                        title: "Ngày kết thúc",
                        format: "{0:dd/MM/yyyy}",
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
                title: "CHỨNG MINH NHÂN DÂN",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "CCCD",
                        title: "Số CMND",
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
                        field: "NgayCapCCCD",
                        title: "Ngày cấp",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "NoiCapCCCD",
                        title: "Nơi cấp",
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
                    },
                ]
            },
            {
                title: "THÔNG TIN THUẾ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "MaSoThue",
                        title: "Mã số thuế",
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
                        field: "NgayCapMaSoThue",
                        title: "Ngày cấp",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "CoQuanThueQuanLy",
                        title: "Cơ quan thuế quản lý",
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
                    },
                ]
            },
            {
                title: "CÁC CHỨNG CHỈ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "TinhTrangCCNghiepVu",
                        title: "Nghiệp vụ du lịch",
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
                            style: "text-align: center;",
                        }
                    },
                    {
                        field: "TinhTrangCCDuongThuy",
                        title: "Đường thủy nội địa",
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
                            style: "text-align: center;",
                        }
                    },
                    {
                        field: "TinhTrangCCPCCC",
                        title: "PCCC",
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
                        field: "TinhTrangCCTiengAnh",
                        title: "Tiếng Anh",
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
                field: "MaTheBH",
                title: "Mã thẻ BHYT",
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
                title: "Nơi đang ký hộ khẩu",
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
                },
                attributes: {
                    style: "text-align: right;",
                    class: "table-header-cell"
                }
            },
            {
                title: "ĐỊA CHỈ CỤ THỂ",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "DuongPho",
                        title: "Số nhà/Tổ/Thôn",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Phuong",
                        title: "Xã/Phường",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Quan",
                        title: "Quận/Huyện",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                    {
                        field: "Tinh",
                        title: "Tỉnh/TP",
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
                            style: "text-align: right;",
                            class: "table-header-cell"
                        }
                    },
                ]
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
            },
            {
                field: "TinhTrangLamViec",
                title: "Tình trạng làm việc",
                template: function (e) {
                    if (e.TrangThai == 1) {
                        return "<span style='color:blue'>" + "Đang hoạt động" + "</span>";
                    } else if (e.TrangThai == 0) {
                        return "<span style='color:red'>Đã trả đò</span>";
                    }
                    else if (e.TrangThai == 2) {
                        return "<span style='color:red'>Nghỉ việc</span>";
                    }
                    else if (e.TrangThai == 3) {
                        return "<span style='color:red'>Tạm nghỉ</span>";
                    }
                },
                editor: CapNhatTrangThaiDropDown,
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
                    style: "text-align: center;",
                }
            },
            {
                field: "NguoiThan",
                title: "Vợ/Chồng/Con",
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
                field: "DienThoaiNguoiThan",
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
            },
            {
                title: "CON",
                headerAttributes: {
                    style: "text-align: center; font-size: 12px; font-weight:bold",
                    class: "table-header-cell"
                },
                columns: [
                    {
                        field: "NamSinhCon1",
                        title: "Năm sinh con 1",
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
                        field: "NamSinhCon2",
                        title: "Năm sinh con 2",
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
                        field: "NamSinhCon3",
                        title: "Năm sinh con 3",
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
                ]
            },
            {
                field: "LoaiLaiDo",
                title: "Loại lái đò",
                //template: function (e) {
                //    if (e.ID_LoaiLaiDo == 1) {
                //        return "Đi chuyên";
                //    } else {
                //        return "Đi cháy";
                //    }
                //},
                editor: CapNhatTrangThaiDropDown,
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
                field: "GhiChu",
                title: "Ghi chú",
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
                },
                attributes: {
                    style: "text-align: right;",
                    class: "table-header-cell"
                }
            },
            //{
            //    title: "",
            //    width: "150px",
            //    template: function (e) {
            //        return "<a class='k-button bg-blue text-center' onclick='openBaiKiemTra(" + e.ID + ")'><i class='fa fa-check' style='margin-right: 5px'> </i> Kích hoạt </a>"
            //    },
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 12px; font-weight:bold",
            //        class: "table-header-cell"
            //    },
            //    attributes: {
            //        style: "text-align: center;",
            //    }
            //}
        ]

    });

    $("#NgaySinh").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgaySinh").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayVao").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayVao").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucLamViec").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucLamViec").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayCapCCCD").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayCapCCCD").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayCapMaSoThue").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayCapMaSoThue").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayBatDauHopDong").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayBatDauHopDong").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucHopDong").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucHopDong").data("kendoDatePicker")._dateInput.setOptions({
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

    $("#NgayBatDauCCNghiepVu").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayBatDauCCNghiepVu").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucCCNghiepVu").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucCCNghiepVu").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayBatDauCCDuongThuy").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayBatDauCCDuongThuy").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucCCDuongThuy").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucCCDuongThuy").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayBatDauCCPCCC").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayBatDauCCPCCC").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucCCPCCC").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucCCPCCC").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayBatDauCCTiengAnh").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayBatDauCCTiengAnh").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#NgayKetThucCCTiengAnh").kendoDatePicker({
        format: "dd/MM/yyyy",
        dateInput: true
    })
    $("#NgayKetThucCCTiengAnh").data("kendoDatePicker")._dateInput.setOptions({
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
    $("#windowAddChucDanh").kendoWindow({
        width: 500,
        height: 250,
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

    $.ajax({
        url: '/ThuyenDo/GetAllThuyenDo',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });

        $("#ComboThuyen").kendoMultiColumnComboBox({
            dataTextField: "MaThuyen",
            dataValueField: "ID",
            columns: [
                {
                    field: "MaThuyen",
                    title: "Mã số đò",
                    width: "200px",
                },
                {
                    field: "MaNhanVien",
                    title: "Mã Nhân viên/Mã Số Ticket",
                    width: "200px",
                },
                {
                    field: "LoaiThuyen",
                    title: "Loại thuyền",
                    template: function (e) {
                        if (e.LoaiThuyen == 1) {
                            return "Sắt";
                        } else {
                            return "Inox";
                        }
                    },
                    width: "200px",
                },
            ],
            footerTemplate: 'Tổng #: instance.dataSource.total() # thuyền',
            filter: "contains",
            filterFields: ["MaThuyen", "MaNhanVien"],
            suggest: true,
            delay: 1000,
            dataSource: dataSource,
            select: function (e) {
                if (e.dataItem.LoaiThuyen == 2) {
                    $("#LoaiThuyen").val("Sắt");

                } else if (e.dataItem.LoaiThuyen == 1) {
                    $("#LoaiThuyen").val("Inox");

                } else {
                    $("#LoaiThuyen").val("");
                }
                // Use the selected item or its text
            }
        })
    });
    $("#ComboGioiTinh").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Nam"
                },
                {
                    ID: 1,
                    Name: "Nữ"
                },
            ]
        }
    });
    $.ajax({
        url: 'https://api.vietqr.io/v2/banks',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response.data,
        });
        $("#comboNganHang").kendoComboBox({
            dataSource: dataSource,
            dataTextField: "shortName",
            dataValueField: "bin",
            filter: "contains",
            suggest: true,
            delay: 1000
        });
    })
    $("#ComboLoaiLaiDo").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Đi cháy"
                },
                {
                    ID: 1,
                    Name: "Đi chuyên"
                },
            ]
        }
    });
    $("#ComboHoSo").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Chưa có"
                },
                {
                    ID: 1,
                    Name: "Chưa đủ"
                },
                {
                    ID: 2,
                    Name: "Đủ"
                },
            ]
        }
    });
    $("#ComboTinhTrang").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Đã trả đò"
                },
                {
                    ID: 1,
                    Name: "Đang hoạt động"
                },
                {
                    ID: 2,
                    Name: "Nghỉ việc"
                },
                {
                    ID: 3,
                    Name: "Tạm nghỉ"
                },
            ]
        },
        select: function (e) {
            if (e.dataItem.ID == 2) {
                $("#NghiViec").show();

            } else {
                $("#NghiViec").hide();
            }
            // Use the selected item or its text
        }

    });
    $("#ComboCCNghiepVu").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Chưa có"
                },
                {
                    ID: 1,
                    Name: "Đã có"
                },
            ]
        }
    });
    $("#ComboCCDuongThuy").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 2,
                    Name: "Chưa có"
                },
                {
                    ID: 1,
                    Name: "Đã có"
                },
            ]
        }
    });
    $("#ComboCCPCCC").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Chưa có"
                },
                {
                    ID: 1,
                    Name: "Đã có"
                },
            ]
        }
    });
    $("#ComboCCTiengAnh").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Chưa có"
                },
                {
                    ID: 1,
                    Name: "Đã có"
                },
            ]
        }
    });
    $("#ComboTinh").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Không xác định"
                }
            ]
        }
    });
    $("#ComboQuan").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Không xác định"
                }
            ]
        }
    });
    $("#ComboPhuong").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Không xác định"
                }
            ]
        }
    });
    $("#ComboHopDong").kendoComboBox({
        dataTextField: "Name",
        dataValueField: "ID",
        filter: "contains",
        suggest: true,
        delay: 1000,
        dataSource: {
            data: [
                {
                    ID: 0,
                    Name: "Thử việc"
                },
                {
                    ID: 1,
                    Name: "Chính thức"
                },
                {
                    ID: 2,
                    Name: "Học việc"
                },
            ]
        }
    });
    $.ajax({
        url: '/ChucDanh/GetAllChucDanh',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboChucVu").kendoMultiSelect({
            dataTextField: "TenChucDanh",
            dataValueField: "ID",
            autoBind: false,
            dataSource: dataSource,
        });
        LoadGridData();
    });


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
    $("#fileManager").kendoUpload({
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
    function PushFormDataFile(file) {
        kendo.ui.progress($("#gridImport"), true);
        parseExcel(file.rawFile);
    }
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    $(".main_container").show();
})
function PushFormDataFile2(fileInfo, wrapper) {
    var url = "";
    var data = new FormData();
    data.append('file', fileInfo.rawFile, fileInfo.name);
    var t = $.ajax({
        url: "/NhanVien/UploadFile",
        processData: false,
        contentType: false,
        data: data,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: "Upload thành công" }, "success");
            addPreview(fileInfo, wrapper, response.path);
            wrapper.find(".k-file-name").remove();
            anhnhanvien.push({
                ID: 0,
                FilePath: response.path,
                FileName: response.name
            })

        } else {
            notification.show({ kValue: "Upload thất bại, vui lòng thử lại" }, "error");
        }
    });
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
    $.each(anhnhanvien, function (ind, item) {
        if ((SERVERIMAGE + item.FilePath) == path) {
            index = ind;
        }
    })
    if (index > -1) {
        anhnhanvien.splice(index, 1);
        $(icon).parent().remove();
    }
}



function parseExcel(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames[0]], { range: 1 });
        var json_object = JSON.stringify(XL_row_object);

        jsondata = JSON.parse(json_object);
        console.log("jsondata: ", jsondata);

        $.each(jsondata, function (index, item) {
            var key = Object.keys(item)

            item.STT = index + 1;
            item.TenDayDu = item["Họ tên"];
            item.SoDienThoai = item["Số điện thoại"];
            item.Email = "";
            item.CCCD = item["Số CMND"];
            item.NgaySinh = item["Ngày sinh"];
            item.DiaChi = item["Nơi đang ký hộ khẩu"];
            item.TrangThai = item["Code_TinhTrang"];
            item.MaNhanVien = item["Mã nhân viên"];
            item.MaToNhom = item["Mã tổ"];
            item.MaTheBH = item["Mã thẻ BHYT"];
            item.DuongPho = item["Số nhà/Tổ/Thôn"];
            item.NoiCapCCCD = item["Nơi cấp"];
            item.MaSoThue = item["Mã số thuế"];
            item.CoQuanThueQuanLy = item["Cơ quan thuế quản lý"];
            item.NguoiThan = item["Vợ/Chồng/Con"];
            item.DienThoaiNguoiThan = item["Số điện thoại gia đình"];
            item.NamSinhCon1 = item["Năm sinh con 1"];
            item.NamSinhCon2 = item["Năm sinh con 2"];
            item.NamSinhCon3 = item["Năm sinh con 3"];
            item.GhiChu = item["Ghi chú"];
            item.Tinh = item["Tỉnh/TP"];
            item.Quan = item["Quận/Huyện"];
            item.Phuong = item["Xã/Phường"];
            item.NgayBatDauLamViec = item["Ngày vào"];
            item.NgayCapCCCD = item["Ngày cấp"];
            item.NgayCapMaSoThue = item["Ngày cấp mã"];
            item.NgayBatDauHopDong = item["Ngày bắt đầu"];
            item.NgayKetThucHopDong = item["Ngày kết thúc"];
            item.TenChucDanh = item["Chức danh"];
            item.ID_GioiTinh = item["Code_GioiTinh"];
            item.ID_ChucVu = item["Code_ChucDanh"];
            item.ID_LoaiLaiDo = item["Code_LoaiDo"];
            item.ID_TinhTrangHoSo = item["Code_HoSo"];
            item.ID_TinhTrangCCNghiepVu = item["Code_NVDL"];
            item.ID_TinhTrangCCDuongThuy = item["Code_DTND"];
            item.ID_TinhTrangCCPCCC = item["Code_PCCC"];
            item.ID_TinhTrangCCTiengAnh = item["Code_TA"];
            item.ID_LoaiHopDong = item["Code_LoaiHD"];
            item.ID_Thuyen = item["Code_MaDo"];
            item.ID_ToNhom = item["Code_MaTo"];

            item.LoaiThuyen = item["Loại thuyền"];
            item.TinhTrangHoSo = item["Hồ sơ"];
            item.LoaiHopDong = item["Loại HĐ"];
            item.TinhTrangCCNghiepVu = item["Nghiệp vụ du lịch"];
            item.TinhTrangCCDuongThuy = item["Đường thủy nội địa"];
            item.TinhTrangCCTiengAnh = item["Tiếng Anh"];
            item.TinhTrangCCPCCC = item["PCCC"];
            item.MaThuyen = item["Mã đò"];
            item.GioiTinh = item["Giới tính"];
            item.TinhTrangLamViec = item["Tình trạng làm việc"];
            item.LoaiLaiDo = item["Loại lái đò"];

            item.NgayBatDauCCNghiepVu = item["Ngày bắt đầu CCNV"];
            item.NgayKetThucCCNghiepVu = item["Ngày kết thúc CCNV"];
            item.NgayBatDauCCDuongThuy = item["Ngày bắt đầu CCDT"];
            item.NgayKetThucCCDuongThuy = item["Ngày kết thúc CCDT"];
            item.NgayBatDauCCPCCC = item["Ngày bắt đầu CCPCCC"];
            item.NgayKetThucCCPCCC = item["Ngày kết thúc CCPCCC"];
            item.NgayBatDauCCTiengAnh = item["Ngày bắt đầu CCTA"];
            item.NgayKetThucCCTiengAnh = item["Ngày kết thúc CCTA"];
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
        //console.log(selectedItem);
        //$.ajax({
        //    url: '/NhanVien/GetNhanVienById?ID=' + selectedItem.ID,
        //    type: 'GET',
        //}).done(function successCallback(response) {
        //    selectedItem = response;
        //    console.log(response);
        $("#ID").val(selectedItem.ID);
        $("#TenDayDu").val(selectedItem.TenDayDu);
        $("#MaNhanVien").val(selectedItem.MaNhanVien);
        //$("#Email").val(selectedItem.Email);
        $("#SoDienThoai").val(selectedItem.SoDienThoai);
        $("#CCCD").val(selectedItem.CCCD);
        $("#DiaChi").val(selectedItem.DiaChi);
        if (selectedItem.ID_LoaiThuyen == 2) {
            $("#LoaiThuyen").val("Sắt");

        } else if (selectedItem.ID_LoaiThuyen == 1) {
            $("#LoaiThuyen").val("Inox");

        } else {
            $("#LoaiThuyen").val("");
        }
        $("#MaTheBH").val(selectedItem.MaTheBH);
        $("#DuongPho").val(selectedItem.DuongPho);
        $("#NoiCapCCCD").val(selectedItem.NoiCapCCCD);
        $("#MaSoThue").val(selectedItem.MaSoThue);
        $("#CoQuanThueQuanLy").val(selectedItem.CoQuanThueQuanLy);
        $("#NguoiThan").val(selectedItem.NguoiThan);
        $("#DienThoaiNguoiThan").val(selectedItem.DienThoaiNguoiThan);
        $("#NamSinhCon1").val(selectedItem.NamSinhCon1);
        $("#NamSinhCon2").val(selectedItem.NamSinhCon2);
        $("#NamSinhCon3").val(selectedItem.NamSinhCon3);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#LyDoNghi").val(selectedItem.LyDoNghi);

        $("#Tinh").val(selectedItem.Tinh);
        $("#Quan").val(selectedItem.Quan);
        $("#Phuong").val(selectedItem.Phuong);
        //var date = new Date(parseInt(selectedItem.NgaySinh.substr(6)));
        $("#NgaySinh").data("kendoDatePicker").value(selectedItem.NgaySinh);
        $("#NgayVao").data("kendoDatePicker").value(selectedItem.NgayBatDauLamViec);
        $("#NgayKetThucLamViec").data("kendoDatePicker").value(selectedItem.NgayKetThucLamViec);
        $("#NgayCapCCCD").data("kendoDatePicker").value(selectedItem.NgayCapCCCD);
        $("#NgayCapMaSoThue").data("kendoDatePicker").value(selectedItem.NgayCapMaSoThue);
        $("#NgayBatDauHopDong").data("kendoDatePicker").value(selectedItem.NgayBatDauHopDong);
        $("#NgayKetThucHopDong").data("kendoDatePicker").value(selectedItem.NgayKetThucHopDong);

        $("#NgayBatDauCCNghiepVu").data("kendoDatePicker").value(selectedItem.NgayBatDauCCNghiepVu);
        $("#NgayKetThucCCNghiepVu").data("kendoDatePicker").value(selectedItem.NgayKetThucCCNghiepVu);
        $("#NgayBatDauCCDuongThuy").data("kendoDatePicker").value(selectedItem.NgayBatDauCCDuongThuy);
        $("#NgayKetThucCCDuongThuy").data("kendoDatePicker").value(selectedItem.NgayKetThucCCDuongThuy);
        $("#NgayBatDauCCPCCC").data("kendoDatePicker").value(selectedItem.NgayBatDauCCPCCC);
        $("#NgayKetThucCCPCCC").data("kendoDatePicker").value(selectedItem.NgayKetThucCCPCCC);
        $("#NgayBatDauCCTiengAnh").data("kendoDatePicker").value(selectedItem.NgayBatDauCCTiengAnh);
        $("#NgayKetThucCCTiengAnh").data("kendoDatePicker").value(selectedItem.NgayKetThucCCTiengAnh);

        $("#ComboThuyen").data("kendoMultiColumnComboBox").value(selectedItem.ID_Thuyen);
        $("#ComboGioiTinh").data("kendoComboBox").value(selectedItem.ID_GioiTinh);
        //$("#ComboChucVu").data("kendoComboBox").value(selectedItem.ID_ChucVu);
        $("#ComboLoaiLaiDo").data("kendoComboBox").value(selectedItem.ID_LoaiLaiDo);
        $("#ComboHoSo").data("kendoComboBox").value(selectedItem.ID_TinhTrangHoSo);
        $("#ComboCCNghiepVu").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCNghiepVu);
        $("#ComboCCDuongThuy").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCDuongThuy);
        $("#ComboCCPCCC").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCPCCC);
        $("#ComboCCTiengAnh").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCTiengAnh);
        $("#ComboTinhTrang").data("kendoComboBox").value(selectedItem.TrangThai);
        $("#ComboHopDong").data("kendoComboBox").value(selectedItem.ID_LoaiHopDong);
        $("#comboNganHang").data("kendoComboBox").value(selectedItem.MaNganHang);
        $("#SoTaiKhoan").val(selectedItem.SoTaiKhoan);
        $("#ChuTaiKhoan").val(selectedItem.ChuTaiKhoan);
        if (selectedItem.TrangThai == 2) {
            $("#NghiViec").show();

        } else {
            $("#NghiViec").hide();
        }
        var dataChucDanh = []
        $.ajax({
            url: '/NhanVien/GetListChucDanhNhanVien?ID_NhanVien=' + selectedItem.ID,
            type: 'GET',
        }).done(function successCallback(response) {
            selectedItem.lstChucDanh = response;
            if (selectedItem.lstChucDanh.length > 0 && selectedItem.lstChucDanh != null) {
                for (var i = 0; i < selectedItem.lstChucDanh.length; i++) {
                    //dataChucDanh.push({
                    //    ID: selectedItem.lstChucDanh[i].ID_ChucDanh,
                    //    TenChucDanh: selectedItem.lstChucDanh[i].TenChucDanh,
                    //})
                    dataChucDanh.push(
                        selectedItem.lstChucDanh[i].ID_ChucDanh
                    )
                }
            }
            $("#ComboChucVu").data("kendoMultiSelect").value(dataChucDanh);
        })
        anhnhanvien = [];
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); //clear html5 canvas
        $("#previewimage").html("");
        $.ajax({
            url: '/NhanVien/GetListFileNhanVien?ID_NhanVien=' + selectedItem.ID,
            type: 'GET',
        }).done(function successCallback(response) {
            selectedItem.lstFile = response;
            if (selectedItem.lstFile.length > 0 && selectedItem.lstFile != null) {
                for (var i = 0; i < selectedItem.lstFile.length; i++) {
                    var item = selectedItem.lstFile[i];
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
                    anhnhanvien.push(item)
                }
            }
        })
        //kendoComboBox
        //kendoDatePicker
        //kendoDropdowList
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
        openDialog($("#dialogRoot").data("kendoDialog"), "Vui lòng chọn 1 bản ghi để sửa");
    } else {
        var grid = $("#grid").data("kendoGrid");
        var selectedItem = grid.dataItem(grid.select());
        console.log(selectedItem);
        //$.ajax({
        //    url: '/User/GetUserById?ID=' + arr[0],
        //    type: 'GET',
        //}).done(function successCallback(response) {
        $("#TenDayDu").val(selectedItem.TenDayDu);
        $("#MaNhanVien").val(selectedItem.MaNhanVien);
        //$("#Email").val(selectedItem.Email);
        $("#SoDienThoai").val(selectedItem.SoDienThoai);
        $("#CCCD").val(selectedItem.CCCD);
        $("#DiaChi").val(selectedItem.DiaChi);
        if (selectedItem.ID_LoaiThuyen == 2) {
            $("#LoaiThuyen").val("Sắt");

        } else if (selectedItem.ID_LoaiThuyen == 1) {
            $("#LoaiThuyen").val("Inox");

        } else {
            $("#LoaiThuyen").val("");
        }
        $("#MaTheBH").val(selectedItem.MaTheBH);
        $("#DuongPho").val(selectedItem.DuongPho);
        $("#NoiCapCCCD").val(selectedItem.NoiCapCCCD);
        $("#MaSoThue").val(selectedItem.MaSoThue);
        $("#CoQuanThueQuanLy").val(selectedItem.CoQuanThueQuanLy);
        $("#NguoiThan").val(selectedItem.NguoiThan);
        $("#DienThoaiNguoiThan").val(selectedItem.DienThoaiNguoiThan);
        $("#NamSinhCon1").val(selectedItem.NamSinhCon1);
        $("#NamSinhCon2").val(selectedItem.NamSinhCon2);
        $("#NamSinhCon3").val(selectedItem.NamSinhCon3);
        $("#GhiChu").val(selectedItem.GhiChu);
        $("#LyDoNghi").val(selectedItem.LyDoNghi);
        $("#Tinh").val(selectedItem.Tinh);
        $("#Quan").val(selectedItem.Quan);
        $("#Phuong").val(selectedItem.Phuong);
        //var date = new Date(parseInt(selectedItem.NgaySinh.substr(6)));
        $("#NgaySinh").data("kendoDatePicker").value(selectedItem.NgaySinh);
        $("#NgayVao").data("kendoDatePicker").value(selectedItem.NgayBatDauLamViec);
        $("#NgayKetThucLamViec").data("kendoDatePicker").value(selectedItem.NgayKetThucLamViec);
        $("#NgayCapCCCD").data("kendoDatePicker").value(selectedItem.NgayCapCCCD);
        $("#NgayCapMaSoThue").data("kendoDatePicker").value(selectedItem.NgayCapMaSoThue);
        $("#NgayBatDauHopDong").data("kendoDatePicker").value(selectedItem.NgayBatDauHopDong);
        $("#NgayKetThucHopDong").data("kendoDatePicker").value(selectedItem.NgayKetThucHopDong);

        $("#NgayBatDauCCNghiepVu").data("kendoDatePicker").value(selectedItem.NgayBatDauCCNghiepVu);
        $("#NgayKetThucCCNghiepVu").data("kendoDatePicker").value(selectedItem.NgayKetThucCCNghiepVu);
        $("#NgayBatDauCCDuongThuy").data("kendoDatePicker").value(selectedItem.NgayBatDauCCDuongThuy);
        $("#NgayKetThucCCDuongThuy").data("kendoDatePicker").value(selectedItem.NgayKetThucCCDuongThuy);
        $("#NgayBatDauCCPCCC").data("kendoDatePicker").value(selectedItem.NgayBatDauCCPCCC);
        $("#NgayKetThucCCPCCC").data("kendoDatePicker").value(selectedItem.NgayKetThucCCPCCC);
        $("#NgayBatDauCCTiengAnh").data("kendoDatePicker").value(selectedItem.NgayBatDauCCTiengAnh);
        $("#NgayKetThucCCTiengAnh").data("kendoDatePicker").value(selectedItem.NgayKetThucCCTiengAnh);
        anhnhanvien = [];
        $("#ComboThuyen").data("kendoMultiColumnComboBox").value(selectedItem.ID_Thuyen);
        $("#ComboGioiTinh").data("kendoComboBox").value(selectedItem.ID_GioiTinh);
        //$("#ComboChucVu").data("kendoComboBox").value(selectedItem.ID_ChucVu);
        $("#ComboLoaiLaiDo").data("kendoComboBox").value(selectedItem.ID_LoaiLaiDo);
        $("#ComboHoSo").data("kendoComboBox").value(selectedItem.ID_TinhTrangHoSo);
        $("#ComboCCNghiepVu").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCNghiepVu);
        $("#ComboCCDuongThuy").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCDuongThuy);
        $("#ComboCCPCCC").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCPCCC);
        $("#ComboCCTiengAnh").data("kendoComboBox").value(selectedItem.ID_TinhTrangCCTiengAnh);
        $("#ComboTinhTrang").data("kendoComboBox").value(selectedItem.TrangThai);
        $("#ComboHopDong").data("kendoComboBox").value(selectedItem.ID_LoaiHopDong);
        if (selectedItem.TrangThai == 2) {
            $("#NghiViec").show();

        } else {
            $("#NghiViec").hide();
        }
        //kendoComboBox
        //kendoDatePicker
        //kendoDropdowList
        //});
        if ($(window).width() > 800) {
            $("#window").data("kendoWindow").center().open();
        } else {
            $("#window").data("kendoWindow").center().maximize().open();
        }
    }

}


function LoadGridData() {
    kendo.ui.progress($("#grid"), true);
    $.ajax({
        url: '/NhanVien/GetAllNhanVien',
        type: 'GET',
    }).done(function successCallback(responsee) {
        response = JSON.parse(responsee);
        for (var i = 0; i < response.length; i++) {
            if (response[i].ID_ChucVu == 1) {
                response[i].ChucVu = "NV Lái đò";
            } else {
                response[i].ChucVu = "Tổ trưởng";
            }
            if (response[i].ID_LoaiThuyen == 1) {
                response[i].LoaiThuyen = "Inox";
            } else if (response[i].ID_LoaiThuyen == 2) {
                response[i].LoaiThuyen = "Sắt";
            } else {
                response[i].LoaiThuyen = "";
            }
            if (response[i].ID_GioiTinh == 1) {
                response[i].GioiTinh = "Nữ";
            } else {
                response[i].GioiTinh = "Nam";
            }
            if (response[i].ID_TinhTrangHoSo == 0) {
                response[i].TinhTrangHoSo = "Chưa có";
            } else if (response[i].ID_TinhTrangHoSo == 1) {
                response[i].TinhTrangHoSo = "Chưa đủ";
            } else {
                response[i].TinhTrangHoSo = "Đủ";
            }
            if (response[i].ID_TinhTrangCCNghiepVu == 0) {
                response[i].TinhTrangCCNghiepVu = "Chưa có";
            } else {
                response[i].TinhTrangCCNghiepVu = "Đã có";
            }
            if (response[i].ID_TinhTrangCCDuongThuy == 0) {
                response[i].TinhTrangCCDuongThuy = "Chưa có";
            } else {
                response[i].TinhTrangCCDuongThuy = "Đã có";
            }
            if (response[i].ID_TinhTrangCCPCCC == 0) {
                response[i].TinhTrangCCPCCC = "Chưa có";
            } else {
                response[i].TinhTrangCCPCCC = "Đã có";
            }
            if (response[i].ID_TinhTrangCCTiengAnh == 0) {
                response[i].TinhTrangCCTiengAnh = "Chưa có";
            } else {
                response[i].TinhTrangCCTiengAnh = "Đã có";
            }
            //if (response[i].TrangThai == 1) {
            //    response[i].TinhTrangLamViec = "Đang hoạt động";
            //} else if (response[i].TrangThai == 0) {
            //    response[i].TinhTrangLamViec = "Đã trả đò";
            //} else {
            //    response[i].TinhTrangLamViec = "Nghỉ việc";
            //}
            if (response[i].ID_LoaiLaiDo == 1) {
                response[i].LoaiLaiDo = "Đi chuyên";
            } else {
                response[i].LoaiLaiDo = "Đi cháy";
            }
            if (response[i].ID_LoaiHopDong == 1) {
                response[i].LoaiHopDong = "Chính thức";
            } else if (response[i].ID_LoaiHopDong == 0) {
                response[i].LoaiHopDong = "Thử việc";
            } else {
                response[i].LoaiHopDong = "Học việc";
            }
            //if (response[i].lstChucDanh.length > 0) {

            //} else {
            //    $.each($("#ComboChucVu").data("kendoMultiSelect").dataSource.data(), function (index, item) {
            //        if (item.ID == response[i].ID_ChucVu) {
            //            response[i].lstChucDanh.push({
            //                ID_ChucDanh: item.ID,
            //                TenChucDanh: item.TenChucDanh
            //            })
            //            response[i].TenChucDanh = item.TenChucDanh
            //        }
            //    })

            //}
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
                        NgayBatDauLamViec: {
                            type: 'date', editable: false
                        },
                        NgayCapCCCD: {
                            type: 'date', editable: false
                        },
                        NgayCapMaSoThue: {
                            type: 'date', editable: false
                        },
                        NgayBatDauHopDong: {
                            type: 'date', editable: false
                        },
                        NgayKetThucHopDong: {
                            type: 'date', editable: false
                        },
                        NgayBatDauCCNghiepVu: {
                            type: 'date', editable: false
                        },
                        NgayKetThucCCNghiepVu: {
                            type: 'date', editable: false
                        },
                        NgayBatDauCCDuongThuy: {
                            type: 'date', editable: false
                        },
                        NgayKetThucCCDuongThuy: {
                            type: 'date', editable: false
                        },
                        NgayBatDauCCPCCC: {
                            type: 'date', editable: false
                        },
                        NgayKetThucCCPCCC: {
                            type: 'date', editable: false
                        },
                        NgayBatDauCCTiengAnh: {
                            type: 'date', editable: false
                        },
                        NgayKetThucCCTiengAnh: {
                            type: 'date', editable: false
                        },
                        SoDienThoai: { type: "text", editable: false },
                        DiaChi: { type: "text", editable: false },
                        MaNhanVien: { type: "text", editable: false },
                        TenDayDu: { type: "text", editable: false },
                        TrangThai: { type: "number", editable: false }
                        //GhiChu: { type: 'text', editable: true },
                        //Diem: { type: 'text', editable: true },
                        //TenHocSinh: { type: 'text', editable: false },
                        //DienThoaiMacDinh: { type: 'text', editable: false },
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
    $("#NghiViec").hide();
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
    console.log("ID_Thuyen: ", $("#ComboThuyen").data("kendoMultiColumnComboBox").value());
    var validma = SetValidate("MaNhanVien");
    var validten = SetValidate("TenDayDu");
    var validsdt = SetValidate("SoDienThoai");

    //var validchucvu = SetValidate("ComboChucVu");
    var validloai = SetValidate("ComboLoaiLaiDo");
    var valid = validma && validsdt && validten;
    if (valid) {
        var arr = $("#grid").data("kendoGrid").selectedKeyNames();
        if (arr.length != 1) {
            CheckMaNhanVien($("#MaNhanVien").val(), function (stt) {
                callback(stt);
            })

        } else {
            var grid = $("#grid").data("kendoGrid");
            var selectedItem = grid.dataItem(grid.select());
            if ($("#MaNhanVien").val() !== selectedItem.MaNhanVien || ($("#ID").val() == '')) {
                CheckMaNhanVien($("#MaNhanVien").val(), function (stt) {
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

function CheckMaNhanVien(manv, callback) {
    $.ajax({
        url: '/NhanVien/GetByMaNhanVien?MaNhanVien=' + manv,
        error: function (request, error) {
            callback(true);
        },
        type: 'GET',
    }).done(function successCallback(response) {
        if (response.ID > 0) {
            openDialog($("#dialogRoot").data("kendoDialog"), "Mã nhân viên đã tồn tại");
            callback(false)
        } else {

            callback(true)
        }
    })
}

function Luu() {
    var grid = $("#grid").data("kendoGrid");
    var selectedItem = grid.dataItem(grid.select());
    var isEdit = 0;
    var arr = $("#grid").data("kendoGrid").selectedKeyNames();
    if (arr.length != 1) {
        isEdit = 1;
    } else {
        if (selectedItem.ID_Thuyen > 0) {
            if (selectedItem.ID_Thuyen !== $("#ComboThuyen").data("kendoMultiColumnComboBox").value() || ($("#ID").val() == '')) {
                isEdit = 1;
            } else {
                isEdit = 0;
            }
        } else {
            isEdit = 1;
        }
    }
    var idthuyen = $("#ComboThuyen").data("kendoMultiColumnComboBox").value();
    var lstChucDanh = $("#ComboChucVu").data("kendoMultiSelect").value();
    var lstChucDanhIns = [];
    if (lstChucDanh.length > 0 && lstChucDanh != null) {
        for (var i = 0; i < lstChucDanh.length; i++) {
            lstChucDanhIns.push({
                ID_ChucDanh: lstChucDanh[i],
            })
        }
    }

    $("#ComboChucVu").data("kendoMultiSelect").value();


    ValidateForm(function (valid) {
        if (valid) {
            $.ajax({
                url: '/NhanVien/InsertOrUpdate_NhanVien',
                type: 'POST',
                data: {
                    ID: $("#ID").val(),
                    TenDayDu: $("#TenDayDu").val(),
                    SoDienThoai: $("#SoDienThoai").val(),
                    Email: "",
                    CCCD: $("#CCCD").val(),
                    NgaySinh: kendo.toString($("#NgaySinh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    DiaChi: $("#DiaChi").val(),
                    TrangThai: $("#ComboTinhTrang").data("kendoComboBox").value(),
                    MaNhanVien: $("#MaNhanVien").val(),
                    MaTheBH: $("#MaTheBH").val(),
                    DuongPho: $("#DuongPho").val(),
                    NoiCapCCCD: $("#NoiCapCCCD").val(),
                    MaSoThue: $("#MaSoThue").val(),
                    CoQuanThueQuanLy: $("#CoQuanThueQuanLy").val(),
                    NguoiThan: $("#NguoiThan").val(),
                    DienThoaiNguoiThan: $("#DienThoaiNguoiThan").val(),
                    NamSinhCon1: $("#NamSinhCon1").val(),
                    NamSinhCon2: $("#NamSinhCon2").val(),
                    NamSinhCon3: $("#NamSinhCon3").val(),
                    GhiChu: $("#GhiChu").val(),
                    Tinh: $("#Tinh").val(),
                    Quan: $("#Quan").val(),
                    Phuong: $("#Phuong").val(),
                    NgayBatDauLamViec: kendo.toString($("#NgayVao").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucLamViec: kendo.toString($("#NgayKetThucLamViec").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayCapCCCD: kendo.toString($("#NgayCapCCCD").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayCapMaSoThue: kendo.toString($("#NgayCapMaSoThue").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayBatDauHopDong: kendo.toString($("#NgayBatDauHopDong").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucHopDong: kendo.toString($("#NgayKetThucHopDong").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    ID_GioiTinh: $("#ComboGioiTinh").data("kendoComboBox").value(),
                    ID_ChucVu: 0,
                    ID_LoaiLaiDo: $("#ComboLoaiLaiDo").data("kendoComboBox").value(),
                    ID_TinhTrangHoSo: $("#ComboHoSo").data("kendoComboBox").value(),
                    ID_TinhTrangCCNghiepVu: $("#ComboCCNghiepVu").data("kendoComboBox").value(),
                    ID_TinhTrangCCDuongThuy: $("#ComboCCDuongThuy").data("kendoComboBox").value(),
                    ID_TinhTrangCCPCCC: $("#ComboCCPCCC").data("kendoComboBox").value(),
                    ID_TinhTrangCCTiengAnh: $("#ComboCCTiengAnh").data("kendoComboBox").value(),
                    ID_Thuyen: idthuyen,
                    ID_LoaiHopDong: $("#ComboHopDong").data("kendoComboBox").value(),
                    isEditThuyen: isEdit,
                    NgayBatDauCCNghiepVu: kendo.toString($("#NgayBatDauCCNghiepVu").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucCCNghiepVu: kendo.toString($("#NgayKetThucCCNghiepVu").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayBatDauCCDuongThuy: kendo.toString($("#NgayBatDauCCDuongThuy").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucCCDuongThuy: kendo.toString($("#NgayKetThucCCDuongThuy").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayBatDauCCPCCC: kendo.toString($("#NgayBatDauCCPCCC").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucCCPCCC: kendo.toString($("#NgayKetThucCCPCCC").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayBatDauCCTiengAnh: kendo.toString($("#NgayBatDauCCTiengAnh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    NgayKetThucCCTiengAnh: kendo.toString($("#NgayKetThucCCTiengAnh").data("kendoDatePicker").value(), 'yyyy-MM-dd hh:mm:ss'),
                    lstChucDanh: lstChucDanhIns,
                    LyDoNghi: $("#LyDoNghi").val(),
                    MaNganHang: $("#comboNganHang").data("kendoComboBox").value(),
                    TenNganHang: $("#comboNganHang").data("kendoComboBox").text(),
                    SoTaiKhoan: $("#SoTaiKhoan").val(),
                    ChuTaiKhoan: $("#ChuTaiKhoan").val(),
                    lstFile: anhnhanvien
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
    anhnhanvien = [];
    $("#window").data("kendoWindow").close();
    $("#grid").data("kendoGrid").clearSelection();
}

function Xoa() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn xóa " + bangDuLieu.select().length / 2 + " nhân viên?</b>", function () { XoaDuLieu(bangDuLieu); }, function () { });
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
        url: '/NhanVien/DeleteMulti_NhanVien?ID=' + ids.join(','),
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
function NghiViec() {
    var bangDuLieu = $("#grid").data("kendoGrid");
    if (bangDuLieu.select().length > 0) {
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn thay đổi trạng thái làm việc " + bangDuLieu.select().length + " nhân viên?</b>", function () { NghiViecDuLieu(bangDuLieu); }, function () { });
    } else {
        openDialog(dialogRoot, "<b style='line-height:40px;'>Bạn phải chọn dữ liệu cần thay đổi</b>");
        //notification.show({kValue: "Bạn phải chọn dữ liệu cần xóa" }, "error");
    }
}
function NghiViecDuLieu(bangDuLieu) {
    var ids = [];
    bangDuLieu.select().each(function () {
        var dataItem = bangDuLieu.dataItem(this);
        var id = dataItem.id;
        ids.push(id);
    });
    $.ajax({
        url: '/NhanVien/UpdateTrangThaiStop_NhanVien?ID=' + ids.join(','),
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

function CapNhatTrangThai(id, trangthai) {
    var url = ""
    if (trangthai == 1) {
        url = '/NhanVien/UpdateTrangThaiStart_NhanVien?ID=' + id;
    } else {
        url = '/NhanVien/UpdateTrangThaiStop_NhanVien?ID=' + id;
    }
    console.log("url: ", url)
    $.ajax({
        url: url,
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
function CapNhatTrangThaiDropDown(container, options) {
    $('<input required name="TrangThai">')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "TrangThai",
            dataValueField: "ID_TrangThai",
            template: "<div class='dropdown-country-wrap'><span>#:TrangThai #</span></div>",
            dataSource: {
                data: [
                    {
                        ID_TrangThai: 1,
                        TrangThai: "Đã trả đò"
                    },
                    {
                        ID_TrangThai: 0,
                        TrangThai: "Đang hoạt động"
                    },
                ]
            },
            autoWidth: true
        });
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

function DownloadTemp() {
    $.ajax({
        url: '/NhanVien/UpdateTemplate',
        type: 'GET'
    }).done(function (response) {
        if (response.success) {
            window.open('../Content/ExcelTemplate/Temp_NguoiLaoDong.xlsx', '_blank')
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    })
}
function ValidateList(data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (ValidateData(item)) {
            if (i == (data.length - 1)) {
                return true
            }
        } else {
            console.log(i);
            return false
        }
    }
}

function ValidateData(item) {

    var validten = CheckValidItem(item.TenDayDu);
    //var validsdt = CheckValidItem(item.SoDienThoai);
    var validma = CheckValidItem(item.MaNhanVien);
    var validchucvu = CheckValidItem(item.ID_ChucVu);
    var valid = validma && validten && validchucvu;
    return valid
}

function CheckValidItem(item) {
    var valid = item !== "" && item != undefined;
    return valid
}

function LuuList(data) {
    console.log(data);
    if (ValidateList(data)) {
        $.ajax({
            url: '/NhanVien/InsertOrUpdate_ListNhanVien',
            type: 'POST',
            data: { list: data }
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

function CheckDublicate(arrayOfObjects) {
    const lookup = arrayOfObjects.reduce((a, e) => {
        a[e.MaNhanVien] = ++a[e.MaNhanVien] || 0;
        return a;
    }, {});
    console.log(arrayOfObjects.filter(e => lookup[e.MaNhanVien]));

    return arrayOfObjects.filter(e => lookup[e.MaNhanVien])
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
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            Email: "",
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: Number(item.TrangThai),
            MaNhanVien: item.MaNhanVien,
            MaTheBH: item.MaTheBH,
            DuongPho: item.DuongPho,
            NoiCapCCCD: item.NoiCapCCCD,
            MaSoThue: item.MaSoThue,
            CoQuanThueQuanLy: item.CoQuanThueQuanLy,
            NguoiThan: item.NguoiThan,
            DienThoaiNguoiThan: item.DienThoaiNguoiThan,
            NamSinhCon1: item.NamSinhCon1,
            NamSinhCon2: item.NamSinhCon2,
            NamSinhCon3: item.NamSinhCon3,
            GhiChu: item.GhiChu,
            Tinh: item.Tinh,
            Quan: item.Quan,
            Phuong: item.Phuong,
            NgayBatDauLamViec: item.NgayBatDauLamViec,
            NgayCapCCCD: item.NgayCapCCCD,
            NgayCapMaSoThue: item.NgayCapMaSoThue,
            NgayBatDauHopDong: item.NgayBatDauHopDong,
            NgayKetThucHopDong: item.NgayKetThucHopDong,
            ID_GioiTinh: Number(item.ID_GioiTinh),
            ID_ChucVu: Number(item.ID_ChucVu),
            ID_LoaiLaiDo: Number(item.ID_LoaiLaiDo),
            ID_TinhTrangHoSo: Number(item.ID_TinhTrangHoSo),
            ID_TinhTrangCCNghiepVu: Number(item.ID_TinhTrangCCNghiepVu),
            ID_TinhTrangCCDuongThuy: Number(item.ID_TinhTrangCCDuongThuy),
            ID_TinhTrangCCPCCC: Number(item.ID_TinhTrangCCPCCC),
            ID_TinhTrangCCTiengAnh: Number(item.ID_TinhTrangCCTiengAnh),
            ID_Thuyen: Number(item.ID_Thuyen),
            ID_LoaiHopDong: Number(item.ID_LoaiHopDong),
            ID_ToNhom: Number(item.ID_ToNhom)

        })
        checkall_data.push({
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            Email: "",
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: Number(item.TrangThai),
            MaNhanVien: item.MaNhanVien,
            MaTheBH: item.MaTheBH,
            DuongPho: item.DuongPho,
            NoiCapCCCD: item.NoiCapCCCD,
            MaSoThue: item.MaSoThue,
            CoQuanThueQuanLy: item.CoQuanThueQuanLy,
            NguoiThan: item.NguoiThan,
            DienThoaiNguoiThan: item.DienThoaiNguoiThan,
            NamSinhCon1: item.NamSinhCon1,
            NamSinhCon2: item.NamSinhCon2,
            NamSinhCon3: item.NamSinhCon3,
            GhiChu: item.GhiChu,
            Tinh: item.Tinh,
            Quan: item.Quan,
            Phuong: item.Phuong,
            NgayBatDauLamViec: item.NgayBatDauLamViec,
            NgayCapCCCD: item.NgayCapCCCD,
            NgayCapMaSoThue: item.NgayCapMaSoThue,
            NgayBatDauHopDong: item.NgayBatDauHopDong,
            NgayKetThucHopDong: item.NgayKetThucHopDong,
            ID_GioiTinh: Number(item.ID_GioiTinh),
            ID_ChucVu: Number(item.ID_ChucVu),
            ID_LoaiLaiDo: Number(item.ID_LoaiLaiDo),
            ID_TinhTrangHoSo: Number(item.ID_TinhTrangHoSo),
            ID_TinhTrangCCNghiepVu: Number(item.ID_TinhTrangCCNghiepVu),
            ID_TinhTrangCCDuongThuy: Number(item.ID_TinhTrangCCDuongThuy),
            ID_TinhTrangCCPCCC: Number(item.ID_TinhTrangCCPCCC),
            ID_TinhTrangCCTiengAnh: Number(item.ID_TinhTrangCCTiengAnh),
            ID_Thuyen: Number(item.ID_Thuyen),
            ID_LoaiHopDong: Number(item.ID_LoaiHopDong),
            ID_ToNhom: Number(item.ID_ToNhom)
        })

    });
    $.each(grid_data, function (index, item) {
        checkall_data.push({
            TenDayDu: item.TenDayDu,
            SoDienThoai: item.SoDienThoai,
            Email: "",
            CCCD: item.CCCD,
            NgaySinh: item.NgaySinh,
            DiaChi: item.DiaChi,
            TrangThai: Number(item.TrangThai),
            MaNhanVien: item.MaNhanVien,
            MaTheBH: item.MaTheBH,
            DuongPho: item.DuongPho,
            NoiCapCCCD: item.NoiCapCCCD,
            MaSoThue: item.MaSoThue,
            CoQuanThueQuanLy: item.CoQuanThueQuanLy,
            NguoiThan: item.NguoiThan,
            DienThoaiNguoiThan: item.DienThoaiNguoiThan,
            NamSinhCon1: item.NamSinhCon1,
            NamSinhCon2: item.NamSinhCon2,
            NamSinhCon3: item.NamSinhCon3,
            GhiChu: item.GhiChu,
            Tinh: item.Tinh,
            Quan: item.Quan,
            Phuong: item.Phuong,
            NgayBatDauLamViec: item.NgayBatDauLamViec,
            NgayCapCCCD: item.NgayCapCCCD,
            NgayCapMaSoThue: item.NgayCapMaSoThue,
            NgayBatDauHopDong: item.NgayBatDauHopDong,
            NgayKetThucHopDong: item.NgayKetThucHopDong,
            ID_GioiTinh: Number(item.ID_GioiTinh),
            ID_ChucVu: Number(item.ID_ChucVu),
            ID_LoaiLaiDo: Number(item.ID_LoaiLaiDo),
            ID_TinhTrangHoSo: Number(item.ID_TinhTrangHoSo),
            ID_TinhTrangCCNghiepVu: Number(item.ID_TinhTrangCCNghiepVu),
            ID_TinhTrangCCDuongThuy: Number(item.ID_TinhTrangCCDuongThuy),
            ID_TinhTrangCCPCCC: Number(item.ID_TinhTrangCCPCCC),
            ID_TinhTrangCCTiengAnh: Number(item.ID_TinhTrangCCTiengAnh),
            ID_Thuyen: Number(item.ID_Thuyen),
            ID_LoaiHopDong: Number(item.ID_LoaiHopDong),
            ID_ToNhom: Number(item.ID_ToNhom)
        })
    });
    var dubAll_data = CheckDublicate(checkall_data);
    var dub_data = CheckDublicate(check_data);
    if (dub_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã nhân viên không được trùng nhau: " + dub_data[0].MaNhanVien }, "error");
    } else if (dubAll_data.length > 0) {
        notification.show({ kValue: "Dữ liệu không hợp lệ, mã nhân viên đã tồn tại trong hệ thống: " + dubAll_data[0].MaNhanVien }, "error");
    } else {
        $.each(data, function (index, item) {
            valid_data.push({
                TenDayDu: item.TenDayDu,
                SoDienThoai: item.SoDienThoai,
                Email: "",
                CCCD: item.CCCD,
                NgaySinh: toDate(item.NgaySinh),
                DiaChi: item.DiaChi,
                TrangThai: Number(item.TrangThai),
                MaNhanVien: item.MaNhanVien,
                MaTheBH: item.MaTheBH,
                DuongPho: item.DuongPho,
                NoiCapCCCD: item.NoiCapCCCD,
                MaSoThue: item.MaSoThue,
                CoQuanThueQuanLy: item.CoQuanThueQuanLy,
                NguoiThan: item.NguoiThan,
                DienThoaiNguoiThan: item.DienThoaiNguoiThan,
                NamSinhCon1: item.NamSinhCon1,
                NamSinhCon2: item.NamSinhCon2,
                NamSinhCon3: item.NamSinhCon3,
                GhiChu: item.GhiChu,
                Tinh: item.Tinh,
                Quan: item.Quan,
                Phuong: item.Phuong,
                NgayBatDauLamViec: toDate(item.NgayBatDauLamViec),
                NgayCapCCCD: toDate(item.NgayCapCCCD),
                NgayCapMaSoThue: toDate(item.NgayCapMaSoThue),
                NgayBatDauHopDong: toDate(item.NgayBatDauHopDong),
                NgayKetThucHopDong: toDate(item.NgayKetThucHopDong),
                ID_GioiTinh: Number(item.ID_GioiTinh),
                ID_ChucVu: Number(item.ID_ChucVu),
                ID_LoaiLaiDo: Number(item.ID_LoaiLaiDo),
                ID_TinhTrangHoSo: Number(item.ID_TinhTrangHoSo),
                ID_TinhTrangCCNghiepVu: Number(item.ID_TinhTrangCCNghiepVu),
                ID_TinhTrangCCDuongThuy: Number(item.ID_TinhTrangCCDuongThuy),
                ID_TinhTrangCCPCCC: Number(item.ID_TinhTrangCCPCCC),
                ID_TinhTrangCCTiengAnh: Number(item.ID_TinhTrangCCTiengAnh),
                ID_Thuyen: Number(item.ID_Thuyen),
                ID_LoaiHopDong: Number(item.ID_LoaiHopDong),
                NgayBatDauCCNghiepVu: toDate(item.NgayBatDauCCNghiepVu),
                NgayKetThucCCNghiepVu: toDate(item.NgayKetThucCCNghiepVu),
                NgayBatDauCCDuongThuy: toDate(item.NgayBatDauCCDuongThuy),
                NgayKetThucCCDuongThuy: toDate(item.NgayKetThucCCDuongThuy),
                NgayBatDauCCPCCC: toDate(item.NgayBatDauCCPCCC),
                NgayKetThucCCPCCC: toDate(item.NgayKetThucCCPCCC),
                NgayBatDauCCTiengAnh: toDate(item.NgayBatDauCCTiengAnh),
                NgayKetThucCCTiengAnh: toDate(item.NgayKetThucCCTiengAnh),
                ID_ToNhom: Number(item.ID_ToNhom)
            })
            count++;
        });
        openConfirm(dialogRoot, "<b style='line-height:40px;'>Bạn có chắc chắn muốn nhập " + count + " bản ghi danh mục công việc từ file excel?</b>", function () { LuuList(valid_data); }, function () { });
    }

    console.log(valid_data);
}

function HuyImport() {
    document.getElementById("formImport").reset();
    $("#windowImport").data("kendoWindow").close();
    $("#gridImport").data("kendoGrid").clearSelection();
}

function toDate(s) {
    if (s) {
        var dateParts = s.split("/");
        var dateObject
        if (parseInt(dateParts[2] > new Date().getFullYear())) {
            dateObject = new Date('19' + dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1]);
        } else {
            dateObject = new Date('20' + dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1]);
        }
        return kendo.toString(dateObject, 'yyyy/MM/dd')
    }
    return "";
}
function OpenAddChucDanh() {
    HuyChucDanh();
    if ($(window).width() > 800) {
        $("#windowAddChucDanh").data("kendoWindow").center().open();
    } else {
        $("#windowAddChucDanh").data("kendoWindow").center().maximize().open();
    }
}

function ValidateFormChucDanh() {
    var validten = SetValidate("TenChucDanh");
    var validma = SetValidate("MaChucDanh");
    var valid = validma && validten;
    return validten;
}


function LuuChucDanh() {

    if (ValidateFormChucDanh()) {
        $.ajax({
            url: '/ChucDanh/InsertOrUpdate_ChucDanh',
            type: 'POST',
            data: {
                ID: $("#ID").val(),
                TenChucDanh: $("#TenChucDanh").val(),
                MaChucDanh: $("#MaChucDanh").val()
            }
        }).done(function successCallback(response) {
            //response controller này trả về success và msg
            if (response.success) {
                notification.show({ kValue: response.msg }, "success");
                HuyChucDanh();
                LoadDataChucDanh();
            } else {
                notification.show({ kValue: response.msg }, "error");
            }
        });
    }
}


function HuyChucDanh() {
    document.getElementById("formChiTietChucDanh").reset();
    $("#ID_ChucDanh").val('');
    $("#windowAddChucDanh").data("kendoWindow").close();
}

function LoadDataChucDanh() {
    $.ajax({
        url: '/ChucDanh/GetAllChucDanh',
        type: 'GET',
    }).done(function successCallback(response) {
        var dataSource = new kendo.data.DataSource({
            data: response,
        });
        $("#ComboChucVu").kendoMultiSelect({
            dataTextField: "TenChucDanh",
            dataValueField: "ID",
            autoBind: false,
            dataSource: dataSource,
        });
    });
}