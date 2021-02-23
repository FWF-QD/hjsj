//引入模块
import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';


let $sid = location.search.substring(1).split('=')[1];
// 如果sid不存在，默认sid为1
if (!$sid) {
    $sid = 1;
}

const $spic = $('#spic'); //小图
const $smallpic = $('#spic img'); //小图里面的图片
const $bpic = $('#bpic'); //小图
const $loadtitle = $('.loadtitle'); //标题loadpcp
const $loadpcp = $('.loadpcp'); //价格
const $list = $('#list ul'); //存放小图
const $sf = $('#sf');
const $bf = $('#bf');
const $goodsinfo = $('.goodsinfo');
let $liwidth = 0; //li的宽度
let $lilenth = 0; //所有li的个数
console.log($goodsinfo);


//2.将当前的sid传给后端，后端返回sid对应的数据给前端。
$.ajax({
    url: 'http://10.31.165.67/HJSJ/php/getsid.php',
    data: {
        datasid: $sid
    },
    dataType: 'json'
}).done(function(data) {
    // console.log(data); //获取sid对应的数据,找到对应的元素，将值赋给元素。
    $smallpic.attr('src', data.picurl);
    $bpic.attr('src', data.picurl)
    $loadtitle.html(data.title);
    $loadpcp.html(data.price);

    //渲染放大镜下面的小图
    let $picarr = data.price1.split(','); //数组
    let $strHtml = '';
    // console.log($picarr);
    $.each($picarr, function(index, value) {
        $strHtml += ` 
                <li>
                    <img src="${value}"/>    
                </li>
            `;
        $list.html($strHtml);
    });

    //这里可以任意的获取渲染的数据。
    $lilenth = $('#list ul li').length; //存储li的个数
    if ($lilenth < 6) {
        $('#right').css('color', '#fff');
    }

    $liwidth = $('#list ul li').eq(0).outerWidth(true); //存储一个li的宽度
});


//2.1.点击小图，切换大图。
//无法获取渲染的元素，渲染的过程是异步的ajax，只能采用事件委托。
const $listul = $('#list ul');
$listul.on('click', 'li', function() { //注意委托的元素就是内部的元素，设置的时候可以忽略
    // console.log($(this)); //委托的元素
    //获取委托元素li里面的img下面的src的路径。
    let $url = $(this).find('img').attr('src');
    //对应的赋值
    $smallpic.attr('src', $url);
    $bpic.attr('src', $url);
});

//3.5.通过小图两侧的按钮，切换小图。
//每点击一次箭头，图片移动一张。
let $num = 6; //这里的6是固有的值。表示显示的张数。
$('#right').on('click', function() {
    if ($lilenth > $num) {
        $num++;
        $('#left').css('color', '#333');
        if ($num === $lilenth) { //右箭头无法点击
            $('#right').css('color', '#fff');
        }
    }
    $listul.animate({
        left: -$liwidth * ($num - 6)
    });
});
$('#left').on('click', function() {
    if ($num > 6) {
        $num--;
        $('#right').css('color', '#333');
        if ($num === 6) {
            $('#left').css('color', '#fff');
        }
    }
    $listul.animate({
        left: -$liwidth * ($num - 6)
    });
});

//3.放大镜效果。
//3.1.鼠标移入小图，显示小放和大放
$spic.hover(function() {
    $sf.css('visibility', 'visible');
    $bf.css('visibility', 'visible');
    //3.2.计算小放的尺寸和比例
    $sf.width($spic.outerWidth() * $bf.outerWidth() / $bpic.outerWidth());
    $sf.height($spic.outerHeight() * $bf.outerHeight() / $bpic.outerHeight());
    let $bili = $bpic.outerWidth() / $spic.outerWidth(); //比例
    //3.3.鼠标在小图里面移动，小放跟随鼠标
    $spic.on('mousemove', function(ev) {
        let $leftvalue = ev.pageX - $spic.offset().left - $sf.outerWidth() / 2;
        let $topvalue = ev.pageY - $spic.offset().top - $sf.outerHeight() / 2;
        if ($leftvalue < 0) {
            $leftvalue = 0;
        } else if ($leftvalue >= $spic.outerWidth() - $sf.outerWidth()) {
            $leftvalue = $spic.outerWidth() - $sf.outerWidth();
        }

        if ($topvalue < 0) {
            $topvalue = 0;
        } else if ($topvalue >= $spic.outerHeight() - $sf.outerHeight()) {
            $topvalue = $spic.outerHeight() - $sf.outerHeight();
        }

        $sf.css({
            left: $leftvalue,
            top: $topvalue
        });

        $bpic.css({
            left: -$bili * $leftvalue,
            top: -$bili * $topvalue
        });
    });
}, function() {
    $sf.css('visibility', 'hidden');
    $bf.css('visibility', 'hidden');
});






let $arrsid = []; //存储的商品编号,以及获取本地存储的商品编号
let $arrnum = []; //存储商品的数量,以及获取本地存储的商品数量


//提前获取本地存储里面的商品编号,提前考虑本地存储的key值(localsid:本地存储的商品编号，localnum:本地存储商品的数量)
//这里的重点是本地存储key值的提前约定。
//封装函数获取本地存储，进行商品是第一次还是多次判断。
function getLocalStorage() {
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) { //商品已经存储过
        $arrsid = localStorage.getItem('localsid').split(','); //将获取的编号转换成数组，方便后面判断是否存在当前编号。
        $arrnum = localStorage.getItem('localnum').split(',');
    } else {
        $arrsid = [];
        $arrnum = [];
    }
}


//开始存储商品的编号和数量
const $btn = $('.p-btn a'); //存储商品的按钮
const $count = $('#count');
$btn.on('click', function() {
    //判断是第一次存储，还是多次存储。
    getLocalStorage()
    if ($arrsid.includes($sid)) { //存在,不是第一次添加，改变数量
        let $index = $arrsid.indexOf($sid); //sid在数组中的位置，sid的位置和数量是匹配的。通过sid的位置找数量的位置
        $arrnum[$index] = parseInt($arrnum[$index]) + parseInt($count.val()); //重新赋值
        localStorage.setItem('localnum', $arrnum); //重新添加到本地存储，覆盖前面的值
    } else { //不存在,第一次添加
        $arrsid.push($sid); //将sid添加到存储sid的数组中。
        localStorage.setItem('localsid', $arrsid); //添加到本地存储中。
        $arrnum.push($count.val()); //将数量添加到存储数量的数组中。
        localStorage.setItem('localnum', $arrnum); //添加到本地存储中。
    }
    alert('存储按钮被点击了');
});