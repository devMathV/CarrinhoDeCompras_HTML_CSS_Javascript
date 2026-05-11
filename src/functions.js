const addProdutoAoCarrinho = (carrinho, produtoNome, preco) => {
    const prodIndex = carrinho.findIndex(p => p.nome === produtoNome)

    if (prodIndex === -1) {
        const prod = {
            nome: produtoNome,
            quant: 1,
            preco: preco,
            precoTotal() {
                return this.quant * this.preco
            }
        }
        carrinho.push(prod)
        return false
    } else {
        carrinho[prodIndex].quant += 1
        return true
    }
}

const aumentarQuantidade = (carrinho, produtoNome) => {
    const prodIndex = carrinho.findIndex(p => p.nome === produtoNome)

    carrinho[prodIndex].quant += 1
}

const diminuirQuantidade = (carrinho, produtoNome) => {
    const prodIndex = carrinho.findIndex(p => p.nome === produtoNome)

    carrinho[prodIndex].quant -= 1

    if (carrinho[prodIndex].quant === 0) {
        carrinho.splice(prodIndex, 1)
    }
}

const valorTotal = (carrinho) => {
    return carrinho.reduce((a, p) => a + (p.preco * p.quant), 0).toFixed(2).replace('.', ',')
}

const quantidadeTotal = (carrinho) => {
    return carrinho.reduce((a, p) => a + p.quant, 0)
}

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

    total.querySelector('#valor-total').textContent = `R$ ${valorTotal(carrinho)}`

    const quantTotal = quantidadeTotal(carrinho)

    total.querySelector('#quantidade-total').textContent = `/ ${quantTotal} ${quantTotal <= 1 ? 'item' : 'itens'}`
}

const limparCarrinho = (carrinho) => {
    carrinho.splice(0, carrinho.length)

    const produtos = document.querySelectorAll('#carrinho-produtos .produto')

    produtos.forEach((e) => {
        if (!(e.classList.contains('template-produto'))) e.remove()
    })

    carrinhoVazio(carrinho)
    quantidadeValorTotal(carrinho)
}

const realizarPagamento = (carrinho) => {
    const modal = document.querySelector('dialog')

    if (carrinho.length > 0) limparCarrinho(carrinho)
    else modal.textContent = 'Carrinho vazio, adicione produtos para prosseguir...'

    modal.showModal()
    
    setTimeout(() => {
        modal.close()
        modal.textContent = 'Pagamento realizado com sucesso!'
    }, 3000);
}

export {
    addProdutoAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    valorTotal,
    quantidadeTotal,
    atualizarValor,
    carrinhoVazio,
    quantidadeValorTotal,
    limparCarrinho,
    realizarPagamento,
}