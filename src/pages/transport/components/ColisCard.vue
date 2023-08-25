<template>
	<div class="transport-card__section">
		<Card class="transport-card__container">
			<div class="transport-card__content">
				<div class="transport-card__head-items">
					<Title class="transport-card__title" :label="pageTitle" type="h3" weight="600" />
				</div>
				<hr class="__hr" />
				<BackButton :text="'retour'" @return="backTo" class="mb-[10px]" />
				<div class="transport-card__items-wrap">
					<component 
						:is="activeFormComponent" 
						:need-to-be-completed="needToCompleted"
						:announcement-data="announcementStoredData" 
						:object-data="objectStoredData"
						@store-announcement-data="storeAnnouncementData" 
						@store-object-data="storeObjectData"
						@next-step="handleClick('next')" 
					/>
				</div>
			</div>

			<div v-show="activeFormId !== 'volumePreference'" class="transport-card__btn-foot">
				<div v-if="!displayPostAnnounceButton" class="transport-card__nav-buttons">
					<Button v-if="!disablePreviousButton" type-button="border" class="btn-foot"
						@click="handleClick('previous')">
						Précedent
					</Button>
					<Button type-button="secondary" class="btn-foot" @click="handleClick('next')"
						:disabled="disableNextButton">
						Suivant
					</Button>
				</div>
				<div v-else class="transport-card__post-button">
					<Button 
						type-button="primary" 
						@click="submitForm" 
						class="mx-auto"
						:disabled="!announcementStoredData.budget || parseInt(announcementStoredData.budget) === 0"
					>
						Poster l'annonce
					</Button>
				</div>
			</div>
			
			<!-- We are waiting for miniBoiteMail finalization to finalize this part  
				
				<div v-if="askTchatPreference">
				<Modal
					@on-back="askTchatPreference = false"
					:title="''"
					:is-show-modal="askTchatPreference"
				>
					<template #content>
						CECI EST UN TEST
					</template>
				</Modal>
			</div> -->
		</Card>
	</div>
</template>
<script lang="ts" setup>
import Title from "@/components/Common/Title/Title.vue";
import Card from "@/components/Display/Card/Card.vue";
import BackButton from "@/components/Common/BackButton/BackButton.vue";
import Button from "@/components/Common/Button/Button.vue";
import Modal from '@/components/Display/MainCard/MainCard.vue';

import { notification } from "ant-design-vue";

import { ref, shallowRef, watch, onMounted, computed, PropType } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

interface IFormItem {
	component: object;
	requiredFields: string[];
	pageTitle: string;
	id?: string;
}

const props = defineProps({
	formList: {
		type: Array as PropType<IFormItem[]>,
		required: true,
	}
});

const emit = defineEmits(["set-moving-preference"]);

const activeFormIndex = ref<any>(0);
const activeFormComponent = shallowRef<any>();
const activeFormId = ref<string>();
const activeFormRequiredFields = ref<string[]>([]);
const pageTitle = ref<string>();
const disableNextButton = ref<boolean>(true);
const disablePreviousButton = ref<boolean>(false);
const displayPostAnnounceButton = ref<boolean>(false);
const needToCompleted = ref<string[]>([]);
const announcementStoredData = computed(() => store.getters["TransportModule/getAnnouncementData"]);
const objectStoredData = computed(() => store.getters["TransportModule/getObjectData"]);
const volumeFormIndex = computed(() => store.getters["TransportModule/getVolumeFormIndex"]);
const askTchatPreference = ref<boolean>(false);

watch(() => activeFormIndex.value,
	(index) => {
		activeFormComponent.value = props.formList[index].component;
		activeFormRequiredFields.value = props.formList[index].requiredFields;
		pageTitle.value = props.formList[index].pageTitle;
		if (props.formList[index].hasOwnProperty('id')) activeFormId.value = props.formList[index].id;
		index === 0
			? (disablePreviousButton.value = true)
			: (disablePreviousButton.value = false);
		index === props.formList.length - 1 && props.formList.length !== 1
			? (displayPostAnnounceButton.value = true)
			: (displayPostAnnounceButton.value = false);
	},
	{ immediate: true, deep: true }
);

watch(() => needToCompleted.value,
	(value) => {
		needToCompleted.value = value;
		if (needToCompleted.value.length === 0) disableNextButton.value = false;
	},
	{ immediate: true, deep: true }
);

onMounted(() => checkAnnouncementUser());

function checkAnnouncementUser() {
	if (!announcementStoredData.value.user) {
		const userDetails = store.getters["UserModule/getUserDetails"];
		store.dispatch("TransportModule/setAnnouncementData", {
			user: userDetails.id,
			userName: userDetails.name,
			userFirstName: userDetails.firstname,
		});
	}
}

function handleClick(value: any) {
	value === "next" ? getNextIndex() : getPreviousIndex();
}

function getNextIndex() {
	checkRequiredFields();
	if (!disableNextButton.value) {
		activeFormIndex.value < props.formList.length - 1 &&
			activeFormIndex.value !== props.formList.length
			? (activeFormIndex.value = activeFormIndex.value + 1)
			: (activeFormIndex.value = activeFormIndex.value);
	}
}

