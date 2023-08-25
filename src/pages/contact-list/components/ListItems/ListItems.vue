<template>
    <div class="list-items">
        
        <figure>
            <img :src="image" alt="" />
        </figure>
        <div>
            <Paragraphe type="bold"> {{ name }} </Paragraphe>
            <div class="list-items__about">
                <Paragraphe font-size="12px">
                    Nombre de personnel: <strong>{{ member }}</strong>
                </Paragraphe>
                <Paragraphe font-size="12px">
                    Nombre d'annonce: <strong>{{ numberProduct }}</strong>
                </Paragraphe>
            </div>
            <Paragraphe class="list-items__adress">
                <MarkerIcon />
                {{ address }}
            </Paragraphe>
        </div>
        <Button class="list-items__btn">Contacter</Button>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import MarkerIcon from '@/components/Icon/MarkerIcon.vue';

    defineProps({
        image: {
            type: String,
            default: null,
        },
        name : {         
            type: String,
            default: null,  
        },
        member : {
            type: [String, Number],
            default: null, 
        },
        numberProduct : {
            type: [String, Number],
            default: null, 
        },
        address : {
            type: String,
            default: null,
        },

    });
</script>

<style lang="scss" scoped>
    .list-items {
        position: relative;
        background-color: #fff;
        padding: 10px 15px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
        margin-bottom: 24px;
        border-radius: 8px;
        @apply flex gap-[15px];
        figure {
            width: 75px;
            height: auto;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &__adress {
            @apply flex items-center gap-[10px];
            color: var(--color-gray-icon);
        }
        &__btn {
            position: absolute;
            top: 10px;
            right: 15px;
            &:deep() {
                button {
                    font-size: 12px;
                    line-height: 12px;
                    @apply py-[5px];
                }
            }
        }
        &__about {
            @apply py-[5px];
        }
    }
</style>
