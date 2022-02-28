// imports 
const express = require('express')
const app = express()
const http = require('http')
require('dotenv').config()
const body_parser = require('body-parser');
const port = process.env.PORT || 3080;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
var multer = require('multer');

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
const server = http.createServer((req, res) => {
  console.log('hellow world')
})

// multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

// mogoose config
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { receiveMessageOnPort } = require('worker_threads');
mongoose.connect(process.env.MONGO_URI);

// user modal
var user_details = new mongoose.Schema({
  first_name: String,
  second_name: String,
  email: String,
  current_password: String,
  date: String,
  gender: String,
  profile_image:String,
  Likes:Number,
  cover_photo:String,
  authorized:Boolean,
  verification : [{
    timestamp : Number,
    code:String
  }],
  posting:[{
    post_data : String,
    image:String,
    time:String
  }],
  outgoing_reqs : [{
    status:String,
    to:String
  }],
  incoming_reqs : [{
    status:String,
    from:String,
    name:String,
    profile_pic:String
  }],
  friends:[{
    id:String
  }]
  
},{ typeKey: '$type' })

// user
var user = mongoose.model('Social_user', user_details);

// making transporter to send email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user,
    pass: process.env.password
  }
});

// this function generates a random string which is used for otp
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&^%$';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

// this function is for sending mail
function send_mail(otp,mail_value,name_value){
  var mailOptions = {
    from: process.env.user,
    to: mail_value,
    subject: 'Email for Verification',
    text: `Hello ${name_value}
    You registered an account on Social book, Here is your otp for verification - ${otp}
    Kind Regards, Socialbook`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {console.log(error);} 
    else {console.log('Email sent: ' + info.response);}
  });
}

app.use('/icons', express.static('icons'));
app.use('/public', express.static('public'));
app.use('/views', express.static('views'));


const authToken = async(req,res,next)=>{
  try{
    const authHeader = req.headers['x-auth-token']
    const verified = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
    const user_data = await user.find({_id:verified.id})
    const final_data = {first_name:user_data[0].first_name,second_name:user_data[0].second_name,date:user_data[0].date,gender:user_data[0].gender,id:verified.id,profile_image:user_data[0].profile_image}
    req.user_data = final_data
    // console.log('kitni baar chla')
    next();

  }
  catch(err){
    res.status(400).json({message:'not right',status:400});
    console.log(err)
  }
}

const authToken_2 = async(req,res,next)=>{
  try {
    const authHeader = req.headers['x-auth-token']
    const verified = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
    next()
    
  } catch (err) {
    res.status(400).json({message:'not right',status:400});
    console.log(err)
  }
}

