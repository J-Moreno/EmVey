const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send({ hi: 'there', you: 'been hacked!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app running on port ${PORT}`));