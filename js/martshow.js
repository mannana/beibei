$(function() {
	var href = location.href;
	var id = href.split("?")[1];
	id = id.split("=")[1];
	//console.log(id);
	var deffer = $.ajax({
		type: "get",
		url: "http://localhost/beibei/data/data.json"
	});
	var str = "";
	var listHtml = "";
	var itemHtml = "";
	deffer.done(function(msg) {
		var time = msg[id].day;
		var feature = new Date(time);
		var buyNum=parseInt(msg[id].buyNum);
		buyNum=buyNum>10000?parseFloat(buyNum/10000).toFixed(1)+"万":buyNum;
		console.log(buyNum);
		setInterval(function() {
			var now = new Date();
			var down = new Date(feature - now);
			var day = down.getDate() > 10 ? down.getDate() : "0" + down.getDate();
			var hour = down.getHours() > 10 ? down.getHours() : "0" + down.getHours();
			var minutes = down.getMinutes() > 10 ? down.getMinutes() : "0" + down.getMinutes();
			var seconds = down.getSeconds() > 10 ? down.getSeconds() : "0" + down.getSeconds();
			$(".mart-header").html(`<img class="logo" src="images/${msg[id].logo}" />
					<div class="brand-info">
						<p><span class="mart-name">${msg[id].name}</span>
						<span class="mart-count"><span>${msg[id].sale}</span>折起</span>
						</p>
						<p class="countdown">距离结束仅剩<span class="timer"><b>${day}</b>天<b>${hour}</b>时<b>${minutes}</b>分<b>${seconds}</b>秒</span></p>
						<p class="buy-num">${buyNum}人已经购买</p>
					</div>
					<a class="opration"><span class="iconfont">&#xe6a3;</span>收藏品牌</a>`);
		}, 100)
		for(var j = 0; j < msg[id].list.length; j++) {
			var listinfo = msg[id].list[j];
			if(j < 4) {
				listHtml += `<li><a href="detail.html?id=${id}&proid=${listinfo.id}">
							<img class="must-icon" src="images/biqiang_80x80.png"/>
							<img class="img" src="images/${listinfo.src}" />
							<p class="title">${listinfo.title}</p>
							<p class="price-info">
								<span class="new-price">
									<span class="symbol">￥</span>
									<span class="new-price-int">${listinfo.newPrice}</span>
									<span class="new-price-demical">.00</span>
								</span>
								<span class="old-price">
									<span class="symbol">￥</span>
									${listinfo.oldPrice}.00
								</span>
								<span class="discount">${listinfo.discount}折</span>
							</p>
						</a></li>`;
			} else {
				itemHtml += `<li>
								<a href="detail.html?id=${id}&proid=${listinfo.id}">
									<img class="img" src="images/${listinfo.src}" />
									<p class="title">${listinfo.title}</p>
									<p class="price-info">
										<span class="new-price">
											<span class="symbol">￥</span>
											<span class="new-price-int">${listinfo.newPrice}</span>
											<span class="new-price-demical">.00</span>
											</span>
										<span class="old-price">
										<span class="symbol">￥</span>
											${listinfo.oldPrice}.00
										</span>
										<span class="discount">${listinfo.discount}折</span>
									</p>
									</a></li>`
			}

		}

		$(".buyList").html(listHtml);
		$(".listitem").html(itemHtml);
	})
})
