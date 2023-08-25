<template>
  <MainCard :dataBreadcrumbs="breadcrumbData" class="chat">
    <Transition appear name="fade-step" mode="out-in">
      <div v-if="showMenu" class="chat__menu">
        <div class="chat__menu-item" @click="handleShowChat">
          <CardWrapper>
            <Icon iconName="Discussion" />
            <span>Nouveau message</span>
          </CardWrapper>
        </div>
        <RouterLink to="/messages" class="chat__menu-item">
          <CardWrapper>
            <Icon iconName="ChatDouble" />
            <span>Historique des discussions</span>
          </CardWrapper>
        </RouterLink>
      </div>
      <div v-else class="chat__wrap">
        <div class="backToMenu" @click="handleShowChat">
          <button class="backToMenu__button">
            <Icon icon-name="ArrowBack" />
            <span> Retour </span>
          </button>
        </div>
        <CardWrapper class="chat__container">
          <div class="chat__list">
            <span class="font-[600]">Chatter avec</span>
            <Select
              :key="`select${key}`"
              name="select"
              placeholder="Sélectionner"
              :options="options"
              @change-select="handleChatList"
            />
          </div>
          <Transition mode="out-in" name="fadeHeight">
            <div v-if="showOwner" class="chat__owner">
              <SelectAutoComplet
                :key="`participant${key}`"
                :options="ownerData"
                subTitle="Propriétaire"
                placeholder="Destinataires"
                name="participant"
                @change-select="handleParticipant"
              />
            </div>
          </Transition>
          <Transition mode="out-in" name="fadeHeight">
            <div v-if="showTenant" class="chat__owner">
              <SelectAutoComplet
                :key="`participant-${key}`"
                :options="tenantData"
                subTitle="Locataire"
                placeholder="Destinataires"
                name="participant"
                @change-select="handleParticipant"
              />
            </div>
          </Transition>
          <div class="chat__field">
            <TextArea
              label="Message"
              :key="`message${key}`"
              placeholder="Votre message ici...."
              name-input="message"
              :auto-size="rows"
              :maxLength="0"
              class="postMessage__field"
              @handle-change="handleMessage"
            />
          </div>
          <div class="chat__send">
            <Button 
                typeButton="secondary" 
                :disabled="submitDisabled"
                @click="startConversation"
            > 
                Envoyer 
            </Button>
          </div>
        </CardWrapper>
      </div>
    </Transition>
  </MainCard>
</template>
<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import Select from "@/components/Common/Select/Select.vue";
import SelectAutoComplet from "@/components/Common/SelectAutoComplet/SelectAutoComplet.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

const store = useStore();
const submitDisabled = ref(true);

const breadcrumbData = [
  {
    label: "Chat",
  },
];

interface Option {
  value: string;
  label: string;
}

interface Detail {
  user: number;
}

interface Contact {
  value: string;
  label: string;
  data: Detail[];
}

const options = ref<Option[]>([
  {
    value: "allOwner",
    label: "Tous les propriétaires de l'immeuble",
  },
  {
    value: "allOwnerTenant",
    label: "Tous les propriétaires et les locataires de l'immeuble",
  },
  {
    value: "owner",
    label: "Un propriétaire",
  },
  {
    value: "tenant",
    label: "Un locataire",
  },
]);

onMounted(async () => {
  store.dispatch("SyndicModule/setSyndicProfile");
  await store.dispatch("SyndicModule/fetchMyLotList");
});

const ownerData = computed(() => {
  const data = store.getters["SyndicModule/getOwnerList"];
  return handleOptionsConsistency(data);
});

const tenantData = computed(() => {
  const data = store.getters["SyndicModule/getTenantList"];
  return handleOptionsConsistency(data);
});

const memberList = computed(() => {
  const data = store.getters["SyndicModule/getMemberList"];
  return handleOptionsConsistency(data);
});

const rows = { minRows: 5, maxRows: 5 };
const showMenu = ref<boolean>(true);
const showOwner = ref<boolean>(false);
const showTenant = ref<boolean>(false);
const key = ref(0);

function handleShowChat() {
  showMenu.value = !showMenu.value;
  if (showMenu.value) {
    showOwner.value = false;
    showTenant.value = false;
  }
}

