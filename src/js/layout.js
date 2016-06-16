/* ========================================================================
 * NetJoint UI: layout.js v3.3.6
 * ========================================================================
 * Copyright 2015-2016 NetJoint, Inc.
 * Licensed under MIT (https://github.com/NetJoint/NetJoint-UI/blob/master/LICENSE.md)
 * ======================================================================== */


+function ($) {
    'use strict';

    var toggle = '[data-toggle="layout"]',
            handle = '[data-handle="layout"]';
    
    var fixHeight = function ($layout) {        
        // reset height
        var $content = $('.layout-content',$layout);
        $content.css('min-height', $(window).height());        
    };
    var Layout = function (el) {
        var $layout = $(el);        
        $layout.on('click', handle, this.handle)
    }

    Layout.VERSION = '3.3.6'

    Layout.prototype.handle = function (e) {
        
    }


    // ALERT PLUGIN DEFINITION
    // =======================

    function Plugin(option) {        
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.layout')            
            if (!data)
                $this.data('bs.layout', (data = new Layout(this)))
            if (typeof option == 'string')
                data[option].call($this)            
        })
    }

    var old = $.fn.layout

    $.fn.layout = Plugin
    $.fn.layout.Constructor = Layout


    // ALERT NO CONFLICT
    // =================

    $.fn.layout.noConflict = function () {
        $.fn.layout = old
        return this
    }


    // LAYOUT DATA-API
    // ==============

    $(document).on('click.bs.layout.data-api', handle, Layout.prototype.handle)

    $(window).on('load', function () {
        $(toggle).each(function () {
            var $layout = $(this);            
            Plugin.call($layout, $layout.data());            
        })
    })


}(jQuery);