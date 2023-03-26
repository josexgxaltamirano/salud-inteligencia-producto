const modal = new bootstrap.Modal(
  document.getElementById("defaultModalPrimary")
);

const CONTEXT_RULE = "ruleExpression";
const CONTEXT_SUCCESS_EVENT = "successEvent";
const CONTEXT_FAILURE_EVENT = "failureExpression";
const CONTEXT_COMPLEX_RULE = "complex-ruleExpression";
const CONTEXT_COMPLEX_SUCCESS_EVENT = "complex-successExpression";
const CONTEXT_COMPLEX_FAILURE_EVENT = "complex-failureExpression";

const userParametersCode = "INPUT_USR_RULE";
const planParametersCode = "INPUT_USR_PLAN";
const operatorParametersCode = "INPUT_USR_OP";

const idParameters = "parametros";
const idPlanParameter = "plan";
const idUserParameter = "usuario";

let contextEditor = "";
let modalGlobalParamOpen = false;
let dataInputs = [];
let dataGlobal = [];
let dataOperators = [];

let ruleUserOrPlanInputs = [];
let ruleGlobalParams = [];

let responseInputData;
let responseGlobalData;

let newRuleModalInstance = null;

let operatorsRegex = "";
let regexString = "";
let concatenatedData = [];

$(document).ready(function () {
  let modalExpressionRule = document.getElementById("defaultModalPrimary");
  modalExpressionRule.addEventListener("hidden.bs.modal", function () {
    cleanInputsExpression();
  });

  $(".openModalExpressionRule").click(function () {
    contextEditor = $(this)[0].dataset.context;
    ruleUserOrPlanInputs = [];
    ruleGlobalParams = [];
    populateEditorData();
    populateExpressions(contextEditor);
    disableFinalTreeItemClick();
    modal.show();
  });

  $("#openTestRuleModal").click(function () {
    if (!validateExpression()) {
      return;
    }
    let expression = $("#input_expression").val();
    let usedParams = GetUsedParams(dataInputs, dataGlobal, expression);
    let url = "./CreateSimple2?handler=TestData";
    let data = {
      inputs: usedParams.arrayInputUser,
      globalParams: usedParams.arrayGlobalParams,
      expression: expression,
    };
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      headers: {
        RequestVerificationToken: rulesAntiForgeryToken,
      },
      success: function (response) {
        $("#testRuleContent").html(response);
      },
    });
    const testRuleModal = new bootstrap.Modal(
      document.getElementById("testExpressionModal")
    );
    testRuleModal.show();
    //modal.hide();
  });

  //guardar expression de la regla
  $("#saveRuleExpression").click(function (event) {
    if (!validateExpression()) {
      return;
    }
    if (contextEditor === CONTEXT_RULE) {
      $("#RuleData_Expression").val($("#input_expression").val());
    }
    if (contextEditor === CONTEXT_SUCCESS_EVENT) {
      $("#RuleData_OnSuccessExpression").val($("#input_expression").val());
      $("#Rule_RuleData_OnSuccessExpression").val($("#input_expression").val());
    }
    if (contextEditor === CONTEXT_FAILURE_EVENT) {
      $("#RuleData_OnFailureExpression").val($("#input_expression").val());
      $("#Rule_RuleData_OnFailureExpression").val($("#input_expression").val());
    }
    if (contextEditor === CONTEXT_COMPLEX_RULE) {
      $("#ComplexExpression").val($("#input_expression").val());
      actionOnNewRuleModal("show");
    }
    if (contextEditor === CONTEXT_COMPLEX_SUCCESS_EVENT) {
      $("#ComplexOnSuccessExpression").val($("#input_expression").val());
      actionOnNewRuleModal("show");
    }
    if (contextEditor === CONTEXT_COMPLEX_FAILURE_EVENT) {
      $("#ComplexOnFailureExpression").val($("#input_expression").val());
      actionOnNewRuleModal("show");
    }

    modal.hide();
  });
  actionsModals();
  getRegularExpression();
  function disableFinalTreeItemClick() {
    const divs = document.getElementsByClassName("finals");
    for (let i = 0, len = divs.length; i < len; i++) {
      divs[i].addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  }

  function cleanInputsExpression() {
    document.getElementById("expression-title").innerHTML = "";
    document.getElementById("expression-objective").innerHTML = "";
    $("#input_expression").val("");
    $("#searchBarUser").val("");
    $("#searchBarPlan").val("");
  }

  let previousValues = $("#Rule_JsonData").val();
  if (previousValues) {
    getPreviousValues(previousValues);
  }
  function getPreviousValues(values) {
    var previousValueJson = JSON.parse(values);
    previousValueJson.forEach((prev) => {
      if (prev.id.includes("Rule_ChildrenRuleData")) {
        concatenatedData.push(prev);
      } else {
        $(`#${prev.id}`).val(prev.value);
      }
    });
    if (concatenatedData.length > 0) {
      //console.log(concatenatedData)
    }
  }
});

