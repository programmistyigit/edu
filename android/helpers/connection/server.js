export const serverHost = "https://849c-213-230-93-248.ngrok-free.app"

class Server {
    constructor(host){
        this.serverHost = host
    }

    async fetch(path , option={}){
        const respons = await fetch(`${this.serverHost}${path}` , { method : "GET" , credentials : "include" , ...option} )
        return await respons.json()
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
    async getCityList () { return this.fetch("/cityList")}
    async getSpaceList () { return this.fetch("/spaceList")}

}

export default new Server(serverHost)
