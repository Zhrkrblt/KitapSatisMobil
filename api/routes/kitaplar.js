const express = require('express');
const router = express.Router();
const Kitap = require('../models/kitap');

// Tüm kitapları getir
router.get('/', async (req, res) => {
  try {
    const kitaplar = await Kitap.find();
    res.json(kitaplar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kategori bazında kitapları getir
router.get('/kategori/:kategori', async (req, res) => {
  try {
    const kitaplar = await Kitap.find({ kategori: req.params.kategori });
    res.json(kitaplar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kitap ekle
router.post('/', async (req, res) => {
  const kitap = new Kitap(req.body);
  try {
    const yeniKitap = await kitap.save();
    res.status(201).json(yeniKitap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kitap detayı getir
router.get('/:id', async (req, res) => {
  try {
    const kitap = await Kitap.findById(req.params.id);
    if (!kitap) return res.status(404).json({ message: 'Kitap bulunamadı' });
    res.json(kitap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Kitap güncelle
router.put('/:id', async (req, res) => {
  try {
    const kitap = await Kitap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!kitap) return res.status(404).json({ message: 'Kitap bulunamadı' });
    res.json(kitap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Kitap sil
router.delete('/:id', async (req, res) => {
  try {
    const kitap = await Kitap.findByIdAndDelete(req.params.id);
    if (!kitap) return res.status(404).json({ message: 'Kitap bulunamadı' });
    res.json({ message: 'Kitap silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 