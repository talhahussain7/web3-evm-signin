const jwt = require("jsonwebtoken");
const ethUtil = require("ethereumjs-util");
const User = require("../models/User");

async function getNonce(req, res, next) {
  try {
    const public_address = req.params.public_address;
    if (public_address) {
      try{
        let user = await User.findOne({public_address});
        if (user){
          res.status(200).json({nonce: user.nonce,isRegistered:user.isRegistered});
        }else{
          res.status(401).json({msg:"User does not exist"});
        }
      } catch(err) {
        console.log(err.message);
        res.status(500).json({message: err.message});
      }
    }
    throw new Error();
  } catch (err) {
    res.status(500).json({message: err.message});
    console.error(`Error Message`, err.message);
    next(err);
  }
}

async function getJwtToken(req, res, next) {
  try{
    const public_address = req.params.public_address;
    const user = await User.findOne({public_address});
    if(user){
      const msg = `I am signing my one-time nonce: ${user.nonce}`;
      const msgHex = ethUtil.bufferToHex(Buffer.from(msg));

      
      // Check if signature is valid //
      const msgBuffer = ethUtil.toBuffer(msgHex);
      //hashPersonalMessage returns the keccak-256 hash of message
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(req.body.signature);

      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      
      // msgHash	Buffer
      // v	        number
      // r	        Buffer
      // s	        Buffer
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addresBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addresBuffer);
      
      if (address.toLowerCase() === user.public_address.toLowerCase()) {
        // Change user nonce
        user.nonce = Math.floor(Math.random() * 1000000);
        await user.save();
        // Set jwt token
        const token = jwt.sign({
          _id: user._id,
          address: user.public_address
        }, "JWT_SECRET", {expiresIn: '6h'});
        user.nonce = null;
        res.status(200).json({
          success: true,
          token: token,
          user: user,
          msg: "You are now logged in."
        });
      } 
      else {
        // User is not authenticated
        res.status(401).json({message: "Invalid credentials"});
      }
    }
    else {
      res.status(401).json({message: "User does not exist"});
    }
  } catch(err) {
    console.log(err.message);
    res.status(500).json({message: "Server error"});
  }
}

async function registerUser(req, res, next) {
  try{
    const public_address = req.params.public_address;
    const user = await User.findOne({public_address});
    if(!user){
      const user = new User({
        public_address,
        isRegistered: true
      });
      await user.save();
      res.status(200).json({
        success: true,
        user: user,
        msg: "User registered successfully"
      });
    }
    else {
      res.status(401).json({message: "User already exists"});
    }
  } catch(err) {
    console.log(err.message);
    res.status(500).json({message: "Server error"});
  }
}
module.exports = {
  getNonce,
  getJwtToken,
  registerUser,
};