app.post('/getdata' , authToken,(req,res) =>{
  // console.log('kitni baar chla ye getdata')
  res.status(201).json({message:'authorized',status:201,userdata:req.user_data});
})
// post request for signing up
app.post('/register', function (req, res) {
// these are the values of sign up form
    first_name = req.body.first_name,
    second_name = req.body.second_name,
    email = req.body.email,
    current_password = req.body.current_password,
    date = req.body.date,
    gender = req.body.gender,
    authorized = false,
    profile_image = process.env.default_profile_pic
    // otp is in const because otherwise it makes a new string every time we use this variable
    const otp = makeid(6)
// here we saved those values in the new user to be saved in database 
    var new_user = new user({ first_name: first_name, second_name: second_name, email: email, current_password: current_password, date: date, gender: gender,authorized:authorized,profile_image:profile_image, verification : [{
      timestamp : Date.now(),
      code:otp
    }] });
// searching the email entered by the user in database if it exists or not
  user.find({ email: req.body.email }, function (err, data) {
    if (data.length == 0) {
      // this if condition validates the form in case js is off in some browser it also checks if password length is less than 7
      if(first_name== '' || second_name=='' || email=='' || current_password =='' || date=='' || gender=='' || current_password.length<7 ){
      }
      else{
        // if the user doesnot exist we send a verification code to verify that the email entered is not fake 
      // sending email for verification
        send_mail(otp,req.body.email,req.body.first_name)
        console.log('in saving')
      // here we saved users details in the database
        new_user.save(function (err_2, data_2) {
          if (err) return console.error(err_2);
          else { }
        });
      // from here we go to the verification form 
      // res.redirect('/verify')
      res.status(201).json({message:'data saved',status:201});
      }
    }
    else {
      if(data[0].authorized == true){
        res.status(202).json({message:'user already exists' , status : 202})
        console.log('user already exists')
      }
      else{
        current_time_stamp =  data[0].verification[0].timestamp
 //updated account creds without changing otp because otp is not expired yet and someone tried to fill the form again with same email address
        if(((Date.now())-current_time_stamp ) < 120000){
          // updated values of form beacuse we refilled the forms
          first_name = req.body.name
          second_name = req.body.second_name,
          email = req.body.email,
          password = req.body.password,
          date = req.body.date,
          gender = req.body.gender
          var changing_account_creds = { $set: { first_name: first_name, second_name: second_name, email: email, current_password: current_password, date: date, gender: gender,authorized:authorized} };
          user.updateOne({ email: email }, changing_account_creds, function (err, result) {
            if (err) throw err;
            else {
              console.log('goinf to verification')
            }
            var otp = data[0].verification[0].code
            mail_value = data[0].email
            name_value = req.body.name
            send_mail(otp,mail_value,name_value)
            res.status(201).json({message:'going to verificatiom' , status:201})
          });
        }

//updated account creds with changing otp because otp is not expired yet and someone tried to fill the form again with same email address
        else{
          // updated values of form beacuse we refilled the form
          const new_otp = makeid(6)
          var name_value = req.body.name
          second_name = req.body.second_name,
          email = req.body.email,
          current_password = req.body.current_password,
          date = req.body.date,
          gender = req.body.gender
          var changing_account_creds_2 = { $set: { first_name: name_value, second_name: second_name, email: email, current_password: current_password, date: date, gender: gender,authorized:authorized ,verification:[{
            timestamp:Date.now(),
            code: new_otp
          }]} };
          user.updateOne({ email: email }, changing_account_creds_2, function (err, result_2) {
            if (err) throw err;
            else {mail_value = data[0].email
              send_mail(new_otp,mail_value,name_value)
              res.status(201).json({message:'data saved',status:201});}
          });
        }
      }
    }
  })
})

app.post('/sign', function (req, res) {
  
  user.find({ email: req.body.email }, function (err, data) {
    if (data.length == 0) {
      res.status(442).json({error:'invalid username or password',status:442})
      console.log('invalid username or password')
    }
    else {
      if (req.body.current_password == data[0].current_password) {
          if (data[0].authorized == true) {
            const token = jwt.sign({id:data[0].id , first_name:data[0].first_name, second_name:data[0].second_name},process.env.ACCESS_TOKEN)
            res.status(201).json({message:'you are verified',status:201 , token:token});
            console.log('you are verified')
          }
          else {
            res.status(422).json({error:'you are not verified yet',status:422});
            console.log('you are not verified yet')
          }
      }
      else {
        res.status(442).json({error:'invalid username or password',status:442});
        console.log('invalid username or password')
      }
    }
  })
})

app.post('/verify/:first_name/:email', function (req, res) {
  const email = req.params.email
  const first_name = req.params.first_name
  user.find({email:email},function(err,data_2){
    if(err){
      console.log(err)
    }
    else{
      // if current time minus the time when user got the otp is less than 12000(2 minutes) then we check otp is correct or not
      current_time_stamp = data_2[0].verification[0].timestamp
      if (((Date.now())-current_time_stamp ) < 120000) {
        if(req.body.verification_code == data_2[0].verification[0].code){
          // here we update authorized value to true in our database so next time if someone tries to sign up with this email we can tell that user already exists
          var new_val = { $set: { authorized: true } };
          user.updateOne({ email: email }, new_val, function (err, result) {
          if (err) throw err;
          else {res.status(201).json({message:'Congrats you are verified now' , status:201})}
          });
        }
        // wrong otp go back to main page
        else{
          console.log('incorrect')
          res.status(432).json({error:'incorrect passowrd' , status:432})
          }
      }
      // now we come to this else condition only if the current time minus the time when user got the otp is greater than 2min which is the time to expire our otp 
      // so we change the otp now
      else {
        // updating time stamp value and generating new otp
        const otp = makeid(6)
        var new_val = { $set: { verification: [{
          timestamp:Date.now(),
          code:otp
        }]}};
        user.updateOne({ email: email }, new_val, function (err, result) {
        if (err) throw err;
        else {send_mail(otp,email,first_name)
        console.log('otp sent again')
        res.status(442).json({error:'otp changed' , status:442})}
      });
      }
    }
  })
})

