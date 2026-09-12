const merchant = {
  upiId: '9849490171@upi',
  upiName: 'Ganga Enterprises',
}

export function validatePaymentPayload(payload = {}) {
  const { customerName, phone, amount } = payload

  if (!customerName || !String(customerName).trim()) {
    throw new Error('Customer name is required.')
  }

  const normalizedPhone = String(phone || '').replace(/\s+/g, '')
  if (!/^\d{10}$/.test(normalizedPhone)) {
    throw new Error('A valid 10-digit phone number is required.')
  }

  const numericAmount = Number(amount)
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    throw new Error('Amount must be greater than zero.')
  }

  return {
    customerName: String(customerName).trim(),
    phone: normalizedPhone,
    amount: Number(numericAmount.toFixed(2)),
  }
}

export function createPaymentRequest(input = {}) {
  const validated = validatePaymentPayload(input)
  const reference = `GE-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
  const amount = validated.amount.toFixed(2)

  const upiLink = `upi://pay?pa=${encodeURIComponent(merchant.upiId)}&pn=${encodeURIComponent(merchant.upiName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment for ${validated.customerName} - ${validated.phone}`)}`

  return {
    reference,
    merchant: merchant.upiId,
    merchantName: merchant.upiName,
    customerName: validated.customerName,
    phone: validated.phone,
    amount: validated.amount,
    upiLink,
    qrUrl: '/upi-qr-code.jpeg?v=2026-09-12-qr-final',
  }
}
