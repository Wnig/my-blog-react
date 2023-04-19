<?php
set_time_limit(0);
error_reporting(E_ALL);
error_reporting(0);
ini_set('display_errors','on');
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Origin: http://www.xxxiwnig.com");
header("Access-Control-Allow-Methods:HEAD, GET, POST, DELETE, PUT, OPTIONS");
header('Access-Control-Allow-Headers:content-type');
// header('Content-Type:text/html;charset=utf-8');
header('Content-Type: application/json');
// $link = mysqli_connect('localhost', 'myblog', '123456', 'myblog', '3306');
$link = mysqli_connect('localhost', 'root', 'root', 'myblog', '3306');

mysqli_query($link, "SET NAMES 'utf8'");
if (!$link) {
	die('Could not connect' . mysqli_error());
}

$action = $_GET['action'];

//获取所有文章（包括草稿箱、回收站）
if ($action == 'all-art') {
	$sql = "select * from article order by time_art desc";
	$rs = mysqli_query($link, $sql);
	$arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }
  $sql2 = "select count(*) from article order by time_art desc";
  $rs2 = mysqli_query($link, $sql2);
  list($total) = mysqli_fetch_row($rs2);

	$response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr,
    'total' => $total
  );
	echo json_encode($response);
};

//我的文章-详细页
if ($action == 'art-detail') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "update article set read_art = read_art + 1 where id_art = '$data[id_art]'";
  $rs = mysqli_query($link, $sql);
  if ($rs) {
    $sql2 = "select * from article where status_art = '$data[status_art]' and id_art = '$data[id_art]' limit 1";
    $rs2 = mysqli_query($link, $sql2);
    $obj = (object)[];

    while ($row = mysqli_fetch_object($rs2)) {
      $obj = $row;
    }

    $preObj = (object)[];
    $nextObj = (object)[];
    $pageIndex = 0;

    $sql3 = "select * from article where status_art = '$data[status_art]' order by time_art desc";
    $rs3 = mysqli_query($link, $sql3);
    $arr3 = array();
    while ($row3 = mysqli_fetch_array($rs3)) {
      $arr3[] = $row3;
    }

    $arrLen = (int)count($arr3);
    for ($i=0; $i<$arrLen; $i++) {
      if($data['id_art'] == $arr3[$i]['id_art']) {
        $pageIndex = $i;
        break;
      }
    }

    if($arrLen > 1) {
      $preObj = $pageIndex ? $arr3[$pageIndex - 1] : '';
      $nextObj = $pageIndex != $arrLen-1 ? $arr3[$pageIndex + 1] : '';
    } else {
      $preObj = '';
      $nextObj = '';
    }

    $response = array(
      'msg' => 'success',
      'code' => 200,
      'result' => $obj,
      'preObj' => $preObj,
      'nextObj' => $nextObj
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
};

//我的文章-分类-所有
if ($action == 'art-list') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $pageNum = (int)$data['pageNum'];
	if($pageNum != 0) {
		$current = $pageNum;
	} else {
		$current = 1;
  };
  $limit = (int)$data['pageSize'];
	$start = ($current - 1) * $limit;

	$sql = "select * from article where status_art = '$data[status_art]' and type_art like '%$data[type_art]' and time_art like '%$data[time_art]%' and tit_art like '%$data[key_word]%' order by time_art desc limit $start,$limit";
	$rs = mysqli_query($link, $sql);
	$arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }

  $sql2 = "select count(*) from article where status_art = '$data[status_art]' and type_art like '%$data[type_art]' and time_art like '%$data[time_art]%' and tit_art like '%$data[key_word]%' order by time_art desc";
  $rs2 = mysqli_query($link, $sql2);
  list($total) = mysqli_fetch_row($rs2);

  $response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr,
    'total' => (int)$total
  );
	echo json_encode($response);
};

//获取 我的文章-我的草稿-我的回收站-列表
if ($action == 'arts-list') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "select * from article where status_art = '$data[status_art]' order by time_art desc";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }
  $sql2 = "select count(*) from article where status_art = '$data[status_art]' order by time_art desc";
  $rs2 = mysqli_query($link, $sql2);
  list($total) = mysqli_fetch_row($rs2);
	$response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr,
    'total' => $total
  );
	echo json_encode($response);
};

