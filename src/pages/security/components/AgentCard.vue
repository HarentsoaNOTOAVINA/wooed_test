<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue'
import Profile from "@/components/Icon/Profile.vue";
import Mail from "@/components/Icon/Mail.vue";
import Phone from '@/components/Icon/Phone.vue';

const props = defineProps({
    title : {
        type : String,
        default : "Titre 1"
    },
    name : {
        type : String,
        default : "John Doe"
    },
    email : {
        type : String,
        default : "john@doe.com"
    },
    phone : {
        type : String,
        default : "+261 34 94 296 76"
    }
});

</script>

<template>
    <div class="agent agent__container">
        <div class="agent__header">
             <P class="agent__title">{{props.title}}</P>
             <hr class="agent__divider">
        </div>

        <table>
            <tbody>
                <tr>
                    <td class="agent__label">
                        <Profile />
                        <span>Nom</span>
                    </td>
                    <td class="agent__value">{{props.name}}</td>
                </tr>
                <tr>
                    <td class="agent__label">
                        <Mail />
                        <span>Adresse email</span>
                    </td>
                    <td class="agent__value">{{props.email}}</td>
                </tr>
                <tr>
                    <td class="agent__label">
                        <Phone />
                        <span>Numéro téléphone</span>
                    </td>
                    <td class="agent__value">{{props.phone}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .agent{
        &__container {
            @apply flex flex-col gap-[10px];
        }

        &__header{
            color: var(--color-stroke-gray);
            @apply flex flex-col font-semibold;
        }
        
        &__body{
            @apply flex;
        }

        &__divider{
            @apply bg-slate-200;
        }
        &__label{
            @apply flex gap-[10px];
        }

        &__label > span{
            color: var(--color-stroke-gray);
            @apply font-semibold;
        }

        &__value{
            @apply font-semibold;
        }

        &__title{
            color: var(--color-stroke-gray);
        }

        td{
            @apply p-[5px];
        }
    }
</style>