// post request for forgot password
app.post('/forgot_password',function(req,res){
  email = req.body.email
  current_password = req.body.current_password
  new_password = req.body.new_password
  user.find({email:email},function(err,data){
    if(data.length == 0){
      res.status(404).json({message:'no user found' , status:404})
    }
    
    else if(err) {
      console.log(err)
    }

    else{
        if(data[0].current_password == current_password){
        var new_val = { $set: { current_password: new_password } };
        user.updateOne({ email: email }, new_val, function (err, result) {
          if (err) throw err;
          else {
            res.status(201).json({message:'password changed' , status:201})
            console.log('password changed')
          }
        });
      }
      else{
        res.status(403).json({message:'wrong password' , status:403})
        console.log('wrong_password')
      }
    }
  })
})

app.post('/post',(req,res)=>{
  post_data = req.body.post
  image_url = req.body.url
  const user_id = req.headers['x-auth-token']
  const verified = jwt.verify(user_id, process.env.ACCESS_TOKEN);

  var new_val = { $push: {posting: [{
    post_data: post_data,
    image: image_url,
    time:Date.now()
  }]} };
  user.updateOne({ _id: verified.id }, new_val, function (err, result_2) {
    if (err) console.log(err);
    else {console.log('posted')}
  });
})
app.post('/searchResults',authToken_2,(req,res)=>{
  searches = req.body.searchquery
    user.find({first_name:{$regex:`(?i)^${searches}`}}, function(err, result){
      let response_array = []
      if(err){
          console.log(err)
      }
      else{
          if(searches==''){
            res.send({response_array:'No results'})
          }
          else{
            for(let i = 0 ; i<=(result.length-1);i++){
              response_array.push({first_name:result[i].first_name,second_name:result[i].second_name,id:result[i].id})
            }
            res.send({response_array:response_array})
            console.log(response_array)
          }
      }
  })
})
app.post('/profile/:id',authToken_2,(req,res)=>{
  id_value = req.params.id
  const authHeader = req.headers['x-auth-token']
  // sender id is the id of the user who is currently logged in
  const sender_id = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
  user.find({_id:id_value},function(err,data){
    if(err)console.log(err)
    else{
      var isfriend = 1
      friend_list = data[0].friends
      for (let k = 0; k <data[0].friends.length; k++) {
        if(data[0].friends[k].id == sender_id.id){
          isfriend=0
          break
          // value 0 means that the user has been found in the friends section of the user whose database we are checking 
        }
        else{
          isfriend=1
        }
        
      }

      if(isfriend==1){
        var already_sent = 0
        var outgoing_req = 0
        // this code down below first check if there is any request from this person whose profle we are checking if not then we check if we send it a request or not
        // logic behind using outgoing here :- yaha par outgoing islie use kia h kuki hum jiski profile view kar rhe h hum uski id se database search kar rhe h to agar is user ke outgoing m hme apni id mil jaati h to matlab isne hume friend request bheji h jo hum apne id m dekh rhe h to islie agar uske outgoing m hmari id milegi to hum confirm reqs kar sakte h
        for (let j = 0; j<data[0].outgoing_reqs.length; j++) {
          if(data[0].outgoing_reqs[j].to==sender_id.id){
            // res.send({status:'sent'})
            outgoing_req = 1
            break
            // we use break here because even if outgoing_req value is changed to 1 here the loop will keep going till the end and value will be 0 after that always
          }
          else{
            outgoing_req = 0
          }
        }
        if(outgoing_req == 1){
          res.send({first_name:data[0].first_name,second_name:data[0].second_name,status:'Confirm Req',profile_image:data[0].profile_image,cover_image:data[0].cover_photo})
          console.log('confirm req')
        }
        else{
          for (let i = 0; i < data[0].incoming_reqs.length; i++) {
            if(data[0].incoming_reqs[i].from==sender_id.id){
              // res.send({status:'sent'})
              already_sent = 1
              break
            }
            else{
              already_sent = 0
            }
          }
          if(already_sent==1){
            res.send({first_name:data[0].first_name,second_name:data[0].second_name,status:'Sent',profile_image:data[0].profile_image,cover_image:data[0].cover_photo})
            console.log('sent')
          }
          else{
            res.send({first_name:data[0].first_name,second_name:data[0].second_name,status:'Add Friend',profile_image:data[0].profile_image,cover_image:data[0].cover_photo})
            console.log('Add')
          }
        }
      }
      else{
        res.send({first_name:data[0].first_name,second_name:data[0].second_name,status:'Friends',profile_image:data[0].profile_image,cover_image:data[0].cover_photo})
        data[0].cover_image
      }

      }
  })


})

