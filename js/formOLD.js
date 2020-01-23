




//validare email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//validare username da file esterno
/*function validateUsername(){   
}*/


//2) VALIDARE il form
function validateForm(){
    
    // valido nome
    var firstname = $('#firstname').val().trim();
    if(firstname.length <= 3){
        /*error.text('First name not valid');
        error.show();*/
        $('#firstname').addClass('is-invalid');
        return false;
    }

    // valido cognome
    var lastname = $('#lastname').val().trim();
    if(lastname.length <= 3){
        $('#lastname').addClass('is-invalid');
        return false;
    }

    //valido username
    var username = $('#username').val().trim();
    if(username.length < 7 || username.length > 20 ){
        $('#username').addClass('is-invalid');
        return false;

    }


    //valido password
    var password1 = $('#password').val().trim();
    var password2 = $('#confirm-password').val();
    if(password1!=password2){
        $('#password').addClass('is-invalid');
        $('#confirm-password').addClass('is-invalid');
        return false;
    }


    //valido email
    var email = $('#email').val().trim();
    if(!validateEmail(email)){
        return false;
    }

    if($('#myform').hasClass("is-invalid")){
        alert ("Username is already exist");
        return false;
    }


    return true;
}




//richiamo
$("#username").on('blur',function(){

    var el = $(this),
        form = $("#myform");

    $.ajax({
        type: 'POST',
        url: "username.php",
        data: {username:  username
        },
        success: function(result) {
            if(result.valid){
                form.removeClass("is-invalid").addClass("is-valid");
                el.removeClass("is-invalid").addClass("is-valid");
            }else{
                form.removeClass("is-valid").addClass("is-invalid");
                el.removeClass("is-valid").addClass("is-invalid");
            }
        },
        dataType: "json"
    });
});




// decido che non sto attendendo
var richiestaPendente = false;

//valido email
$('#email').on('input', function (){

    var email = $(this).val().trim();
    var el2 = $(this);


    if(!richiestaPendente){


        if(validateEmail(email)) {
            
            $.post('email.php',
                {
                    email: email
                },
                function(data){

                    if(!data.valid){
                        el2.removeClass('is-valid');
                        el2.addClass('is-invalid');
                    } else {
                        el2.removeClass('is-invalid');
                        el2.addClass('is-valid');
                    }

                    richiestaPendente = false; //function è l'ultima che ottengo, perchè mi viene data la risposta dal server. quando ho le risposte, posso darlo in false

                },
                'json'
            );

        }else{
            el2.removeClass('is-invalid');
            el2.addClass('is-valid');        
        }     


    richiestaPendente = true; //qui sto aspettando la risposta dal server
    }


});





    
//1) al submit del form, attivo la funzione
$("#myform").submit(function(e){


    if (!validateForm()){
        e.preventDefault();
    }
 
});