import React, { useState, useMemo, useEffect } from 'react';
import { momoProducts, type MomoProduct } from '../data/momo-products';
import { getModelInquiryUrl } from '../utils/whatsapp';

type CategoryFilter = 'all' | 'carbon' | 'panel' | 'classic';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MomoProduct | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct]);

  // Filtered products based on category and search
  const filteredProducts = useMemo(() => {
    return momoProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        product.code.toLowerCase().includes(q) ||
        product.name.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Initial display limit is 8 doors; clicking "Lihat semua" expands
  const displayedProducts = useMemo(() => {
    if (isExpanded || filteredProducts.length <= 8) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, 8);
  }, [filteredProducts, isExpanded]);

  const getCategoryLabel = (category: string) => {
    switch (category.toLowerCase()) {
      case 'carbon':
        return 'CARBON';
      case 'panel':
        return 'PANEL';
      case 'classic':
        return 'KLASIK';
      default:
        return category.toUpperCase();
    }
  };

  const getCategorySubtitle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'carbon':
        return 'Modern carbon';
      case 'panel':
        return 'Warm wood panel';
      case 'classic':
        return 'Contemporary classic';
      default:
        return 'Pintu solid';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-momo-cream" id="koleksi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-0.5 bg-momo-red"></div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-momo-red">
                THE COLLECTION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              Temukan pintu yang<br />
              <span className="font-editorial-italic font-normal">paling terasa kamu.</span>
            </h2>
          </div>
          <div className="max-w-md text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Dari garis modern yang bersih sampai detail panel klasik. Mulai dari model yang kamu suka, lalu sesuaikan pilihan material dan ketersediaannya.
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 border-b border-zinc-200">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter Kategori Model">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setIsExpanded(false);
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-momo-red text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Semua model
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('carbon');
                setIsExpanded(false);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === 'carbon'
                  ? 'bg-momo-red text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Carbon
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('panel');
                setIsExpanded(false);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === 'panel'
                  ? 'bg-momo-red text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Panel
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('classic');
                setIsExpanded(false);
              }}
              className={`px-5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                selectedCategory === 'classic'
                  ? 'bg-momo-red text-white shadow-sm'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Klasik
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsExpanded(false);
              }}
              placeholder="Cari kode model..."
              aria-label="Cari kode model pintu"
              className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-zinc-200 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-momo-red focus:border-momo-red"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-400 hover:text-zinc-600"
                aria-label="Hapus pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Count Strip */}
        <div className="py-4 text-[11px] font-medium text-zinc-500 uppercase tracking-wider flex justify-between items-center">
          <span>{filteredProducts.length} pilihan tercatat</span>
          <span>Tebal 4.5 cm HMR • Melamin Finish</span>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-zinc-300">
            <p className="text-sm font-semibold text-zinc-700">Tidak ada model yang cocok dengan &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-xs text-zinc-500 mt-1">Coba gunakan kode model lain seperti K-001, R-002, atau Z-002.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-momo-red text-white text-xs font-semibold rounded-full"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Door Models Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-2">
          {displayedProducts.map((product) => {
            const inquiryUrl = getModelInquiryUrl(product.code, product.name);
            return (
              <div
                key={`${product.code}-${product.name}`}
                className="bg-white rounded-xl p-3 sm:p-4 border border-zinc-200 hover:border-zinc-300 transition duration-200 group flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                    {getCategoryLabel(product.category)}
                  </span>
                  {/* Photo Container */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="w-full aspect-[9/16] bg-stone-100/80 rounded-lg overflow-hidden flex items-center justify-center p-3 relative cursor-pointer group-hover:bg-stone-200/50 transition"
                    title={`Klik untuk melihat detail ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={`Pintu MOMO ${product.name} kategori ${product.category}`}
                      loading="lazy"
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      width="213"
                      height="638"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-momo-red transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-zinc-500">{getCategorySubtitle(product.category)}</p>
                  </div>
                  <a
                    href={inquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-zinc-100 group-hover:bg-momo-red group-hover:text-white flex items-center justify-center text-zinc-500 text-xs transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-momo-red"
                    aria-label={`Tanya ${product.name} via WhatsApp`}
                    title="Konsultasi model ini via WhatsApp"
                  >
                    →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button and Disclaimers */}
        {filteredProducts.length > 8 && (
          <div className="text-center mt-12 space-y-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-semibold text-zinc-800 transition shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-momo-red"
            >
              <span>
                {isExpanded
                  ? 'Tampilkan lebih sedikit'
                  : `Lihat semua ${filteredProducts.length} desain`}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-[11px] text-zinc-400 max-w-xl mx-auto">
              Gambar merupakan referensi visual dari katalog MOMO. Silakan verifikasi finishing, spesifikasi, kerapian, dan ketersediaan dengan tim penjualan resmi MOMO.
            </p>
          </div>
        )}

        {filteredProducts.length <= 8 && filteredProducts.length > 0 && (
          <div className="text-center mt-10">
            <p className="text-[11px] text-zinc-400 max-w-xl mx-auto">
              Gambar merupakan referensi visual dari katalog MOMO. Silakan verifikasi finishing, spesifikasi, kerapian, dan ketersediaan dengan tim penjualan resmi MOMO.
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-zinc-200 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Product Visual */}
              <div className="w-40 sm:w-48 aspect-[9/16] bg-stone-100 rounded-xl p-3 flex items-center justify-center shrink-0 border border-zinc-200">
                <img
                  src={selectedProduct.image}
                  alt={`Detail ${selectedProduct.name}`}
                  className="max-h-full w-auto object-contain"
                />
              </div>

              {/* Product Information */}
              <div className="space-y-4 flex-1 text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-momo-red block mb-1">
                    {getCategoryLabel(selectedProduct.category)}
                  </span>
                  <h3 id="modal-title" className="text-xl font-bold text-zinc-900">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Kode: {selectedProduct.code}</p>
                </div>

                <div className="space-y-2 text-xs text-zinc-600 border-t border-b border-zinc-100 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Inti Kayu:</span>
                    <span className="font-semibold text-zinc-800">Tebal 4,5 cm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Material Permukaan:</span>
                    <span className="font-semibold text-zinc-800">HMR Padat</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Finishing:</span>
                    <span className="font-semibold text-zinc-800">Melamin Halus</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Garansi:</span>
                    <span className="font-semibold text-zinc-800">3 Tahun Tercantum</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-500">
                  Untuk konsultasi ukuran custom, kusen architrave, dan penawaran harga, hubungi representatif MOMO melalui WhatsApp.
                </p>

                <div className="pt-2">
                  <a
                    href={getModelInquiryUrl(selectedProduct.code, selectedProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-momo-red hover:bg-momo-darkred text-white py-3 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition shadow-md"
                  >
                    <span>Tanya Model Ini via WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
