<template>
    <ul class="tree-ul">
        <li class="tree-li">
            <span class="tree-expand" @click="handleExpand">
                <span v-if="data.children && data.children.length && !data.expand">+</span>
                <span v-if="data.children && data.children.length && data.expand">-</span>
            </span>
            <el-checkbox
                v-if="showCheckbox"
                :value="data.checked"
                @input="handleCheck"
            ></el-checkbox>
            <span>{{ data[title] }}</span>
            <template v-if="data.expand">
                <li-treenode
                    v-for="(item, index) in data.children"
                    :key="index"
                    :data="item"
                    :show-checkbox="showCheckbox"
                    :title="title"
                ></li-treenode>
            </template>
        </li>
    </ul>
</template>
<script>
    import { findComponentUpward } from '@/assets/js/assist.js';

    export default {
        name: 'LiTreenode',
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                }
            },
            title: {
                type: String,
            },
            // default_checked_keys: {
            //     type: Array,
            // },
            showCheckbox: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                tree: findComponentUpward(this, 'LiTree')
            }
        },
        // computed: {
        //     isChecked() {
        //         return this.default_checked_keys.indexOf(this.data.id) !== -1 ? true : false
        //     }
        // },
        methods: {
            handleExpand () {
                this.$set(this.data, 'expand', !this.data.expand);

                if (this.tree) {
                    this.tree.emitEvent('on-toggle-expand', this.data);
                }
            },
            handleCheck (checked) {
                this.updateTreeDown(this.data, checked);

                if (this.tree) {
                    this.tree.emitEvent('on-check-change', this.data);
                }
            },
            updateTreeDown (data, checked) {
                this.$set(data, 'checked', checked);

                if (data.children && data.children.length) {
                    data.children.forEach(item => {
                        this.updateTreeDown(item, checked);
                    });
                }
            }
        },
        computed: {
            
        },
        watch: {
            'data.children': {
                handler (data) {
                    if (data) {
                        const checkedAll = !data.some(item => !item.checked);
                        this.$set(this.data, 'checked', checkedAll);
                    }
                },
                deep: true
            }
        }
    }
</script>
<style>
    .tree-ul, .tree-li{
        list-style: none;
        padding-left: 20px;
    }
    .tree-expand{
        cursor: pointer;
        margin: 0 10px;
    }
</style>