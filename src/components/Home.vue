<template>
    <div>
        <table class="ui table">
            <thead>
                <tr>
                    <th></th>
                    <th>Disciplina</th>
                    <th>Codigo</th>
                    <th>Periodo</th>
                    <th>Turma</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="(item, index) in componentes" :key="index">
                    <td class="center aligned">item</td>
                </tr>
            </tbody>
        </table>
        <button @click="print()">Mostar</button>
    </div>
</template>

<script>
import Vue from "vue";
import Router from "vue-router";
import Service from "../Service";
Vue.use(Router);
var router = new Router();
export default {
  name: "home",
  data() {
    return {
      componentes: []
    };
  },
  created() {
    let jsessionid = Service.methods.getJsessionId();
    console.log(jsessionid);
    Service.methods
      .fetchComponentes(jsessionid)
      .then(a => (this.componentes = a));
  },
  methods: {
      print() {
          console.log(this.componentes)
      }
  }
};
</script>