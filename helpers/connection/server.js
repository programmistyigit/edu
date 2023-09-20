export const serverHost = "http://192.168.100.132:5000"

class Server {
    constructor(host) {
        this.serverHost = host
    }

    async fetch(path, option = {}) {
        const respons = await fetch(`${this.serverHost}${path}`, { method: "GET", credentials: "include", ...option })
        return await respons.json()
    }

    async isLogin() {
        const respons = await this.fetch("/islogin")
        return respons
    }

    async logOut() { return await this.fetch("/logOut") }

    login = {
        teacher: async (options) => {
            const response = await this.fetch(`/auth/login/teacher`, options)
            return response
        },

        student: async (data) => {
            const respons = await this.fetch("/auth/login/student", { method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
            return respons
        },

        mother: async (data) => {
            const respons = await this.fetch("/auth/login/mother", { method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
            return respons
        }
    }

    singUp = {
        teacher: async (option) => {
            const respons = await this.fetch("/auth/singup/teacher", option)
            return respons
        },
        student: async (data) => {
            const respons = await this.fetch("/auth/singup/student", { method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
            return respons
        },
        mother: async (data) => {
            const respons = await this.fetch("/auth/singup/mother", { method: "POST", body: JSON.stringify(data), headers: { "Content-type": "application/json" } })
            return respons
        }
    }
    getDataMe = {
        student: async () => {
            const data = await this.fetch("/student/data_me")
            return data
        },
        mother: async () => { return (await this.fetch("/mother/data_me")) },
        teacher: async () => { return (await this.fetch("/teacher/data_me")) },
    }

    async getCityList() { return this.fetch("/cityList") }
    async getSpaceList() { return this.fetch("/spaceList") }
    async overSearch(value) {
        console.log(value);
        const data = await this.fetch("/filter/search" , { method: "POST" , body:JSON.stringify({ value }) , headers: { "Content-type": "application/json" } } )
        return data
    }
}

export default new Server(serverHost)
