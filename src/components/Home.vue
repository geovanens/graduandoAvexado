<template>
    <div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 900px">
            <button class="ui negative right floated button" v-on:click="sair()">Sair</button>
            <br><br>
            <table class="ui single line unstackable table">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Codigo</th>
                        <th>Periodo</th>
                        <th>Turma</th>
                        <th>Notas</th>
                        <th>Monitorando</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="" v-for="(item, index) in componentes" :key="index">
                        <td id="disciplina">{{ item.disciplina || '-' }}</td>
                        <td id="codigo">{{ item.codigo || '-' }}</td>
                        <td id="periodo">{{ item.periodo || '-' }}</td>
                        <td id="turma">{{ item.turma || '-' }}</td>
                        <td :id="item.codigo">
                            <sui-button primary v-on:click="toggle();notas(item)">Abrir</sui-button>
                        </td>
                        <td v-if="monitorando[item.codigo]">
                            <i class="green big asterisk loading icon"></i>
                        </td>
                        <td v-else><i class="red big times icon"></i></td>
                    </tr>
                </tbody>
            </table>
            <sui-modal v-model="open">
                <sui-modal-header>Notas</sui-modal-header>
                <sui-modal-content>
                    <sui-modal-description>
                        <table class="ui unstackable tablet">
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
            <button class="ui button" v-on:click="monitorar">
                <i class="play icon"></i>
            </button>
            <button class="ui button" v-on:click="stop">
                <i class="stop icon"></i>
            </button>
        </div>
        <!-- <sui-dropdown
            placeholder="Tempo"
            selection
            :options="opcoesTempo"
            v-model="tempo">
        </sui-dropdown> -->
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
      open: false,
      itemAtual: null,
      monitorando: {},
      avaliacoes: [],
      resultados: {}
    };
  },
  created() {
    let jsessionid = Service.methods.getJsessionId();
    Service.methods.fetchComponentes(jsessionid).then(a => {
      this.componentes = a;
    });
  },
  methods: {
    sair() {
      Service.methods.deleteJsessionId();
      this.$router.push("/");
    },
    toggle() {
      this.open = !this.open;
    },
    notas(item) {
      this.itemAtual = item;
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
        });
    },
    monitorar() {
      this.monitorando[this.itemAtual.codigo] = true;
    },
    stop() {
      this.monitorando[this.itemAtual.codigo] = false;
    }
  }
};
</script>