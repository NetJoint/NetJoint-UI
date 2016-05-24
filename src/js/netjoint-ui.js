define(['jquery',
    'affix',
    'alert',
    'button',
    'carousel',
    'collapse',
    'dropdown',
    'modal',
    'popover',
    'scrollspy',
    'tab',
    'tooltip',
    'transition',
    'checkbox',
    'datepicker',
    'timepicker',
    'select2',
    'editable'
], function () {
    $(function () {
        $('[data-spy="scroll"]').scrollspy();
        $('[data-spy="affix"]').affix();
    });
});