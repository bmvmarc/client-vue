<template>

    <div>

        <div class="switch-mode" v-show="!$store.state.isAuth">
            <my-button 
                    :class="{ 'active' : authChoise=='login'}" 
                    @click="authChoise='login'; isRegError = false">
                        Log in</my-button>

            <my-button 
                    :class="{ 'active' : authChoise=='registration'}" 
                    @click="authChoise='registration'; isLoginError = false">
                        Register</my-button>
        </div>

        <div class="wrapper">
            <form 
                class="field" 
                v-if="authChoise == 'login' && !$store.state.isAuth"
                @submit.prevent
                @submit="tryToLogIn()">
                
                <h3>EMAIL ADDRESS</h3>
                <my-input 
                    v-focus
                    v-model="email"
                    autocomplete="on"></my-input>
                 

                <h3>PASSWORD</h3>

                <div class="password-container">
                    <my-input 
                        v-model="password"
                         autocomplete="on"
                        :type="showPassword ? 'text': 'password'">
                    </my-input>
                    <my-button 
                        type="button"
                        @click="showPassword = !showPassword">
                        {{ showPassword ? 'HIDE': 'SHOW' }}
                    </my-button>
                    
                </div>

                <div v-show="wrongData">
                    <h3 class="warning center"> Please fill in all fields </h3>
                </div>

                <my-button
                    type="submit"
                    v-show="!isLoading">
                        SIGN IN</my-button>

                <div v-show="isLoginError" class='error-text'>
                    <h3>Sorry, we have been unable to sign you in.</h3>
                    <h4>Please check your sign in details are correct and try again.</h4>
                </div>

            </form>

            <form 
                class="field" 
                v-if="authChoise == 'registration' && !$store.state.isAuth"
                @submit.prevent
                @submit="reg">
                
                <h3>EMAIL ADDRESS</h3>
                <my-input 
                    v-focus
                    v-model="emailReg"
                    autocomplete="on"></my-input>

                <h3>YOUR NAME</h3>
                <my-input 
                    v-model="userNameReg"></my-input>                      

                <h3>PASSWORD</h3>
               
                <div class="password-container">
                    <my-input 
                        v-model="passwordReg"
                        autocomplete="on"
                        :type="showPasswordReg ? 'text': 'password'">
                    </my-input>
                    <my-button
                        type="button" 
                        @click="showPasswordReg = !showPasswordReg">
                        {{ showPasswordReg ? 'HIDE': 'SHOW' }}
                    </my-button>
                    
                </div>

                <div v-show="wrongDataReg">
                    <h3 class="warning center"> Please fill in all fields </h3>
                </div>

                <my-button
                    type="submit"
                    v-show="!isLoading">
                        REGISTER</my-button>

                <div v-show="isRegError" class='error-text'>
                    <h3>Sorry, we have been unable to register you.</h3>
                    <h4>Please check your details are correct and try again.</h4>
                </div>

            </form>            

            <div class="field" v-if="$store.state.isAuth">
                
                <h3 class="center"> You logged in as {{$store.state.userName.toUpperCase()}} </h3>
                 <my-button
                    v-focus
                    @click="$store.dispatch('logOut')">
                        Log out</my-button>
            </div>

        </div>     

    </div>

</template>

<script>
import store from '../store';
import useTryToLogin from '../hooks/auth/useTryToLogin.js';
import useTryToRegister from '../hooks/auth/useTryToRegister.js';

export default {

    data() {
        return {
            authChoise: 'login',
            showPassword: false,
            showPasswordReg: false         
        }
    },

    methods: {
        async reg() {

            const email = this.emailReg,
                  password = this.passwordReg;

            await this.tryToRegister();
            if (!this.isRegError) {
                this.authChoise = 'login';
                this.email = email;
                this.password = password;
            }
        }
    },

    setup(props) {
        const { email, password, wrongData, tryToLogIn, isLoading, isLoginError} = useTryToLogin();
    
        const { emailReg, passwordReg, userNameReg, wrongDataReg, 
                tryToRegister, isRegError} = useTryToRegister(isLoading);

        return {email, password, wrongData, tryToLogIn, isLoading, isLoginError,
                emailReg, passwordReg, userNameReg,  wrongDataReg, tryToRegister, 
                isRegError}  
    }
      
}    

</script>

<style scoped>
    .wrapper {
       display: flex;
       justify-content: space-around;
       margin: 50px 0;
    }

    .field {
        width: 40%;
        min-width: 255px;
    }

    h3 {
        margin-top: 20px;
    }
    
    button {
        margin: 31px auto;
        display: block;
        width: 100px;
    }

    .error-text {
        border: 2px solid red;
        border-radius: 5px;
    }
    .error-text h3, h4 {
        margin: 15px;
    }
    .warning {
        color: red;

    }
    .center {
        text-align: center;        
    }

    .active {
        background-color: lightblue;
    }

    .password-container{
        display: flex;
        margin-top: 15px;
    }

    .password-container .btn{
        margin: 0;
        border-radius: 0 5px 5px 0;
        padding: 0;
    }

    .password-container input{
        margin-top: 0;
        border-radius: 5px 0 0 5px;
    }
    .password-container input:focus{
        outline: none;
        border-radius: 5px 0 0 5px;
        border: solid 2px black;
        margin: -1px;
    }

    .switch-mode {
        display: flex;
        width: 200px;
        margin: auto;
    }


</style>