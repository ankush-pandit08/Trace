const { log } = require('console')
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

const mongoose = require('mongoose');


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Trace');



    // const TraceSchema = new mongoose.Schema({
    //     name: String, 
    //     age : String, 
        
    //   });

    const signup = new mongoose.Schema({
    username:{ type:String, required:true
    , },
    email : { type: String, required:true, unique:true} ,
    password: { type:String, required:true},
    From: String,
    To:String
        
      });


    //   const Trace = mongoose.model('Trace', TraceSchema);
      const sign_up = mongoose.model('signup', signup);


const port =80

// Express Stuff
app.use(express.static(path.join(__dirname,'public')))
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())

// Pug Specific Stuff

// app.use('view engine', 'pug');
// app.use(path.join(__dirname,'/views'));


// Roots 

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './signup.html'));
})

// app.get('/form', (req, res)=>{
//     res.sendFile(path.join(__dirname, './form.html'));
// })

// app.post('/form', (req, res)=>{
//     res.sendFile(path.join(__dirname, './form.html'));
//     const document = new Trace(req.body);
//     document.save().then(()=>{
//        res.send("Form Submitted")
//     }).catch(()=>{
//         res.send("There is some issue from your-side.")
//     }) 
// })
app.get('/admin',(req, res)=>{
    res.sendFile(path.join(__dirname,'./login.html'))
    
    
})
app.post('/admin',(req,res)=>{
    req.body.email='abc@gmail.com';
    req.body.username='vaanpand';
    password='geek'
    const data = new sign_up(req.body);
    data.save();
    res.sendFile(path.join(__dirname,'/admin.html'))
})
app.post('/index',(req, res)=>{
    const from = req.body.From;
    const to = req.body.To;

    res.sendFile(path.join(__dirname,'./bus_list.html'))
    
})
app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname,'./login.html'))
    
})

app.post('/login',async(req, res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;

        const user_data= await sign_up.findOne({email:email})
        const pass = user_data.password;

        if(password===pass){
            res.sendFile(path.join(__dirname,'./index.html'))
        }

        else if(email==='abc@gmail.com' && password ==='geek'){
            res.sendFile(path.join(__dirname,'./admin.html'))
            
        }
        else{
            res.send("Login Details is Invalid!")
        }


    } catch (error) {
        res.status(404).send("Something Went Wrong!")
    }

})

app.get('/logout',(req, res)=>{
    res.sendFile(path.join(__dirname,'./login.html'))
})
// app.post('/login',(req, res)=>{
//     const user_name = req.body.user_name;
//     const password = req.body.password;

// Found = 0
// Found=sign_in.find({$and: [{user_name: user_name},
// {password: password}]})

// if(Found){
//     log(Found)
//     res.sendFile(path.join(__dirname,'./index.html'))}

//     else{
//         log(Found)
//         res.send("Invalid User Please SignUp")
//         res.sendFile(path.join(__dirname,"./index.html"))
//     }
// })



app.get('/signup',(req, res)=>{
   
    res.sendFile(path.join(__dirname,'./signup.html'))
    
})
app.post('/signup',(req, res)=>{
    
    
    const data = new sign_up(req.body);
    data.save();
    res.sendFile(path.join(__dirname,'/index.html'))
    
})


// Start Server

app.listen(port, ()=>{
log(`listning on port ${port}`)
})

}
main().catch(err => console.log(err));