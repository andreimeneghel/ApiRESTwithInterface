const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const professionalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    contact: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true }
});

const Professional = mongoose.model('Professional', professionalSchema);

/**
 * @swagger
 * tags:
 *   name: Professionals
 *   description: Endpoints relacionados aos profissionais.
 */

/**
 * @swagger
 * /professionals:
 *   get:
 *     tags: [Professionals]
 *     summary: Retorna todos os profissionais, ordenados por nome
 *     responses:
 *       200:
 *         description: Uma lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professional'
 */
router.get('/', async (req, res) => {
    try {
        const professionals = await Professional.find().sort({ name: 1 });
        res.json(professionals);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar profissionais' });
    }
});

/**
 * @swagger
 * /professionals/{id}:
 *   get:
 *     tags: [Professionals]
 *     summary: Retorna um profissional específico
 */
router.get('/:id', async (req, res) => {
    try {
        const professional = await Professional.findById(req.params.id); 
        if (!professional) {
            return res.status(404).json({ erro: 'Profissional não encontrado' });
        }
        res.json(professional);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar o profissional' });
    }
});

/**
 * @swagger
 * /professionals:
 *   post:
 *     tags: [Professionals]
 *     summary: Insere um novo profissional
 */
router.post('/', async (req, res) => {
    const { name, specialty, contact, phone_number, status } = req.body;

    if (!name || !specialty || !contact || !phone_number || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newProfessional = new Professional({
        name,
        specialty,
        contact,
        phone_number,
        status
    });

    try {
        await newProfessional.save();
        res.status(200).json({ sucesso: 'Profissional cadastrado com sucesso', id: newProfessional._id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o profissional' });
    }
});

/**
 * @swagger
 * /professionals/{id}:
 *   put:
 *     tags: [Professionals]
 *     summary: Atualiza um profissional existente
 */
router.put('/:id', async (req, res) => {
    const { name, specialty, contact, phone_number, status } = req.body;

    try {

        const updatedProfessional = await Professional.findByIdAndUpdate(
            req.params.id,  
            { name, specialty, contact, phone_number, status },
            { new: true, runValidators: true } 
        );

        if (!updatedProfessional) {
            return res.status(404).json({ erro: 'Profissional não encontrado' });
        }

        res.json(updatedProfessional);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o profissional' });
    }
});

/**
 * @swagger
 * /professionals/{id}:
 *   delete:
 *     tags: [Professionals]
 *     summary: Deleta um profissional existente
 */
router.delete('/:id', async (req, res) => {
    try {
        
        const deletedProfessional = await Professional.findByIdAndDelete(req.params.id);

        if (!deletedProfessional) {
            return res.status(404).json({ erro: 'Profissional não encontrado' });
        }

        res.json({ mensagem: 'Profissional deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o profissional' });
    }
});

module.exports = router;
