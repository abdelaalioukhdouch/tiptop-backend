const Ticket = require("../models/Ticket");




exports.addTickets = async (req, res) => {

  try {

    let randomCode = Math.floor(1000000000 + Math.random() * 9000000000);




    // create new tickets in db

    let ticketsArray = [];

    for (var i = 0; i < 500; i++) {

      ticketsArray.push({

        code: Math.floor(1000000000 + Math.random() * 9000000000),

        title:

          i < 20

            ? "Discovery Box Worth Є69"

            : i < 50

            ? "Discovery Box Worth Є39"

            : i < 100

            ? "Box of 100g Signature Tea"

            : i < 200

            ? "Box of 100g Detox Tea"

            : "Tea Infuser",

        isClaimed: false,

        isActive: true,

      });

    }

    let shuffledTicketsArray = await ticketsArray

      .map((value) => ({ value, sort: Math.random() }))

      .sort((a, b) => a.sort - b.sort)

      .map(({ value }) => value);

    await Ticket.insertMany(shuffledTicketsArray);

    res.send({

      code: "tickets added",

    });

  } catch (err) {

    res.status(500).json({

      message: err.toString(),

    });

  }

};