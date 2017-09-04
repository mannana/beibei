$(function() {
	var cookie = getCookie("info");
	var str="";
	for(var i = 0; i < cookie.length; i++) {
		str += `<ul class="item">
				<li>
					<div class="brand-name"><input type="checkbox" class="chb1" /><a href="#">${cookie[i].id}卖场</a></div>
				</li>
				<li class="info">
					<div class="cb"><input type="checkbox" class="chb" /></div>
					<div class="pro">
						<a class="img" href="detail.html?id=${cookie[i].id}&proid=${cookie[i].proid}"><img src="images/${cookie[i].src}" /></a>
						<p class="memo"><a href="detail.html?id=${cookie[i].id}&proid=${cookie[i].proid}">${cookie[i].title}</a></p>
					</div>
					<div class="proinfo"><span>${cookie[i].color}</span><span>${cookie[i].size}</span></div>
					<div class="price"><p class="newprice">${cookie[i].price}.00</p><p class="old">95.00</p></div>
					<div class="count" data-id=${cookie[i].id} data-proid=${cookie[i].proid}>
						<a class="countbtn" href="javascript:">-</a>
						<input class="countnum" type="text" readonly="readonly" value="${cookie[i].count}" />
						<a class="countbtn" href="javascript:">+</a>
					</div>
					<div class="totalprice">${cookie[i].count*cookie[i].price}.00</div>
					<div class="opr del" data-id=${cookie[i].id} data-proid=${cookie[i].proid} data-color=${cookie[i].color} data-size=${cookie[i].size}><a href="javascript:">删除</a></div>
				</li>
				<li class="total">
					<span>小计：</span>
					<div class="totalprice1">0.00</div>
				</li>
				</ul>`
	}
	$(".listitem").html(str);
	//商品数量加减
	$(".countbtn").click(function(){
			var txt=$(this).html();
			var content=parseInt($(this).parent().find(".countnum").val());
			var price=$(this).parent().prev().find(".newprice").html()
			switch(txt){
				case "-":
					content>1?$(this).parent().find(".countnum").val(--content):1;
					break;
				case "+":
					$(this).parent().find(".countnum").val(++content);
					break;
			}
			var did=$(this).parent().data().id;
			var dproid=$(this).parent().data().proid;
			for(var i = 0; i < cookie.length; i++) {
				if(did==cookie[i].id&&dproid==cookie[i].proid){
					cookie[i].count=content;
					setCookie("info",JSON.stringify(cookie));
				}
			}
			$(this).parent().next().html(`${content*price}.00`)
			$(":checkbox").trigger("click")
	});
	//删除商品
	$(".del").click(function(){
		var did=$(this).data().id;
		var dproid=$(this).data().proid;
		var color=$(this).data().color;
		var size=$(this).data().size;
		if(confirm("确定要删除吗?")){
			$(this).parent().parent().remove();
			for(var i = 0; i < cookie.length; i++) {
				if(did==cookie[i].id&&dproid==cookie[i].proid&&color==cookie[i].color&&size==cookie[i].size){
					cookie.splice(i,1);
					setCookie("info",JSON.stringify(cookie));
				}
			}
		}

	});
	//删除所有
	$(".delAll").click(function(){

		if(confirm("确定要删除所有商品吗?")){
			$(".listitem").html("");
			setCookie("info","",-1);
		}
	});

	$(".selectAll").click(function(){
		$(":checkbox").prop("checked",$(this).prop("checked"));
		$(".chb").click();
		$(".chb1").click();
	})

	$(".chb").click(function(){
		var parent=$(this).parent().parent();
		parent.prev().find(".chb1").prop("checked",$(this).prop("checked"));
		sum($(this));
		for (var i = 0; i < $(".chb").length; i++) {
			if(!$($(".chb")[i]).prop("checked")){
				$(".selectAll").prop("checked",false);
				return;
			}else{
				$(".selectAll").prop("checked",true);
			}
		}
	});
	$(".chb1").click(function(){
		var parent=$(this).parent().parent();
		parent.next().find(".chb").prop("checked",$(this).prop("checked"));
		$(".selectAll").prop("checked",$(this).prop("checked"));
		sum($(this));
		for (var i = 0; i < $(".chb1").length; i++) {
			if(!$($(".chb1")[i]).prop("checked")){
				$(".selectAll").prop("checked",false);
				return;
			}else{
				$(".selectAll").prop("checked",true);
			}
		}
	});
	function sum(obj){
		var parent=obj.parent().parent();
		var total=0;
		if(obj.prop("checked")){
			var price=parseFloat(parent.parent().find(".newprice").html());
			var count=parseFloat(parent.parent().find(".countnum").val());
			parent.parent().find(".totalprice1").html(price*count+".00");
		}else{
			parent.parent().find(".totalprice1").html("0.00");

			$(".totalp").html(`￥0.00`);
		}
		$(".totalprice1").each(function(){
			total+=parseFloat($(this).html());
			if(total>0){
				$(".confirm").addClass("active");
			}else{
				$(".confirm").removeClass("active");
			}
		});
		$(".totalp").html(`￥${total}.00`);


	}
})
