import * as f from './functions.js'

const produtos = [
    {
        imagem: './imgs/spike_pelucia.jpg',
        nome: 'Pelúcia do Spike',
        valor: 50.00,
    },
    {
        imagem: './imgs/leon_pelucia.jpg',
        nome: 'Pelúcia do Leon',
        valor: 40.00,
    },
    {
        imagem: './imgs/bruce_pelucia.png',
        nome: 'Pelúcia do Bruce',
        valor: 60.00,
    },
]

const valorReal = (valor) => valor.toFixed(2).replace('.', ',')

window.addEventListener('load', function() {
    const templatePelucia = document.querySelector('.template-pelucia')

    const pai = document.querySelector('#container-produtos')

    produtos.map(produto => {
        const newPelucia = templatePelucia.cloneNode(true)

        newPelucia.querySelector('img').src = produto.imagem
        newPelucia.querySelector('img').alt = produto.nome

        newPelucia.querySelector('.nome-produto').textContent = produto.nome
        newPelucia.querySelector('.valor').textContent = `R$ ${valorReal(produto.valor)}`

        newPelucia.classList.remove('template-pelucia')

        const addBtn = newPelucia.querySelector('.adicionar-ao-carrinho')

        addBtn.addEventListener('click', () => adicionarAoCarrinho(produto))

        pai.appendChild(newPelucia)
    })
})

let carrinho = []

const adicionarAoCarrinho = (pelucia) => {
    // Adiciona o produto se não existir no carrinho, aumenta a quantidade em 1 se existir.
    // A função retorna um bool que diz se há (true) ou não (false) o produto no carrinho
    const produtoExiste = f.addProdutoAoCarrinho(carrinho, pelucia.nome, pelucia.valor)

    // Os dados do produto atual são armazenados na variável
    const produto = carrinho.find(p => p.nome === pelucia.nome)

    if (produtoExiste) {
        // Seleciona todos os produtos
        const prod = document.querySelectorAll('#carrinho-produtos .produto')

        // Procura o produto que tem o mesmo nome e aumenta a quantidade em um
        prod.forEach(e => {
            if (e.querySelector('.nome-produto').textContent === produto.nome) {
                const quant = e.querySelector('.quantidade .quantidade-valor')
                quant.textContent = produto.quant

                f.atualizarValor(e, produto)

                return
            }
        })
    } else {
        // Pegar e copiar o template
        const templateProduto = document.querySelector(".template-produto")
        const newProd = templateProduto.cloneNode(true)

        // Variável referente ao elemento pai do produto
        const parent = document.querySelector('#carrinho-produtos')

        // Define o nome e a imagem do produto
        newProd.querySelector('.nome-produto').textContent = pelucia.nome
        newProd.querySelector('img').src = pelucia.imagem

        // Atualiza a quantidade
        const quantHTML = newProd.querySelector('.quantidade .quantidade-valor')
        quantHTML.textContent = produto.quant

        // Atualiza o valor do produto
        f.atualizarValor(newProd, produto)

        // Adiciona o eventListener para adicionar em 1 a quantidade do produto no carrinho
        const adicionarBtn = newProd.querySelector('.adicionar')

        adicionarBtn.addEventListener('click', function () {
            quantHTML.textContent = produto.quant + 1

            // Aumenta a quantidade no carrinho e atualiza visualmente o valor
            f.aumentarQuantidade(carrinho, produto.nome)
            f.atualizarValor(newProd, produto)

            f.quantidadeValorTotal(carrinho)
        })

        /* Adiciona o eventListener para diminuir em 1 a quantidade do produto 
        no carrinho. Remove o produto se a quantidade for 0 */
        const removerBtn = newProd.querySelector('.remover')

        removerBtn.addEventListener('click', function () {
            quantHTML.textContent = produto.quant - 1

            // Diminui a quantidade no carrinho e atualiza visualmente o valor
            f.diminuirQuantidade(carrinho, produto.nome)
            f.atualizarValor(newProd, produto)

            // Remove e atualiza o array carrinho se a quantidade virar 0
            if (produto.quant === 0) {
                parent.removeChild(newProd)

                // Verifica se o carrinho ficou vazio após remover o produto
                f.carrinhoVazio(carrinho)
            }
            f.quantidadeValorTotal(carrinho)
        })

        // Remove a classe "template" e adiciona o produto ao carrinho
        newProd.classList.remove('template-produto')
        parent.appendChild(newProd)
    }
    // Aciona a função para verificar se o carrinho está vazio
    f.carrinhoVazio(carrinho)

    f.quantidadeValorTotal(carrinho)
}

// eventListener no botão para limpar todos os itens
const limparBtn = document.querySelector('#limpar-btn')
limparBtn.addEventListener('click', () => f.limparCarrinho(carrinho))

// eventListener para realizar o pagamento (remove todos os itens do carrinho também)
const pagarBtn = document.querySelector('#pagar')
pagarBtn.addEventListener('click', () => f.realizarPagamento(carrinho))