function handleChatList(value: any) {
  switch (value.select) {
    case "owner":
      showOwner.value = true;
      showTenant.value = false;
      setParticipantList([]);
      break;
    case "tenant":
      showOwner.value = false;
      showTenant.value = true;
      setParticipantList([]);
      break;
    case "allOwner":
      setParticipantList(ownerData.value);
      break;
    case "allOwnerTenant":
      setParticipantList(memberList.value);
      break;
    default:
      showOwner.value = false;
      showTenant.value = false;
      break;
  }
}

function handleOptionsConsistency(contactList: any) {
  console.error(contactList, "CONTACT LIST");
  let formated: Contact[] = [];
  if (Array.isArray(contactList) && contactList.length >= 1) {
    contactList.forEach((contact: any) => {
      formated.push({
        value: contact.lotId,
        label: contact.name,
        data: [
          {
            user: contact.id,
          },
        ],
      });
    });
  }
  return formated;
}

function setParticipantList(value: any) {
  let participants: Detail[] = [];
  value.forEach((participant: Contact) => {
    participants.push(participant.data[0]);
  });
  store.commit("SyndicModule/SET_PARTICIPANTS", participants);
  submitDisabled.value = false;
}

function handleParticipant(value: any, option: Contact) {
  store.commit("SyndicModule/SET_PARTICIPANTS", option.data);
  submitDisabled.value = false;
}

function handleMessage(value: any) {
  store.commit("SyndicModule/SET_MESSAGE", value.message);
}

async function startConversation() {
  const success = await store.dispatch("SyndicModule/initiateConversation");
  if (success) {
    notification["success"]({ message: "Votre message a été envoyer" });
    key.value++;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";

.chat {
  &__menu {
    @apply max-w-[520px] w-full flex justify-center gap-[18px];

    &-item {
      @apply w-full cursor-pointer;

      &:hover {
        @apply text-primary transition-all;

        &:deep() {
          .card-wrapper {
            @include hoverButtonDark;
          }

          .icon {
            svg path {
              @apply fill-primary;
            }
          }
        }
      }
    }

    &:deep() {
      .card-wrapper {
        @apply h-full flex flex-col gap-[10px] text-center;

        &:last-child {
          .icon {
            svg {
              @apply w-[25px] h-[25px];
            }
          }
        }
      }

      .icon {
        svg {
          @apply w-[20px] h-[20px];
        }
      }
    }
  }

  &__wrap {
    @apply w-full flex flex-col items-center gap-[18px];
  }

  &__container {
    box-shadow: 1px 1px 10px 1px var(--color-gray);
    @apply max-w-[520px] w-full flex flex-col gap-[18px];
  }

  &__list {
    @apply flex items-center gap-[14px];
  }

  &__owner {
    &:deep() {
      .ant-select-arrow {
        display: none;
      }

      .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        @apply pl-[35px] relative;

        &:after {
          content: "A :";
          position: absolute;
          left: 11px;
          height: 100%;
          width: 25px;
          @apply flex items-center;
          visibility: visible;
        }
      }

      .ant-select-show-search.ant-select:not(.ant-select-customize-input)
        .ant-select-selector
        input {
        padding-left: 25px;
      }
    }
  }

  &__send {
    @apply flex justify-end;
  }

  .backToMenu {
    @apply w-full;

    &__button {
      @apply flex items-center gap-[14px];

      &:hover {
        @apply text-primary;

        &:deep() {
          svg path {
            @apply fill-primary;
          }
        }
      }
    }
  }

  &:deep() {
    .mainCard__items-wrap {
      @apply min-h-[311px] flex flex-col items-center gap-[18px];
    }

    .custom-select__wrapper {
      width: calc(100% - 99px);
      @apply mb-0;
    }

    .select-autocomplete {
      @apply flex flex-col gap-[10px];

      .label-select {
        @apply mx-0 font-[600] text-grayIcon;
      }
    }
  }
}

/* Fade height */
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 800px;
}

.fadeHeight-enter-from,
.fadeHeight-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0px;
}

/* Fade step */
.fade-step-enter-active,
.fade-step-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 230px;
}

.fade-step-enter-from,
.fade-step-leave-to {
  opacity: 0;
  transform: translateX(-8px);
  max-height: 0px;
}
</style>