function saveRuleExpression() {
  if (!validateExpression()) {
    return;
  }
  if (contextEditor === CONTEXT_RULE) {
    $("#RuleData_Expression").val($("#input_expression").val());
  }
  if (contextEditor === CONTEXT_SUCCESS_EVENT) {
    $("#RuleData_OnSuccessExpression").val($("#input_expression").val());
  }
  if (contextEditor === CONTEXT_FAILURE_EVENT) {
    $("#RuleData_OnFailureExpression").val($("#input_expression").val());
  }
  if (contextEditor === CONTEXT_COMPLEX_RULE) {
    $("#ComplexExpression").val($("#input_expression").val());
    actionOnNewRuleModal("show");
  }
  if (contextEditor === CONTEXT_COMPLEX_SUCCESS_EVENT) {
    $("#ComplexOnSuccessExpression").val($("#input_expression").val());
    actionOnNewRuleModal("show");
  }
  if (contextEditor === CONTEXT_COMPLEX_FAILURE_EVENT) {
    $("#ComplexOnFailureExpression").val($("#input_expression").val());
    actionOnNewRuleModal("show");
  }
}

function populateEditorData() {
  let url = "./CreateSimple2?handler=PopulateEditorData";
  $.ajax({
    dataType: "JSON",
    type: "GET",
    url: url,
    headers: { RequestVerificationToken: rulesAntiForgeryToken },
  }).done(function (response) {
    let notificationCreate = {
      type: "error",
      message: "No se puede obtener el listado",
      duration: 5000,
      ripple: true,
      dismissible: false,
      position: {
        x: "center",
        y: "top",
      },
    };
    if (response.success) {
      responseInputData = response.message.inputUser;
      responseGlobalData = response.message.globalParams;
      populateOperators(response.message.inputUser);
      populatePlans(response.message.inputUser);
      populateUser(response.message.inputUser);
      populateGlobalParams(response.message.globalParams);
    } else {
      showNotification(notificationCreate);
    }
  });
}

function populateExpressions(contextEditor) {
  let ruleType = $("#Type").val();
  let ruleName = "";
  let ruleDescription = "";
  if (ruleType === "simple") {
    ruleName = $("#Name").val();
    ruleDescription = $("#Description").val();
  } else {
    ruleName = $("#Rule_Name").val();
    ruleDescription = $("#Rule_Description").val();
  }
  let inputExpressionControl = $("#input_expression");
  let expressionTitleControl = $("#expression-title");
  let expressionObjectiveControl = $("#expression-objective");
  switch (contextEditor) {
    case CONTEXT_RULE:
      inputExpressionControl.val($("#RuleData_Expression").val());
      expressionTitleControl.append(
        "Agregar expresión " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción: </strong>" + ruleDescription
          : ""
      );
      break;
    case CONTEXT_SUCCESS_EVENT:
      inputExpressionControl.val($("#RuleData_OnSuccessExpression").val());
      expressionTitleControl.append(
        "Agregar evento exitoso " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción:</strong>" + ruleDescription
          : ""
      );
      break;
    case CONTEXT_FAILURE_EVENT:
      inputExpressionControl.val($("#RuleData_OnFailureExpression").val());
      expressionTitleControl.append(
        "Agregar evento fallido " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción: </strong>" + ruleDescription
          : ""
      );
      break;
    case CONTEXT_COMPLEX_RULE:
      inputExpressionControl.val($("#ComplexExpression").val());
      expressionTitleControl.append(
        "Agregar expresión " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción: </strong>" + ruleDescription
          : ""
      );
      actionOnNewRuleModal("hide");
      break;
    case CONTEXT_COMPLEX_SUCCESS_EVENT:
      inputExpressionControl.val($("#ComplexOnSuccessExpression").val());
      expressionTitleControl.append(
        "Agregar evento exitoso " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción: </strong>" + ruleDescription
          : ""
      );
      actionOnNewRuleModal("hide");
      break;
    case CONTEXT_COMPLEX_FAILURE_EVENT:
      inputExpressionControl.val($("#ComplexOnFailureExpression").val());
      expressionTitleControl.append(
        "Agregar evento fallid " +
          (ruleName !== ""
            ? "a la <strong>Regla: " + ruleName + "</strong>"
            : "")
      );
      expressionObjectiveControl.append(
        ruleDescription !== ""
          ? "<strong>Descripción: </strong>" + ruleDescription
          : ""
      );
      actionOnNewRuleModal("hide");
      break;
  }
}

