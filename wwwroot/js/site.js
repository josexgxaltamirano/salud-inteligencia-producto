// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Enable bootstrap custom styles
document.addEventListener("DOMContentLoaded", function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        });
    var pathname = window.location.pathname;
    var pathSplit = pathname.split('/');
    if (pathSplit.length >= 3) {
        var section = pathname.split('/')[2];
        $("#sidebar-" + section)[0].className = "sidebar-item sidebar-selected";
        $("#sidebar-link-" + section)[0].className = "sidebar-link sidebar-link-selected";
    }
});


document
    .querySelectorAll('input[type=number]')
    .forEach((elem) => elem.addEventListener('keypress', e => preventNonNumericValues(e.key)));

document
    .querySelectorAll('.fa-eye')
    .forEach((elem) => elem.addEventListener('click', e => hideShowPassword(e)));

// Create a notification
function showNotification(notification){
    if (notification){
        window.notyf.open(notification);
    }
}

// Add - remove active class from a list
function selectListItemActive(item) {
    const $that = $(item);
    $that.parent().find('a').removeClass('active');
    $that.addClass('active');
}

// Search Bar
function search() {
    let input = document.getElementById('searchBar').value
    input=input.toLowerCase();
    const x = document.getElementsByClassName('list-group-item list-group-item-action');

    for (const element of x) {
        if (!element.innerHTML.toLowerCase().includes(input)) {
            element.style.display = "none";
        } else {
            element.style.display="list-item";
        }
    }
}

// Numeric validation without decimals
function preventNonNumericValues(key)
{
    if (['.','e'].includes(key)){
        console.log('No debería dejar escribir')
        event.preventDefault()
    }
}
// Show - Hide password
function hideShowPassword(event){
    const targetElement = event.target || event.srcElement;
    const passwordElement = targetElement.parentElement.parentElement.querySelector('input');
    const type = passwordElement.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordElement.setAttribute('type', type);
}
function validateInteger(event) {
    return event.charCode >= 48 && event.charCode <= 57;
}
function validateDecimal(event) {
    return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 44;
}
