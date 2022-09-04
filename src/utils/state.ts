import { ref } from "vue";

interface IRegister {
  name: string;
  email: string;
  tel: string;
	lastCreated: boolean;
	color: string;
}

export const modal = ref("closed");
export const filterParam = ref("");
export const registers = ref<IRegister[]>([]);
export const selectedIndex = ref<null | number>(null);
export const showList = ref(false);
export const selectedRegister = ref<IRegister>({
  name: "",
  email: "",
  tel: "",
	lastCreated: false,
	color: ""
});

export function createNewRegister(item: IRegister) {

	item.lastCreated = true;
	item.color = `#${Math.floor(Math.random() * 16777215).toString(
		16 
	)}`;

	const newRegister = Object.assign({}, item);
	registers.value.push(newRegister);  
	return _updateDatabase() 

}

export function editRegister(item: IRegister) {
	
		if (selectedIndex.value !== null) {

			const newRegister = Object.assign({}, item);
			registers.value[selectedIndex.value].name = newRegister.name;
			registers.value[selectedIndex.value].email = newRegister.email;
			registers.value[selectedIndex.value].tel = newRegister.tel;

			return _updateDatabase()

		} else {

			throw new Error('Não foi possível atualizar o contato. Tente novamente mais tarde!')

		}
}

export function deleteRegister() {
	if (selectedIndex.value !== null) {

		registers.value.splice(selectedIndex.value, 1);
		return _updateDatabase()
	
	} else {
		throw new Error('Não foi possível excluir o contato. Tente novamente mais tarde!')
	}

	
}

export function setSelectedRegister(index: number) {
  selectedRegister.value.name = registers.value[index].name;
  selectedRegister.value.email = registers.value[index].email;
  selectedRegister.value.tel = registers.value[index].tel;

  selectedIndex.value = index;

  openModalEdit();
}

async function _updateDatabase() {
	try {

		await sortList();

		if (window.localStorage.getItem("agenda_register")) window.localStorage.removeItem("agenda_register");
      
		window.localStorage.setItem(
			"agenda_register",
			JSON.stringify(registers.value)
		);
    
		return true;

	} catch (error) {
		console.error(error)
		return false;
	}
}

export function populateList() {
  const list = window.localStorage.getItem("agenda_register");
  if (list) {
    registers.value = JSON.parse(list);
		showList.value = true
  }else {
		registers.value = []
	}
}

export async function sortList() {
	registers.value.sort((a, b) => {
		
		const x = a.name.toUpperCase(),
				y = b.name.toUpperCase();

		return x == y ? 0 : x > y ? 1 : -1
	})
}

export function setSearchParam(param: string) {
	filterParam.value = param
}

export function openModalCreate() {
  modal.value = "new";
}

export function openModalEdit() {
  modal.value = "edit";
}

export function openModalRemove(index: number) {
  selectedIndex.value = index;
  modal.value = "remove";
}

export function closeModal() {
  modal.value = "closed";
}