function populateOperators(parameters) {
  let operators = parameters.find(
    (parameter) => parameter.inputTypeCode === operatorParametersCode
  );
  $("#operators_properties").html(renderOperatorsListHtml(operators, true));
}

function populatePlans(parameters) {
  let plans = parameters.find(
    (parameter) => parameter.inputTypeCode === planParametersCode
  );
  $("#plan_properties").html(renderPlanAndUserListHtml(plans, ""));
}

function populateUser(parameters) {
  let userProperties = parameters.find(
    (parameter) => parameter.inputTypeCode === userParametersCode
  );
  $("#user_properties").html(renderPlanAndUserListHtml(userProperties, ""));
}

function populateGlobalParams(parameters) {
  $("#global_params").html(renderGlobalParamsHtml(parameters));
}

function renderOperatorsListHtml(item, addToRegex) {
  let html = "";
  if (item.children && item.children.length > 0) {
    html += `<ul id="${item.name}" class="editor-item-list tree">`;
    item.children.forEach((child) => {
      let metadata = JSON.parse(child.metaData);
      if (child.children && child.children.length > 0) {
        html += `
                        <li>
                            <details>
                                <summary>
                                    <div class="editor-item-list finals">
                                        <a class="final operator-selectable"
                                            data-id-item="${child.name}"
                                            data-is-addable="${metadata.isAddable}"
                                            data-add-blank-space="${metadata.addBlankSpace}">
                                                ${child.name}
                                        </a>
                                    </div>
                                </summary>`;
        html += renderOperatorsListHtml(
          child,
          !(
            child.name.toUpperCase().trim() === "AGRUPADORES" ||
            child.name.toUpperCase().trim() === "FUNCIONES DE LISTA"
          )
        );
        html += `</details>
                        </li > `;
      } else {
        html += `< li class="editor-item-list" >
    <a class="final operator-selectable"
        data-id-item="${child.name}"
        data-is-addable="${metadata.isAddable}"
        data-add-blank-space="${metadata.addBlankSpace}">
        ${child.name}
    </a> ${
      metadata.isAddable
        ? "<i class='fa-sharp fa-regular fa-circle-question user-input-help' data-title='" +
          metadata.help.title +
          "' data-description='" +
          child.description +
          "' data-example='" +
          metadata.help.example +
          "' ></i>"
        : ""
    }
                            </li > `;
        if (addToRegex && child.name !== "np") {
          operatorsRegex += "[" + child.name + "]|";
        }
        dataOperators.push(child.name);
      }
    });
    html += "</ul>";
  }
  return html;
}

function renderPlanAndUserListHtml(item, open) {
  let html = "";
  if (item.children && item.children.length > 0) {
    html += `< ul id = "${item.name}" data - data - type="${item.type}" class="editor-item-list tree" > `;
    item.children.forEach((child) => {
      if (child.children && child.children.length > 0) {
        html += `< li >
    <details ${open}>
        <summary>
            <div class="editor-item-list ps-2">
                <span class="final property-selectable"
                    data-data-type="${child.type}"
                    data-id-item="${child.name}">
                    ${child.name} <em class="fs-6">(${child.type})</em>
                </span>
                <i class="fa-sharp fa-regular fa-circle-question user-input-help" data-title="${child.name}" data-description="${child.description}"></i>
            </div>
        </summary>`;
        html += renderPlanAndUserListHtml(child, open);
        html += "</details></li > ";
        dataInputs.push(child.name);
      } else {
        html += `<li>
                                <div>
                                    <div>
                                        <div class="editor-item-list">
                                            <span class="final property-selectable" 
                                                data-data-type="${child.type}" 
                                                data-id-item="${child.name}">
                                                    ${child.name} <em class="fs-6">(${child.type})</em>
                                            </span>
                                            <i class="fa-sharp fa-regular fa-circle-question user-input-help" data-title="${child.name}" data-description="${child.description}"></i>
                                        </div>
                                    </div>`;
        html += renderPlanAndUserListHtml(child, open);
        html += "</div></li>";
        dataInputs.push(child.name);
      }
    });
    html += "</ul>";
  }
  return html;
}

