const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");

//SIGNUP
router.post("/register",async(req,res)=>{
    try {
        const {email,username,password}=req.body;
        const hashpassword=bcrypt.hashSync(password);
        const user=new User({email,username,password:hashpassword});
        await user.save()
        .then(()=>
            res.status(200).json({message:"Sign up successfully"})
        )
    } catch (error) {
        // console.log(error);
        res.status(200).json({message:"user already exists"});
    }
});

//SIGNIN
router.post("/signin",async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).json({message:"Please sign up first"});
        }

        const ispasswordcorrect=bcrypt.compareSync(req.body.password,user.password);
        if(!ispasswordcorrect){
            return res.status(200).json({message:"Please enter the correct password"});
        }

        const {password,...others}=user._doc;
        res.status(200).json({others});
    } catch (error) {
        // console.log(error);
        res.status(200).json({message:"user already exists"});
    }
});

module.exports=router;