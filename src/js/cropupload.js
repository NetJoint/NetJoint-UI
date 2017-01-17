/*!
 * Cropupload v0.1
 * https://github.com/netjoint/cropupload
 *
 * Copyright (c) 2015 NetJoint
 * Released under the MIT license
 *
 * Date: 2015-09-16
 */
!function ($) {
    'use strict';
    function Cropupload(el, options) {
        this.el = el;
        this.$el = $(el);
        this.setOptions(options);
        this.setLocale();
        this.$el.hide();
        var multiple_flag = '';
        if(this.options.multiple){
            multiple_flag = 'multiple="true"';
            this.options.field = this.options.field + '[]';
        }        
        var thumbModal = '<div class="cropupload modal fade" id="thumb-modal" aria-hidden="true" role="dialog" tabindex="-1" style="z-index: 99999;">';
        thumbModal += '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><a class="close" data-dismiss="modal">&times;</a>';
        thumbModal += '<h4 class="modal-title">' + this.lang.upload_image + '</h4></div><div class="modal-body">';
        thumbModal += '<form class="form thumb-form" action="' + this.options.url + '" enctype="multipart/form-data" method="post">';
        thumbModal += '<input type="hidden" class="thumb-data" name="crop">';
        thumbModal += '<div class="row"><div class="col-sm-6"><input type="file" class="thumb-input" name="' + this.options.field + '" '+ multiple_flag +'>';
        thumbModal += '<button type="button" class="btn btn-xlarge btn-success thumb-input-btn" autocomplate="off" data-loading-text="' + this.lang.uploading + '">' + this.lang.choose_image + '</button> <span class="thumb-name text-large text-info">' + this.lang.choose_none + '</span></div>';
        thumbModal += '<div class="col-sm-6"><button type="submit" class="btn btn-xlarge btn-primary thumb-upload" autocomplate="off" data-loading-text="' + this.lang.uploading + '">' + this.lang.direct_upload + '</button></div></div>';
        thumbModal += '<div class="row"><div class="col-md-9"><div class="thumb-wrapper"></div></div>';
        thumbModal += '<div class="col-md-3"><div class="thumb-preview preview-lg"></div><div class="thumb-preview preview-md"></div><div class="thumb-preview preview-sm"></div></div></div>';
        thumbModal += '<div class="row"><div class="col-md-12 btn-toolbar thumb-btns">';
        thumbModal += '<div class="btn-group" style="font-size: 12px;vertical-align: bottom;margin-right:10px;">' + this.lang.aspect_ratio + ': <label class="radio inline"><input name="aspectRatio" type="radio" value="1"><span>1:1</span></label>';
        thumbModal += '<label class="radio inline"><input name="aspectRatio" type="radio" value="1.3333333333333333"><span>4:3</span></label>';
        thumbModal += '<label class="radio inline"><input name="aspectRatio" type="radio" value="1.7777777777777777"><span>16:9</span></label></div>';
        thumbModal += '<div class="btn-group"><a title="' + this.lang.zoom_in + '" data-option="0.1" data-method="zoom" class="btn btn-sm btn-default"><i class="fa fa-search-plus"></i></a>';
        thumbModal += '<a title="' + this.lang.zoom_out + '" data-option="-0.1" data-method="zoom" class="btn btn-sm btn-default"><i class="fa fa-search-minus"></i></a></div>';
        thumbModal += '<div class="btn-group"><a title="' + this.lang.move_left + '" data-second-option="0" data-option="-10" data-method="move" class="btn btn-sm btn-default"><i class="fa fa-arrow-left"></i></a>';
        thumbModal += '<a title="' + this.lang.move_right + '" data-second-option="0" data-option="10" data-method="move" class="btn btn-sm btn-default"><i class="fa fa-arrow-right"></i></a>';
        thumbModal += '<a title="' + this.lang.move_up + '" data-second-option="-10" data-option="0" data-method="move" class="btn btn-sm btn-default"><i class="fa fa-arrow-up"></i></a>';
        thumbModal += '<a title="' + this.lang.move_down + '" data-second-option="10" data-option="0" data-method="move" class="btn btn-sm btn-default"><i class="fa fa-arrow-down"></i></a></div>';
        thumbModal += '<div class="btn-group"><a class="btn btn-rotate btn-sm btn-default" data-method="rotate" data-option="-90" title="' + this.lang.rotate_left + '"><i class="fa fa-rotate-left"></i></a>';
        thumbModal += '<a class="btn btn-sm btn-default" data-method="rotate" data-option="90" title="' + this.lang.rotate_right + '"><i class="fa fa-rotate-right"></i></a></div>';
        thumbModal += '<div class="btn-group"><button type="submit" class="btn btn-sm btn-primary thumb-save" autocomplate="off" data-loading-text="' + this.lang.uploading + '">' + this.lang.save + '</button></div>';
        thumbModal += '</div></div></form></div></div></div></div>';
        this.$thumbModal = $(thumbModal).appendTo('body');
        this.$thumbForm = this.$thumbModal.find('.thumb-form');
        this.$thumbData = this.$thumbForm.find('.thumb-data');
        this.$thumbInput = this.$thumbForm.find('.thumb-input');
        this.$thumbInputBtn = this.$thumbForm.find('.thumb-input-btn');
        this.$thumbName = this.$thumbForm.find('.thumb-name');
        this.$thumbSave = this.$thumbForm.find('.thumb-save');
        this.$thumbUpload = this.$thumbForm.find('.thumb-upload');
        this.$thumbWrapper = this.$thumbModal.find('.thumb-wrapper');
        this.$thumbPreview = this.$thumbModal.find('.thumb-preview');
        this.$thumbButtons = this.$thumbModal.find('.thumb-btns');
        this.initialize();
    }

    $.Cropupload = Cropupload;

    Cropupload.prototype = {
        constructor: Cropupload,
        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },
        setOptions: function (options) {
            return this.options = $.extend({}, $.fn.cropupload.defaults, this.$el.data(), options);
        },
        setLocale: function () {
            var locale = this.options.locale;
            return this.lang = $.extend({}, $.fn.cropupload.locales[locale]);
        },
        initialize: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;
            if (!this.support.formData) {
                this.initIframe();
            }
            this.$thumbModal.modal('hide');
            this.$thumbUpload.on('click', $.proxy(this.directUpload, this));
            this.$thumbInput.on('change', $.proxy(this.change, this));
            this.$thumbForm.on('submit', $.proxy(this.submit, this));
            this.$el.on('change', $.proxy(this.thumbView, this));
            this.initButtons();
            this.thumbView();
        },
        thumbView: function () {
            var that = this;
            this.$container = this.$el.parent();
            if(!this.$thumb){
                this.$thumb = $('<div class="cropupload thumb"><div class="views"></div><div class="btn-add"><img style="height:' + this.options.height + 'px" src="' + this.options.addimg + '" title="' + this.options.title + '" alt="' + this.options.title + '"></div></div>');                
            }
            this.$thumbViews = $('.views', this.$thumb);
            this.$thumbViews.empty();            
            var $addImg = $('.btn-add', this.$thumb);
            $addImg.on('click', $.proxy(this.click, this));
            
            
            var $viewImg = $('<div class="view"><div class="tools"><i class="fa fa-chevron-left"></i> <i class="fa fa-chevron-right"></i> <i class="fa fa-trash"></i></div><img style="height:' + this.options.height + 'px" src="" title="" alt=""></div>');
            var url = this.$el.val();
            if (this.options.multiple) {
                //多图上传
                this.$thumb.addClass('multiple');
                if(url != ''){
                    var urls = url.split(',');    
                    $.each(urls, function (i, url) {
                        var $newView = $viewImg.clone();
                        $newView.find('img').attr('src', url);
                        $newView.find('.fa-trash').on('click', function () {
                            that.removeThumb($newView);
                        });
                        $newView.find('.fa-chevron-left').on('click', function () {
                            that.moveThumb($newView,-1);
                        });
                        $newView.find('.fa-chevron-right').on('click', function () {
                            that.moveThumb($newView,1);
                        });
                        $newView.appendTo(that.$thumbViews);
                    });
                }            
            } else {
                //单图上传
                this.$thumb.addClass('single');
                if(url===''){
                    $addImg.removeClass('hidden');
                }else{
                    $addImg.addClass('hidden');
                    var $newView = $viewImg.clone();
                    $newView.find('img').attr('src', url).attr('alt', this.lang.change_image).attr('title', this.lang.change_image).on('click', $.proxy(this.click, this));
                    $newView.find('.fa-trash').on('click', function () {
                        that.removeThumb($newView);
                    });
                    $newView.appendTo(that.$thumbViews);  
                }           
            }
            this.$thumb.appendTo(this.$container);
        },
        removeThumb: function ($el) {
            $el.remove();
            var srcs = [],$imgs = this.$thumbViews.find('img');
            $imgs.each(function(i,el){
                srcs.push($(el).attr('src'));
            });
            this.$el.val(srcs.join(',')).trigger('change');
        },
        moveThumb: function ($el,direct) {
            var $obj;
            if(direct<0){
                $obj = $el.prev();
            }else{
                $obj = $el.next();
            }
            if($obj.length){
               if(direct<0){
                   $el.insertBefore($obj);
               }else{
                   $el.insertAfter($obj);
               }
               var srcs = [],$imgs = this.$thumbViews.find('img');
                $imgs.each(function(i,el){
                    srcs.push($(el).attr('src'));
                });
                this.$el.val(srcs.join(',')).trigger('change'); 
            }
            
        },
        initIframe: function () {
            var target = 'upload-iframe-' + (new Date()).getTime();
            var $iframe = $('<iframe>').attr({
                name: target,
                src: ''
            });
            var that = this;

            // Ready ifrmae
            $iframe.one('load', function () {

                // respond response
                $iframe.on('load', function () {
                    var data;

                    try {
                        data = $(this).contents().find('body').text();
                    } catch (e) {
                        //console.log(e.message);
                    }

                    if (data) {
                        try {
                            data = $.parseJSON(data);
                        } catch (e) {
                            //console.log(e.message);
                        }
                        that.submitDone(data);
                    } else {
                        that.submitFail(that.lang.upload_error);
                    }

                    that.submitEnd();

                });
            });

            this.$iframe = $iframe;
            this.$thumbForm.attr('target', target).after($iframe.hide());
        },
        initButtons: function () {
            var that = this;
            this.$thumbButtons.on('click', 'a.btn', function (e) {
                e.preventDefault();
                if (that.active) {
                    var data = $(this).data();
                    if (data.method) {
                        that.$img.cropper(data.method, data.option, data.secondOption);
                    }
                }
                return false;
            });
            var ratio = this.options.aspectRatio;
            if (ratio <= 1.1) {
                this.$thumbButtons.find('input[name="aspectRatio"][value="1"]').prop('checked', true).trigger('change');
                this.options.aspectRatio = 1;
            } else if (ratio < 1.6) {
                this.$thumbButtons.find('input[name="aspectRatio"][value="1.3333333333333333"]').prop('checked', true).trigger('change');
                this.options.aspectRatio = 1.3333333333333333;
            } else {
                this.$thumbButtons.find('input[name="aspectRatio"][value="1.7777777777777777"]').prop('checked', true).trigger('change');
                this.options.aspectRatio = 1.7777777777777777;
            }
            this.$thumbButtons.on('change', 'input[name="aspectRatio"]', function (e) {
                var ratio = $(this).val();
                that.options.aspectRatio = ratio;
                if (that.active) {
                    that.$img.cropper('setAspectRatio', ratio);
                }
            });
        },
        click: function () {
            var src = this.$el.val();
            if (src == '' || this.options.multiple) {
                src = this.options.blankimg;
            }
            this.$thumbPreview.html('<img src="' + src + '">');
            this.$thumbModal.modal('show');
        },
        change: function (e) {
            var files;
            var file; 
            if (this.support.datauri) {                
                files = this.$thumbInput.prop('files');
                if (files.length > 0) {
                    if(files.length > 1){
                       //多文件
                       this.$thumbName.text(files[0].name + this.lang.many_files);                       
                       this.ajaxUpload();
                    }else{
                       //单文件
                       file = files[0];
                       this.$thumbName.text(file.name);
                        if (this.isImageFile(file)) {
                            if (this.url) {
                                URL.revokeObjectURL(this.url);
                            }
                            this.url = URL.createObjectURL(file);
                            this.startCropper();
                        } 
                    }
                }
            } else {      
                file = this.$thumbInput.val();
                if (this.isImageFile(file)) {                    
                    this.$thumbName.text(file);
                    this.syncUpload();
                }
            }
        },
        submit: function (e) {
            e.preventDefault();
            if (!this.$thumbInput.val()) {
                return false;
            }
            if (this.support.formData) {                
                this.ajaxUpload();
            }
            return false;
        },
        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif|bmp)$/.test(file);
            }
        },
        startCropper: function () {
            var that = this;
            this.$thumbSave.button('enable');
            this.$thumbUpload.button('enable');
            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$thumbWrapper.empty().html(this.$img);
                this.$img.cropper({
                    aspectRatio: this.options.aspectRatio,
                    preview: this.$thumbPreview.selector,
                    strict: false,
                    crop: function (e) {
                        var json = [
                            '{"x":' + e.x,
                            '"y":' + e.y,
                            '"height":' + e.height,
                            '"width":' + e.width,
                            '"rotate":' + e.rotate + '}'
                        ].join();

                        that.$thumbData.val(json);
                    }
                });
                this.active = true;
            }

            this.$thumbModal.one('hidden.bs.modal', function () {
                that.$thumbPreview.empty();
                that.stopCropper();
            });
        },
        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
                this.$thumbSave.button('disabled');
                this.$thumbUpload.button('disabled');
            }
        },
        ajaxUpload: function () {
            var url = this.$thumbForm.attr('action');
            var data = new FormData(this.$thumbForm[0]);
            var that = this;
            this.$thumbSave.button('loading');
            this.$thumbUpload.button('loading');            
            this.$thumbInputBtn.button('loading');
            $.ajax(url, {
                type: 'post',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: function () {
                    that.submitStart();
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
                    that.submitEnd();
                }
            });
            return false;
        },
        directUpload: function (e) {
            e.preventDefault();
            if (!this.$thumbInput.val()) {
                return false;
            }
            if (this.support.formData) {
                this.$thumbData.val('{}');
                this.ajaxUpload();
            }
            return false;
        },
        syncUpload: function () {
            this.$thumbUpload.click();
        },
        submitStart: function () {
            
        },
        submitDone: function (rs) {
            if ($.isPlainObject(rs)) {
                this.url = rs.url + '?r=' + Math.random();
                if (this.support.datauri || this.uploaded) {
                    this.uploaded = false;
                    var old_val = this.$el.val();
                    if (this.options.multiple) {
                        //多图上传
                        if (old_val == '') {
                            this.$el.val(rs.url).trigger('change');
                        } else {
                            this.$el.val(old_val + ',' + rs.url).trigger('change');
                        }
                    } else {
                        //单图上传
                        if(rs.width){
                            this.$el.attr('data-raw-width',rs.width);
                        }
                        if(rs.height){
                            this.$el.attr('data-raw-height',rs.height);
                        }
                        this.$el.val(rs.url).trigger('change');                        
                    }
                    this.cropDone();
                } else {
                    this.uploaded = true;
                    this.startCropper();
                }
                this.$thumbInput.val('');
            } else {
                alert(this.lang.upload_error);
            }
        },
        submitFail: function (msg) {
            alert(msg);
        },
        submitEnd: function () {
            this.$thumbUpload.button('reset');
            this.$thumbInputBtn.button('reset');
            this.$thumbSave.button('reset');
        },
        cropDone: function () {
            this.$thumbForm.get(0).reset();
            this.$thumbName.text('未选择');
            this.thumbView();
            this.stopCropper();
            this.$thumbSave.button('disabled');
            this.$thumbUpload.button('disabled');
            this.$thumbModal.modal('hide');
        }
    }

    // Create chainable jQuery plugin:
    $.fn.cropupload = function (option, args) {
        var dataKey = 'cropupload';
        return this.each(function () {
            var $this = $(this)
                    , data = $this.data(dataKey)
                    , options = typeof option == 'object' && option
            if (!data)
                $this.data(dataKey, (data = new Cropupload(this, options)))
            if (typeof option == 'string')
                data[option]()
        });
    };

    $.fn.cropupload.defaults = {
        url: null,
        multiple: false,
        hideInput: true,
        zindex: 99999,
        height: 80,
        aspectRatio: 1.33,
        field: "file",
        title: "Upload Image",
        addimg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjBFRjQ5Mjc2NDdDMTFFNjhFNzg5MUY2MzA4MzhBQkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjBFRjQ5Mjg2NDdDMTFFNjhFNzg5MUY2MzA4MzhBQkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMEVGNDkyNTY0N0MxMUU2OEU3ODkxRjYzMDgzOEFCQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyMEVGNDkyNjY0N0MxMUU2OEU3ODkxRjYzMDgzOEFCQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PreWrDoAAAMAUExURf39/eDg4P7+/vz8/PDw8OTk5Ozs7OPj4/v7++fn5/n5+erq6vr6+uLi4uHh4fb29vj4+OXl5ff39+3t7e/v7/Hx8fT09Onp6ejo6Obm5vPz8/X19fLy8t/f3////x8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v////TXQLYAAAE3SURBVHja7NjbjoMgEADQ/v9PDhYtraGRbrvelTZuETFtFJlsutmZRy4ngjCgO40cOwIJJPDfg30EwDrMJ2QAQOAfBE97WIqn5IRdPTOwBsAFT9ggwwYfdaLEfCmPFr0m8JPBXiXAZYsG1vGwxqKQI8ABD89V2yKBX2YbnJHA1IDxm74t+M2hNODB1nemsN4AFgZUY3WTjNng6g+OY7Z94kmCUf5gfx56Ht1JG+PmDWpdXWSW2wlM3Bz4DYFbb57Oo0Awe5m/t4M54IJNhAwKCAS7o6xsefH2DFwL5ny6RToeCl5+Wst+lie2gso0F0MuVBAIToC40foGgaADsKxkgWCx5oLjAZZ7wAU5IINA4IeBzNdjCzcH4QuKBbDyfcBq6QM85etHzXha008MAgkkkMDfAu8CDABhrjaqlwkYWAAAAABJRU5ErkJggg==",
        blankimg: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=",
        locale: 'zh-CN'
    };

    $.fn.cropupload.locales = {
        'zh-CN': {
            upload_image: '上传图片',
            change_image: '点击更换图片',
            choose_image: '选择图片',
            choose_none: '未选择',
            mouse_scale: '可以使用鼠标滚轮缩放',
            aspect_ratio: '宽高比',
            zoom_in: '放大',
            zoom_out: '缩小',
            move_left: '左移',
            move_right: '右移',
            move_up: '上移',
            move_down: '下移',
            rotate_left: '逆时针旋转',
            rotate_right: '顺时针旋转',
            uploading: '正在上传...',
            direct_upload: '上传原图',
            save: '上传裁剪结果',
            upload_error: '图片上传失败',
            upload_forbidden: '无权上传图片',
            many_files:'等文件'
        }
    }

    $(function () {
        $("[data-toggle='cropupload']").cropupload();
    });

}(window.jQuery);