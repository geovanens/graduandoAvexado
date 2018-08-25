<template>
	<div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<h2 class="ui grey image header">
				<div class="content">
					Login
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Matricula</div>
							<input value="116211149" type="text" placeholder="Digite a sua matricula" v-model="profile.matricula">
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Senha&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							<input value="geovane404" type="password" placeholder="Digite sua senha" v-model="profile.password">
						</div>
					</div>
					<div :hidden="!this.error" class="ui mini red message"> {{errorMsg}} </div>
					<br>
					<button class="ui fluid button" @click="login()">
						Entrar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import Router from "vue-router";
import Service from "../Service";
Vue.use(Router);
var router = new Router();
export default {
  name: "login",
  data() {
    return {
      profile: {
        matricula: "",
        password: ""
      },
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    login() {
      let matricula = this.profile.matricula || "-";
      let senha = this.profile.password || "-";
      Service.methods.fetchLogin(matricula, senha).then(a => {
        if (a.erro) {
          this.errorMsg = a.erro;
          this.error = true;
        } else {
          let jsessionid = a.id;
          Service.methods.saveJsessionId(jsessionid);
					this.$router.push("/home");
					console.log("logou");
        }
      });
    }
  }
};
</script>

<style>
</style>