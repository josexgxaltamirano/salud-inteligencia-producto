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
    new Operator("Divisi\u00F3n", "/", [DATA_TYPE_NUMERIC]),
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
    {name: "Convertir en entero (ToInt32)", id: "Convert.ToInt32"},
    { name: "Convertir en decimal (ToDouble)", id: "Convert.ToDouble"}
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

function Group(classes) {
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

function ExpressionSelectObject(classes) {
    const self = this;
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.templateName = 'expression-template-object';
    self.childrens = ko.observableArray();

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

function Grouper() {
    const self = this;
    self.templatesName = 'grouper-template';
    self.addFunctionToGrouper = ko.observable(false)
    self.denyGrouper = ko.observable(false)
    self.functions = ko.observableArray(listFunctionConvertConcat)
    self.selectedFunction = ko.observable();
    self.action = ko.observable(new ExpressionSelectObject())
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

function Expression(classes) {
    const self = this;
    self.classes = "";
    if (classes === "" || classes === null) {
        self.classes = classes;
    }
    self.domains = ko.observableArray(domainVariables)
    self.selectedDomain = ko.observable()
    self.templatesName = 'expression-template';
    self.filter = ko.computed(function () {
        if (self.selectedDomain()) {
            if (self.selectedDomain().id === ID_SALUD) {
                return new Filter(dataGlobal)
            }
            if (self.selectedDomain().id === ID_LOCAL_PARAMS) {
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

function ExpressionJsonGrouper() {
    const self = this;
    self.templatesName = 'expression-json-grouper-template';
    self.childrens = ko.observableArray()
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

function ExpressionJsonObject() {
    const self = this;
    self.name = ko.observable("");
    self.expression = ko.observable(new ExpressionSelectObject());

    self.templatesName = "expression-json-object-template"
    self.text = ko.computed(function () {
        return `${self.expression().text()} as ${self.name()}`;
    });
}

function Operation() {
    const self = this;
    self.templatesName = 'operation-template';
    self.options = ko.observableArray(operators)
    self.selectedOption = ko.observable(operators[0])
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return self.selectedOption().value
        }
        return ""
    })
}

function FilterLocalParams(data) {
    const self = this;
    self.childrens = ko.observableArray(data);
    self.selectedOption = ko.observable();
    self.addComparison = ko.observable(false);
    self.addFunctionToPrimitive = ko.observable(false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.addFunctionForList = ko.observable(false)
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    
    self.action = ko.computed(function () {
        if (self.selectedOption()) {
            if (self.selectedOption().dataType == DATA_TYPE_STRING || self.selectedOption().dataType == DATA_TYPE_NUMERIC || self.selectedOption().dataType == DATA_TYPE_DATETIME) {
                return new ActionLogical(self.selectedOption().dataType)
            }
            if (self.selectedOption().dataType == DATA_TYPE_LIST) {
                return new ActionList(self.selectedOption())
            }
        }
        return new ActionNone();
    })
    self.classDFlex = ko.computed(function () {
        if (self.selectedOption()) {
            if (self.selectedOption().dataType == DATA_TYPE_NUMERIC || self.selectedOption().dataType == DATA_TYPE_DATETIME || self.selectedOption().dataType == DATA_TYPE_BOOLEAN || self.selectedOption().dataType == DATA_TYPE_STRING ) {
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


function Filter(data) {
    const self = this;
    self.templateName = 'filter-template';
    self.dataType = ko.observable(data.dataType);
    self.name = ko.observable(data.name);
    self.id = ko.observable(data.id);
    self.childrens = ko.observableArray(ko.utils.arrayMap(data.childrens, function (c) {
        return new Filter(c);
    }));
    self.optionSelected = ko.observable();
    self.showChildren = ko.computed(function () {
        return self.optionSelected() && self.optionSelected().childrens().length > 0;
    });
    self.addComparison = ko.observable(false);
    self.addFunctionToPrimitive = ko.observable(false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.addFunctionForList = ko.observable(false)
    self.addProperties = function () {
        addProperties(self.optionSelected());
    };
    self.action = ko.computed(function () {
        if (self.optionSelected()) {
            if ((self.optionSelected().dataType() == DATA_TYPE_STRING || self.optionSelected().dataType() == DATA_TYPE_NUMERIC || self.optionSelected().dataType() == DATA_TYPE_DATETIME) && self.addComparison()) {
                return new ActionLogical(self.optionSelected().dataType());
            }
            if (self.optionSelected().dataType() == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (self.optionSelected().dataType() == DATA_TYPE_LIST && self.addFunctionForList()) {
                return new ActionList(self.optionSelected());
            }
        }
        return new ActionNone();
    });
    self.classDFlex = ko.computed(function () {
        if (self.optionSelected()) {
            if (self.optionSelected().dataType() == DATA_TYPE_STRING || self.optionSelected().dataType() == DATA_TYPE_NUMERIC || self.optionSelected().dataType() == DATA_TYPE_DATETIME || self.optionSelected().dataType() == DATA_TYPE_BOOLEAN) {
                return CLASS_D_FLEX;
            }
            return "";
        }
        return "";
    });

    self.text = ko.computed(function () {
        let text = self.id();
        if (self.optionSelected() != undefined) {
            text += '.' + self.optionSelected().text() + self.actionPrimitive().text() + self.action().text();
        }
        return text;
    });
}

function FilterSimpleDomain() {
    const self = this;
    self.domains = ko.observableArray(domainVariables)
    self.selectedDomain = ko.observable();
    self.filter = ko.computed(function () {
        if (self.selectedDomain()) {
            if (self.selectedDomain().id == ID_SALUD) {
                return new FilterSimple(dataGlobal)
            }
            if (self.selectedDomain().id == ID_LOCAL_PARAMS) {
                return new FilterLocalParamsSimple(localParamsGlobal)
            }
        }
        return new ActionNone()
    });
    self.text = ko.computed(function () {
        return self.filter().text();
    });
}

function FilterSimple(data) {
    const self = this;
    self.templateName = 'filter-simple-template';
    self.name = ko.observable(data.name);
    self.id = ko.observable(data.id);
    self.childrens = ko.observableArray(ko.utils.arrayMap(data.childrens, function (c) {
        return new FilterSimple(c);
    }));
    self.optionSelected = ko.observable();
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

function FilterLocalParamsSimple(data) {
    const self = this;
    self.childrens = ko.observableArray(data);
    self.selectedOption = ko.observable();
    self.action = ko.computed(function () {
        if (self.selectedOption()) {
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

function ActionLogical(dataType) {
    const self = this;
    self.comparisons = ko.observableArray(getOperators(dataType));
    self.selectedComparison = ko.observable(operators[0].value);
    self.fieldRight = ko.observable(new SelectVariableTypeSimple());
    self.isNull = ko.observable(false);

    self.text = ko.computed(function () {
        if (self.isNull()) {
            return " " + self.selectedComparison() + " " + IS_NULL;
        }
        return " " + self.selectedComparison() + " " + self.fieldRight().text();
    });
}

function ActionBoolean() {
    const self = this;
    self.comparisons = ko.observableArray(getOperators(DATA_TYPE_BOOLEAN));
    self.selectedComparison = ko.observable(operators[0].value);
    self.fieldRight = ko.observableArray(booleanValues);
    self.selectedFieldRight = ko.observable(booleanValues[0].value);

    self.text = ko.computed(function () {
        return " " + self.selectedComparison() + " " + self.selectedFieldRight();
    });
}

function ActionList(data) {
    const self = this;
    self.listOperations = ko.observableArray(listFunctions);
    self.selectedFunction = ko.observable(listFunctions[0].id);
    self.classDFlex = ko.computed(function () {
        if (self.selectedFunction()) {
            if (self.selectedFunction().id == FUNCTION_EQUAL || self.selectedFunction().id == FUNCTION_NOT_EQUAL) {
                return CLASS_D_FLEX
            }
        }
        return ""
    })
    self.action = ko.computed(function () {
        if (self.selectedFunction()) {
            switch (self.selectedFunction().id) {
                case FUNCTION_WHERE:
                    return new ActionListWhere(data);
                case FUNCTION_SELECT:
                    return new ActionListSelect(data);
                case FUNCTION_SUM:
                    return new ActionListSum(data);
                case FUNCTION_FIRST:
                    return new ActionListFirst(getDataWithOutFunctions(data));
                case FUNCTION_DISTINCT:
                    return new ActionListDistinct(getDataWithOutFunctions(data));
                case FUNCTION_COUNT:
                    return new ActionListCount(getDataWithOutFunctions(data));
                case FUNCTION_FIRSTORDEFAULT:
                    return new ActionListFirstOrDefault(getDataWithOutFunctions(data));
                case FUNCTION_ANY:
                    return new ActionAny();
                case FUNCTION_EQUAL:
                    return new ActionListComparison(self.selectedFunction().id);
                case FUNCTION_NOT_EQUAL:
                    return new ActionListComparison(self.selectedFunction().id);
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        if (self.selectedFunction() != undefined) {
            return self.action().text();
        }
        return "";
    });

}

function ActionListWhere(data) {
    const self = this;
    self.logicalOperators = ko.observableArray(logicalOperators);
    self.selectedLogicalOperator = ko.observable(logicalOperators[0].value);
    self.childrens = ko.observableArray();
    self.addFunctionToWhere = ko.observable(false);
    self.action = ko.computed(function () {
        if (self.addFunctionToWhere) {
            return new ActionList(data);
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

function ActionListSelect(data) {
    const self = this;
    self.addFunctionToSelect = ko.observable(false);
    self.action = ko.observable(new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens));
    self.actionToSelect = ko.computed(function () {
        if (self.addFunctionToSelect()) {
            return new ActionList(data)
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        let result = ".Select(" + self.action().text() + ")"
        if (self.addFunctionToSelect()) {
            result += self.actionToSelect().text()
        }
        return result
    });
}

function ActionListFirst(data) {
    const self = this;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable();
    self.addComparison = ko.observable(false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(false)
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            if ((self.optionSelected().dataType == DATA_TYPE_STRING || self.optionSelected().dataType == DATA_TYPE_NUMERIC || self.optionSelected().dataType == DATA_TYPE_DATETIME) && self.addComparison()) {
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (self.optionSelected().dataType == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (self.optionSelected().dataType == DATA_TYPE_LIST) {
                return new ActionList(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".First()";
        
        if (self.optionSelected()) {
            text += "." + self.optionSelected().id + self.action().text();
        }
        return text;
    });
}

function ActionListSum(data) {
    const self = this;
    self.addFunctionToSelect = ko.observable(false);
    self.action = ko.observable(new FilterLocalParamsSimple(getDataWithOutFunctions(data).childrens));
    self.actionToSelect = ko.computed(function () {
        if (self.addFunctionToSelect()) {
            return new ActionList(data)
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        let result = ".Sum(" + self.action().text() + ")"
        if (self.addFunctionToSelect()) {
            result += self.actionToSelect().text()
        }
        return result
    });
}

function ActionListFirstOrDefault(data) {
    const self = this;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable();
    self.addComparison = ko.observable(false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(false)
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            if ((self.optionSelected().dataType == DATA_TYPE_STRING || self.optionSelected().dataType == DATA_TYPE_NUMERIC || self.optionSelected().dataType == DATA_TYPE_DATETIME) && self.addComparison()) {
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (self.optionSelected().dataType == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (self.optionSelected().dataType == DATA_TYPE_LIST) {
                return new ActionList(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".FirstOrDefault()";

        if (self.optionSelected()) {
            text += "." + self.optionSelected().id + self.action().text();
        }
        return text;
    });
}

function ActionListDistinct(data) {
    const self = this;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable();
    self.addComparison = ko.observable(false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(false)
    self.addFunctionToDistinct = ko.observable(false);
    self.actionForFunctionToDistinct = ko.computed(function () {
        if (self.addFunctionToDistinct()) {
            return new ActionList()
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            if ((self.optionSelected().dataType == DATA_TYPE_STRING || self.optionSelected().dataType == DATA_TYPE_NUMERIC || self.optionSelected().dataType == DATA_TYPE_DATETIME) && self.addComparison()) {
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (self.optionSelected().dataType == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (self.optionSelected().dataType == DATA_TYPE_LIST) {
                return new ActionList(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".Distinct()";

        if (self.optionSelected()) {
            text += "." + self.optionSelected().id + self.action().text();
        }
        return text;
    });
}

function ActionListCount(data) {
    const self = this;
    self.childrens = ko.observableArray(data.childrens);
    self.optionSelected = ko.observable();
    self.addComparison = ko.observable(false);
    self.addProperties = function () {
        addProperties(self.selectedOption());
    };
    self.addProperty = ko.observable(false)
    self.action = ko.computed(function () {
        if (self.optionSelected() && self.addProperty()) {
            if ((self.optionSelected().dataType == DATA_TYPE_STRING || self.optionSelected().dataType == DATA_TYPE_NUMERIC || self.optionSelected().dataType == DATA_TYPE_DATETIME) && self.addComparison()) {
                return new ActionLogical(self.optionSelected().dataType);
            }
            if (self.optionSelected().dataType == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (self.optionSelected().dataType == DATA_TYPE_LIST) {
                return new ActionList(self.optionSelected());
            }
        }
        return new ActionNone();
    });

    self.text = ko.computed(function () {
        let text = ".Count()";

        if (self.optionSelected()) {
            text += "." + self.optionSelected().id + self.action().text();
        }
        return text;
    });
}

function ActionListComparison(comparison) {
    const self = this;
    self.action = ko.observable(new SelectVariableType())
    self.text = ko.computed(function () {
        return comparison + " " + self.action().text();
    });
}

function ActionAny() {
    const self = this;

    self.operatorTernary = ko.observable(false);
    self.actionTrue = ko.observable(new SelectVariableType());
    self.actionFalse = ko.observable(new SelectVariableType());
    self.text = ko.computed(function () {
        if (self.operatorTernary()) {
            return ".Any() ? " + self.actionTrue().text() + " : " + self.actionFalse().text();
        }
        return ".Any()";
    });
}

function SelectVariableType() {
    const self = this;
    self.templatesName = 'select-variable-type-template'
    const variableType = [
        { name: "Ingresar valor", id: "value" },
        { name: "Ingresar expresi\u00F3n", id: "expression" }
    ];
    self.addFunctionToExpression = ko.observable(false);
    self.functions = ko.observableArray(listFunctionConvert);
    self.selectedFunction = ko.observable();
    self.variableTypes = ko.observableArray(variableType);
    self.selectedVariable = ko.observable();
    self.action = ko.computed(function () {
        if (self.selectedVariable()) {
            if (self.selectedVariable().id == "value") {
                return new InputValue()
            }
            if (self.selectedVariable().id == "expression") {
                return new Expression()
                //return new Filter(dataGlobal)
            }
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        if (self.selectedVariable() != undefined) {
            if (self.selectedFunction() && self.addFunctionToExpression() ) {
                return self.selectedFunction().id + "(" + self.action().text() + ")"
            } else {
                return self.action().text();
            }
        }
        return "";
    })
}

function SelectVariableTypeSimple() {
    const self = this;
    const variableType = [
        { name: "Ingresar valor", id: "value" },
        { name: "Seleccionar propiedad", id: "property" }
    ]
    self.variableTypes = ko.observableArray(variableType);
    self.selectedVariable = ko.observable();
    self.action = ko.computed(function () {
        if (self.selectedVariable()) {
            if (self.selectedVariable().id == "value") {
                return new InputValue()
            }
            if (self.selectedVariable().id == "property") {
                return new FilterSimpleDomain()
                //return new Filter(dataGlobal)
            }
        }
        return new ActionNone();
    })
    self.text = ko.computed(function () {
        if (self.selectedVariable() != undefined) {
            return self.action().text();
        }
        return "";
    })
}

function InputValue() {
    const self = this;
    self.textInput = ko.observable("")
    self.addQuotes = ko.observable(false);
    self.text = ko.computed(function () {
        if (self.addQuotes()) {
            return "\"" + self.textInput() + "\"";
        }
        return self.textInput();
    })
}

function ActionSubLogical(data) {
    const self = this;
    self.options = ko.observableArray(data)
    self.selectedOption = ko.observable();
    self.addFunctionToPrimitive = ko.observable(false);
    self.actionPrimitive = ko.computed(function () {
        if (self.addFunctionToPrimitive()) {
            return new ActionForPrimitive();
        }
        return new ActionNone();
    })
    self.action = ko.computed(function () {
        if (self.selectedOption()) {
            const dataType = typeof self.selectedOption().dataType != "string" ? self.selectedOption().dataType() : self.selectedOption().dataType;
            if (dataType == DATA_TYPE_STRING || dataType == DATA_TYPE_NUMERIC || dataType == DATA_TYPE_DATETIME) {
                return new ActionLogical(dataType);
            }
            if (dataType == DATA_TYPE_BOOLEAN) {
                return new ActionBoolean();
            }
            if (dataType == DATA_TYPE_LIST) {
                return new ActionList(self.selectedOption());
            }
            return new ActionNone()
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

function ActionForPrimitive() {
    const self = this;
    self.options = ko.observableArray(listFunctionConvertConcat);
    self.selectedOption = ko.observable()
    self.text = ko.computed(function () {
        if (self.selectedOption()) {
            return "." + self.selectedOption().id;
        }
        return ""
    })

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

    dataGlobal = data;
    localParamsGlobal = localParams;
    self.group = ko.observable(new Group());

    // the text() function is just an example to show output
    self.text = ko.computed(function () {
        return self.group().text();
    });
}