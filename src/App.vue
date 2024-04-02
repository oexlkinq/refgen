<script setup lang="ts">
import { ref } from 'vue';
import { baseRefInstanceType } from './components/refs/refBase';
import { Otbaldy } from './components/refs/otbaldy';


const refs = ref([] as {
	id: number,
	ref: baseRefInstanceType,
	selected: boolean,
}[]);

refs.value.push({
	id: 1,
	ref: new Otbaldy('Этот текст-рыба служит заглушкой, на месте которой потом появится итоговый текст источника. Не имеет особого смысла, кроме как потестить, как себя будет вести разметка при большом количестве текста в блоке', 'Автор А.А.', 'https://ya.ru'),
	selected: false,
});
refs.value.push({
	id: 2,
	ref: new Otbaldy('И этот текст-рыба служит заглушкой, на месте которой потом появится итоговый текст источника. Не имеет особого смысла, кроме как потестить, как себя будет вести разметка при большом количестве текста в блоке', 'Автор А.А.', 'https://ya.ru'),
	selected: false,
});

function triggerForm(targetId?: number) {

}

function removeSelected() {
	refs.value = refs.value.filter(item => !item.selected);
}

function selectAll() {
	refs.value.forEach(item => item.selected = true);
}

function copyAll() {

}

function copy(targetId?: number) {

}
</script>

<template>
	<div class="container my-2">

		<!-- кнопки верхней панельки -->
		<div class="row gx-3 wide-buttons">
			<div class="col-auto">
				<button class="btn btn-primary px-2" @click="triggerForm">Добавить источник</button>
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
		<div class="d-flex flex-column mt-4">
			<div class="container border rounded py-2 px-3 my-1" v-for="item of refs" :key="item.id">
				<div class="row">
					<div class="col">
						<label class="d-flex align-items-center">
							<input type="checkbox" name="selection" :id="'ref' + item.id" v-model="item.selected">
							<span class="ms-3">{{ item.ref.toString() }}</span>
						</label>
					</div>
				</div>
				<div class="row justify-content-end">
					<div class="col-auto">
						<button class="btn btn-sm btn-secondary" @click="triggerForm(item.id)">ред.</button>
					</div>
					<div class="col-auto">
						<button class="btn btn-sm btn-secondary" @click="copy(item.id)">[]</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<style scoped>
.wide-buttons .btn {
	width: 100%;
}
</style>
