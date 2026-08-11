









export const generateDigitalReceipt = (data) => {
  const messageText = `🧾 *पशु-धन (PashuDhan) आधिकारिक डिजिटल रसीद*\n` +
  `-----------------------------------\n` +
  `📌 *रसीद संख्या:* ${data.receiptId}\n` +
  `👤 *नाम:* ${data.payerName}\n` +
  `📞 *फ़ोन:* ${data.payerPhone}\n` +
  `💰 *राशि:* ₹${data.amount}\n` +
  `📋 *विवरण:* ${data.description}\n` +
  `📅 *तिथि:* ${data.date}\n` +
  `-----------------------------------\n` +
  `यह मध्य प्रदेश पशुपालन विभाग एवं गोशाला पोर्टल द्वारा प्रेषित डिजिटल रसीद है। धन्यवाद! 🙏`;

  const cleanPhone = data.payerPhone.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(messageText);

  return {
    whatsappUrl: `https://wa.me/91${cleanPhone}?text=${encodedMsg}`,
    smsUrl: `sms:91${cleanPhone}?body=${encodedMsg}`,
    formattedMessage: messageText
  };
};