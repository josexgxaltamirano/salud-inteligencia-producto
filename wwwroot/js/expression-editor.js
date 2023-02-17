const ID_SALUD = "salud";
const ID_LOCAL_PARAMS = "localParams";
const DATA_TYPE_STRING = "string";
const DATA_TYPE_NUMERIC = "numeric";
const DATA_TYPE_DATETIME = "dateTime";
const DATA_TYPE_OBJECT = "object";
const DATA_TYPE_BOOLEAN = "boolean";
const DATA_TYPE_LIST = "list";
const FUNCTION_WHERE = "Where";
const FUNCTION_SELECT = "Select";
const FUNCTION_DISTINCT = "Distinct";
const FUNCTION_COUNT = "Count"
const FUNCTION_SUM = "Sum";
const FUNCTION_FIRST = "First";
const FUNCTION_FIRSTORDEFAULT = "FirstOrDefault";
const FUNCTION_ANY = "Any";
const FUNCTION_EQUAL = "==";
const FUNCTION_NOT_EQUAL = "!=";
const IS_NULL = 'null';
const FILTER_TEMPLATE_NAME = "filter-template";
const FILTER_LOCAL_PARAM_TEMPLATE_NAME = "filter-localparams-template";
let dataGlobal = {};
let localParamsGlobal = [];
//costantes para clase d-flex de bootstrap
const CLASS_D_FLEX = "d-flex align-items-start";
const operators = [
    new Operator("Igual", "==", [DATA_TYPE_STRING, DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME, DATA_TYPE_BOOLEAN]),
    new Operator("No es igual", "!=", [DATA_TYPE_STRING, DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME, DATA_TYPE_BOOLEAN]),
    new Operator("Es menor", "<", [DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME]),
    new Operator("Es mayor", ">", [DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME]),
    new Operator("Es menor o igual", "<=", [DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME]),
    new Operator("Es mayor o igual", ">=", [DATA_TYPE_NUMERIC, DATA_TYPE_DATETIME]),
    new Operator("Suma", "+", []),
    new Operator("Resta", "-", []),
    new Operator("Multiplicaci\u00F3n", "*", []),
    new Operator("Divisi\u00F3n", "/", []),
    new Operator("Operador condicional ternario (?)", "?", []),
    new Operator("Separador condicional ternario (:)", ":", [])
];


const domainVariables = [
    { name: "Salud", id: ID_SALUD },
    { name: "Parametros locales", id: ID_LOCAL_PARAMS }
];
let addedProperties = [];

const listFunctions = [
    {
        name: "Incluye (Where)",
        id: FUNCTION_WHERE
    },
    {
        name: "Seleccionar (Select)",
        id: FUNCTION_SELECT
    },
    {
        name: "Sumar (Sum)",
        id: FUNCTION_SUM
    },
    {
        name: "Eliminar Duplicados (Distinct)",
        id: FUNCTION_DISTINCT
    },
    {
        name: "Contabilizar Registros (Count)",
        id: FUNCTION_COUNT
    },
    {
        name: "Primer registro (First)",
        id: FUNCTION_FIRST
    },
    {
        name: "Primer registro o por defecto (FirstOrDefault)",
        id: FUNCTION_FIRSTORDEFAULT
    },
    {
        name: "Cualquier registro cumple la condici\u00F3n (Any)",
        id: FUNCTION_ANY
    },
    {
        name: "No es igual (!=)",
        id: FUNCTION_NOT_EQUAL
    },
    {
        name: "Es igual (==)",
        id: FUNCTION_EQUAL
    },
]

const listFunctionConvert = [
    { name: "Convertir en entero (ToInt32)", id: "Convert.ToInt32" },
    { name: "Convertir en decimal (ToDouble)", id: "Convert.ToDouble" }
]

const listFunctionConvertConcat = [
    { name: "Convertir en min\u00fascula", id: "ToLower()" },
    { name: "Convertir en may\u00fascula", id: "ToUpper()" },
    { name: "Convertir en decimal (TotalDays)", id: "TotalDays()" }
];

const booleanValues = [
    { name: "Verdadero", value: "true" },
    { name: "Falso", value: "false" }
];

const logicalOperators = [
    new LogicalOperator("Todas las condiciones se deben cumplir (And)", "&&"),
    new LogicalOperator("Una de las condiciones se debe cumplir (Or)", "||"),
]

function Group(classes, jsFromServer) {
    const self = this;
    self.classes = "";
    if (classes !== "" || classes !== null) {
        self.classes = classes;
    }
    self.templateName = 'group-template';
    self.children = ko.observableArray();
    self.logicalOperators = ko.observableArray(logicalOperators);
    self.np = ko.observable(false)
    self.selectedLogicalOperator = ko.observable(logicalOperators[0].value);

    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        var mapping = {
            'children': {
                create: function (options) {
                    var data = options.data;
                    if (data.templateName === 'group-template') {
                        return new Group(data.classes, data);
                    }
                    else {
                        return new ExpressionSelectObject(data.classes, data);
                    }
                }
            },
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }
    // give the group a single default condition
    self.addCondition = function () {
        self.children.push(new Condition());
    };
    self.addExpression = function () {
        self.children.push(new ExpressionSelectObject());
    };
    self.addGroup = function () {
        self.children.push(new Group("my-2 p-0 border-0"));
    };
    self.removeChild = function (child) {
        self.children.remove(child);
    };
    // the text() function is just an example to show output
    self.text = ko.computed(function () {
        let result = '';
        if (self.np()) {
            result = "np(";
        }
        else {
            result = "(";
        }
        let op = '';
        for (const child of self.children()) {
            result += op + child.text();
            op = ` ${self.selectedLogicalOperator()} `;
        }
        result += ')'
        return result;
    });

}
Group.prototype.toJSON = function () {
    var copy = ko.toJS(this); 
    delete copy.logicalOperators;
    delete copy.text;
    return copy;
}
//Group.mapping = {
//    create: function (options) {
//        return new ExpressionSelectObject("")
//    },
//    key: function (data) {
//        return ko.unwrap(data.children)
//    }
//}

