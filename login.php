<?php
	header("content-type:text/html;charset=utf-8");
	//获取用户输入的用户名密码
	$uphone=$_POST["phone"];
	$upwd=$_POST["pwd"];
	//连接数据库
	$db=mysql_connect("localhost","root","root");
	mysql_select_db("beibei",$db);
	mysql_query("set names utf8");
	$sql="select * from users where uphone='$uphone'";
	$result=mysql_query($sql);
	$arr=mysql_fetch_Array($result);
	if($arr){
		if($arr["upwd"]==$upwd){
			echo "<script>alert('登录成功');location.href='index.html'</script>";
		}else{
			echo "<script>alert('密码错误');location.href='login.html'</script>";
		}
	}else{
		echo "<script>alert('用户名不存在');location.href='login.html'</script>";
	}
?>