import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createPaymentRequest, validatePaymentPayload } from './paymentService.js'

const app = express()
const port = 4001
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || ''

app.use(cors())

app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature']
    const body = req.body

    if (!webhookSecret || !signature || typeof body !== 'string') {
      return res.status(400).json({ ok: false, message: 'Webhook verification unavailable.' })
    }

    const generated = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    const signatureBuffer = Buffer.from(String(signature))
    const generatedBuffer = Buffer.from(generated)

    const isValid = signatureBuffer.length === generatedBuffer.length && crypto.timingSafeEqual(signatureBuffer, generatedBuffer)

    if (!isValid) {
      return res.status(400).json({ ok: false, message: 'Invalid webhook signature.' })
    }

    const event = JSON.parse(body.toString('utf8'))
    console.log('Razorpay webhook received:', event.event)

    return res.json({ ok: true, received: true })
  } catch (error) {
    return res.status(400).json({ ok: false, message: 'Webhook validation failed.' })
  }
})

app.use(express.json())

app.post('/api/payment/create', async (req, res) => {
  try {
    const payload = validatePaymentPayload(req.body || {})
    const payment = await createPaymentRequest(payload)

    res.json({
      ok: true,
      payment,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message || 'Payment request failed.',
    })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'ganga-payment-api' })
})

app.listen(port, () => {
  console.log(`Payment API running on http://localhost:${port}`)
})
