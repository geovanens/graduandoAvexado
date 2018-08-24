<script>
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
var router = new Router();

export default {
  data() {
    return {};
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
      let urlBaseSuporte = "https://suporte-graduandoavexado.herokuapp.com/";
      let url = urlBaseSuporte + `login?matricula=${matricula}&senha=${senha}`;
      return fetch(url).then(res => res.json());
    },
    fetchComponentes(jsessionid) {
      let urlBaseSuporte = "https://suporte-graduandoavexado.herokuapp.com/";
      let url = urlBaseSuporte + `componentes/${jsessionid}`;
      console.log(url);
      return fetch(url).then(res => res.json());
    },
    fetchComponente(codigoComponente, turma, periodo, jsessionid) {
      let urlBaseSuporte = "https://suporte-graduandoavexado.herokuapp.com/";
      let url =
        urlBaseSuporte +
        `componente/${codigoComponente}/${turma}/${periodo}/${jsessionid}`;
      return fetch(url).then(res => res.json());
    }
  }
};
</script>