//归档
if ($action == 'archives') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
	$sql = "select * from article where status_art = '$data[status_art]' order by time_art desc";
	$rs = mysqli_query($link, $sql);
	$arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
	}
  if($rs) {
    $response = array(
      'msg' => 'success',
      'code' => 200,
      'result' => $arr
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500,
      'result' => $arr
    );
    echo json_encode($response);
  }
};

//修改状态 ：删除放入回收站 、 回收站的撤销删除 、 草稿箱的发表
if ($action == 'recycl') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
	$sql = "update article set status_art = '$data[status_art]' where id_art = '$data[id_art]'";
  $rs = mysqli_query($link, $sql);
  if($rs) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
};

//彻底删除
if ($action == 'recycl-del') {
	$sql = "delete from article where status_art = '$_GET[status_art]' and id_art = '$_GET[id_art]'";
  $rs = mysqli_query($link, $sql);
  if($rs) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
};

//写文章
if ($action == 'write') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $tit_art = addslashes($data['tit_art']);
  $con_art = addslashes($data['con_art']);
  $cons_art = addslashes($data['cons_art']);
  $con_txt_art = addslashes($data['con_txt_art']);
	$sql = "insert into article(tit_art, con_art, cons_art, type_art, time_art, update_time_art, user_art, status_art, read_art, con_txt_art) values ('$tit_art', '$con_art', '$cons_art', '$data[type_art]', now(), now(), '$data[user_art]', '$data[status_art]', '$data[read_art]', '$con_txt_art')";

	if (mysqli_query($link, $sql)) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
	} else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
	}
};

//文章编辑
if ($action == 'art-edit') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $tit_art = addslashes($data['tit_art']);
  $con_art = addslashes($data['con_art']);
  $cons_art = addslashes($data['cons_art']);
  $con_txt_art = addslashes($data['con_txt_art']);
	$sql = "update article set tit_art = '$tit_art', con_art = '$con_art', cons_art = '$cons_art', type_art = '$data[type_art]', con_txt_art = '$con_txt_art', update_time_art = now(), status_art = '$data[status_art]' where id_art = '$data[id_art]'";
  $rs = mysqli_query($link, $sql);
  if ($rs) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
};

// 登录
if ($action == 'login') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "select count(*) from user_table where user_art = '$data[user_art]' and pwd_art = '$data[pwd_art]' limit 1";
  $rs = mysqli_query($link, $sql);
  list($total) = mysqli_fetch_row($rs);

  if($total == '1') {
    $time = time();
    $header = array(
        'typ' => 'JWT'
    );
    $array = array(
        'iss' => 'auth', // 权限验证作者
        'iat' => $time, // 时间戳
        'exp' => 3600, // token有效期，1小时
        'sub' => 'demo', // 案例
        'user_name' => $data['user_art']
    ) // 用户名
    ;
    $str = base64_encode(json_encode($header)) . '.' . base64_encode(json_encode($array)); // 数组转成字符
    $str = urlencode($str);
    $token = $str;
    $sql2 = "update user_table set token_art = '$token' where user_art = '$data[user_art]' and pwd_art = '$data[pwd_art]' limit 1";
    $rs2 = mysqli_query($link, $sql2);
    $response = array(
      'msg' => '登录成功~',
      'username'=> $data['user_art'],
      'token'=> $token,
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => '用户名或密码错误~',
      'code' => 500
    );
    echo json_encode($response);
  }
};

// 获取信息-无权限
if ($action == 'get-blog-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "select blog_name, blog_sign, author, sign, constellation, introduce, img_url, header_url, author_url from user_table limit 1";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }
	$response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr
  );
	echo json_encode($response);
};

// 获取信息-有权限
if ($action == 'get-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "select blog_name, blog_sign, author, sign, constellation, introduce, img_url, header_url, author_url, introduces from user_table where user_art = '$data[user_art]' and token_art = '$data[token_art]' limit 1";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }
	$response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr
  );
	echo json_encode($response);
};

// 编辑信息
if ($action == 'edit-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $blog_name = addslashes($data['blog_name']);
  $blog_sign = addslashes($data['blog_sign']);
  $author = addslashes($data['author']);
  $sign = addslashes($data['sign']);
  $introduce = addslashes($data['introduce']);
  $introduces = addslashes($data['introduces']);
  $constellation = addslashes($data['constellation']);
  $sql = "update user_table set blog_name = '$blog_name', blog_sign = '$blog_sign', author = '$author', sign = '$sign', introduce = '$introduce', constellation = '$constellation', img_url = '$data[img_url]', header_url = '$data[header_url]', author_url = '$data[author_url]', introduces = '$introduces' where user_art = '$data[user_art]' and token_art = '$data[token_art]'";
  $rs = mysqli_query($link, $sql);
  if ($rs) {
    $response = array(
      'msg' => '操作成功~',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => '操作失败~',
      'code' => 500
    );
    echo json_encode($response);
  }
};