function Condition(classes) {
    const self = this;
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.templateName = 'condition-template';
    self.fieldLeft = ko.observable(new FilterSimple(dataGlobal));
    self.comparisons = ko.observableArray(operators);
    self.selectedComparison = ko.observable(operators[0].value);
    self.fieldRight = ko.observable(new FilterSimple(dataGlobal));
    // the text() function is just an example to show output
    self.text = ko.computed(function () {
        return `${self.fieldLeft().text()} ${self.selectedComparison()} ${self.fieldRight().text()}`;
    });
}

function ExpressionSelectObject(classes, jsFromServer) {
    const self = this;
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.templateName = 'expression-template-object';

    self.childrens = ko.observableArray();

    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        var mapping = {
            'childrens': {
                create: function (options) {
                    var data = options.data;
                    if (data.templatesName === 'select-variable-type-template') {
                        return new SelectVariableType(data)
                    }
                    else if (data.templatesName === 'operation-template') {
                        return new Operation(data)
                    }
                    else if (data.templatesName === 'grouper-template') {
                        return new Grouper(data)
                    }
                    else if (data.templatesName === 'expression-json-grouper-template') {
                        return new ExpressionJsonGrouper(data)
                    }
                }
            },
            'ignore': ['text']
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }

    self.addVariable = function () {
        self.childrens.push(new SelectVariableType())
    }
    self.addOperator = function () {
        self.childrens.push(new Operation())
    }
    self.addGrouper = function () {
        self.childrens.push(new Grouper())
    }
    self.addExpressionJsonObject = function () {
        self.childrens.push(new ExpressionJsonGrouper());
    }
    self.removeChild = function (child) {
        self.childrens.remove(child);
    }
    self.text = ko.computed(function () {
        let result = "";
        let space = "";

        for (const children of self.childrens()) {
            result += space + children.text();
            space = " ";
        }
        return result;
    })
}
ExpressionSelectObject.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.classes;
    delete copy.text;
    return copy;
}
//ExpressionSelectObject.mapping = {
//    create: function (options) {
//        return new ExpressionSelectObject();
//    }

//}

function ExpressionSelectObjectFromList(classes, dataList, jsFromServer) {
    const self = this;
    self.listName = `Agregar variable de ${dataList.name}`
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.templateName = 'expression-object-list-template';
    self.childrens = ko.observableArray();

    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        var mapping = {
            'childrens': {
                create: function (options) {
                    var data = options.data;
                    console.log(options)
                    if (data.templatesName === 'select-variable-type-template') {
                        return new SelectVariableType(data)
                    }
                    else if (data.templatesName === 'operation-template') {
                        return new Operation(data)
                    }
                    else if (data.templatesName === 'grouper-template') {
                        return new Grouper(data)
                    }
                    else if (data.templatesName === 'expression-json-grouper-template') {
                        return new ExpressionJsonGrouper(data)
                    }
                    else if (data.templatesName === FILTER_LOCAL_PARAM_TEMPLATE_NAME) {
                        return new FilterLocalParams(dataList.childrens, data)
                    }
                }
            },
            'ignore': ['text']
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }

    self.addPropertyVariable = function () {
        self.childrens.push(new FilterLocalParams(dataList.childrens))
    }
    self.addVariable = function () {
        self.childrens.push(new SelectVariableType())
    }
    self.addOperator = function () {
        self.childrens.push(new Operation())
    }
    self.addGrouper = function () {
        self.childrens.push(new Grouper())
    }
    self.addExpressionJsonObject = function () {
        self.childrens.push(new ExpressionJsonGrouper());
    }
    self.removeChild = function (child) {
        self.childrens.remove(child);
    }
    self.text = ko.computed(function () {
        let result = "";
        let space = "";

        for (const children of self.childrens()) {
            result += space + children.text();
            space = " ";
        }
        return result;
    })
}
ExpressionSelectObjectFromList.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.classes;
    delete copy.text;
    return copy;
}

function Grouper(jsFromServer) {
    const self = this;
    let pos = 0;
    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
        pos = getObjectById(jsFromServer.selectedFunction, listFunctionConvertConcat)
    }
    self.templatesName = 'grouper-template';
    self.addFunctionToGrouper = ko.observable(hasData ? jsFromServer.addFunctionToGrouper : false)
    self.denyGrouper = ko.observable(hasData ? jsFromServer.denyGrouper : false)
    self.functions = ko.observableArray(listFunctionConvertConcat);
    self.selectedFunction = ko.observable(listFunctionConvertConcat[pos]);
    const actionTemp = (hasData ? new ExpressionSelectObject("", jsFromServer.action) : new ExpressionSelectObject())
    self.action = ko.observable(actionTemp)
    self.text = ko.computed(function () {
        let text = ""
        if (self.addFunctionToGrouper() && self.selectedFunction()) {
            text = `(${self.action().text()}).${self.selectedFunction().id}`;
        } else {
            text = `(${self.action().text()})`;
        }
        if (self.denyGrouper()) {
            text = "!" + text;
        }
        return text;
    })
}
Grouper.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.classes;
    delete copy.functions;
    delete copy.text;
    return copy;
}