app.post('/personal_profile/:id',async function(req,res){
  user_id = req.params.id
  var user_data = await user.find({_id:user_id})
  res.send({first_name:user_data[0].first_name,second_name:user_data[0].second_name,profile_image:user_data[0].profile_image,cover_image:user_data[0].cover_photo})
})

app.post('/update_profile_pic/:id',function(req,res){
  console.log('enter profile pic')
  user_id = req.params.id
  user_image = req.body.url
  var update_image = { $set: {profile_image: user_image} };
  user.updateOne({ _id: user_id }, update_image, function (err, result) {
    if (err) throw err;
    else {
      console.log('image updated')
      res.json('')
    }
  });

  
})

app.post('/update_cover_photo/:id',function(req,res){
  console.log('inside cover photo')
  user_id = req.params.id
  user_image = req.body.url

  var update_image = { $set: {cover_photo: user_image} };
  user.updateOne({ _id: user_id }, update_image, function (err, result) {
    if (err) throw err;
    else {
      console.log('image cover updated')
      res.json('')
      // yaha par ye empty response islie send kara h kuki isko vaha console karaye bina uske aage ka code nahi chl raha
    }
  });

})

app.post('/addFriend/:id',authToken_2,(req,res)=>{
  receivers_id = req.params.id
  const authHeader = req.headers['x-auth-token']
  const sender_id = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
  var outgoing = { $push: {outgoing_reqs: [{
    status: 'pending',
    to: receivers_id
  }]} };
  console.log(sender_id.first_name)
  var incoming =  { $push: {incoming_reqs: [{
    status: 'pending',
    from: sender_id.id,
    name : sender_id.first_name + ' ' +sender_id.second_name,
    profile_pic : 'prof pic will be here'
  }]} };
  var already_sent = 0
  user.find({_id:sender_id.id},function(err3,data){
    for (let i = 0; i < (data[0].outgoing_reqs.length); i++) {
      if(data[0].outgoing_reqs[i].to==receivers_id){
        already_sent = 1
        break
      }
      else{
        already_sent = 0
      }
    }
    if(already_sent==1){
      res.send({profile_data:{first_name:data[0].first_name,second_name:data[0].second_name,status:'Sent'}})
      console.log('sent')
    }
    else{
      user.updateOne({ _id: sender_id.id }, outgoing, function (err, result_2) {
        if (err) console.log(err);
        else {console.log(result_2)}
      });
    
      user.updateOne({ _id: receivers_id }, incoming, function (err2, result) {
        if (err2) console.log(err2);
        else {console.log(result)}
      });
    }
  })
})

app.post('/show_requests',function(req,res){
  const authHeader = req.headers['x-auth-token']
  const user_id = jwt.verify(authHeader, process.env.ACCESS_TOKEN);

    user.find({_id:user_id.id},function(err,data){
      if(err) console.log(err)
      else{
        var all_requests = []
        for (let i = 0; i < data[0].incoming_reqs.length; i++) {
              all_requests.push({name:data[0].incoming_reqs[i].name,id:data[0].incoming_reqs[i].from})
        }
        console.log(all_requests)
        res.send(all_requests)
      }
    })
})

