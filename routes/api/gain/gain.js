app.get("/api/gains/:userId", async (req, res) => {
    try {
      const gains = await Gain.find({ user: req.params.userId })
                              .populate('ticket')
                              .populate('user', 'name email'); // Modifiez les champs à peupler selon les besoins
      res.json(gains);
    } catch (err) {
      res.status(500).json({ message: err.toString() });
    }
  });
