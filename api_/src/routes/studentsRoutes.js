const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Define o esquema e o modelo do estudante
 */
const studentsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    parents: { type: String, required: true },
    phone: { type: String, required: true },
    special: { type: String, required: true },
    status: { type: String, required: true }
});

const Student = mongoose.model('Students', studentsSchema);

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints relacionados aos estudantes
 */

/**
 * @swagger
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: Retorna todos os estudantes
 *     responses:
 *       200:
 *         description: Uma lista de estudantes
 */
router.get('/', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar estudantes' });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Retorna um estudante específico
 */
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // Usando o _id do MongoDB
        if (!student) {
            return res.status(404).json({ error: 'Estudante não encontrado' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o estudante' });
    }
});

/**
 * @swagger
 * /students:
 *   post:
 *     tags: [Students]
 *     summary: Insere um novo estudante
 */
router.post('/', async (req, res) => {
    const { name, age, parents, phone, special, status } = req.body;

    if (!name || !age || !parents || !phone || !special || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newStudent = new Student({
        id: uuidv4(),
        name,
        age,
        parents,
        phone,
        special,
        status
    });

    try {
        await newStudent.save();
        res.status(200).json({ sucesso: 'Estudante cadastrado com sucesso', id: newStudent.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o estudante' });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     tags: [Students]
 *     summary: Substitui um estudante existente
 */
router.put('/:id', async (req, res) => {
    const { name, age, parents, phone, special, status } = req.body;

    try {
        const updateData = { name, age, parents, phone, special, status };

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            updateData,     
            { new: true, runValidators: true }
        );
        

        if (!updatedStudent) {
            return res.status(404).json({ erro: 'Estudante não encontrado' });
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o estudante' });
    }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     tags: [Students]
 *     summary: Deleta um estudante existente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent) {
            return res.status(404).json({ erro: 'Estudante não encontrado' });
        }

        res.json({ mensagem: 'Estudante deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o estudante' });
    }
});

module.exports = router;