function searchParameter(context) {
  let input = "";
  let data = {};
  if (context === "plan_properties") {
    input = document.getElementById("searchBarPlan").value;
    data = responseInputData.find(
      (parameter) => parameter.inputTypeCode === planParametersCode
    );
  } else if (context === "user_properties") {
    input = document.getElementById("searchBarUser").value;
    data = responseInputData.find(
      (parameter) => parameter.inputTypeCode === userParametersCode
    );
  } else if (context === "global_params") {
    input = document.getElementById("searchBarGlobalParam").value;
    data = responseGlobalData;
  }
  input = input.toLowerCase();
  if (context === "global_params") {
    if (input.length > 0) {
      const result = searchSimpleObject(data, input);
      if (result.length > 0) {
        $(`#${context}`).html(renderGlobalParamsHtml(result));
      } else {
        $(`#${context}`).html("No hay coincidencias");
      }
    } else {
      $(`#${context}`).html(renderGlobalParamsHtml(data));
    }
  } else {
    if (input.length > 0) {
      const result = searchObject(data, input);
      if (result !== null) {
        $(`#${context}`).html(renderPlanAndUserListHtml(result, "open"));
      } else {
        $(`#${context}`).html("No hay coincidencias");
      }
    } else {
      $(`#${context}`).html(renderPlanAndUserListHtml(data, ""));
    }
  }
}

function searchObject(item, query) {
  if (item.name.toLowerCase().search(query) != -1) {
    return { ...item, children: item.children };
  }
  const childrens = item.children
    .map((child) => searchObject(child, query))
    .filter(Boolean);
  return childrens.length > 0 ? { ...item, children: childrens } : null;
}

function searchSimpleObject(item, query) {
  return item.filter((child) => child.name.toLowerCase().search(query) != -1);
}

function renderGlobalParamsHtml(items) {
  let html = `<ul class="editor-item-list">`;
  for (const item of items) {
    html += `<li>
                    <div class="editor-item-list ps-2">
                        <span 
                            class="final parameter-selectable" 
                            data-expression="${item.expression}"
                            data-id-item="${item.name}">        
                            ${item.name}
                        </span>
                        <i 
                            class='fa-sharp fa-regular fa-circle-question parameter-help'
                            data-id-item="${item.name}"
                            data-expression="${item.expression}"
                            data-description="${item.description}"
                            data-dependent-input-users="${item.dependentInputUsers}"
                            data-dependent-params="${item.dependentParams}"
                        ></i>
                    </div>
                </li>`;
    dataGlobal.push(item.name);
  }
  return html;
}

function renderPopoverParameter(
  expression,
  description,
  dependentInputUsers,
  dependentParams
) {
  return `<p><b>Descripción: </b>${description}</p>
            <p><b>Expresión: </b>${expression}</p>
            <p><b>Depende de Parámetros para regla: </b>${dependentInputUsers}</p>
            <p><b>Depende de otros parámetros predefinidos: </b>${dependentParams}</p>`;
}
function renderPopoverInputs(example, description) {
  let render = `<p><b>Descripción: </b>${description}</p>`;
  if (example) render += `<p><b>Ejemplo: </b>${example}</p>`;
  return render;
}

