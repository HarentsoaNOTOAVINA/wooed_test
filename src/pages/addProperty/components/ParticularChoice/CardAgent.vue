<template>
    <div class="card-agent__wrap">
        <figure class="card-agent__image">
            <img
                :src="dataItem.image"
                alt=""
            />
        </figure>
        <div>
            <Title type="h4" weight="500" class="card-agent__title">
                {{dataItem.name}}
            </Title>
            <Paragraphe class="card-agent__details">
                <span>Telephone : </span>
                <span>{{dataItem.telephone}}</span>
            </Paragraphe>
            <Paragraphe class="card-agent__details">
                <span>Adresse : </span>
                <span>{{dataItem.address}}</span>
            </Paragraphe>
            <Rate :default-value="dataItem.rating" />
        </div>
        <div class="card-agent__btn">
            <Button width="100%" @on-click="handleClickContact"> Contacter </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Rate from '@/components/Display/Rate/Rate.vue';

    import { ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    const props = defineProps({
        item: {
            type: Array,
        },
    });
    const dataItem = ref<any>(props.item);

    watch(
        () => props.item,
        (value) => {
            dataItem.value = value;
        }
    );

    const handleClickContact = function() {
        router.push({name: 'mini-mail-box'})
    }

</script>

<style lang="scss" scoped>
    .card-agent {
        &__wrap {
            border: 1px solid var(--color-primary);
            border-radius: 5px;
            padding: 10px;
        }
        &__details {
            font-size: 12px;
            span {
                &:first-child {
                    font-weight: bold;
                }
            }
        }
        &__title {
            margin-bottom: 10px;
        }
        &__image {
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 15px;
            img {
                width: 100%;
                height: 120px;
                object-fit: cover;
            }
        }
        &__btn {
            margin-top: 10px;
        }
    }
</style>
