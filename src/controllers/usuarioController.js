import * as usuarioService from '../services/usuarioService.js';
import Joi from 'joi';

export const usuarioCreateSchema = Joi.object({
    nome: Joi.string().required().max(100),
    cpf: Joi.string().required().length(11),
    email: Joi.string().email().required(),
    senha: Joi.string().required(),
    endereco: Joi.string().required().max(30),
    telefone: Joi.string().required(),
    tipoUsuario: Joi.string().valid('admin', 'user').required(),
    statusDevolucao: Joi.string().valid('ativo', 'inativo').required(),
});

export const usuarioUpdateSchema = Joi.object({
nome: Joi.string().max(100),
email: Joi.string().email().max(50),
senha: Joi.string().max(100),
endereco: Joi.string().max(100),
telefone: Joi.string(),
statusDevolucao: Joi.string().valid('ativo', 'inativo'),
}).min(1);

export const listarUsuario = async (req,res) => {
    try { 
        const {cpf, nome, email} = req.query;
        const usuarios = await usuarioService.findAll(cpf, nome, email );
        res.json(usuarios);
    } catch (err) { 
        console.error('Erro ao buscar o Usuario', err)
        res.status(500).json({error: `Erro Interno do Serviddor`});
    }
};

export const adicionaUsuario = async (req, res) => {
    try {
        const novoUsuario = await usuarioService.create(req.body);
        res.status(201).json({message: 'Usuario adicionado com sucesso', data: novoUsuario});
    } catch (err) {
        console.error('Erro ao adicionar usuario: ', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'CPF já cadastrado.'});
        }
        res.status(500).json({ error: 'Erro ao adicionar cliente'});
    }
};

export const atualizarUsuario = async(req, res) => {
    try {
        const { cpf } = req.params;
        const update = await usuarioService.update(cpf, req.body);

        if(!update) {
            return res.status(404).json({error: 'Usuario não encontrado'});
        };
        res.status(200).json({ message: 'Usuario atualizado com sucesso'})
    } catch (err) {
        console.error('Erro ao atualizar usuario', err);
        res.status(500).json({error: 'Erro ao atualizar usuario'});
    }
}
