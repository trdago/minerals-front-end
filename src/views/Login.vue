<template>
  <div id="main-container">
		<div id="login">
      <b-container>
        <b-row align-h="center">
          <b-col sm="4">
					<div>
						<div class="login">
							<form action="/" id="UserLoginForm" method="post" accept-charset="utf-8"><div style="display:none;"><input type="hidden" name="_method" value="POST"></div>    <br>
                <h2 class="login-title">INICIO DE SESIÓN</h2>
                  <small>

                  <div class="legend">Ingrese los datos de su cuenta para entrar</div>
                  </small>
                  <br>
                  <div style="text-align: center;">

                      <b-input-group  size="sm">
                            <b-input-group-text style="padding-left:30px; padding-right:30px" variant="white" class="ribbon brown" >
                                  <b-icon  icon="person-fill" variant="white"></b-icon>
                            </b-input-group-text> 
                        <b-form-input v-model="form.username" placeholder="Nombre de Usuario"></b-form-input>
                      </b-input-group>
                      <br>
                      <br>
                      <br>
                      <b-input-group  size="sm">

                            <b-input-group-text style="padding-left:30px; padding-right:30px" variant="white" class="ribbon yellow" >
                                  <b-icon  icon="unlock-fill" variant="white"></b-icon>
                            </b-input-group-text> 
                        <b-form-input   v-on:keyup.enter="login(form)" v-model="form.password" type="password" placeholder="Contraseña"></b-form-input>
                      </b-input-group>

                      <br>
                      <br>
                  </div>
          <b-row>
          <b-button @click="login(form)" block size="sm" variant="dark"> 
            INICIAR SESIÓN
          </b-button>

          </b-row>
          <br>
          <br>    
          <b-row>
            <div class="forgot">
                <b-button style="font-size: 13px;" variant="link">¿Olvidaste tu contraseña?</b-button>
            </div>
          </b-row>
          </form>						
          </div>
					</div>
          </b-col>
        </b-row>
      </b-container>
		</div>

	</div>
</template>


<script>

import {mapActions} from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
        form: {
          username: null,
          password: null
        },
    }
  },
  methods:{
    ...mapActions('usuario', ['login'])


  }
}
</script>
<style scoped>

@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300);



.legend {
  font-family: 'Open Sans', sans-serif !important;
}

input {
  font-family: 'Open Sans', sans-serif !important;
}

.login-title {
     font-family: 'Open Sans', sans-serif !important;
}


#login {
    background: url(../assets/img/bkg_login.jpg) center center;
    padding: 160px 0;
    color: #6e6e6e;
    font-size: 11px;
}




#login h2 { font-weight: normal; font-size: 18px; margin: 0; color: #000; line-height: 20px }

#login .legend {
   margin-bottom: 30px;  
   }
#login .forgot button{ display: block; color: #6e6e6e; text-decoration: underline; }

#login .login { 
  background: url(../assets/img/bkg_login_form.png); padding: 30px; 
  }

#login input { font-family: 'Open Sans', sans-serif; }

.ribbon,
.input-append .add-on.ribbon,
.input-prepend .add-on.ribbon { background-color: #FFF; background-repeat: no-repeat; background-position: center center; border: 0px solid #fff; padding: 7px 30px 1px; }

.ribbon.brown { background-image: url(../assets/img/ribbon-brown.png); }
.ribbon.yellow{ background-image: url(../assets/img/ribbon-yellow.png); }


</style>


