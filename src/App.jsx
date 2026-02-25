import React, { useState } from 'react';

// 1. DADOS DOS PRODUTOS
const PRODUTOS = [
  // LANCHES
  { 
    id: 1, 
    nome: 'X-Salada', 
    categoria: 'Lanches',
    preco: 28.00, 
    descricao: 'Hambúrguer 160g, queijo prato, alface americana, tomate e maionese.', 
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 2, 
    nome: 'X-Bacon', 
    categoria: 'Lanches',
    preco: 32.00, 
    descricao: 'Hambúrguer 160g, muito bacon crocante, queijo cheddar e cebola.', 
    imagem: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 3, 
    nome: 'X-Tudo', 
    categoria: 'Lanches',
    preco: 38.00, 
    descricao: 'Hambúrguer 160g, bacon, ovo, presunto, queijo, alface e tomate.', 
    imagem: 'https://static.codepill.com.br/domains/7e4e09e5-31af-44d5-bd1e-428319709832/products/gallery_1a5cc893-622d-4037-8612-1e4663558187.jpg?w=500&auto=format&fit=crop&q=60' 
  },
  // PIZZAS
  { 
    id: 10, 
    nome: 'Pizza Margherita', 
    categoria: 'Pizzas',
    preco: 45.00, 
    descricao: 'Massa artesanal, molho, muçarela, manjericão fresco.', 
    imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 11, 
    nome: 'Pizza Calabresa', 
    categoria: 'Pizzas',
    preco: 42.00, 
    descricao: 'Muçarela, calabresa fatiada, cebola roxa e orégano.', 
    imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 12, 
    nome: 'Pizza Portuguesa', 
    categoria: 'Pizzas',
    preco: 48.00, 
    descricao: 'Presunto, ovos, cebola, ervilha, muçarela e azeitonas.', 
    imagem: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 13, 
    nome: 'Pizza Frango c/ Catupiry', 
    categoria: 'Pizzas',
    preco: 50.00, 
    descricao: 'Frango desfiado temperado e cobertura de Catupiry original.', 
    imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/ada34cd2101afafaba465aad112ee3c1_XL.jpg?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 14, 
    nome: 'Pizza Quatro Queijos', 
    categoria: 'Pizzas',
    preco: 52.00, 
    descricao: 'Muçarela, Atum, Tomate e gorgonzola.', 
    imagem: 'https://revistamenu.com.br/wp-content/uploads/sites/24/2024/04/pizza-4-queijos-borda-lenha-divulgacao-easy-resizecom-1-1.jpg?w=500&auto=format&fit=crop&q=60' 
  },
  { 
    id: 15, 
    nome: 'Pizza Atum', 
    categoria: 'Pizzas',
    preco: 52.00, 
    descricao: 'Muçarela, provolone, parmesão e gorgonzola.', 
    imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2024/10/pizza-de-atum-de-liquidificador.webp?w=500&auto=format&fit=crop&q=60' 
  },
  // BEBIDAS
  { 
    id: 20, 
    nome: 'Refrigerante Lata', 
    categoria: 'Bebidas',
    preco: 6.00, 
    descricao: 'Coca-cola, Guaraná ou Sprite (350ml).', 
    imagem: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60' 
  },
];

