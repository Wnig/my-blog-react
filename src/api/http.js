import http from "../assets/js/fetch";

// 统计访问人数
export const counter = params => {
  return http.get(`/index.php?action=counter`);
};

// 获取文章列表
export const artList = params => {
  return http.post(`/index.php?action=art-list`, params);
};

// 获取文章详情
export const artDetail = params => {
  return http.post(`/index.php?action=art-detail`, params);
};

// 获取分页
export const artsList = params => {
  return http.post(`/index.php?action=arts-list`, params);
};

// 删除
export const recycl = params => {
  return http.post(`/index.php?action=recycl`, params);
};

// 彻底删除
export const recyclDel = params => {
  return http.get(
    `/index.php?action=recycl-del&status_art=${params.status_art}&id_art=${params.id_art}`
  );
};

// 写文章
export const write = params => {
  return http.post(`/index.php?action=write`, params);
};

// 编辑文章
export const artEdit = params => {
  return http.post(`/index.php?action=art-edit`, params);
};

// 登录-获取用户信息
export const login = params => {
  return http.post(`/index.php?action=login`, params);
};

// 获取信息-无权限
export const getBlogInfo = params => {
  return http.post(`/index.php?action=get-blog-info`, params);
};

// 获取信息-有权限
export const getInfo = params => {
  return http.post(`/index.php?action=get-info`, params);
};

// 编辑信息
export const editInfo = params => {
  return http.post(`/index.php?action=edit-info`, params);
};

// 上传图片
export const upload = params => {
  return http.post(`/upload.php?action=uploadQN`, params);
};

// 新增图片
export const addPhoto = params => {
  return http.post(`/index.php?action=add-photo`, params);
};

// 获取图片列表-有权限
export const getPhotoInfo = params => {
  return http.post(`/index.php?action=get-photo-info`, params);
};

// 获取图片列表-无权限
export const getBlogPhotoInfo = params => {
  return http.post(`/index.php?action=get-blog-photo-info`, params);
};

// 编辑图片
export const editPhotoInfo = params => {
  return http.post(`/index.php?action=edit-photo-info`, params);
};

// 获取图片详情
export const photoInfo = params => {
  return http.post(`/index.php?action=photo-info`, params);
};

// 删除图片
export const photoDel = params => {
  return http.get(
    `/index.php?action=photo-del&user_art=${params.user_art}&photo_id_art=${params.photo_id_art}`
  );
};
