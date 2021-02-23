import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

import {} from "./jquery.lazyload.js";

import {} from "./jquery.pagination.js";


//渲染
let $page = null;
let $array = []; //排序后的数组
let $array_default = []; //排序前的数组
let $prev = 0; //上一个价格
let $next = 0; //下一个价格

const $list = $('.list ul');
$.ajax({
    url: 'http://10.31.165.67/HJSJ/php/list.php',
    dataType: 'json'
}).done(function(data) {
    // console.log(data.pagecontent);
    let $arrdata = data.pagecontent; //获取初始的数据。
    let $strhtml = '';
    $page = data.pagesize;
    $.each($arrdata, function(index, value) {
        $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                        <h3>${value.title}</h3>
                        <h4>${value.title1}</h4>
                        <p>${value.span}</p>
                        <p class="xl">${value.title2}</p>
                        <em>${value.title3}</em>
                        <h5>${value.title4}</h5>
                        <span>￥${value.price}</span>
                        <h1>${value.btn}</h1>
                        <span class="money">${value.money}</span>
                    </a>
                </li>
            `;
    });

    $list.html($strhtml);

    $array = []; //排序后的数组
    $array_default = []; //排序前的数组

    $('.list li').each(function(index, element) {
        $array[index] = $(this);
        $array_default[index] = $(this); //保留初始状态
    });




    $('.page ').pagination({
        pageCount: $page,
        jump: true,
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) { //包含当前点击的分页的页码
            console.log(api.getCurrent());
        }
    })
    $('img.lazy').lazyload({
        effect: "fadeIn" //切换形式
    }); //分页 - 点击分页触发
    $('.page').pagination({
        pageCount: $page, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) { //包含当前点击的分页的页码
            // console.log(api.getCurrent()); //获取当前的点击的页码。

            //将获取的页面传递给后端
            $.ajax({
                url: 'http://10.31.165.67/HJSJ/php/list.php',
                data: {
                    page: api.getCurrent() //将页码传递给后端。
                },
                dataType: 'json'
            }).done(function(data) {
                let $arrdata = data.pagecontent; //获取初始的数据。
                let $strhtml = '';
                $.each($arrdata, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}">
                            <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                            <h3>${value.title}</h3>
                            <h4>${value.title1}</h4>
                            <p>${value.span}</p>
                            <p class="xl">${value.title2}</p>
                            <em>${value.title3}</em>
                            <h5>${value.title4}</h5>
                            <span>￥${value.price}</span>
                            <h1>${value.btn}</h1>
                            <span class="money">${value.money}</span>
                        </a>
                    </li>
                `;
                });
                $list.html($strhtml); //追加


                //分页也要重排
                $array = []; //排序后的数组
                $array_default = []; //排序前的数组

                $('.list li').each(function(index, element) {
                    $array[index] = $(this);
                    $array_default[index] = $(this); //保留初始状态
                });



                //添加懒加载
                $('img.lazy').lazyload({
                    effect: "fadeIn" //切换形式
                });
            });
        }
    });
});
//排序 - 点击按钮事件 - 冒泡排序(相邻的两两比较)
$('.pri-r').eq(0).on('click', function() {
    $.each($array_default, function(index, value) { //value:每一个li元素
        $list.append(value); //append相当于appendChild,逐个追加
    });
    return;
});

$('.pri').on('click', function() {
    for (let i = 0; i < $array.length - 1; i++) {
        for (let j = 0; j < $array.length - i - 1; j++) {
            $prev = parseFloat($array[j].find('span').eq(0).html().substring(1)); //第一个价格
            $next = parseFloat($array[j + 1].find('span').eq(0).html().substring(1)); //第二个价格
            if ($prev > $next) { //交换位置。
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
            }
        }
    }

    $.each($array, function(index, value) { //value:每一个li元素
        $list.append(value); //append相当于appendChild,逐个追加
    });
});