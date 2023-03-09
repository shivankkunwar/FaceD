const express=  require("express");
const bodyParser= require('body-parser');
const bcrypt=require('bcryptjs');
const cors=require('cors');
const { response } = require("express");


const knex = require('knex')

const db=knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user : 'postgres',
        password :'',
        database : 'test1'
        // connectionString : process.env.DATABASE_URL,
        // ssl:{ rejectUnauthorized: false },
    }
  });

  console.log(db.select('*').from('users'))

//  db.select('*').from('users').then(data=> 
//     {
//         console.log(data);
//     });
const app=express();
app.use(bodyParser.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.json("it is working");
})

app.post('/signin',(req,res)=>{
    
    db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isvalid=bcrypt.compareSync(req.body.password,data[0].hash);
        console.log(isvalid)
        if(isvalid){
            return  db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user =>{
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'));
        }else{
            res.status(400).json(`wrong credentials ${err}`)
        }
        
    })
    .catch(err => res.status(400).json(`wrong credentials ${err}`))
})

app.post('/register',async (req,res)=>{
    const { email , name , password }=req.body; 
    console.log(req)
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password,salt);
   if(!email || !name || !password){
    return res.status(400).json("incorrect form submission");
   }
        db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return  trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name:name,
                joined:new Date()
            })
            .then(user=>{
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
        })
        .catch(err=>{
        res.status(400).json(`unable to Join${err}`);
        })

})

app.get("/profile/:id",(req,res)=>{
    const { id } = req.params;
    
   db.select('*').from('users').where({id}).then(user=>{

    if(user.length){
        res.json(user[0]);
    }
    else{
        res.status(400).json('not found');
    }
   }).catch(res=>{
    res.status(400).json("error getting user ")
   })

    // if(!found){
    //     res.status(400).json('not found');
    // }


})


app.put('/image',(req,res)=>{
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    }).catch(err=>res.status(400).json('unable to get entries'))
} )
app.listen(process.env.PORT||3000,()=>{

    console.log(`app is running perfectly on ${process.env.PORT}`)
});

/*
 * /-->res=root is working
 * /signin --> POST=success/fail
 *  /register -->POST=user
 * /profile/:userID -->GET= user
 * /image --> PUT --> user
 * 
 * 
 */ 