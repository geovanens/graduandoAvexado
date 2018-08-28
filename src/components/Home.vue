<template>
    <div id="register" class="ui middle aligned center aligned grid">
        
		<div class="column" style="max-width: 900px">
            <div v-if="monitorando" class="ui tiny label">
                <i class="time icon"></i>{{tempo}} segundos para proxima atualização 
            </div>
            <button class="ui negative right floated button" v-on:click="sair()">Sair</button>
            <div class="ui positive right floated icon buttons">
                <button class="ui button">
                    Monitorar
                </button>
                <button title="Iniciar Monitoramento" class="ui button" v-on:click="monitorar">
                    <i v-if="!monitorando" class="play icon"></i>
                    <i v-else class="asterisk loading icon"></i>
                </button>
                <button title="Encerar Monitoramento" class="ui button" v-on:click="stop">
                    <i class="stop icon"></i>
                </button>
            </div>
            <br><br><br>
            <table class="ui single line unstackable table">
                <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Codigo</th>
                        <th>Periodo</th>
                        <th>Turma</th>
                        <th>Notas</th>
                        <th v-if="monitorando">Alterações</th>
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
                        <td v-if="monitorando"><i :class="icone[item.codigo]"></i></td>
                    </tr>
                </tbody>
            </table>
            <sui-modal v-model="open">
                <sui-modal-header>
                    Notas
                </sui-modal-header>
                <sui-modal-content>
                    <sui-modal-description>
                        <table class="ui single line unstackable table">
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
import Service from "../Service";


Vue.use(SuiVue);
import router from "../router";

export default {
  name: "home",
  data() {
    return {
      componentes: [],
      open: false,
      itemAtual: null,
      monitorando: false,
      avaliacoes: [],
      resultados: {},
      intervalo: 5,
      tempo: 5,
      set_interval: null,
      icone: {}
    };
  },
  created() {
    console.log("home");
    let jsessionid = Service.methods.getJsessionId();
    if (!jsessionid) {
      router.push("/");
    }
    else {
      Service.methods.fetchComponentes(jsessionid).then(a => {
        this.componentes = a;
        this.resetIcones();
      });
    }
    
  },
  methods: {
    sair() {
      localStorage.clear();
      router.push("/");
    },
    resetIcones() {
      let aux = {};
      this.componentes.map(elem => (aux[elem.codigo] = "minus icon"));
      this.icone = aux;
    },
    toggle() {
      this.open = !this.open;
      this.itemAtual = null;
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
          localStorage.setItem(codigo, JSON.stringify(a));
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
      if (!this.monitorando) {
        this.resetIcones();
        this.componentes.map(comp => {
          let codigo = comp.codigo;
          let turma = comp.turma;
          let periodo = comp.periodo;
          let jsessionid = Service.methods.getJsessionId();

          Service.methods
            .fetchComponente(codigo, turma, periodo, jsessionid)
            .then(result => {
              localStorage.setItem(codigo, JSON.stringify(result));
            });
        });
        this.monitorando = true;
        let that = this;
        this.set_interval = setInterval(function() {
          let notificou = false;
          that.tempo -= 1;
          if (that.tempo == 0) {
            console.log("zerou");
            that.componentes.map(comp => {
              let codigo = comp.codigo;
              let turma = comp.turma;
              let periodo = comp.periodo;
              let jsessionid = Service.methods.getJsessionId();

              Service.methods
                .fetchComponente(codigo, turma, periodo, jsessionid)
                .then(result => {
                  let recuperado = {};
                  recuperado[codigo] = JSON.parse(localStorage.getItem(codigo));
                  let compare = {};
                  compare[codigo] = result;
                  if (JSON.stringify(compare) != JSON.stringify(recuperado)) {
                    that.icone[codigo] = "green check icon";
                    if (!notificou) {
                      let changes = new Audio("../../static/have_changes.ogg");
                      changes.play();
                      notificou = true;
                    }
                    //alert("Sem alterações em " + comp.disciplina);
                  }
                });
            });
            that.tempo = that.intervalo;
          }
        }, 1000);
      }
    },
    stop() {
      if (this.monitorando) {
        this.monitorando = false;
        clearInterval(this.set_interval);
        this.tempo = this.intervalo;
      }
    }
  }
};
</script>
