// Vercel Serverless Function: /api/cinetpay-verify.js
// Vérification automatique et sécurisée du statut réel de paiement auprès de CinetPay

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const transactionId = req.method === 'POST' ? (req.body?.transaction_id || req.body?.cpm_trans_id) : req.query?.tx;

    if (!transactionId) {
      return res.status(400).json({ success: false, message: 'Transaction ID manquant.' });
    }

    const apiKey = process.env.CINETPAY_API_KEY;
    const siteId = process.env.CINETPAY_SITE_ID;

    if (!apiKey || !siteId) {
      return res.status(200).json({
        success: false,
        requiresConfig: true,
        message: 'Identifiants CinetPay non configurés sur Vercel.'
      });
    }

    const checkPayload = {
      apikey: apiKey,
      site_id: siteId,
      transaction_id: transactionId
    };

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkPayload)
    });

    const data = await response.json();

    // Statut SUCCES chez CinetPay = "ACCEPTED"
    const isSuccess = (data.code === '00' && data.data && data.data.status === 'ACCEPTED');

    return res.status(200).json({
      success: isSuccess,
      status: data.data?.status || 'UNKNOWN',
      amount: data.data?.amount,
      currency: data.data?.currency,
      paymentMethod: data.data?.payment_method,
      message: data.message || 'Vérification terminée'
    });
  } catch (error) {
    console.error('Erreur CinetPay Verify:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur de vérification du paiement.'
    });
  }
}
