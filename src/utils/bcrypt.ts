import * as bcrypt from 'bcrypt';


export async function encodePassword(rawPassword:string) {
      const SALT=bcrypt.genSaltSync();
      return bcrypt.hash(rawPassword,SALT);
}


export async function isMatch(hash:string,password:string) {
  
     return bcrypt.compare(password,hash); 
}
