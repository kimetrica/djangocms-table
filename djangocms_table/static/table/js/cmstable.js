var hot, table_data, headers_top, headers_left, headers_bottom;

function headerRenderer(instance, td, row, col, prop, value, cellProperties) {
	Handsontable.TextCell.renderer.apply(this, arguments);
	$(td).addClass('table-head');
};

function normalRenderer (instance, td, row, col, prop, value, cellProperties) {
	Handsontable.TextCell.renderer.apply(this, arguments);
	$(td).css({
		'background':'white',
		'font-weight':'normal'
	});
};

function getTable(container, properties) {

	var defaults = {
		'data': table_data.data,
	    'startRows': 5,
    	'startCols': 5,
        'rowHeaders': false,
    	'colHeaders': false,
    	'autoColumnSize': false,
    	'contextMenu': true,
	    'cell': table_data.cell,
	    'cells': function (row, col, prop) {
	    	var cellProperties = {};
	    
	    	if (row < headers_top){
	    		cellProperties.renderer = headerRenderer;
	    	} else if (col < headers_left) {
	    		cellProperties.renderer = headerRenderer;
			} else if (row >= this.instance.countRows() - headers_bottom){
	    		cellProperties.renderer = headerRenderer;
			} else {
	   			cellProperties.renderer = normalRenderer;
	   		}
	   		return cellProperties;
		},
	    'mergeCells': table_data.mergeCells,
	    'tableClassName': ['table']
	};
	    
	return new Handsontable(container, Object.assign(defaults, properties));
};
