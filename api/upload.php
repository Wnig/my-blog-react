<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type:text/html;charset=utf-8');
$action = $_GET['action'];

// 上传到服务器
if ($action == 'upload') {
  //图片文件的生成
  $savename = date('YmdHis',time()).mt_rand(0,9999);
  //获取图片文件的类型
  $file_type = $_FILES["file"]["type"];
  $type = '';

  switch ($file_type) {
    case 'image/png':
      $type = '.png';
      break;
    case 'image/gif':
      $type = '.gif';
      break;
    case 'image/jpeg':
      $type = '.jpg';
      break;
  }

  //图片保存的路径
  $savepath = '../upload/'.$savename.$type; // upload.php文件在api文件夹里，upload文件夹和api文件夹同级

  //生成一个URL获取图片的地址
  $url = "http://www.xxxiwnig.com/upload/" . $savename.$type; // 线上地址
  // $url = "http://localhost/my-blog/upload/" . $savename.$type; // 本地地址

  $rs = move_uploaded_file($_FILES["file"]["tmp_name"],$savepath);
  if($rs) {
    $data["code"] = 200;
    $data["msg"] = '上传成功';
    $data["errno"] = $_FILES["file"]["error"];
    $data["data"] = $savepath;
    $data['url'] = "{$url}";
    echo json_encode($data);
  } else {
    $data["code"] = 500;
    $data["msg"] = '上传失败';
    $data["errno"] = $_FILES["file"]["error"];
    echo json_encode($data);
  }
}

require_once "./php-sdk-7.2.10/autoload.php";
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

// 上传到七牛云
if($action == 'uploadQN') {
  $accessKey = 'mZKaWhh3Jxi3Gr2yfQX-tdWpR8EytF6YYdMbr2il';
  $secretKey = 'AX6TYfgPrGEkEav-JwojfG4dE7GuG9C2PsNdHSo7';
  $bucket='xxxiwnig';
  $expires = 6000;
  // 初始化签权对象
  $auth = new Auth($accessKey, $secretKey);

  $policy = array(
    'callbackBody' => 'key=$(key)&hash=$(etag)&bucket=$(bucket)&fsize=$(fsize)&name=$(x:name)',
    'callbackBodyType' => 'application/json'
  );
  $token = $auth->uploadToken($bucket, null, $expires, $policy, true);
  // 构建 UploadManager 对象
  $uploadMgr = new UploadManager();

  // 要上传文件的本地路径
  $filePath = $_FILES['file']['tmp_name'];
  //图片文件的生成
  $savename = date('YmdHis',time()).mt_rand(0,9999);
  $file_type = $_FILES["file"]["type"];
  $type = '';

  switch ($file_type) {
    case 'image/png':
      $type = '.png';
      break;
    case 'image/gif':
      $type = '.gif';
      break;
    case 'image/jpeg':
      $type = '.jpg';
      break;
  }

  // 上传到七牛后保存的文件名
  $name = $savename.$type;
  list($ret, $err) = $uploadMgr->putFile($token, $name, $filePath);
  $path = "http://qn.xxxiwnig.com/".$savename.$type;
  if ($err !== null) {
    $data["code"] = 500;
    $data["msg"] = '上传失败';
    $data["errno"] = $_FILES["file"]["error"];
    echo json_encode($data);
  } else {
    $data["code"] = 200;
    $data["msg"] = '上传成功';
    $data["errno"] = $_FILES["file"]["error"];
    $data['data'] = $name;
    $data['path'] = $path;
    echo json_encode($data);
  }
}
?>
