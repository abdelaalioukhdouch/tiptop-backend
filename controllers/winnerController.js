const Participant = require('../models/Participant'); // Adjust path as necessary

exports.selectWinner = async (req, res) => {
  try {
    const randomWinner = await Participant.aggregate([
      { $match: { hasParticipated: true } },
      { $sample: { size: 1 } }
    ]);

    if (randomWinner.length === 0) {
      return res.status(404).json({ message: "No participants found" });
    }

    const winner = randomWinner[0];
    res.status(200).json({
      message: "Winner selected successfully",
      winner: winner
    });
  } catch (err) {
    console.error("Error selecting winner:", err);
    res.status(500).json({ message: "Error processing your request" });
  }
};
