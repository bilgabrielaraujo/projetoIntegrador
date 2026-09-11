import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object({
    idUsuario: Joi.string().required(),
    nome: Joi.string().required().max(100),
    cpf: Joi.string().required().length(11),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    endereco: Joi.string().required().max(30),
    telefone: Joi.string().required(),
    tipoUsuario: Joi.string().valid('admin', 'user').required(),
    statusDecolucao: Joi.string().valid('ativo', 'inativo').required(),
});

export const usuarioUpdateSchema = Joi.object({
nome: Joi.string().max(100),
email: Joi.string().email().max(50),
senha: Joi.string().max(100),
endereco: Joi.string().max(100),
telefone: Joi.string(),
}).min(1);

export const listarUsuario = async (req,res) => {
    try { 
        const {cpf, nome, email} = req.query;
        const usuarios = await usuarioService.findAll(cpf, nome, email ,res.json(usuarios));
    } catch (err) { 
        console.error('Erro ao buscar o Usuario', err)
        res.status(500).json({error: `Erro Interno do Serviddor`});
    }
};

