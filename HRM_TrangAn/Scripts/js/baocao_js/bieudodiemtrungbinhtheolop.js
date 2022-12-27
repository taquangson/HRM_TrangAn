$(document).ready(function () {
    $("#rootContainer").show();
    $("#comboKhoi").kendoComboBox({
        dataTextField: 'text',
        dataValueField: 'value',
        dataSource: new kendo.data.DataSource({
            data: [
                { text: 'Tất cả', value: 0 },
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
        }),
        change: function (e) {
            //LoadComboLop(e.sender.value());
            $("#comboLop").data("kendoComboBox").value('');
        }
    });
    $("#comboKhoi").data("kendoComboBox").value(0);
    LoadComboLop(0);
    //LoadComboHocSinh(0);

    $("#DenNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date()
    })
    $("#TuNgay").kendoDatePicker({
        format: "dd/MM/yyyy",
        value: new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/01")
    })
})

function CheckKhoi(khoi) {
    if (khoi.TenLop.indexOf(khoi) > 0) {
        return true;
    }
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
                    //LoadComboHocSinh(e.sender.value());
                }
            })
        } else {
            $("#comboLop").data("kendoComboBox").setDataSource(dataSource);
        }
    });
}

function LoadComboHocSinh(lop) {
    $.ajax({
        url: '/HocSinh/GetByLop?ID_Lop=' + lop,
        type: 'GET',
    }).done(function successCallback(response) {
        var data = [{
            TenHocSinh: "Tất cả",
            ID: 0
        }]
        $.each(response, function (index, item) {
            data.push({
                TenHocSinh: item.TenHocSinh,
                ID: item.ID
            })
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        if ($("#comboHocSinh").data("kendoComboBox") == undefined) {
            $("#comboHocSinh").kendoComboBox({
                dataTextField: 'TenHocSinh',
                dataValueField: 'ID',
                filter: "contains",
                dataSource: dataSource
            })
        } else {
            $("#comboHocSinh").data("kendoComboBox").setDataSource(dataSource);
        }
        //$("#comboHocSinh").data("kendoComboBox").value(0);
    });
}

function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetData_BieuDoDiemTrungBinh_TheoLop?ID_Lop=' + $("#comboLop").data("kendoComboBox").value()
            + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        //$("#chart").data("kendoChart").setDataSource(dataSource);
        //var data = [];
        //var cate = [];
        //$.each(response, function (index, item) {
        //    data.push(
        //        item.Diem
        //    );
        //    cate.push(
        //        item.TenHocSinh
        //    );
        //});
        createChart(response);
    });
}

function createChart() {
    $("#chart").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: '/BaoCao/GetData_BieuDoDiemTrungBinh_TheoLop?ID_Lop=' + $("#comboLop").data("kendoComboBox").value()
                        + '&from=' + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + ' 00:00:00'
                        + '&to=' + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + ' 23:59:59',
                    dataType: "json"
                }
            }
        },
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "bar"
        },
        title: {
            text: "Biểu đồ điểm trung bình theo lớp học: " + $("#comboLop").data("kendoComboBox").text() + " từ ngày " + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "dd/MM/yyyy")
                + " đến ngày " + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "dd/MM/yyyy")
        },
        series:
            [{
                field: "Diem",
                categoryField: "TenHocSinh",
                name: "Điểm trung bình",
                noteTextField: "Diem",
                notes: {
                    label: {
                        position: "outside",
                        format: "N2",
                    },                    
                    position: "right"
                }
            }],
        categoryAxis: {
            labels: {
                rotation: 0
            },
            majorGridLines: {
                visible: false
            }
        },
        valueAxis: {
            labels: {
                format: "N2"
            },
            majorUnit: 10,
            line: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}