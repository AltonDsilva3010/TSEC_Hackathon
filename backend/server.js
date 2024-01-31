const express = require("express")
const bodyParser = require("body-parser")
const twilio = require("twilio")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())
const accountSID = "AC2d7c82683f4fb93432584052652fbb72"
console.log(accountSID)
const authToken = "d045fcfd9919eb172aa68616ac2f1f16"
const client = new twilio(accountSID,authToken)
const DATABASE_URL = "mongodb+srv://crce9207cs:KJP0o30GiqMVit36@cluster0.i3atq5g.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL , {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

const db = mongoose.connection;

const otpSchema = new mongoose.Schema({
    phoneNumber : String,
    otp : String
})

const otpModel = mongoose.model("Otp" , otpSchema)

const generateOTP = ()=>{
    return Math.floor(100000 + Math.random() * 9000000);
}
app.post("/hello",(req,res)=>{
    res.send("HELLO")
})
app.post("/send-otp",(req,res)=>{
    console.log("req" , req.body)
    const {phoneNumber} = req.body
    const otp = generateOTP()
    console.log("OTP" , otp)
    const otpDoc = new otpModel({phoneNumber,otp});
    otpDoc.save()

    
    client.messages
        .create({
            body : `Your OTP is ${otp} `,
            from : "+19203548201",
            to : phoneNumber
        }).then(()=>{
            res.send({success : true , otp : otp})
        }).catch(err=>{
            console.log(err)
            res.status(500).send({success : false , error : "Failed To Send OTP"})
        })
})
app.post("/verify-otp" , async (req,res)=>{
    const {phoneNumber,otp} = req.body

    try{
        const otpDoc = await otpModel.findOne({phoneNumber,otp})
        if(otpDoc){
            res.send({success : true})
        }else{
            res.status(401).send({success : false,error : "Error verifying OTP"})
        }
    }catch(err ){
        console.log(err)
        res.status(500).send({success : false , error : 'Error in Verifying Otp'})
    }
})
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})