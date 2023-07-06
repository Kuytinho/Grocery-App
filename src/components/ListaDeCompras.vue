<template>
  <div>
    <section class="header">
      <img class="card" src="../assets/Avatar.png" alt="Avatar" />
      <form @submit.prevent="adicionarLista">
        <input type="text" v-model="newItem" placeholder="Nome da lista" required />
        <button class="btn-principal" type="submit">Criar</button>
    </form>
    </section>
    <h1>Minhas</h1>
    <h1>Listas</h1>
    <div class="lista">
      <div class="item" v-for="(lista, index) in listas" :key="index" @click="editarLista(lista.nome)">
        <h2>{{ lista.nome }}</h2>
        <div class="align">
          <img class="card" src="../assets/Avatar.png" alt="Avatar" />
          <div class="actions">
            <button class="btn-icon" @click.stop="copiarLista(index)">
              <img class="icon" src="../assets/copy-icon.svg" alt="Copiar" />
              <span>Copiar</span>
            </button>
            <button class="btn-icon" @click.stop="excluirLista(index)">
              <img class="icon" src="../assets/trash-icon.svg" alt="Excluir" />
              <span>Excluir</span>
            </button>
         </div>
        </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nomeLista: "",
      listas: [],
    };
  },
  mounted() {
    const listasSalvas = localStorage.getItem("listas");
    if (listasSalvas) {
      this.listas = JSON.parse(listasSalvas);
    }
  },
  methods: {
    adicionarLista() {
      const novaLista = {
        id: Date.now().toString(),
        nome: this.newItem,
      };
      this.listas.push(novaLista);
      this.salvarListas();
      this.newItem = "";
    },
    copiarLista(index) {
      const lista = this.listas[index];
      const novaLista = {
        id: Date.now().toString(),
        nome: lista.nome,
      };
      this.listas.push(novaLista);
      this.salvarListas();
    },
    excluirLista(index) {
      this.listas.splice(index, 1);
      this.salvarListas();
    },
    editarLista(id) {
      const listaSelecionada = this.listas.find(lista => lista.nome === id);
      localStorage.setItem("selected", listaSelecionada.nome);
      this.$router.push({ path: `/edicao/${id}` });
    },
    salvarListas() {
      localStorage.setItem("listas", JSON.stringify(this.listas));
    },
  },
};
</script>

<style scooped>
.btn-icon {
  color: #4c2f15;
  font-size: 13px;
  background: none;
  border: none;
}
.icon {
  width: 32px;
  height: auto;
  display: block;
  margin-bottom: 4px;
}

.lista {
  display: flex;
  flex-direction: row;
  max-width: 1280px;
  margin: 0;
  padding: 0;
}

.item {
  padding: 40px;
  border-radius: 16px;
  border: 4px solid #f29e38;
  background: #f29d38;
  height: auto;
  width: auto;
  list-style-type: none;
  margin-right: 16px;
  min-width: 300px;
}

a {
  text-decoration: none;
  display: flex;
  columns: row;
}

h2 {
  font-size: 40px;
  font-weight: 700;
  color: #402712;
  margin: 0;
  padding: 0;
}

.align {
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.actions {
  display: flex;
  align-items: flex;
}

.header input {
  box-sizing: border-box;
  flex-direction: row;
  padding: 12px 16px;
  width: 358px;
  height: 48px;
  border: 2px solid #4f5902;
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #a6998d;
  background-color: #f2ece6;
}
</style>
