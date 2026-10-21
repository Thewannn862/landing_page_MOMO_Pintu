export const MOMO_PHONE_NUMBER = '6281316576320';
export const MOMO_DISPLAY_PHONE = '+62 813-1657-6320';

/**
 * Builds a direct WhatsApp URL with custom message encoded
 */
export function getWhatsAppUrl(message?: string): string {
  if (!message) {
    return `https://wa.me/${MOMO_PHONE_NUMBER}`;
  }
  return `https://wa.me/${MOMO_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a WhatsApp message for a specific door model inquiry
 */
export function getModelInquiryUrl(modelCode: string, modelName?: string): string {
  const nameText = modelName ? ` (${modelName})` : '';
  const message = `Halo MOMO Pintu Kayu, saya tertarik dengan Model ${modelCode}${nameText}. Boleh minta info spesifikasi, pilihan finishing, dan harganya?`;
  return getWhatsAppUrl(message);
}

/**
 * Builds a WhatsApp message for general consultation
 */
export function getConsultationUrl(topic: string = 'pintu interior'): string {
  const message = `Halo MOMO Pintu Kayu, saya ingin konsultasi mengenai ${topic} untuk proyek/rumah saya.`;
  return getWhatsAppUrl(message);
}
