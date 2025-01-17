$(document).ready(function () {

    $("#window").kendoWindow({
        width: "300px",
        height: "160px",
        title: "Xác nhận mật khẩu",
        visible: false,
        modal: true,
        resizable: false,
        actions: [

        ]
    });

    $("#errorMessage").html();
    $("#window").data("kendoWindow").center().open();


})

function XacNhanMK() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var matkhau = $("#MatKhau").val();
    if (matkhau == '') {
        $("#errorMessage").html("Vui lòng nhập mật khẩu!");
    } else {
        $("#errorMessage").html();
        $.ajax({
            url: '/BangLuong/GetDataBangLuongByHSNS',
            data: {
                MatKhau: matkhau,
                Thang: urlParams.get('Thang'),
                Nam: urlParams.get('Nam'),
                ID_HoSoNhanSu: urlParams.get('ID_HoSoNhanSu')
            },
            type: 'POST',
        }).done(function successCallback(response) {
            console.log(response)
            if (response.ID_HoSoNhanSu == 0) {
                $("#errorMessage").html("Mật khẩu không chính xác!");
            } else {
                document.getElementById("TenNhanVien").innerHTML = response.TenNhanVien
                document.getElementById("MaNhanVien").innerHTML = response.MaNhanVien
                document.getElementById("SoTaiKhoan").innerHTML = response.SoTaiKhoan
                document.getElementById("TenNganHang").innerHTML = response.TenNganHang
                document.getElementById("SoNgayCongTrongThang").innerHTML = response.SoNgayCongTrongThang
                document.getElementById("SoNgayCongLeTet").innerHTML = response.SoNgayCongLeTet
                document.getElementById("SoLuongSuatAn").innerHTML = response.SoLuongSuatAn
                var listCTPLNhan = response.listCTPLNhan
                var listCTPLGiam = response.listCTPLGiam

                document.getElementById("bodyTableCTPLNhan").innerHTML =
                    '<tr>'
                    + '<td rowspan="' + (listCTPLNhan.length + 1) + '" style="width: 30%">'
                    + 'Các khoản thu nhập'
                    + '</td>'
                    + '</tr>'
                var TongLuongNhan = 0;
                for (var i = 0; i < listCTPLNhan.length; i++) {
                    TongLuongNhan += listCTPLNhan[i].SoTien;
                    document.getElementById("bodyTableCTPLNhan").innerHTML +=
                        '<tr>'
                        + '<td style="width:30%">' + listCTPLNhan[i].Ten + '</td>'
                        + '<td class="text-right">' + kendo.toString(listCTPLNhan[i].SoTien, "N0") + '</td>'
                        + '</tr>'
                }
                document.getElementById("bodyTableCTPLNhan").innerHTML +=
                    '<tr style="background-color:#9ec487">'
                    + '<td colspan="2"><b>Tổng thu nhập</b></td>'
                    + '<td class="text-right">' + kendo.toString(TongLuongNhan, "N0") + '</td>'
                    + '</tr>'

                document.getElementById("bodyTableCTPLGiam").innerHTML =
                    '<tr>'
                    + '<td rowspan="' + (listCTPLGiam.length + 1) + '" style="width: 30%">'
                    + 'Các khoản khấu trừ'
                    + '</td>'
                    + '</tr>'
                var TongGiamTru = 0;
                for (var i = 0; i < listCTPLGiam.length; i++) {
                    TongGiamTru += listCTPLGiam[i].SoTien;
                    document.getElementById("bodyTableCTPLGiam").innerHTML +=
                        '<tr>'
                        + '<td style="width:30%">' + listCTPLGiam[i].Ten + '</td>'
                        + '<td class="text-right">' + kendo.toString(listCTPLGiam[i].SoTien, "N0") + '</td>'
                        + '</tr>'
                }
                document.getElementById("bodyTableCTPLGiam").innerHTML +=
                    '<tr style="background-color:#9ec487">'
                    + '<td colspan="2"><b>Tổng khoản giảm trừ</b></td>'
                    + '<td class="text-right">' + kendo.toString(TongGiamTru, "N0") + '</td>'
                    + '</tr>'
                document.getElementById("TongTien").innerHTML = kendo.toString(TongLuongNhan - TongGiamTru, "N0");
                $("#window").data("kendoWindow").close();
            }
        });
    }
}
