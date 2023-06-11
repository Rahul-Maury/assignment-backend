const express = require('express');
const router = express.Router();
const Book = require('./model')
const cors = require('cors')

router.use(cors())

router.get('/',(req,res)=>{
    res.send('Welcome! This is home page!')
})

router.post('/books', async (req, res) => {
    try{
        const book = new Book(req.body)
        await book.save();
        res.send(book);
    }catch(e){
        res.send(e);
    }

})

router.get('/books', async (req, res) => {
    try{
        const books = await Book.find({})
        res.send(books);
    }catch(e){
        res.send(e);
    }
})

router.get('/books/:bookId', async (req, res) => {
    try{
        const bookId = req.params.bookId;
        const book = await Book.findById({_id:bookId});
        res.send(book);
    }catch(e){
        res.send(e);
    }
})



router.delete('/books/:bookId', async (req, res) => {
    try{
        const book = await Book.findOneAndDelete({_id:req.params.bookId});
        res.send(book);
    }catch(e){
        
        res.send(e);
    }
})

router.put('/books/:bookId', async (req, res) => {

    try{
        const book = await Book.findOneAndUpdate(
            { _id: req.params.bookId }, // Find the user with this username
            req.body, 
            { new: true } 
          );
    
    
          if(!book){
            res.send('Error updating book!');
          }
        res.send(book);
    }catch(e){
        res.send(e);
    }

})


module.exports = router;