function Expression(classes, jsFromServer) {
    const self = this;
    let posDomain = 0;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
        posDomain = getObjectById(jsFromServer.selectedDomain, domainVariables)
    }
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.domains = ko.observableArray(domainVariables)
    self.selectedDomain = ko.observable(domainVariables[posDomain])
    self.templatesName = 'expression-template';
    self.filter = ko.computed(function () {
        if (self.selectedDomain()) {
            if (self.selectedDomain().id === ID_SALUD) {
                if (hasData) {
                    if (jsFromServer.filter.templateName === FILTER_TEMPLATE_NAME) {
                        return new Filter(dataGlobal, jsFromServer.filter)
                    }
                }
                return new Filter(dataGlobal)
            }
            if (self.selectedDomain().id === ID_LOCAL_PARAMS) {
                if (hasData) {
                    if (jsFromServer.filter.templateName === FILTER_LOCAL_PARAM_TEMPLATE_NAME) {
                        return new FilterLocalParams(localParamsGlobal, jsFromServer.filter)
                    }
                }
                return new FilterLocalParams(localParamsGlobal)
            }
        }
        return new ActionNone()
    });
    // the text() function is just an example to show output
    self.text = ko.computed(function () {
        return self.filter().text();
    });

}
Expression.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.classes;
    delete copy.domains;
    delete copy.text;
    return copy;
}

function ExpressionJsonGrouper(jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
    }
    self.templatesName = 'expression-json-grouper-template';
    self.childrens = ko.observableArray()
    if (hasData) {
        var mapping = {
            'childrens': {
                create: function (options) {
                    return new ExpressionJsonObject(options.data)
                }
            },
            'ignore': ['text']
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }
    self.addExpressionJsonObject = function () {
        self.childrens.push(new ExpressionJsonObject())
    }
    self.removeExpressionJsonObject = function (child) {
        self.childrens.remove(child)
    }
    self.text = ko.computed(function () {
        let result = 'new { ';
        let op = '';
        for (const children of self.childrens()) {
            result += op + children.text();
            op = ' , ';
        }
        result += '}'
        return result;
    });
}
ExpressionJsonGrouper.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function ExpressionJsonObject(jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    self.name = ko.observable(hasData ? jsFromServer.name : "");
    self.expression = ko.observable(hasData ? new ExpressionSelectObject('', jsFromServer.expression) : new ExpressionSelectObject());

    self.templatesName = "expression-json-object-template"
    self.text = ko.computed(function () {
        return `${self.expression().text()} as ${self.name()}`;
    });
}
ExpressionJsonObject.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function Operation(jsFromServer) {
    const self = this;
    self.templatesName = 'operation-template';
    self.options = ko.observableArray(operators);
    let pos = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        pos = getOperation(jsFromServer.selectedOption)
    }
    self.selectedOption = ko.observable(operators[pos])
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return self.selectedOption().value
        }
        return ""
    })
}
Operation.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.options;
    delete copy.text;
    return copy;
}

function FilterLocalParams(data, jsFromServer) {
    console.log(data)
    console.log(jsFromServer)
    const self = this;
    var hasData = false;
    var posSelectedOption = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posSelectedOption = getObjectById(jsFromServer.selectedOption, data)
    }
    self.childrens = ko.observableArray(data);
    self.templateName = FILTER_LOCAL_PARAM_TEMPLATE_NAME;
    self.templatesName = FILTER_LOCAL_PARAM_TEMPLATE_NAME;
    self.selectedOption = ko.observable(data[posSelectedOption]);
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addFunctionToPrimitive = ko.observable(hasData ? jsFromServer.addFunctionToPrimitive : false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            if (hasData) {
                if (jsFromServer.actionPrimitive.hasOwnProperty("id")) {
                    return new ActionForPrimitive(jsFromServer.actionPrimitive)
                }
            }
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.addFunctionForList = ko.observable(hasData ? jsFromServer.addFunctionForList : false)
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };

    self.action = ko.computed(function () {
        if (self.selectedOption()) {
            const dataType = self.selectedOption().dataType;
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.selectedOption().dataType, jsFromServer.action)
                }
                return new ActionLogical(self.selectedOption().dataType)
            }
            if (dataType === DATA_TYPE_LIST && self.addFunctionForList()) {
                if (hasData) {
                    return new ActionListOptions(self.selectedOption().dataType, jsFromServer.action)
                }
                return new ActionListOptions(self.selectedOption())
            }
        }
        return new ActionNone();
    })
    self.classDFlex = ko.computed(function () {
        if (self.selectedOption()) {
            const dataType = self.selectedOption().dataType;
            if (dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME || dataType === DATA_TYPE_BOOLEAN || dataType === DATA_TYPE_STRING) {
                return "d-flex align-items-start";
            }
        }
        return "";
    });

    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return self.selectedOption().id + self.actionPrimitive().text() + self.action().text();
        }
        return "";
    })
}
FilterLocalParams.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.classDFlex;
    delete copy.text;
    return copy;
}


