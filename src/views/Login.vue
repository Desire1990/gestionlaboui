<template  >
    <div class="centered" >
        <div class="vertical-center ">
            <div class="inner-block">
                <form class="login">
                    <center>
                        <img src="../assets/img/download.jpeg" alt="" width="80px" height="80px">
                        <h1 style="color:var(--primary); font-size: 36px;">Gestion Laboratoire</h1>
                    </center>

                    <div class="form-group">
                        <label><h3>Username</h3></label>
                        <input type="email" name="email" placeholder="Username" class="form-control form-control-lg" required id="id_mail" v-model='username' autocomplete="on" />
                    </div>

                    <div class="form-group">
                        <label><h3>Password</h3></label>
                        <input type="password" placeholder="password" class="form-control form-control-lg" name="password" required id="id_password" v-model='password' autocomplete="on" />
                    </div>
                    <label for="id_password" v-if='logs.length>0' style="color:red">{{logs}}</label>

                    <button type="submit" class="btn btn-lg btn-block btns" @click.prevent='login'>Sign In</button>

                    <p class="forgot-password text-right mt-2 mb-4">
                        <router-link to="/forgot-password"><strong>Forgot password ?</strong></router-link>
                    </p>

<!--                     <div class="social-icons">
                        <ul>
                            <li><a href="#"><i class='fas fa-google'></i></a></li>
                            <li><a href="#"><i class="fas fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fas fa-twitter"></i></a></li>
                        </ul>
                    </div> -->
                    <center>
                Developped by <b><a href="https://github.com/Desire1990">Desos</a></b>
                    </center>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
export default {
    data() {
        return {
            logs:'',
            username:'',
            password:'',
            url:this.$store.state.url           
        }
    },
    mounted() {
        document.title = 'Sign in | GestionⒸLabo'
    },
    methods:{ 
        login(){
            this.logs = "loging in..."
            axios.post(this.url+"/login/", {
                "username": this.username,
                "password": this.password
            }).then((response) => {
                this.$store.state.user = response.data;
                const toPath = this.$route.query.to || '/'
                this.$router.push(toPath)
                toast({
                    message: 'logged in successfully!',
                    type: 'is-success',
                    dismissible: true,
                    duration: 2000,
                    position: 'center'
                })
                this.$router.push('/')
            }).catch((error) => {
                if (!error.response) {
                    this.logs = JSON.stringify(error.response.data)
                } else {
                    this.logs = "Invalid username or password...";
                }
            });
        }
    }
};
</script>
<style scoped>
.centered{
    display: flex;
    justify-content: center;
    padding-top: 60px;
}
form{
    background-color: white;
    width: 400px;
    padding: 10px 20px;
    border-radius: 0;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .5);
}
.btns{
    display: flex;
    justify-content: center;
    color: white;
    background-color: var(--primary);
}
h2, a{
    color: var(--primary);
}
</style>