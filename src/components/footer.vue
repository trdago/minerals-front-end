<template>

  <footer class="mt-2" id="footer">
    <b-container fluid="sm">
        <b-row>
          <b-col sm="2" class="mr-0">
            <h2 class="footer-title ti"> <strong>LIMS</strong> </h2>
            <span v-if="isAuth && user" class="perfil-de-usuario-footer">
              {{ user.perfil.nombre }}
            </span>
          </b-col>
          <b-col class="ml-0">
            <div class="footer_contact">
              <span class="letra-grande">L</span>aboratory <span class="letra-grande">I</span>nformation <span class="letra-grande">M</span>anagement <span class="letra-grande">S</span>ystem
                <p style="font-size: 12px">
                Fono Ayuda: <strong>(56-2) 2747 1265</strong>
                <!-- <br /> -->
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp; 
                <span class="mb-3"> <b-button class="fecha_footer" variant="link" size="sm">2015 06 26</b-button></span>
                </p>
            </div>
          </b-col>
          <b-col>
            <a href="http://www.3aaa.cl" target="_BLANK" data-toggle="tooltip" title="Desarrollado por 3aaa"><img src="../assets/img/logo_footer.png" alt=""></a>

          </b-col>

        </b-row>
    </b-container>
  </footer> 
</template>


<style scoped>

.perfil-de-usuario-footer {
	white-space: nowrap;
	font-size: 9px;
	padding-top: 7px;
	float: left;
	text-transform: uppercase;
	color: #00FF00;
}

.fecha_footer{
  font-size: 8px;
  color: #9d5a47;
  text-decoration: none;

}

.fecha_footer:hover {
    opacity: .6;
    color: #9d5a47;
}


.label a { color: #FFF; }
#push{ height: 111px;}
#footer { height: 73px; } /**/
#footer a:hover {opacity: .6;}
#footer { background: #000 url(../assets/img/footer_line.png) repeat-x center top; padding: 24px 0; color: #9b9b9b }
#footer .footer_contact { padding-bottom: 10px; }
#footer h2 { font-size: 16px; margin-bottom: 10px; line-height: 16px; font-weight:normal;}
#footer #i1 { /*background: #0a0a0a;*/ padding: 5px 0px 0px 0px;}

.footer-title {
	font-family: 'BebasNeueRegular' !important;
	font-size: 52px !important;
	padding-top:15px;
	color: #bbb;
}
</style>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'FooterComponent',

   computed:{
    ...mapState('usuario', ['isAuth', 'user'])
  },
  components: {

  }
}
</script>
