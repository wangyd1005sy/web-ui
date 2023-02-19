<template>
    <div>
        <el-card>
            <el-input style="width:440px" @clear="searchData" clearable v-model="searchForm.name" placeholder="请输入用户姓名" class="input-with-select">
                <template #append>
                    <el-button icon="Search" @click="searchData" />
                </template>
            </el-input>
            <el-table :data="tableData" border style="width: 100%;margin-top:20px">
                <el-table-column prop="id" label="编号" width="180" />
                <el-table-column prop="code" label="编码" width="180" />
                <el-table-column prop="name" label="名称" width="180" />
                <el-table-column label="操作" width="330">
                    <template #default="scope">
                        <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                        <el-button size="small"
                            @click="() => router.push({ path: '/user/detail', query: { id: scope.row.id } })">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination style="margin-top:20px" :current-page="searchForm.current" :page-size="searchForm.size"
                :page-sizes="[10, 20, 30, 40]" layout="->,total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup>
import provinceApi from "../../api/province";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
const router = useRouter();
// Dom 挂载之后
onMounted(() => {
    getProvinceList();
})
// 用户数据
let tableData = ref([]);
let total = ref(0);
// 搜索条件
const searchForm = reactive({
    current: 1,
    size: 10
})
// 获取用户列表
const getProvinceList = async () => {
    const res = await provinceApi.getProvinceList(searchForm);
    console.log(res);
    tableData.value = res.data.data.records;
    total.value = res.data.data.total;
}
const handleSizeChange = (size) => {
    searchForm.size = size;
    getProvinceList();
}
const handleCurrentChange = (current) => {
    searchForm.current = current;
    getProvinceList();
}
const searchData = () => {
    searchForm.current = 1;
    getProvinceList();
}
</script>

<style lang="scss" scoped>

</style>