<template>
	<div id="register" class="ui middle aligned center aligned grid">
		<div class="column" style="max-width: 450px">
			<h2 class="ui grey image header">
				<div class="content">
					Login
				</div>
				<br>
			</h2>
			<form v-on:submit.prevent="onSubmit" class="ui larg form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Matricula</div>
							<input value="116211149" type="text" placeholder="Digite a sua matricula" v-model="matricula">
						</div>
					</div>
					<div class="field">
						<div class="ui labeled icon input">
							<div class="ui label">Senha&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
							<input value="geovane404" type="password" placeholder="Digite sua senha" v-model="password">
						</div>
					</div>
					<div :hidden="!this.error" class="ui mini red message"> {{errorMsg}} </div>
					<br>
					<button class="ui fluid button" v-on:click.stop.prevent="login()">
						Entrar
					</button>
          <!-- <button class="ui fluid button" v-on:click.stop.prevent="verificar()">
						verificar
					</button> -->
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import Vue from "vue";

import Service from "../Service";
import router from "../router";

export default {
  name: "login",
  data() {
    return {
      matricula: "",
      password: "",
      error: false,
      errorMsg: ""
    };
  },
  created() {
    Service.methods.logado().then(dados => {
      if (dados[0] === true) {
        router.push("/home")
      }
    })
  },
  methods: {
    login() {
      let matricula = this.matricula || "-";
      let senha = this.password || "-";
      Service.methods.fetchLogin(matricula, senha).then(a => {
        if (a.erro) {
          this.errorMsg = a.erro;
          this.error = true;
        } else {
          let jsessionid = a.id;
          Service.methods.saveJsessionId(jsessionid);
          router.push('/home');
        }
      });
    },
    verificar() {
      Service.methods.logado().then(dados => console.log(dados));
    }
  }
};
</script>

<style>
</style>