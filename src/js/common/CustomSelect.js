//custom-select
$(function () {
    var input = $('#request'),
        inputHidden = $('#request_hidden'),
        $select = $('.custom-select'),
        _open = function () {
            $select.addClass('select-open')
        },
        _close = function () {
            $select.removeClass('select-open')
        },
        _changeSlected = function (elem) {
            $select.find('li').removeClass('selected');
            $(elem).addClass('selected');
        },
        _update = function (val) {
            val = val || "項目を選択してください"
            input.text(val);
            inputHidden.val(val);
            // console.log(inputHidden.val());
            _validate();

        },
        _validate = function () {
            if (input.text().trim() == "項目を選択してください") {
                inputHidden.addClass('has-error');
                inputHidden.val('');
            } else {
                inputHidden.removeClass('has-error');
            }
        };

    //handle
    input.on('click', function () {
        _open();
    })

    $select.on('click', 'li', function () {
        var val = $(this).data('value');
        _changeSlected(this);
        _update(val);
        _close();
    })

    $(document).on('click touchstart', function (event) {
        // Check if clicked outside target
        if (!($(event.target).closest(".custom-select").length)) {
            // Hide target
            _close();
        }
    });
})