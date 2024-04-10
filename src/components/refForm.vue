<script setup lang="ts">
import { Modal } from 'bootstrap';
import { inject, nextTick, onMounted, ref, watch } from 'vue';
import { basicRef, basicRefType } from './refs/refBase';
import { allRefsArray } from './refs';
import { stateType } from '../App.vue';

const state = inject<stateType>('state');

const modalEl = ref<HTMLDivElement>();
let modal: Modal;

onMounted(() => {
    if (!modalEl.value) {
        throw new Error('modalEl не найден');
    }

    modal = new Modal(modalEl.value);
});

export type refData = { refItem: basicRefType, refTypeIndex: number };

defineExpose({
    editRef(data?: refData) {
        if (data) {
            refTypeIndex.value = data.refTypeIndex;
            // обновление данных источника идёт вторым, чтобы изменение индекса и следующие за ним действия в watch не переписали переданные данные
            tempRef.value = data.refItem;
        } else {
            refTypeIndex.value = defautlRefTypeIndex;
        }

        modal.show();
    },
});

const defautlRefTypeIndex = -1;
const refTypeIndex = ref(defautlRefTypeIndex);

let tempRef = ref(basicRef as basicRefType);
let fieldsStore = new Map<string, string | undefined>();

watch(refTypeIndex, (value) => {
    // записать значения для тек источника в карту
    for (let fieldKey in tempRef.value.fields) {
        const fieldValue = tempRef.value.fields[fieldKey].value;

        fieldsStore.set(fieldKey, fieldValue);
    }

    const newRef = (value === -1) ? basicRef : allRefsArray[value];

    // записать значения из карты в объект нового источника
    for (let fieldKey in newRef.fields) {
        const fieldValue = fieldsStore.get(fieldKey);

        newRef.fields[fieldKey].value = fieldValue;
    }

    tempRef.value = newRef;

    nextTick(() => modal.handleUpdate());
});

const emit = defineEmits<{
    apply: [refData: refData],
}>();

function onConfirm() {
    emit('apply', {
        refItem: tempRef.value,
        refTypeIndex: refTypeIndex.value,
    });

    modal.hide();

    refTypeIndex.value = defautlRefTypeIndex;
}

</script>

<template>
    <div class="modal" tabindex="-1" ref="modalEl">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ (state?.formCallReason === 'add') ? 'Добавить' : 'Изменить' }} источник
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        tabindex="-1"></button>
                </div>
                <div class="modal-body">
                    <div class="container">

                        <div class="row">
                            <div class="col">
                                <select class="form-control mb-4" v-model="refTypeIndex" tabindex="1">
                                    <option disabled selected :value="defautlRefTypeIndex">
                                        Выберите тип источника
                                    </option>

                                    <option v-for="(refItem, index) in allRefsArray" :value="index">
                                        {{ refItem.type.join(' / ') }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="row" v-for="(field, fieldKey, fieldIndex) in tempRef.fields" :key="fieldKey">
                            <div class="col">
                                <div class="mb-3">
                                    <label :for="'field' + fieldKey" class="form-label">{{ field.title }}</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control"
                                            :class="{ 'optional-input': !field.required }" :placeholder="field.hint"
                                            :id="'field' + fieldKey" v-model="field.value" :tabindex="fieldIndex + 2">
                                        <a class="btn btn-outline-secondary" :href="field.wiki">?</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row my-1">
                            <div class="col">
                                <p class="ref-text">{{ tempRef.toString() }}</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal"
                        tabindex="-1">Закрыть</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="onConfirm"
                        :tabindex="Object.keys(tempRef.fields).length + 2">{{ (state?.formCallReason === 'add') ?
                        'Добавить в список' : 'Изменить' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.optional-input {
    /* background-color: rgba(217, 255, 0, 0.1); */
    background-color: rgba(0, 100, 0, 0.03);
}
</style>