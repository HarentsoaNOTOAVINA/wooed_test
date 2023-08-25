<template>
    <div class="newProjectBruxList">
        <table class="styled-table">
            <thead>
                <tr>
                    <th v-for="(itemHead, indexHead) in head" :key="indexHead">
                        {{ itemHead.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in allProjectData" class="active-row">
                    <td class="id">{{ item.identity }}</td>
                    <td>{{ item.municipalRef }}</td>
                    <td>{{ item.regionalRef }}</td>
                    <td>{{ item.rue }} {{ item.number }}</td>
                    <td>{{ item.municipality }}</td>
                    <td>{{ item.projectType }}</td>
                    <td>{{ item.objectRequest }}</td>
                    <td>{{ item.categoryOfWorks }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { head } from './dataNewProjectList';

    const props = defineProps(['allProjectData']);
</script>

<style lang="scss" scoped>
    .id {
        color: #67cd84;
    }
    .newProjectBruxList {
        @apply my-[20px];
        overflow-y: scroll;
        height: 400px;
        width: 700px;
    }

    .styled-table {
        position: relative;
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        height: 400px;
    }

    .styled-table th,
    .styled-table thead {
        // display: flex;
        background-color: var(--color-gray);
        text-align: left;
        position: sticky;
        top: 0;
    }

    .styled-table th,
    .styled-table td {
        padding: 12px 15px;
    }

    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }

    .styled-table tbody tr.active-row {
        font-weight: bold;
        // color: #009879;
    }
</style>
