const addProdutoAoCarrinho = (carrinho, produtoNome, preco) => {
    const prodIndex = carrinho.findIndex(p => p.nome === produtoNome)

    if (prodIndex === -1) {
        const prod = {
            nome: produtoNome,
            quant: 1,
            preco: preco
        }
        carrinho.push(prod)
    } else {
        carrinho[prodIndex].quant += 1
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
    return carrinho.reduce((a, p) => a + (p.preco * p.quant), 0).toFixed(2)
}

export {
    addProdutoAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    valorTotal
}