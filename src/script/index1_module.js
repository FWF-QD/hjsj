import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';


const $but1 = $('.but1');
const $list = $('.but1');
const $cartlist = $('.cartlist');
const $contentlist = $('.item');

$list.hover(function() {
    //当前的li添加样式以及cartlist显示
    $(this).addClass('active').siblings('li').removeClass('active');
    $(this).find('.cartlist').show();
    $(this).find('.cartlist2').show();
    $(this).css('background-color', '#eaedf4');
    $(this).find('a').css('color', 'black');
    $(this).find('.zt').css('color', 'black');

    //内容的切换
    $contentlist.eq($(this).index()).show().siblings('.item').hide();
}, function() {
    $(this).find('.cartlist').hide();
    $(this).find('.cartlist2').hide();
    $(this).css('background-color', '#3b4976');
    $(this).find('a').css({
        color: '#e7e9ee'
    });
    $(this).find('.zt').css({
        color: '#e7e9ee'
    });


});
$('.but2').hover(function() {
    $(this).find('.cartlist3').show();
    $(this).css('background-color', '#eaedf4');
    $(this).find('a').css('color', 'black');
    $(this).find('.zt').css('color', 'black');

}, function() {
    $(this).find('.cartlist3').hide();
    $(this).css('background-color', '#3b4976');
    $(this).find('a').css({
        color: '#e7e9ee'
    });
    $(this).find('.zt').css({
        color: '#e7e9ee'
    });
})













// 轮播图
const $lbt = $('.lbt');
const $ulist = $('.lbt ul'); //运动的列表
const $piclist = $('.lbt ul li');
const $btnlist = $('.lbt ol li');
let $index = 0;
let $timer = null;


let $picwidth = $piclist.eq(0).width();
$ulist.css({
    width: $picwidth * $piclist.length
});


$btnlist.on('click', function() {
    $index = $(this).index() - 1; //当前点击的按钮的索引。
    tabswitch();
});

function tabswitch() {
    $index++;

    //重点1：判断如果是图片的最后一张，重置位置。
    if ($index === $btnlist.length + 1) {
        $ulist.css('left', 0); //重置位置。
        $index = 1;
    }

    if ($index === -1) {
        $ulist.css('left', -$picwidth * $btnlist.length); //重置位置。
        $index = $btnlist.length - 1;
    }

    if ($index === $btnlist.length) {
        $btnlist.eq(0).addClass('active').siblings('ol li').removeClass('active'); //重点1切换的时候触发的
    } else {
        $btnlist.eq($index).addClass('active').siblings('ol li').removeClass('active'); //给当前的小圆圈添加类
    }
    $ulist.stop(true).animate({ //运动的位置根据索引位置进行匹配的
        left: -$picwidth * $index
    });
}


$lbt.hover(function() {
    clearInterval($timer)
}, function() {
    $timer = setInterval(function() {
        tabswitch();
    }, 3000);
})
$timer = setInterval(function() {
    tabswitch();
}, 3000);