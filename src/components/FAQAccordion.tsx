import React, { useState } from 'react';
import { getConsultationUrl } from '../utils/whatsapp';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bagaimana cara mengetahui harga pintu?',
    answer:
      'Harga tidak dicantumkan di katalog ini karena bergantung pada pilihan dimensi custom, jenis kusen/architrave, dan lokasi pengiriman. Kirim kode model dan kota domisilimu ke tim penjualan MOMO via WhatsApp untuk mendapatkan estimasi penawaran harga terbaru.'
  },
  {
    id: 'faq-2',
    question: 'Apakah semua model tersedia?',
    answer:
      'Ketersediaan unit dan jadwal produksi bervariasi mengikuti tipe pintu serta kuantitas pemesanan. Kami sarankan untuk mengonfirmasi kode model pilihanmu langsung kepada representatif MOMO.'
  },
  {
    id: 'faq-3',
    question: 'Finishing apa saja yang tersedia?',
    answer:
      'MOMO menghadirkan pilihan finishing populer seperti Golden Teak Emboss, Warm White Emboss, Black Rosewood, Siam Rosewood, dan Pearl White. Kamu dapat mendiskusikan opsi finishing yang paling ideal untuk model yang kamu minati.'
  },
  {
    id: 'faq-4',
    question: 'Apakah ada garansi?',
    answer:
      'Ya, MOMO memberikan garansi tercantum hingga 3 tahun untuk stabilitas struktur pintu sesuai syarat dan ketentuan pemakaian resmi dari MOMO.'
  }
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const consultationUrl = getConsultationUrl('pertanyaan umum seputar pintu MOMO');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-20 bg-white" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Heading & Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-momo-red"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-momo-red">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              Yang sering<br />
              <span className="font-editorial-italic font-normal">ditanyakan.</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Informasi akhir seperti harga dan ketersediaan perlu dikonfirmasi langsung ke MOMO.
            </p>
            <div className="pt-2">
              <a
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-800 hover:text-momo-red transition-colors focus:outline-none focus:ring-2 focus:ring-momo-red rounded-sm"
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Masih ada pertanyaan?</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-zinc-200 rounded-xl p-5 hover:border-zinc-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-momo-red rounded-lg"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900">{faq.question}</h3>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-momo-yellow text-zinc-900'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`${faq.id}-content`}
                      role="region"
                      aria-labelledby={faq.id}
                      className="text-xs text-zinc-500 mt-3 leading-relaxed border-t border-zinc-100 pt-3"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
