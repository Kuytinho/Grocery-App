<template>
  <section class="header-GL">
    <button class="btn-icon-GL">
      <img
        class="icon-GL"
        src="../assets/back-icon.svg"
        @click="goHome"
        alt="Voltar"
      />
      <span class="back" @click="goHome">Voltar</span>
    </button>
  </section>
  <section class="main">
    <section class="column-left">
      <h3 class="other-color">Adicionar Item</h3>
      <div class="form">
        <div class="form-item">
          <label for="produto">Produto</label>
          <input
            id="produto"
            v-model="produto"
            type="text"
            placeholder="Nome do produto"
          />
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
        <input
          class="search"
          type="search"
          v-model="termoPesquisa"
          placeholder="Buscar"
        />
      </div>
      <ul class="card-list">
        <li
          v-for="(card, index) in filteredCards"
          :key="index"
          :class="{ checked: card.checked, unchecked: !card.checked }"
        >
          <div class="line-top">
            <label class="container">
              <input
                type="checkbox"
                v-model="card.checked"
                @change="checkboxChanged(card, index)"
              />
              <span class="checkmark"></span>
            </label>
            <div class="line-top-inside">
              <img class="icon-GL" :src="card.imagem" alt="Imagem do produto" />
              <div class="space">
                <p>
                  <b>Produto:</b><span class="inside">{{ card.produto }}</span>
                </p>
                <p>
                  <b>Quantidade:</b
                  ><span class="inside">{{ card.quantidade }}</span>
                </p>
              </div>
              <div>
                <p>
                  <b>Marca:</b><span class="inside">{{ card.marca }}</span>
                </p>
                <p>
                  <b>Embalagem:</b
                  ><span class="inside">{{ card.embalagem }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="line-bottom">
            <div class="space-II">
              <p>
                <b>Observação:</b
                ><span class="inside">{{ card.observacao }}</span>
              </p>
            </div>
            <div>
              <button class="btn-icon-card" @click="card.editando = true" v-if="!card.editando">
                <img class="icon-card" src="../assets/edit-solid.svg" alt="Editar" />
              </button>
              <button class="btn-icon-card" v-if="!card.editando">
                <img @click="moverCard(index)" class="icon-card" src="../assets/exchange-alt-solid.svg" alt="Mover" />
              </button>
              <button class="btn-icon-card" v-if="!card.editando">
                <img @click="removerCard(index)" class="icon-GL" src="../assets/trash-alt.svg" alt="Remover" />
              </button>
            </div>
          </div>

          <div class="edicao" v-if="card.editando">
            <hr />
            <h5>Editar Produto</h5>
            <div class="edicao-inside">
              <div class="column-edicao-I">
                <input
                  id="produto"
                  v-model="card.produto"
                  type="text"
                  placeholder="Nome do produto"
                />
                <input
                  id="marca"
                  type="text"
                  placeholder="Marca do produto, se houver"
                  v-model="card.marca"
                />
                <input
                  id="imagem"
                  type="text"
                  placeholder="Url da imagem do produto"
                  v-model="card.imagem"
                />
              </div>
              <div class="column-edicao-II">
                <input
                  id="quantidade"
                  type="text"
                  placeholder="Quantidade e a unidade de medida"
                  v-model="card.quantidade"
                />
                <input
                  id="embalagem"
                  type="text"
                  placeholder="Tamanho da embalagem, se houver"
                  v-model="card.embalagem"
                />
                <input v-model="card.observacao" id="obs" type="text" />
              </div>
            </div>
            <div class="line-btn">
              <button class="bnt-cancelar" @click="card.editando = false">Cancelar</button>
              <button class="bnt-salvar" @click="salvarEdicao(card)">Salvar</button>
            </div>
          </div>
        </li>
      </ul>
      <h4>Itens não necessários desta vez</h4>
      <ul>
        <li
          v-for="(card, index) in itensNaoNecessarios"
          :key="index"
          :class="{ checked: card.checked, unchecked: !card.checked }"
        >
          <div class="line-top-II-nao">
            <div class="line-top-inside">
              <img class="icon-GL" :src="card.imagem" alt="Imagem do produto" />
              <div class="space">
                <p>
                  <b>Produto:</b><span class="inside">{{ card.produto }}</span>
                </p>
                <p>
                  <b>Quantidade:</b
                  ><span class="inside">{{ card.quantidade }}</span>
                </p>
              </div>
              <div>
                <p>
                  <b>Marca:</b><span class="inside">{{ card.marca }}</span>
                </p>
                <p>
                  <b>Embalagem:</b
                  ><span class="inside">{{ card.embalagem }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="line-bottom-nao">
            <div class="space-II">
              <p>
                <b>Observação:</b
                ><span class="inside">{{ card.observacao }}</span>
              </p>
            </div>
            <div>
              <button
                class="btn-icon-card-II"
                @click="moverParaListaPrincipal(index)"
              >
                <img
                  class="icon-card"
                  src="../assets/exchange-alt-solid.svg"
                  alt="Mover"
                />
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
      termoPesquisa: '',
      itensNaoNecessarios: [],
    };
  },
  computed: {
    filteredCards() {
      const termo = this.termoPesquisa.toLowerCase().trim();

      if (termo === '') {
        return this.cards.filter(
          (card) => !this.isCardInNonEssentialsList(card)
        );
      }

      return this.cards.filter((card) => {
        const nomeProduto = card.produto.toLowerCase();
        return (
          nomeProduto.includes(termo) && !this.isCardInNonEssentialsList(card)
        );
      });
    },
  },
  mounted() {
    const savedCards = localStorage.getItem('savedCards');
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
        editando: false,
      };
      this.cards.push(card);
      this.salvarCards();
      this.limparFormulario();
    },
    salvarEdicao(card) {
      card.editando = false;
      // Você pode adicionar outras lógicas de validação, etc., aqui antes de salvar as alterações

      // Encontrar o índice do card atual na lista de cards
      const index = this.cards.indexOf(card);

      if (index !== -1) {
        // Atualizar as informações do card com os valores dos campos de edição
        this.cards[index].produto = card.produto;
        this.cards[index].quantidade = card.quantidade;
        this.cards[index].imagem = card.imagem;
        this.cards[index].marca = card.marca;
        this.cards[index].embalagem = card.embalagem;
        this.cards[index].observacao = card.observacao;

        // Salvar as informações do card no local adequado (por exemplo, em um servidor, localStorage, etc.)
        this.salvarCards();
      }
    },
    isCardInNonEssentialsList(card) {
      return this.itensNaoNecessarios.includes(card);
    },
    checkboxChanged(card, index) {
      const sourceArray = this.isCardInMainList(card)
        ? this.cards
        : this.itensNaoNecessarios;
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
      localStorage.setItem('savedCards', savedCards);
    },
    limparFormulario() {
      this.produto = '';
      this.quantidade = '';
      this.imagem = '';
      this.marca = '';
      this.embalagem = '';
      this.observacao = '';
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
      localStorage.setItem('selected', this.nome);
      this.$router.push({ path: '/' });
    },
    pesquisar() {
      const termo = this.termoPesquisa.toLowerCase().trim();

      if (termo === '') {
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
  },
};
</script>

