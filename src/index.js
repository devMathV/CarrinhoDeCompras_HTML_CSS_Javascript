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
    const pai = this.parentNode

    const produtoNome = pai.querySelector('.nome-produto').textContent

    const produtoInfo = produtos.find(e => e.nome === produtoNome)

    const existe = f.addProdutoAoCarrinho(carrinho, produtoInfo.nome, produtoInfo.valor)

    const produto = carrinho.find(p => p.nome === produtoNome)

    if (existe) {
        const prod = document.querySelectorAll('#carrinho-produtos .produto')

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

        // Cria o evento de adicionar em um a quantidade do produto no carrinho
        const adicionarBtn = newProd.querySelector('.adicionar')

        adicionarBtn.addEventListener('click', function () {
            quant.textContent = produto.quant + 1

            f.aumentarQuantidade(carrinho, produto.nome)

            atualizarValor(newProd, produto)
        })

        // Cria o evento de diminuir em um a quantidade do produto no carrinho
        const removerBtn = newProd.querySelector('.remover')

        removerBtn.addEventListener('click', function () {
            quant.textContent = produto.quant - 1

            f.diminuirQuantidade(carrinho, produto.nome)

            atualizarValor(newProd, produto)

            if (produto.quant === 0) {
                parent.removeChild(newProd)
            }
        })

        // Remove a classe "template" e adiciona o produto ao carrinho
        newProd.classList.remove('template')
        parent.appendChild(newProd)
    }
}))

// Função para atualizar o valor no HTML
const atualizarValor = (produtoHTML, produto) => {
    produtoHTML.querySelector('.quantidade .valor').textContent = produto.precoTotal()
}