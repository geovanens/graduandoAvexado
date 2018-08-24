<template>
    <div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 900px">
            <table class="ui single line table">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Codigo</th>
                        <th>Periodo</th>
                        <th>Turma</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="" v-for="(item, index) in componentes" :key="index">
                        <td id="disciplina">{{ item.disciplina || '-' }}</td>
                        <td id="codigo">{{ item.codigo || '-' }}</td>
                        <td id="periodo">{{ item.periodo || '-' }}</td>
                        <td id="turma">{{ item.turma || '-' }}</td>
                        <td id="btnNotas">
                            <sui-button primary v-on:click="toggle();notas(item)">Abrir</sui-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <sui-modal v-model="open">
                <sui-modal-header>Notas</sui-modal-header>
                <sui-modal-content>
                    <sui-modal-description>
                        <table class="ui table">
                                <thead>
                                    <tr>
                                        <th class="" v-for="(item, index) in avaliacoes" :key="index">Nota {{item.id}}</th>
                                        <th>Media Parcial</th>
                                        <th>Exame Final</th>
                                        <th>Media Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="" v-for="(item, index) in avaliacoes" :key="index">
                                            {{ item.nota || '-' }}
                                        </td>
                                        <td>{{resultados.parcial || "-"}}</td>
                                        <td>{{resultados.e_final || "-"}}</td>
                                        <td>{{resultados.m_final || "-"}}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </sui-modal-description>
                </sui-modal-content>
			<sui-modal-actions>
        <div class="ui positive icon buttons">
            <button class="ui button">
                Monitorar
            </button>
            <button class="ui button">
                <i class="play icon"></i>
            </button>
            <button class="ui button">
                <i class="stop icon"></i>
            </button>
        </div>
        <div class="ui selection dropdown">
                <input type="hidden" name="gender">
                <i class="dropdown icon"></i>
                <div class="default text">Tempo</div>
                <div class="menu">
                    <div class="item" data-value="0">10s</div>
                    <div class="item" data-value="1">20s</div>
                    <div class="item" data-value="2">30s</div>
                    <div class="item" data-value="3">60s</div>
                    <div class="item" data-value="4">120s</div>
                    <div class="item" data-value="5">300s</div>
                </div>
            </div>
        <sui-button negative @click.native="toggle">
					Fechar
				</sui-button>
        
			</sui-modal-actions>
		</sui-modal>
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
  name: "home",
  data() {
    return {
      componentes: [],
      tempo: null,
      open: false,
      currentInterval: null,
      avaliacoes: [],
      resultados: {},
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
    toggle() {
      this.open = !this.open;
    },
    print() {
      console.log(this.componentes);
    },
    notas(item) {
      this.avaliacoes = [];
      this.resultados = {};
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
              this.avaliacoes.push(e);
            }
          });
          this.resultados.parcial = a[num_notas].media_parcial;
          this.resultados.e_final = a[num_notas + 1].exame_final;
          this.resultados.m_final = a[num_notas + 2].media_final;
          console.log(this.avaliacoes);
          console.log(this.resultados);
        });
    },
    monitorar(item) {
      console.log("Começou Monitorar");
      let intervalo = this.tempo * 1000;
      let notas = this.notas;
      this.currentInterval = setInterval(function() {
        notas(item);
      }, intervalo);
    },
    stop() {
      clearInterval(this.currentInterval);
    }
  }
};
</script>