import jsonwebtoken from "jsonwebtoken"

export class Auth{
    username: String
    location: Number


    constructor(options: {username: String , location : Number}){
        this.username = options.username,
        this.location = options.location
    }

    async generateAccessToken() {
        let expiresIn = 3600,
         token = jsonwebtoken.sign({username: this.username,location: this.location}, 'ytrewq', { expiresIn: '1800s' });
        
        return {
            token,
            expiresIn
        }
    }

    async verify(token: any){
        return jsonwebtoken.verify(token, 'ytrewq')
        
    }
}
