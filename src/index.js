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

let carrinho = []

const adicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho')

adicionarAoCarrinho.forEach(e => e.addEventListener('click', function () {
    // Pega o elemento pai
    const pai = this.parentNode

    // Pega o nome do produto no HTML, compara com o do objeto e o atribui a uma variável
    const produtoNome = pai.querySelector('.nome-produto').textContent
    const produtoInfo = produtos.find(e => e.nome === produtoNome)

    // Adiciona o produto se não existir no carrinho, aumenta a quantidade em 1 se existir.
    // A função retorna um bool que diz se há (true) ou não (false) o produto no carrinho
    const produtoExiste = f.addProdutoAoCarrinho(carrinho, produtoInfo.nome, produtoInfo.valor)

    // Os dados do produto atual são armazenados na variável
    const produto = carrinho.find(p => p.nome === produtoNome)

    if (produtoExiste) {
        // Seleciona todos os produtos
        const prod = document.querySelectorAll('#carrinho-produtos .produto')

        // Procura o produto que tem o mesmo nome e aumenta a quantidade em um
        prod.forEach(e => {
            if (e.querySelector('.nome-produto').textContent === produto.nome) {
                const quant = e.querySelector('.quantidade .quantidade-valor')
                quant.textContent = produto.quant

                atualizarValor(e, produto)

                return
            }
        })
    } else {
        // Pegar e copiar o template
        const template = document.querySelector(".template")
        const newProd = template.cloneNode(true)

        // Variável referente ao elemento pai do produto
        const parent = document.querySelector('#carrinho-produtos')

        // Define o nome e a imagem do produto
        newProd.querySelector('.nome-produto').textContent = produtoInfo.nome
        newProd.querySelector('img').src = produtoInfo.imagem

        // Atualiza a quantidade
        const quant = newProd.querySelector('.quantidade .quantidade-valor')
        quant.textContent = produto.quant

        // Atualiza o valor do produto
        atualizarValor(newProd, produto)

        // Adiciona o eventListener para adicionar em 1 a quantidade do produto no carrinho
        const adicionarBtn = newProd.querySelector('.adicionar')

        adicionarBtn.addEventListener('click', function () {
            quant.textContent = produto.quant + 1

            // Aumenta a quantidade no carrinho e atualiza visualmente o valor
            f.aumentarQuantidade(carrinho, produto.nome)
            atualizarValor(newProd, produto)

            quantidadeValorTotal(carrinho)
        })

        /* Adiciona o eventListener para diminuir em 1 a quantidade do produto 
        no carrinho. Remove o produto se a quantidade for 0 */
        const removerBtn = newProd.querySelector('.remover')

        removerBtn.addEventListener('click', function () {
            quant.textContent = produto.quant - 1

            // Diminui a quantidade no carrinho e atualiza visualmente o valor
            f.diminuirQuantidade(carrinho, produto.nome)
            atualizarValor(newProd, produto)

            // Remove e atualiza o array carrinho se a quantidade virar 0
            if (produto.quant === 0) {
                parent.removeChild(newProd)

                // Verifica se o carrinho ficou vazio após remover o produto
                carrinhoVazio(carrinho)
            }
            quantidadeValorTotal(carrinho)
        })

        // Remove a classe "template" e adiciona o produto ao carrinho
        newProd.classList.remove('template')
        parent.appendChild(newProd)
    }
    // Aciona a função para verificar se o carrinho está vazio
    carrinhoVazio(carrinho)

    quantidadeValorTotal(carrinho)
}))

// Função para atualizar o valor no HTML
const atualizarValor = (produtoHTML, produto) => {
    produtoHTML.querySelector('.quantidade .valor').textContent = `R$ ${produto.precoTotal().toFixed(2).replace('.', ',')}`
}

// Função para identificar se o carrinho está vazio e apresentar a mensagem
const carrinhoVazio = (carrinho) => {
    const carrinhoVazio = document.querySelector('#mensagem-carrinho-vazio')

    if (carrinho.length === 0) {
        carrinhoVazio.classList.remove('tem-produto')
    } else {
        carrinhoVazio.classList.add('tem-produto')
    }
}

// Função para mostrar a quantidade e valor total dos produtos
const quantidadeValorTotal = (carrinho) => {
    const total = document.querySelector('#container-total')

    total.querySelector('#valor-total').textContent = `R$ ${f.valorTotal(carrinho)}`

    const quantTotal = f.quantidadeTotal(carrinho)

    total.querySelector('#quantidade-total').textContent = `/ ${quantTotal} ${quantTotal <= 1 ? 'item' : 'itens'}`
}

const limpar = document.querySelector('#limpar-btn')

limpar.addEventListener('click', function() {
    carrinho = []

    const produtos = document.querySelectorAll('#carrinho-produtos .produto')

    produtos.forEach((e) => {
        if (!(e.classList.contains('template'))) e.remove()
    })

    carrinhoVazio(carrinho)
    quantidadeValorTotal(carrinho)
})