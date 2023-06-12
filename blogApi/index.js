const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))

async function connectDB(){
    await mongoose.connect(process.env.MONGO_URL)
    .then(console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
}

connectDB();

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"images")
    },
    filename:(req,file,cb) => {
        // let orgFileName = req.body.name.split("function now() { [native code] }")
        cb(null,req.body.name);
    }
})

const upload = multer({storage: storage});
app.post('/api/upload',upload.single("file"),(req,res) => {
    res.status(200).json("Dosya yüklendi.");
})

app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);

app.listen(PORT,()=>{
    console.log(`App Started ${PORT} PORT`);
})
