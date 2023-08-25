<template>
  <div class="user-ads">
    <Loader v-if="loadProductsList" />
    <ListProducts
      v-else
      :isBordered="true"
      :isParentHandled="true"
      :DataCard="productsList"
      :isStatus="true"
      @on-handle-detail="handlePropertyDetails"
      @onEdit="handleModal"
      @moreInfo="handleMoreInformation"
    />

    <Modal
      width="400"
      title="Supprimer toutes les alertes"
      :isShowModal="isShowModalAll"
      @onBack="handleModal"
    >
      <template #content>
        <a-alert
          message="warning"
          type="warning"
          description="Voulez-vous modifier ce bien?"
          show-icon
        />
        <div class="myAlerts__btnContainer">
          <Button @on-click="handleModal" typeButton="primary-cancel">Non</Button>
          <Button @on-click="gotoEdit"> Oui</Button>
        </div>
      </template>
    </Modal>
    <transition appear name="fade-btn" mode="out-in">
      <MoreInformation v-if="isMoreInformation" @onBack="back" class="more-info" />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/Common/Button/Button.vue";
import { Alert as AAlert } from "ant-design-vue";
import Modal from "@/components/Display/Modal/Modal.vue";
import Loader from "@/components/Common/Loader/Loader.vue";
import ListProducts from "@/components/section/ListProducts/ListProducts.vue";
import productsListServices from "@/services/productsListService";
import { onMounted, ref } from "vue";
import MoreInformation from "./MoreInformation.vue";

const router = useRouter();
const productsList = ref<Array<any>>([]);
const loadProductsList = ref<boolean>(false);
let isShowModalAll = ref<boolean>(false);
let isMoreInformation = ref<boolean>(false);
let propertyId = ref<number>();
onMounted(() => {
  getProductsList();
});

function gotoEdit() {
  console.log(propertyId.value);
  // router.push(`/ajouter/${propertyId.value}`);//misy bug fa tsy tafiditra n data anle store
  router.push(`/ajouter`); //misy bug fa tsy tafiditra n data anle store
}

function handleModal(value?: any) {
  isShowModalAll.value = !isShowModalAll.value;
  if (value) {
    if (!propertyId.value || value.value !== propertyId.value) {
      propertyId.value = value.value;
    }
  }
  console.log(propertyId.value);
}

async function getProductsList() {
  try {
    loadProductsList.value = true;
    const { data } = await productsListServices.getProductsListPerUser();
    // productsList.value = [...data];
    productsList.value = data.filter((obj: { operationType: string; }) => obj.operationType !== 'occupied');
    console.log(productsList.value, "productsList.value");
    
  } finally {
    loadProductsList.value = false;
  }
}
function handlePropertyDetails(details: any) {
  const { id } = details;
  router.push("/detail/" + id);
}

function handleMoreInformation() {
  isMoreInformation.value = true;
  // router.push({
  //     query: { type: "complete" },
  // });
}
function back() {
  isMoreInformation.value = false;
}
</script>

<style lang="scss" scoped>
@import "@/style.scss";
.user-ads {
  @apply h-screen overflow-y-auto;
  @include scrollbar;
  min-height: 70vh;
  &:deep() {
    .custom-loader {
      background-color: transparent;
    }
    .product-card {
      @apply grid sm:grid-cols-2 md:grid-cols-2  gap-4;
    }
  }
  .fade-component-enter-active,
  .fade-component-leave-active {
    transition: all 0.25s ease-in;
  }
  .fade-component-enter-from,
  .fade-component-leave-to {
    opacity: 0;
    transform: translateX(60px);
    position: absolute;
    overflow: hidden;
    width: 100%;
    // top: 0;
    // right: 0;
  }
}
.more-info {
  @apply absolute top-0 w-full h-screen bg-white;
}
</style>
