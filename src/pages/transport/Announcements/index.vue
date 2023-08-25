<template>
  <div class="colis-search">
    <div v-if="loaded">
      <div class="colis-search__container">
        <Transition appear name="fadeHeight" mode="out-in">
          <div class="colis-search__items" :class="toggleShow === true ? 'hidden' : ''">
            <Card class="colis-search__card-title">
              <Title type="h2" weight="600" label="Transport" class="" />
            </Card>
            <MainCard :dataBreadcrumbs="breadcrumbListsData" class="colis-search__card">
              <div class="colis-search__items-container">
                <BackButton :text="'retour'" @return="backTo" />
                <div class="colis-search__items-wrap">
                  <Title type="h2" weight="600" label="Transportez des colis sur votre trajet"
                    class="colis-search__title" />
                  <div class="colis-search__items-field">
                    <Input id="departureAddressField" :iconField="true" iconNameField="MarkerIcon" placeholder="Départ"
                      class="colis-search__items-field--reverse" @input="handleAddressField" />
                    <Input id="arrivalAddressField" :iconField="true" iconNameField="MarkerIcon" placeholder="Arrivée"
                      class="colis-search__items-field--reverse" @input="handleAddressField" />
                  </div>
                </div>
                <div class="colis-search__filter-container">
                  <FilterButton @toggle-filter="displayFilter" />
                  <Transition appear name="fadeHeight" mode="out-in">
                    <div v-show="showFilter" class="w-full">
                      <div class="select-input-group">
                        <div class="select-input">
                          <Select name="detour" label="Detour possible" :options="possibleDetourOptions"
                            @change-select="handleFilter" />
                        </div>
                        <div class="select-input">
                          <Select name="format" :mode="'multiple'" :options="formatFilterOptions" label="Format"
                            @change-select="handleFilter" />
                        </div>
                        <div class="select-input">
                          <Input nameInput="price" label="Prix minimum" input-type="number" unity="€"
                            @input="handleFilter" />
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
                <Paragraphe class="font-semibold">
                  {{ announcementList.length }} resultats
                </Paragraphe>
                <div class="colis-search__items-content">
                  <template v-for="(item, index) in announcementList" :key="index">
                    <ColisCardItem class="cursor-pointer" :colisData="item" @click="touchHandler" />
                  </template>
                </div>
              </div>
            </MainCard>
          </div>
        </Transition>
        <Transition appear name="fadeHeight" mode="out-in">
          <div v-show="toggleShow" class="colis-search__map-container">
            <Button @click="handleClick" class="btn-return">
              <Icon icon-name="ArrowBack" />
              <span>Retour</span>
            </Button>
            <div class="colis-search__map-item">
              <Map :needMarkerLayer="true" :needFilteredCoords="true" :markersCoordinates="coordinateData"
                @touched="touchHandler" :key="mapKey" />
            </div>
          </div>
        </Transition>
        <Button @click="handleClick" class="view-map">
          <span v-if="!toggleShow"> Voir la carte </span>
          <span v-else> Cacher la carte </span>
        </Button>
      </div>
      <Modal :is-show-modal="announcementData !== undefined" @on-back="hideModal"
        :width="screenType >= 1024 ? '800' : '520'" :title="announcementData ? announcementData.title : ''">
        <template #content>
          <AnnounceOverview :data="announcementData" :display-form="displaySubmitionForm" :object-data="objectDetails"
            :announcement-details="announcementDetails" />
          <div v-if="ableToSetProposal &&
            announcementData &&
            announcementData.user !== currentUser.id
            " class="submition-button">
            <Button v-if="!displaySubmitionForm" type-button="secondary" class="btn" @click="displaySubmitionForm = true">
              Je me propose
            </Button>
            <Button v-else type-button="secondary" class="btn" :disabled="!messageExist" @click="submitProposal">
              Envoyer mon message
            </Button>
          </div>
        </template>
      </Modal>
      <Modal :is-show-modal="needToUpdateProfile" @on-back="hideModal" :width="screenType >= 1024 ? '800' : '520'"
        title="Mise à jour necessaire">
        <template #content>
          <Icon icon-name="UpdateProfile" />
          <div class="modal__text">
            Votre profil n’est pas valide<br />
            Veuillez le mettre à jour pour continuer
          </div>
          <div class="modal__buttons">
            <Button type-button="primary-cancel" class="btn" @click="hideModal">
              Annuler
            </Button>
            <Button type-button="primary" class="btn" @click="goToUserProfile">
              Mettre a jour
            </Button>
          </div>
        </template>
      </Modal>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAutoComptetion from "@/composables/useAutoComplete";
