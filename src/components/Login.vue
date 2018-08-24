<template>
	<div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<br><br><br><br><br>
			<h2 class="ui grey image header">
				<i class="user plus icon"></i>
				<div class="content">
					Login
				</div>
				<br>
			</h2>
			<form class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Matricula&nbsp;&nbsp;</div>
							<input type="text" placeholder="Digite a sua matricula" v-model="profile.matricula">
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Senha</div>
							<input type="password" placeholder="Digite sua senha" v-model="profile.password">
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
/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
var router = new Router();
export default {
  name: "login-admin",
  data() {
    return {
      profile: {
        matricula: "",
        password: ""
      },
      urlBase: "https://graduando-avexado.herokuapp.com/login",
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    login() {
      let matricula = this.profile.matricula || "-";
      let senha = this.profile.password || "-";
      fetch(this.urlBase + `?matricula=${matricula}&senha=${senha}`)
        .then(d => d.json())
        .then(a => {
          console.log(a);
        });
    }
  }
};
</script>

<style>
</style>