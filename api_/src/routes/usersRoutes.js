const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: String, required: true },
    pwd: { type: String, required: true },
    level: { type: String, required: true },
    status: { type: String, required: true }
});

const User = mongoose.model('Users', usersSchema);

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.get('/check-username/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const existingUser = await User.findOne({ user: username });
  
      if (existingUser) {
        return res.status(200).json({ exists: true });
      }
  
      return res.status(200).json({ exists: false });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar o nome de usuário' });
    }
  });
  

router.post('/', async (req, res) => {
    const { name, email, user, pwd, level, status } = req.body;

    if (!name || !email || !user || !pwd || !level || !status) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ user });
    if (existingUser) {
        return res.status(400).json({ erro: 'Usuário já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);

    const newUser = new User({
        id: uuidv4(),
        name,
        email,
        user,
        pwd: hashedPwd,
        level,
        status
    });

    try {
        await newUser.save();
        res.status(200).json({ sucesso: 'Usuário cadastrado com sucesso', id: newUser.id });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao salvar o usuário' });
    }
});


router.put('/:id', async (req, res) => {
    const { name, email, user, pwd, level, status } = req.body;

    try {
        const updateData = { name, email, user, level, status };

        if (pwd) {
            const salt = await bcrypt.genSalt(10);
            updateData.pwd = await bcrypt.hash(pwd, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar o usuário' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json({ mensagem: 'Usuário deletado com sucesso.' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar o usuário' });
    }
});

module.exports = router;