app.post('/acceptReq/:id' , function(req,res){
  console.log('making friend')
   reqSender_id = req.params.id
   const authHeader = req.headers['x-auth-token']
   const receivers_id = jwt.verify(authHeader, process.env.ACCESS_TOKEN);

  // for reciever's db
   var friend_info =  { $push: {friends: [{
    id:reqSender_id
  }]} };

  // for reciever's db delete request from incoming field
  var delete_incoming =  { $pull: {incoming_reqs: {
    from:reqSender_id
  }} };

  // for sender's db delete request from outgoing field
  var delete_outgoing =  { $pull: {outgoing_reqs: {
    to:receivers_id.id
  }} };

  // for sender's db
  var friend_info_2 = { $push: {friends: [{
    id:receivers_id.id
  }]} };

  user.updateOne({ _id: receivers_id.id }, friend_info, function (err, result_2) {
    if (err) console.log(err);
    else {'done'}
  });

  user.updateOne({ _id: receivers_id.id }, delete_incoming, function (err, result_2) {
    if (err) console.log(err);
    else {'done'}
  });

  user.updateOne({ _id: reqSender_id }, friend_info_2, function (err, result_2) {
    if (err) console.log(err);
    else {'done'}
  });

  user.updateOne({ _id: reqSender_id }, delete_outgoing, function (err, result_2) {
    if (err) console.log(err);
    else {'done'}
  });
  res.send({status:'Friends'})
})

app.post('/friend_list/:id', function (req,res){
  // this is the id of the person whose profile we are checking
  id = req.params.id
  friends_list = []
  user.find({_id:id},async function(err,data){
    if(err) console.log(err)
    else{
      for (let i = 0; i < data[0].friends.length; i++) {
        var data2 = await user.find({_id:data[0].friends[i].id})
        friends_list.push({first_name:data2[0].first_name , second_name:data2[0].second_name,id:data2[0]._id,image:data2[0].profile_image})
      }
      res.send(friends_list)
    }
  })
})

app.post('/allposts',function(req,res){

  const authHeader = req.headers['x-auth-token']
  const user_id = jwt.verify(authHeader, process.env.ACCESS_TOKEN);
  posts = []
  post_time = []
  user.find({_id:user_id.id},async function(err,data){
    if(err)
    console.log(err)
    else{
      for (let i = 0; i < data[0].friends.length; i++) {
        var data_2 = await user.find({_id:data[0].friends[i].id})
        array_length = data_2[0].posting.length-1
        if(data_2[0].posting.length!=0){
          posts.push({post_data:data_2[0].posting[array_length].post_data,
            image:data_2[0].posting[array_length].image,
            profile_image:data_2[0].profile_image,
          time:data_2[0].posting[array_length].time,
          _id:data_2[0].posting[array_length].time,
          user_image:data[0].profile_image,
        name:data_2[0].first_name+ ' ' + data_2[0].second_name})
        }
        else{
          posts.push('No posts yet')
        }
      }
        res.send(posts)
    }
  })

})

app.post('/user_posts/:id',function(req,res){
  user_id = req.params.id
  posts=  []
  user.find({_id:user_id},function(err,data){
    if(err) console.log(err)
    else{
      for (let i = 0; i < data[0].posting.length; i++) {
        if(data[0].posting.length!=0){
          array_length = data[0].posting.length
        posts.push({post_data:data[0].posting[i].post_data,
          image:data[0].posting[i].image,
          profile_image:data[0].profile_image,
        time:data[0].posting[i].time,
        _id:data[0].posting[i].id,
      name:data[0].first_name+ ' ' + data[0].second_name})
        }
        else{
          posts.push('No posts yet')
        }
        
      }
    }
    
      res.send(posts)
    
    
  })

})

app.post('/photos/:id',function(req,res){
  user_id = req.params.id
  photos = []
  user.find({_id:user_id},function(err,data){
    if(err) console.log(err)
    else{
      for (let i = 0; i < data[0].posting.length; i++) {
        if(data[0].posting[i].image!=undefined){
          photos.push({image:data[0].posting[i].image})
        }
        
      }
      res.send(photos)
    }
  })

})


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