import Button from "@/components/Common/Button/Button.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import Input from "@/components/Common/Input/Input.vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import Title from "@/components/Common/Title/Title.vue";
import Card from "@/components/Display/Card/Card.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import Map from "@/components/section/map/index.vue";
import ColisCardItem from "@/pages/transport/components/ColisCardItem.vue";
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import FilterButton from "@/pages/transport/components/FilterButtonIcons.vue";
import Select from "@/components/Common/Select/Select.vue";
import Modal from "@/components/Display/Modal/Modal.vue";
import AnnounceOverview from "@/pages/transport/components/AnnounceOverview.vue";
import Loader from "@/components/Common/Loader/Loader.vue";

import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

import { useSlug } from "@/composables/user/useUsernameSlug";

import { formatFilterOptions, possibleDetourOptions } from "@/pages/transport/Announcements/data";

const screenType = ref<number>(screen.width);

interface IFilterSet {
  price: number;
  format: number[];
  ray?: number;
}

const store = useStore();
const router = useRouter();
const slug = useSlug();

const departureAddressData = useAutoComptetion("departureAddressField");
const arrivalAddressData = useAutoComptetion("arrivalAddressField");

const announcementData = ref<any>();
const announcementDetails = ref<any>();
const objectDetails = ref<any>();
const displaySubmitionForm = ref<boolean>(false);
const ableToSetProposal = ref<boolean>(true);
const loaded = ref<boolean>(false);

const announcementList = ref<any>([]);
const coordinateData = ref<Array<any>>([]);
const showFilter = ref<boolean>(false);
const needToUpdateProfile = ref<boolean>(false);
const messageExist = computed(() => {
  const data = store.getters["TransportModule/getProposalData"];
  return data.hasOwnProperty("message") && data.message !== "";
});

const filterSet = ref<IFilterSet>({ price: 0, format: [], ray: undefined });

const mapKey = ref<number>(0);
const componentKey = ref(0);

const toggleShow = ref<boolean>(false);
const currentUser = computed(() => store.getters["UserModule/getUserDetails"]);

const storedAddressData = computed(
  () => store.getters["TransportModule/getAddressFilterData"]
);

const breadcrumbListsData = [
  {
    label: "Annonces",
  },
];

watch(
  () => departureAddressData.autocompleteResult,
  (value) => {
    let temp = {
      departureAddress: value.value?.address,
      departureLatitude: String(value.value?.lat),
      departureLongitude: String(value.value?.lng),
    };
    handleAddressField(temp);
  },
  { immediate: true, deep: true }
);

watch(
  () => arrivalAddressData.autocompleteResult,
  (value) => {
    let temp = {
      arrivalAddress: value.value?.address,
      arrivalLatitude: String(value.value?.lat),
      arrivalLongitude: String(value.value?.lng),
    };
    handleAddressField(temp);
  },
  { immediate: true, deep: true }
);

watch(
  () => coordinateData.value,
  () => {
    mapKey.value++;
  },
  { immediate: true, deep: true }
);

watch(
  () => filterSet.value,
  (value) => {
    filterSet.value = value;
    filterByFilterSet();
  },
  { immediate: true, deep: true }
);

watch(
  () => announcementList.value,
  (value) => {
    announcementList.value = value;
  },
  { immediate: true, deep: true }
);

watch(
  () => announcementData.value,
  (value) => {
    setDataForModal(value);
    announcementData.value = value;
    displaySubmitionForm.value = false;
    announcementData.value ? setAnnouncementId() : reinitiateProposalData();
  },
  { immediate: true, deep: true }
);

