<template>
    <div class="info" v-if="state.isCian">
        <div class="info__header">Расчёт маршрутов на циане</div>
        <div class="info__title">Ваш адрес:</div>
        <div class="info__value" v-if="!state.isEdited">
            {{ state.address }}
        </div>
        <div v-else class="info__inputWrapper">
            <input class="info__input" type="search" v-model="state.address" />
            <button
                class="info__submit button"
                type="button"
                @click="this.handleSubmit"
            >
                Ок
            </button>
        </div>
        <button
            type="button"
            class="info__edit button"
            :class="state.isEdited ? 'info__edit--edited' : ''"
            @click="state.isEdited = !state.isEdited"
        >
            {{ state.isEdited ? "Сбросить" : "Изменить" }}
        </button>
    </div>
    <div class="info" v-else>
        <div class="info__header">
            К сожалению, вы сейчас не на Циане &#128549;
        </div>
        <div></div>
        <a target="_blank" href="https://cian.ru" class="button info__link">
            Перейти
        </a>
    </div>
</template>

<script lang="ts">
import { reactive, onMounted } from "vue";

interface State {
    address: string;
    isEdited: boolean;
    isCian: boolean;
}

export default {
    name: "App",
    components: {},
    setup() {
        const state: State = reactive({
            address: "",
            isEdited: false,
            isCian: false
        });

        const detectIsCian = (): Promise<boolean> => {
            return new Promise<boolean>(resolve =>
                chrome.tabs.query(
                    { active: true, lastFocusedWindow: true },
                    tabs => {
                        return resolve(tabs[0] && !!tabs[0].url);
                    }
                )
            );
        };

        const getAddress = (): Promise<string> => {
            return new Promise<string>(resolve => {
                chrome.storage.sync.get("address", res => {
                    resolve(res?.["address"] ? res["address"] : "");
                });
            });
        };

        const handleSubmit = () => {
            chrome.storage.sync.set({ address: state.address });
            state.isEdited = false;
            return;
        };

        onMounted(() => {
            //get current tab && check storage for address
            (async () => {
                state.isCian = await detectIsCian();
                if (state.isCian) {
                    state.address = await getAddress();
                    if (!state.address) state.isEdited = true;
                }
            })();
        });

        return { state, handleSubmit };
    }
};
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    font-family: Lato, Arial, sans-serif;
}

html {
    width: 300px;
    height: auto;
    padding: 30px 30px 50px;
}

.button {
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
    height: 40px;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 20px;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    cursor: pointer;
    outline: none;
}

.info {
    display: grid;
    grid-template-rows: repeat(4, 2rem);
    grid-row-gap: 2rem;
    width: 100%;
    text-align: center;

    &__header {
        font-size: 1rem;
        font-weight: 700;
        color: rgba(4, 104, 255, 1);;
    }

    &__submit,
    .button {
        width: auto;
        background-color: #0468ff;
        color: #fff;
    }

    &__submit:hover,
    .button:hover {
        background-color: #055de1;
    }

    &__edit.button {
        color: #0468ff;
        background: rgba(4, 104, 255, 0.15);
    }

    &__edit.button:hover {
        color: #0468ff;
        background: rgba(4, 104, 255, 0.1);
    }

    &__edit--edited {
        background-color: #fff;
        color: rgba(4, 104, 255, 1);
    }


    &__edit--edited:hover {
        background: rgba(4, 104, 255, 0.1);
    }

    &__input {
        border: 1px solid rgba(4, 104, 255, .2);
        border-radius: 5px;
        outline: none;
    }

    &__inputWrapper {
        display: inline-grid;
        grid-template-columns: repeat(2, auto);
    }
}
</style>
