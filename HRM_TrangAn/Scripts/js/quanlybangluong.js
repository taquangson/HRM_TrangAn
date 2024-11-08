$(document).ready(function () {
    $.ajax({
        url: '/ChinhSachLuong/GetAllChinhSachLuong',
        type: 'GET',
    }).done(function successCallback(response) {
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
       
        var dynamicColumn = [];
        $.each(response, function (index, item) {
            dynamicColumn.push({
                field: item.Ma,
                title: item.Ten,
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
                }
            })
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
            title: "Tổng Tiền",
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
            }
        });
        console.log(listColumn);
        $("#grid").kendoGrid({
            height: function () {
                var height = $(window).height() - 195;
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
    });
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

    $.ajax({
        url: '/BangLuong/GetBangLuong?tuan=' + tuan + '&thang=' + thang + '&quy=' + quy + '&nam=' + nam,
        type: 'GET',
    }).done(function successCallback(BLresponse) {
        var listBL = JSON.parse(BLresponse);
        console.log(listBL);
        var dataSource = new kendo.data.DataSource({
            data: listBL,
            pageSize: 20,
        });
        $("#grid").data("kendoGrid").setDataSource(dataSource);
    })
}