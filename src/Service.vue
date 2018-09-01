<script>
import Vue from "vue";
import router from "./router";

export default {
  name: "Service",
  data() {
    return {};
  },
  methods: {
    logado() {
        let url = this.urlBase() + "/validaID";
        let jsessionid = this.getJsessionId();
        return fetch(url, {
            headers: {
                jsessionid: jsessionid
            }
        }).then(res => res.json());
    },
    urlBase(url) {
      //return "https://suporte-graduandoavexado.herokuapp.com";
      return "http://127.0.0.1:5000";
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
      let url = this.urlBase() + "/login";
      return fetch(url, {
        headers: {
          matricula: matricula,
          senha: senha
        }
      }).then(res => res.json());
    },
    fetchComponentes(jsessionid) {
      let url = this.urlBase() + "/componentes";
      return fetch(url, {
        headers: {
          jsessionid: jsessionid
        }
      }).then(res => res.json());
    },
    fetchComponente(codigoComponente, turma, periodo, jsessionid) {
      let url =
        this.urlBase() + `/notas/${codigoComponente}/${turma}/${periodo}`;
      return fetch(url, {
        headers: {
          jsessionid: jsessionid
        }
      }).then(res => res.json());
    }
  }
};
</script>