watch(
  () => needToUpdateProfile.value,
  (value) => {
    needToUpdateProfile.value = value;
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  announcementList.value = await store.dispatch("TransportModule/fetchAnnouncements");
  toggleLoader();
  updateCoordinateData();
});

function toggleLoader() {
  setTimeout(() => {
    loaded.value = true;
  }, 2000);
}

function updateCoordinateData() {
  announcementList.value.map((element: any) => {
    if (element.departureLatitude && element.departureLongitude) {
      let latitude = parseFloat(element.departureLatitude);
      let longitude = parseFloat(element.departureLongitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const data: object = {
          lat: latitude,
          lng: longitude,
          customIcon: `${window.location.origin}/src/static/images/map/package-marker.png`,
          announcementInfo: element,
        };
        coordinateData.value.push(data);
      }
    } else {
      console.error(element);
    }
  });
}

function setDataForModal(value: any) {
  if (value) {
    announcementDetails.value = {
      image: value.photos[0].path,
      propositions: value.propositions,
      budget: value.budget,
      deliveryDate: value.deliveryDate
    };
    objectDetails.value = value.announcementObjects[0];
  };
}

function handleClick() {
  toggleShow.value = !toggleShow.value;
}

function backTo() {
  router.push({ name: "transport" });
}

function touchHandler($event: any) {
  announcementData.value = $event.announcementInfo;
}

function displayFilter(value: any) {
  showFilter.value = value;
}

function handleFilter(value: any) {
  if (value.hasOwnProperty("price")) {
    filterSet.value.price = value.price;
  } else if (value.hasOwnProperty("format")) {
    filterSet.value.format = value.format;
  } else if (value.hasOwnProperty("detour")) {
    let data = computed(() => store.getters["TransportModule/getAddressFilterData"]);
    if (data.value.departureLatitude && data.value.arrivalLongitude) {
      filterSet.value.ray = value.detour;
    } else {
      // faire clignoter les champ requis
      // TODO: disable the ray select input if address are not given
      // TODO: add switcher to hold address inputs if from one or two addresses
    }
  }
}

function handleAddressField(value: any) {
  store.dispatch("TransportModule/setAddressFilterData", value);
}

async function filterByFilterSet() {
  let price: number = filterSet.value.price;
  let formatList: number[] | string[] = filterSet.value.format;
  let ray: number | undefined = filterSet.value.ray;
  ray
    ? (announcementList.value = await store.dispatch(
      "TransportModule/fetchSearchByRayResult",
      ray
    ))
    : (announcementList.value = store.getters["TransportModule/getAnnouncementList"]);
  let listFilteredByMinPrice = filteringByMinPrice(price);
  formatList.length >= 1
    ? (announcementList.value = filteringByFormat(formatList, listFilteredByMinPrice))
    : (announcementList.value = listFilteredByMinPrice);
  updateCoordinateData();
}

function filteringByMinPrice(price: number) {
  return announcementList.value.filter(
    (element: any) => parseFloat(element.budget) >= price
  );
}

function filteringByFormat(format: number[], dataArray: any[]) {
  return dataArray.filter((element, idx) => {
    const sizeId = element.announcementObjects[0]?.sizeValue?.id;
    return sizeId && format.includes(sizeId) && dataArray.indexOf(element) === idx;
  });
}

function hideModal() {
  announcementData.value = undefined;
  needToUpdateProfile.value = false;
}

async function submitProposal() {
  hideModal();
  let response = await store.dispatch("TransportModule/submitProposal");
  if (response.code === 201) {
    hideModal();
    notification["success"]({
      message: "Success",
      description: "Votre a ete envoyer",
    });
  } else {
    announcementData.value = undefined;
    needToUpdateProfile.value = true;
  }
}

function goToUserProfile() {
  router.push({
    path: slug.value,
    query: {
      to: JSON.stringify({ name: "Mettre a jour identite" }),
    },
  });
}

function setAnnouncementId() {
  store.dispatch("TransportModule/setProposalData", {
    announcement: announcementData.value.id,
  });
  checkProposition();
}

function reinitiateProposalData() {
  store.dispatch("TransportModule/reinitiateProposalData");
}

