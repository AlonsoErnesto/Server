const jwt = require("jsonwebtoken");

const User = require('../Models/user');
const bcryptjs = require("bcryptjs");


function createToken(user,SECRET_KEY, expiresIn){
    const {id,name,email,username} = user;
    const payLoad = {
        id,
        name,
        email,
        username,
    };
    return jwt.sign(payLoad,SECRET_KEY,{expiresIn})

}

async function register(input)
{   
     const newUser = input;
                newUser.email = newUser.email.toLowerCase();
                newUser.username = newUser.username.toLowerCase();
                
                const {email,username,password} = newUser;

                const foundEmail = await User.findOne({email});
                if(foundEmail) throw new Error("El email ya esta en USO");


                const foundUsername = await User.findOne({username});
                if(foundUsername) throw new Error("El nombre de usuario ya esta en uso");

                //encriptation
                const salt = await bcryptjs.genSaltSync(10);
                newUser.password = await bcryptjs.hash(password,salt);


                try {
                    const user = new User(newUser);
                    user.save();
                    return user;
                } catch (error) {
                    console.log(error);
                }
            }

            async function login(input){
                const { email,password} = input;
                
                const userFound = await User.findOne({email:email.toLowerCase()})
                if(!userFound) throw new Error("ERROR EN EL EMAIL Y PASSWORD");

                const  passwordSucess = await bcryptjs.compare(password,userFound.password)
                if(!passwordSucess) throw new Error("ERROR EN EL EMAIL Y PASSWORD")

                

                return {
                    token:createToken(userFound,process.env.SECRET_KEY,"24h"), 
                }

            }


module.exports = {
    register,
    login,
}