const CATEGORIAS = ['Todos', 'Lanches', 'Pizzas', 'Bebidas'];
const WHATSAPP_NUMERO = "5511974997109"; 

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // ESTADOS DOS MODAIS
  const [modalPizzaAberto, setModalPizzaAberto] = useState(false);
  const [modalCarrinhoAberto, setModalCarrinhoAberto] = useState(false);
  const [sabor1, setSabor1] = useState('');
  const [sabor2, setSabor2] = useState('');

  // LÓGICA DO CARRINHO
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find(item => item.id === produto.id && item.isMeia === produto.isMeia);
      if (itemExistente && !produto.isMeia) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (indexNoCarrinho) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== indexNoCarrinho));
  };

  // NOVA FUNÇÃO: Botões de + e - dentro do carrinho
  const alterarQuantidade = (indexNoCarrinho, delta) => {
    setCarrinho((prev) => prev.map((item, i) => {
      if (i === indexNoCarrinho) {
        const novaQuantidade = item.quantidade + delta;
        return { ...item, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 };
      }
      return item;
    }));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // CORREÇÃO: Calcula o número REAL de itens (somando as quantidades)
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // LÓGICA MEIA A MEIA
  const pizzasDisponiveis = PRODUTOS.filter(p => p.categoria === 'Pizzas');

  const confirmarMeiaMeia = () => {
    if (!sabor1 || !sabor2) return alert("Escolha os dois sabores!");
    
    const pizza1 = pizzasDisponiveis.find(p => p.id === parseInt(sabor1));
    const pizza2 = pizzasDisponiveis.find(p => p.id === parseInt(sabor2));
    const maiorPreco = Math.max(pizza1.preco, pizza2.preco);
    
    const pizzaMeiaMeia = {
      id: `meia-${pizza1.id}-${pizza2.id}-${Date.now()}`,
      nome: `Pizza Meio a Meio`,
      descricao: `1/2 ${pizza1.nome} e 1/2 ${pizza2.nome}`,
      preco: maiorPreco,
      imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60',
      categoria: 'Pizzas',
      isMeia: true
    };

    adicionarAoCarrinho(pizzaMeiaMeia);
    setModalPizzaAberto(false);
    setSabor1('');
    setSabor2('');
  };

  // WHATSAPP
  const finalizarPedidoWhatsApp = () => {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    let texto = "*NOVO PEDIDO DO SITE!* 🛵\n\n";
    carrinho.forEach(item => {
      texto += `${item.quantidade}x ${item.nome}\n`;
      if(item.isMeia) texto += `   👉 ${item.descricao}\n`;
      texto += `   (R$ ${(item.preco * item.quantidade).toFixed(2)})\n`;
    });

    texto += `\n*Total: R$ ${calcularTotal().toFixed(2)}*\n`;
    if (observacoes) texto += `\nObs: ${observacoes}`;

    const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
  };

  const produtosVisiveis = categoriaAtiva === 'Todos' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === categoriaAtiva);

  // CONTEÚDO DO CARRINHO (Agora atualiza em tempo real perfeitamente)
  const renderConteudoCarrinho = () => (
    <div className="flex flex-col h-full">
      {carrinho.length === 0 ? (
        <p className="text-center text-slate-400 py-10">Seu carrinho está vazio. Adicione itens deliciosos! 😋</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {carrinho.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-800">{item.nome}</p>
                  {item.isMeia && <p className="text-xs text-orange-600 font-medium">{item.descricao}</p>}
                  <p className="text-xs text-slate-500">R$ {item.preco.toFixed(2)}</p>
                </div>
                
                {/* BOTÕES DE + e - VOLTARAM AQUI */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                    <button onClick={() => alterarQuantidade(index, -1)} className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded font-bold">-</button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantidade}</span>
                    <button onClick={() => alterarQuantidade(index, 1)} className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded font-bold">+</button>
                  </div>
                  <button onClick={() => removerDoCarrinho(index)} className="text-red-500 text-xs font-bold hover:underline">Remover</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed border-slate-300 pt-4 shrink-0">
            <div className="flex justify-between items-center text-lg font-bold text-slate-800 mb-4">
              <span>Total:</span>
              <span className="text-green-600">R$ {calcularTotal().toFixed(2)}</span>
            </div>
            
            <textarea 
              value={observacoes} 
              onChange={e => setObservacoes(e.target.value)} 
              placeholder="Ex: Sem cebola, maionese à parte..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none mb-4" 
              rows="2"
            />
            
            <button 
              onClick={finalizarPedidoWhatsApp} 
              className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition transform hover:-translate-y-1"
            >
              Finalizar no WhatsApp 📲
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-24 lg:pb-4 font-sans relative">
      
      {/* MODAL MEIA A MEIA DA PIZZA */}
      {modalPizzaAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">🍕 Montar Meia a Meia</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">1º Sabor</label>
                <select value={sabor1} onChange={e => setSabor1(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50">
                  <option value="">Selecione...</option>
                  {pizzasDisponiveis.map(p => <option key={p.id} value={p.id}>{p.nome} (R$ {p.preco})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">2º Sabor</label>
                <select value={sabor2} onChange={e => setSabor2(e.target.value)} className="w-full p-3 border rounded-lg bg-gray-50">
                  <option value="">Selecione...</option>
                  {pizzasDisponiveis.map(p => <option key={p.id} value={p.id}>{p.nome} (R$ {p.preco})</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setModalPizzaAberto(false)} className="flex-1 py-3 text-gray-600 font-bold border rounded-lg hover:bg-gray-100">Cancelar</button>
              <button onClick={confirmarMeiaMeia} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar Pizza</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DO CARRINHO (Celular) */}
      {modalCarrinhoAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex flex-col justify-end lg:hidden">
          <div className="bg-white w-full h-[80vh] rounded-t-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h2 className="text-xl font-bold text-slate-800">🛒 Seu Pedido</h2>
              <button onClick={() => setModalCarrinhoAberto(false)} className="text-4xl text-slate-500 leading-none hover:text-red-500">&times;</button>
            </div>
            {renderConteudoCarrinho()}
          </div>
        </div>
      )}

      {/* BARRA FLUTUANTE INFERIOR (Celular) */}
      {carrinho.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-40 flex justify-between items-center">
          <div>
            {/* AGORA SOMA OS ITENS CERTINHO */}
            <p className="text-sm text-slate-500 font-medium">{totalItens} {totalItens === 1 ? 'item' : 'itens'}</p>
            <p className="font-bold text-lg text-slate-800">R$ {calcularTotal().toFixed(2)}</p>
          </div>
          <button 
            onClick={() => setModalCarrinhoAberto(true)} 
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-green-700 active:scale-95 transition"
          >
            Ver Pedido 🛒
          </button>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        
        {/* LADO ESQUERDO: Catálogo */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Cardápio Virtual</h1>
          
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
            {CATEGORIAS.map(cat => (
              <button key={cat} onClick={() => setCategoriaAtiva(cat)} 
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap ${categoriaAtiva === cat ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-500 border hover:bg-slate-50'}`}>
                {cat}
              </button>
            ))}
          </div>

          {(categoriaAtiva === 'Pizzas' || categoriaAtiva === 'Todos') && (
            <div onClick={() => setModalPizzaAberto(true)} className="mb-6 bg-orange-100 border-2 border-orange-200 p-4 rounded-xl cursor-pointer hover:bg-orange-200 transition flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍕</span>
                <div>
                  <h3 className="font-bold text-orange-800">Quer pedir Meia a Meia?</h3>
                  <p className="text-sm text-orange-700">Clique aqui para montar sua pizza com 2 sabores!</p>
                </div>
              </div>
              <span className="text-orange-600 font-bold text-2xl group-hover:scale-110 transition">+</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {produtosVisiveis.map(produto => (
              <div key={produto.id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col hover:shadow-md transition">
                <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded-lg mb-3" />
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-slate-800">{produto.nome}</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-sm">R$ {produto.preco.toFixed(2)}</span>
                </div>
                <p className="text-slate-500 text-sm my-2 flex-1">{produto.descricao}</p>
                <button onClick={() => adicionarAoCarrinho(produto)} className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-slate-800 transition active:scale-95">
                  Adicionar ao Pedido
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LADO DIREITO: Carrinho Fixo (SÓ APARECE NO PC) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border sticky top-4 max-h-[90vh] flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-slate-800">🛒 Seu Pedido</h2>
            {renderConteudoCarrinho()}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;