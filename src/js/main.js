function toggleNav() {
    document.getElementById('header-nav').classList.toggle('header__nav--is-show');
}

function waitLabel() {
    $('#button').html('Aguarde...');
}

function resetLabel() {
    $('#button').html('CADASTRAR');
}

document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault()
});

var EnviarEmail = function () {
    debugger;
    var form = $("#form-dados");
    form.validate();
    if (form.valid()) {
        //var dado = form.serialize();
        var dado = {};
        dado.name = $("#psfp-signup-name").val();
        dado.email = $("#psfp-signup-email").val();
        dado.senha = $("#psfp-signup-pass").val();
        dado = JSON.stringify(dado);
        $.ajax({
            url: "https://sementeapi.minimo.com.br/api/v0/pessoas/autoregister",
            type: 'POST',
            data: dado,
            //dataType: "json",
            success: function (data) {
                console.log("xklngsdlkgjdlk");
                // TODO Fazer aparecer o retorno de sucesso
                $('#button').html('Redirecionando...');
                $("#sucesso").addClass("popover--is-show");
                $("#error-email").removeClass("popover--is-show");
                setTimeout(function(){ window.location.href = "https://fp.programasemente.com.br"; }, 9000);
                
            },
            error: function (data) {
                if (data.status === 400)
                {                    
                    
                    if (data.responseJSON.Message == "Email já cadastrado.")
                    {
                       
                       $("#error-email").addClass("popover--is-show");
                        setTimeout(function(){  $("#error-email").removeClass("popover--is-show"); }, 3000);
                        $('#button').html('CADASTRAR');
                        $("#error-email").html("E-mail já cadastrado");
                        $("#error-email").removeClass("field-validation-valid");
                                           
                    }
                }
                else
                {
                    // TODO Erro desconhecido
                    $('#button').html('CADASTRAR');
                    $("#error-unknown").html("Houve um problema");
                }
            },
            contentType: "application/json",
        });
    } else {
        (function resetbtn() {
        console.log("Form não vlidado. Opa!!");
        setTimeout(function(){  $('#button').html('CADASTRAR'); }, 10);
        })()
                
        
    }
}

function toggleTerms() {
    $('.j-modal--terms').toggleClass('modal--is-show');
    $('.j-terms').scrollTop(0);
}
