$(function(){
	var deffer=$.ajax({
		type:"get",
		url:"http://localhost/beibei/data/data.json"
	});
	deffer.done(function(msg){
		initMsg(msg);
		$(window).scroll(function(){
		var sTop=$(document).scrollTop();
			if(sTop<2000){
				initMsg(msg);
			}
		})
		$(".loadmore").click(function(){
		initMsg(msg);
		})

	});

	function initMsg(msg){
		var str="";
		var sTop=$(document).scrollTop();
		for(var i in msg){
			var strLi="";
			for(var j =0;j<msg[i].list.length;j++){
			var listinfo=msg[i].list[j];
				if(j<4){
				strLi+=`<li class="item-detail">
						<img src="images/${listinfo.src}" />
						<span class="new-price"><span class="currency">￥</span>
						<span class="price-num">${listinfo.newPrice}
						</span><span class="price-little">.00</span></span>
						<span class="old-price">${listinfo.oldPrice}</span>
						<p class="title">${listinfo.title}</p>
					</li>`
				}
			}
		str+=`<a href="martshow.html?id=${i}" target="_blank">
					<div class="item" data-id=${i}>
						<div class="brand-info">
							<img class="brand-logo" src="images/${msg[i].logo}" />
							<div class="info-wr">
							<span class="brand-name">${msg[i].name}</span>
							<span class="promotion-info">${msg[i].info}</span>
							</div>
							<span class="saleText">${msg[i].sale}折起&nbsp;></span>
						</div>
						<div class="clear"></div>
						<ul class="item-show-wrap">${strLi}</ul>
					</div>
				</a>`

		}
			$(".c-left").append(str);
	}

});
