<template>
  <div id="register" class="ui middle aligned center aligned grid">
      <div class="column" style="max-width: 900px">
        <h1>Graduando Avexado</h1>
        <div class="ui info message">
          <div class="header">
            <h5>Favor leia as informações abaixo</h5>
          </div>
          <ul class="list">
            <li>O Graduando Avexado é uma plataforma, onde os estudantes de graduação da UFCG podem monitorar suas notas no Controle Acadêmico, especialmente os mais avexados (assim como o redator que vos fala).</li>
            <li>Em momento algum salvamos seus dados de matrícula e senha.</li>
            <li>Seus dados são solicitados apenas para que os dados possam ser extraídos do Controle Acadêmico, nada mais.</li>
            <li>Caso não consiga logar na primeira tentativa, persista (Estamos em implementação rsrs)</li>
            <li>Para que possa ser avisado de alguma alteração mantenha a pagina sua home aberta e aumente o volume do seu computador/celular/tablet de forma que possa ouvir a notificação.</li>
            <li>Assim que estiver pronto clique no botão abaixo para proseguir.</li>
          </ul>
        </div>
        <button class="ui positive button" @click="goToLogin()">Efetuar Login</button>
      </div>
  </div>  
</template>

<script>
import SuiVue from "semantic-ui-vue";
import Vue from "vue";
import Router from "vue-router";
import Service from "../Service";

Vue.use(Router);
Vue.use(SuiVue);

var router = new Router();

export default {
  name: "root",
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
