<template>
	<div class="list-c" v-show="showList">
		<ul>
			<li>
				<h5>Contatos</h5>
				<h5>E-mail</h5>
				<h5>Telefone</h5>
			</li>
			<li
				v-for="(register, index) in registersFiltred"
				:key="index"
				:style="register.lastCreated && getContrast(index)"
			>
				<span
					:style="{ backgroundColor: register.color }"
					class="register__icon"
					>{{ register.name.slice(0, 1).toUpperCase() }}</span
				>
				<h5>{{ register.name }}</h5>
				<h5>{{ register.email }}</h5>
				<h5>{{ register.tel }}</h5>
				<span class="register__options">
					<img
						@:click="setSelectedRegister(index)"
						src="@/assets/ic-edit.svg"
						alt="Ícone editar"
					/>
					<img
						@:click="openModalRemove(index)"
						src="@/assets/ic-delete.svg"
						alt="Ícone deletar"
					/>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import {
	registers,
	populateList,
	setSelectedRegister,
	openModalRemove,
	showList,
	filterParam,
} from "../utils/state.ts";

export default {
	data() {
		return {
			registers,
			openModalRemove,
			setSelectedRegister,
			showList,
			searchParam: "",
		};
	},
	computed: {
		registersFiltred() {
			if (filterParam.value) {
				return this.registers.filter((item) => {
					return (
						item.name.match(filterParam.value) ||
						item.email.match(filterParam.value) ||
						item.tel.match(filterParam.value)
					);
				});
			}else {
				return this.registers
			}
		},
	},
	methods: {
		getColor() {
			return {
				"background-color": `#${Math.floor(Math.random() * 16777215).toString(
					16
				)}`,
			};
		},
		getContrast(index) {
			setTimeout(() => {
				registers.value[index].lastCreated = false;
			}, 10000);

			return { "background-color": "#fff3f2" };
		},
	},
	mounted() {
		populateList();
	},
};
</script>

<style>
.list-c {
	padding: 1rem;
}

.list-c > ul {
	width: 100%;
	max-height: 30rem;
	border-radius: 4px;

	background-color: #fff;
	padding-bottom: 1rem;
	border: 1px solid var(--gray);

	overflow: auto;
}

.list-c > ul li {
	display: flex;
	align-items: center;
	position: relative;

	padding: 1rem 1rem 0.75rem 3rem;
}

.list-c > ul li:hover {
	background-color: #fff3f2;
}

.list-c > ul li > * {
	width: 25%;
}

.list-c > ul li .register__icon {
	position: absolute;
	left: 0.5rem;
	width: 1.8rem;
	padding: 0.2rem 0.5rem;
	border-radius: 50%;

	display: flex;
	justify-content: center;
	align-items: center;

	color: #fff;
}

.list-c > ul li .register__options {
	display: flex;
	justify-content: flex-end;
}

.list-c > ul li .register__options img {
	cursor: pointer;
}

.list-c > ul li .register__options img:nth-child(1) {
	margin-right: 1.5rem;
}
</style>