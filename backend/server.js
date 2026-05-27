const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

//
// MIDDLEWARE
//

app.use(cors());

app.use(express.json());

//
// MONGODB CONNECTION
//
                  
mongoose.connect("mongodb+srv://jeganb007_db_user:ipoTmMQbHlCrGMxA@main-atlas.qgeazjq.mongodb.net/")
.then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.log(err);
});

//
// USER MODEL
//

const UserSchema = new mongoose.Schema({

  email: String,

  password: String

});

const User = mongoose.model('UserManage', UserSchema);

//
// MEMBER MODEL
//

const MemberSchema = new mongoose.Schema({

  name: String,

  email: String,

  designation: String

}, {
  timestamps: true
});

const Member = mongoose.model('Member', MemberSchema);

//
// CREATE ADMIN USER
// RUN ONLY ONCE
//

app.post('/create-user', async (req, res) => {

  try {

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    const user = new User({

      email: req.body.email,

      password: hashedPassword

    });

    await user.save();

    res.json({
      message: 'Admin Created'
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

//
// LOGIN
//

app.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: 'User Not Found'
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      });

    }

    const token = jwt.
    sign(
      {
        id: user._id
      },
      "mysecretjwtToken007@"
    );

    res.json({
      token
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

//
// JWT MIDDLEWARE
//

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  if (!token) {

    return res.status(401).json({
      message: 'Access Denied'
    });

  }

  try {

    const verified = jwt.verify(
      token,
      "mysecretjwtToken007@"
    );

    req.user = verified;

    next();

  } catch (error) {

    res.status(400).json({
      message: 'Invalid Token'
    });

  }

};

//
// GET ALL MEMBERS
//

app.get('/members', verifyToken, async (req, res) => {

  try {

    const members = await Member.find();

    res.json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

//
// ADD MEMBER
//

app.post('/members', verifyToken, async (req, res) => {

  try {

    const member = new Member({

      name: req.body.name,

      email: req.body.email,

      designation: req.body.designation

    });

    await member.save();

    res.json({
      message: 'Member Added',member:member
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

// EDIT MEMBER
app.put('/members/:id', async (req, res) => {
  try {
    const { name, email, designation } = req.body;

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { name, email, designation },
      { new: true } // ✅ Returns updated member
    );

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member Updated', member });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//
// DELETE MEMBER
//

app.delete('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.status(200).json({ message: 'Member Deleted' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.get("/alive", (req, res) => {

    res.status(200).send("Server is alive");

});

//
// SERVER
//

app.listen(3000, () => {

  console.log('Server Running On Port 3000');

});