$("#btnGlobalParams").click(function () {
  modalGlobalParamOpen = true;
  populateOperators(dataInputs.inputUser);
  populatePlans(dataInputs.inputUser);
  populateUser(dataInputs.inputUser);
  populateGlobalParams(dataInputs.globalParams);
  var modal = new bootstrap.Modal(document.getElementById("globalParamsModal"));
  $("#formGlobalParams #btnGlobalParams").hide();
  $("#formGlobalParams #input_expression").val("");
  modal.show();
  actionsModals();
});
$("#globalParamsModal").on("hidden.bs.modal", function () {
  modalGlobalParamOpen = false;
  disableEventListerForModalGlobalParams();
  populateEditorData();
});
$("#btnInputUser").click(function () {
  var modal = new bootstrap.Modal(
    document.getElementById("entradaReglasModal")
  );
  modal.show();
});
$("#entradaReglasModal").on("hidden.bs.modal", function () {
  populateEditorData();
});
$("#formGlobalParams").submit(function () {
  var form = $(this);
  form.validate();

  debugger;
  const globalParamId = $("#formGlobalParams #GlobalParamId").val();

  let url = "?handler=";

  if (
    globalParamId === "00000000-0000-0000-0000-000000000000" ||
    globalParamId === ""
  ) {
    url = url + "CreateGlobalParam";
  } else {
    url = url + `UpdateGlobalParam&id${globalParamId}`;
  }
  var name = $("#formGlobalParams #Name").val();
  var version = $("#formGlobalParams #Version").val();
  var description = $("#formGlobalParams #Description").val();
  var status = document.getElementById("Status").checked;
  var expression = $("#formGlobalParams #input_expression").val();

  let data = {
    name,
    version,
    description,
    status,
    expression,
  };

  if (form.valid() === true) {
    $.ajax({
      dataType: "JSON",
      type: "POST",
      url: url,
      headers: {
        RequestVerificationToken: rulesAntiForgeryToken,
      },
      data: data,
    }).done(function (response) {
      let notification = {
        type: "success",
        message: "Ocurrio un error al crear el parámetro predefinido",
        duration: 5000,
        ripple: true,
        dismissible: false,
        position: {
          x: "center",
          y: "top",
        },
      };
      if (response.success) {
        notification.message = response.message;
        showNotification(notification);
        document.getElementById("formGlobalParams").reset();
        $("#globalParamsModal").modal("hide");
        modalGlobalParamOpen = false;
      } else {
        notification.type = "error";
        notification.message = response.message;
        showNotification(notification);
      }
    });
  }
  return false;
});
$("#formInputUser").submit(function () {
  var form = $(this);
  form.validate();

  debugger;
  const inputUserId = $("#InputUserId").val();

  let url = "?handler=";

  if (
    inputUserId === "00000000-0000-0000-0000-000000000000" ||
    inputUserId === ""
  ) {
    url = url + "CreateInputUser";
  } else {
    url = url + `UpdateInputUser&id${inputUserId}`;
  }
  var name = $("#nameInput").val();
  var type = $("#typeInput").val();
  var description = $("#descriptionInput").val();
  var parentId = $("#ParentId").val();
  var metaData = $("#MetaData").val();

  let data = {
    name,
    type,
    description,
    parentId,
    metaData,
  };

  if (form.valid() === true) {
    $.ajax({
      dataType: "JSON",
      type: "POST",
      url: url,
      headers: {
        RequestVerificationToken: rulesAntiForgeryToken,
      },
      data: data,
    }).done(function (response) {
      let notification = {
        type: "success",
        message: "Ocurrio un error al crear el input de usuario",
        duration: 5000,
        ripple: true,
        dismissible: false,
        position: {
          x: "center",
          y: "top",
        },
      };
      if (response.success) {
        notification.message = response.message;
        showNotification(notification);
        document.getElementById("formInputUser").reset();
        $("#entradaReglasModal").modal("hide");
      } else {
        notification.type = "error";
        notification.message = response.message;
        showNotification(notification);
      }
    });
  }
  return false;
});

let fnDblClickOperators = function () {
  const idTextArea = modalGlobalParamOpen
    ? "#formGlobalParams #input_expression"
    : "#input_expression";
  const isAddable = $(this).data("is-addable");
  const addBlankSpace = $(this).data("add-blank-space");
  if (isAddable) {
    let expression = $(idTextArea).val();
    let textarea = $(idTextArea)[0];
    let cursorPos = textarea.selectionEnd;
    const item = $(this).data("id-item");
    if (cursorPos > 0) {
      if (addBlankSpace) {
        expression =
          expression.slice(0, cursorPos) +
          ` ${item} ` +
          expression.slice(cursorPos);
        cursorPos = cursorPos + item.length + 2;
      } else {
        expression =
          expression.slice(0, cursorPos) +
          `${item}` +
          expression.slice(cursorPos);
        cursorPos = cursorPos + item.length;
      }
    } else {
      if (addBlankSpace) {
        expression += ` ${item} `;
      } else {
        expression += `${item}`;
      }
      cursorPos = expression.length;
    }
    $(idTextArea).val(expression);
    textarea.setSelectionRange(cursorPos, cursorPos);
    $(idTextArea).focus();
  }
};