function Filter(data, jsFromServer) {
    const self = this;
    let hasData = false;
    let posOptionSelected = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    const childrens = ko.utils.arrayMap(data.childrens, function (c) {
        if (hasData && jsFromServer.hasOwnProperty('optionSelected')) {
            if (jsFromServer.optionSelected.hasOwnProperty('id')) {
                if (c.id === jsFromServer.optionSelected.id) {
                    return new Filter(c, jsFromServer.optionSelected)
                }
            }
        }
        return new Filter(c);
    })
    if (hasData && jsFromServer.hasOwnProperty('optionSelected')) {
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.toJS(childrens))
    }
    self.templateName = FILTER_TEMPLATE_NAME;
    self.dataType = ko.observable(hasData ? jsFromServer.dataType : data.dataType);
    self.name = ko.observable(hasData ? jsFromServer.name : data.name);
    self.id = ko.observable(hasData ? jsFromServer.id : data.id);
    self.childrens = ko.observableArray(childrens);
    //self.optionSelected = ko.observable(childrens[posOptionSelected]);
    if (hasData && self.childrens().length > 0) {
        self.optionSelected = ko.observable(self.childrens()[posOptionSelected]);
    } else {
        self.optionSelected = ko.observable();
    }
    self.showChildren = ko.computed(function () {
        return self.optionSelected() && self.optionSelected().childrens().length > 0;
    });
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addFunctionToPrimitive = ko.observable(hasData ? jsFromServer.addFunctionToPrimitive : false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            if (hasData) {
                if(jsFromServer.actionPrimitive.hasOwnProperty("id")) {
                    return new ActionForPrimitive(jsFromServer.actionPrimitive)
                }
            }
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.addFunctionForList = ko.observable(hasData ? jsFromServer.addFunctionForList : false)
    self.addProperties = function () {
        addProperties(self.optionSelected());
    };
    self.action = ko.computed(function () {
        if (self.optionSelected()) {
            const dataType = self.optionSelected().dataType();
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.optionSelected().dataType(), jsFromServer.action);
                }
                return new ActionLogical(self.optionSelected().dataType());
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST && self.addFunctionForList()) {
                if (hasData) {
                    return new ActionListOptions(self.optionSelected(), jsFromServer.action)
                }
                return new ActionListOptions(self.optionSelected());
            }
        }
        return new ActionNone();
    });
    self.classDFlex = ko.computed(function () {
        if (self.optionSelected()) {
            const dataType = self.optionSelected().dataType();
            if (dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME || dataType === DATA_TYPE_BOOLEAN) {
                return CLASS_D_FLEX;
            }
            return "";
        }
        return "";
    });

    self.text = ko.computed(function () {
        let text = self.id();
        if (self.optionSelected() !== undefined) {
            text += `.${self.optionSelected().text()}${self.actionPrimitive().text()}${self.action().text()}`;
        }
        return text;
    });
}
Filter.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.showChildren;
    delete copy.classDFlex;
    delete copy.text;
    return copy;
}

function FilterSimpleDomain(jsFromServer) {
    const self = this;
    let posDomain = 0;
    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
        posDomain = getObjectById(jsFromServer.selectedDomain, domainVariables)
    }
    self.domains = ko.observableArray(domainVariables)
    self.selectedDomain = ko.observable(domainVariables[posDomain]);
    self.filter = ko.computed(function () {
        if (self.selectedDomain()) {
            if (self.selectedDomain().id === ID_SALUD) {
                if (hasData) {
                    return new FilterSimple(dataGlobal, jsFromServer.filter)
                }
                return new FilterSimple(dataGlobal)
            }
            if (self.selectedDomain().id === ID_LOCAL_PARAMS) {
                if (hasData) {
                    return new FilterLocalParamsSimple(localParamsGlobal, jsonFromServer.filter)
                }
                return new FilterLocalParamsSimple(localParamsGlobal)
            }
        }
        return new ActionNone()
    });
    self.text = ko.computed(function () {
        return self.filter().text();
    });
}
FilterSimpleDomain.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.domains;
    delete copy.text;
    return copy;
}

function FilterSimple(data, jsFromServer) {
    const self = this;
    let posOptionSelected = 0;
    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    const childrens = ko.utils.arrayMap(data.childrens, function (c) {
        if (hasData && jsFromServer.hasOwnProperty('optionSelected')) {
            if (jsFromServer.optionSelected.hasOwnProperty('id')) {
                if (c.id === jsFromServer.optionSelected.id) {
                    return new FilterSimple(c, jsFromServer.optionSelected)
                }
            }
        }
        return new Filter(c);
    })
    if (hasData && jsFromServer.hasOwnProperty('optionSelected')) {
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.toJS(childrens))
    }
    self.templateName = 'filter-simple-template';
    self.name = ko.observable(hasData ? jsFromServer.name : data.name);
    self.id = ko.observable(hasData ? jsFromServer.id : data.id);
    self.childrens = ko.observableArray(childrens);
    self.optionSelected = ko.observable(childrens[posOptionSelected]);
    self.showChildren = ko.computed(function () {
        return self.optionSelected() && self.optionSelected().childrens().length > 0;
    });
    self.text = ko.computed(function () {
        let text = self.id();
        if (self.optionSelected()) {
            text += '.' + self.optionSelected().text();
        }
        return text;
    });
}
FilterSimple.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.showChildren;
    delete copy.text;
    return copy;
}

function FilterLocalParamsSimple(data, jsFromServer) {
    const self = this;
    let hasData = false;
    let posSelectedOption = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posSelectedOption = getObjectById(jsFromServer.selectedOption, data)
    }
    self.childrens = ko.observableArray(data);
    self.selectedOption = ko.observable(data[posSelectedOption]);
    self.action = ko.computed(function () {
        if (self.selectedOption()) {
            if (hasData) {
                return new FilterSimple(self.selectedOption(), jsFromServer.selectedOption)
            }
            return new FilterSimple(self.selectedOption())
        }
        return new ActionNone()
    })
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return self.action().text();
        }
        return ""
    })
}
FilterLocalParamsSimple.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.text;
    return copy;
}

function ActionLogical(dataType, jsFromServer) {
    const self = this;
    let hasData = false;
    const comparisons = getOperators(dataType)
    let pos = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        pos = getObjectByValue(jsFromServer.selectedComparison, comparisons)
    }
    self.comparisons = ko.observableArray(comparisons);
    self.selectedComparison = ko.observable(comparisons[pos].value);
    self.fieldRight = ko.observable(hasData ? new SelectVariableTypeSimple(jsFromServer.fieldRight) : new SelectVariableTypeSimple())
    self.isNull = ko.observable(hasData ? jsFromServer.isNull : false);

    self.text = ko.computed(function () {
        if (self.isNull()) {
            return ` ${self.selectedComparison()} ${IS_NULL}`;
        }
        return ` ${self.selectedComparison()} ${self.fieldRight().text()}`;
    });
}
ActionLogical.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.comparisons;
    delete copy.text;
    return copy;
}

