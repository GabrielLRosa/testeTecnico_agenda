<template>
	<div class="empty-c" v-show="!showList">
		<img src="@/assets/ic-book.svg" alt="Imagem Lista de Contatos Vazia" />
		<p>Nenhum contato foi criado ainda.</p>
		<Button :callback="openModalCreate">
			<img src="@/assets/ic-plus.svg" alt="Ícone adicionar novo contato" />
			Criar contato
		</Button>
	</div>
</template>

<script>
import Button from "./Button.vue";
import { openModalCreate, registers, showList } from "../utils/state.ts";

export default {
	data() {
		return {
			openModalCreate,
			registers,
			showList
		}
	},
	components: {
		Button,
	},
};
</script>

<style>
.empty-c {
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	margin-top: 6rem;
}

.empty-c > p {
	margin: 1.5rem 0;
	color: var(--dark);
}
</style>