import test from 'node:test'
import assert from 'node:assert/strict'
import { createPaymentRequest, validatePaymentPayload } from './paymentService.js'

test('validatePaymentPayload rejects invalid amount', () => {
  assert.throws(() => validatePaymentPayload({ customerName: 'Raju', phone: '9014415590', amount: 0 }))
})

test('createPaymentRequest returns a valid UPI deep link and QR payload', async () => {
  const payment = await createPaymentRequest({
    customerName: 'Raju',
    phone: '9014415590',
    amount: 500,
  })

  assert.match(payment.upiLink, /^upi:\/\/pay\?/)
  assert.match(payment.upiLink, /pa=9849490171%40upi/)
  assert.ok(payment.qrDataUrl.startsWith('data:image/png;base64,'))
  assert.equal(payment.reference.length > 8, true)
})
