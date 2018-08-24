<template>
    <div>
        <table class="ui single line table">
            <thead>
                <tr>
                    <th>Disciplina</th>
                    <th>Codigo</th>
                    <th>Periodo</th>
                    <th>Turma</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="(item, index) in componentes" :key="index">
                    <td id="disciplina">{{ item.disciplina || '-' }}</td>
                    <td id="codigo">{{ item.codigo || '-' }}</td>
                    <td id="periodo">{{ item.periodo || '-' }}</td>
                    <td id="turma">{{ item.turma || '-' }}</td>
                    <td id="btnNotas"><button v-on:click="notas(item)">Notas</button></td>
                    <td id="btnMonitorar"><button v-on:click="monitorar(item)">Monitorar</button></td>
                    <td id="pararMonitorar"><button v-on:click="stop()">Parar</button></td>
                    <td id="dropTempo">
                        <sui-dropdown :id="item.codigo" fluid placeholder="Intervalo Monitorar" selection :options="opcoesTempo" v-model="tempo" />
                    </td>
                    
                </tr>
            </tbody>
        </table>
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
  name: "home",
  data() {
    return {
      componentes: [],
      tempo: null,
      currentInterval: null,
      opcoesTempo: [
        {
          text: "2",
          value: "2"
        },
        {
          text: "45s",
          value: "45"
        },
        {
          text: "1m",
          value: "60"
        },
        {
          text: "2m",
          value: "120"
        },
        {
          text: "5m",
          value: "300"
        }
      ]
    };
  },
  created() {
    let jsessionid = Service.methods.getJsessionId();
    console.log(jsessionid);
    Service.methods.fetchComponentes(jsessionid).then(a => {
      console.log(a);
      this.componentes = a;
    });
  },
  methods: {
    print() {
      console.log(this.componentes);
    },
    notas(item) {
      console.log("oi");
      let codigo = item.codigo;
      let turma = item.turma;
      let periodo = item.periodo;
      let jsessionid = Service.methods.getJsessionId();
      Service.methods
        .fetchComponente(codigo, turma, periodo, jsessionid)
        .then(a => {
          let num_notas = a.length - 3;
          let result = "";
          a.map(e => {
            if (e.id) {
              result += "Nota " + e.id + ": " + (e.nota || "-") + "\n";
            }
          });
          result +=
            "Media Parcial: " + (a[num_notas].media_parcial || "-") + "\n";
          result +=
            "Exame Final: " + (a[num_notas + 1].exame_final || "-") + "\n";
          result +=
            "Media Final: " + (a[num_notas + 2].media_final || "-") + "\n";
          alert(result);
        });
    },
    monitorar(item) {
      console.log("Começou Monitorar");
      let intervalo = this.tempo * 1000;
      let notas = this.notas;
      this.currentInterval = setInterval(function() {notas(item)}, intervalo);
    },
    stop() {
        clearInterval(this.currentInterval);
    }
  }
};
</script>