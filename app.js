const express=require('express');
const mongoose =require('mongoose');
const path=require('path');
const app=express();
const port= process.env.PORT || 8000;
// //Define mongoose schema
// main().catch(err => console.log(err));
// async function main() {
   
// }

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static('static'));           // For serving static files
app.use(express.urlencoded());
//Pug specific stuff
app.set('view engine', 'pug')                           //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));   
// END Points
app.get('/', (req, res)=>{
    const params= {title:"Shivgun Dance Academy"};
    res.status(200).render('home',params);
})
app.get('/contact', (req, res)=>{
    const params= {title:"Shivgun Dance Academy"};
    res.status(200).render('contact.pug',params);
})
app.get('/services', (req, res)=>{
    const params= {};
    res.status(200).render('services.pug',params);
})
app.get('/about', (req, res)=>{
    const params= {};
    res.status(200).render('about.pug',params);
})
mongoose.connect("mongodb+srv://ipriyanshi:priyanshi@cluster0.u1wuw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.log(error.message);
});

const ContactSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    phone: String, 
    address: String, 
    gender: String, 
});
const Contact = mongoose.model('Contact', ContactSchema); 
app.post('/contact', async (req, res)=> {
var myData= new Contact(req.body)
await myData.save().then(()=>{
    res.status(200).send("Your Data has been saved successfully.")
}).catch(()=>{
    res.status(400).send("Cannot save the Data.")
});
}) 