function getPreviousIndex() {
	activeFormIndex.value > 0
		? (activeFormIndex.value = activeFormIndex.value - 1)
		: (activeFormIndex.value = activeFormIndex.value);
}

function storeAnnouncementData(value: any) {
	store.dispatch("TransportModule/setAnnouncementData", value);
	checkNonFilledFields(value);
	if (value.hasOwnProperty('isVolumeKnown')) emit("set-moving-preference", value);
}

function storeObjectData(value: any) {
	store.dispatch("TransportModule/setObjectData", value);
	checkNonFilledFields(value);
}

function checkRequiredFields() {
	let nonFilled = [];
	const announcementKeys = Object.keys(announcementStoredData.value);
	const objectKeys = Object.keys(objectStoredData.value);
	for (let key in activeFormRequiredFields.value) {
		if (announcementKeys.includes(key)) {
			let currentElement = announcementStoredData.value[key];
			if (typeof currentElement !== "boolean") {
				isValid(currentElement) ? "" : nonFilled.push(key);
			}
		} else if (objectKeys.includes(key)) {
			let currentElement = objectStoredData.value[key];
			if (typeof currentElement !== "boolean") {
				isValid(currentElement) ? "" : nonFilled.push(key);
			}
		} else {
			nonFilled.push(key);
		}
	}
	if (nonFilled.length >= 1) disableNextButton.value = true;
	needToCompleted.value = nonFilled;
}

function isValid(element: any) {
	if (
		element === undefined ||
		(Array.isArray(element) && element.length === 0) ||
		(typeof element === "string" && element.length === 0)
	)
		return false;
	else return true;
}

function checkNonFilledFields(value: any) {
	if (needToCompleted.value.length >= 1) {
		let keys = value.keys();
		for (let key in keys) {
			if (needToCompleted.value.includes(key) && isValid(value.key))
				needToCompleted.value = needToCompleted.value.filter(
					(element: string) => element !== key
				);
		}
	}
}

async function submitForm() {
	// checkMovingCompany();
	let success = await store.dispatch("TransportModule/submitAnnouncement");
	success
		? successProcess()
		: notification["error"]({
			message: "Erreur",
			description: "Vous n'aviez pas rempli convenablement les formulaires d'annonce",
		});
}

function checkMovingCompany() {
	const announcementData = store.getters["TransportModule/getAnnouncementData"];
	const keys = Object.keys(announcementData);
	console.error(keys, 'KEYS LIST');
	if (keys.includes('moving-company')) {
		let tchatPreference = store.getters["TransportModule/getTchatMovingPreference"];
		if (tchatPreference !== undefined) {
			askTchatPreference.value = true
		}
	}
}

function backTo() {
	activeFormIndex.value === 0
		? router.push({ name: "transport-create-announcement" })
		: getPreviousIndex();
}

function goToNextForm() {
	activeFormIndex.value = volumeFormIndex.value;
}

function successProcess() {
	notification["success"]({
		message: "Success",
		description: "Votre annonce vient d'etre publier",
	});
	router.push("/transport/annonces");
}
</script>
<style lang="scss" scoped>
.transport-card {
	background-color: #fff;

	&__section {
		@screen md {
			height: calc(100vh - 94px);
			@apply flex-1;
		}
	}

	&__container {
		@apply h-full grid content-between;
		background-color: #fff;
		min-height: calc(100vh - 100px);
	}

	&__head-items {
		@apply hidden mt-0 mb-[18px];

		@screen md {
			@apply inline-block;
		}
	}

	&__items-wrap {
		@apply px-[14px] -mx-[14px];

		@screen md {
			height: calc(100vh - 240px);
			@apply overflow-y-auto pb-4;
			// @include scrollbar;
		}
	}

	&__title {
		@apply text-[14px] text-grayIcon;

		@screen md {
			@apply text-[16px];
		}
	}

	&__button {
		@apply mb-[18px];
	}

	&__btn-foot {
		@apply flex justify-end gap-x-4 mt-4 z-10;
		background-color: #fff;

		@screen md {
			@apply -mt-4;
		}

		.btn-foot-primary,
		.btn-foot-secondary {
			@apply w-1/2 font-semibold rounded-full my-2 py-1;

			@screen md {
				@apply w-1/5;
			}
		}

		.btn-foot {
			@apply w-1/2 font-semibold rounded-full my-2 py-1 z-10;

			@screen md {
				@apply w-1/5;
			}
		}

		&:deep() {
			button {
				@apply w-full;
			}
		}
	}

	&__fielRequired {
		@apply flex flex-col;

		@screen sm {
			@apply flex flex-row justify-between items-center;
		}
	}

	&__fielRequired--content {
		@apply block mb-[14px];

		@screen sm {
			@apply mb-[0];
		}
	}

	&__nav-buttons {
		@apply w-full flex justify-end gap-x-4;
	}

	&__post-button {
		@apply w-full flex;
	}
}

.__hr {
	@apply hidden;

	@screen md {
		@apply block mb-[10px] text-gray;
	}
}
</style>
