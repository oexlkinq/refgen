<script setup lang="ts">
import { provide, reactive, ref } from 'vue';

import { basicRefType, makeInstanceOfRef } from './components/refs/refBase';
import RefForm, { refData } from './components/refForm.vue';
import { copyRich } from './utils/clipboard';

import { allRefsArray } from './components/refs';
import { Otbaldy } from './components/refs/otbaldy';
import { Otbaldy2 } from './components/refs/otbaldy2';

import Confirm from './components/confirm.vue';


const state = reactive({
	formCallReason: 'add' as 'add' | 'edit',
	modifyingRefIndex: -1,
});
provide('state', state);
export type stateType = typeof state;

const refs = ref([] as {
	id: number,
	refData: {
		refItem: basicRefType,
		refTypeIndex: number,
	},
	selected: boolean,
}[]);
let lastRefId = -1;


refs.value.push({
	id: ++lastRefId,
	refData: {
		refItem: makeInstanceOfRef(Otbaldy, { title: 'Этот текст-рыба служит заглушкой, на месте которой потом появится итоговый текст источника. Не имеет особого смысла, кроме как потестить, как себя будет вести разметка при большом количестве текста в блоке', author: 'Автор А.А.', url: 'https://ya.ru' }),
		refTypeIndex: allRefsArray.indexOf(Otbaldy),
	},
	selected: false,
});
refs.value.push({
	id: ++lastRefId,
	refData: {
		refItem: makeInstanceOfRef(Otbaldy, { title: 'Источник с необязательной ссылкой', author: 'Автор А.А.' }),
		refTypeIndex: allRefsArray.indexOf(Otbaldy2),
	},
	selected: false,
});
refs.value.push({
	id: ++lastRefId,
	refData: {
		refItem: makeInstanceOfRef(Otbaldy2, { title: 'И этот текст-рыба служит заглушкой, на месте которой потом появится итоговый текст источника. Не имеет особого смысла, кроме как потестить, как себя будет вести разметка при большом количестве текста в блоке', author: 'Автор А.А.' }),
		refTypeIndex: allRefsArray.indexOf(Otbaldy2),
	},
	selected: false,
});
sortRefs();


const modal = ref<InstanceType<typeof RefForm>>();
const confirm = ref<InstanceType<typeof Confirm>>();

function triggerForm(targetIndex?: number) {
	if (targetIndex !== undefined) {
		state.modifyingRefIndex = targetIndex;
		state.formCallReason = 'edit';
		
		modal.value?.editRef(refs.value[targetIndex].refData);
	} else {
		state.formCallReason = 'add';

		modal.value?.editRef();
	}
}

function updateRef(refData: refData) {
	if(state.formCallReason === 'add'){
		refs.value.push({
			id: ++lastRefId,
			refData,
			selected: false,
		});
	}else{
		refs.value[state.modifyingRefIndex].refData = refData;
	}

	sortRefs();
}


async function removeSelected() {
	try{
		await confirm.value?.show();
	}catch(e){
		return;
	}

	refs.value = refs.value.filter(item => !item.selected);
}

function selectAll() {
	refs.value.forEach(item => item.selected = true);
}

function copyAll() {
	const text = refs.value.map(refItem => refItem.refData.refItem.toString()).join('\n');

	copyRich(`<p style="font-family: 'Times New Roman'; font-size: 14px;">${text}</p>`, text);
}

function copy(targetIndex: number) {
	const text = refs.value[targetIndex].refData.refItem.toString();

	copyRich(`<span style="font-family: 'Times New Roman'; font-size: 14px;">${text}</span>`, text);
}


function sortRefs(){
	refs.value.sort((a, b) => a.refData.refItem.toString().localeCompare(b.refData.refItem.toString()));
}

</script>

<template>
	<div class="container my-2">

		<!-- кнопки верхней панельки -->
		<div class="row gx-3 wide-buttons">
			<div class="col-auto">
				<button class="btn btn-primary px-2" @click="triggerForm()">Добавить источник</button>
			</div>
		</div>

		<div class="row gx-3 wide-buttons justify-content-end">
			<div class="col-auto">
				<button class="btn btn-primary px-2" @click="removeSelected">Удалить выделенное</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-primary px-2" @click="selectAll">Выбрать всё</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-primary px-2" @click="copyAll">Копировать всё(?)</button>
			</div>
		</div>


		<!-- список источников -->
		<div class="d-flex flex-column mt-4 p-2 border rounded">
			<div class="container" v-if="refs.length === 0">
				<p class="text-body-secondary">Список источников пуст</p>
			</div>

			<div class="container border rounded py-2 px-3 my-1" v-for="(item, itemIndex) in refs" :key="item.id">
				<div class="row">
					<div class="col">
						<label class="d-flex align-items-center">
							<input type="checkbox" name="selection" :id="'ref' + item.id" v-model="item.selected">
							<span class="ms-3">{{ item.refData.refItem.toString() }}</span>
						</label>
					</div>
				</div>
				<div class="row justify-content-end">
					<div class="col-auto">
						<button class="btn btn-sm btn-secondary" @click="triggerForm(itemIndex)">ред.</button>
					</div>
					<div class="col-auto">
						<button class="btn btn-sm btn-secondary" @click="copy(itemIndex)">[]</button>
					</div>
				</div>
			</div>
		</div>

	</div>

	<RefForm ref="modal" @apply="updateRef" />

	<Confirm ref="confirm">
		<template #body>
			<p>Подтверждение удаления</p>
		</template>
	</Confirm>
</template>

<style scoped>
.wide-buttons .btn {
	width: 100%;
}
</style>