function ActionBoolean(jsFromServer) {
    const self = this;
    let posSelectedComparison = 0;
    let posSelectedFieldRight = 0;
    const operatorsArrayBoolean = getOperators(DATA_TYPE_BOOLEAN)
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        posSelectedComparison = getObjectByValue(jsFromServer.selectedComparison, operatorsArrayBoolean);
        posSelectedFieldRight = getObjectByValue(jsFromServer.selectedFieldRight, booleanValues);
    }
    self.comparisons = ko.observableArray(operatorsArrayBoolean);
    self.selectedComparison = ko.observable(operatorsArrayBoolean[posSelectedComparison].value);
    self.fieldRight = ko.observableArray(booleanValues);
    self.selectedFieldRight = ko.observable(booleanValues[posSelectedFieldRight].value);

    self.text = ko.computed(function () {
        return ` ${self.selectedComparison()} ${self.selectedFieldRight()}`;
    });
}
ActionBoolean.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.comparisons;
    delete copy.fieldRight;
    delete copy.text;
    return copy;
}

function ActionListOptions(data, jsFromServer) {
    const self = this;
    let hasData = false;
    let posSelectedFunction = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posSelectedFunction = getObjectByIdValue(jsFromServer.selectedFunction, listFunctions)
    }
    self.listOperations = ko.observableArray(listFunctions);
    self.selectedFunction = ko.observable(listFunctions[posSelectedFunction].id);
    self.classDFlex = ko.computed(function () {
        if (self.selectedFunction()) {
            if (self.selectedFunction().id === FUNCTION_EQUAL || self.selectedFunction().id === FUNCTION_NOT_EQUAL) {
                return CLASS_D_FLEX
            }
        }
        return ""
    })
    self.action = ko.computed(function () {
        if (self.selectedFunction()) {
            switch (self.selectedFunction().id) {
                case FUNCTION_WHERE:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_WHERE) {
                            return new ActionList(data, FUNCTION_WHERE, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_WHERE);
                case FUNCTION_SELECT:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_SELECT) {
                            return new ActionList(data, FUNCTION_SELECT, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_SELECT);
                case FUNCTION_SUM:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_SUM) {
                            return new ActionList(data, FUNCTION_SUM, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_SUM);
                case FUNCTION_FIRST:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_FIRST) {
                            return new ActionList(data, FUNCTION_FIRST, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_FIRST);
                case FUNCTION_DISTINCT:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_DISTINCT) {
                            return new ActionList(data, FUNCTION_DISTINCT, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_DISTINCT);;
                case FUNCTION_COUNT:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_COUNT) {
                            return new ActionList(data, FUNCTION_COUNT, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_COUNT, jsFromServer.action)
                case FUNCTION_FIRSTORDEFAULT:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_FIRSTORDEFAULT) {
                            return new ActionList(data, FUNCTION_FIRSTORDEFAULT, jsFromServer.action)
                        }
                    }
                    return new ActionList(data, FUNCTION_FIRSTORDEFAULT, jsFromServer.action);
                case FUNCTION_ANY:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_ANY) {
                            return new ActionList(data, FUNCTION_ANY, jsFromServer.action)
                        }
                    }
                    return new ActionAny();
                case FUNCTION_EQUAL:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_EQUAL) {
                            return new ActionListComparison(self.selectedFunction().id, jsFromServer.action)
                        }
                    }
                    return new ActionListComparison(self.selectedFunction().id);
                case FUNCTION_NOT_EQUAL:
                    if (hasData) {
                        if (jsFromServer.action.templateName === FUNCTION_EQUAL) {
                            return new ActionListComparison(self.selectedFunction().id, jsFromServer.action)
                        }
                    }
                    return new ActionListComparison(self.selectedFunction().id);
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        if (self.selectedFunction() !== undefined) {
            return self.action().text();
        }
        return "";
    });

}
ActionListOptions.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.listOperations;
    delete copy.classDFlex;
    delete copy.text;
    return copy;
}

function ActionList(data, listOptionId, jsFromServer) {
    const self = this;

    data = getDataWithOutFunctions(data);
    var hasData = false;
    let posSelectedLogicalOperator = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posSelectedLogicalOperator = getObjectByValue(jsFromServer.selectedLogicalOperator, logicalOperators)
    }
    self.templateName = listOptionId;
    self.logicalOperators = ko.observableArray(logicalOperators);
    self.selectedLogicalOperator = ko.observable(logicalOperators[posSelectedLogicalOperator].value);
    self.childrens = ko.observableArray();
    if (hasData) {
        var mapping = {
            'childrens': {
                create: function (options) {
                    /*return new ActionSubLogical(typeof data.childrens != "object" ? data.childrens() : data.childrens, options.data)*/
                    return new ExpressionSelectObjectFromList("", data, options.data)
                }
            },
            'ignore': ['logicalOperators', 'selectedLogicalOperator', 'addFunctionToWhere', 'action', 'addCondition', 'removeChild', 'removeChild']
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }
    self.addFunctionToWhere = ko.observable(hasData ? jsFromServer.addFunctionToWhere : false);
    self.action = ko.computed(function () {
        if (self.addFunctionToWhere) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.action)
            }
            return new ActionListOptions(data);
        }
        return new ActionNone();
    })
    self.addExpression = function () {
        self.childrens.push(new ExpressionSelectObjectFromList("",data))
    }
    self.removeChild = function (child) {
        self.childrens.remove(child);
    };
    self.text = ko.computed(function () {
        let result = `.${listOptionId}(`;
        let op = '';
        for (const child of self.childrens()) {
            result += op + child.text();
            op = ` ${self.selectedLogicalOperator()} `;
        }
        result += ')';
        if (self.addFunctionToWhere()) {
            result += self.action().text()
        }
        return result
    });
}
ActionList.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.logicalOperators;
    delete copy.text;
    return copy;
}

