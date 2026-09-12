import crypto from 'node:crypto'
import Razorpay from 'razorpay'

const merchant = {
  upiId: '9849490171@upi',
  upiName: 'Ganga Enterprises',
}

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null

export function validatePaymentPayload(payload = {}) {
  const { customerName, phone, amount } = payload

  if (!customerName || !customerName.trim()) {
    throw new Error('Customer name is required.')
  }

  if (!phone || !/^\d{10}$/.test(String(phone).replace(/\s+/g, ''))) {
    throw new Error('A valid 10-digit phone number is required.')
  }

  const numericAmount = Number(amount)
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('Amount must be greater than zero.')
  }

  return {
    customerName: customerName.trim(),
    phone: String(phone).replace(/\s+/g, ''),
    amount: Number(numericAmount.toFixed(2)),
  }
}

export async function createPaymentRequest(input = {}) {
  const validated = validatePaymentPayload(input)
  const reference = `GE-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`
  const amount = validated.amount.toFixed(2)

  const upiLink = `upi://pay?pa=${encodeURIComponent(merchant.upiId)}&pn=${encodeURIComponent(merchant.upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment for ${validated.customerName} - ${validated.phone}`)}`

  const qrPayload = `${upiLink}`
  const qrDataUrl = `data:image/png;base64,${Buffer.from(qrPayload).toString('base64')}`

  if (razorpay) {
    const order = await razorpay.orders.create({
      amount: Math.round(validated.amount * 100),
      currency: 'INR',
      receipt: reference,
      notes: {
        customerName: validated.customerName,
        phone: validated.phone,
      },
    })

    return {
      reference,
      merchant: merchant.upiId,
      merchantName: merchant.upiName,
      amount: validated.amount,
      customerName: validated.customerName,
      phone: validated.phone,
      upiLink,
      qrDataUrl,
      gateway: 'razorpay',
      orderId: order.id,
      amountInPaise: order.amount,
    }
  }

  return {
    reference,
    merchant: merchant.upiId,
    merchantName: merchant.upiName,
    amount: validated.amount,
    customerName: validated.customerName,
    phone: validated.phone,
    upiLink,
    qrDataUrl,
    gateway: 'upi-fallback',
  }
}