let fnDblClickPlanUserProperties = function () {
  const idTextArea = modalGlobalParamOpen
    ? "#formGlobalParams #input_expression"
    : "#input_expression";
  let textarea = $(idTextArea)[0];
  let cursorPos = textarea.selectionStart;

  let expression = $(idTextArea).val();
  const idParent = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .attr("id");

  const idItem = $(this).data("id-item");
  let text = "";
  if (idParent === planParametersCode || idParent === userParametersCode) {
    const idParentTemp =
      idParent === planParametersCode ? idPlanParameter : idUserParameter;
    text += `${idParameters}.${idParentTemp}.${idItem}`;
  } else {
    text += `${idItem}`;
  }
  if (cursorPos > 0) {
    expression =
      expression.slice(0, cursorPos) + `${text}` + expression.slice(cursorPos);
    cursorPos = cursorPos + text.length;
  } else {
    expression += `${text}`;
    cursorPos = expression.length;
  }

  $(idTextArea).val(expression);
  textarea.setSelectionRange(cursorPos, cursorPos);
  $(idTextArea).focus();
};

let fnDblClickGlobalParams = function () {
  const idTextArea = modalGlobalParamOpen
    ? "#formGlobalParams #input_expression"
    : "#input_expression";
  let textarea = $(idTextArea)[0];
  let cursorPos = textarea.selectionStart;
  let expression = $(idTextArea).val();
  const idItem = $(this).data("id-item");

  let text = "";
  text += `${idItem}`;

  if (cursorPos > 0) {
    expression =
      expression.slice(0, cursorPos) + `${text}` + expression.slice(cursorPos);
    cursorPos = cursorPos + text.length;
  } else {
    expression += `${text}`;
    cursorPos = expression.length;
  }

  $(idTextArea).val(expression);
  textarea.setSelectionRange(cursorPos, cursorPos);
  $(idTextArea).focus();
};

function actionsModals() {
  disableEventListerForModalGlobalParams();
  var idOperatorProperties = modalGlobalParamOpen
    ? "#formGlobalParams #operators_properties"
    : "#operators_properties, #user_properties ,#plan_properties";

  // Double Click to Add Operators
  $(idOperatorProperties).on(
    "dblclick",
    ".operator-selectable",
    fnDblClickOperators
  );

  var idPlanUserPorperties = modalGlobalParamOpen
    ? "#formGlobalParams #plan_properties, #formGlobalParams #user_properties"
    : "#plan_properties, #user_properties";

  // Double Click To Add Input User Params
  $(idPlanUserPorperties).on(
    "dblclick",
    ".property-selectable",
    fnDblClickPlanUserProperties
  );

  // Double Click to Add Global Params
  var idGlobalParams = modalGlobalParamOpen
    ? "#formGlobalParams #global_params"
    : "#global_params";
  $(idGlobalParams).on(
    "dblclick",
    ".parameter-selectable",
    fnDblClickGlobalParams
  );

  // Operators Help
  $(idOperatorProperties).on("mouseenter", ".user-input-help", function () {
    $(".user-input-help").popover("dispose");
    const title = $(this).data("title");
    const description = $(this).data("description");
    const example = $(this).data("example");
    $(this)
      .popover({
        html: true,
        title: `<b>${title}</b>`,
        content: renderPopoverInputs(example, description),
      })
      .on("shown.bs.popover", function () {
        $(".popover").css("max-width", "600px");
      });
  });

  // GlobalParams Help
  $(idGlobalParams).on("mouseenter", ".parameter-help", function () {
    $(".user-input-help").popover("dispose");
    $(".parameter-help").popover("dispose");

    const id = $(this).data("id-item");
    const expression = $(this).data("expression");
    const description = $(this).data("description");
    const dependentInputUsers = $(this).data("dependent-input-users");
    const dependentParams = $(this).data("dependent-params");

    $(this)
      .popover({
        html: true,
        title: `<b>${id}</b>`,
        content: renderPopoverParameter(
          expression,
          description,
          dependentInputUsers,
          dependentParams
        ),
        placement: "left",
      })
      .on("shown.bs.popover", function () {
        $(".popover").css("max-width", "600px");
      });
  });
}

