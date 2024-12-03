const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

/**
 * Define o esquema e o modelo do agendamento
 */
const appointmentSchema = new mongoose.Schema({
    specialty: { type: String, required: true },
    comments: { type: String },
    date: { type: Date, required: true },
    student: { type: String, required: true },
    professional: { type: String, required: true },
  });

const Appointment = mongoose.model('Appointments', appointmentSchema);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Endpoints relacionados aos agendamentos. 
 */
/**
 * @swagger
 * /appointment:
 *   get:
 *     tags: [Appointment]
 *     summary: Retorna todos os agendamentos
 *     responses:
 *       200:
 *         description: Uma lista de agendamentos
 */
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ professional: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   get:
 *     tags: [Appointment]
 *     summary: Retorna um agendamento específico
 */
// Buscar um Appointment pelo _id
router.get('/:id', async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id); // Certifique-se de que está buscando por _id
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment não encontrado' });
      }
      res.status(200).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar Appointment' });
    }
  });
  



/**
 * @swagger
 * /appointment:
 *   post:
 *     tags: [Appointment]
 *     summary: Insere um novo agendamento
 */
router.post('/', async (req, res) => {
    const { specialty, comments, date, student, professional } = req.body;

    if (!specialty || !comments || !date || !student || !professional) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const newAppointment = new Appointment({
        id: uuidv4(),
        specialty,
        comments,
        date,
        student,
        professional
    });

    try {
        await newAppointment.save();
        res.status(200).json({ sucesso: 'Agendamento cadastrado com sucesso', id: newAppointment.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o agendamento' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     tags: [Appointment]
 *     summary: Substitui um agendamento existente
 */
router.put('/:id', async (req, res) => {
    const { specialty, comments, date, student, professional } = req.body;

    try {
        // Procura o agendamento pelo _id do MongoDB
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,  // Usando o id da URL para buscar o agendamento
            { specialty, comments, date, student, professional },  // Atualiza os campos necessários
            { new: true, runValidators: true }  // Garante que o agendamento será retornado atualizado
        );

        // Caso o agendamento não seja encontrado, retorna erro 404
        if (!updatedAppointment) {
            return res.status(404).json({ erro: 'Agendamento não encontrado' });
        }

        // Retorna o agendamento atualizado
        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o agendamento' });
    }
});

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     tags: [Appointment]
 *     summary: Deleta um agendamento existente
 */
router.delete('/:id', async (req, res) => {
    try {
        // A alteração aqui é que estamos agora buscando pelo campo "_id" do MongoDB, não o "id" customizado
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json({ mensagem: 'Usuário deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o usuário' });
    }
});

module.exports = router;
