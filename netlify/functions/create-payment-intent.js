require("dotenv").config(); //Para cargar variables de entorno en el proyecto
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY); //Se crea una instancia de la API Stripe

exports.handler = async (event) => {
  //El parametro event contiene la info sobre la solicitud HTTP que ha activado la funcion serverless
  try {
    const { amount } = JSON.parse(event.body); // Extrae el amount de la solicitud JSON

    const paymentIntent = await stripe.paymentIntents.create({
      //Crea un objeto de intension de pago
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log(paymentIntent);
    return {
      //Si tiene exito se devuelvo un objeto JSON con un codigo de estado HTTP 200
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      //Si falla se devuelve un objeto JSON con un codigo de estado HTTP 400
      status: 400,
      bdoy: JSON.stringify({ error }),
    };
  }
};