function disableEventListerForModalGlobalParams() {
  $("#formGlobalParams #operators_properties").off(
    "dblclick",
    ".operator-selectable",
    fnDblClickOperators
  );
  $(
    "#formGlobalParams #plan_properties, #formGlobalParams #user_properties"
  ).off("dblclick", ".property-selectable", fnDblClickPlanUserProperties);
  $("#formGlobalParams #global_params").off(
    "dblclick",
    ".parameter-selectable",
    fnDblClickGlobalParams
  );
}

function actionOnNewRuleModal(action) {
  if (action === "show") {
    modalExpressionRule.show();
  } else {
    modalExpressionRule.hide();
  }
}

function validateExpression() {
  ruleUserOrPlanInputs = [];
  ruleGlobalParams = [];
  let alertContainer = $("#alertContainer").empty();

  let expression = $("#input_expression").val();
  let cleanExpression = expression
    .replaceAll(idParameters + `.`, "")
    .replaceAll(idPlanParameter + `.`, "")
    .replaceAll(idUserParameter + `.`, "");

  let isValidExpression = true;
  let errorMessages = [];

  if (expression.trim() === "") {
    errorMessages.push("La expresión no puede estar en blanco");
    isValidExpression = false;
  }

  let splitExpression = cleanExpression
    .split(new RegExp(regexString))
    .filter((element) => element !== undefined)
    .map((str) => str.trim())
    .filter((element) => element !== " " && element !== "")
    .filter((element) => !element.startsWith("$"));

  splitExpression.forEach((element) => {
    let foundInputParameters = dataInputs.find((input) => input === element);
    if (typeof foundInputParameters !== "undefined") {
      ruleUserOrPlanInputs.push(element);
    }
    let foundGlobalParameters = dataGlobal.find((global) => global === element);
    if (typeof foundGlobalParameters !== "undefined") {
      ruleGlobalParams.push(element);
    }

    if (
      typeof foundInputParameters === "undefined" &&
      typeof foundGlobalParameters === "undefined"
    ) {
      isValidExpression = false;
      if (typeof foundInputParameters === "undefined") {
        errorMessages.push(
          "Parámetro de usuario o plan no definido: " + element
        );
        return;
      }
      errorMessages.push("Parámetro global no definido: " + element);
    }
  });

  let plans = responseInputData.find(
    (parameter) => parameter.inputTypeCode === planParametersCode
  ).children;
  let userProperties = responseInputData.find(
    (parameter) => parameter.inputTypeCode === userParametersCode
  ).children;
  let UserPlansProperties = plans.concat(userProperties);
  let coincidentPlansObjects = [];
  for (let i = 0; i < UserPlansProperties.length; i++) {
    if (ruleUserOrPlanInputs.includes(UserPlansProperties[i].name)) {
      coincidentPlansObjects.push(UserPlansProperties[i].name);
    }
  }

  let incorrectPlans = [];
  coincidentPlansObjects.forEach((object) => {
    let index = expression.indexOf(object);
    let textBefore = expression.substring(0, index).trim();
    if (
      !textBefore.endsWith(`${idParameters}.${idPlanParameter}.`) &&
      !textBefore.endsWith(`${idParameters}.${idUserParameter}.`)
    ) {
      incorrectPlans.push(object);
    }
  });

  if (incorrectPlans.length > 0) {
    isValidExpression = false;
  }

  if (isValidExpression) {
    return true;
  }

  let html = "";
  errorMessages.forEach((element) => {
    html += '<p class="mb-0">' + element + "</p>";
  });
  htmlForFirstError = `
             <hr><p>Recuerde que para ingresar datos de entrada en la expresión, debe utilizar el símbolo $, Ej: codigoPlan == $"N4-C" o diasCarencia >= $10</p>
             ${html}
            `;
  let htmlForPlanPrefixMissing = "";
  incorrectPlans.forEach((element) => {
    htmlForPlanPrefixMissing += '<p class="mb-0">' + element + "</p>";
  });
  let htmlForPlanPrefixMissingParagraph = `<hr><p>Recuerde que las propiedades padre de plan o parámetros de regla Ej: deducibles, deduciblePorPagar se debe anteponer el prefijo parametros.plan.deducibles o parametros.usuario.deduciblePorPagar</p>${htmlForPlanPrefixMissing}`;

  alertContainer.append(
    `<div class="alert alert-warning alert-dismissible fade show" role="alert" id="test">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <div class="alert-message" id="alertMessage">
                        <h4 class="alert-heading">Expresión no valida</h4>
                        <p>Existen errores en la expresión, revísela y vuelva a intentarlo.</p>
                        ${errorMessages.length > 0 ? htmlForFirstError : ""}
                        ${
                          incorrectPlans.length > 0
                            ? htmlForPlanPrefixMissingParagraph
                            : ""
                        }
                    </div>
                </div>`
  );
  return false;
}

