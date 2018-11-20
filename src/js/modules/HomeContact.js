//contact-form
$(function () {

    var $reqVal,
        $nameVal,
        $companyVal,
        $emailVal,
        $questionVal;

    //dialog confirm send mail
    var submitCallBack = function () {
        $('.contact-submit .fa').addClass('fa-spin fa-spinner');

        $.ajax({
            url: 'gmail.php',
            type: 'POST',
            data: {
                send_mail: true,
                request: $reqVal,
                name: $nameVal,
                company: $companyVal,
                email: $emailVal,
                question: $questionVal,
            },
            success: function (res) {
                $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-check');
                document.getElementsByClassName("contact--form")[0].reset();
            },
            error: function (xhr, status, err) {
                console.log(xhr, status, err);
                $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-exclamation');
            }
        })

    }

    var closeCallBack = function () {
        $('#js_mail_result').removeClass('show');
    }

    var setPreviewValue = function () {
        $reqVal = $('input[name = "request_hidden"]').val(); //from custom-select
        $nameVal = $('#name').val();
        $companyVal = $('#company').val();
        $emailVal = $('#email').val();
        $questionVal = $('#question').val();

        $('.review-request .review-text').text($reqVal);
        $('.review-name .review-text').text($nameVal);
        $('.review-company .review-text').text($companyVal);
        $('.review-email .review-text').text($emailVal);
        $('.review-question .review-text').text($questionVal);
    }

    //validate
    $.validator.setDefaults({
        submitHandler: function () {
            alert("submitted!");
        }
    });
    $("#contact--form").validate({
        focusInvalid: false,
        ignore: '',
        rules: {
            //key is name of input
            request_hidden: "required",
            name: "required",
            company: "required",
            email: {
                required: true,
                email: true,
                maxlength: 255
            },
            question: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            //key is name of input
            request_hidden: "",
            // request: "お問い合わせ項目を選択してください。",
            name: "お名前を入力してください。",
            company: "貴社名を入力してください。",
            email: {
                required: "メールアドレスを入力してください。",
                email: "正しいメールアドレスを入力してください。",
                maxlength: "正しいメールアドレスを入力してください。"
            },
            question: {
                required: "お問い合わせ内容を入力してください。",
                minlength: "少なくとも二文字以上"
            }
        },

        errorElement: "span",
        errorContainer: '.notice-error',
        errorPlacement: function (error, element) {
            // Add the class to the error element
            error.addClass("required-notice");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("has-error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("has-error")
        },
        submitHandler: function () {
            setPreviewValue();
            $('#js_contact_confirm').addClass('show');
        }
    });

    // --------------------- add event ---------------------------------
    // --------------------- add event ---------------------------------
    $('.btn_accept_send').click(function () {
        submitCallBack();
        $('#js_contact_confirm').removeClass('show');
    })

    $('.btn_cancel_send').click(function () {
        closeCallBack();
        $('#js_contact_confirm').removeClass('show');
    })

    $(document).on('click', '.contact_reset', function () {
        $('#js_mail_result').removeClass('show')
    })
})