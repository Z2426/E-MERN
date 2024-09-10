const fs = require('fs');
const path = require('path');

// Hàm đọc file JSON
const readJSONFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Error reading or parsing file ${filePath}:`, error);
        return {};  // Trả về đối tượng rỗng nếu có lỗi
    }
};

// Đọc và kết hợp tất cả các file trong thư mục paths
const pathsDir = path.join(__dirname, 'paths');
const pathsFiles = fs.readdirSync(pathsDir);

let paths = {};
pathsFiles.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(pathsDir, file);
        console.log(`Reading file: ${filePath}`);

        // Đọc nội dung file và kết hợp vào paths
        const filePaths = readJSONFile(filePath);
        paths = { ...paths, ...filePaths };
    }
});

// Đọc và kết hợp tất cả các file trong thư mục components
const componentsDir = path.join(__dirname, 'components');
const componentsFiles = fs.readdirSync(componentsDir);

let components = {};
componentsFiles.forEach(file => {
    if (path.extname(file) === '.json') {
        const filePath = path.join(componentsDir, file);
        console.log(`Reading file: ${filePath}`);

        // Đọc nội dung file và kết hợp vào components
        const fileComponents = readJSONFile(filePath);
        components = { ...components, ...fileComponents };
    }
});

// Đọc các phần còn lại
const info = readJSONFile(path.join(__dirname, 'info.json'));
const servers = readJSONFile(path.join(__dirname, 'servers.json'));

// Kết hợp các thành phần vào một tài liệu Swagger hoàn chỉnh
const swaggerDocument = {
    openapi: '3.0.0',
    info: info,
    servers: servers,
    paths: paths,
    components: components
};

// Đường dẫn file swagger.json
const swaggerFilePath = path.join(__dirname, './dist/swagger.json');

// Tạo thư mục nếu không tồn tại
fs.mkdirSync(path.dirname(swaggerFilePath), { recursive: true });

// Ghi file JSON kết hợp
fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerDocument, null, 2));

console.log('Swagger JSON file created successfully at', swaggerFilePath);
