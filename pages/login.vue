<template>
  <div class="wrapper" :class="{ 'form-success': loading }">
    <div class="box">
      <h1>Welcome</h1>

      <div class="form" v-show="!loading">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <button @click="submit">Login</button>
      </div>
    </div>

    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	fetch ({ store, redirect }) {
    if (store.state.authUser) {
      redirect('/admin')
    }
  },
	head () {
    return {
      title: 'Skr - Login'
    }
  },
  layout: 'empty',
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
		...mapActions(['login']),
    submit () {
			const { username, password } = this

			if (!username) {
				this.$message.warning('请输入用户名！')

				return
			}

			if (!password) {
				this.$message.warning('请输入密码！')

				return
			}

			this.loading = true

			this.login({ username, password }).then(res => {
				this.$router.push('/admin')
			}).catch(err => {
				this.loading = false
				this.$message.error('登录失败，请检查用户名密码！')
			})
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);

$prim: #53e3a6;

.wrapper {
  width: 100%;
  height: 100vh;

	background: #50a3a2;
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  overflow: hidden;

  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
	color: #fff;

	::-webkit-input-placeholder { /* WebKit browsers */
		font-family: 'Source Sans Pro', sans-serif;
    color: #fff;
		font-weight: 300;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
		font-family: 'Source Sans Pro', sans-serif;
    color: #fff;
    opacity:  1;
		font-weight: 300;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
		font-family: 'Source Sans Pro', sans-serif;
    color: #fff;
    opacity:  1;
		font-weight: 300;
	}
	:-ms-input-placeholder { /* Internet Explorer 10+ */
		font-family: 'Source Sans Pro', sans-serif;
    color: #fff;
		font-weight: 300;
	}

	&.form-success {
		.box {
			h1 {
				transform: translateY(85px);
			}
		}
	}
}

.box {
  position: fixed;
  top: 50%;
  left: 50%;
	max-width: 600px;
	padding: 80px 0;
	height: 400px;
  text-align: center;
  z-index: 10;

  transform: translate(-50%, -50%);

  h1 {
		font-size: 40px;
		transition-duration: 1s;
		transition-timing-function: ease-in-put;
		font-weight: 200;
	}
}

.form {
	padding: 20px 0;
  z-index: 2;

	input {
		display: block;
		outline: 0;
		border: 1px solid rgba(255, 255, 255, 0.4);
		background-color: rgba(255, 255, 255, 0.2);
		width: 250px;

		border-radius: 3px;
		padding: 10px 15px;
		margin: 0 auto 10px auto;
		display: block;
		text-align: center;
		font-size: 18px;

		color: #fff;

		transition-duration: 0.25s;
		font-weight: 300;

		&:hover {
			background-color: rgba(255, 255, 255, 0.4);
		}

		&:focus {
			background-color: #fff;
			width: 300px;

			color: $prim;
		}
	}

	button {
		outline: 0;
		background-color: #fff;
		border: 0;
		padding: 10px 15px;
		color: $prim;
		border-radius: 3px;
		width: 250px;
		cursor: pointer;
		font-size: 18px;
		transition-duration: 0.25s;

		&:hover {
			background-color: rgb(245, 247, 249);
		}
	}
}

.bg-bubbles {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
  height: 100%;
  overflow: hidden;

	z-index: 1;

	li {
		position: absolute;
		list-style: none;
		display: block;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.15);
		bottom: -160px;

		animation: square 25s infinite;
		transition-timing-function: linear;

		&:nth-child(1) {
			left: 10%;
		}

		&:nth-child(2) {
			left: 20%;

			width: 80px;
			height: 80px;

			animation-delay: 2s;
			animation-duration: 17s;
		}

		&:nth-child(3) {
			left: 25%;
			animation-delay: 4s;
		}

		&:nth-child(4) {
			left: 40%;
			width: 60px;
			height: 60px;

			animation-duration: 22s;

			background-color: rgba(255, 255, 255, 0.25);
		}

		&:nth-child(5) {
			left: 70%;
		}

		&:nth-child(6) {
			left: 80%;
			width: 120px;
			height: 120px;

			animation-delay: 3s;
			background-color: rgba(255, 255, 255, 0.2);
		}

		&:nth-child(7) {
			left: 32%;
			width: 160px;
			height: 160px;

			animation-delay: 7s;
		}

		&:nth-child(8) {
			left: 55%;
			width: 20px;
			height: 20px;

			animation-delay: 15s;
			animation-duration: 40s;
		}

		&:nth-child(9) {
			left: 25%;
			width: 10px;
			height: 10px;

			animation-delay: 2s;
			animation-duration: 40s;
			background-color: rgba(255, 255, 255, 0.3);
		}

		&:nth-child(10) {
			left: 90%;
			width: 160px;
			height: 160px;

			animation-delay: 11s;
		}
	}
}

@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
