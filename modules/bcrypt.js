//requires
const bcrypt = require('bcrypt');

class Hash {
  constructor(str) {
    this.string = str;
    this.hashStr = '';
  }

  //hash string
  hash(str) {



    bcrypt.genSalt(12, function(err, salt) {
      if (err) {
        console.log(err);
      } else {
        bcrypt.hash(str, salt, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            console.log(hash);
            //db insert stuff
          }
        }); //end bcrypt.hash
      } //end check err
    }); //end bcrypt




  } //end hash

} //end class

module.exports = Hash;
