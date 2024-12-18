var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var path = require('path');

// 读取dist目录下所有文件
function getAllFiles(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  let fileList = [];
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 如果是文件夹,递归读取
      fileList = fileList.concat(getAllFiles(filePath));
    } else {
      // 如果是文件,添加到列表
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 获取相对路径
function getRelativePath(fullPath, basePath) {
  const relativePath = path.relative(basePath, path.dirname(fullPath));
  return relativePath;
}

// 使用方法
const distPath = path.resolve(__dirname, 'dist');
const allFiles = getAllFiles(distPath);

// 遍历所有文件
allFiles.forEach(file => {
  // 获取文件相对于dist的路径
  const relativePath = getRelativePath(file, distPath);
  
  // 创建文件流
  const fileStream = fs.createReadStream(file);
  
  // 构建FormData
  const data = new FormData();
  // 如果有相对路径,就拼接到tpl-img后面
  const uploadPath = relativePath ? `tpl-img/${relativePath}` : 'tpl-img';
  data.append('filePath', uploadPath);
  data.append('f', fileStream);
  
  // 上传文件
  axios({
    method: 'post',
    url: 'http://play.devops.xxx.com/file/upload',
    headers: {
      ...data.getHeaders()
    },
    data: data
  })
  .then(response => {
    console.log(`文件 ${file} 上传成功:`, response.data);
  })
  .catch(error => {
    console.log(`文件 ${file} 上传失败:`, error);
  });
});