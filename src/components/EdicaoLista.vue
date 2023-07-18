<template>
  <section class="header-GL">
    <button class="btn-icon-GL">
      <img class="icon-GL" src="../assets/back-icon.svg" @click="goHome" alt="Voltar" />
      <span class="back" @click="goHome">Voltar</span>
    </button>
  </section>
  <section class="main">
    <section class="column-left">
      <h3 class="other-color">Adicionar Item</h3>
      <div class="form">
        <div class="form-item">
          <label for="produto">Produto</label>
          <input id="produto" v-model="produto" type="text" placeholder="Nome do produto" />
        </div>
        <div class="form-item">
          <label for="quantidade">Quantidade</label>
          <input
            id="quantidade"
            type="text"
            placeholder="Quantidade e a unidade de medida"
            v-model="quantidade"
          />
        </div>
        <div class="form-item">
          <label for="imagem">Imagem</label>
          <input
            id="imagem"
            type="text"
            placeholder="Url da imagem do produto"
            v-model="imagem"
          />
        </div>
        <div class="form-item">
          <label for="marca">Marca</label>
          <input
            id="marca"
            type="text"
            placeholder="Marca do produto, se houver"
            v-model="marca"
          />
        </div>
        <div class="form-item">
          <label for="embalagem">Embalagem</label>
          <input
            id="embalagem"
            type="text"
            placeholder="Tamanho da embalagem, se houver"
            v-model="embalagem"
          />
        </div>
        <div class="form-item">
          <label for="obs">Observação</label>
          <input v-model="observacao" id="obs" type="text" />
        </div>
      </div>
      <button class="add" @click="adicionarCard">Adicionar</button>
    </section>
    <section class="column-right">
      <h3>Lista de Compras</h3>
      <div>
        <input class="search" type="search" v-model="termoPesquisa" placeholder="Buscar" />
        <button class="btn-principal-II" @click="pesquisar">Pesquisar</button>
      </div>
      <ul class="card-list">
        <li v-for="(card, index) in filteredCards" :key="index" :class="{ checked: card.checked, unchecked: !card.checked }">
          <div class="line-top">
            <label class="container">
              <input type="checkbox" v-model="card.checked" @change="checkboxChanged(card, index)" />
              <span class="checkmark"></span>
            </label>
            <div class="line-top-inside">
              <img class="icon-GL" :src="card.imagem" alt="Imagem do produto" />
              <div class="space">
                <p><span>Produto:</span>{{ card.produto }}</p>
                <p><span>Quantidade:</span>{{ card.quantidade }}</p>
              </div>
              <div>
                <p><span>Marca:</span>{{ card.marca }}</p>
                <p><span>Embalagem:</span>{{ card.embalagem }}</p>
              </div>
            </div>
          </div>
          <div class="line-bottom">
            <div class="space-II">
              <p><span>Observação:</span>{{card.observacao}}</p>
            </div>
            <div>
              <button class="btn-icon-card" @click="editarCard(index)">
                <img class="icon-card" src="../assets/edit-solid.svg" alt="Editar" />
              </button>
              <button class="btn-icon-card" @click="moverCard(index)">
                <img class="icon-card" src="../assets/exchange-alt-solid.svg" alt="Mover" />
              </button>
              <button class="btn-icon-card" @click="removerCard(index)">
                <img class="icon-GL" src="../assets/trash-alt.svg" alt="Remover" />
              </button>
            </div>
          </div>
          <div v-if="mostrarFormularioEdicao && cardIndexEdicao === index" class="line-bottom">
            <div class="form-item">
              <label for="produto-edicao">Produto</label>
              <input
                id="produto-edicao"
                v-model="produtoEdicao"
                type="text"
                placeholder="Nome do produto"
                class="edit-item"
              />
            </div>
            <div class="form-item">
              <label for="quantidade-edicao">Quantidade</label>
              <input
                id="quantidade-edicao"
                type="text"
                placeholder="Quantidade e a unidade de medida"
                v-model="quantidadeEdicao"
                class="edit-item"
              />
            </div>
            <div class="form-item">
              <label for="imagem-edicao">Imagem</label>
              <input
                id="imagem-edicao"
                type="text"
                placeholder="Url da imagem do produto"
                v-model="imagemEdicao"
                class="edit-item"
              />
            </div>
            <div class="form-item">
              <label for="marca-edicao">Marca</label>
              <input
                id="marca-edicao"
                type="text"
                placeholder="Marca do produto, se houver"
                v-model="marcaEdicao"
                class="edit-item"
              />
            </div>
            <div class="form-item">
              <label for="embalagem-edicao">Embalagem</label>
              <input
                id="embalagem-edicao"
                type="text"
                placeholder="Tamanho da embalagem, se houver"
                v-model="embalagemEdicao"
                class="edit-item"
              />
            </div>
            <div class="form-item">
              <label for="obs-edicao">Observação</label>
              <input v-model="observacaoEdicao" class="edit-item" id="obs-edicao" type="text" />
            </div>
            <div class="form-buttons edit-button">
              <button class="btn-principal" @click="salvarEdicao">Salvar</button>
              <button class="btn-secundario" @click="cancelarEdicao">Cancelar</button>
            </div>
          </div>
        </li>
      </ul>
      <h4>Itens não necessários desta vez</h4>
      <ul>
        <li v-for="(card, index) in itensNaoNecessarios" :key="index" :class="{ checked: card.checked, unchecked: !card.checked }">
          <div class="line-top">
            <div class="line-top-inside">
              <img class="icon-GL" :src="card.imagem" alt="Imagem do produto" />
              <div class="space">
                <p><span>Produto:</span>{{ card.produto }}</p>
                <p><span>Quantidade:</span>{{ card.quantidade }}</p>
              </div>
              <div>
                <p><span>Marca:</span>{{ card.marca }}</p>
                <p><span>Embalagem:</span>{{ card.embalagem }}</p>
              </div>
            </div>
          </div>
          <div class="line-bottom">
            <div class="space-II">
              <p><span>Observação:</span>{{card.observacao}}</p>
            </div>
            <div>
              <button class="btn-icon-card" @click="moverParaListaPrincipal(index)">
                <img class="icon-card" src="../assets/exchange-alt-solid.svg" alt="Mover" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      termoPesquisa: "",
      itensNaoNecessarios: [],
      produto: "",
      quantidade: "",
      imagem: "",
      marca: "",
      embalagem: "",
      observacao: "",
      produtoEdicao: "",
      quantidadeEdicao: "",
      imagemEdicao: "",
      marcaEdicao: "",
      embalagemEdicao: "",
      observacaoEdicao: "",
      cardIndexEdicao: null,
      mostrarFormularioEdicao: false,
    };
  },
  computed: {
    filteredCards() {
      const termo = this.termoPesquisa.toLowerCase().trim();

      if (termo === "") {
        return this.cards.filter((card) => !this.isCardInNonEssentialsList(card));
      }

      return this.cards.filter((card) => {
        const nomeProduto = card.produto.toLowerCase();
        return nomeProduto.includes(termo) && !this.isCardInNonEssentialsList(card);
      });
    },
  },
  mounted() {
    const savedCards = localStorage.getItem("savedCards");
    if (savedCards) {
      const { cards, itensNaoNecessarios } = JSON.parse(savedCards);
      this.cards = cards;
      this.itensNaoNecessarios = itensNaoNecessarios;
    }
  },
  methods: {
    adicionarCard() {
      const card = {
        produto: this.produto,
        quantidade: this.quantidade,
        imagem: this.imagem,
        marca: this.marca,
        embalagem: this.embalagem,
        observacao: this.observacao,
        checked: false,
      };
      this.cards.push(card);
      this.salvarCards();
      this.limparFormulario();
    },
    checkboxChanged(card, index) {
      const sourceArray = this.isCardInMainList(card) ? this.cards : this.itensNaoNecessarios;
      sourceArray[index] = card;
      this.salvarCards();
    },
    removerCard(index) {
      this.cards.splice(index, 1);
      this.salvarCards();
    },
    salvarCards() {
      const savedCards = JSON.stringify({
        cards: this.cards,
        itensNaoNecessarios: this.itensNaoNecessarios,
      });
      localStorage.setItem("savedCards", savedCards);
    },
    limparFormulario() {
      this.produto = "";
      this.quantidade = "";
      this.imagem = "";
      this.marca = "";
      this.embalagem = "";
      this.observacao = "";
    },
    moverCard(index) {
      const card = {
        ...this.cards[index],
        checked: false,
      };
      this.cards.splice(index, 1);
      this.itensNaoNecessarios.push(card);
      this.salvarCards();
    },
    moverParaListaPrincipal(index) {
      const card = {
        ...this.itensNaoNecessarios[index],
        checked: false,
      };
      this.itensNaoNecessarios.splice(index, 1);
      this.cards.push(card);
      this.salvarCards();
    },
    goHome() {
      localStorage.setItem("selected", this.nome);
      this.$router.push({ path: "/" });
    },
    pesquisar() {
      const termo = this.termoPesquisa.toLowerCase().trim();

      if (termo === "") {
        return;
      }

      this.cards.forEach((card) => {
        const nomeProduto = card.produto.toLowerCase();

        if (nomeProduto.includes(termo)) {
          card.hidden = false;
        } else {
          card.hidden = true;
        }
      });
    },
    isCardInMainList(card) {
      return this.cards.includes(card);
    },
    isCardInNonEssentialsList(card) {
      return this.itensNaoNecessarios.includes(card);
    },
    editarCard(index) {
      const card = this.cards[index];
      this.produtoEdicao = card.produto;
      this.quantidadeEdicao = card.quantidade;
      this.imagemEdicao = card.imagem;
      this.marcaEdicao = card.marca;
      this.embalagemEdicao = card.embalagem;
      this.observacaoEdicao = card.observacao;
      this.cardIndexEdicao = index;
      this.mostrarFormularioEdicao = true;
    },
    salvarEdicao() {
      const cardIndex = this.cardIndexEdicao;
      this.cards[cardIndex].produto = this.produtoEdicao;
      this.cards[cardIndex].quantidade = this.quantidadeEdicao;
      this.cards[cardIndex].imagem = this.imagemEdicao;
      this.cards[cardIndex].marca = this.marcaEdicao;
      this.cards[cardIndex].embalagem = this.embalagemEdicao;
      this.cards[cardIndex].observacao = this.observacaoEdicao;
      this.mostrarFormularioEdicao = false;
      this.salvarCards();
    },
    cancelarEdicao() {
      this.mostrarFormularioEdicao = false;
    },
  },
};
</script>


