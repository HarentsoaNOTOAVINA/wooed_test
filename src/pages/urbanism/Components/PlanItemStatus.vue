<template>
    <div class="urban-plan__description-item" @click="toggleActive" v-if="zone">
        <div class="urban-plan__description-item-affectation">
            <div class="text">
                <span>{{ title }}</span>
                <span class="urban-zone" v-if="!Array.isArray(zone)">{{
                    zone
                }}</span>
                <div class="urban-zone-list" v-else>
                    <span
                        v-for="(data, index) in zone"
                        @click="getPdf(index)"
                        :key="index"
                        >{{ data }}</span
                    >
                </div>
            </div>
            <i class="icon icon-info btn-icon" />
        </div>
        <hr v-if="!Array.isArray(zone)" />
        <div
            class="urban-plan__description-item-list-wrap"
            id="localList"
            v-if="Array.isArray(dataList) && !Array.isArray(zone)"
        >
            <div class="urban-plan__description-item-list">
                <span class="title">Je peux affecter le bien :</span>
                <div class="list">
                    <a-list item-layout="horizontal" :data-source="dataList">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <a-list-item-meta
                                    :description="item.description"
                                >
                                    <p slot="title">
                                        {{ `  ${item.title}` }}
                                    </p>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </div>
            </div>
        </div>
        <div
            class="urban-plan__description-item-list-wrap"
            id="localList"
            v-if="!Array.isArray(dataList) && !Array.isArray(zone)"
        >
            <div class="urban-plan__description-item-list">
                <span class="title">Je peux affecter le bien :</span>
                <div class="list" v-html="dataList" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        List as AList,
        ListItem as AListItem,
        ListItemMeta as AListItemMeta,
    } from 'ant-design-vue';
    const props = defineProps({
        title: {
            type: String,
        },
        zone: {
            type: [Array, String, Object],
        },
        dataList: {
            type: [Array, String, Object],
        },
        lien: {
            default: '',
        },
    });

    function toggleActive(event: any) {
        const element = event.currentTarget;
        element.classList.toggle('active');
    }
    function getPdf(index: any) {
        window.open(props.lien[index]);
    }
</script>
<style lang="scss" scoped></style>
