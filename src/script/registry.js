import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

const $box = $('.box')
const $phone = $('.phone')
const $email = $('.email')
const $password = $('.password')
const $repass = $('.repass')
const $span = $('.lgPad span')
const $btn = $('.btn')
const $cw = $('.cw');
const $em = $('.lgPad em')
const $i = $('.lgPad i')
let $phoneflag = true;
let $emialflag = true;
let $passwordflag = true;
let $repassflag = true;



$box.on('submit', function() {
    if ($phone.val() === '') {
        $span.eq(0).html('请输入手机号');
        $span.eq(0).css('color', 'red');
        $phoneflag = false;
    }
    if ($email.val() === '') {
        $span.eq(1).html('请输入邮箱');
        $span.eq(1).css('color', 'red');
        $emialflag = false;
    }
    if ($password.val() === '') {
        $span.eq(2).html('请输入密码');
        $span.eq(2).css('color', 'red');
        $passwordflag = false;
    }
    if ($repass.val() === '') {
        $span.eq(3).html('请确认密码');
        $span.eq(3).css('color', 'red');
        $repassflag = false;
    }
    if (!$phoneflag || !$emialflag || !$passwordflag || !$repassflag) {
        return false;
    }
});




//判断电话名
//得到焦点)
-
25 - 162
$phone.on('focus', function() {
    $span.eq(0).html('请输入手机号');
    $span.eq(0).css('color', 'gray');
    $i.eq(0).css('visibility', 'visible')
    $i.eq(0).css('background-position', '-25px -162px');
})

//失去焦点
$phone.on('blur', function() {
    if ($(this).val() != '') { //判断电话
        let $reg = /^1[3789]\d{9}$/
        if ($reg.test($(this).val())) {
            $em.eq(0).css('visibility', 'visible')
            $span.eq(0).html('');
            $i.eq(0).css('visibility', 'hidden')
            $phoneflag = true;
        } else {
            $span.eq(0).html('请输入手机号');
            $span.eq(0).css('color', 'red');
            $i.eq(0).css('visibility', 'visible')
            $i.eq(0).css('background-position', '-44px -162px');
            $phoneflag = false;
        }
    } else {
        $span.eq(0).html('请输入手机号');
        $span.eq(0).css('color', 'red');
        $i.eq(0).css('visibility', 'visible')
        $i.eq(0).css('background-position', '-44px -162px');
        $phoneflag = false;
    }
});


//邮箱判断


//得到焦点
$email.on('focus', function() {
    $span.eq(1).html('请输入邮箱号');
    $span.eq(1).css('color', 'gray');
    $i.eq(1).css('visibility', 'visible')
    $i.eq(1).css('background-position', '-25px -162px');
})


$email.on('blur', function() {
    if ($(this).val() != '') {
        let $reg2 = /^\w+([.+-])*\w+\@(\w+([.-])*\w+)\.(\w+([.-])*\w+)$/;
        if ($reg2.test($(this).val())) {
            $em.eq(1).css('visibility', 'visible')
            $span.eq(1).html('');
            $i.eq(1).css('visibility', 'hidden')
            $emialflag = true;
            // $span.eq(2).html('');
            // $emialflag = true;
        } else {
            $span.eq(1).html('请输入邮箱号');
            $span.eq(1).css('color', 'red');
            $i.eq(1).css('visibility', 'visible')
            $i.eq(1).css('background-position', '-44px -162px');
            $emialflag = false;
        }
    } else {
        $span.eq(1).html('请输入邮箱号');
        $span.eq(1).css('color', 'red');
        $i.eq(1).css('visibility', 'visible')
        $i.eq(1).css('background-position', '-44px -162px');
        $emialflag = false;
    }
});
/* 密码 */
$password.on('focus', function() {
    $span.eq(2).html('请输入密码');
    $span.eq(2).css('color', 'gray');
    $i.eq(2).css('visibility', 'visible')
    $i.eq(2).css('background-position', '-25px -162px');
})


$password.on('blur', function() {
    if ($(this).val() != '') {
        if ($(this).val().length >= 6) {
            $em.eq(2).css('visibility', 'visible')
            $span.eq(2).html('');
            $i.eq(2).css('visibility', 'hidden')
            $passwordflag = true;
            // $span.eq(2).html('');
            // $passwordflag = true;
        } else {
            $span.eq(2).html('请输入密码');
            $span.eq(2).css('color', 'red');
            $i.eq(2).css('visibility', 'visible')
            $i.eq(2).css('background-position', '-44px -162px');
            $passwordflag = false;
        }
    } else {
        $span.eq(2).html('请输入密码');
        $span.eq(2).css('color', 'red');
        $i.eq(2).css('visibility', 'visible')
        $i.eq(2).css('background-position', '-44px -162px');
        $passwordflag = false;
    }
});
/* 再次输入密码 */
$repass.on('focus', function() {
    $span.eq(3).html('请再次输入密码');
    $span.eq(3).css('color', 'gray');
    $i.eq(3).css('visibility', 'visible')
    $i.eq(3).css('background-position', '-25px -162px');
})


$repass.on('blur', function() {
    if ($(this).val() == $password.val()) {

        $em.eq(3).css('visibility', 'visible')
        $span.eq(3).html('');
        $i.eq(3).css('visibility', 'hidden')
        $phoneflag = true;
    }
    // $span.eq(2).html('');
    // $phoneflag = true;
    else {
        $span.eq(3).html('请输入相同密码');
        $span.eq(3).css('color', 'red');
        $i.eq(3).css('visibility', 'visible')
        $i.eq(3).css('background-position', '-44px -162px');
        $phoneflag = false;
    }

});