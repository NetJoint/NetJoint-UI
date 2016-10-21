/*!
 * Videoupload v0.1 
 *
 * Copyright (c) 2015 NetJoint
 * Released under the MIT license
 *
 * Date: 2015-09-16
 */
!function ($) {
    'use strict';
    function Videoupload(el, options) {
        this.el = el;
        this.$el = $(el);
        this.setOptions(options);
        this.setLocale();
        var thumbModal = '<div class="cropupload modal fade" id="thumb-modal" aria-hidden="true" role="dialog" tabindex="-1" style="z-index: 99999;">';
        thumbModal += '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a class="close" data-dismiss="modal">&times;</a>';
        thumbModal += '<h4 class="modal-title">' + this.lang.upload_video + '</h4></div><div class="modal-body">';
        thumbModal += '<form class="form thumb-form" action="' + this.options.url + '" enctype="multipart/form-data" method="post">';
        thumbModal += '<div style="float:right"><a href="javascript:void(0);" class="btn btn-xlarge btn-primary thumb-upload" autocomplate="off" data-loading-text="' + this.lang.uploading + '">' + this.lang.direct_upload + '</a></div>';
        thumbModal += '<div><input type="file" class="thumb-input" name="' + this.options.field + '">';
        thumbModal += '<a href="javascript:void(0);" class="btn btn-xlarge btn-success">' + this.lang.choose_video + '</a> <span class="thumb-name text-large text-info">' + this.lang.choose_none + '</span></div>';
        thumbModal += '</div></div></form></div></div></div></div>';
        this.$videoModal = $(thumbModal).appendTo('body');
        this.$videoForm = this.$videoModal.find('.thumb-form');
        this.$videoInput = this.$videoForm.find('.thumb-input');
        this.$videoName = this.$videoForm.find('.thumb-name');
        this.$videoUpload = this.$videoForm.find('.thumb-upload');
        this.initialize();
    }

    $.Videoupload = Videoupload;

    Videoupload.prototype = {
        constructor: Videoupload,
        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },
        setOptions: function (options) {
            return this.options = $.extend({}, $.fn.videoupload.defaults, this.$el.data(), options);
        },
        setLocale: function () {
            var locale = this.options.locale;
            return this.lang = $.extend({}, $.fn.videoupload.locales[locale]);
        },
        initialize: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;
            this.$videoModal.modal('hide');
            this.$videoUpload.on('click', $.proxy(this.directUpload, this));
            this.$videoInput.on('change', $.proxy(this.change, this));
            this.$videoForm.on('submit', $.proxy(this.submit, this));            
            this.initButton();
        },
        initButton: function () {
            this.$container = this.$el.parent();            
            var $addButton = $('<button type="button" class="btn btn-success btn-add">上传文件</button>');
            $addButton.on('click', $.proxy(this.click, this));
            $addButton.appendTo(this.$container);
        },       
        click: function () {
            this.$videoModal.modal('show');
        },
        change: function () {
            var file;
            file = this.$videoInput.val();
            this.$videoName.text(file);            
        },
        submit: function (e) {
            e.preventDefault();
            if (!this.$videoInput.val()) {
                return false;
            }
            if (this.support.formData) {
                this.ajaxUpload();
            }else{
                alert('浏览器不支持上传插件，请换一个浏览器');
            }            
            return false;
        },
        ajaxUpload: function () {
            var url = this.$videoForm.attr('action');
            var data = new FormData(this.$videoForm[0]);
            var that = this;

            $.ajax(url, {
                type: 'post',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: function () {
                    that.$videoUpload.button('loading');
                },
                success: function (data) {
                    that.submitDone(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    switch (XMLHttpRequest.status) {
                        case 403:
                            that.submitFail(that.lang.upload_forbidden);
                            break;
                        case 422:
                            if (typeof (XMLHttpRequest.responseJSON.file) != 'undefined') {
                                that.submitFail(XMLHttpRequest.responseJSON.file.join(','));
                            } else {
                                that.submitFail(that.lang.upload_error);
                            }
                            break;
                        default:
                            that.submitFail(that.lang.upload_error);
                    }
                },
                complete: function () {
                    that.$videoUpload.button('reset');
                    that.$videoModal.modal('hide');
                }
            });
            return false;
        },
        directUpload: function (e) {
            e.preventDefault();
            if (!this.$videoInput.val()) {
                return false;
            }
            if (this.support.formData) {
                this.ajaxUpload();
            }else{
                alert('浏览器不支持上传插件，请换一个浏览器');
            }
            return false;
        },
        submitDone: function (rs) {
            if ($.isPlainObject(rs)) {
                this.url = rs.url + '?r=' + Math.random();
                if (this.support.datauri || this.uploaded) {
                    this.uploaded = false;
                    this.$el.val(rs.url).trigger('change');
                } else {
                    this.uploaded = true;
                }
                this.$videoInput.val('');
            } else {
                alert(this.lang.upload_error);
            }
        },
        submitFail: function (msg) {
            alert(msg);
        }
    }

    // Create chainable jQuery plugin:
    $.fn.videoupload = function (option, args) {
        var dataKey = 'videoupload';
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data(dataKey)
                    , options = typeof option == 'object' && option
            if (!data)
                $this.data(dataKey, (data = new Videoupload(this, options)))
            if (typeof option == 'string')
                data[option]()
        });
    };

    $.fn.videoupload.defaults = {
        url: null,
        zindex: 99999,
        field: "file",
        title: "Upload Video",
        locale: 'zh-CN'
    };

    $.fn.videoupload.locales = {
        'zh-CN': {
            upload_video: '上传文件',
            change_video: '点击更换文件',
            choose_video: '选择文件',
            choose_none: '未选择',
            uploading: '正在上传...',
            direct_upload: '开始上传',
            save: '上传裁剪结果',
            upload_error: '文件上传失败',
            upload_forbidden: '无权上传文件'
        }
    }

    $(function () {
        $("[data-toggle='videoupload']").videoupload();
    });

}(window.jQuery);