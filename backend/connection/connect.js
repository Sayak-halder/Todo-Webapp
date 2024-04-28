const mongoose=require( 'mongoose');

const conn=async(req,res)=>{
    try{
        await mongoose.connect(CONNECT_URL_DATABASE)
        .then(()=>{
            console.log('connected to db')
        });
    }catch(error){
        res.status(400).json({
            message:"not connected"
        });
    }
};

conn();