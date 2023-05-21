import axios from 'axios';

import paypalConfig from './config';

// Función para crear una orden de pago
const createOrder = async (amount: number, currency: string) => {
  try {
    const { clientID, clientSecret } = paypalConfig;

    const tokenResponse = await axios.post(
      'https://api.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        auth: {
          username: clientID,
          password: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const orderResponse = await axios.post(
      'https://api.paypal.com/v2/checkout/orders',
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { id, links } = orderResponse.data;

    return {
      orderID: id,
      paymentURL: links.find((link: any) => link.rel === 'approve').href,
    };
  } catch (error) {
    // Manejo de errores
    throw new Error('Error al crear la orden de pago en PayPal');
  }
};

export default createOrder;


// Función para generar la URL de redireccionamiento a PayPal
const generatePaymentURL = (orderID: string) => {
    const successURL = encodeURIComponent('https://www.culturale.com/payment/success');
    const cancelURL = encodeURIComponent('https://www.culturale.com/payment/cancel');
    
    const paymentURL = `https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=${orderID}&useraction=commit&return=${successURL}&cancel_return=${cancelURL}`;
    
    return paymentURL;
  };
  
  const getAccessToken = async () => {
    const clientId = 'tu-client-id';
    const clientSecret = 'tu-client-secret';
  
    try {
      const response = await axios.post('https://api.paypal.com/v1/oauth2/token', {
        grant_type: 'client_credentials',
      }, {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      });
  
      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
        throw new Error('Error al obtener el token de acceso de PayPal:');
    }
  };

  const processPaymentResponse = async (orderID: string) => {
    try {
      const accessToken = await getAccessToken(); // Obtener el token de acceso
  
      const response = await axios.post(
        `https://api.paypal.com/v2/checkout/orders/${orderID}/capture`,
        {
          // Datos adicionales según sea necesario
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Incluir el token de acceso en el encabezado
          },
        }
      );
  
    return response.data;
    } catch (error) {
        throw new Error('Error al procesar la respuesta de pago de PayPal:');
    }
  };
  
  

export {
  createOrder,
  generatePaymentURL,
  processPaymentResponse,
};
