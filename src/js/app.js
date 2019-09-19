import '../css/sass.scss';

import jqueryjs from './jquery-1.9.1.min.js';


$(function () {
    topScroll();//固定头部
    iscroll();//注册滚动
    nfuwuForm();//服务留言提交
    message("#iforms1");
    message("#iforms2");
    itable();
    ndailiRadio();
})


function topScroll() {
    var oBnerHeigt = $("#iNav").offset().top;
    $(window).scroll(function() {
        if ($(window).scrollTop() >= oBnerHeigt) {
            $("#iNav").addClass('curr');
            $("body").css({
                paddingTop:$("#iNav").outerHeight(true)
            })
        } else {
            $("#iNav").removeClass('curr');
            $("body").css({
                paddingTop:0
            })
        }
    })
}

function iscroll() {
    var Box = $("#nzcScroll"),
        list = Box.find(".list"),
        oLi = list.find("li"),
        listMrTop = 0,
        oScolTop = list.height() - Box.height(),
        t;
    function autoFun() {
        if (Math.abs(parseInt(listMrTop)) <= oScolTop) {
            listMrTop -= 1;
            list.css({ "margin-top": listMrTop });
        } else {
            listMrTop = 0;
            list.css({ "margin-top": listMrTop });
        }
    }
    if (list.height() >= Box.height()) {
        t = setInterval(autoFun, 50)
    } else {
        return false;
    }

}


function nfuwuForm() {
    $("#iforms1 .dxBox").click(function () {
        $(this).addClass("curr").siblings().removeClass("curr");

    })
}





function message(ids) {
    //添加留言
    $(ids).find(".messageBtn").click(function () {
        var phone = $(ids).find(".inpTel").val();
        var name = $(ids).find(".inpName").val();
        //var inpCmplay = $(ids).find(".inpCmplay").val()||"暂无";
        var inpAddr = $(ids).find(".inpAddr").val();
        var t;
        var otherBpx = $(ids).find("#otherBpx");    //其它选项
        var othData = '';                 //其它信息

        if (otherBpx.length) {
            otherBpx.find('.item').each(function () {
                othData += $(this).find('.titl').text() + $(this).find('.valu.curr').text() + '；'
            })
        }

        if ($(ids).find("textarea").length) {
            othData += '；备注：' + $(ids).find("textarea").val()
        }

        if (!(phone.length == 7 || phone.length == 8 || phone.length == 12 || phone.length == 11)) {
            $(".iMessagefixed").html("请填写正确的电话号码！").fadeIn(100).delay(2000).fadeOut(0);
            $(ids).find(".inpTel").focus();
            return false;
        }
        var url = "name=" + name + " -- 留言来自：" + sPageNames + "&phone=" + phone + "&msg=" + "地址：" + inpAddr + "；其它信息：" + othData;

        $.ajax({
            type: "POST",
            url: oUrl + Math.random(),
            data: "" + url,
            beforeSend: function () {
            },
            success: function (data) {
                var rr = null;
                rr = eval("(" + data + ")");
                if (rr.status == "1") {
                    $(".iMessagefixed").html(rr.msg).stop().fadeIn(100).delay(2000).fadeOut(0);;
                }
                else {
                    $(".iMessagefixed").html(rr.msg).stop().fadeIn(100).delay(2000).fadeOut(0);;
                }
            },
            error: function () {
                alert("提交过程中发生错误,请稍后再试!");
            }
        });
    });
    // end
}


/************************华丽的分割线****************************/
function itable() {
    $("#itabelWrap .list li").hover(function () {
        var oIndex = $(this).index();
        var oHeight = $(this).height();
        $(this).addClass('curr').siblings().removeClass('curr');
        $("#itabelWrap .right .img").eq(oIndex).stop(true, true).fadeIn(300).siblings().stop(true, true).fadeOut(300);
        $("#itabelWrap .bgs").stop().animate({ top: oIndex * oHeight }, 200);
    })
}

function ndailiRadio() {
    $(".ndlradioBox span").click(function () {
        $(this).addClass("curr").siblings("span").removeClass("curr");
    })
}












