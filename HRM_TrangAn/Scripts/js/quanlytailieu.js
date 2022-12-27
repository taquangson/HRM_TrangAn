$(".main_container").hide();
$(document).ready(function () {
    $(".main_container").show();
    $("#dialogRoot").kendoDialog().data("kendoDialog").close();
    kendo.data.schemas.filemanager.model.fields['ngaycap'] = { type: 'date', editable: false };
    kendo.data.schemas.filemanager.model.fields['tentailieu'] = { type: 'string', editable: false };
    $("#filemanager").kendoFileManager({
        height: function () {
            var height = $(window).height() - 150;
            return height;
        },
        messages: {
            toolbar: {
                createFolder: "Thư mục mới",
                upload: "Upload",
                sortDirection: "Sort Direction",
                sortDirectionAsc: "Sort Direction Ascending",
                sortDirectionDesc: "Sort Direction Descending",
                sortField: "Sắp xếp",
                nameField: "Tên",
                sizeField: "Dung lượng",
                typeField: "Kiểu",
                dateModifiedField: "Ngày chỉnh sửa",
                dateCreatedField: "Ngày tạo",
                listView: "Danh sách",
                gridView: "Lưới",
                search: "Tìm kiếm",
                details: "Xem chi tiết",
                detailsChecked: "Bật",
                detailsUnchecked: "Tắt",
                "delete": "Xóa",
                rename: "Đổi tên"
            },
            views: {
                nameField: "Tên",
                sizeField: "Dung lượng",
                typeField: "Kiểu",
                dateModifiedField: "Chỉnh sửa lần cuối",
                dateCreatedField: "Ngày tạo",
                items: "items"
            },
            dialogs: {
                upload: {
                    title: "Tải file",
                    clear: "Xóa danh sách",
                    done: "Hoàn thành"
                },
                moveConfirm: {
                    title: "Xác nhận",
                    content: "<p style='text-align: center;'>Bạn có chắc chăn muốn di chuyển hoặc sao chép file?</p>",
                    okText: "Copy",
                    cancel: "Move",
                    close: "close"
                },
                deleteConfirm: {
                    title: "Xác nhận",
                    content: "<p style='text-align: center;'>Bạn có chắc muốn xóa file?</br>Thao tác ko thể hoàn tác.</p>",
                    okText: "Xóa",
                    cancel: "Hủy bỏ",
                    close: "close"
                },
                renamePrompt: {
                    title: "Thông báo",
                    content: "<p style='text-align: center;'>Nhập tên file.</p>",
                    okText: "Đổi tên",
                    cancel: "Hủy bỏ",
                    close: "close"
                }
            },
            previewPane: {
                noFileSelected: "Không có tài liệu được chọn",
                extension: "Kiểu",
                size: "Dung lượng",
                created: "Ngày tạo",
                createdUtc: "Date Created UTC",
                modified: "Chỉnh sửa lần cuối",
                modifiedUtc: "Date Modified UTC",
                items: "items"
            }
        },
        dataSource: {
            schema: kendo.data.schemas.filemanager,
            transport: {
                read: {
                    url: "/FileManager/Read",
                    method: "POST"
                },
                create: {
                    url: "/FileManager/Create",
                    method: "POST"
                },
                update: {
                    url: "/FileManager/Update",
                    method: "POST"
                },
                destroy: {
                    url: "/FileManager/Destroy",
                    method: "POST"
                }
            }
        },
        views: {
            grid: {
                scrollable: true,
                persistSelection: true,
                autoFitColumn: true,
                resizable: true,
                sortable: true,
                filterable: {
                    mode: "row",
                },
                columns: [
                    {
                        field: "name",
                        template: function (e) {
                            
                            return (e.name + e.extension)
                        },
                        title: "File",
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
                        field: "tentailieu",
                        title: "Tên tài liệu",
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
                        field: "ngaycap",
                        title: "Ngày tạo",
                        format: "{0:dd/MM/yyyy}",
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
                        field: "created",
                        title: "Ngày cấp",
                        format: "{0:dd/MM/yyyy}",
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
                    }

                ]
            }
        },
        previewPane: {
            singleFileTemplate: kendo.template($("#preview-template").html())
        },
        upload: {
            async: {
                saveUrl: "/FileManager/Upload",
                autoUpload: false
            },
            upload: function (e) {
                e.data = {
                    TenTaiLieu: $("#TenTaiLieu").val(),
                    NgayCap: kendo.toString($("#NgayCap").data("kendoDatePicker").value(), "yyyy/MM/dd")
                }
            }
        },
        dialogs: {
            upload: {
                width: 600,
                title: "Tải file tài liệu",
                content: '<label style="width: 100px;height: 50px;">Tên tài liệu:</label><input id="TenTaiLieu" type="text" class= "k-textbox" /><label style="width: 100px;height: 50px;">Ngày cấp: </label><input id="NgayCap" />',
                actions: [
                    //    {
                    //    text: "OK",
                    //    action: function (e) {
                    //        return false;
                    //    },
                    //    primary: true
                    //}, {
                    //    text: "Cancel"
                    //    }
                ],
                show: function () {
                    if (!$("#NgayCap").data("kendoDatePicker")) {
                        $("#NgayCap").kendoDatePicker({
                            value: new Date(),
                            format: "dd/MM/yyyy"
                        });
                    }
                },

            }
        },
        toolbar: {
            items: [
                { name: "createFolder" },
                { name: "upload" },
                { name: "sortDirection" },
                { name: "sortField" },
                { name: "changeView" },
                { name: "spacer" },
                { name: "details" },
                { name: "search" }
            ]
        },
        contextMenu: {
            items: [
                { name: "rename" },
                { name: "delete" },
                {
                    text: "Phân quyền",
                    spriteCssClass: "k-icon k-i-lock",
                    command: "PhanQuyenCommand"
                    //select: function (e) { console.log("Phân quyền") }
                }
            ]
        },
        draggable: true,
        resizable: true
    });


    var filemanager = $("#filemanager").getKendoFileManager();
    filemanager.executeCommand({ command: "TogglePaneCommand", options: { type: "preview" } });
    var filemanagerNS = kendo.ui.filemanager;
    filemanagerNS.commands.PhanQuyenCommand = filemanagerNS.FileManagerCommand.extend({
        exec: function () {
            var that = this,
                filemanager = that.filemanager, // get the kendo.ui.FileManager instance
                options = that.options, // get the options passed through the tool
                target = options.target // options.target is available only when command is executed from the context menu
            selectedFiles = filemanager.getSelected(); // get the selected files

            console.log(options.arg, target, selectedFiles);
            // Proceed with the logic of the custom command.
        }
    });
    filemanager.toolbar.fileManagerDetailsToggle.switchInstance.toggle();
})
