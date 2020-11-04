<template>
    <div class="info">
        <div class="info__header">Расчёт маршрутов на циане</div>
        <div class="info__title">Ваш адрес:</div>
        <div class="info__value" v-if="!state.isEdited">
            {{ state.address }}
        </div>
        <div v-else class="info__inputWrapper">
            <input class="info__input" type="search"/>
            <button class="info__submit" type="button" @click="this.handleSubmit">Ок</button>
        </div>
        <button
            type="button"
            class="info__edit"
            :class="state.isEdited ? 'info__edit--edited' : ''"
            @click="state.isEdited = !state.isEdited"
        >
            {{ state.isEdited ? "Сбросить" : "Изменить" }}
        </button>
    </div>
</template>

<script lang="ts">
import {reactive} from "vue";

export default {
    name: "App",
    components: {},
    setup() {
        const state = reactive({
            address: "Москва итд",
            isEdited: false
        });

        const handleSubmit = () => (state.isEdited = false);
        return { state, handleSubmit };
    }
};
</script>

<style>
* {
    box-sizing: border-box;
    font-family: Lato, Arial, sans-serif;
}

html {
    width: 300px;
    height: auto;
    padding: 30px 30px 50px;
}

.info {
    display: grid;
    grid-template-rows: repeat(4, 2rem);
    grid-row-gap: 0.5rem;
    width: 100%;
    text-align: center;
}

.info__header {
    font-size: 1rem;
    font-weight: 700;
    color: rgba(4, 104, 255, 1);;
}

.info__edit, .info__submit {
    padding: 0 8px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-self: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 20px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    color: #0468ff;
    background: rgba(4, 104, 255, 0.1);
    cursor: pointer;
    outline: none;
}

.info__edit:hover {
    background: rgba(4, 104, 255, 0.15);
}

.info__edit.info__edit--edited {
    background-color: #fff;
    color: rgba(4, 104, 255, 1);
}

.info__edit.info__edit--edited:hover {
    background: rgba(4, 104, 255, 0.1);
}

.info__inputWrapper {
    display: inline-grid;
    grid-template-columns: repeat(2, auto);
}

.info__input {
    border: 1px solid rgba(4, 104, 255, .2);
    border-radius: 5px;
    outline: none;
}

.info__submit {
    width: auto;
    background-color: #0468ff;
    color: #fff;
}

.info__submit:hover {
    background-color: #055de1;
}
</style>
