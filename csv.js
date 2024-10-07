// Clase CsvConfigConsts
var CsvConfigConsts = {
    EOL: "\r\n",
    BOM: "\ufeff",

    DEFAULT_FIELD_SEPARATOR: ',',
    DEFAULT_DECIMAL_SEPARATOR: '.',
    DEFAULT_QUOTE: '"',
    DEFAULT_SHOW_TITLE: false,
    DEFAULT_TITLE: 'My Generated Report',
    DEFAULT_FILENAME: 'generated',
    DEFAULT_SHOW_LABELS: false,
    DEFAULT_USE_TEXT_FILE: false,
    DEFAULT_USE_BOM: true,
    DEFAULT_HEADER: [],
    DEFAULT_KEYS_AS_HEADERS: false
};

// Objeto CsvConfigDefaults
var CsvConfigDefaults = {
    filename: CsvConfigConsts.DEFAULT_FILENAME,
    fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
    quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
    decimalSeparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
    showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
    showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
    title: CsvConfigConsts.DEFAULT_TITLE,
    useTextFile: CsvConfigConsts.DEFAULT_USE_TEXT_FILE,
    useBom: CsvConfigConsts.DEFAULT_USE_BOM,
    headers: CsvConfigConsts.DEFAULT_HEADER,
    useKeysAsHeaders: CsvConfigConsts.DEFAULT_KEYS_AS_HEADERS
};

// Clase CsvService
function CsvService() {
    this._data = [];
    this._options = Object.assign({}, CsvConfigDefaults);
    this._csv = "";
}

CsvService.prototype.getOptions = function () {
    return this._options;
};

CsvService.prototype.setOptions = function (options) {
    this._options = Object.assign({}, CsvConfigDefaults, options);
};

CsvService.prototype.generateCsv = function (jsonData, shouldReturnCsv = false) {
    this._csv = '';

    this._parseData(jsonData);

    if (this._options.useBom) {
        this._csv += CsvConfigConsts.BOM;
    }

    if (this._options.showTitle) {
        this._csv += this._options.title + '\r\n\n';
    }

    this._getHeaders();
    this._getBody();

    if (this._csv === '') {
        console.log("Invalid data");
        return;
    }

    if (shouldReturnCsv) {
        return this._csv;
    }

    var FileType = this._options.useTextFile ? 'plain' : 'csv';
    var fileExtension = this._options.useTextFile ? '.txt' : '.csv';
    var blob = new Blob([this._csv], { "type": "text/" + FileType + ";charset=utf8;" });

    var attachmentType = this._options.useTextFile ? 'text' : 'csv';
    var uri = 'data:attachment/' + attachmentType + ';charset=utf-8,' + encodeURI(this._csv);
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.setAttribute('visibility', 'hidden');
    link.download = this._options.filename.replace(/ /g, "_") + fileExtension;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

CsvService.prototype._getHeaders = function () {
    if (!this._options.showLabels && !this._options.useKeysAsHeaders) {
        return;
    }
    var useKeysAsHeaders = this._options.useKeysAsHeaders;
    var headers = useKeysAsHeaders ? Object.keys(this._data[0]) : this._options.headers;

    if (headers.length > 0) {
        var row = "";
        for (var keyPos = 0; keyPos < headers.length; keyPos++) {
            row += headers[keyPos] + this._options.fieldSeparator;
        }

        row = row.slice(0, -1);
        this._csv += row + CsvConfigConsts.EOL;
    }
};

CsvService.prototype._getBody = function () {
    var keys = Object.keys(this._data[0]);
    for (var i = 0; i < this._data.length; i++) {
        var row = "";
        for (var keyPos = 0; keyPos < keys.length; keyPos++) {
            var key = keys[keyPos];
            row += this._formatData(this._data[i][key]) + this._options.fieldSeparator;
        }

        row = row.slice(0, -1);
        this._csv += row + CsvConfigConsts.EOL;
    }
};

CsvService.prototype._formatData = function (data) {
    if (this._options.decimalSeparator === 'locale' && this._isFloat(data)) {
        return data.toLocaleString();
    }

    if (this._options.decimalSeparator !== '.' && this._isFloat(data)) {
        return data.toString().replace('.', this._options.decimalSeparator);
    }

    if (typeof data === 'string') {
        data = data.replace(/"/g, '""');
        if (this._options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
            data = this._options.quoteStrings + data + this._options.quoteStrings;
        }
        return data;
    }

    if (typeof data === 'boolean') {
        return data ? 'TRUE' : 'FALSE';
    }
    return data;
};

CsvService.prototype._isFloat = function (input) {
    return +input === input && (!isFinite(input) || Boolean(input % 1));
};

CsvService.prototype._parseData = function (jsonData) {
    this._data = typeof jsonData !== 'object' ? JSON.parse(jsonData) : jsonData;
    return this._data;
};

CsvService.prototype.toObject = function (val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
};

CsvService.prototype.objectAssign = function (target) {
    var from;
    var to = this.toObject(target);
    var symbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);

        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }

        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
};