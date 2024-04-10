<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';

const modalEl = ref<HTMLDivElement>();
let modal: Modal;

let resolveFunc: () => void;

onMounted(() => {
    if (!modalEl.value) {
        throw new Error('modalEl не найден');
    }

    modal = new Modal(modalEl.value);
});

defineExpose({
    show() {
        return new Promise<void>((res, rej) => {
            modal.show();

            const onExit = () => {
                modalEl.value?.removeEventListener('hidePrevented.bs.modal', hideListener);
            };

            const hideListener = () => {
                onExit();

                rej();
            };

            modalEl.value?.addEventListener('hidePrevented.bs.modal', hideListener);
            resolveFunc = () => {
                onExit();

                modal.hide();

                res();
            };
        });
    },
});

</script>

<template>
    <div class="modal" tabindex="-1" ref="modalEl">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <slot name="title">Подтверждение</slot>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        tabindex="-1"></button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" tabindex="-1">
                        <slot name="closeButton">Нет</slot>
                    </button>

                    <button type="button" class="btn btn-sm btn-primary" @click="resolveFunc">
                        <slot name="confirmButton">Да</slot>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>