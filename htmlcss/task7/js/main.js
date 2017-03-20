$(function(){
	//导航特效
	$("nav>ul>li").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		flag++;
	});
	$("nav>ul>li").hover(function(){
		flag=0;
		var nav = $(this).attr("class");
		if(nav == "active"){
			flag++;
		}else{
			$(this).addClass("active");
		};
	},function(){
		if(flag===0){
			$(this).removeClass("active");
		}
	});

	//窗口高度切换导航
	function changeNav(){
		var high; 
		if(document.documentElement.scrollTop){
			high = document.documentElement.scrollTop;
		}else{
			high = window.pageYOffset;
		};
	}	


	//main1动画加载
	$("div.main1>a").hide(0);
	$("div.main1>p.main1_caption1").show(1000,function(){
		$("div.main1>p.main1_caption2").show(1000,function(){
			$("div.main1>a").slideDown(1000);
		});
	});

	//轮播图效果
	function lunbo(){
		var width = parseFloat($("div.main6>div.left").css("width"));
		var left = parseFloat($("div.list").css("left"))- width +"px";
		//判断是否为最后一张，是就切换为第一张
		if(parseFloat(left)<=width*-4+200){
			$("div.list").css("left","0px");
			index =3;
		}
		//图片轮动
		left = parseFloat($("div.list").css("left"))- width +"px";
		$("div.list").animate({left:left},300);
		index++;

		changeCircleAndText();
	}
	//切换圆点	
	function changeCircleAndText(){
		if(index>3){index-=3};
		for(var i=0;i<3;i++){
			if($("div.main6 div.circle a").eq(i).attr("index")==index){
				$("div.main6 div.circle a").eq(i).addClass("on").siblings("a").removeClass("on");
				$("div.main6 div.right div.box").eq(i).removeClass("hide").siblings("div.box").addClass("hide");
			}
		}
	}
	//点击圆点切换图片
	function clickCircle(){
		var newIndex = $(this).attr("index");
		var width = parseFloat($("div.main6>div.left").css("width"));
		$("div.list").css("left",-width*newIndex+"px");
		index = newIndex;
		changeCircleAndText();
		clearInterval(timer);
		timer = setInterval(lunbo,5000);
	}
	var index = 1;
	var timer;
	timer = setInterval(lunbo,5000);
	$("div.main6 div.circle a").click(clickCircle);



	//搜索界面效果
	$("#search>div>span").hover(function(){
		$(this).css({color:"#ffffff",background:"#E74F4D",border:"1px solid #E74F4D"});
	},function(){
		if(!$(this).siblings("ul").hasClass("activeUL")){
			$(this).css({color:"#a8aaaa",background:"#ffffff",border:"1px solid #ffffff"});
		}else {
			$(this).css({color:"#a8aaaa",background:"#ffffff"});
		}
	})
	$("body").click(function(){
		if($("#search>div>ul").hasClass("activeUL")){
			$("#search>div>ul").removeClass("activeUL");
			$("#search>div>span").css({border:"1px solid #ffffff"});
		}
	});
	$("#search>div>span").click(function(e){
		$(this).css({border:"1px solid #E74F4D"});
		$(this).siblings("ul").addClass("activeUL");
		$(this).parent().siblings().children("ul").removeClass("activeUL");
		$(this).parent().siblings().children("span").css({border:"1px solid #ffffff"});
		e.stopPropagation();
	});	
	$("#search>div li").hover(function(){
		$(this).css({background:"#E74F4D",color:"#ffffff"});
	},function(){
		$(this).css({background:"#e3e3e4",color:"#323333"});
	});
	$("#search>div li").click(function(){
		$(this).parent("ul").removeClass("activeUL");
		var content = $(this).html();
		$(this).parent("ul").siblings("span").html(content);
		$("#search>div>span").css({border:"1px solid #ffffff"});
	});


	
})



function throttle(fn, delay, atleast) {
	    var timeout = null,
		startTime = new Date();
	    return function() {
		var curTime = new Date();
		clearTimeout(timeout);
		if(curTime - startTime >= atleast) {
		    fn();
		    startTime = curTime;
		}else {
		    timeout = setTimeout(fn, delay);
		}
	    }
	}
	function lazyload() {
	    var images = document.getElementsByTagName('img');
	    var len    = images.length;
	    var n      = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历		
	    return function() {
		var seeHeight = document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		for(var i = n; i < len; i++) {
		    if(images[i].offsetTop < seeHeight + scrollTop) {
		        if(images[i].getAttribute('src') === 'images/loading.gif') {
			     images[i].src = images[i].getAttribute('data-src');
		        }
			n = n + 1;
		     }
		}
	    }
	}
	var loadImages = lazyload();
	loadImages();          //初始化首页的页面图片
	window.addEventListener('scroll', throttle(loadImages, 500, 1000), false);