function ActionListWhere(data, jsFromServer) {
    const self = this;
    var hasData = false;
    let posSelectedLogicalOperator = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posSelectedLogicalOperator = getObjectByValue(jsFromServer.selectedLogicalOperator, logicalOperators)
    }
    self.templateName = FUNCTION_WHERE;
    self.logicalOperators = ko.observableArray(logicalOperators);
    self.selectedLogicalOperator = ko.observable(logicalOperators[posSelectedLogicalOperator].value);
    self.childrens = ko.observableArray();
    if (hasData) {
        var mapping = {
            'childrens': {
                create: function (options) {
                    return new ActionSubLogical(typeof data.childrens != "object" ? data.childrens() : data.childrens, options.data)
                }
            },
            'ignore': ['logicalOperators', 'selectedLogicalOperator', 'addFunctionToWhere', 'action', 'addCondition', 'removeChild', 'removeChild']
        }
        ko.mapping.fromJS(jsFromServer, mapping, self)
    }
    self.addFunctionToWhere = ko.observable(hasData ? jsFromServer.addFunctionToWhere : false);
    self.action = ko.computed(function () {
        if (self.addFunctionToWhere) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.action)
            }
            return new ActionListOptions(data);
        }
        return new ActionNone();
    })
    self.addCondition = function () {
        self.childrens.push(new ActionSubLogical(typeof data.childrens != "object" ? data.childrens() : data.childrens));
    }
    self.removeChild = function (child) {
        self.childrens.remove(child);
    };
    self.text = ko.computed(function () {
        let result = '.Where(';
        let op = '';
        for (const child of self.childrens()) {
            result += op + child.text();
            op = ` ${self.selectedLogicalOperator()} `;
        }
        result += ')';
        if (self.addFunctionToWhere()) {
            result += self.action().text()
        }
        return result
    });
}
ActionListWhere.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.logicalOperators;
    delete copy.text;
    return copy;
}

function ActionListSelect(data, jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    self.templateName = FUNCTION_SELECT;
    self.addFunctionToSelect = ko.observable(hasData ? jsFromServer.addFunctionToSelect : false);
    self.action = ko.observable(hasData ? new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens, jsFromServer.action) : new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens));
    self.actionToSelect = ko.computed(function () {
        if (self.addFunctionToSelect()) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.actionToSelect)
            }
            return new ActionListOptions(data)
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        let result = `.Select(${self.action().text()})`
        if (self.addFunctionToSelect()) {
            result += self.actionToSelect().text()
        }
        return result
    });
}
ActionListSelect.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function ActionListFirst(data, jsFromServer) {
    const self = this;
    var hasData = false;
    var posOptionSelected = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.mapping.toJS(data.childrens));
    }
    self.templateName = FUNCTION_FIRST;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable(data.childrens[posOptionSelected]);
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(hasData ? jsFromServer.addProperty : false)
    self.addFunctionToDistinct = ko.observable(hasData ? jsFromServer.addFunctionToDistinct : false);
    self.actionForFunctionToDistinct = ko.computed(function () {
        if (self.addFunctionToDistinct()) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.actionForFunctionToDistinct)
            }
            return new ActionListOptions(data)
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            const dataType = self.optionSelected().dataType;
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.optionSelected().dataType, jsFromServer.action);
                }
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST) {
                if (hasData) {
                    return new ActionListOptions(self.optionSelected(), jsFromServer.action);
                }
                return new ActionListOptions(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".First()";

        if (self.optionSelected()) {
            text += `.${self.optionSelected().id}${self.action().text()}`;
        }
        return text;
    });
}
ActionListFirst.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.text;
    return copy;
}

function ActionListSum(data, jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    self.templateName = FUNCTION_SUM;
    self.addFunctionToSelect = ko.observable(hasData ? jsFromServer.addFunctionToSelect : false);
    self.action = ko.observable(hasData ? new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens, jsFromServer.action) : new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens));
    self.actionToSelect = ko.computed(function () {
        if (self.addFunctionToSelect()) {
            if (hasData) {
                return new ActionListOptions(data, jsonFromServer.actionToSelect);
            }
            return new ActionListOptions(data);
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        let result = `.Sum(${self.action().text()})`;
        if (self.addFunctionToSelect()) {
            result += self.actionToSelect().text()
        }
        return result
    });
}
ActionListSum.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function ActionListFirstOrDefault(data, jsFromServer) {
    const self = this;
    var hasData = false;
    var posOptionSelected = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.mapping.toJS(data.childrens));
    }
    self.templateName = FUNCTION_FIRSTORDEFAULT;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable(data.childrens[posOptionSelected]);
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(hasData ? jsFromServer.addProperty : false)
    self.addFunctionToDistinct = ko.observable(hasData ? jsFromServer.addFunctionToDistinct : false);
    self.actionForFunctionToDistinct = ko.computed(function () {
        if (self.addFunctionToDistinct()) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.actionForFunctionToDistinct)
            }
            return new ActionListOptions(data)
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            const dataType = self.optionSelected().dataType;
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.optionSelected().dataType, jsFromServer.action);
                }
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST) {
                if (hasData) {
                    return new ActionListOptions(self.optionSelected(), jsFromServer.action);
                }
                return new ActionListOptions(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".FirstOrDefault()";

        if (self.optionSelected()) {
            text += `.${self.optionSelected().id}${self.action().text()}`;
        }
        return text;
    });
}
ActionListFirstOrDefault.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.text;
    return copy;
}

function ActionListDistinct(data, jsFromServer) {
    const self = this;
    var hasData = false;
    var posOptionSelected = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.mapping.toJS(data.childrens));
    }
    self.templateName = FUNCTION_DISTINCT;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable(data.childrens[posOptionSelected]);
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(hasData ? jsFromServer.addProperty : false)
    self.addFunctionToDistinct = ko.observable(hasData ? jsFromServer.addFunctionToDistinct : false);
    self.actionForFunctionToDistinct = ko.computed(function () {
        if (self.addFunctionToDistinct()) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.actionForFunctionToDistinct)
            }
            return new ActionListOptions(data)
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            const dataType = self.optionSelected().dataType;
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.optionSelected().dataType, jsFromServer.action);
                }
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST) {
                if (hasData) {
                    return new ActionListOptions(self.optionSelected(), jsFromServer.action);
                }
                return new ActionListOptions(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".Distinct()";

        if (self.optionSelected()) {
            text += `.${self.optionSelected().id}${self.action().text()}`;
        }
        return text;
    });
}
ActionListDistinct.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.text;
    return copy;
}

