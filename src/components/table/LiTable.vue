<template>
    <table>
        <thead>
            <tr>
                <th v-if="index"></th>
                <th v-for="col in columns" :key="col.slot">{{ col.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td v-if="index">{{ rowIndex + 1 }}</td>
                <td v-for="(col) in columns" :key="col.title">
                    <template v-if="'slot' in col">
                        <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot>
                    </template>
                    <!-- <template v-else>
                        {{ row }} 
                    </template> -->
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>

    export default {
        name: 'LiTable',
        props: {
            columns: {
                type: Array,
                default () {
                    return [];
                }
            },
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            index: {
                type: Boolean,
                default () {
                    return false
                }
            },
        }
    }
</script>
<style>
    table{
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #e9e9e9;
    }
    table th{
        background: #f7f7f7;
        color: #5c6b77;
        font-weight: 600;
        white-space: nowrap;
    }
    table td, table th{
        padding: 8px 16px;
        border: 1px solid #e9e9e9;
        text-align: left;
    }
</style>