<script>
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
var router = new Router();

export default {
  data() {
    return {
      urlBaseSuporte: ""
    };
  },
  methods: {
    getUrlBaseSuporte() {
      return this.urlBaseSuporte;
    },
    saveJsessionId(jsessionid) {
      localStorage.setItem("jsessionid", jsessionid);
    },
    getJsessionId() {
      let jsessionid = localStorage.getItem("jsessionid");
      return jsessionid;
    },
    deleteJsessionId() {
      localStorage.removeItem("jsessionid");
    },
    fetchLogin(matricula, senha) {
      this.urlBaseSuporte = "https://suporte-graduandoavexado.herokuapp.com/";
      let url =
        this.urlBaseSuporte + `login?matricula=${matricula}&senha=${senha}`;
      return fetch(url).then(res => res.json());
    },
    fetchComponentes(jsessionid) {
      let url = this.urlBaseSuporte + `componentes/${jsessionid}`;
      return fetch(url).then(res => res.json());
    },
    fetchComponente(codigoComponente, turma, periodo, jsessionid) {
      let url =
        this.urlBaseSuporte +
        `componente/${codigoComponente}/${turma}/${periodo}/${jsessionid}`;
      return fetch(url).then(res => res.json());
    }
  }
};
</script>