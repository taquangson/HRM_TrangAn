var selectHocSinh;
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
            LoadComboLop(e.sender.value());
            $("#comboLop").data("kendoComboBox").value('');
        }
    });
    $("#comboKhoi").data("kendoComboBox").value(0);
    LoadComboLop(0);
    LoadComboHocSinh(0);

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
                    LoadComboHocSinh(e.sender.value());
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
            data.push(item);
        })
        var dataSource = new kendo.data.DataSource({
            data: data
        });
        if ($("#comboHocSinh").data("kendoComboBox") == undefined) {
            $("#comboHocSinh").kendoComboBox({
                valuePrimitive: true,
                dataTextField: 'TenHocSinh',
                dataValueField: 'ID',
                filter: "contains",
                dataSource: dataSource,
                select: function (e) {
                    selectHocSinh = e.sender.dataItem(e.item)
                }
            })
        } else {
            $("#comboHocSinh").data("kendoComboBox").setDataSource(dataSource);
        }
        $("#comboHocSinh").data("kendoComboBox").value(0);
    });
}

function TimKiem() {
    $.ajax({
        url: '/BaoCao/GetData_BieuDoDiem?ID_Lop=' + $("#comboLop").data("kendoComboBox").value() + '&ID_HocSinh=' + $("#comboHocSinh").data("kendoComboBox").value()
            + "&from=" + kendo.toString($("#TuNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 00:00:00"
            + "&to=" + kendo.toString($("#DenNgay").data("kendoDatePicker").value(), "yyyy/MM/dd") + " 23:59:59",
        type: 'GET',
    }).done(function successCallback(response) {
        //$("#chart").data("kendoChart").setDataSource(dataSource);
        createChart(response);
    });
}

function GuiThongBao() {
    var chart = $("#chart").getKendoChart();
    var filename = kendo.toString(new Date(), 'ddMMyyyyhhmm') + "_baocaodiem_" + $("#comboLop").data("kendoComboBox").value() + "_" + $("#comboHocSinh").data("kendoComboBox").value() + ".png";
    chart.exportImage().done(function (data) {
        kendo.saveAs({
            dataURI: data,
            fileName: filename,
            proxyURL: "/BaoCao/SaveFile_BieuDoDiem",
            forceProxy: true
        });

    });

    let model = {
        Users: [],
        Tokens: [],
        TieuDe: "Biểu đồ điểm theo lớp học: " + $("#comboLop").data("kendoComboBox").text() + " - Học sinh: " + $("#comboHocSinh").data("kendoComboBox").text(),
        NoiDung: "",
        NoiDungHTML: "<img src='https://" + window.location.hostname + "/Images/BaiKiemTra/" + filename + "' style='width:100%;height:auto'/>",
        NoiDungRieng: "",
        AnhDaiDien: "logodh.png"
    };
    model.Users.push(selectHocSinh.DienThoaiMacDinh);
    model.Tokens.push(selectHocSinh.NotifyID);
    $.ajax({
        url: '/FBNotification/PushNotify',
        data: model,
        type: 'POST'
    }).done(function successCallback(response) {
        if (response.status) {
            notification.show({ kValue: response.msg }, "success");
        } else {
            notification.show({ kValue: response.msg }, "error");
        }
    });
}

function createChart(data) {
    $("#chart").kendoChart({
        dataSource: {
            data: data
        },
        pdf: {
            proxyURL: "/proxy"
        },
        title: {
            text: "Biểu đồ điểm theo lớp học: " + $("#comboLop").data("kendoComboBox").text() + " - Học sinh: " + $("#comboHocSinh").data("kendoComboBox").text()
        },
        legend: {
            position: "bottom"
        },
        seriesDefaults: {
            type: "line"
        },
        series: [{
            name: "Điểm",
            field: "Diem",
            categoryField: "ThoiGianVaoLop",
            noteTextField: "Diem",
            notes: {
                label: {
                    position: "outside"
                },
                position: "bottom"
            }
        }],
        valueAxis: {
            line: {
                visible: false
            }
        },
        categoryAxis: {
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}