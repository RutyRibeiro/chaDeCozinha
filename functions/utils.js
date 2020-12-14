function validate (body){
    
    try { 
        const senha = body.senha
        const telefone = body.telefone
        if (telefone == null || telefone == ''){
            console.log('telefone null or vazio')
            throw ('Telefone vazio')
        }else if (senha == null || senha == ''){
            throw ('Senha vazio')
        }
        else{
            return({
                status:"sucesso",
                message:"validado",
                user:{
                    telefone:telefone,
                    senha:senha
                }
            })
        }

    } catch (error) {
        return({
            status:"erro",
            message:error
        })
    } 
}


exports.validate = validate;