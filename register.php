<?php
	header("content-type:text/html;charset=utf-8");
	
	$phone=$_POST["phone"];
	$pwd=$_POST["pwd"];
	//设置数据源
	$db=mysql_connect("localhost","root","root");
	//连接数据库
	mysql_select_db("beibei",$db);
	//设置字符集
	mysql_query("set names utf8");
	//编写sql
	$sql="insert into users(uphone,upwd) values ('$phone','$pwd')";
	//执行sql
	$result=mysql_query($sql);
	if($result){
		echo "<script>alert('注册成功');location.href='login.html'</script>";
	}else{
		echo "<script>alert('注册失败');location.href='reg.html'</script>";
	}
?>