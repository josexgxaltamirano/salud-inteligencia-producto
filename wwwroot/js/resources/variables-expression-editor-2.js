const dataPlan =
{
    name: "plan",
    id: "plan",
    dataType: "object",
    childrens: [
        {
            name: "deducibles",
            id: "deducibles",
            dataType: 'list',
            childrens: [
                {
                    name: "codigoTipoDeducible",
                    id: "codigoTipoDeducible",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoGrupoTipoBeneficio",
                    id: "codigoGrupoTipoBeneficio",
                    dataType: 'string',
                    childrens: []
                },
                {
                    name: "montoDeducible",
                    id: "montoDeducible",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "personasFamilia",
                    id: "personasFamilia",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "tipoBeneficio",
                    id: "tipoBeneficio",
                    dataType: "list",
                    childrens: [
                        {
                            name: "codigo",
                            id: "codigo",
                            dataType: "string",
                            childrens: []
                        }
                    ]
                }

            ]
        },
        {
            name: "maximos",
            id: "codigo",
            dataType: "list",
            childrens: [
                {
                    name: "monto",
                    id: "monto",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "codigoTipoMaximo",
                    id: "codigoTipoMaximo",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoAgrupacionTipoBeneficio",
                    id: "codigoAgrupacionTipoBeneficio",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "tiposBeneficio",
                    id: "tiposBeneficio",
                    dataType: "list",
                    childrens: [
                        {
                            name: "codigo",
                            id: "codigo",
                            dataType: "string",
                            childrens: []
                        }
                    ]
                }
            ]
        },
        {
            name: "servicios",
            id: "servicios",
            dataType: "list",
            childrens: [
                {
                    name: "serviciosublimite",
                    id: "serviciosublimite",
                    dataType: "list",
                    childrens: [
                        {
                            name: "codigotipobeneficio",
                            id: "codigotipobeneficio",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "carenciadesde",
                            id: "carenciadesde",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "carenciahasta",
                            id: "carenciahasta",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "codigoCarenciaUnidad",
                            id: "codigoCarenciaUnidad",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "subLimite",
                            id: "subLimite",
                            dataType: "numeric",
                            childrens: []
                        },
                    ]
                },
                {
                    name: "beneficios",
                    id: "beneficios",
                    dataType: "list",
                    childrens: [
                        {
                            name: "procedimientos",
                            id: "procedimientos",
                            dataType: "list",
                            childrens: [
                                {
                                    name: "codigo",
                                    id: "codigo",
                                    dataType: "string",
                                    childrens: []
                                }
                            ]
                        },
                        {
                            name: "codigo",
                            id: "codigo",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "limitesBeneficio",
                            id: "limitesBeneficio",
                            dataType: "list",
                            childrens: [
                                {
                                    name: "codigoGrupoTipoBeneficio",
                                    id: "codigoGrupoTipoBeneficio",
                                    dataType: "string",
                                    childrens: []
                                },
                                {
                                    name: "tiposBeneficio",
                                    id: "tiposBeneficio",
                                    dataType: "list",
                                    childrens: [
                                        {
                                            name: "codigo",
                                            id: "codigo",
                                            dataType: "string",
                                            childrens: []
                                        }
                                    ]
                                },
                                {
                                    name: "cantidad",
                                    id: "cantidad",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "monto",
                                    id: "monto",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "cantidadExceso",
                                    id: "cantidadExceso",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "montoExceso",
                                    id: "montoExceso",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "topaProcedimiento",
                                    id: "topaProcedimiento",
                                    dataType: "boolean",
                                    childrens: []
                                },
                                {
                                    name: "valorProcedimiento",
                                    id: "valorProcedimiento",
                                    dataType: "numeric",
                                    childrens: []
                                }
                            ]
                        },
                        {
                            name: "tipoBeneficioSubRed",
                            id: "tipoBeneficioSubRed",
                            dataType: "list",
                            childrens: [
                                {
                                    name: "codigoGrupoTipoBeneficio",
                                    id: "codigoGrupoTipoBeneficio",
                                    dataType: "string",
                                    childrens: []
                                },
                                {
                                    name: "codigoGrupoBeneficioRed",
                                    id: "codigoGrupoBeneficioRed",
                                    dataType: "string",
                                    childrens: []
                                },
                                {
                                    name: "porcentajeCobertura",
                                    id: "porcentajeCobertura",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "porcentajeExceso",
                                    id: "porcentajeExceso",
                                    dataType: "numeric",
                                    childrens: []
                                },
                                {
                                    name: "tiposBeneficio",
                                    id: "tiposBeneficio",
                                    dataType: "list",
                                    childrens: [
                                        {
                                            name: "codigo",
                                            id: "codigo",
                                            dataType: "string",
                                            childrens: []
                                        }
                                    ]
                                },
                                {
                                    name: "subredes",
                                    id: "subredes",
                                    dataType: "list",
                                    childrens: [
                                        {
                                            name: "codigo",
                                            id: "codigo",
                                            dataType: "string",
                                            childrens: []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "codigoGrupoTarifa",
                            id: "carenciaReclamo",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "carenciaBeneficioDesde",
                            id: "carenciaBeneficioDesde",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "carenciaBeneficioHasta",
                            id: "carenciaBeneficioHasta",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "codigoUnidadCarenciaBeneficio",
                            id: "codigoUnidadCarenciaBeneficio",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "carenciaReclamo",
                            id: "carenciaReclamo",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "codigoUnidadCarenciaReclamo",
                            id: "codigoUnidadCarenciaReclamo",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "alcanceDesde",
                            id: "alcanceDesde",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "alcanceHasta",
                            id: "alcanceHasta",
                            dataType: "numeric",
                            childrens: []
                        },
                        {
                            name: "codigoUnidadAlcance",
                            id: "codigoUnidadAlcance",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "codigoFrecuenciaLimite",
                            id: "codigoFrecuenciaLimite",
                            dataType: "string",
                            childrens: []
                        },
                        {
                            name: "aplicaDeducibleExceso",
                            id: "aplicaDeducibleExceso",
                            dataType: "boolean",
                            childrens: []
                        },
                        {
                            name: "aplicaDeducible",
                            id: "aplicaDeducible",
                            dataType: "boolean",
                            childrens: []
                        }
                    ]
                },
                {
                    name: "tiposBeneficio",
                    id: "tiposBeneficio",
                    dataType: "list",
                    childrens: [
                        {
                            name: "codigo",
                            id: "codigo",
                            dataType: "string",
                            childrens: []
                        },
                    ]
                },
                {
                    name: "limite",
                    id: "limite",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "codigoTipoLimite",
                    id: "codigoTipoLimite",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoFrecuenciaLimite",
                    id: "codigoFrecuenciaLimite",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoGrupoTipoBeneficio",
                    id: "codigoGrupoTipoBeneficio",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "maximo",
                    id: "maximo",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "codigo",
                    id: "codigo",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoTipoServicio",
                    id: "codigoTipoServicio",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoTipoCalculo",
                    id: "codigoTipoCalculo",
                    dataType: "string",
                    childrens: []
                }
            ]
        },
        {
            name: "id",
            id: "id",
            dataType: 'string',
            childrens: []
        },
        {
            name: "codigoPlan",
            id: "codigoPlan",
            dataType: 'string',
            childrens: []
        },
        {
            name: "nivel",
            id: "nivel",
            dataType: 'string',
            childrens: []
        },
        {
            name: "montoCoaseguro",
            id: "montoCoaseguro",
            dataType: 'numeric',
            childrens: []
        },
        {
            name: "porcentajeCoaseguro",
            id: "porcentajeCoaseguro",
            dataType: 'numeric',
            childrens: []
        },
        {
            name: "cubreCongenita",
            id: "cubreCongenita",
            dataType: 'boolean',
            childrens: []
        },
        {
            name: "cubrePreexistencia",
            id: "cubrePreexistencia",
            dataType: 'boolean',
            childrens: []
        },
        {
            name: "edadFacturacion",
            id: "edadFacturacion",
            dataType: 'numeric',
            childrens: []
        },
        {
            name: "nuevoBeneficioMaternidad",
            id: "nuevoBeneficioMaternidad",
            dataType: 'boolean',
            childrens: []
        },
        {
            name: "codigoSuperPlan",
            id: "codigoSuperPlan",
            dataType: 'string',
            childrens: []
        },
        {
            name: "codigoProducto",
            id: "codigoProducto",
            dataType: 'string',
            childrens: []
        },
        {
            name: "codigoRegion",
            id: "codigoRegion",
            dataType: 'string',
            childrens: []
        },
    ]
}

const dataUser =
{
    name: "usuario",
    id: "usuario",
    dataType: "object",
    childrens: [
        {
            name: "codigoPlan",
            id: "codigoPlan",
            dataType: "string",
            childrens: []
        },
        {
            name: "fechaIncurrencia",
            id: "fechaIncurrencia",
            dataType: "dateTime",
            childrens: []
        },
        {
            name: "fechaReclamo",
            id: "fechaReclamo",
            dataType: "dateTime",
            childrens: []
        },
        {
            name: "fechaInicioBeneficio",
            id: "fechaInicioBeneficio",
            dataType: "dateTime",
            childrens: []
        },
        {
            name: "version",
            id: "version",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "codigoBeneficio",
            id: "codigoBeneficio",
            dataType: "string",
            childrens: []
        },
        {
            name: "codigoServicio",
            id: "codigoServicio",
            dataType: "string",
            childrens: []
        },
        {
            name: "codigoTipoBeneficio",
            id: "codigoTipoBeneficio",
            dataType: "string",
            childrens: []
        },
        {
            name: "esPreexistencia",
            id: "esPreexistencia",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "codigoProcedimiento",
            id: "codigoProcedimiento",
            dataType: "string",
            childrens: []
        },
        {
            name: "estadoConvenio",
            id: "estadoConvenio",
            dataType: "string",
            childrens: []
        },
        {
            name: "tipoConvenio",
            id: "tipoConvenio",
            dataType: "string",
            childrens: []
        },
        {
            name: "tieneNegociacion",
            id: "tieneNegociacion",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "porcentajeConvenio",
            id: "porcentajeConvenio",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "codigoGrupoTipoBeneficio",
            id: "codigoGrupoTipoBeneficio",
            dataType: "string",
            childrens: []
        },
        {
            name: "aplicaDeducible",
            id: "aplicaDeducible",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "esCoordinacionBeneficios",
            id: "esCoordinacionBeneficios",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "aplicaDeducibleNegociacion",
            id: "aplicaDeducibleNegociacion",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "tieneExceso",
            id: "tieneExceso",
            dataType: "boolean",
            childrens: []
        },
        {
            name: "codigoDiagnostico",
            id: "codigoDiagnostico",
            dataType: "string",
            childrens: []
        },
        {
            name: "idPersona",
            id: "idPersona",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "historicoLiquidaciones",
            id: "historicoLiquidaciones",
            dataType: "list",
            childrens: [
                {
                    name: "codigoDiagnostico",
                    id: "codigoDiagnostico",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "montoCubiertoDeducible",
                    id: "montoCubiertoDeducible",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "idPersona",
                    id: "idPersona",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "codigoServicio",
                    id: "codigoServicio",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "codigoBeneficio",
                    id: "codigoBeneficio",
                    dataType: "string",
                    childrens: []
                },
                {
                    name: "cantidadBonificada",
                    id: "cantidadBonificada",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "valorCubierto",
                    id: "valorCubierto",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "valorBonificado",
                    id: "valorBonificado",
                    dataType: "numeric",
                    childrens: []
                },
                {
                    name: "numeroReclamo",
                    id: "numeroReclamo",
                    dataType: "numeric",
                    childrens: []
                }
            ]
        },
        {
            name: "valorArancel",
            id: "valorArancel",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "cantidadPresentada",
            id: "cantidadPresentada",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "valorPresentado",
            id: "valorPresentado",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "valorCubierto",
            id: "valorCubierto",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "codigoCondicionParticular",
            id: "codigoCondicionParticular",
            dataType: "string",
            childrens: []
        },
        {
            name: "deduciblePorPagar",
            id: "deduciblePorPagar",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "porcentajeCobertura",
            id: "porcentajeCobertura",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "valorBonificado",
            id: "valorBonificado",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "valorCopago",
            id: "valorCopago",
            dataType: "numeric",
            childrens: []
        },
        {
            name: "numeroReclamo",
            id: "numeroReclamo",
            dataType: "numeric",
            childrens: []
        }
    ]
}


const dataGlobalParams = {
    name: "Parametros Globales",
    id: "globalParams",
    dataType: "object",
    expression: "",
    description: "",
    dependensOn: [],
    childrens: [
        {
            name: "servicio",
            id: "servicio",
            dataType: "object",
            expression: "parametros.plan.servicios.Any(codigo==parametros.usuario.codigoServicio && tiposBeneficio.Count()>1 && tiposBeneficio.Any(codigo==parametros.usuario.codigoTipoBeneficio))? parametros.plan.servicios.FirstOrDefault(codigo==parametros.usuario.codigoServicio && tiposBeneficio.Count()>1 && tiposBeneficio.Any(codigo==parametros.usuario.codigoTipoBeneficio)) : parametros.plan.servicios.FirstOrDefault(codigo==parametros.usuario.codigoServicio && tiposBeneficio.Any(codigo==parametros.usuario.codigoTipoBeneficio))",
            description: "Obtiene el servicio que coincida con el Servicio y el tipo de Beneficio ingresados por el usuario",
            dependensOn: [],
            childrens: []
        },
        {
            name: "diasCarenciaReclamo",
            id: "numeric",
            dataType: "object",
            expression: "(parametros.usuario.fechaIncurrencia - parametros.usuario.fechaInclusionBeneficiario).TotalDays>=0?(parametros.usuario.fechaIncurrencia - parametros.usuario.fechaInclusionBeneficiario).TotalDays:-1",
            description: "Para obtener los dias de carencia de reclamo",
            dependensOn: [],
            childrens: []
        },
        {
            name: "diasPresentacionReclamo",
            id: "diasPresentacionReclamo",
            dataType: "numeric",
            expression: "(parametros.usuario.fechaPresentacionReclamo - parametros.usuario.fechaIncurrencia).TotalDays>=0?(parametros.usuario.fechaPresentacionReclamo - parametros.usuario.fechaIncurrencia).TotalDays:-1",
            description: "Para obtener los dias de presentación de reclamo del plan",
            dependensOn: [],
            childrens: []
        },
        {
            name: "beneficio",
            id: "beneficio",
            dataType: "object",
            expression: "np(servicio.beneficios.FirstOrDefault(codigo==parametros.usuario.codigoBeneficio))",
            description: "Para obtener el beneficio que coincida con el código de beneficio ingresado por el usuario",
            dependensOn: [],
            childrens: []
        },
        {
            name: "procedimiento",
            id: "procedimiento",
            dataType: "object",
            expression: "np(beneficio.procedimientos.FirstOrDefault(codigo==parametros.usuario.codigoProcedimiento))",
            description: "Para obtener el procedimiento que coincida con el código de procedimiento ingresado por el usuario",
            dependensOn: [],
            childrens: []
        },
        {
            name: "carenciaReclamoBeneficio",
            id: "carenciaReclamoBeneficio",
            dataType: "boolean",
            expression: "np(beneficio.carenciaReclamo)",
            description: "Para sabe si el beneficio tiene carencia para realizar el reclamo",
            dependensOn: [],
            childrens: []
        }
    ]
}
const operators = {
    name: "Operadores",
    id: "operadores",
    isAddable: false,
    addBlankSpace: false,
    context: ["localParams", "ruleExpression", "outputExpression"],
    help: {
        title: "Es un titulo",
        description: "Es una descripción",
        example: "Es un ejemplo"
    },
    childrens: [
        {
            name: "Operadores Lógicos",
            id: "operadoresLogicos",
            isAddable: false,
            addBlankSpace: false,
            context: ["localParams", "ruleExpression", "outputExpression"],
            help: {
                title: "dsada",
                description: "dsadsa",
                example: "dsadasdasda"
            },
            childrens: [
                {
                    name: 'Producto lógico "AND"',
                    id: "&&",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "Es un titulo",
                        description: "Es una descripción",
                        example: "Es un ejemplo"
                    },
                    childrens: []
                },
                {
                    name: 'Suma lógica "OR"',
                    id: "||",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    childrens: []
                },
                {
                    name: "Es igual",
                    id: "==",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "No es igual",
                    id: "!=",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Es mayor",
                    id: ">",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Es menor",
                    id: "<",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Es mayor o igual que",
                    id: ">=",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Es menor o igual que",
                    id: "<=",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Negación",
                    id: "!",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Propagación Nula "np"',
                    id: "np",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["localParams"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Operador condicional ternario "?"',
                    id: "?",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Separador condicional ternario ":"',
                    id: ":",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["localParams"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
            ]
        },
        {
            name: "Funciones para Listas",
            id: "funcionesListas",
            isAddable: false,
            addBlankSpace: false,
            help: {
                title: "dsada",
                description: "dsadsa",
                example: "dsadasdasda"
            },
            context: ["ruleExpression", "outputExpression"],           
            childrens: [
                {
                    name: "Incluye (Where)",
                    id: "Where()",
                    isAddable: true,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Seleccionar (Select)",
                    id: "Select()",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Sumar (Sum)",
                    id: "Sum()",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Eliminar Duplicados (Distinct)",
                    id: "Distinct",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Contabilizar Registros (Count)",
                    id: "Count",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Primer registro (First)",
                    id: "First",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Primer registro o por defecto (FirstOrDefault)",
                    id: "FirstOrDefault",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Cualquier registro cumple la condición (Any)",
                    id: "Any()",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                }
            ]
        },
        {
            name: 'Funciones para Objetos',
            id: "funcionesObjetos",
            isAddable: false,
            addBlankSpace: false,
            context: ["localParams", "ruleExpression", "outputExpression"],
            help: {
                title: "Es un titulo",
                description: "Es una descripción",
                example: "Es un ejemplo"
            },
            childrens: [
                {
                    name: 'Obtener Total de días "TotalDays"',
                    id: "TotalDays()",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Convertir en minúsculas',
                    id: "ToLower()",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Convertir en entero "ToInt32"',
                    id: "Convert.ToInt32(",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Convertir en decimal "ToDouble"',
                    id: "Convert.ToDouble(",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["localParams", "ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
            ]
        },
        {
            name: "Agrupadores",
            id: "agrupadores",
            isAddable: false,
            addBlankSpace: false,
            context: ["ruleExpression", "outputExpression"],
            help: {
                title: "dsada",
                description: "dsadsa",
                example: "dsadasdasda"
            },
            childrens: [
                {
                    name: 'Concatenar "."',
                    id: ".",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Abrir agrupador "("',
                    id: "(",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: 'Cerrar agrupador ")"',
                    id: ")",
                    isAddable: true,
                    addBlankSpace: false,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                }
            ]
        },
        {
            name: "Operaciones",
            id: "operaciones",
            isAddable: false,
            addBlankSpace: false,
            context: ["ruleExpression", "outputExpression"],
            help: {
                title: "dsada",
                description: "dsadsa",
                example: "dsadasdasda"
            },
            childrens: [
                {
                    name: "Suma",
                    id: "+",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Resta",
                    id: "-",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "Multiplicación",
                    id: "*",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
                {
                    name: "División",
                    id: "/",
                    isAddable: true,
                    addBlankSpace: true,
                    context: ["ruleExpression", "outputExpression"],
                    help: {
                        title: "dsada",
                        description: "dsadsa",
                        example: "dsadasdasda"
                    },
                    childrens: []
                },
            ]
        },
    ]
}