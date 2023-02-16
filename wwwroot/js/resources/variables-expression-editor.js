const data =
{
    name: "Parametros",
    id: "parametros",
    dataType: "object",
    childrens:
        [
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
            },
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
                                        childrens:[]
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
        ]
}