<style scooped>
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 32px;
  margin-bottom: 16px;
  /*  width: 768px;*/
  align-self: stretch;
}

li {
  margin-bottom: 16px;
}
.main {
  display: flex;
}

.column-left {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  background: #734720;
  width: 392px;
}
.column-right {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  width: 816px;
  margin-left: 32px;
}
.header-GL {
  margin-bottom: 48px;
}
.btn-icon-GL {
  align-items: center;
  display: flex;
  border: none;
  background: none;
}
.icon-GL {
  display: flex;
  align-items: center;
  width: 32px;
  height: auto;
}

.btn-icon-card {
  align-items: center;
  display: inline-flex;
  border: none;
  background: none;
  width: 24px;
  margin-left: 16px;
}

.back {
  color: #4f5902;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
  align-items: center;
  padding-left: 8px;
}
label {
  display: block;
  color: #f2ece6;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
}
.search {
  width: 622px;
}
.btn-principal-II {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  margin-left: 8px;
  background: #4f5902;
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #f2ece6;
  border: none;
}

.add {
  padding: 12px 32px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: #bf7d2c;
  color: #f2ece6;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
  border: none;
  margin-top: 32px;
}
.other-color {
  color: #f29e38;
}

h3 {
  color: #734720;
  font-size: 33px;
  font-weight: 700;
  line-height: 120%;
  margin-top: 0px;
  padding-top: 0px;
}

