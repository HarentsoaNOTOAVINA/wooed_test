<template>
    <Card class="card" v-if="publication"> 
        <HeadCard
            :labelName="publication?.author?.name"
            :dateAdded="'il y a ' + diffDate(publication?.created)"
            :avatar="publication?.author?.committeeAvatar"
            :id-publication="publication?.id"
            :id-author="publication?.author?.id"
        />
        <div class="">
            <Consult 
                v-if="publication.type === 'consultation'"
                :publication="publication" 
             />
            <div class="card__information" v-else-if="publication.type === 'image'">
                <div v-if="publication?.content" class="card__description">
                    <Paragraphe> {{ publication?.content }} </Paragraphe>
                </div>
                <div v-if="publication?.files.length > 0" class="card__image--wrap">
                    <figure class="card__image">
                        <img
                            :src="
                                baseUrl +
                                '/' +
                                publication.files[0].path +
                                '/' +
                                publication.files[0].name
                            "
                            alt="card product"
                        />
                    </figure>
                </div>
            </div>
            <Festival  
                v-if="publication.type === 'blockParty'"
                :publication="publication"
            />
            <LostAnimals
                v-if="publication.type === 'animal'"
                :publication="publication"
            />
            <ServiceRequest 
                v-if="publication.type === 'newService'"
                :publication="publication"
            />
            <SaleObject 
                v-if="publication.type === 'purchase'"
                :publication="publication"
            />
            <HouseWarming 
                v-if="publication.type === 'houseWarming'"
                :publication="publication"
            />
            <Brocante 
                v-if="publication.type === 'fleatMarket'"
                :publication="publication"
            />
            <Plp 
                v-if="publication.type === 'plp'"
                :publication="publication"
            />

            <hr class="__hr" />
        </div>
        <hr class="__hr" />
        <div class="card__footer">
            <div class="card__reaction">
                <div class="card__reaction--item">
                    <Heart
                        :isShowSvg="props.publication.likes.isLiked"
                        @show-svg="showSvg"
                        @on-set-favorite="setFavorite"
                    />
                    <span>{{ publication.likes.number }}</span>
                </div>
                <div
                    class="card__reaction--item"
                    @click="handleComment(publication.id)"
                >
                    <Icon icon-name="Comment" />
                    <span>{{ publication.totalComments }}</span>
                </div>
            </div>
            <div class="card__mark">
                <Icon icon-name="BookMark" />
            </div>
        </div>
        <Transition appear name="fadeHeight" mode="out-in">
            <div v-show="toogle" class="card__comment--container">
                <hr class="__hr" />
                <div class="card__comment--field-wrap">
                    <avatar :src="userDetails.logo" :size="32" />
                    <div class="card__comment--field">
                        <Textarea
                            :autoSize="{ minRows: 1, maxRows: 4 }"
                            placeholder="Ajouter un commentaire..."
                            name="comment"
                            @change="handleChange"
                            :value="params.content"
                        />
                        <Button
                            type-button="secondary"
                            class="card__comment--send"
                            @click="handlePostComment"
                        >
                            <Icon icon-name="Send" v-if="!loadComment" />
                            <LoadingButton v-else size="xs" theme="dark" />
                        </Button>
                    </div>
                </div>
                <div class="card__comment--items">
                    <div
                        v-for="(item, index) in listComment"
                        :key="index"
                        class="card__comment--item"
                    >
                        <avatar :src="item.author.committeeAvatar" :size="32" />
                        <div class="card__comment--item__content">
                            <div class="card__comment--content__wrap">
                                <Title
                                    type="h4"
                                    :label="item.author.name"
                                    weight="bold"
                                    class="card__comment--title-name"
                                />
                                <Paragraphe>
                                    {{ item.content }}
                                </Paragraphe>
                            </div>
                            <div class="card__comment--item__more">
                                <span> {{ diffDate(item.created) }} </span>
                                <a-popconfirm
                                    @confirm="onDeleteCommentaire(item.id)"
                                    ok-text="Oui"
                                    cancel-text="Non"
                                    title="Voulez-vous vraiment supprimer ce commentaire"
                                    v-if="item.author.id === userID"
                                >
                                    <a
                                        href="#"
                                        class="card__comment--item__delete"
                                    >
                                        supprimer
                                    </a>
                                </a-popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Card>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import HeadCard from '@/pages/community/components/CommunityPublication/HeadCard.vue';
    import Heart from '@/components/Icon/Heart.vue';
    import { computed, onMounted, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import { diffDate } from '@/utils/date/diffDate';
    import Textarea from 'ant-design-vue/lib/input/TextArea';
    import Button from '@/components/Common/Button/Button.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    import Title from '@/components/Common/Title/Title.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { Popconfirm as APopconfirm } from "ant-design-vue";
    
    /**Type component import */
    import LostAnimals from '@/pages/community/components/Publication/LostAnimals.vue';
    import Consult from '@/pages/community/components/Publication/Consult.vue'
    import Festival from '@/pages/community/components/Publication/Festival.vue'
    import ServiceRequest from '@/pages/community/components/Publication/ServiceRequest.vue';
    import SaleObject from '@/pages/community/components/Publication/SaleObject.vue';
    import HouseWarming from '@/pages/community/components/Publication/HouseWarming.vue';
    import Brocante from '@/pages/community/components/Publication/Brocante.vue';
    import Plp from "@/pages/community/components/Publication/Plp.vue";


    const store = useStore();
    let showHeart = ref(true);
    const baseUrl = import.meta.env.VITE_API_ROOT_URL;
    const listComment = ref<any>(null);
    const loadComment = ref<boolean>(false);
    const userID = computed(
        () => store.getters['UserModule/getUserDetails'].id
    );
    const userDetails = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    const emit = defineEmits<{
        (e: 'on-set-favorite', value: number | string): void;
    }>();
    const params = ref<any>({
        post: 0,
        content: '',
    });

    // watch(() => store.getters['CommunityModule/getAllPublication'], (value) => {
    //     console.log("Params\n", value);

    // }, {immediate : true, deep : true});

    const props = defineProps({
        isMyFavorite: {
            type: Boolean,
            default: false,
        },
        publication: {
            type: Object,
            default: {},
        },
        typeAction: {
            type: String,
            default: 'community',
        },
    });

    onMounted(() => {
        if (userLoggedIn.value) {
            if (userLoggedIn.value.roles.includes('ROLE_NOT')) {
                showHeart.value = false;
            } else {
                showHeart.value = true;
            }
        }
    });

    const setFavorite = () => {
        emit('on-set-favorite', props.publication.id);
    };
    const isShowSvg = ref<boolean>(props.isMyFavorite);
    const showSvg = (value: boolean) => {
        console.log('zazazazaza\n', props.publication.likes.isLiked);

        isShowSvg.value = !value;
    };
    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );

    const commentData = [
        {
            image: 'https://i.pravatar.cc/300',
            name: 'Pierre Ratokodimimanana',
            content: 'Lorem ipsum dolor sit amet, consectetur',
            date: '1h',
        },
        {
            image: 'https://i.pravatar.cc/300',
            name: 'Rakotonrina Harinjaka',
            content:
                'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum deserunt accusantium, eveniet eaque minima maxime, ut architecto porro id pariatur illum. Et iusto quis similique sed ipsum a nobis quos!',
            date: '45min',
        },
        {
            image: 'https://i.pravatar.cc/300',
            name: 'Pierre Rakotodimimanana',
            content:
                'Voluptatum deserunt accusantium, eveniet eaque minima maxime, ut architecto porro id pariatur illum',
            date: '1h',
        },
    ];

    const toogle = ref<boolean>(false);

    async function handleComment(idPublication: number) {
        toogle.value = !toogle.value;
        if (toogle.value) {
            console.log('open\n', idPublication);
            const data = await store.dispatch(
                'CommunityModule/getAllComment',
                idPublication
            );
            console.log('List du commentaire\n', data);
            listComment.value = data;
            params.value.post = idPublication;
        } else {
            console.log('close\n', idPublication);
        }
    }

    function handleChange(e: any) {
        params.value.content = e.target.value;
    }

    async function handlePostComment() {
        loadComment.value = true;
        await store
            .dispatch('CommunityModule/createComment', params.value)
            .then(() => {
                // handleComment(params.value.post);
                store
                    .dispatch(
                        'CommunityModule/getAllComment',
                        params.value.post
                    )
                    .then((res) => {
                        listComment.value = res;
                    });
            })
            .finally(() => {
                params.value.content = '';
            });
        loadComment.value = false;
    }

    async function onDeleteCommentaire(idComment: number) {
        await store
            .dispatch('CommunityModule/deleteComment', {
                idPost: params.value.post,
                idComment,
            })
            .then((res) => {
                store
                    .dispatch(
                        'CommunityModule/getAllComment',
                        params.value.post
                    )
                    .then((res) => {
                        listComment.value = res;
                    });
            });
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .card {
        display: flex;
        flex-direction: column;
        gap: 18px;
        transition: all 0.7s ease-in-out;
        &__image {
            width: auto;
            height: 160px;
            position: relative;
            img {
                border-radius: 8px;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__information {
            @apply flex flex-col gap-[18px];
        }
        &__description {
            @apply text-grayIcon;
        }
        &__reaction {
            @apply flex gap-x-[14px];
        }
        &__reaction--item {
            @apply flex items-center gap-x-[4px];
            .icon {
                @apply cursor-pointer;
            }
            span {
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
            }
        }
        &__footer {
            display: flex;
            @apply flex justify-between items-center;
        }
        &__comment {
            &--container {
                max-height: 600px;
                @apply flex flex-col gap-y-[18px];
            }
            &--field-wrap {
                @apply flex items-start gap-x-[12px];
            }
            &--field {
                width: calc(100% - 44px);
                @apply relative flex flex-col gap-y-[10px] overflow-y-hidden;
                &:deep() {
                    .textarea:hover {
                        border: solid var(--color-primary) 1px;
                        box-shadow: none;
                    }
                    .ant-input {
                        @apply bg-white rounded-[24px] text-[14px] pr-[34px];
                    }
                    .ant-input:hover {
                        border: solid var(--color-primary) 1px;
                        box-shadow: none;
                    }
                    .ant-input:focus {
                        border: solid var(--color-primary) 1px;
                        box-shadow: none;
                    }
                }
            }
            &--send {
                width: 30px;
                height: 30px;
                border-radius: 100px;
                @apply absolute right-[5px] bottom-[50%] transform translate-y-[50%] flex flex-row justify-center items-center p-[10px] cursor-pointer transition overflow-hidden;
                &:hover {
                    @apply bg-primary transition;
                    &:deep() {
                        button {
                            @apply bg-transparent p-0;
                        }
                        svg {
                            path {
                                @apply fill-white stroke-primary transition;
                            }
                        }
                    }
                }
                &:deep() {
                    button {
                        @apply bg-transparent;
                    }
                    svg {
                        @apply w-[18px] h-[18px];
                        path {
                            @apply fill-primary transition;
                        }
                    }
                }
            }
            &--items {
                max-height: 350px;
                @apply flex flex-col gap-y-[14px] overflow-y-auto px-[14px] -mx-[14px];
                @include scrollbar;
            }
            &--item {
                @apply flex gap-x-[12px];
            }
            &--item__content {
                width: calc(100% - 44px);
            }
            &--content__wrap {
                @apply bg-gray p-[14px] rounded-[8px] flex flex-col gap-y-[4px];
            }
            &--title-name {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
            }
            &--item__more {
                @apply flex gap-x-[12px] text-grayIcon font-[600];
            }
            &--item__delete {
                @apply transition;
                &:hover {
                    @apply text-primary transition;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 230px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