function getInputs(parentPath) {
  saveRuleExpression();
  let inputs = [];
  $("input").each(function () {
    if (this.value != "" && this.id != "") {
      inputs.push({ id: this.id, value: this.value });
    }
  });
  if ($("#Rule_Operator").val() != undefined) {
    inputs.push({ id: "Rule_Operator", value: $("#Rule_Operator").val() });
  }
  let returnUrl = "";
  let query = window.location.search;
  if (window.location.search.includes("&jsonData")) {
    let querySplit = query.split("&");
    if (querySplit[1].includes("flowId")) {
      query = querySplit[0] + "&" + querySplit[1];
    } else {
      query = querySplit[0];
    }
  }
  returnUrl = `${window.location.pathname}${query}&jsonData=${JSON.stringify(
    inputs
  )}`;
  window.location.href = `${parentPath}?returnUrl=${returnUrl}`;
}

$("#btnAddGlobalParam").click(function () {
  getInputs("/RulesEngine/GlobalParams/Create");
});
$("#btnAddInputUser").click(function () {
  getInputs("/RulesEngine/InputUser/Create");
});

function getRegularExpression() {
  let url = "./CreateSimple2?handler=ExpressionRule";
  $.ajax({
    dataType: "JSON",
    type: "GET",
    url: url,
    headers: { RequestVerificationToken: rulesAntiForgeryToken },
  }).done(function (response) {
    let notificationError = {
      type: "error",
      message: "No se puede obtener la expresión regular para validar la regla",
      duration: 5000,
      ripple: true,
      dismissible: false,
      position: {
        x: "center",
        y: "top",
      },
    };
    if (response.success) {
      regexString = response.message.value;
    } else {
      showNotification(notificationError);
    }
  });
}
function GetUsedParams(inputUserList, globalParamsList, expression) {
  let cleanExpression = expression
    .replaceAll(idParameters + `.`, "")
    .replaceAll(idPlanParameter + `.`, "")
    .replaceAll(idUserParameter + `.`, "");
  let splitExpression = cleanExpression
    .split(new RegExp(regexString))
    .filter((element) => element !== undefined)
    .map((str) => str.trim())
    .filter((element) => element !== " " && element !== "")
    .filter((element) => !element.startsWith("$"));
  var arrayInputUser = [];
  var arrayGlobalParams = [];
  inputUserList.forEach((inputUser) => {
    if (splitExpression.find((x) => x == inputUser)) {
      arrayInputUser.push(inputUser);
    }
  });

  globalParamsList.forEach((globalParam) => {
    if (splitExpression.find((x) => x == globalParam)) {
      arrayGlobalParams.push(globalParam);
    }
  });
  return { arrayInputUser, arrayGlobalParams };
}
function getInputsTest() {
  let inputs = [];
  $("#inputsUser")
    .find(":input")
    .each(function () {
      inputs.push({ id: this.id, value: this.value });
    });
  return inputs;
}

$("#testRule").click(function () {
  var inputs = getInputsTest();
  let inputsJson = JSON.stringify(inputs);
  let expression = $("#expression_testing").val();
  let globalParams = $("#dependedParamsTest").val();
  let planCode = $("#planCode").val();
  let planVersion = $("#planVersion").val();
  let data = {
    expression,
    inputsJson,
    planCode,
    planVersion,
    globalParams,
  };
  $.ajax({
    type: "POST",
    url: "./CreateSimple2?handler=Test",
    data: data,
    headers: { RequestVerificationToken: rulesAntiForgeryToken },
    success: function (response) {
      let notification = {
        type: "error",
        message:
          "Ocurrio un error al probar la regla, por favor revise el resultado de la ejecución",
        duration: 5000,
        ripple: true,
        dismissible: false,
        position: {
          x: "center",
          y: "top",
        },
      };
      if (!response.success) {
        showNotification(notification);
      }
      $("#Result").val(JSON.stringify(response.message, null, 2));
    },
  });
});
