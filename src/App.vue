<template>
  <div id="app">
      <img src="../static/student.png" style="height:200px">
      <br><br>
    <router-view/>
  </div>
</template>

<script>
import Login from "./components/Login";
import Home from "./components/Home";
import Root from "./components/Root";

export default {
  name: 'app',
  components: {
      Root,
      Login,
      Home
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
