<script lang="ts" setup>

const props = defineProps({
    publication : {
        type : Object,
        default : {}
    }
})

const baseUrl = import.meta.env.VITE_API_ROOT_URL


</script>

<template>
    <div class="lostAnimal">
        <ul class="lostAnimal__info">
            <li class="lostAnimal__info--item">
                <strong>Type d'animal :</strong> <span>{{publication.animal.animalType}}</span>
            </li>
            <li class="lostAnimal__info--item">
                <strong>Nom de l'animal :</strong> <span>{{publication.animal.animalName}}</span>
            </li>
            <li class="lostAnimal__info--item">
                <strong>Couleur :</strong> <span>{{publication.animal.animalColor}}</span>
            </li>
            <li class="lostAnimal__info--item">
                <strong>Sexe de l'animal : </strong>
                <span>{{publication.animal.animalSex}}</span>
            </li>
        </ul>
        <div class="lostAnimal__image--wrap">
            <figure class="lostAnimal__image">
                <img
                    :src="baseUrl+'/'+publication.files[0].path+'/'+publication.files[0].name"
                    alt="Image"
                />
            </figure>
        </div> 
    </div>
</template>
<style lang="scss" scoped>
    .lostAnimal {
        @apply flex flex-col gap-y-[18px];
        &__image {
            width: 100%;
            height: auto;
            position: relative;
            img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
</style>
