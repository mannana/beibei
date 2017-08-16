$(function(){
	//侧边固定导航
	$(".side").load("sidePanel.html", function() {
		$(".side-panel>li").on({
			"mouseover": function() {
				$(this).addClass("active").siblings().removeClass("active");
				$(this).css("opacity", 1).siblings().css("opacity", 1);
				$(this).find(".caritem").css("opacity", 1);
			},
			"mouseout": function() {
				$(this).removeClass("active");
				$(this).css("opacity", 0.6).siblings().css("opacity", 0.6);
			}
		})
		$(".kfzx").hover(function() {
			$(this).find(".icon").hide().end().find(".s-kfzx").show();
		}, function() {
			$(this).find(".icon").show().end().find(".s-kfzx").hide();
		});
		$(".side-cart").hover(function() {
			var cartH = $(this).find(".cart-list").height();
			$(this).find(".cart-list").css({
				"top": -(cartH - 200) + "px",
				"right": "70px"
			});
			$(this).find(".cart-list").show();
		}, function() {
			$(this).find(".cart-list").hide();
		});
		$(".side-phone").hover(function() {
			$(this).find(".ewm").show();
		}, function() {
			$(this).find(".ewm").hide();
		});
		$(".r-top").on({
			"mouseover": function() {
				$(this).find(".icon").hide().end().find(".s-top").show();
			},
			"mouseout": function() {
				$(this).find(".icon").show().end().find(".s-top").hide();
			},
			"click": function() {
				var sTop = $(document).scrollTop();
				if(sTop > 200) {
					$("body,htm").animate({
						"scrollTop": 0
					}, 500);
				}
			}
		})
		getCart();
	});
	getCart();

	//头部
	$(".nav-t").load("head.html", function() {
		var deffer = $.ajax({
			type: "get",
			url: "http://localhost/beibei/data/cata.json"
		});
		deffer.done(function(msg) {
			getCat(msg);

		})

		//导航main-nav
		var pos = 0;
		$(".nav-item a").on({
			"mouseover": function() {
				$(this).addClass("active").siblings().removeClass("active");
			},
			"mouseout": function() {
				$(".nav-item a").eq(pos).addClass("active").siblings().removeClass("active");
			},
			"click": function() {
				pos = $(this).index();
			}

		})

		$(".sexAge>a").mouseenter(function() {
			$(this).next(".ageBox").css("display", "block");
		}).mouseleave(function() {
			$(this).next(".ageBox").css("display", "none");
		});
		getCart();

	});

	function getCat(msg) {
		var str = "";
		//在售分类
		for(var i in msg) {
			var liststr = "";
			for(var j = 0; j < msg[i].catlist.length; j++) {
				var listInfo = msg[i].catlist[j];
				liststr += `<li><a href="#">
							<img src="images/${listInfo.imgsrc}">
							<span>${listInfo.name}</span></a></li>`;
			}
			$(".bn-cate").append(`<li>${msg[i].catname}</li>`);
			$(".cat-list").append(`<ul class="cat-con">${liststr}</ul>`);
			for(var n = 0; n < msg[i].catlist.length; n++) {
				str += msg[i].catlist[n].name + ",";
			}
		}
		$(".bn-cate li").eq(0).addClass("current");
		$(".cat-con").eq(0).addClass("show");
		$(".bn-cate li").on({
			"mouseover": function() {
				$(this).addClass("current").siblings().removeClass("current");
				$(".cat-con").eq($(this).index()).addClass("show").siblings().removeClass("show");
			},
			"mouseout": function() {
				$(".bn-cate li").eq(0).addClass("current");
				$(".cat-con").eq(0).addClass("show");
			}
		})

		var arr = [];
		$(".search").keyup(function() {
			var value = $(this).val();
			var olhtml = "";
			if(value != "") {
				//将字符串转化成数组
				var keywords = str.split(",");
				//过滤出的数组结果
				var res = compare(keywords, value);
				for(var i = 0; i < res.length; i++) {
					olhtml += `<li><a href="#">${res[i]}</a></li>`;
				}
				$(".searchRes").html(olhtml);
				$(".searchRes").show(0);
				//$(".searchRes li:first").html(`<a href="#">${value}</a>`);

			} else {
				$(".searchRes").hide(0);
				$(".searchRes li:first").html(`<a href="#">${value}</a>`)
			}

		})

	}

	function compare(arr, value) {
		var res = [];
		var j = [];
		value = value;
		var valuepinyin = makePy(value);
		var pinyireg = RegExp(valuepinyin.toString(), "g");
		for(var x = 0; x < value.length; x++) {
			var reg = RegExp(value[x], "g");
		}
		var pinyinReg = RegExp(value, "g");
		//字符判断
		for(var i = 0; i < arr.length; i++) {

			j[makePy(arr[i])] = arr[i];
			//console.log(j)
			if(arr[i].match(reg) && res.indexOf(arr[i]) == -1) {
				res.push(arr[i]);
			}
		}
		//拼音首字母判断
		for(var p in j) {
			if(p.toLowerCase().match(pinyinReg) && res.indexOf(j[p]) == -1) {
				res.push(j[p]);
			}
		}
		return res;
	}

	//footer
	$("#footer").load("footer.html");
	//右侧轮播图

	function autoPlay() {
		$(".m-oversea ul").stop().animate({
			"left": -248
		}, 500, function() {
			$(this).css("left", 0)
				.find("li:first")
				.appendTo($(".m-oversea ul"));
		})
	}
	var overseatimer = setInterval(autoPlay, 3000);

	$(".m-oversea").hover(function() {
		clearInterval(overseatimer);
		$(this).children(".iconfont").show();
	}, function() {
		overseatimer = setInterval(autoPlay, 2000)
		$(this).children(".iconfont").hide();
	})

	$(".prev-btn").click(function() {
		autoPlay();
	});
	$(".next-btn").click(function() {
		$(".m-oversea ul").prepend($(".m-oversea ul li:last"));
		$(".m-oversea ul").css("left", -248);
		$(".m-oversea ul").stop().animate({
			"left": 0
		}, 500);
	})

	var index = $(".active").index();

	//轮播
	var timer = null;
	timer = setInterval(slider, 2000);

	$(".current>li").mouseenter(function() {
		clearInterval(timer);
		$(".slider-img>li").eq($(this).index()).fadeIn(1000).siblings().fadeOut(1000);
		$(this).addClass("active").siblings().removeClass("active");
	});

	$(".current>li").mouseleave(function() {
		clearInterval(timer);
		timer = setInterval(slider, 2000);
	})

	//tab切换

	$(".brand-tag li").mouseenter(function() {
		$(this).addClass("active").siblings().removeClass("active");
		$(".brand-content").children("ul").eq($(this).index()).removeClass("hide").siblings().addClass("hide");
	});

	$(".hot-tag li").mouseenter(function() {
		$(this).addClass("active").siblings().removeClass("active");
		$(".tz-item").eq($(this).index()).addClass("show").siblings().removeClass("show");
	});

	//遮罩
	$(".brand a").mouseenter(function() {
		$(this).children("div").css("display", "block");
		$(this).mouseleave(function() {
			$(this).children("div").css("display", "none");
		});

	});

})
var index = 0;

