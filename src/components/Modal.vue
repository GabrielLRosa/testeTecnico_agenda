<template>
	<div class="modal-c" v-show="modal != 'closed'">
		<div class="modal-c__content">
			<section class="content__title">
				<p>{{title}}</p>
			</section>

			<section class="content__content" v-if="modal == 'new' || modal == 'edit'">
				<label for="name">
					Nome
					<input id="name" type="text" v-model="item.name" />
				</label>
				<label for="email">
					E-mail
					<input id="email" type="email" v-model="item.email" />
				</label>
				<label for="telefone">
					Telefone
					<input id="telefone" type="text" v-maska="{mask: ['(##) ####-####', '(##) #####-####'], tokens: '#'}" v-model="item.tel" />
				</label>
			</section>

			<section v-else class="content__msg">
				<p>Deseja realmente excluir o contato?</p>
			</section>

			<section class="content__btns">
				<p v-show="error">Um erro ocorreu. Tente novamente mais Tarde!</p>
				<Button
					:style="{
						backgroundColor: 'transparent',
						border: 'none',
						padding: '0.5rem 0.75rem',
						boxShadow: 'none',
						color: '#fa7268',
					}"
					:callback="closeModal"
				>
					Cancelar
				</Button>

				<Button
					:style="{
						padding: '0.5rem 0.75rem',
						backgroundColor: '#fa7268',
						color: '#fff',
						marginRight: '1rem'
					}"
					:disabled="disabled"
					:callback="handleRegister"
				>
					{{ actionButton }}
				</Button>
			</section>
		</div>
	</div>
</template>

<script>
import { modal, createNewRegister, closeModal, selectedRegister , editRegister, deleteRegister} from "../utils/state.ts";
import Button from "../components/Button.vue";


export default {
	components: {
		Button,
	},
	watch: {
		item: {
			handler() {
				this.disabled = false
			},
			deep: true,
		},
		modal: {
			handler(value) {
				this.error = false
				
				switch (value) {
					case 'edit':
						this.item.name = selectedRegister.value.name
						this.item.email = selectedRegister.value.email
						this.item.tel = selectedRegister.value.tel
						this.title = 'Editar Contato'
						this.action = editRegister
						this.actionButton = 'Salvar'
						break;
					case 'new':
						this.title = 'Criar Novo Contato'
						this.action = createNewRegister
						this.actionButton = 'Salvar'
						break;
					case 'remove':
						this.title = 'Excluir Contato'
						this.action = deleteRegister
						this.actionButton = 'Excluir'
						this.disabled = false
						break;
				}
			}
		}
	},
	methods: {
		handleRegister() {
			const res = this.action(this.item)
			
			if(res) {
				this.item.name = ''
				this.item.email = ''
				this.item.tel = ''

				closeModal()
			}else {
				this.error = true
			}
		}
	},
	data() {
		return {
			modal,
			createNewRegister,
			closeModal,
			selectedRegister,
			disabled: true,
			error: false,
			action: Function,
			title: '',
			item: {
				name: "",
				email: "",
				tel: '',
			},
		};
	},
};
</script>

<style>
.modal-c {
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	left: 0;
	top: 0;

	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.4);
}

.modal-c__content {
	display: flex;
	flex-direction: column;

	width: 27rem;

	background-color: #fff;

	padding: 1rem 0;
	border-radius: 16px;
	box-shadow: 0 16px 10px 0 rgba(0, 0, 0, 0.16);
}

.modal-c__content .content__title {
	position: relative;
	padding-bottom: 1rem;
}

.modal-c__content .content__title::before {
	content: "";
	bottom: 0;
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: #c0c3d2;
}

.modal-c__content .content__title > p{
	padding-left: 1rem;
}


.modal-c__content .content__content {
	position: relative;
	padding: 1rem 0 0;
}

.modal-c__content .content__msg {
	padding: 1rem 1rem 3rem ;
}

.modal-c__content .content__content label {
	display: flex;
	flex-direction: column;

	font-size: 0.8rem;

	padding: 0 1.5rem;

	margin-bottom: 1rem;
}

.modal-c__content .content__content label input {
	margin-top: 5px;

	border-radius: 4px;
	border: solid 1px #c0c3d2;

	height: 2rem;
	padding: 0 0.5rem;
}

.modal-c__content .content__content label:nth-child(3) {
	width: 40%;
}

.modal-c__content .content__btns {
	display: flex;
	justify-content: flex-end;
	padding-top: 1rem;

	position: relative;
}

.modal-c__content .content__btns::after {
	content: "";
	top: 0;
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: #c0c3d2;
}

.modal-c__content .content__btns > p {
	font-size: .8rem;
	color: #e9584d;
}

.modal-c__content .content__btns btn:nth-child(2){
	margin-right: 1rem;
}
</style>