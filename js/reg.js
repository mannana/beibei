define(function(){
	return {
		"checkPhone":function(value){
			var reg=/^1[34578]\d{9}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
		},
		"checkPwd":function(value){
			var reg=/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
		}

	}
})
