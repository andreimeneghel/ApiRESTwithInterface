const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Define o esquema e o modelo do professor
 */
const teacherSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    school_disciplines: { type: String, required: true },
    contact: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: Endpoints relacionados aos professores.
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: Retorna todos os professores
 *     responses:
 *       200:
 *         description: Uma lista de professores
 */
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ name: 1 });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar professores' });
    }
});

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     tags: [Teachers]
 *     summary: Retorna um professor específico
 */
router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id); // Usando o _id do MongoDB
        if (!teacher) {
            return res.status(404).json({ erro: 'Professor não encontrado' });
        }
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar o professor' });
    }
});

/**
 * @swagger
 * /teachers:
 *   post:
 *     tags: [Teachers]
 *     summary: Insere um novo professor
 */
router.post('/', async (req, res) => {
    const { name, school_disciplines, contact, phone_number, status } = req.body;

    if (!name || !school_disciplines || !contact || !phone_number || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newTeacher = new Teacher({
        id: uuidv4(),
        name,
        school_disciplines,
        contact,
        phone_number,
        status
    });

    try {
        await newTeacher.save();
        res.status(200).json({ sucesso: 'Professor cadastrado com sucesso', id: newTeacher.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o professor' });
    }
});

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     tags: [Teachers]
 *     summary: Substitui um professor existente
 */
router.put('/:id', async (req, res) => {
    const { name, school_disciplines, contact, phone_number, status } = req.body;

    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            req.params.id,  // Usando o _id do MongoDB
            { name, school_disciplines, contact, phone_number, status },
            { new: true, runValidators: true } // Garante que o professor será retornado atualizado
        );

        if (!updatedTeacher) {
            return res.status(404).json({ erro: 'Professor não encontrado' });
        }

        res.json(updatedTeacher);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o professor' });
    }
});

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     tags: [Teachers]
 *     summary: Deleta um professor existente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!deletedTeacher) {
            return res.status(404).json({ erro: 'Professor não encontrado' });
        }

        res.json({ mensagem: 'Professor deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o professor' });
    }
});

module.exports = router;
