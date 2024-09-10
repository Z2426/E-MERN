const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const userRoute = require('./routes/userRoutes.js');
const postRoute = require('./routes/postRoutes.js');
const autheRoute = require('./routes/autheRoute.js')
const connect = require('./config/db.js');
// Kết nối đến MongoDB
connect();

// Đọc file swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, './swagger/dist/swagger.json'), 'utf8'));

// Middleware để parse JSON
app.use(express.json());

// Cấu hình Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/authe', autheRoute)
// Lắng nghe trên cổng được chỉ định
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
