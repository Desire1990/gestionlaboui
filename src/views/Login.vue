<template  >
    <div class="centered" >
        <div class="vertical-center ">
            <div class="inner-block">
                <form class="login">
                    <center>
                        <img src="https://upload.wikimedia.org/wikipedia/en/e/e0/Emblem_of_the_University_of_Burundi.gif" alt="" width="100px" height="100px">
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
    padding: 60px;
    background: url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYYGBgaHBwYHRocGh4aGhwZGhwcGhoaGhwcIy4lHh4rIRwYJjgmLS8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHxISHzQsJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAIEBhwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEUQAAIABAMEBwQGCAUEAwAAAAECAAMRIQQSMQVBUWEGIjJxgZGxE0KhwVJicrLR8BQVIzOCktLhFlNjosIHQ3Pxs9Pj/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAlEQACAgICAwACAgMAAAAAAAAAAQIREiEDMRNBUSIyYXFCobH/2gAMAwEAAhEDEQA/ADFIUKFHEbjwYRjkdhABNpbKV3Zt5pccgB8oz+N2M6VK9YcrHyifaPSiZIxU2WQropWgIoRVUJAI5k6wR2d0ow0+gLezY7n08G0jpXHGSM1JoyImMDvBHgY2XRra+cBHNxYH5d3Dy4RPj9kpMWooeBF/IiA+F2aUehqCN44bj+eEZSi4stSUtGzhRjekO0ZwmMgZlQUpl6uaqgkkjW5NtOUDMNtmYhs7dxNR4g2ibCrPQnlgkG4YXVlJVlPJhcQSwe25iWmj2i/TUdcfaQWbvWh5Rn9j7VWelRZhqPmOXp5QSEaRk49Eyin2aqRiUdc6MGU7x6HgeUOcxk0qrZkYo3Eb+TA2Yd8WU2zNqysqHqjKQD2r3arXHIecdEeaPsxcH6Lm1tsSpCsXdS4FRLDL7RuQUn4+MZOT07mK9JslCjXGRmBUEkDMSCDYHSnyiOfseY7l3n5ixqwKC4vRRUkCgJAta0U8R0UVnLK2RTSijQUUKb030r4mB8y9MnxyDsz/AKhSVIpJmspNM1Uqe5Qx+NIfN6aDqOvUQlVKOZbU7RaoR86HS5U6C14z8voqFr1yagi5BpUUqKpY8Duhq9EE3u3mP6YnzL6NccifbHSzOoCTJ2c0NHRBLUMBStO3xBpY3rDNp9LsRMXIGWSl87KhzlaZRUV0INedLG17v6oDSVkOwdEYlWZauo0yB6jqct26gAAr/wCF5R1qfFrd1GgfKvo/Ewv0f2/hURZaS1mzEKhBLluHIoFqzTQMrA1Fc16jeY2mEnF0DsjyyfcfLmHflJEYbZeBGHIMohGAK5soY0JrSrV8+UEzj5/+c38qf0QLmiVhI1QhZoybYyd/nP5J/REUnETmAJnvvsKDQkbo0jNS6JlFxNiAI87/AOpW28RJdJctxLRkJOVuu9SQa2qqilBe5blBUtMP/emfzGKuKwgbrOzMeqKsa76fCpimie9HnErbM1chORhLXIgeWhCqfdFq8+I8YWFxJDAoqJl61RpUNa7Zq0NAPLea+gYbDIxABrqaA6UIp8ItjBqPpeZ+UKgxp9mMnY1MVOE2euWyp1AcvAVIBJNACTxAFNadl7Lwr5gGxGcgBC0krLU7wSpY1papsK+Wz/RU4H+ZvxiFJSh3GUWprfUDjCm8VY1HJ0ghsnNhpCYdp0pnXMA1DQJUlBa2YA7z5wHnTcVIdZ/6RLxJAZWliYJYodCq1C5rD3a695uCWo0UeQiQRj5/4NPCgBtrbeJxSBMiSlBzVzEmugFgSbE7h8jU2Ji5+GUiXJAY0HtGCOy0zUaWGbqGjGxqLk0uQdXWFWI8r+D8a+mWx+Px85Qjma4rUjOiKR9H9nlJ01+FY0exdovh5as0pJszQKkoSnRTSoeZUhtKCi1NqkRI+7vjsHlY1xoLYnbkpkqZBdyBVWSgrrQuRuIF6d0ZDH4TP1kkLLepLAM0xHzMpuXUZbVtlMGaws0J8zHggRiMGS7uklRuRXmO65erX2ishtYnKtLtrYQDn9HpufMWUBmFQu4swFq6Cp8Bu3RsS0V57ad4PxES+VhgmXMHhVlIEQWA8zxjNdMNoZSqDdc/aOnkPvRb2j0jWVMyUBVe2d/PL3etRaAO3MO7zGbixpzvRfgFgb0UlQuj8zOJqnQZDTn1xX0i+rS8ODOfW4Rd54nurv5RPs/Z6SEK1BmMAzccoNB3Cp9Yze1sI7PUksdBbyAEUvxexd/0E+j+03nYvM51RwBuAqpoB4Rr4zfRjYTS29q/aykBdwBG/iY0hiJ37CLT6FDIfDIgo5ChEwoQEkKFChgKFChQAZ/bHRmXOdnurtqwOtABcG2gEZTEdEZ0tgVKuoP2W8jY+cH8Z0vaTiJsp5YZEIoQaNTKpPI6wQwPSvCzqDPkY7nFPjpHXFKjHdmPw2KnyGorOh4HQ+BsY0mztpvNpnRQR74t5rB2ZhEmLUZWU7xQiKUvBiWSo03d0ZyTS/guLTZPNEqY7JmQuKBkNK6Aix1sRAXaPRoXZKqeGo/tAjpXsae2Ieai5lJBGU0YURRpbeu6OYDpDiZQCuS9hVXBzeeoi3jirErvRZ2XLmSplQLg3HH+2og7tXpIJbZESrAAsW0FQGAAGtiN4irhdrS5zA5GR9NKqfEfMRZ2lsdJtW0JC3HJQL+AEZ4u6RTetjtl9JFmMEcBSdCDbuNdIMF+t4R5/idkPKYbxWx/tGpwGKcyyWHWVd+hoCRf4REk+ilXYbV4cGjH4TpYXdFCAZmVe39IgV7POHy+lDkgZFFSB2iflD8cicka6sKsZKd0kdWYZU6pZfe90kceUPxW3ZyFqKmUMUrQ1rqLZq6b9IfjYskahT6x2Mo23poNAUuqN2T7yK536VYw6ZticAvWAqteyNczLv7hD8TFkjU1hRlZm1Z2VTn1zV6q7jbdzhp2lOyVzntEaLpQHh3w/CwzRrDFWTigqgZWPa0HM/8ArwMDdhYp3Zw7lqBaVpapPCCeAnAS1qwretTfUxrwxxbsibyQ8400NEbu0JuBbzrHHxLEEezJGh1vryvp8YkbFoPfXziom0dMzION6010v9n4x02jGmTSuoxCyzQlRm5GhJ00FT5X3Q44iZQ0l3ra+vHhy74qHa6ClZkvUVudKXpzrX4R1Nsyh2pqcqV1vXd3QaQbZaadM3INaag240qK/CGyWOdiwobWHw+FIhO3ZFK5xw1H54RHhMakyYxQ1oor+fAxjyu4svj/AGLpnKPeXzEcOJQe+v8AMIxmITrvb333fXMdxK9YW9yXu/00jFcK+mrmzYNjZY1dB/EO7jDf1hKp+8Th2l184yc1CUS25hpwdj84QU+zNjZxu4qfwh+JBmahtpStzoaXNGFhUCvmQPGENpyj743nwAJPwBjJLiMmbMuYMpXtZaUpMB0O9BbnEuCQlxY6MPNGHzg8URZs0v64k/T+DfhEb7akgkZzUW7LajwjNSZLlhRTah8NfkYfisDNZ3Coa5idQOqWahud9DC8UR5MOztuylNCW0B7J0YAj4EQpe0EdC61yg0uKaUPzjKbYlNLZA4pVEGo1VFU6c4KdH3rhz9t/RT84icElaKUnasC4vDPOmEAXckCvxPdqY0u1scJBLZcz3yinVB0zN3cIGbU2oJJYIKzCKZqWQceZPygviJHtEXeWCnxYA1+MJKkvo27ewL0axDzJ81nJYlKk886UHLU25Ro0RErNmEKq6E8eQ3mnqY5KSTIBkoRnK5yBrQFalju1Foze2pTu3WYlR2RoB4Q28XbElaCmG6RNOxUtEBWXVxTe3Ucgt5C3rGnEefbAlFcTJP1z8VYfOPQozlLLbKSp0KGGHwwxAzkKFChgSQhChVgA7HI7HIAPMekElWxOJIrUEk6UNFXThATAy6uo7/QxpNppXE4o8n+ApArYkqs9BzP3Wjqv8TOK2XMOXRqozKeKkj0jS7Lxs9/3jBgN5HW8xT4xVOF6xgnhpdBHMpvo0pE2I6S4ZJryZhKMpAzEVU1UNqK01Goiy2GkYhaqUcciGp+EeedMpdMTMPFvREEMw0p1CMpIOUEEEg6cRHS5JRVmajbNzL2YspjQWOnzEZ3bOHxMvFPNl5wjZLqeEtV6y77jgYv7KxeIagd8yj6QqfBtYt4jpNJSc0iYjArl6wAZTVFfTUa89IiNNuglaSsFYfpE7dSagfdVeq3iNPSNBIYFDQEVU2Oum+K+XDzjmlujHW3a8jeLRXqtS1j6QpXasaqmYTZcukyT9uX99YfKrnUc/QxNs7EPnliwq6aKo94aUEPwGKOdc7nLU13bjTQE603RqQi8mFR5zqWa82aDpoC5qLcQIs7awqI2YEmrEsKitRcAcyMw/ihk+aFdh7Q9pxYtZutY04GK2Kc+0dSznrMQKsRrYgV3d0CQWE8Ts8ZlKdaq6E0qERApBpwpEM9R1AUIOQ9Wpr23p8/OOYbFqhVHDWBuAxFDdBSlbLSL6ujOpC5hlJAKneaXU8Mp8+cUhND8Ns5XZFay5XaozU1SxJpSxMTCTh69iZkGb3WqzdQAga0pm1pFJ5IQqMpNc9su7qnQjnEGLVSELJTrHQAHTUVIG6KRDsO4JEDnIjJ1b1pe9t5+tzgN0gwaBh7NUoUOalO1U1rzix0bbrstKALXdvYcD3QB6QzAzEBSMucVNL9c3FDp30ib/JlLpHcbhCHeirStdVGt+MMxUqjDsDqJ76C+Ra6tEeO7Z7lPmimKe01OdaV7Ev7iiLukKi7iLBOsnY/zEHvuPpX0H5EPdKolGT3/fU7xvBgNjDQSv8Axnf/AK8/nF7DmsmX9qYPuQrHRbdAJYq6Drt73FV4DlBnokBmmUZWshtW1C3EDjARB+z/AI/VP7QZ6K9t/sr6/wB4mf6sF2jrY1EmP1lak1yVIfTODSyEaqR4nWGTmDsGL5QVU2VzuGgKi3jFHFufbTRRf3j613mvCL4ljKhLAHILUOoJGtRa0OL0KXbIndQqAuRQvUhW4rXcL3jkt1KsEZz10PZv2HrvHA+AiLE2Cdk0Z9QTXsNu3XhYN+rMNVHWQ2FtHsBXnB7FaK+PlkUJzXzC4AvkJ3E7iIuYHEqHXtXYDsJv6v0za/COzJQdaEghVUra/WQDjeygecRYKXR1q3vpupWrDiYdA6LMhSWoCwJAsBlFBv7Ri5P2jkZ2CaAi54O19L3OkQyiVqQ5AyVJopsGIpcc4p4lC011qaHMd2ge3rEMqNFXbMxZpR2DXWwBG4kHUcbxe2HT2TBQQM7akE1KpwA5QN2ktEl5WqKMOVnbT87oIbBNJb/bP3VjOf6s0XaLM7ZyzGBemUCrHSw5w7auLdEBkZaFRlbgpUUKju384Fbb9o9g3UscotXv4wSw6fsZYP8Alyx5IojPJJa7LrewN0eRv0glqksj1JuSaZrnwg7iZdYr4CRSaDyf7jQQmLEN2NA7AyaTZZ+uvrSNdGckpR0+2v3hGjiV0HsUMaO1jjQwOQoUKACSFChQAIwoUcMMAXicIjlsyKa1BtqDurA6XsOUjh0UqVrvJFwRoe+NEZQMRvheca4SrRnkgMZfWMWEWJnwbA1tDVWMXGS7Rakn0YrpnL/bk01Y/dQfKCOEw1Zcr7C/dEWNqYiaJzgiqF6DMnVyhFNjS4rW8XcgyoQABlFhoLDTlGnI/wAQihYWXQRk9rSs2PmD7PwkrG0lrAKfgK45nDIRaq164/ZKunkfGFB0mEltA7CbOqRWNXhxRacqfCKeHlUi/LStuNvOFF2xvoyGzQc8uqntpu+sIfgMNmdVNQCTe/A03HfSNN+iqCO8esOfBIK9URq+QzxB+I2e6TCVBJZ3cGmmZXI7rkDyjgdzMowFAWIJtrSt9DesG3wKVPVXfujv6GmuUeUGYYgfFyQ0xWStb5jQ5aBbENoTuidZjI6kkG3EUpna2tjTL5QQODTXKN24bgBHUwqUHVHlzMHl30GBVbGBmD9WgzgVI4JSt994G4osyajtbipoKGD6YdeA1PosSypC1Nhu+cNcmhOCAvRlGWY9foClx9LlAvaeHd3egr13pcaFjTfaNoqAG3D8IjeUKm28+sS+R9jUF0Y+fs92YEAUypvH0FB+MdxGz3JFAOwg36habo14li3cPQR32Yg8zDBGEx2x5j+zoBZCD2v82Y3o0T4fZLiWinLUO59/QiXwU8DG09mLd3zMdCep/wCMC5XYYoyS7NcIRaudTo/0XB1UQT6P4Vkdid6038Rxg0U9R6NHUWle75iHLkbVAoK7MttLZLvNdlpQuxuONOXIxYXAnIgIaoWhIAoes3MRo8scyX/PEwLkaE4qzK4zZrFUADWZz2V3iXzP0YWE2a6o4OY5iu5dwf6w4xppy3Hj/wAY5l9R84PJKx4IzsvZrrXU9Ui6qNa/WPpD8NgHVlOX3lbd7rAwecWMdRYPJIMIgFZLEAZTTKVpmAqCQ3A8IU2W5diFFCCpFeJzV0gqi2EMIue+E5yGooDTcEWVFK9kE9r6TtxUxZwGEyKRxautd1OA4CL7DrD7I9Wjri3jEuTehpA+fLqIsonUQfVA8hSGutolTsrbd8zGZRHhk64/i+6RFhxEmGwmjk86eG+H4eXmbkL+O6LXG9JkuS7IsPgmJBNFAIPOxrBUxVxO0ZUvtuAeA6zeQvFsw5wjFaFFtvYoawh0KM0WRwokhQgHQjDYUUIcYa0djjQAAJu3grspU9VmWobgSNKcoll7flnXOveAfQmKmJ2MGdmqbsx8yTFV9hncx8o3TmkR+IeTbEk++o76r6iE85GNUdGrwYH0jNPsR/pV8IIbLwgTdfSFKUqqSHFRvTNGFiN5KnUDyjIbQwswTpjKDQsTUGm4RCcTiV0Z/Mt61islW0Kv5NTMlZTbQ6RSOyFE5pwY1YXUgU7Krbf7vxins3FT37b1A3FVB86VhuO266THTKtFIAsa3UG5rxJiE45MbUqCHsCsSy2AP9jAZOkmZqGWT3NX1EFkmgjMerapru74mSSf4lK62SPTdXyMSTACDQ/A/hFJNpySQBNQkkAAMDUmwjv62kf5qfzCE036AJs4PHyP4R1HFBr5GBrbWkgkGYoIJBHAixETfrBB7x/lY69wgp/A0W1YU3+UdSlN/lFI7RQb242Rzr3LHTtOWKXe/wDpv3X6ttIMZfAtfS6hArY/Dlzh6OAa0b4fjA/9ayvpeYI0puI5w07ZkgVzjzHpWCpfAtBRn4A/D8Y7mHA/D8YFytsyW99V+0yjfTjCO3JIJGdLb86UPd1oWMn6C0FQRwO7hwhAjgfOA7dIZA98fzJ/VHB0jkaBwSdwKn5/msGMvgWg1Xl8f7Rwt9X/AHd3LlA19rgKGEuYynQqFOm/tfmkV22+KV9hP1pTKtdK1pn03RWEvgrQaL/VH839ucMZjwA8T+EBxt8EE+wnClLEICa1uBn3Uv3iH4TbKu2Uo6ChOZ8gW1LWY3v8IHGXwLiFhNI90eZ/COe1P0R5mAuK22EcqJbOB7ystDYG1/DwiN9vEBT7FjUE0zrUUYih8ge4iBRl8C4ht3JOg+MNZzwX4/jAQ7ebLm9ia1plzrWlK17t0cG3XIY+xIIAIHtF61WAoLcCT4Q8ZBkg27kj3fI/jC9q3BfjAGXtx2NDJoKE1MxdwJA03kAeMVl6TEsVMqhrSmet/BYMJCyiaDMRoBDb30vy/vAWdt5gzL7MWZh2qaGn0YbiNtuoBEsEEKa56XZA9NOfwh4SDKIZata13U0iNph0PygFP2+6or+zFCzL2tMoUjdvzHyifY21WnlwVC5QpsSa5ifwiXGXseSCqLXXTU/3h0/FIqhicy/V61aE1FuYpAvauFzjfXSlbeUWMBhSklUbdm+LMfnAnroGtnU6TB5iIiEBmCksb3NLAfjEO1UcizsF3qDQfDWLGD2ModXI6wYN3EGoi5+j5yBu1PdFNSbViTSujIS8DNNcqnvNvWPRxFVMKBui0IU4YoIybZ2OEx2OGMyzlYUchQUA6sdBhlYQMOibJKw1oVY40DGAJvSrDKzoxYFGZW6hpVSVOnMGOp0pwraP5q34QGxXRcO7tnbru7brZmJtbnEKdEQpqHbyEdSejHXs0i7fwx/7g8m/CHJjJTt1HDV1Ar+EZ4dGqe8fKCmzMLkFN+hjObdU0XFR9BGbj8OGKtNlqwNCC6gg8CCYqY3aMpFLLlcCnYmIT4DNWM9tfoy8yc7h6ZnJplrrzzRB/h9pa5i1aAjs01GXjzi09InQaTbAJquHm+Q+RhmIxmYknDTb8jw5KY5srZQltcCo0NIG7X2G8zEPMDAAkGlDuUDWvKIi05PRT6LDYoA1/RpgPc39EO/xBmqFlC1VbNNCEHQijKDFHD7GdSMzEjxEG9k0WWRuDTfITHglV9AuuzLYWbLVkIQkgqRWYNQRStEEPEyWWNJZJJNsxN71iPAYcK8v9ohoyaZ73GlVhz0zsUmgGrkUVwRWv1ecaEoszMRmc1w9GYsbrMoSak0oeZiLEzGzGspAKD3Zwp1RuLgV8POLuLf9q5Mw9t8oIfqk5ha1LfKK2PdS5zTTolsjW6iAnTfc+MCEyquCaooBloL661Fx3qdIe+EmUAoincBet99flFlpi1UZr5bDKeLGtRxEOR6+9bUA0rurQa6b/CMuSTi9AVRKaWt2Vqsan2aGgoumYV1MNn4mlBlWgFSSiasLWVRYD86RLiwuQAsRQ2ouutj1rUoIqvlyNQktnUDq06lHrvO/J3eMCbkrZMrCOypXtXEsOEyqTmCI5NOJZa7xFTGLORnUTAQrFa+zQVp/DBjYWGWU2cvdk7OW9GKkNUE8KfDdA/HOjO5zgVdjQg19IuKa0yktAGY7Vuxqb7t94fLPUYm9115lh8o5jQquBU9ldBy747Lceze5tk3fWbnzjRAQ1GuVb8uFIcHtWg14RHnGlTvOndz5RIgGU67jp/eAB6TDQm1qbuJpBXYmE9s4QtlsToTp/EOMUsLKUhqkgUW9PrW9IObCREcFWZjRhTLThXXhUQn0wXYN2vhfZTnRWqVy3oRXMobex4xBOzBJbV7Yc7/dcrx4AQX6ShBMDlHYzFBNHVaZRlApkbhXWKU6ZLMqWSj2zgD2i1pmqST7O+vKCPRMrsq1b2eep7arv0Ks3Gnu8PGI0JKTGJ7CBhrvmS048GOtfmL2HmIZbhZUw9dLe0BN1mcJeluG8eKCoFmVkzFHsxWrjT2ss75QvVQa3sD3gvYlJ2Vdlyw7gNcEkcPcci/eFjmypgrUm9PDzi3sd0zrlRh1lFC4NyGFahBahNqeMVklKq2kzLf6n/5xaG+thjaF3cfXcf7jEu0Eqko2qAoP8ht8IpTMVmxDoEJYO/vihuxJpkNrG0WMcTRKyieqNGO4Mb0W9hEvehrTK+JQewUVHbc/7Uiz0U7c37KerfjFQsolXlFRnaxY71TraaWp4Rd6PzFzuFTL1LmpJsy8e+IktMpegrjdoLLoWR217IGvOpESSdp55YmImhIysaaHiAY5iZGcU5mJMNhQiZAN5PnSMVdFurBo6TzfaImRFDOinUmjMAaXG4mLu0p85bo5XiAF9SKxbkbNUEEgVBBrTfWsPeRnOXn8IqWVoSa2Y3E43EvUe0mN3FvlHpGDPUT7C/dEUVwI4QRligA4AQciaWwi7Y+GmHQ0xiaHKwoRjkAGMO2sSAKhB3BqeHWhfrnEHgO4GvxJizjwspAWGalBYDXxjmzFVxmCZQe69yK25gx03LHKv9GKpvEJ7CxLsHLkk5rVpYUBAsAN8GSbQOwkrLXma/AD5RdrGEpW7NEqQMfbmGUkNNQFSQRXQg0IPjEX+I8LumKTyDH0EYHHS6vOP1338XaINmyczgd/p+fjHRlSszUbZ6GekmG+n/sf+mHSNpSpjdQk8aqwHxEZKVg7xoNmyQtPCMZcuSo1UEtk2L6TYaW7I5fMpINEJuNbxVxXSGRMQqoepoRVQBQEMd/AGMr0gl/t3PF3+9F2RhaIh4oPiKfONXLFIhRUjSydspNaiI45kKBTwJMUsf0lRJrS/ZszKaE1FD1QfnEmAk5RGex8rNjX5t/wERGVtsclVILJ0iLmiySa/W/tBHZyOJfWUqSzmhB953bUgcYzU45CqqSpY3IsQNLHz8okmz1yAZVzVu1BUitbnWNIxzVsmUsdCwWyJwdCUXqspPWU6EE6GJZmx5yEvkoLkEhst660ERTURXUEBhYkUAifHyTJUOhyHMB1CV3E7u6Lcf5M4zv0VMZjS7sweXQM7LQ0ahzZc1TStxFXaTlmY2oVShGhORA1+RqPCBol9em4tSveaRK0rIWy6qaU4igND8YSVFP4FDkOWoqwRTU6AEmmmuh1h7pbUUFgSTqK2r+fwvYTZaTE9oGYVWmWmoAqtRXXrRWaRQ5ClwaXFwCSSCeBvccY5+Ssgpop4k9UaChr3VrYn86xURSa66b+Nfwgv+g5w4Vc1FB6pr9IUqdLinnwijiZHs3KXNwDUjUAMdO8RUWiZJ9hXZ7lHUkVHs7brFzX/dm+ECMcTnfjU+ggzh2VwjLqECmgPGt7ePjA7FEVeoBJbnwHAxpF2ymtAbaXaQ8ZaHzENk/u5v8AB96JdpDrSzSn7JbcO1aGSF6kzuT74jRCKyC/gfSLSCx/O+IEF4sS9D+d8DAuYNCysqgljkAA1Jz6D4xpNlbAxKlXMpwBntkatDlA936tfGMmh50oKixub09YlWbxvDxTQXRrtp4IswD5QyilGIBvxBFREGM6LYllQIjALmqCjXzZeC/V+MAMqkC4HlHHdVoKV7rQKNaE2nsKJst8OGWYpUs6EVBHZV66ivvDdxjmNH7OZx9n6MK7uUCsIRnF7Z1Gnuk8dBpGok4aU+ZQ4YUIYCxppY/+4mTUexY27RlNnz8nWbRXQ21oGP8AeCaGqE1p4DmOEX12bKSYirpXMQSNVKld3Hzi0uzlApX4CJXJFDwZncfhWzzHDZazBSlaipIrUaC5gohYqi0qaGpJP0nXXKa6QQk4aU5ZgS17jN1a0vaHHBqtCDQKKVNDarEkk95gXJGzRxtaM9tlWRADa+leQ5D80iToy/Xc/UP3krHcfPRphVusgoSRTUCgpS0LDYmTKVnoQxBFK1JFQagbrrfuMTKSbdEIKbQmOBVHKkcKGvmDHdnYqa0piznOHIDUXQKh0pTeYWcOtRcG48okwS0Q/aP3VjDJ9G1LspNtnEqwBdSKitUGleUFsfj5stiZeTUghlJ3ngRAvEyr1gpjlqW7z6wSm+xqKsHHpViBqks/wt/VGu2ZiDMky3IALorEDQFlBIFd0Yifh42mxRTDyxwRR5CE5uWmDik9F2OGHwxoQHIUKFAMze3ZDOlFFTUHwEN6Pg5KFStLX33LV5dr4RbwdcihtaDnbdU8aUrFtFA0jZ8klHD1ZmoJScidBEm6I1MOJtGJZ5zOlGs+3vNu16x0hbEwzCYCVIFDcg00P58TGsaQtTbeeJ3wjLUaAeUaueqolR2UElXi/IGkQUuYsS9RHOjRgTamyc7sxcKMz62rVidaxLisPlRFU6BVr5AHzij0hLmdShK6pQWr7357opSM9CCpva9wWoddOe7efHb8pUY5JWqCHR/FMcwdswFAKcSSPkPPnFzGSEExnp1q1r4UgPhcM+ZQARpegoBat+Ov5MX9pYg5mVVLHSu42F4EqY420UcVLmM6N7NmQfQpXwrz5RWEubvkzPBHp50jU4PFAIihVBAuSK11qdRvi0ztYoiMD9VjS5FCQw3Cum+N1PGJMo5MyCiZmp7OYSv0UZqbxcAxLi5M+YAMk00v1kZfvARp0dwamRLUgEA5W01N81hUDzi4u1JYW6pWl+FaXgXLl1/wXjx2YDGYVlfrjKeHzsTSKxJDZjfvjRdLMYjzaqFApTqm2td3jGbZq3rUQ7H2GNlEGYgLstEVkAIAzU0NePyixjsUGCqihSb2pfNShqBe5aAeIehS1eovwBi6MG5vQ0J4A20Ouh/vGXJG3Ym3VInkYl1qMxJalWBJ+luHMnvMN2jNRi1Gduz1mUDRgbClac4ZicK6IrkXYkBRbRS3oIu4aQ7hSFYrQAlxWo137jX0jOmtit9MWDndRRWwoqinr+fwiniEZmagJvuHKCLynQlyhUajlQ9Uad/dFZNoBQaqxvXfwA+UXxt22ylbVAfasuhlimktR5M0Q4cdSZ9lfg6xex81ZrBjUUFNOZPziORKXK9zdf8AksbqSCmD0F47Lex7h6iLPsFFxWJFwg53tp4wZIMWG+j3R39ITMZqSw1hVSx4k2YbhBkf9PV1/Tkp/wCE/wD2QzYMhlkh7ZQ+TUVJo27uEGwgmLkNaGleydCDozAHSNLpaISAr9BEDBf01KnT9jb/AOWJJX/TwMATjUBoCV9kWoTuqJl++kF22HLNa+18PZj/AJGHSsKkotkDdbXNkFKEkdlri5jNSk3tUv7KcVWmBMR0HEtTlxSOaV/dkXBr9M8fhFAYVElO0pKOVKkhiSSDQ0JJIuNI0qo7sVFK0J3CwpzPGM51+sBQUYi4PHkYXNtWOCAcv2ilyah6AinJgLHjQQZxkx2w4BWrEdYDda9OJhkyWwAFs1TehpXXSOMszilt94xfSKUasp7PmtLaiqamgpTtAVNOVMxOg3xoMR1kK1pUEV4VgROlPmzJQcjfXWlKb/WOl5lKFluPom1f4oloajQAZGVyqsGNQvHQ217h3Q+VKd3UMCy1ydUbqnT4mOthSlSSAbWvXW+g3Rb2arTc9OoVy7u/z0Bi91oycWEcPMyIENWpVQaagCxPw84uYCfmDDgR3XAO+9Yopso6ltb29IdhXKKwI96i8TrrXw84jF9suORY2m4SWz0JIA32Obw3W84JYntN3n1jPY3HLMYilEygUaleqAAAN91JhuI2u433rwsa3G/heo4wpJPSGp09hZ0jT7J/dJ3RkcDjRNWtKEWI/DlGt2Uf2S+PqYyS2aNppNF2ONHKxwmNRChQ2FEjA8jsjuHoItruhQopiRKsP3GFCiRgtoa2kKFDYIq74nl6iOwozRRQ2n20+03ygfje2nefQRyFHRD0Yvsurr4xyFChP9i49ES6/wAK+rx1tYUKO30YeyFoq7Q7I74UKFEGUdt9owNk9mFCiZCgWMRqn2BG6wvYXvb1MKFGci0UukGkr7b/AHDBnYv7lPsiOwon2JlbpN+5Ph6iMg0KFAyo9ELQ6Vo32fmsKFDGyJ+yfGLo1Xv+RhQoA9hTZGn8Z9Hg3KhQo1ILQhhhQoAKeI1Xx+UUcJo32oUKM+T9S4DZ3aTw+60StqPH1EKFGL6RoRjUfxfehp7Y/P0oUKADh08/nDE7L+H3RChRUCGWx2F7z84pp7/53LChRUxoFzNX71+68Nx37s/b/phQox9mL7JNgdp+4epjfbI/dL4/eMKFE/5GsP1LsNMKFFFDRChQokZ//9k=');
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