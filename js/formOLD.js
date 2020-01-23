
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

      
    if($("#myform").hasClass("is-invalid")){
        alert ("Username is already exist");
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


    return true;
}


//1) al submit del form, attivo la funzione
$("#myform").submit(function(e){


    if (!validateForm()){
        e.preventDefault();
    }
 
});

//richiamo
/*$('#username').on('blur',function(){

    var el = $(this),
        form = $(#myform);

    $.ajax({
        url: "username.php",
        method: "post",
        data: {username:  $(this).val()
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
});*/


