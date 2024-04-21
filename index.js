const { log, count } = require('console')
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

const mongoose = require('mongoose');

isLogin = false;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Trace');



    // const TraceSchema = new mongoose.Schema({
    //     name: String, 
    //     age : String, 
        
    //   });

    const signup = new mongoose.Schema({
    username:{ type:String, required:true},
    email : { type: String, required:true, unique:true} ,
    password: { type:String, required:true},
    From: String,
    To:String,
    number:String
        
      });


    //   const Trace = mongoose.model('Trace', TraceSchema);
      const sign_up = mongoose.model('signup', signup);


const port =80

// Express Stuff
app.use(express.static(path.join(__dirname,'public')))
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())


  

// Pug Specific Stuff


app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))




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


app.post('/bus_list',async (req, res)=>{
    // const from = req.body.From;
    // const to = req.body.To;

if(isLogin){

    const data = await sign_up.findOne({$and:[{From:req.body.From},{To:req.body.To}]})
    // const from1 =data.From;
    // const to1 =data.To;
    // const number = data.number;
if(data){
     res.status(200).render('bus_list', {number: data.number, from: data.From , to: data.To})}

     else{
        res.sendFile(path.join(__dirname,'/not_found.html'))
     }
}
else{
    res.sendFile(path.join(__dirname,'./login.html'))
}
})
// app.get('/bus_list',async (req, res)=>{

//      res.status(200).render('bus_list')
    
// })
// app.get('/bus_list',(req, res)=>{
//  res.render('bus_list', {number: 5, from: from2 , to: to2})

    
// })
app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname,'./login.html'))
    isLogin=true;
    
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

    isLogin=true;

})

app.get('/logout',(req, res)=>{
    res.sendFile(path.join(__dirname,'./login.html'))
    isLogin=false;
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




app.get('/signup',async(req, res)=>{
   
    res.sendFile(path.join(__dirname,'./signup.html'))
    isLogin=true;
    
})
app.post('/signup',(req, res)=>{
  
    isLogin=true;
    const data = new sign_up(req.body);

    data.save()
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500).send('Internal server error.');
      
    //   });
    
    res.sendFile(path.join(__dirname,'/index.html'))
  
 
 
    
    
})


app.get('/index', (req, res)=>{
    if(isLogin){
    res.sendFile(path.join(__dirname, 'index.html'))}
    else{
        res.sendFile(path.join(__dirname,'./login.html'))
    }
})

app.get('/book_now',(req, res)=>{
    if(isLogin){
    res.sendFile(path.join(__dirname, '/book_now.html'))}
    else{
        res.sendFile(path.join(__dirname,'./login.html'))
    }
})
app.post('/book_now',(req, res)=>{

    res.sendFile(path.join(__dirname, '/book_now.html'))
})


app.post('/ticket',(req, res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email=req.body.email;
    const number=req.body.number;
    const date= req.body.date;
    const bus_no=req.body.bus_no;
    res.render("ticket" ,{name:name, age:age, email:email, number:number, date:date, bus_number:bus_no})
})
app.get('/about',(req,res)=>
{
res.sendFile(path.join(__dirname, "/aboutus.html"))
})


app.get('/rail',(req,res)=>{
    if(isLogin){
    res.sendFile(path.join(__dirname,"/rail.html"))}
    else{
        res.sendFile(path.join(__dirname,'./login.html'))
    }
}

)
// Start Server

app.listen(port, ()=>{
log(`listning on port ${port}`)
})


}
main().catch(err => console.log(err));