function ActionListCount(data, jsFromServer) {
    const self = this;
    var hasData = false;
    var posOptionSelected = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posOptionSelected = getObjectById(jsFromServer.optionSelected, ko.mapping.toJS(data.childrens));
    }
    self.templateName = FUNCTION_COUNT;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable(data.childrens[posOptionSelected]);
    self.addComparison = ko.observable(hasData ? jsFromServer.addComparison : false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(hasData ? jsFromServer.addProperty : false)
    self.addFunctionToDistinct = ko.observable(hasData ? jsFromServer.addFunctionToDistinct : false);
    self.actionForFunctionToDistinct = ko.computed(function () {
        if (self.addFunctionToDistinct()) {
            if (hasData) {
                return new ActionListOptions(data, jsFromServer.actionForFunctionToDistinct)
            }
            return new ActionListOptions(data)
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            const dataType = self.optionSelected().dataType;
            if ((dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) && self.addComparison()) {
                if (hasData) {
                    return new ActionLogical(self.optionSelected().dataType, jsFromServer.action);
                }
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST) {
                if (hasData) {
                    return new ActionListOptions(self.optionSelected(), jsFromServer.action);
                }
                return new ActionListOptions(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".Count()";

        if (self.optionSelected()) {
            text += `.${self.optionSelected().id}${self.action().text()}`;
        }
        return text;
    });
}
ActionListCount.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.childrens;
    delete copy.text;
    return copy;
}

function ActionListComparison(comparison, jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    self.templateName = FUNCTION_EQUAL;
    self.action = ko.observable(hasData ? new SelectVariableType(jsFromServer) : new SelectVariableType())
    self.text = ko.computed(function () {
        return `${comparison} ${self.action().text()}`;
    });
}
ActionListComparison.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function ActionAny(jsFromServer) {
    const self = this;
    var hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
    }
    self.operatorTernary = ko.observable(hasData ? jsFromServer.operatorTernary : false);
    self.actionTrue = ko.observable(hasData ? new SelectVariableType(jsFromServer.actionTrue) : new SelectVariableType());
    self.actionFalse = ko.observable(hasData ? new SelectVariableType(jsFromServer.actionFalse) : new SelectVariableType());
    self.text = ko.computed(function () {
        if (self.operatorTernary()) {
            return `.Any() ? ${self.actionTrue().text()} : ${self.actionFalse().text()}`;
        }
        return ".Any()";
    });
}
ActionAny.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function SelectVariableType(jsFromServer) {
    const self = this;
    let posFunction = 0;
    let posVariableType = 0;
    const variableType = [
        { name: "Ingresar valor", id: "value" },
        { name: "Ingresar expresi\u00F3n", id: "expression" }
    ];

    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        if (jsFromServer.hasOwnProperty('listFunctionConvertConcat')) {
            posFunction = getObjectById(jsFromServer.selectedFunction, listFunctionConvertConcat)
        }
        posVariableType = getObjectById(jsFromServer.selectedVariable, variableType)
    }
    self.templatesName = 'select-variable-type-template'
    self.addFunctionToExpression = ko.observable(hasData ? jsFromServer.addFunctionToExpression : false);
    self.functions = ko.observableArray(listFunctionConvert);
    self.selectedFunction = ko.observable(listFunctionConvert[posFunction]);
    self.variableTypes = ko.observableArray(variableType);
    self.selectedVariable = ko.observable(variableType[posVariableType]);

    self.action = ko.computed(function () {
        if (self.selectedVariable()) {
            if (self.selectedVariable().id === "value") {
                if (hasData) {
                    return new InputValue(jsFromServer.action)
                }
                return new InputValue()
            }
            if (self.selectedVariable().id === "expression") {
                if (hasData) {
                    return new Expression("", jsFromServer.action)
                }
                return new Expression()
                //return new Filter(dataGlobal)
            }
        }
        return new ActionNone();
    })
    //ko.mapping.fromJS(jsFromServer, {}, self);
    self.text = ko.computed(function () {
        if (self.selectedVariable() !== undefined) {
            if (self.selectedFunction() && self.addFunctionToExpression()) {
                return self.selectedFunction().id + "(" + self.action().text() + ")"
            } else {
                return self.action().text();
            }
        }
        return "";
    })
}
SelectVariableType.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.functions;
    delete copy.variableTypes;
    delete copy.text;
    return copy;
}

function SelectVariableTypeSimple(jsFromServer) {
    const self = this;
    const variableType = [
        { name: "Ingresar valor", id: "value" },
        { name: "Seleccionar propiedad", id: "property" }
    ]
    let posVariableType = 0;
    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true;
        posVariableType = getObjectById(jsFromServer.selectedVariable, variableType)
    }
    self.variableTypes = ko.observableArray(variableType);
    self.selectedVariable = ko.observable(variableType[posVariableType]);
    self.action = ko.computed(function () {
        if (self.selectedVariable()) {
            if (self.selectedVariable().id === "value") {
                if (hasData) {
                    if (jsFromServer.selectedVariable.id === "value") {
                        return new InputValue(jsFromServer.action)
                    }
                }
                return new InputValue()
            }
            if (self.selectedVariable().id === "property") {
                if (hasData) {
                    if (jsFromServer.selectedVariable.id === "property") {
                        return new FilterSimpleDomain(jsFromServer.action)
                    }
                }
                return new FilterSimpleDomain()
                //return new Filter(dataGlobal)
            }
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        if (self.selectedVariable() !== undefined) {
            return self.action().text();
        }
        return "";
    })
}
SelectVariableTypeSimple.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.variableTypes;
    delete copy.text;
    return copy;
}