function checkProposition() {
  if (
    announcementData.value.propositions &&
    announcementData.value.propositions.length >= 1
  ) {
    let propositions = announcementData.value.propositions;
    for (let idx in propositions) {
      if (propositions[idx].user === currentUser.value.id)
        ableToSetProposal.value = false;
    }
  } else {
    ableToSetProposal.value = true;
  }
}
</script>

<style lang="scss" scoped>
@import "@/style.scss";

.colis-search {
  @apply mt-[18px] flex container;

  &__container {
    @apply w-full grid grid-cols-1 gap-[18px] mb-[70px];

    @screen md {
      @apply grid grid-cols-2 mb-0;
    }
  }

  &__card-title {
    @apply mb-[12px];

    @screen md {
      @apply hidden;
    }

    h2 {
      @apply text-[14px];
    }
  }

  &__card {
    &:deep() {
      .mainCard__head-items {
        @apply hidden;

        @screen md {
          @apply block;
        }

        &+.__hr {
          @apply hidden;

          @screen md {
            @apply block;
          }
        }
      }

      .mainCard__items-wrap {
        @apply pt-0;

        @screen md {
          @apply pt-[14px];
        }
      }
    }
  }

  &__items {
    @screen md {
      display: block !important;
    }
  }

  &__items-container {
    @apply flex flex-col gap-y-[18px];
  }

  &__title {
    @apply text-[14px];
  }

  &__items-wrap {
    @apply flex flex-col gap-y-[14px];
  }

  &__items-field {
    @apply grid grid-cols-2 gap-[14px];

    &--reverse {
      @apply mb-0;

      &:deep() {
        .custom-input__label-icon {
          @apply hidden;
        }

        .ant-input {
          @apply pr-[11px] pl-[38px];
        }

        .custom-input__fields--form .unit {
          @apply left-3.5 right-auto;

          svg {
            @apply w-[18px] h-[18px];
          }
        }
      }
    }
  }

  &__items-content {
    @apply flex flex-col gap-y-[14px] px-[14px] -mx-[14px] overflow-y-auto;

    @screen md {
      height: calc(100vh - 374px);
      @include scrollbar;
    }
  }

  &__map-container {
    width: calc(100% - 36px);
    @apply fixed;

    @screen md {
      display: block !important;
      @apply static;
    }
  }

  &__map-item {
    min-height: calc(100vh - 200px);
    @apply h-[300px] w-full mb-[10px] relative z-10;

    @screen md {
      min-height: calc(100vh - 94px);
    }
  }

  &__filter-container {
    @apply w-full flex justify-between flex-col items-end;
  }
}

.view-map {
  @apply fixed flex justify-center w-full bottom-0 left-0 z-10 mb-[18px];

  @screen md {
    @apply hidden;
  }

  &:deep() {
    button {
      width: calc(100% - 36px);
    }
  }
}

.btn-return {
  @apply w-full mb-[14px];

  @screen md {
    @apply hidden;
  }

  &:deep() {
    button {
      @apply w-full bg-white flex items-center gap-x-[8px] py-[14px];

      span {
        @apply text-black;
      }
    }
  }
}

.select-input-group {
  @apply flex flex-wrap gap-x-4 justify-between items-end my-2.5;

  @screen md {
    @apply flex flex-wrap;
  }

  .select-input {
    @apply w-full;

    @screen md {
      @apply w-full -mt-2.5;
    }
  }
}

.submition-button {
  @apply w-full flex justify-end;

  .btn {
    @apply w-1/2 font-semibold rounded-full my-2 py-1 z-10;

    @screen md {
      @apply w-auto px-4;
    }
  }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 1000px;
}

.fadeHeight-enter-from,
.fadeHeight-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0px;
}

.custom-input__fields {
  &:deep() {
    @apply mb-[18px];
  }
}

.ant-select-selection-item-content {
  &:deep() {
    @apply my-4;
    background-color: gray;
  }
}

.ant-select-multiple .ant-select-selection-item {
  &:deep() {
    @apply my-4;
  }
}

.modal {
  &__text {
    @apply text-center my-[18px];
  }

  &__buttons {
    @apply w-full flex justify-center gap-x-[18px];
  }
}
</style>
