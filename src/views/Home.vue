<template>
    <div>
        <Search>
            <el-form :model="form" ref="searchForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="入驻时间:">
                            <el-date-picker v-model="form.time" type="datetimerange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商家编码:">
                            <el-input v-model="form.code" placeholder="请输入商家编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商家名称:">
                            <el-input v-model="form.shopName" placeholder="请输入商家名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号码:" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入手机号码" maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!-- 0新增 1审核中 2审核失败 3审核通过 4入驻失败 5已入住 6冻结中 7解约中 8已解约 -->
                        <el-form-item label="申请状态:">
                            <el-select v-model="form.status">
                                <el-option label="已入驻" :value="1"></el-option>
                                <el-option label="冻结中" :value="2"></el-option>
                                <el-option label="解约中" :value="3"></el-option>
                                <el-option label="已解约" :value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否开户:">
                            <el-select v-model="form.bindStatus">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="缴纳保证金:">
                            <el-select v-model="form.isPayMargin">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="签署合同:">
                            <el-select v-model="form.isSignContract">
                                <el-option label="是" :value="1"></el-option>
                                <el-option label="否" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="企业类型:">
                            <el-select v-model="form.type">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="个人" :value="2"></el-option>
                                <el-option label="企业" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交易状态:">
                            <el-select v-model="form.openStatus">
                                <el-option label="全部" value=""></el-option>
                                <el-option label="开通" :value="1"></el-option>
                                <el-option label="关闭" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <SearchController>
                        <el-button type="primary" @click="handleClick">查询</el-button>
                        <el-button>重置</el-button>
                    </SearchController>
                </el-row>
            </el-form>
        </Search>
        <Content :loading="loading">
            <template #tool>
                <TableTool @refresh="refresh" @checkChange="checkChange">
                    <el-button>交易</el-button>
                    <!-- <PopConfirm type="primary" @click="exportExcel" :icon="isExport ? 'el-icon-loading' : 'el-icon-download'"
                    v-if="hasPerm('export:shopList')" :disabled="!tableData.length || isExport" poptitle="确认导出?"
                    placement="left-start">导出</PopConfirm> -->
                    <PopConfirm type="primary" @confirm="handleConfirm" btnIcon="Download" :disabled="false"
                        poptitle="确认批量开通交易?" placement="right-start">开通站好</PopConfirm>
                </TableTool>
            </template>
            <template #selection>
                <Selection :number="2" />
            </template>
            <el-table ref="tableRef" :data="tableData" highlight-current-row>
                <el-table-column v-if="!filterLabel('时间')" prop="date" label="时间" />
                <el-table-column v-if="!filterLabel('名称')" prop="name" label="名称" />
                <el-table-column v-if="!filterLabel('地址')" prop="address" label="地址" />
                <el-table-column v-if="!filterLabel('操作')" label="操作" width="120px" fixed="right">
                    <template #default="scope">
                        <Divider :number="1">
                            <el-button type="primary" link @click="handlerDetail" v-if="true">查看
                            </el-button>
                            <el-button type="primary" link @confirm="linkDetail(scope.row)" v-if="true">删除
                            </el-button>
                            <el-button type="primary" link @click="dialogVisible = true" v-if="true">编辑
                            </el-button>
                        </Divider>
                    </template>
                </el-table-column>
                <template #empty>
                    <DefaultEmpty />
                </template>
            </el-table>
            <Pagination :total="total" :current="page" :page-size="pageSize">
                <template #default="data">
                    <el-pagination :page-sizes="data.sizes" small :layout="data.layout" :current-page="page"
                        :page-size="pageSize" :total="total" @update:page-size="handleSizeChange" @update:current-page="handlePageChange">
                    </el-pagination>
                </template>
            </Pagination>
        </Content>
        <!-- <BaseSetting title="heloe"><span>不错</span></BaseSetting> -->
        <!-- dialog -->
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :appendToBody="false"
            :beforeClose="handleBeforeClose">
            <span>{{ title }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleTitle">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, getCurrentInstance, defineComponent, onMounted } from 'vue'
import baseMixin from '../mixins'
import MaskMixin from '../mixins/mask'
import { hello } from '../store/modules/hello.js'
import { mapActions, mapState } from 'pinia'
import { Test } from '@/api/common'
import { PAGE } from 'application-message-plus' // 按需导入

export default defineComponent({
    name: 'm-home',

    data() {
        return {
            form: {
                //入驻时间
                time: [],
                //商户编号
                code: "",
                //商户名称
                shopName: "",
                //手机号码
                mobile: "",
                //所属行业
                industryCode: "",
                //当前状态
                status: "",
                //是否已开户（1:已开户，0：未开户）
                bindStatus: "",
                //是否缴纳保证金：0否，1是
                isPayMargin: "",
                //是否签订合同：0否，1是
                isSignContract: "",
                //企业类型
                type: "",
                //交易状态
                openStatus: ""
            },
            total: 100,
            page: 1,
            pageSize: 10
        }
    },

    computed: {
        ...mapState(hello, ['title'])
    },

    setup() {
        const This = getCurrentInstance().appContext.config.globalProperties
        const loading = ref(true)
        const { tableRef, checkChange, filterLabel } = baseMixin()
        const { dialogVisible, handleBeforeClose } = MaskMixin()
        const tableData = ref([
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            // {
            //     date: '2016-05-01',
            //     name: 'Tom',
            //     address: 'No. 189, Grove St, Los Angeles',
            // },
        ])

        const handleConfirm = () => {
            console.log('确认了')
        }

        const linkDetail = (scope) => {
            console.log('数据', scope)
        }

        const handleClick = () => {
             This.$zl_message({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
        }

        const helloStore = hello()

        helloStore.$patch({ title: 'gogo' })
        console.log('store', helloStore)

        onMounted(() => {
            refresh()
        })

        const refresh = () => {
            loading.value = true
            try {
                Test()
            } finally {
                loading.value = false
            }
        }

        const handlerDetail = () => {
            PAGE('/about')
        }

        return {
            loading,
            tableData,
            tableRef,
            dialogVisible,
            filterLabel,
            checkChange,
            handleConfirm,
            linkDetail,
            handleClick,
            handleBeforeClose,
            refresh,
            handlerDetail
        }
    },

    activated() {
        console.log('触发了')
    },

    methods: {
        ...mapActions(hello, ['setTitle']),
        handlePageChange(page) {
            console.log('改变了l', page)
        },
        handleSizeChange(size) {
            console.log('改变l', size)
        },
        handleTitle() {
            this.setTitle('设置成功了')
            this.dialogVisible = false
        }
    }
})
</script>

<style>
</style>
