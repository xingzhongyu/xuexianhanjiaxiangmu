const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1/mongoose_test',{useNewUrlParser:true,useUnifiedTopology: true});
const connection=mongoose.connection
connection.once('open',function(){
    console.log('数据库连接成功')
})
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String,required:true},
  password:{type:String,required:true},
  gender: {type:String,required:true},
  header:{type:String},
  school:{type:String},
  introduction:{type:String}
})
const UserModel=mongoose.model('users',userSchema)
exports.UserModel=UserModel

const chatSchema = mongoose.Schema({
  from:{type:String, required:true},
  to:{type:String,required:true},
  chat_id:{type:String,required:true},
  content:{type:String,required:true},
  read:{type:Boolean,default:false},
  create_time:{type:Number}
})
const ChatModel=mongoose.model('chat',chatSchema)
exports.ChatModel=ChatModel