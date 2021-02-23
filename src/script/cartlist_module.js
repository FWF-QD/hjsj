import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';

if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
    let arrsid = localStorage.getItem('localsid').split(','); //编号  [1,2,3,4]
    let arrnum = localStorage.getItem('localnum').split(','); //数量  [10,20,30,40]
    for (let i = 0; i < arrsid.length; i++) {
        renderList(arrsid[i], arrnum[i]);
    }

}
//封装函数实现渲染
function renderList(sid, num) {
    $.ajax({
        url: 'http://10.31.165.67/HJSJ/php/alldata.php',
        dataType: 'json'
    }).done(function(data) {
        $.each(data, function(index, value) { //遍历数组和对象  index:数组索引  value:每一个数据-对象
            if (value.sid === sid) { //根据当前的sid找对应的数据
                let $clonebox = $('.goods-item:hidden').clone(true, true);
                $clonebox.find('.goods-pic img').attr('src', value.picurl);
                $clonebox.find('.goods-d-info a').html(value.title);
                $clonebox.find('.b-price strong').html(value.price);
                $clonebox.find('.quantity-form input').val(num);
                $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                $clonebox.css('display', 'block'); //显示克隆的元素
                $('.item-list').append($clonebox); //追加

                allprice(); //计算总价
            }
        })
    });
}



function allprice() {
    let $allnum = 0;
    let $allprice = 0;
    $('.goods-item:visible').each(function(index, element) {
        //$(this):当前操作的商品列表goods-item
        if ($(this).find('.cart-checkbox input').prop('checked')) {
            $allnum += parseInt($(this).find('.quantity-form input').val());
            $allprice += parseInt($(this).find('.b-sum strong').html());
        }
    });

    $('.amount-sum em').html($allnum); //赋值总的数量
    $('.totalprice').html('￥' + $allprice); //赋值总的价格
}


//5.全选
$('.allsel').on('click', function() {
    $('.goods-item:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
    $('.allsel').prop('checked', $(this).prop('checked'));
    allprice();
});


$('.item-list').on('click', 'input:checkbox', function() {
    if ($('.goods-item:visible').find('input:checkbox').length === $('.goods-item:visible').find('input:checked').length) {
        $('.allsel').prop('checked', true);
    } else {
        $('.allsel').prop('checked', false);
    }
    allprice();
});