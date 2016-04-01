define(['base/js/namespace', 'jquery'], function(Jupyter, $) {
    function format(text) {
        return text;
    }

    function format_code_cell() {
        var selected_index = Jupyter.notebook.get_selected_index();
        var selected_cell = Jupyter.notebook.get_selected_cell();
        var selected_text = selected_cell.get_text();
        var formatted_text = format(selected_text);
        selected_cell.set_text(formatted_text);
    }

    function place_autoformat_button() {
        if (!Jupyter.toolbar) {
            $([Jupyter.events]).on("app_initialized.NotebookApp", place_autoformat_button);
            return;
        }

        if ($("#autoformat-button").length == 0) {
            Jupyter.toolbar.add_buttons_group([
                {
                    'label': 'Autoformat Code Cell',
                    'icon': 'fa-code',
                    'callback': format_code_cell,
                    'id': 'autoformat-button'
                }
            ]);
        }
    }

    function load_ipython_extension() {
        console.log('Loading notebook-autoformat extension...');
        place_autoformat_button();
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
