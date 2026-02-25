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
  // PIZZAS (Adicionei mais sabores)
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
    nome: 'Pizza Atun', 
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

  // ESTADOS PARA O MODAL DE MEIA A MEIA
  const [modalAberto, setModalAberto] = useState(false);
  const [sabor1, setSabor1] = useState('');
  const [sabor2, setSabor2] = useState('');

  // LÓGICA DO CARRINHO
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find(item => item.id === produto.id && item.isMeia === produto.isMeia);
      // Se for item normal (não meia a meia), soma quantidade
      if (itemExistente && !produto.isMeia) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      // Se for meia a meia ou novo item, adiciona novo
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (indexNoCarrinho) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== indexNoCarrinho));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // LÓGICA MEIA A MEIA
  const pizzasDisponiveis = PRODUTOS.filter(p => p.categoria === 'Pizzas');

  const confirmarMeiaMeia = () => {
    if (!sabor1 || !sabor2) return alert("Escolha os dois sabores!");
    
    const pizza1 = pizzasDisponiveis.find(p => p.id === parseInt(sabor1));
    const pizza2 = pizzasDisponiveis.find(p => p.id === parseInt(sabor2));
    
    // Regra de preço: cobra pelo maior valor
    const maiorPreco = Math.max(pizza1.preco, pizza2.preco);
    
    const pizzaMeiaMeia = {
      id: `meia-${pizza1.id}-${pizza2.id}-${Date.now()}`, // ID único
      nome: `Pizza Meio a Meio`,
      descricao: `1/2 ${pizza1.nome} e 1/2 ${pizza2.nome}`,
      preco: maiorPreco,
      imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60', // Imagem genérica de pizza
      categoria: 'Pizzas',
      isMeia: true
    };

    adicionarAoCarrinho(pizzaMeiaMeia);
    setModalAberto(false);
    setSabor1('');
    setSabor2('');
  };

  // WHATSAPP
  const finalizarPedidoWhatsApp = () => {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    let texto = "*NOVO PEDIDO DO SITE!* 🍕\n\n";
    
    carrinho.forEach(item => {
      texto += `${item.quantidade}x ${item.nome}\n`;
      if(item.isMeia) {
        texto += `   👉 ${item.descricao}\n`;
      }
      texto += `   (R$ ${(item.preco * item.quantidade).toFixed(2)})\n`;
    });

    texto += `\n*Total: R$ ${calcularTotal().toFixed(2)}*\n`;
    if (observacoes) texto += `\nObs: ${observacoes}`;

    const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
  };

  const produtosVisiveis = categoriaAtiva === 'Todos' ? PRODUTOS : PRODUTOS.filter(p => p.categoria === categoriaAtiva);

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans relative">
      
      {/* MODAL MEIA A MEIA */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
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
              <button onClick={() => setModalAberto(false)} className="flex-1 py-3 text-gray-600 font-bold border rounded-lg hover:bg-gray-100">Cancelar</button>
              <button onClick={confirmarMeiaMeia} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Adicionar Pizza</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Cardápio Virtual</h1>
          
          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            {CATEGORIAS.map(cat => (
              <button key={cat} onClick={() => setCategoriaAtiva(cat)} 
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap ${categoriaAtiva === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* BOTÃO ESPECIAL PARA MONTAR PIZZA */}
          {(categoriaAtiva === 'Pizzas' || categoriaAtiva === 'Todos') && (
            <div onClick={() => setModalAberto(true)} className="mb-6 bg-orange-100 border-2 border-orange-200 p-4 rounded-xl cursor-pointer hover:bg-orange-200 transition flex items-center justify-between group">
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
              <div key={produto.id} className="bg-white rounded-xl shadow-sm border p-4 flex flex-col">
                <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover rounded-lg mb-3" />
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{produto.nome}</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-sm">R$ {produto.preco.toFixed(2)}</span>
                </div>
                <p className="text-slate-500 text-sm my-2 flex-1">{produto.descricao}</p>
                <button onClick={() => adicionarAoCarrinho(produto)} className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold hover:bg-slate-800">Adicionar</button>
              </div>
            ))}
          </div>
        </div>

        {/* CARRINHO */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border sticky top-4">
            <h2 className="text-xl font-bold mb-4">🛒 Seu Pedido</h2>
            {carrinho.length === 0 ? <p className="text-center text-slate-400">Carrinho vazio.</p> : (
              <div className="space-y-4">
                {carrinho.map((item, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <div className="flex-1">
                      <p className="font-bold text-sm">{item.nome}</p>
                      {/* Se for meia a meia, mostra a descrição dos sabores */}
                      {item.isMeia && <p className="text-xs text-orange-600 font-medium">{item.descricao}</p>}
                      <p className="text-xs text-slate-500">R$ {item.preco.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{item.quantidade}x</span>
                      <button onClick={() => removerDoCarrinho(index)} className="text-red-500 text-xs">Remover</button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <textarea 
                    value={observacoes} 
                    onChange={e => setObservacoes(e.target.value)} 
                    placeholder="Observações..." 
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>

                <button onClick={finalizarPedidoWhatsApp} className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">
                  Finalizar no WhatsApp 📲
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;