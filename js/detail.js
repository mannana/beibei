$(function(){
	var href=location.href;
	var id=href.split("?")[1].split("&")[0].split("=")[1];
	var proid=href.split("?")[1].split("&")[1].split("=")[1];

	getCart();
	//加载数据
	var deffer=$.ajax({
		type:"get",
		url:"http://localhost/beibei/data/data.json"
	});
	deffer.done(function(msg){
		var str="";
		var sizehtml="";
		var evahtml="";
		var thumbliststr="";
		var strcolor="";
		var time=msg[id].day;
				var feature=new Date(time);
				setInterval(function(){
					var now=new Date();
					var down=new Date(feature-now);
					var day=down.getDate()>10?down.getDate():"0"+down.getDate();
					var hour=down.getHours()>10?down.getHours():"0"+down.getHours();
					var minutes=down.getMinutes()>10?down.getMinutes():"0"+down.getMinutes();
					var seconds=down.getSeconds()>10?down.getSeconds():"0"+down.getSeconds();
					$(".countdown").html(`剩余:${day}天${hour}时${minutes}分${seconds}秒`);
				},100);

		for(var i=0;i<msg[id].list.length;i++){
			var listinfo=msg[id].list[i];
			if(listinfo.id==proid){
				$(".crumb").html(`<a href="beibei.html">首页</a>
					>
					<a href="#">${msg[id].classify}</a>
					>
					<a href="#">${msg[id].name}</a>
					>
					<span>${listinfo.title}</span>`);

				$(".smallImg").attr("src","images/"+listinfo.src);
				$(".bimg").attr("src","images/"+listinfo.src);

				for(var x=0;x<listinfo.imgsrc.length;x++){
					thumbliststr+=`<li><img src="images/${listinfo.imgsrc[x]}"></li>`;
					strcolor+=`<li><a class="color" href="javascript:"><img src="images/${listinfo.imgsrc[x]}"><span>${listinfo.color[x]}</span></a></li>`
				}
				for(var j=0;j<listinfo.sizelist.length;j++){
					sizehtml+=`<li><a class="size" href="javascript:">${listinfo.sizelist[j]}</a></li>`
				}

				$(".thumblist").html(thumbliststr);

				str=`<div class="title">
						<h3><span class="temai">今日特卖</span>${listinfo.title}</h3>
						<p>${listinfo.memo}</p>
					</div>
					<div class="price-info">
						<span class="newprice"><span class="symbol">￥</span>${listinfo.newPrice}.00</span>
						<span class="discount">${listinfo.discount}折</span>
						<span class="baoyou">${listinfo.baoyou}</span>
						<span class="market">参考价：￥<i class="strike">${listinfo.oldPrice}.00</i></span>
					</div>
					<div class="attrbox">
					<div class="stip">请选择型号</div>
					<div class="sale-attrs">
						<div class="attr">
							<span class="lable">运费</span>
							<span class="view-info">${listinfo.baoyou}（偏远地区除外）</span>
						</div>
						<div class="attr">
							<span class="lable">优惠</span>
							<span class="view-info"><em class="orange">返</em> 购买后约返10个贝壳 </span>
						</div>
						<div class="attr">
							<span class="lable">颜色</span>
							<ul class="color-value">
							${strcolor}
							</ul>
						</div>
						<div class="attr">
							<span class="lable">${listinfo.sizename}</span>
							<ul class="chima">${sizehtml}</ul>
						</div>
						<div class="attr">
							<span class="lable">数量</span>
							<div class="cnum">
								<a class="count" href="javascript:">-</a>
								<input class="countnum" type="text" readonly="readonly" value="1" />
								<a class="count" href="javascript:">+</a>
							</div>
						</div>
						<p class="service">服务承诺：全场包邮，全部正品，7天无理由退货，退货补运费</p>
						<div class="buybar">
							<div class="shopimg">
							<img src="images/93513389462558_800x800.jpg" /></div>
							<a class="buybtn alone" href="javascript:">
								<span class="price"><span class="symbol">￥</span><span class="int">${listinfo.newPrice}</span><span class="litter">.00</span></span>
								<span class="buy-type">单独购买</span>
							</a>
							<a class="buybtn active" href="javascript:">
								<div class="code"><p>手机购买更多优惠</p><img src="images/img_app.png"><i class="close-icon">×</i></div>
								<span class="price"><span class="symbol">￥</span><span class="int">${listinfo.groupPurchase}</span><span class="litter">.00</span></span>
								<span class="buy-type">2人团</span>
							</a>
							<a class="gopay" href="mycart.html">
								<span>去结算</span>
							</a>
								<a class="continue-buy" href="javascript:">
								<span>继续购物</span>
							</a>
						</div>
						</div>
					</div>`;
				$(".main-wrapper").html(str);




			evahtml=`<div class="title">特卖品牌</div>
					<div class="dec-con">
						<p><span class="lable">品牌:</span><span>${msg[id].name}</span></p>
						<p><em class="icon icon-check"></em><em class="icon icon-pay"></em><em class="iconid"></em></p>
						<p><span class="lable">服务:</span></p>
						<p class="p1">${msg[id].addrpro}</p>
					</div>
					<div class="eva-con">
		                <p><label>品牌综合评分：</label><span>${msg[id].ppzh}</span></p>
		                <p><label>发货速度评分：</label><span>${msg[id].fhsd}</span></p>
		                <p><label>物流速度评分：</label><span>${msg[id].wlsd}</span></p>
           			 </div>`;

				$(".eva-wrapper").html(evahtml);

			}
		}
		$(".thumblist li:first").addClass("activeli");
		$(".color-value li:first").find(".color").addClass("chois");
		$(".chima li:first").find(".size").addClass("slec");

		$(".thumblist li").click(function(){
			$(this).addClass("activeli").siblings().removeClass("activeli");
			var src=$(this).find("img").attr("src");
			$(".smallImg").attr("src",src);
			$(".bimg").attr("src",src);
		});
		$(".buybtn").eq(1).mouseover(function(){
			$(this).find(".code").css("display","block");
		});
		$(".close-icon").click(function(){
			$(".code").css("display","none");
		});
		$(".count").click(function(){
			var txt=$(this).html();
			var content=parseInt($(".cnum").find("input").val());
			console.log(txt);
			switch(txt){
				case "-":content>1?$(".cnum").find("input").val(content-1):1;
				break;
				case "+":$(".cnum").find("input").val(content+1);
				break;
			}
		});
		$(".alone").hover(function(){
			$(this).addClass("active");
		},function(){
			$(this).removeClass("active");
		});
		//颜色选择
		$(".color").click(function(){
			$(".chois").removeClass("chois");
			$(this).addClass("chois");
		});

		//尺码选择
		$(".size").click(function(){
			$(".slec").removeClass("slec");
			$(this).addClass("slec");
		});

		$(".alone").click(function(){
			if($(".slec").html()&&$(".chois").html()){
				$(".buybtn").hide();
				$(".gopay").show();
				$(".stip").hide();
				$(".attrbox").css("border-color","#fff");
				$(".continue-buy").show();
				var color=$(".color-value").find(".chois").find("span").html();
				var shopimg=$(".color-value").find(".chois").find("img").attr("src");
				var size=$(".chima").find(".slec").html();
				toCart(shopimg);
				addCookie(color,size);
				getCart();
			}else{
				$(".stip").show();
				$(".attrbox").css("border-color","#ff5482");
			}
		});

		function toCart(img){
			$(".shopimg").find("img").attr("src",img);
			$(".shopimg").show();
			var sx=$(".buybar").offset().left;
			var sy=$(".buybar").offset().top;
			var x=$(".side-cart").offset().left-sx+20;
			var y=$(".side-cart").offset().top-sy+5;
			$(".shopimg").animate({"left":x+"px","top":y+"px"},1000,function(){
				$(".shopimg").css({"left":"140px","top":"25px"});
				$(".shopimg").hide();
			});
		}

		//设置cookie
		function addCookie(color,size){
			var flag=true;
			var arr=[];
			for(var i=0;i<msg[id].list.length;i++){
				var listinfo=msg[id].list[i];
				if(listinfo.id==proid){
					var list={
						"id":id,
						"proid":listinfo.id,
						"src":listinfo.src,
						"title":listinfo.title,
						"price":listinfo.newPrice,
						"color":$(".chois span").html(),
						"oldPrice":listinfo.oldPrice,
						"groupPurchase":listinfo.groupPurchase,
						"discount":listinfo.discount,
						"baoyou":listinfo.baoyou,
						"sizename":listinfo.sizename,
						"size":$(".slec").html(),
						"count":$(".countnum").val()
					}
				}
			}
					//获取cookie
					var oldCookie=getCookie("info");
					//如果cookie存在,判断是否存在当前产品,如果存在count+1
					if(oldCookie.length!=0){
						arr=oldCookie;
						for(var i=0;i<arr.length;i++){
							if(proid==arr[i].proid&&id==arr[i].id&&color==arr[i].color&&size==arr[i].size){
								arr[i].count++;
								flag=false;
								break;
							}
						}
					}
					if(flag){
						arr.push(list);
					}

			setCookie("info",JSON.stringify(arr));

		}


		$(".continue-buy").click(function(){
			$(this).hide();
			$(".buybtn").show();
			$(".gopay").hide();
		})
	})



	//放大镜
	$(".main-img").on({
		"mouseover":function(){
			$(".mask").show();
			$(".bigImg").show();
		},
		"mouseout":function(){
			$(".mask").hide();
			$(".bigImg").hide();
		},
		"mousemove":function(e){
			var e=e||event;
			var x = e.pageX - $(this).offset().left - $(".mask").width()/2;
 			var y = e.pageY - $(this).offset().top - $(".mask").height()/2;
 			var maxW=$(this).width()-$(".mask").width();
 			var maxH=$(this).height()-$(".mask").height();
 			x=x<0?0:(x>maxW)?maxW:x;
 			y=y<0?0:(y>maxH)?maxH:y;
			$(".mask").css({"left":x+"px","top":y+"px"});

			//大图宽度/小图宽度=大图移动/mask移动
			var bigImgX=x*$(".bimg").width()/$(".smallImg").width();
			var bigImgY=y*$(".bimg").height()/$(".smallImg").height();
			$(".bimg").css({"left":-bigImgX+"px","top":-bigImgY+"px"});
		}
	});




})
