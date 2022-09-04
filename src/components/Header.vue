<template>
	<nav class="header-c">
		<img src="@/assets/ic-logo.svg" alt="logo" />

		<Button :style="{ padding: '0.5rem 0.75rem' }" :callback="openModalCreate">
			<img src="@/assets/ic-plus.svg" alt="Ícone adicionar novo contato " />
			Criar contato
		</Button>

		<span class="header-c__search">
			<input type="text" v-model="searchParam" placeholder="Buscar..." />
			<img src="@/assets/ic-search.svg" alt="logo" />
		</span>
	</nav>
</template>

<script>
import Button from "./Button.vue";
import { openModalCreate, setSearchParam } from "../utils/state.ts";

export default {
	components: {
		Button,
	},
	watch: {
		searchParam: {
			handler(val) {
				setSearchParam(val)
			}
		},
	},
	data() {
		return {
			searchParam: '',
			openModalCreate,
		};
	},
};
</script>
 
<style>
.header-c {
	height: 4rem;
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 1rem;
}

.header-c__search {
	display: flex;
	align-items: center;

	position: relative;

	width: 60%;

	padding: 0.438rem 0.5rem 0.375rem;
	border-radius: 4px;

	background-color: var(--pale-grey);
}

.header-c__search > input {
	width: 100%;
	border: none;
	background-color: transparent;
}

.header-c__search > img {
	position: absolute;
	right: 0.5rem;
}
</style>