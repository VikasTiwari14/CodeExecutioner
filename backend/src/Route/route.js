const express = require('express');
const router = express.Router();
const questionCollection = require('../Database/questionDb');
const userCollection = require('../Database/userDb')

// Next two routes are for user database

router.post('/login', async(req, res) => {
    try{
        const user = await userCollection.findOne({ email: req.body.email});
        if(user){
            if(user?.password === req.body.password){
                res.json({
                    success: true,
                    message: "User Found",
                    data: user
                })
            }
        }
        else{
            res.json({
                success:false,
                message:"Invalid Credentials",
                data: null
            })
        }
    }
    catch(err){
        res.json({
            success:false,
            message:"Some Error Occured",
            data: null
        })
    }
})

router.post('/register', async(req, res) => {
    try{
        const user = await userCollection.findOne({email: req.body.email});
       
        if(user){
            res.json({
                success:false,
                message:"User Already Registered",
                data: null
            })
        }
        else{
            const existingData = await userCollection.find();
            let idNumber = 1000 + existingData.length;
            const newUser = new userCollection({
                id: idNumber,
                name: req.body.name,
                email : req.body.email,
                password : req.body.password,
                mobile : req.body.mobile,
                image: req.body.image,
                questionPosted: req.body.questionPosted,
                questionSolved : req.body.questionSolved
            })
            const result = await newUser.save()
            res.status(200).json({
                success: true,
                message:'User Registered Successfully',
                data: result
            })
        }
    }
    catch(err){
        res.json({
            success:false,
            message:"Some Error Occured",
            data: null
        })
    }
})

router.get('/get/question/user/id/:id', async(req, res) => {
    try{
        const user = await userCollection.findOne({id: req.params.id});
        let data = [];
        for(let i = 0;i<user?.questionPosted?.length;i++){
            let ques = await questionCollection.findOne({ id : parseInt(user?.questionPosted[i])});
            if(ques)
                data.push(ques);
        }
        console.log(data);
        if(data && data.length > 0){
            res.status(200).json({
                success: true,
                message:'Completed Questions List Retrieved Successfully',
                data: data
            })
        }
        else{
            res.status(200).json({
                success: false,
                message:'No Questions Found',
                data: []
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})


router.put('/add/question/in/question-posted/id/:id/questionId/:questionId', async(req, res) => {
    try{
        const result = await userCollection.findOne({id : req.params.id});
        if(result){
            let posted = result;
            posted.questionPosted.push(req.params.questionId);
            console.log(posted)
            const update = await userCollection.findOneAndUpdate({_id : result._id}, posted);
            res.json({
                success: true,
                message:'Question added to the user profile',
                data: posted
            })
        }
        else{
            res.json({
                success: false,
                message: "No user found",
                data: null
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})

router.put('/add/question/in/question-solved/id/:id/questionId/:questionId', async(req, res) => {
    try{
        const result = await userCollection.findOne({id : req.params.id});
        if(result){
            let posted = result;
            posted.questionSolved.push(req.params.questionId);
            const update = await userCollection.findOneAndUpdate({_id : result._id}, posted);
            res.json({
                success: true,
                message:'Question added to the user profile 2',
                data: posted
            })
        }
        else{
            res.json({
                success: false,
                message: "No user found",
                data: null
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})

// remaining routes are for question database

router.post('/upload/question', async(req, res) => {
    console.log(req.body)
    try{
        const existingData = await questionCollection.find();
        let idNumber = 100000 + existingData.length;
        const ques = new questionCollection({
            id: idNumber,
            link: req.body.link,
            label: req.body.label,
            comment: req.body.comment,
            postedAt: req.body.postedAt,
            user: req.body.user,
            author: req.body.author
        })

        const result = await ques.save()
        res.status(200).json({
            success: true,
            message:'Question Added Successfully',
            data:result
        })
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})

router.get('/home', async(req, res) => {
    try{

    }
    catch(err){
        res.json({
            success:false,
            message:"Some Error Occured",
            data: null
        })
    }
})

router.get('/get/all/question', async(req, res) => {
    try{
        const data = await questionCollection.find();
        if(data && data.length > 0){
            res.status(200).json({
                success: true,
                message:'Questions List Retrieved Successfully',
                data:data
            })
        }
        else{
            res.status(200).json({
                success: false,
                message:'No Questions Found',
                data: []
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})

router.get('/get/completed/question/id/:id', async(req, res) => {
    try{
        const user = await userCollection.findOne({id: req.params.id});
        let data = [];
        for(let i = 0;i<user?.questionSolved?.length;i++){
            let ques = await questionCollection.findOne({ id : parseInt(user?.questionSolved[i])});
            if(ques)
                data.push(ques);
        }
        console.log(data);
        if(data && data.length > 0){
            res.status(200).json({
                success: true,
                message:'Completed Questions List Retrieved Successfully',
                data: data
            })
        }
        else{
            res.status(200).json({
                success: false,
                message:'No Questions Found',
                data: []
            })
        }
    }
    catch(err){
        res.json({
            success:false,
            message:"Some Error Occured",
            data: null
        })
    }
})

router.get('/get/pending/question/id/:id', async(req, res) => {
    try{
        const user = await userCollection.findOne({id: req.params.id});
        const ques = await questionCollection.find();
        let data = [];
        for(let j=0;j<ques?.length;j++){
            let i;
            for(i = 0;i<user?.questionSolved?.length;i++){
                if(ques[j]?.id === parseInt(user?.questionSolved[i])){
                    break;
                }
            }
            if(i===user?.questionSolved?.length){
                data.push(ques[j])
            }
        }
        
        console.log(data);
        if(data && data.length > 0){
            res.status(200).json({
                success: true,
                message:'Pending Questions List Retrieved Successfully',
                data: data
            })
        }
        else{
            res.status(200).json({
                success: false,
                message:'No Questions Found',
                data: []
            })
        }
    }
    catch(err){
        res.json({
            success:false,
            message:"Some Error Occured",
            data: null
        })
    }
})

router.get('/get/question/by/id/:id', async(req, res) => {
    try{
        const ques = await questionCollection.findOne({ id: req.params.id });
        if(ques){
            res.json({
                success: true,
                message:'Question Found',
                data: ques
            })
        }
        else{
            res.json({
                success: false,
                message:'No Question Found',
                data: null
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})
router.put('/mark/pending/as/completed', async(req, res) => {
    try{
        const ques = await questionCollection.findOne({ id: req.body.id });
        if(ques){
            let obj = {
                language: req.body.language,
                code: req.body.code,
                user: req.body.user,
                solvedAt: req.body.solvedAt
            }
            let sol = ques;
            sol.solution.push(obj);
            sol.solved = true;
            const update = await questionCollection.findByIdAndUpdate(ques._id, {$set : sol});
            res.json({
                success: true,
                message:'Question is marked as Completed',
                data: update
            })
        }
        else{
            res.json({
                success: false,
                message:'No Question Found',
                data: null
            })
        }
    }
    catch(err){
        res.json({
            success: false,
            message:'Some Error Occured',
            data: null
        })
    }
})


module.exports=router;