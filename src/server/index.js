const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT =  4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post("/verify-token", async (req,res) => {
    try{
        let token = req.body;
        // replace APP_SECRET_KEY with your reCAPTCHA secret key
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${'APP_SECRET_KEY'}&response=${token}`);
        return res.status(200).json({
            success:true,
            message: "Token successfully verified",
            data: response.data
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Error verifying token"
        })
    }
});

app.listen(PORT,() => console.log(`App started on port ${PORT}`));