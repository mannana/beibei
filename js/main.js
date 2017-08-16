requirejs.config({
	paths:{
		"jquery":"jquery-1.11.1.min",
		"reg":"reg"
	}
})

requirejs(["jquery","reg"],function($,reg){
	var phoneFlag=false;
	var pwdFlag=false;
	$(".phone").blur(function(){
		var value=$(this).val();
		phoneFlag=reg.checkPhone(value);
		if(phoneFlag){
			$(".phone_tip").hide();	
		}else{
			$(".phone_tip").show();
		}
	});
	
	$(".pwd").blur(function(){
		var value=$(this).val();
		pwdFlag=reg.checkPwd(value);
		if(pwdFlag){
			$(".pwd_tip").hide();		
		}else{
			$(".pwd_tip").show();
		}
	});

	$(".register").click(function(){
		if(phoneFlag&&pwdFlag){		
			$(".f_area").submit();
		}
	});
	
	$(".login").click(function(){
		if(phoneFlag&&pwdFlag){		
			$(".f_area").submit();
		}
	});
	
	$(".btn_silde").on({
		"mousedown":function(e){
			window.getSelection ? window.getSelection().removeAllRanges() :document.selection.empty();
			var e=e||event;
			var disx=e.pageX;
			var disy=e.pageY;
		
			$(this).mousemove(function(evt){
				window.getSelection ? window.getSelection().removeAllRanges() :document.selection.empty();
				var ev=evt||event;
				var x=ev.pageX-disx;
				var y=evt.pageY-disy;
				var maxL=$(".ln").width()-$(this).width();
				x=x<0?0:x>maxL?maxL:x;
				y=y<0?0:y>0?0:y;		
				$(this).css({"left":x+"px","top":y+"px"});
				$(".nc_bg").css({"width":x+"px"});
			})
		},
		
	});
	$(document).mouseup(function(){
		$(".btn_silde").off("mousemove");
		var btn_left=parseInt($(".btn_silde").css("left"));
			if($(".btn_silde").offset().left>0&&btn_left<290){
				$(".btn_silde").animate({"left":0},500);
				$(".nc_bg").animate({"width":0},500);
			}
	})
	
	$(".qqlogin").hover(function(){
		$(this).css({"background-position":"-28px 0"})
	},function(){
		$(this).css({"background-position":"1px 0"})
	});
	$(".tblogin").hover(function(){
		$(this).css({"background-position":"-89px 0"})
	},function(){
		$(this).css({"background-position":"-59px 0"})
	});
	$(".wxlogin").hover(function(){
		$(this).css({"background-position":"-149px 0"})
	},function(){
		$(this).css({"background-position":"-119px 0"})
	})
	
})