h4 {
  color: #734720;
  font-size: 28px;
  font-weight: 700;
  line-height: 120%;
  margin-top: 0px;
  padding-top: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
}

.form-item {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form input {
  padding: 12px 16px;
  width: 344px;
  background: none;
  border-radius: 8px;
  border: 2px solid #f2ece6;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #f2ece6;
}

.form input::placeholder {
  color: #a6998d;
}

.form label {
  margin-bottom: 8px;
}

.column-right input {
  box-sizing: border-box;
  flex-direction: row;
  padding: 12px 16px;
  height: 48px;
  border: 2px solid #4f5902;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #4f5902;
  background-color: #f2ece6;
}

.checked {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: #bbbf34;
}

.unchecked {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: none;
  border: 2px solid #d9a679;
}

.line-top {
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: stretch;
}
.line-top-inside {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.line-top-inside img {
  width: 74px;
  height: 74px;
  border-radius: 4px;
  margin-right: 16px;
}

.line-top-inside p {
  margin: 0;
  padding: 0;
  color: #402712;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
}

.line-top-inside span {
  font-weight: 700;
  margin-right: 4px;
}

.line-bottom {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
}

.line-bottom-disabled {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 8px;
}

.line-bottom-disabled p {
  margin: 0;
  padding: 0;
  color: #402712;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
}

.line-bottom p {
  margin: 0;
  padding: 0;
  color: #402712;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
}

.line-bottom-disabled span {
  font-weight: 700;
  margin-right: 4px;
}

.line-bottom span {
  font-weight: 700;
  margin-right: 4px;
}

.space {
  margin-right: 16px;
  width: 224px;
}

.space-II {
  width: 544px;
}

.space-III {
  width: 672px;
}

.container {
  display: block;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 21px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  border-radius: 50%;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #f2ece6;
  border: 1px solid #d9a679;
  border-radius: 50%;
}

.container input:checked ~ .checkmark {
  background-color: #4f5902;
  border: 1px solid #4f5902;
  border-radius: 50%;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.edit-item {
  width: 90px;
}
</style>