$( document ).ready(function() {


    // VALIDATION OF INPUTS
    var inputsCount = getVisibleInputsCount();

    function getVisibleInputsCount() {
        var counter = 0;

        var inputs = document.getElementsByTagName("input");
        var inputsList = Array.prototype.slice.call(inputs);

        inputsList.forEach(function(element) {
            if ($(element).is(":visible")) {
                counter++;
            }
        });

        console.log("Visible inputs: " + counter);
        return counter;
    };

    $.validator.addMethod("emptyOrMaxFive", function(value, element) {
        return this.optional(element) || value.length <= 5;
    }, "Titul musí byť prázdny alebo maximálne 5 znakov.");

    $.validator.addMethod("emptyOrOnlyLetters", function(value, element) {
        return this.optional(element) || value.length == 0 || /^[A-Za-z\s]+$/.test(value);
    }, "Vypĺňané pole môže obsahovať iba písmena.");

    $.validator.addMethod("emptyOrRodneCislo", function(value, element) {
        return this.optional(element) || value.length == 0 || /^\d{6}\/\d{4}$/.test(value);
    }, "Vypĺňané pole musí byť v tvare xxxxxx / xxxx.");

    $.validator.setDefaults({
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    $("#form-matka-info").validate({
        rules: {
            titul: {
                emptyOrMaxFive: true
            },
            meno: {
                emptyOrOnlyLetters: true
            },
            priezvisko: {
                emptyOrOnlyLetters: true
            },
            rodneCislo: {
                emptyOrRodneCislo: true
            }
        }
    });

    $("#nextButton").click(function(e) {
        e.preventDefault();

        console.log($("#form-matka-info").valid());
    });
});