function InputValue(jsFromServer) {
    const self = this;
    let hasData = false;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
    }
    self.textInput = ko.observable(hasData ? jsFromServer.textInput : "")
    self.addQuotes = ko.observable(hasData ? jsFromServer.addQuotes : false);
    self.text = ko.computed(function () {
        if (self.addQuotes()) {
            return `"${self.textInput()}"`;
        }
        return self.textInput();
    })
}
InputValue.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.text;
    return copy;
}

function ActionSubLogical(data, jsFromServer) {
    const self = this;
    var hasData = false;
    var posSelectedOption = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        hasData = true
        posSelectedOption = getObjectById(jsFromServer.selectedOption, ko.mapping.toJS(data))
    }
    self.options = ko.observableArray(data)
    self.selectedOption = ko.observable(data[posSelectedOption]);
    self.addFunctionToPrimitive = ko.observable(hasData ? jsFromServer.addFunctionToPrimitive : false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            if (hasData) {
                return new ActionForPrimitive(jsFromServer.actionPrimitive)
            }
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.selectedOption()) {
            const dataType = typeof self.selectedOption().dataType != "string" ? self.selectedOption().dataType() : self.selectedOption().dataType;
            if (dataType === DATA_TYPE_STRING || dataType === DATA_TYPE_NUMERIC || dataType === DATA_TYPE_DATETIME) {
                if (hasData) {
                    return new ActionLogical(dataType, jsFromServer.action);
                }
                return new ActionLogical(dataType);
            }
            if (dataType === DATA_TYPE_BOOLEAN) {
                if (hasData) {
                    return new ActionBoolean(jsFromServer.action);
                }
                return new ActionBoolean();
            }
            if (dataType === DATA_TYPE_LIST) {
                if (hasData) {
                    return new ActionListOptions(self.selectedOption(), jsFromServer.action);
                }
                return new ActionListOptions(self.selectedOption());
            }
        }
        return new ActionNone()
    });
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            const id = typeof self.selectedOption().id != 'string' ? self.selectedOption().id() : self.selectedOption().id;
            return id + self.actionPrimitive().text() + self.action().text();
        }
        return '';
    });
}
ActionSubLogical.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.options;
    delete copy.text;
    return copy;
}

function ActionForPrimitive(jsFromServer) {
    const self = this;
    var posSelectedOption = 0;
    if (jsFromServer !== "" && jsFromServer !== null && jsFromServer !== undefined) {
        posSelectedOption = getObjectById(jsFromServer.selectedOption, listFunctionConvertConcat)
    }
    self.options = ko.observableArray(listFunctionConvertConcat);
    self.selectedOption = ko.observable(listFunctionConvertConcat[posSelectedOption])
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return "." + self.selectedOption().id;
        }
        return ""
    })

}
ActionForPrimitive.prototype.toJSON = function () {
    var copy = ko.toJS(this);
    delete copy.options;
    delete copy.text;
    return copy;
}

function getOperation(operation) {
    const position = operators.map(o => o.value).indexOf(operation.value)
    if (position !== -1) {
        return position
    }
    return 0
}

function getObjectById(object, objectsArray) {
    const position = objectsArray.map(o => o.id).indexOf(object.id)
    if (position !== -1) {
        return position
    }
    return 0
}

function getObjectByIdValue(id, objectsArray) {
    const position = objectsArray.map(o => o.id).indexOf(id)
    if (position !== -1) {
        return position
    }
    return 0
}

function getObjectByValue(value, objectsArray) {
    const position = objectsArray.map(o => o.value).indexOf(value)
    if (position !== -1) {
        return position
    }
    return 0
}
//funcion para obtener los operadores por el dataType
function getOperators(dataType) {
    const result = []
    for (const operator of operators) {
        if (operator.applyTo.indexOf(dataType) == -1) {
            continue;
        }
        result.push(operator);
    }
    return result;
}

function getDataWithOutFunctions(data) {

    const name = typeof data.name != "string" ? data.name() : data.name;
    const id = typeof data.id != "string" ? data.id() : data.id;
    const dataType = typeof data.dataType != "string" ? data.dataType() : data.dataType;
    const childrens = typeof data.childrens != "object" ? data.childrens().map(function (children) {
        return getDataWithOutFunctions(children);
    }) : data.childrens.map(function (children) {
        return getDataWithOutFunctions(children);
    });
    return {
        name: name,
        id: id,
        dataType: dataType,
        childrens: childrens
    };
}

function ActionNone() {
    const self = this;
    self.text = ko.observable("");
}

function Operator(name, value, applyTo) {
    this.name = name;
    this.value = value;
    this.applyTo = applyTo;
}

function Property(name, value, childrens, dataType) {
    const self = this;
    self.name = name;
    self.id = value;
    self.childrens = childrens;
    self.dataType = dataType;
}

function LogicalOperator(name, value) {
    this.name = name;
    this.value = value;
}

function addProperties(data) {
    const dataClean = getDataWithOutFunctions(data)
    addedProperties = dataClean.childrens;
}
function removeProperties() {
    addedProperties = [];
}

function ViewModel(data, localParams, jsonFromServer) {
    const self = this;
    let jsObjectFromServer = {};
    if (jsonFromServer !== undefined && jsonFromServer !== null && jsonFromServer !== "") {
        jsObjectFromServer = JSON.parse(jsonFromServer);
    }
    dataGlobal = data;
    localParamsGlobal = localParams;
    self.group = ko.observable(new Group("", jsObjectFromServer.group));

    // the text() function is just an example to show output
    self.text = ko.computed(function () {
        return self.group().text();
    });
}
ViewModel.prototype.toJSON = function (){
    var copy = ko.toJS(this); 
    delete copy.text; 
    return copy; 
}