<style scooped>
ul {
  list-style-type: none;
  padding: 0;
  margin-top: 32px;
  margin-bottom: 16px;
  width: 800px;
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
  height: 760px;
}
.column-right {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  width: 816px;
  margin-left: 32px;
}

.inside span {
  display: flex;
  font-weight: 400;
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

.btn-icon-card-II {
  display: inline-flex;
  border: none;
  background: none;
  width: 24px;
  margin-left: 144px;
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
  width: 800px;
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

.edicao-inside {
  display: flex;
  flex-direction: row;
  align-self: stretch;
  width: 748px;
}

.column-edicao-I {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 24px;
}

.column-edicao-II {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.column-edicao-I input {
  box-sizing: border-box;
  flex-direction: row;
  height: 32px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #4f5902;
  border-radius: 4px;
  border: 2px solid #d9a679;
  padding: 4px 8px;
  align-items: flex-start;
  color: #402712;
  margin-top: 16px;
  width: 362px;
}

.column-edicao-I input:focus {
  border: 2px solid #402712;
}

.column-edicao-II input {
  box-sizing: border-box;
  flex-direction: row;
  height: 32px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #4f5902;
  border-radius: 4px;
  border: 2px solid #d9a679;
  padding: 4px 8px;
  align-items: flex-start;
  color: #402712;
  margin-top: 16px;
  width: 362px;
}

.column-edicao-II input:focus {
  border: 2px solid #402712;
}

h5 {
  color: #734720;
  font-size: 19px;
  font-weight: 700;
  line-height: 120%;
  margin: 0px;
  padding: 0px;
}

hr {
  border-top: 2px solid #d9a679;
  margin-top: 24px;
  margin-bottom: 24px;
}

.line-btn {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 16px;
  align-self: stretch;
}

.bnt-salvar {
  width: 121px;
  padding: 6px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #402712;
  color: #f2ece6;
  font-size: 13px;
  font-weight: 700;
  line-height: 150%;
  height: 32px;
  border: none;
  margin-left: 16px;
}

.bnt-cancelar {
  width: 121px;
  padding: 6px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid #734720;
  color: #734720;
  font-size: 13px;
  font-weight: 700;
  line-height: 150%;
  height: 32px;
  background: none;
}

.checked {
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: #bbbf34;
  border: 2px solid #bbbf34;
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

.line-top-II {
  display: flex;
  justify-content: left;
  align-items: center;
  align-self: stretch;
  margin-left: 48px;
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

.line-top-inside b {
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

.line-bottom-nao {
  display: flex;
  justify-content: left;
  align-items: center;
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

.line-bottom-nao p {
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

.line-bottom b {
  font-weight: 700;
  margin-right: 4px;
}

.line-bottom-nao b {
  font-weight: 700;
  margin-right: 4px;
}

.space {
  margin-right: 16px;
  width: 224px;
}

.space-II {
  width: 574px;
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
</style>
