const router=require("express").Router();
const User=require("../models/user");
const List=require("../models/list");

// CREATE
router.post("/addTask",async(req,res)=>{
    try {
        const {title,description,id}=req.body;
        const existinguser=await User.findById(id);
        if(existinguser){
            const list=new List({title,description,user:existinguser});
            await list.save().then(()=>{
                res.status(200).json({list});
            })
            existinguser.list.push(list);
            existinguser.save();
        }else{
            res.status(200).json({message:"Please sign in"});
        }
    } catch (error) {
        // res.status(200).json({message:"Something went wrong!"});
        console.log(error);
    }
});

// UPDATE
router.put("/updateTask/:id",async(req,res)=>{
    try {
            const {title,description}=req.body;
            const list=await List.findByIdAndUpdate(req.params.id,{title,description});
            list.save().then(()=>res.status(200).json({
                message:"The task has been updated successfully"
            }));
    } catch (error) {
        res.status(200).json({message:"Something went wrong!"});
        // console.log(error);
    }
});

// DELETE
router.delete("/deleteTask/:id",async(req,res)=>{
    try {
        const {id}=req.body;
        const existinguser=await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
        if(existinguser){
            await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({
                message:"The task has been deleted successfully"
            }));
        }
    } catch (error) {
        res.status(200).json({message:"Something went wrong!"});
        console.log(error);
    }
});

// GETTASK
router.get("/getTask/:id",async(req,res)=>{
    const list=await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length!==0){
        res.status(200).json({list});
    }else{
        res.status(200).json({message:"No task to show"});
    }
});

module.exports=router;