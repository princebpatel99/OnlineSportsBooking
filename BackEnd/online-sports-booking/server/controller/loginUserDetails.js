var OSBRegister = require('../model/OSBRegister');

function getDetails(id){
    return new Promise(function (resolve, reject) {
        try {
          OSBRegister.find({ _id: id },function(err,data){
            if(!err){
                let newObj = {email:data[0].email,fullName:data[0].fullName,isVarified:data[0].isVarified,mobile:data[0].mobile,__v:data[0].__v,_id:data[0]._id}
                resolve(newObj)
            }
            else{
                reject(new Error('Something is not right!'))
            }
          });
        } catch (err) {
          reject(new Error('Something is not right!'));
        }
    });
}

module.exports = { getDetails };