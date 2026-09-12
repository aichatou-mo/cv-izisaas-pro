// Vercel Serverless Function: /api/cinetpay-init.js
// Sécurisation complète : les clés d'API et identifiants marchands restent sur le serveur backend.

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    const {
      planName,
      amountFCFA,
      buyerName,
      buyerEmail,
      buyerPhone,
      returnUrl
    } = req.body || {};

    if (!amountFCFA || !buyerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Montant et adresse email de l\'acheteur requis.'
      });
    }

    // Récupération des clés depuis les variables d'environnement Vercel
    const apiKey = process.env.CINETPAY_API_KEY;
    const siteId = process.env.CINETPAY_SITE_ID;

    // Identifiant unique de transaction sécurisé
    const transactionId = 'AMO-' + Date.now() + '-' + Math.floor(1000 + Math.random() * 9000);
    const origin = returnUrl || req.headers.referer || 'https://cv-izisaas-pro.vercel.app';
    const notifyUrl = `${new URL(origin).origin}/api/cinetpay-verify`;

    // Si les clés réelles ne sont pas encore configurées dans les variables d'environnement Vercel
    if (!apiKey || !siteId) {
      return res.status(200).json({
        success: false,
        requiresConfig: true,
        message: 'Clés marchandes CinetPay en attente de configuration dans Vercel (CINETPAY_API_KEY & CINETPAY_SITE_ID).',
        transactionId,
        demoDetails: {
          planName,
          amountFCFA,
          buyerName,
          buyerEmail
        }
      });
    }

    // Appel direct et sécurisé à l'API CinetPay v2
    const cinetpayPayload = {
      apikey: apiKey,
      site_id: siteId,
      transaction_id: transactionId,
      amount: Math.round(Number(amountFCFA)),
      currency: 'XOF',
      description: `Règlement officiel : ${planName || 'Programme de formation'}`,
      notify_url: notifyUrl,
      return_url: `${new URL(origin).origin}/?payment_status=success&tx=${transactionId}`,
      channels: 'ALL', // Mobile Money (Airtel Money Niger, Wave, Orange, Moov) + Cartes Bancaires
      metadata: JSON.stringify({
        buyerName: buyerName || 'Client',
        buyerEmail,
        planName: planName || 'Formation'
      }),
      customer_name: (buyerName || 'Client').split(' ')[0] || 'Client',
      customer_surname: (buyerName || 'Client').split(' ').slice(1).join(' ') || 'Client',
      customer_email: buyerEmail,
      customer_phone_number: buyerPhone || '00000000',
      customer_address: 'Niamey',
      customer_city: 'Niamey',
      customer_country: 'NE',
      customer_state: 'NE',
      customer_zip_code: '8001'
    };

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cinetpayPayload)
    });

    const data = await response.json();

    if (data.code === '201' && data.data && data.data.payment_url) {
      return res.status(200).json({
        success: true,
        paymentUrl: data.data.payment_url,
        paymentToken: data.data.payment_token,
        transactionId: transactionId,
        siteId: siteId
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.message || data.description || 'Erreur lors de l\'initialisation CinetPay.',
        raw: data
      });
    }
  } catch (error) {
    console.error('Erreur API CinetPay Init:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur lors de la connexion à la passerelle de paiement.'
    });
  }
}
