export const serverHost = "https://764a-213-230-92-89.ngrok-free.app"

class Server {
    constructor(host){
        this.serverHost = host
    }

    async fetch(path , option={}){
        try {
            const respons = await fetch(`${this.serverHost}${path}` , { method : "GET" , credentials : "include" , ...option} )
            return await respons.json()
        } catch (error) {
            return error
        }
    }

    async isLogin (){
        const respons = await this.fetch("/islogin")
        return respons.data.isLogin
    }
    
    async logOut() {return await this.fetch("/logOut") }
    
    login = {
        teacher : async (options) => {
            const response = await this.fetch(`/auth/login/teacher` , options)
            return response
        }
    }

    singUp = {
        teacher : async (option) => {
            const respons = await this.fetch("/auth/singup/teacher" , option)
            return respons
        }
    }
    async getCityList () { return this.fetch("/cityList")}
    async getSpaceList () { return this.fetch("/spaceList")}

}

export default new Server(serverHost)