function slider() {
	if(index == $(".slider-img>li").length - 1) {
		index = 0;
	} else {
		++index;
	}
	$(".current>li").eq(index).addClass("active").siblings().removeClass("active");
	$(".slider-img>li").eq(index).fadeIn().siblings().fadeOut();
}

//顶部导航固定
window.onscroll = function() {
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollTop > (parseInt($("#head").css("height")) + parseInt($(".top-nav").css("height")))) {
		$(".sub-nav").addClass("active");
		$(".sub-nav-logo a").css({
			"display": "block",
			"border": "none"
		});
		$(".sub-nav .oversea").css("display", "block");
		$(".sub-nav .tomorrow").css("display", "none");
		$(".sub-nav .tuan").css("display", "block");
	} else {
		$(".sub-nav").removeClass("active");
		$(".sub-nav-logo a").css("display", "none")
		$(".sub-nav .oversea").css("display", "none");
		$(".sub-nav .tomorrow").css("display", "block");
		$(".sub-nav .tuan").css("display", "none");
	}
}

//左侧固定

//购物车
function getCart() {
	var cookie = getCookie("info");
	var liststr = "";
	var str1 = "";
	var classname="";
	var moreTxt="";
	if(cookie.length != 0) {
		var count = 0;
		var totalprice = 0;
		for(var i = 0; i < cookie.length; i++){
			count += parseInt(cookie[i].count);
			totalprice += (cookie[i].count * cookie[i].price);
			if(i<5){
				$(".viewmore").css("display","none")
				liststr += `<li class="caritem">
							<a href="detail.html?id=${cookie[i].id}&proid=${cookie[i].proid}">
								<img src="images/${cookie[i].src}" />
							</a>
							<div class="info">
							<a class="info-t" href="detail.html?id=${cookie[i].id}&proid=${cookie[i].proid}">${cookie[i].title}</a>
							<p class="style">颜色:${cookie[i].color} ${cookie[i].sizename}:${cookie[i].size}</p>
							</div>
							<div class="price">
							<p class="p">￥${cookie[i].price}.00</p><p class="n">x${cookie[i].count}</p>
							</div>
						</li>`;
					classname="";
					moreTxt="";
			}else{
				classname="viewmore";
				moreTxt="查看更多";
			}

		}
		$(".num").html(count);
		str1 = `购物车中有${count}件商品`;
	} else {
		str1 = `购物车中没有商品`;
		liststr = `<li><span>快去挑选商品吧!</span></li>`;
		totalprice = 0;
	}

	$(".cart-list").html(`<div class="cart-tit"><span class="iconfont">&#xe622;</span>${str1}</div>
								<ul class="clist">
									<!--购物车列表-->
									${liststr}
									<li class="${classname}" ><a href="mycart.html">${moreTxt}</a></li>
								</ul>

								<div class="cart-bottom">
								<span class="total">小计：<span class="totalPrice">￥${totalprice}.00</span></span>
								<a href="mycart.html" class="cart-btn">去购物车结算</a>
							</div>`);
}
