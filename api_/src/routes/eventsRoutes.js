const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const eventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: { type: String, required: true },
    status: { type: String, required: true }
});

const Event = mongoose.model('Events', eventsSchema);

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Endpoints relacionados aos eventos.
 */

/**
 * @swagger
 * /events:
 *   get:
 *     tags: [Events]
 *     summary: Retorna todos os eventos
 *     responses:
 *       200:
 *         description: Uma lista de eventos
 */
router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Retorna um evento específico
 */
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Usando o _id do MongoDB
        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar o evento' });
    }
});

/**
 * @swagger
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Insere um novo evento
 */
router.post('/', async (req, res) => {
    const { title, description, date, comments, status } = req.body;

    if (!title || !description || !comments || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const newEvent = new Event({
        title,
        description,
        date,
        comments,
        status
    });

    try {
        await newEvent.save();
        res.status(200).json({ success: 'Evento cadastrado com sucesso', id: newEvent.id });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar o evento' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Atualiza um evento existente
 */
router.put('/:id', async (req, res) => {
    const { title, description, date, comments, status } = req.body;

    try {
        const updateData = { title, description, date, comments, status };

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar o evento' });
    }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Deleta um evento existente
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }

        res.json({ message: 'Evento deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar o evento' });
    }
});

module.exports = router;
