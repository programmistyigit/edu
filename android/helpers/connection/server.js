export const serverHost = "http://192.168.100.5:5000"

class Server {
    constructor(host){
        this.serverHost = host
    }

    async fetch(path , option={}){
        const respons = await fetch(`${this.serverHost}${path}` , { method : "GET" , credentials : "include" , ...option } )
        return await respons.json()
    }

    async isLogin (){
        const respons = await this.fetch("/islogin")
        if(respons?.data?.isLogin) return respons
        
        return false
    }
}

export default new Server(serverHost)
