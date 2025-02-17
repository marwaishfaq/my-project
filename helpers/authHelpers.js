import bcrypt, { hash } from 'bcrypt'

export const hashpassword = async(password) =>{
    try{
        const saltRoundes =10;
     const hashedpassword = await bcrypt.hash(password,saltRoundes);
     return hashedpassword
    }
    catch(error){
           console.log(error)
    }
}

export const comparepassword = async(password,hashedpassword) =>{
    return bcrypt.compare(password,hashedpassword)
     
}