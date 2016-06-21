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
    'layout',
    'editable',
    'validate'
], function () {
    $(function () {
        $('[data-spy="scroll"]').scrollspy();
        $('[data-spy="affix"]').affix();
        $('[data-toggle="select"]').select2();
    });
});