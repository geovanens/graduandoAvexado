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
            <li>Para que possa ser avisado de alguma alteração mantenha a página home aberta e aumente o volume do seu computador/celular/tablet de forma que possa ouvir a notificação.</li>
            <li>Caso encontre algum problema entre em contato comigo pelo meu 
                <a href="mailto:geovane.silva@ccc.ufcg.edu.br"><strong>email</strong></a></li>
            <li>Assim que estiver pronto clique no botão abaixo para proseguir.</li>
            <br>
            <li>Desenvolvido por
                <a href="https://github.com/geovanens" target="_blank"><strong>Geovane Silva</strong></a>
                <i class="github icon"></i>
            </li>
          </ul>
        </div>
        <button class="ui positive button" @click="goToLogin()">Efetuar Login</button>
      </div>
  </div>  
</template>

<script>
import Vue from "vue";
import SuiVue from "semantic-ui-vue";

import router from "../router";

Vue.use(SuiVue);

export default {
  name: "Root",
  data() {
    return {};
  },
  methods: {
    goToLogin() {
      router.push("/login");
    }
  }
};
</script>
