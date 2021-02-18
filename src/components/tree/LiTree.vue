<template>
    <div class="tree">
        <li-treenode
            v-for="(item, index) in cloneData"
            :key="index"
            :data="item"
            :show-checkbox="showCheckbox"
            :title="prop"
        ></li-treenode>
    </div>
</template>
<script>
    import LiTreenode from './LiNode.vue';
    import { deepClone } from '@/assets/js/deepClone';

    export default {
        name: 'LiTree',
        components: { LiTreenode },
        props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            prop: {
                type: String,
            },
            default_checked_keys: {
                type: Array,
            },
            showCheckbox: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                cloneData: []
            }
        },
        methods: {
            rebuildData () {
                this.cloneData = deepClone(this.data);
                this._newData(this.cloneData);
            },
            _newData (data) {
                // console.log(this.default_checked_keys)
                data.forEach(item=>{
                    if(this.default_checked_keys.indexOf(item.id) !== -1) {
                        this.$set(item, 'checked', true)
                        this.$set(item, 'expand', true)
                    }
                    // else if (item.children && item.children.every(item=> this.default_checked_keys.indexOf(item.id)!== -1)) {
                    //     this.$set(item, 'checked', true)
                    //     this.$set(item, 'expand', true)
                    // }

                    // else {
                    //     this.$set(item, 'checked', false)
                    //     this.$set(item, 'expand', true)
                    // }

                    if(item.children && item.children.length) {
                        this._newData(item.children)
                        if (item.children && item.children.every(item=> this.default_checked_keys.indexOf(item.id)!== -1)) {
                           this.$set(item, 'checked', true)
                           this.$set(item, 'expand', true)
                       }
                        else {
                            this.$set(item, 'checked', false)
                            this.$set(item, 'expand', true)
                        }
                    }
                })
            },
            emitEvent (eventName, data) {
                this.$emit(eventName, data, this.cloneData);
            }
        },
        created () {
            this.rebuildData();
        },
        watch: {
            data () {
                this.rebuildData();
            }
        }
    }
</script>
<style scoped>
.tree {
    text-align: left;
}
</style>