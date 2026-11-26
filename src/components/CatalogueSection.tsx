import React, { useState, useMemo } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product, Category } from '../types';

interface CatalogueSectionProps {
  products: Product[];
  categories: Category[];
  onOpenDetails: (product: Product) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  products,
  categories,
  onOpenDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Filtra produtos locais em memória
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isActive || product.status === 'unavailable') return false;

      if (
        selectedCategory !== 'todas' &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.shortDescription?.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <section id="catalogo" className="py-12 sm:py-16 md:py-24 bg-parchment text-[#171713] relative border-b border-[#D8BD83]/30 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174B2A] border border-[#D8BD83] text-xs font-semibold text-[#F0E5C9] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D8BD83] shrink-0" />
            <span className="uppercase tracking-widest text-[10px] font-bold">
              Seleção Consagrada & Artesanal
            </span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171713] tracking-tight leading-tight [text-wrap:balance]">
            Catálogo Interativo de Medicinas & Arte
          </h2>

          <p className="text-sm sm:text-base text-[#36352E] leading-relaxed">
            Selecione os produtos para montar seu orçamento personalizado. Você poderá revisar quantidades, subtotais e enviar a lista diretamente para o nosso WhatsApp.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between bg-[#FAF6ED] p-3.5 sm:p-4 rounded-2xl border border-[#D8BD83]/70 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#77964A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar rapé, kuripe, resina, instrumento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-16 py-3 sm:py-2.5 rounded-xl bg-[#FFFDF9] border border-[#D8BD83] text-base sm:text-sm text-[#171713] placeholder-[#605F52] focus:outline-none focus:border-[#174B2A] transition-colors shadow-inner"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#605F52] hover:text-[#171713] px-2 py-1.5 min-h-[36px] cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs com Barra de Rolagem Discreta */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2.5 scrollbar-subtle touch-pan-x max-w-full">
            <button
              type="button"
              onClick={() => setSelectedCategory('todas')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 min-h-[44px] cursor-pointer flex items-center justify-center ${
                selectedCategory === 'todas'
                  ? 'bg-[#174B2A] text-[#F0E5C9] border-[#D8BD83] shadow-md'
                  : 'bg-[#FAF6ED] text-[#171713] border-[#D8BD83]/70 hover:border-[#174B2A] hover:bg-[#F5EEDC]'
              }`}
            >
              Todas as Categorias
            </button>

            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 min-h-[44px] cursor-pointer flex items-center justify-center ${
                  selectedCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#174B2A] text-[#F0E5C9] border-[#D8BD83] shadow-md'
                    : 'bg-[#FAF6ED] text-[#171713] border-[#D8BD83]/70 hover:border-[#174B2A] hover:bg-[#F5EEDC]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 mb-5 sm:mb-6 text-xs sm:text-sm text-[#605F52]">
          <span>
            Mostrando <strong className="text-[#171713] font-bold tabular-nums">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </span>
          {selectedCategory !== 'todas' && (
            <span className="text-[#171713] break-words">
              Filtrado por: <strong className="text-[#174B2A]">{selectedCategory}</strong>
            </span>
          )}
        </div>

        {/* Products Grid: 2 Colunas no Mobile e Tablet, 3 no Desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : searchTerm !== '' || selectedCategory !== 'todas' ? (
          <div className="py-6 text-center">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todas');
              }}
              className="px-5 py-2.5 rounded-xl bg-[#174B2A] hover:bg-[#123B21] text-[#F0E5C9] text-xs font-bold border border-[#D8BD83] transition-colors shadow-sm cursor-pointer"
            >
              Redefinir Filtros
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};


