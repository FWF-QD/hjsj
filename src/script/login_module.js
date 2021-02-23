// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

// 点击登录按钮，将用户名和密码传输给后端
const $btn = $('#loginSubmit');
console.log($btn);
const $UserName = $('#UserName');
const $PassWord = $('#PassWord');

$btn.on('click', function() {
    console.log($btn)
    console.log($UserName.val());
    $.ajax({

        type: 'post',
        url: 'http://10.31.165.67/HJSJ/php/login.php',
        data: {
            user: $UserName.val(),
            pass: $PassWord.val()
        }
    }).done(function(data) { //data:后端返回的值
        if (data === 'true') { //登录成功:跳转首页，同时首页应该出现用户名等信息(本地存储)。
            window.localStorage.setItem('loginname', $UserName.val());
            location.href = 'index1.html'
        } else { //登录失败
            alert('用户名或者密码错误');
            $PassWord.val(''); //清空密码
        }
    })
});