// 新增图片
if ($action == 'add-photo') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $photo_con = addslashes($data['photo_con']);
	$sql = "insert into photo_table(user_art, photo_url, photo_con, creat_art, update_art) values ('$data[user_art]', '$data[photo_url]', '$photo_con', now(), now())";

	if (mysqli_query($link, $sql)) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
	} else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
	}
};

// 获取图片列表-有权限
if ($action == 'get-photo-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $pageNum = (int)$data['pageNum'];
	if($pageNum != 0) {
		$current = $pageNum;
	} else {
		$current = 1;
  };
  $limit = (int)$data['pageSize'];
	$start = ($current - 1) * $limit;
  $sql = "select * from photo_table where user_art = '$data[user_art]' limit $start,$limit";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }

  $sql2 = "select count(*) from photo_table where user_art = '$data[user_art]'";
  $rs2 = mysqli_query($link, $sql2);
  list($total) = mysqli_fetch_row($rs2);

  $response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr,
    'total' => (int)$total
  );
	echo json_encode($response);
};

// 获取图片列表-无权限
if ($action == 'get-blog-photo-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $pageNum = (int)$data['pageNum'];
	if($pageNum != 0) {
		$current = $pageNum;
	} else {
		$current = 1;
  };
  $limit = (int)$data['pageSize'];
	$start = ($current - 1) * $limit;
  $sql = "select * from photo_table limit $start,$limit";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }

  $sql2 = "select count(*) from photo_table";
  $rs2 = mysqli_query($link, $sql2);
  list($total) = mysqli_fetch_row($rs2);

  $response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr,
    'total' => (int)$total
  );
	echo json_encode($response);
};

// 编辑图片
if ($action == 'edit-photo-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $photo_con = addslashes($data['photo_con']);
  $sql = "update photo_table set photo_url = '$data[photo_url]', photo_con = '$photo_con', update_art = now() where user_art = '$data[user_art]' and photo_id_art = '$data[photo_id_art]'";
  $rs = mysqli_query($link, $sql);
  if ($rs) {
    $response = array(
      'msg' => '操作成功~',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => '操作失败~',
      'code' => 500
    );
    echo json_encode($response);
  }
};

// 获取图片详情
if ($action == 'photo-info') {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
  $sql = "select * from photo_table where user_art = '$data[user_art]' and photo_id_art = '$data[photo_id_art]' limit 1";
  $rs = mysqli_query($link, $sql);
  $arr = array();
	while ($row = mysqli_fetch_array($rs)) {
		$arr[] = $row;
  }
	$response = array(
    'msg' => 'success',
    'code' => 200,
    'result' => $arr
  );
	echo json_encode($response);
};

// 删除图片
if ($action == 'photo-del') {
	$sql = "delete from photo_table where user_art = '$_GET[user_art]' and photo_id_art = '$_GET[photo_id_art]'";
  $rs = mysqli_query($link, $sql);
  if($rs) {
    $response = array(
      'msg' => 'success',
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
};

// 统计访问数量
if ($action == 'counter') {
  @session_start();
  $counter = intval(file_get_contents("counter.dat"));  // 创建一个dat数据文件
  if(!$_SESSION['counter']) {
    $_SESSION['counter'] = true;
    $counter++;  // 刷新一次+1
    $fp = fopen("counter.dat","w");  // 以写入的方式，打开文件，并赋值给变量fp
    fwrite($fp, $counter);   // 将变量fp的值+1
    fclose($fp);
  }
  $sql = "select sum(read_art) as total_art from article";
  $rs = mysqli_query($link, $sql);
  if($rs) {
    $row = mysqli_fetch_array($rs);
    $response = array(
      'msg' => 'success',
      'counter' => $counter,
      'total' => (int)$row['total_art'],
      'code' => 200
    );
    echo json_encode($response);
  } else {
    $response = array(
      'msg' => 'fail',
      'code' => 500
    );
    echo json_encode($response);
  }
}

mysqli_close($link);
?>
