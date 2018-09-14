$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (response) {
            // 模板引擎:
            // 作用就是用来帮我们将数据和html拼接好,将拼接好的结果返回给我们
            // console.log(response);
            // 将数据和HTML做拼接:
            // 两个参数:1.HTML模板
            //         2.数据
            // 告诉模板引擎:HTML模板和数据怎样进行拼接
            var html = template("category-first", {result: response.rows});

            // console.log(html);
            $("#links").append(html);

            // 如果一级分类有数据的话
            if (response.rows.length) {

                $('#links').find('a').eq(0).addClass('active');
                // 获取第一分以及分类的ID
                var id = response.rows[0].id;
                // 根据一级分类ID 获取二级分类
                getSecondCategory(id);
            }
        }
    });

    // 点击一级分类获取二级分类的数据:
    // 1.一级分类添加点击事件
    // 2.在事件处理函数中获取到一级分类的ID
    // 3.调用二级分类的接口,获取对应的数据
    // 4.将数据展示到对应的位置中
    // 5.如果接口中没有数据,要在页面中显示暂无数据
    // 使用事件委托

    // 1.一级分类添加点击事件
    $('#links').on('click', 'a', function () {
        //2. 获取当前点击的一级分类的ID
        var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        // 3.调用接口,获取对应的数据
        getSecondCategory(id);
    });

    function getSecondCategory(id){
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id
            },
            success: function (response) {
                console.log(response);
                var html = template('category-second', response);
                // console.log(html)
                $('.brand-list').html(html);
            }
        });
    }
});