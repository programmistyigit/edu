const { Router } = require("express");
const businesmenValidate = require("../../../validation/auth/businesmen");
const _ = require("lodash");
const BusinesMenSChema = require("../../../MongoDB/Schema/BusinesMenSChema");

const routes = Router();
routes.post("/" , async (req, res)=>{
    const {value , error} = businesmenValidate.validate(_.pick(req.body , ["login" , "password" , "confirmPassword"]))
    // yesli error
    if(error){
        res
            .status(400)
            .json(
                {
                    status:"warning",
                    message:"validatsiyadan otmadi",
                    data:error,
                    target:error.details[0].path
                }
            )
    }
    // yesli error
    // ESLI YEST BAZA 
    const onTheBaza = await BusinesMenSChema.findOne(_.pick(value , ["login"]))

    if(onTheBaza){
        return (
            res
                .status(200)
                .json(
                    {
                        status:"warning",
                        message:"bunday login oldindan mavjud"
                    }
                )
        )
    }
    try {
        const createBaza = await BusinesMenSChema.create(value);
        res
            .status(200)
            .json(
                {
                    status:"success",
                    message:"hisob yaratildi",
                    data:{password:createBaza.password , login:createBaza.login}
                }
            )
    } catch (error) {
        throw error
    }

})

module.exports = routes;
